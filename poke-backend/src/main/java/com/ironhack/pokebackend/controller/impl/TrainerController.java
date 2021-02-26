package com.ironhack.pokebackend.controller.impl;

import com.ironhack.pokebackend.controller.interfaces.ITrainerController;
import com.ironhack.pokebackend.model.Trainer;
import com.ironhack.pokebackend.repository.TrainerRepository;
import com.ironhack.pokebackend.service.interfaces.ITrainerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class TrainerController implements ITrainerController {

    @Autowired
    private ITrainerService trainerService;

    @Autowired
    private TrainerRepository trainerRepository;

    @GetMapping("/trainers")
    @ResponseStatus(HttpStatus.OK)
    public List<Trainer> getTrainers() {
        return trainerRepository.findAll();
    }

    @PostMapping("/trainer")
    @ResponseStatus(HttpStatus.CREATED)
    public Trainer createTrainer(@RequestBody @Valid Trainer trainer){
        return trainerService.createTrainer(trainer);
    }

    @DeleteMapping("/trainer/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTrainer(@PathVariable("id") Integer id) {
        trainerService.deleteTrainer(id);
    }
}
