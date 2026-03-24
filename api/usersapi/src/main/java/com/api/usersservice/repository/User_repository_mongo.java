package com.api.usersservice.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.api.usersservice.entity.Entity_class_userMongo;

@Repository
public interface User_repository_mongo extends MongoRepository<Entity_class_userMongo, String> {
    Entity_class_userMongo findByUserName(String userName);
    Entity_class_userMongo findByEmail(String email);
}
