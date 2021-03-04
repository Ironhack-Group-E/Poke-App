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
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
class TeamControllerTest {

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
        Team team2 = new Team(trainer2);
        teamRepository.saveAll(List.of(team, team2));
    }

    @AfterEach
    void tearDown() {
        teamRepository.deleteAll();
        trainerRepository.deleteAll();
    }

    @Test
    void getTeams() throws Exception {
        MvcResult result =mockMvc.perform(get("/teams"))
                .andExpect(status().isOk())
                .andReturn();
        assertTrue(result.getResponse().getContentAsString().contains("Football"));
        assertTrue(result.getResponse().getContentAsString().contains("Brock"));

    }

    @Test
    void addPokemon() throws Exception {
        List<Team> teamList = teamRepository.findAll();
        MvcResult result =mockMvc.perform(patch("/team/" + teamList.get(0).getId() + "/add/" + 14))
                .andExpect(status().isNoContent())
                .andReturn();
    }

    @Test
    void deletePokemon() throws Exception {
        List<Team> teamList = teamRepository.findAll();
        MvcResult result =mockMvc.perform(patch("/team/" + teamList.get(0).getId() + "/delete/" + 1))
                .andExpect(status().isNoContent())
                .andReturn();
    }
}