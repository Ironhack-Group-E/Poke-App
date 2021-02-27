package com.ironhack.pokebackend.controller.dto;

import com.ironhack.pokebackend.model.Trainer;

import java.util.List;

public class TeamDTO {
    private Integer id;
    private Trainer trainer;
    private List<Integer> pokemonIds;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Trainer getTrainer() {
        return trainer;
    }

    public void setTrainer(Trainer trainer) {
        this.trainer = trainer;
    }

    public List<Integer> getPokemonIds() {
        return pokemonIds;
    }

    public void setPokemonIds(List<Integer> pokemonIds) {
        this.pokemonIds = pokemonIds;
    }
}
