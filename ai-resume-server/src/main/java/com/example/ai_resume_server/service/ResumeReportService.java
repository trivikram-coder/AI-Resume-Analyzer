package com.example.ai_resume_server.service;

import com.example.ai_resume_server.DTO.ApiResponse;
import com.example.ai_resume_server.DTO.Message;
import com.example.ai_resume_server.models.ResumeReport;
import com.example.ai_resume_server.repo.AccountRepo;
import com.example.ai_resume_server.repo.ResumeReportRepo;
import com.example.ai_resume_server.utill.ResumeUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;

@Service
public class ResumeReportService {
    @Autowired
    private ResumeReportRepo repo;
    @Autowired
    private AccountRepo accountRepo;
    @Autowired
    private ResumeUtil resumeUtil;
    @Autowired
    private RestTemplate restTemplate;
    @Value("${API_URL}")
    private  String url;
    public ResumeReport sendPrompt(Message prompt){

        try{
            ApiResponse response=restTemplate.postForObject(url,prompt,ApiResponse.class);

            assert response != null;

            return resumeUtil.extractObj(response.getResponse());

        }
        catch(Exception e){
            e.printStackTrace();
            return new ResumeReport();
        }
    }
    public Optional<List<ResumeReport>> getReport(String email){
        return repo.findByEmailOrderByIdDesc(email);
    }
}
