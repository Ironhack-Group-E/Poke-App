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

import java.util.ArrayList;
import java.util.List;

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

    public List<Integer> getTeam(Integer id) {
        if (!trainerRepository.existsById(id))
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Trainer not found");

        Trainer trainer = trainerRepository.findById(id).get();

        List<Integer> pokemonIds = new ArrayList<>();
        try {
            Team team = teamRepository.findByTrainer(trainer).get();
            if (team.getPokemon1() != null) {
                pokemonIds.add(team.getPokemon1());
            }
            if (team.getPokemon2() != null) {
                pokemonIds.add(team.getPokemon2());
            }
            if (team.getPokemon3() != null) {
                pokemonIds.add(team.getPokemon3());
            }
            if (team.getPokemon4() != null) {
                pokemonIds.add(team.getPokemon4());
            }
            if (team.getPokemon5() != null) {
                pokemonIds.add(team.getPokemon5());
            }
            if (team.getPokemon6() != null) {
                pokemonIds.add(team.getPokemon6());
            }
            if (team.getPokemon7() != null) {
                pokemonIds.add(team.getPokemon7());
            }
        } catch (Exception e) {}

        return pokemonIds;
    }
}
