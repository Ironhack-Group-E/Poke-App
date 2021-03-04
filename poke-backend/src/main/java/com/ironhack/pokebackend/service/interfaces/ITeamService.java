package com.ironhack.pokebackend.service.interfaces;

public interface ITeamService {
    void addPokemon(Integer id, Integer pokemonId);

    void deletePokemon(Integer id, Integer pokemonId);
}
