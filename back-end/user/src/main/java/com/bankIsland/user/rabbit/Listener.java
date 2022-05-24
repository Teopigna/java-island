package com.bankIsland.user.rabbit;

import com.bankIsland.user.security.jwt.JwtUtils;
import com.bankIsland.user.service.UserService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.SendTo;

public class Listener {

//     @Autowired
//     private JwtUtils jwtUtils;

// //    @Autowired
// //    private UserRepository userRepository;

//     @Autowired
// 	private UserService userService;

//     @RabbitListener(queues = "userQueue")
//     @SendTo("accountQueue")
//     public int listen(String token) {

//         String username = jwtUtils.getUserNameFromJwtToken(token);

//         return userService.findByUsername(username).getId();
//     }
}
