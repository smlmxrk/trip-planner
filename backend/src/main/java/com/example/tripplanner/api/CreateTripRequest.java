package com.example.tripplanner.api;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public class CreateTripRequest {
    @NotBlank public String name;
    @NotNull  public LocalDate startDate;
    @NotNull  public LocalDate endDate;
    @NotBlank public String tripTimezone;
}
