package com.bankIsland.user.controller;

import com.bankIsland.user.controller.payload.request.LoginRequest;
import com.bankIsland.user.controller.payload.request.SignupRequest;
import com.bankIsland.user.controller.payload.response.JwtResponse;
import com.bankIsland.user.controller.payload.response.MessageResponse;
import com.bankIsland.user.dao.AccountOwnerRepository;
import com.bankIsland.user.dao.RoleRepository;
import com.bankIsland.user.dao.UserRepository;
import com.bankIsland.user.entity.AccountOwner;
import com.bankIsland.user.entity.ERole;
import com.bankIsland.user.entity.Role;
import com.bankIsland.user.entity.User;
import com.bankIsland.user.security.jwt.JwtUtils;
import com.bankIsland.user.security.service.UserDetailsImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
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
    UserRepository userRepository;
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    AccountOwnerRepository accountOwnerRepository;
    @Autowired
    PasswordEncoder encoder;
    @Autowired
    JwtUtils jwtUtils;

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());
        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                roles));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        logger.info(">>>>>>>>>>>>>>>>Request signup");
        if (userRepository.existsByUsername(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email already used!"));
        }
        // Create new user's account

        AccountOwner accountOwner = new AccountOwner(signUpRequest.getFirstName(),
                signUpRequest.getLastName(),
                signUpRequest.getEmail(),
                signUpRequest.getBirthDate());
        accountOwnerRepository.save(accountOwner);

        User user = new User(signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()),
                new HashSet<Role>(List.of(roleRepository.findByName(ERole.ROLE_USER).get())),
                accountOwner.getId());
        userRepository.save(user);


        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    @GetMapping("/prova")
    public String prova(){//@RequestHeader("Authorization") String token) {
        return "PROVA";
    }
}
