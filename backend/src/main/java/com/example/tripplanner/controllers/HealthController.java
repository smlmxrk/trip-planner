package com.example.tripplanner.controllers;

import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class HealthController {
    @GetMapping("/healthz")
    public Map<String,String> health() { return Map.of("status","ok"); }
}
