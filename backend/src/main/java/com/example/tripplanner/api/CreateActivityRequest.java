package com.example.tripplanner.api;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;

public class CreateActivityRequest {
    @NotNull public LocalDate day;
    public LocalTime startTime; // optional
    public LocalTime endTime;   // optional
    @NotBlank public String title;
    @NotBlank public String type; // lodging|transport|food|sight|other
    public String notes;
    public Double lat;
    public Double lng;
    public String address;
}
