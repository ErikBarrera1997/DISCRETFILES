package com.api.romsdownload.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.romsdownload.entity.Entity_class_romMongo;
import com.api.romsdownload.service.Roms_service_mongo;

@RestController
@RequestMapping("/service/roms")
@CrossOrigin(origins = {"http://localhost", "http://127.0.0.1:5500"})
public class Roms_controller_mongo {

    @Autowired
    private Roms_service_mongo romsService;

    @GetMapping("/all")
    public ResponseEntity<?> getAllRoms() {
        List<Entity_class_romMongo> results = romsService.findAll();
        return ResponseEntity.ok(results);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createRom(@RequestBody Entity_class_romMongo rom) {
        Entity_class_romMongo created = romsService.save(rom);
        return ResponseEntity.ok(created);
    }
}