package com.api.romsdownload.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.romsdownload.entity.Entity_class_romMongo;
import com.api.romsdownload.repository.Roms_repository_mongo;

@Service
public class Roms_service_mongo {

    @Autowired
    private Roms_repository_mongo romsRepository;

    public List<Entity_class_romMongo> findAll() {
        return romsRepository.findAll();
    }

    public Entity_class_romMongo save(Entity_class_romMongo rom) {
        return romsRepository.save(rom);
    }

    public Entity_class_romMongo findByRomName(String romName) {
        return romsRepository.findByRomName(romName);
    }

    public Entity_class_romMongo findBySystem(String system) {
        return romsRepository.findBySystem(system);
    }
}