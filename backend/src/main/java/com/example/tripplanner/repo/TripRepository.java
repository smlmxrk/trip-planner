package com.example.tripplanner.repo;

import com.example.tripplanner.model.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface TripRepository extends JpaRepository<Trip, UUID> {}
