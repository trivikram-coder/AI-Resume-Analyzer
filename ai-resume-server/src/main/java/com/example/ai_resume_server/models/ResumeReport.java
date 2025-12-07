package com.example.ai_resume_server.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "ResumeReport")
public class ResumeReport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long resumeId;
    private String ATS_SCORE;
    private String STRENGTHS;
    private String IMPROVEMENTS;
    private String JOB_MATCH;
    private String MISSING_KEYWORDS;
    private String SUMMARY;
    @Column(unique = true)
    private String email;

    public void setMessage(String data) {
    }

    public void setError(String patternMismatch) {

    }
}

