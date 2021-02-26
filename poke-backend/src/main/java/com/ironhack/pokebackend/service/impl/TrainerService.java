package com.ironhack.pokebackend.service.impl;

import com.ironhack.pokebackend.model.Team;
import com.ironhack.pokebackend.model.Trainer;
import com.ironhack.pokebackend.repository.TeamRepository;
import com.ironhack.pokebackend.repository.TrainerRepository;
import com.ironhack.pokebackend.service.interfaces.ITrainerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class TrainerService implements ITrainerService {

    @Autowired
    private TrainerRepository trainerRepository;

    @Autowired
    private TeamRepository teamRepository;

    public Trainer createTrainer(Trainer trainer) {
        Team team = new Team(trainer);

        trainer = trainerRepository.save(trainer);

        team = teamRepository.save(team);

        return trainer;
    }

    public void deleteTrainer(Integer id) {
        if(trainerRepository.existsById(id)) {
            Trainer trainer = trainerRepository.findById(id).get();
            Team team = teamRepository.findByTrainer(trainer).get();
            teamRepository.deleteById(team.getId());
            trainerRepository.deleteById(id);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Trainer not found");
        }
    }
}
