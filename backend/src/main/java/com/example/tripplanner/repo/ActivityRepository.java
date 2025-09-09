package com.example.tripplanner.repo;

import com.example.tripplanner.model.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface ActivityRepository extends JpaRepository<Activity, UUID> {
    List<Activity> findByTrip_IdOrderByDayAscStartTimeAsc(UUID tripId);
}
