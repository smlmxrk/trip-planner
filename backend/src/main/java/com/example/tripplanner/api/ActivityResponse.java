package com.example.tripplanner.api;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

public record ActivityResponse(
        UUID id,
        UUID tripId,
        LocalDate day,
        LocalTime startTime,
        LocalTime endTime,
        String title,
        String type,
        String notes,
        Double lat,
        Double lng,
        String address
) {}
