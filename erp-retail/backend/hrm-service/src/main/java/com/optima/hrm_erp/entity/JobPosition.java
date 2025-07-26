package com.optima.hrm_erp.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "job_position")
public class JobPosition {
    @Id
    private Long id;

    @Column(length = 100, nullable = false)
    private String title;

    private String status;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return title;
    }

    public void setName(String name) {
        this.title = name;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
