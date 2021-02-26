package com.ironhack.pokebackend.model;

import javax.persistence.*;

@Entity
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @OneToOne
    @JoinColumn(name = "trainer")
    private Trainer trainer;
    private Integer pokemon1;
    private Integer pokemon2;
    private Integer pokemon3;
    private Integer pokemon4;
    private Integer pokemon5;
    private Integer pokemon6;
    private Integer pokemon7;

    public Team() {
    }

    public Team(Trainer trainer) {
        this.trainer = trainer;
    }

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

    public Integer getPokemon1() {
        return pokemon1;
    }

    public void setPokemon1(Integer pokemon1) {
        this.pokemon1 = pokemon1;
    }

    public Integer getPokemon2() {
        return pokemon2;
    }

    public void setPokemon2(Integer pokemon2) {
        this.pokemon2 = pokemon2;
    }

    public Integer getPokemon3() {
        return pokemon3;
    }

    public void setPokemon3(Integer pokemon3) {
        this.pokemon3 = pokemon3;
    }

    public Integer getPokemon4() {
        return pokemon4;
    }

    public void setPokemon4(Integer pokemon4) {
        this.pokemon4 = pokemon4;
    }

    public Integer getPokemon5() {
        return pokemon5;
    }

    public void setPokemon5(Integer pokemon5) {
        this.pokemon5 = pokemon5;
    }

    public Integer getPokemon6() {
        return pokemon6;
    }

    public void setPokemon6(Integer pokemon6) {
        this.pokemon6 = pokemon6;
    }

    public Integer getPokemon7() {
        return pokemon7;
    }

    public void setPokemon7(Integer pokemon7) {
        this.pokemon7 = pokemon7;
    }
}
