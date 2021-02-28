package com.ironhack.pokebackend.service.interfaces;

import com.ironhack.pokebackend.controller.dto.TeamDTO;
import com.ironhack.pokebackend.model.Team;
import com.ironhack.pokebackend.model.Trainer;

import java.util.List;

public interface ITrainerService {
    Trainer createTrainer(Trainer trainer);

    void deleteTrainer(Integer id);

    TeamDTO getTeam(Integer id);
}
