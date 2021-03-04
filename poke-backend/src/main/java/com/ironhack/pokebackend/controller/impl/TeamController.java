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
@CrossOrigin(origins = "http://localhost:4200")
public class TeamController implements ITeamController {

    // Inject all dependencies needed

    @Autowired
    private ITeamService teamService;

    @Autowired
    private TeamRepository teamRepository;

    // Get route to catch all the teams from the database

    @GetMapping("/teams")
    @ResponseStatus(HttpStatus.OK)
    public List<Team> getTeams() {
        return teamRepository.findAll();
    }

    // Patch route to add a specific pokemon to a specific team

    @PatchMapping("/team/{id}/add/{pokemonId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void addPokemon(@PathVariable("id") Integer id, @PathVariable("pokemonId") Integer pokemonId) {
        teamService.addPokemon(id, pokemonId);
    }

    // Patch route to delete a specific pokemon from a specific team

    @PatchMapping("/team/{id}/delete/{pokemonId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePokemon(@PathVariable("id") Integer id, @PathVariable("pokemonId") Integer pokemonPosition) {
        teamService.deletePokemon(id, pokemonPosition);
    }
}
