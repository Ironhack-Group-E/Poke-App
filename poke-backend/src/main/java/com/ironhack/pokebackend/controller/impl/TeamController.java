package com.ironhack.pokebackend.controller.impl;

import com.ironhack.pokebackend.controller.interfaces.ITeamController;
import com.ironhack.pokebackend.model.Team;
import com.ironhack.pokebackend.repository.TeamRepository;
import com.ironhack.pokebackend.service.interfaces.ITeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TeamController implements ITeamController {

    @Autowired
    private ITeamService teamService;

    @Autowired
    private TeamRepository teamRepository;

    @GetMapping("/teams")
    @ResponseStatus(HttpStatus.OK)
    public List<Team> getTeams() {
        return teamRepository.findAll();
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PatchMapping("/team/{id}/add/{pokemonId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void addPokemon(@PathVariable("id") Integer id, @PathVariable("pokemonId") Integer pokemonId) {
        teamService.addPokemon(id, pokemonId);
    }

    @PatchMapping("/team/{id}/delete/{pokemonId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePokemon(@PathVariable("id") Integer id, @PathVariable("pokemonId") Integer pokemonPosition) {
        teamService.deletePokemon(id, pokemonPosition);
    }
}
