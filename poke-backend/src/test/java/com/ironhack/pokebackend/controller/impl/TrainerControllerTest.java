package com.ironhack.pokebackend.controller.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ironhack.pokebackend.model.Team;
import com.ironhack.pokebackend.model.Trainer;
import com.ironhack.pokebackend.repository.TeamRepository;
import com.ironhack.pokebackend.repository.TrainerRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
class TrainerControllerTest {

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private TrainerRepository trainerRepository;

    private MockMvc mockMvc;
    private ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
        Trainer trainer1 = new Trainer("Ash", 26, "Football", "https://static.wikia.nocookie.net/pokemon/images/6/6a/Ash_PJ_2.png" );
        Trainer trainer2 = new Trainer("Brock", 28, "Hockey", "https://e1.pngegg.com/pngimages/875/365/png-clipart-pokemon-pokemon-brock-running-illustration-thumbnail.png" );
        trainerRepository.saveAll(List.of(trainer1, trainer2));
        Team team = new Team(trainer1);
        team.setPokemon1(113);
        teamRepository.save(team);
    }

    @AfterEach
    void tearDown() {
        teamRepository.deleteAll();
        trainerRepository.deleteAll();
    }

    @Test
    void getTrainers_noParams_returnAll() throws Exception {
        MvcResult result =mockMvc.perform(get("/trainers"))
                .andExpect(status().isOk())
                .andReturn();
        assertTrue(result.getResponse().getContentAsString().contains("Ash"));
        assertTrue(result.getResponse().getContentAsString().contains("Hockey"));
    }

    @Test
    void createTrainer_validData_trainer() throws Exception {
        Trainer trainer = new Trainer("Misty", 23, "Reading", "mistyPic" );
        String body = objectMapper.writeValueAsString(trainer);

        MvcResult result =mockMvc.perform(post("/trainer")
                .content(body).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andReturn();
        assertTrue(result.getResponse().getContentAsString().contains("Misty"));
        assertTrue(result.getResponse().getContentAsString().contains("mistyPic"));

    }

    @Test
    void deleteTrainer() throws Exception {
        List<Trainer> trainerList = trainerRepository.findAll();
        MvcResult result =mockMvc.perform(delete("/trainer/" + trainerList.get(0).getId()))
                .andExpect(status().isNoContent())
                .andReturn();
    }

    @Test
    void getTeam() throws Exception {
        List<Trainer> trainerList = trainerRepository.findAll();
        MvcResult result =mockMvc.perform(get("/trainer/" + trainerList.get(0).getId() + "/team"))
                .andExpect(status().isOk())
                .andReturn();
        assertTrue(result.getResponse().getContentAsString().contains("113"));
        assertTrue(result.getResponse().getContentAsString().contains("Ash"));

    }
}