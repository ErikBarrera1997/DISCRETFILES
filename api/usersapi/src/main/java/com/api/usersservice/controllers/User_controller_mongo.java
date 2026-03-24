package com.api.usersservice.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.usersservice.entity.Entity_class_userMongo;
import com.api.usersservice.service.User_service_mongo;

@RestController
@RequestMapping("/service/users")
@CrossOrigin(origins = {"http://localhost", "http://127.0.0.1:5500"})
public class User_controller_mongo {

    @Autowired
    private User_service_mongo userService;

    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers() {
        List<Entity_class_userMongo> results = userService.findAll();
        return ResponseEntity.ok(results);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createUser(@RequestBody Entity_class_userMongo user) {
        Entity_class_userMongo created = userService.save(user);
        return ResponseEntity.ok(created);
    }
}
