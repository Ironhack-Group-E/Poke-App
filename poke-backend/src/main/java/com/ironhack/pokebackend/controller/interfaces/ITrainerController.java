package com.ironhack.pokebackend.controller.interfaces;

import com.ironhack.pokebackend.controller.dto.TeamDTO;
import com.ironhack.pokebackend.model.Team;
import com.ironhack.pokebackend.model.Trainer;

import java.util.List;

// Trainer interface with all trainer controller routes

public interface ITrainerController {

    List<Trainer> getTrainers();

    Trainer createTrainer(String trainerJSON);

    void deleteTrainer(Integer id);

    TeamDTO getTeam(Integer id);
}
