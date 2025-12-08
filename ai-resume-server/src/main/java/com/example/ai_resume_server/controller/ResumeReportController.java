package com.example.ai_resume_server.controller;

import com.example.ai_resume_server.models.ResumeReport;
import com.example.ai_resume_server.repo.AccountRepo;
import com.example.ai_resume_server.repo.ResumeReportRepo;
import com.example.ai_resume_server.service.PDFExtractService;
import com.example.ai_resume_server.service.PDFValidatorService;
import com.example.ai_resume_server.service.ResumeReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/resume")
public class ResumeReportController {

    @Autowired
    private AccountRepo accountRepo;

    @Autowired
    private PDFValidatorService validatorService;

    @Autowired
    private ResumeReportRepo reportRepo;

    @Autowired
    private ResumeReportService resumeService;

    @Autowired
    private PDFExtractService pdfExtractService;


    // -------------------- Upload Resume --------------------
    @PostMapping("/upload/{email}")
    public ResponseEntity<?> uploadResume(
            @RequestParam("file") MultipartFile file,
            @RequestParam("description") String description,
            @PathVariable String email) {

        if (!accountRepo.existsByEmail(email)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of(
                            "status", false,
                            "message", "Email not registered. Please register to generate a report."
                    ));
        }

        String validationResult = validatorService.validate(file);
        if (!validationResult.equals("VALID")) {
            return ResponseEntity.badRequest()
                    .body(Map.of(
                            "status", false,
                            "message", validationResult
                    ));
        }

        ResumeReport report = pdfExtractService.extractText(file, description);

        if (report == null) {
            return ResponseEntity.badRequest()
                    .body(Map.of(
                            "status", false,
                            "message", "Unable to generate resume report. Please try again."
                    ));
        }

        report.setEmail(email);
        reportRepo.save(report);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of(
                        "status", true,
                        "message", "Resume report generated successfully",
                        "reportId", report.getId()
                ));
    }


    // -------------------- Get Resume Reports --------------------
    @GetMapping("/report/{email}")
    public ResponseEntity<?> getResumeReport(@PathVariable String email) {

        if (email.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(Map.of(
                            "status", false,
                            "message", "Email is required"
                    ));
        }

        if (!accountRepo.existsByEmail(email)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of(
                            "status", false,
                            "message", "No account found with this email"
                    ));
        }

        Optional<List<ResumeReport>> reports = resumeService.getReport(email);

        if (reports.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of(
                            "status", false,
                            "message", "No resume reports found for this email"
                    ));
        }

        return ResponseEntity.ok(
                Map.of(
                        "status", true,
                        "message", "Reports fetched successfully",
                        "reports", reports
                )
        );
    }
}
