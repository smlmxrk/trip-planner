package com.example.tripplanner.api;

import java.time.LocalDate;
import java.util.UUID;

public record TripResponse(
        UUID id, String name, LocalDate startDate, LocalDate endDate, String tripTimezone
) {}
