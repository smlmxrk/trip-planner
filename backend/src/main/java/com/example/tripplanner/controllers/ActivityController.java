package com.example.tripplanner.controllers;

import com.example.tripplanner.api.ActivityResponse;
import com.example.tripplanner.api.CreateActivityRequest;
import com.example.tripplanner.model.Activity;
import com.example.tripplanner.model.Trip;
import com.example.tripplanner.repo.ActivityRepository;
import com.example.tripplanner.repo.TripRepository;
import jakarta.validation.Valid;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.net.URI;
import java.util.List;
import java.util.UUID;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequestMapping("/api")
public class ActivityController {
    private final ActivityRepository activities;
    private final TripRepository trips;

    public ActivityController(ActivityRepository activities, TripRepository trips) {
        this.activities = activities; this.trips = trips;
    }

    @GetMapping("/trips/{tripId}/activities")
    public List<ActivityResponse> list(@PathVariable UUID tripId) {
        ensureTripExists(tripId);
        return activities.findByTrip_IdOrderByDayAscStartTimeAsc(tripId)
                .stream().map(this::toDto).toList();
    }

    @PostMapping("/trips/{tripId}/activities")
    public ResponseEntity<ActivityResponse> create(@PathVariable UUID tripId,
                                                   @Valid @RequestBody CreateActivityRequest req) {
        Trip trip = trips.findById(tripId).orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Trip not found"));

        // Basic validations
        if (req.endTime != null && req.startTime != null && req.endTime.isBefore(req.startTime)) {
            throw new ResponseStatusException(BAD_REQUEST, "endTime must be >= startTime");
        }
        if (req.day.isBefore(trip.getStartDate()) || req.day.isAfter(trip.getEndDate())) {
            throw new ResponseStatusException(BAD_REQUEST, "day must be within trip dates");
        }
        if ((req.lat == null) != (req.lng == null)) {
            throw new ResponseStatusException(BAD_REQUEST, "lat and lng must be provided together");
        }

        Activity a = new Activity();
        a.setTrip(trip);
        a.setDay(req.day);
        a.setStartTime(req.startTime);
        a.setEndTime(req.endTime);
        a.setTitle(req.title);
        a.setType(req.type);
        a.setNotes(req.notes);
        a.setLat(req.lat);
        a.setLng(req.lng);
        a.setAddress(req.address);

        Activity saved = activities.save(a);
        ActivityResponse dto = toDto(saved);
        return ResponseEntity.created(URI.create("/api/activities/" + saved.getId())).body(dto);
    }

    @DeleteMapping("/activities/{id}")
    @ResponseStatus(NO_CONTENT)
    public void delete(@PathVariable UUID id) {
        if (!activities.existsById(id)) throw new ResponseStatusException(NOT_FOUND, "Activity not found");
        activities.deleteById(id);
    }

    private void ensureTripExists(UUID tripId) {
        if (!trips.existsById(tripId)) throw new ResponseStatusException(NOT_FOUND, "Trip not found");
    }

    private ActivityResponse toDto(Activity a) {
        return new ActivityResponse(
                a.getId(),
                a.getTrip().getId(),
                a.getDay(),
                a.getStartTime(),
                a.getEndTime(),
                a.getTitle(),
                a.getType(),
                a.getNotes(),
                a.getLat(),
                a.getLng(),
                a.getAddress()
        );
    }
}
