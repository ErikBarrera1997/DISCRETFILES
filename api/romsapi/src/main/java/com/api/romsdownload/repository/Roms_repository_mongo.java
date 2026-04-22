package com.api.romsdownload.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.api.romsdownload.entity.Entity_class_romMongo;

@Repository
public interface Roms_repository_mongo extends MongoRepository<Entity_class_romMongo, String> {
    Entity_class_romMongo findByRomName(String romName);
    Entity_class_romMongo findBySystem(String system);
}