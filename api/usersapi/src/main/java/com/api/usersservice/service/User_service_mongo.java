package com.api.usersservice.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.usersservice.entity.Entity_class_userMongo;
import com.api.usersservice.repository.User_repository_mongo;

@Service
public class User_service_mongo {

    @Autowired
    private User_repository_mongo userRepository;

    public List<Entity_class_userMongo> findAll() {
        return userRepository.findAll();
    }

    public Entity_class_userMongo save(Entity_class_userMongo user) {
        return userRepository.save(user);
    }

    public Entity_class_userMongo findByUserName(String userName) {
        return userRepository.findByUserName(userName);
    }

    public Entity_class_userMongo findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
