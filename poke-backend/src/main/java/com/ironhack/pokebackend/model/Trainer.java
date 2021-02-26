package com.ironhack.pokebackend.model;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;

@Entity
public class Trainer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @NotEmpty
    private String trainerName;
    @Min(1)
    private Integer age;
    @NotEmpty
    private String hobby;
    private String photo = "https://www.seekpng.com/png/detail/242-2421423_pokemon-trainer-sprite-png-pixel-pokemon-trainer-sprites.png";

    public Trainer() {
    }

    public Trainer(String trainerName, Integer age, String hobby, String photo) {
        this.trainerName = trainerName;
        this.age = age;
        this.hobby = hobby;
        this.photo = photo;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTrainerName() {
        return trainerName;
    }

    public void setTrainerName(String trainerName) {
        this.trainerName = trainerName;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getHobby() {
        return hobby;
    }

    public void setHobby(String hobby) {
        this.hobby = hobby;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }
}
