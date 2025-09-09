package com.example.tripplanner.controllers;

import com.example.tripplanner.api.CreateTripRequest;
import com.example.tripplanner.api.TripResponse;
import com.example.tripplanner.model.Trip;
import com.example.tripplanner.repo.TripRepository;
import jakarta.validation.Valid;
import org.springframework.data.domain.Sort;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/trips")
public class TripController {
    private final TripRepository repo;
    public TripController(TripRepository repo) { this.repo = repo; }

    @GetMapping
    public List<TripResponse> list() {
        return repo.findAll(Sort.by("startDate").descending()).stream()
                .map(t -> new TripResponse(t.getId(), t.getName(), t.getStartDate(), t.getEndDate(), t.getTripTimezone()))
                .toList();
    }

    @PostMapping
    public ResponseEntity<TripResponse> create(@Valid @RequestBody CreateTripRequest req) {
        if (req.startDate.isAfter(req.endDate)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "startDate must be <= endDate");
        }
        Trip t = new Trip();
        t.setName(req.name);
        t.setStartDate(req.startDate);
        t.setEndDate(req.endDate);
        t.setTripTimezone(req.tripTimezone);
        Trip saved = repo.save(t);
        return ResponseEntity.created(URI.create("/api/trips/" + saved.getId()))
                .body(new TripResponse(saved.getId(), saved.getName(), saved.getStartDate(), saved.getEndDate(), saved.getTripTimezone()));
    }
}
