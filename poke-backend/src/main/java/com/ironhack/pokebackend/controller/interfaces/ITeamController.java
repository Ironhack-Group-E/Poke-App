package com.ironhack.pokebackend.controller.interfaces;

import com.ironhack.pokebackend.model.Team;

import java.util.List;

// Team interface with all trainer controller routes

public interface ITeamController {

    List<Team> getTeams();

    void addPokemon(Integer id, Integer pokemonId);

    void deletePokemon(Integer id, Integer pokemonPosition);
}
