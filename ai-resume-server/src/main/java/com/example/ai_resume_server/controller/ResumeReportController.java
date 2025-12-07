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
    private PDFValidatorService service;
    @Autowired
    private ResumeReportRepo repo;
    @Autowired
    private ResumeReportService resumeService;
    @Autowired

    private PDFExtractService pdfExtractService;
    @PostMapping("/upload/{email}")
    public ResponseEntity<?> uploadResume(@RequestParam("file")MultipartFile file,@RequestParam("description") String description,@PathVariable String email){
        if(!accountRepo.existsByEmail(email)){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("response","Please register to generate the report"));
        }
        String validate= service.validate(file);
        if(!validate.equals("VALID")) {
        return ResponseEntity.badRequest().body(Map.of("error",validate));
        }
        ResumeReport report=pdfExtractService.extractText(file,description);
        report.setEmail(email);
        repo.save(report);
        return ResponseEntity.ok(Map.of("response","Report generated successfully"));
    }
    @GetMapping("/report/{email}")
    public ResponseEntity<?> getResumeReport(@PathVariable String email){

        if(!accountRepo.existsByEmail(email)){
            return ResponseEntity.badRequest().body(Map.of("response","No report exists with this email"));
        }
        Optional<List<ResumeReport>> report=resumeService.getReport(email);
        return ResponseEntity.ok().body(Map.of("response",report));
    }
}
