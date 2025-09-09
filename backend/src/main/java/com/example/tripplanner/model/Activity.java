package com.example.tripplanner.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

@Entity @Table(name = "activities")
public class Activity {
    @Id @GeneratedValue
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "trip_id", nullable = false)
    private Trip trip;

    @Column(nullable = false)
    private LocalDate day;

    private LocalTime startTime;
    private LocalTime endTime;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String type = "other"; // lodging|transport|food|sight|other

    @Column(length = 1000)
    private String notes;

    private Double lat;
    private Double lng;
    private String address;

    public Activity() {}

    public UUID getId() { return id; }
    public Trip getTrip() { return trip; }
    public LocalDate getDay() { return day; }
    public LocalTime getStartTime() { return startTime; }
    public LocalTime getEndTime() { return endTime; }
    public String getTitle() { return title; }
    public String getType() { return type; }
    public String getNotes() { return notes; }
    public Double getLat() { return lat; }
    public Double getLng() { return lng; }
    public String getAddress() { return address; }

    public void setTrip(Trip trip) { this.trip = trip; }
    public void setDay(LocalDate day) { this.day = day; }
    public void setStartTime(LocalTime startTime) { this.startTime = startTime; }
    public void setEndTime(LocalTime endTime) { this.endTime = endTime; }
    public void setTitle(String title) { this.title = title; }
    public void setType(String type) { this.type = type; }
    public void setNotes(String notes) { this.notes = notes; }
    public void setLat(Double lat) { this.lat = lat; }
    public void setLng(Double lng) { this.lng = lng; }
    public void setAddress(String address) { this.address = address; }
}
