package com.ironhack.pokebackend.service.interfaces;

import com.ironhack.pokebackend.model.Trainer;

public interface ITrainerService {
    Trainer createTrainer(Trainer trainer);

    void deleteTrainer(Integer id);
}
