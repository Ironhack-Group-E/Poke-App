package com.ironhack.pokebackend.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ironhack.pokebackend.controller.dto.TeamDTO;
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

    // Inject both repositories (trainer and team)

    @Autowired
    private TrainerRepository trainerRepository;

    @Autowired
    private TeamRepository teamRepository;

    // Create trainer service

    public Trainer createTrainer(String trainerJSON) {
        // Create an objectmapper to read the JSON file

        ObjectMapper objectMapper = new ObjectMapper();

        // Declare an empty trainer
        Trainer trainer = null;

        // Try to read the input JSON and throw, catch an exception if it's not possible and print the stacktrace
        try {
            trainer = objectMapper.readValue(trainerJSON, Trainer.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        // In case the trainer's id is set on the JSON, we set it to null

        trainer.setId(null);

        // Create a new team with the trainer data from the JSON

        Team team = new Team(trainer);

        // Print the trainer info to the console

        System.out.println(trainer.toString());

        // Save both team and trainer into the repositories

        trainer = trainerRepository.save(trainer);

        team = teamRepository.save(team);

        return trainer;
    }

    // Delete trainer service

    public void deleteTrainer(Integer id) {

        // Firstly, we must check if the trainer's id exists, in affirmative case we delete team associated to it
        // and the trainer itself from the databases. If the trainer doesn't exists, we throw an exception

        if(trainerRepository.existsById(id)) {
            Trainer trainer = trainerRepository.findById(id).get();
            Team team = teamRepository.findByTrainer(trainer).get();
            teamRepository.deleteById(team.getId());
            trainerRepository.deleteById(id);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Trainer not found");
        }
    }

    // Get team by id service

    public TeamDTO getTeam(Integer id) {

        // We first verify if the team exists in the databse

        if (!trainerRepository.existsById(id))
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Trainer not found");

        // In case it does exists, we bring it from the database

        Trainer trainer = trainerRepository.findById(id).get();

        // Create a new Team Data Transfer Object with all the attributes from Team Object

        TeamDTO teamDTO = new TeamDTO();
        teamDTO.setTrainer(trainer);
        teamDTO.setPokemonIds(new ArrayList<>());
        try {
            Team team = teamRepository.findByTrainer(trainer).get();
            if(team.getPokemon1()!=null)
                teamDTO.getPokemonIds().add(team.getPokemon1());
            if(team.getPokemon2()!=null)
                teamDTO.getPokemonIds().add(team.getPokemon2());
            if(team.getPokemon3()!=null)
                teamDTO.getPokemonIds().add(team.getPokemon3());
            if(team.getPokemon4()!=null)
                teamDTO.getPokemonIds().add(team.getPokemon4());
            if(team.getPokemon5()!=null)
                teamDTO.getPokemonIds().add(team.getPokemon5());
            if(team.getPokemon6()!=null)
                teamDTO.getPokemonIds().add(team.getPokemon6());
            if(team.getPokemon7()!=null)
                teamDTO.getPokemonIds().add(team.getPokemon7());
            teamDTO.setId(team.getId());
        } catch (Exception e) {}
        return teamDTO;
    }
}
