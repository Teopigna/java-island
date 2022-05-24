package com.bankIsland.user.controller;

import com.bankIsland.user.controller.payload.request.LoginRequest;
import com.bankIsland.user.controller.payload.request.SignupRequest;
import com.bankIsland.user.controller.payload.response.EmployeeLoginResponse;
import com.bankIsland.user.controller.payload.response.UserLoginResponse;
import com.bankIsland.user.controller.payload.response.MessageResponse;
import com.bankIsland.user.dao.RoleRepository;
import com.bankIsland.user.entity.AccountOwner;
import com.bankIsland.user.entity.ERole;
import com.bankIsland.user.entity.Role;
import com.bankIsland.user.entity.User;
import com.bankIsland.user.security.jwt.JwtUtils;
import com.bankIsland.user.security.service.UserDetailsImpl;
import com.bankIsland.user.service.AccountOwnerService;
import com.bankIsland.user.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

//@CrossOrigin(origins = "*", maxAge = 3600)
//@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    UserService userService;
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    AccountOwnerService accountOwnerService;
    @Autowired
    PasswordEncoder encoder;
    @Autowired
    JwtUtils jwtUtils;

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication;

        try {
            authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (BadCredentialsException e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Invalid credentials."));
        }

        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());
        switch (roles.get(0)){
            case "D":
                return ResponseEntity.ok(new EmployeeLoginResponse(jwt,
                        userService.findByUsername(loginRequest.getUsername()),
                        roles.get(0)));
            default:
                return ResponseEntity.ok(new UserLoginResponse(jwt,
                        accountOwnerService.findByEmail(loginRequest.getUsername()),
                        roles.get(0)));
        }

    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        logger.info(">>>>>>>>>>>>>>>>Request signup");
        if (userService.existsByUsername(signUpRequest.getEmail()) || accountOwnerService.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email already used!"));
        }
        // Create new user's account

        AccountOwner accountOwner = new AccountOwner(signUpRequest.getFirstName(),
                signUpRequest.getLastName(),
                signUpRequest.getEmail(),
                signUpRequest.getBirthDate());
        accountOwnerService.save(accountOwner);

        User user = new User(signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()),
                new HashSet<Role>(List.of(roleRepository.findByName(ERole.C).get())),
                accountOwner.getId());
        userService.save(user);


        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    @GetMapping("/prova")
    public String prova(){//@RequestHeader("Authorization") String token) {
        return "PROVA";
    }
}
