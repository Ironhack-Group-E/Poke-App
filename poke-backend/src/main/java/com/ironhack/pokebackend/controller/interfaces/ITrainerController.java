package com.ironhack.pokebackend.controller.interfaces;

import com.ironhack.pokebackend.model.Team;
import com.ironhack.pokebackend.model.Trainer;

import java.util.List;

public interface ITrainerController {
    List<Trainer> getTrainers();

    Trainer createTrainer(Trainer trainer);

    void deleteTrainer(Integer id);

    List<Integer> getTeam(Integer id);
}
