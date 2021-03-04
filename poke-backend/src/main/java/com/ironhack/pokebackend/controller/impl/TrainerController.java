package com.ironhack.pokebackend.controller.impl;

import com.ironhack.pokebackend.controller.dto.TeamDTO;
import com.ironhack.pokebackend.controller.interfaces.ITrainerController;
import com.ironhack.pokebackend.model.Team;
import com.ironhack.pokebackend.model.Trainer;
import com.ironhack.pokebackend.repository.TrainerRepository;
import com.ironhack.pokebackend.service.interfaces.ITrainerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class TrainerController implements ITrainerController {

    // Inject all dependencies neeeded

    @Autowired
    private ITrainerService trainerService;

    @Autowired
    private TrainerRepository trainerRepository;

    //Get route to bring all the trainers

    @GetMapping("/trainers")
    @ResponseStatus(HttpStatus.OK)
    public List<Trainer> getTrainers() {
        return trainerRepository.findAll();
    }

    //Post route to create a new trainer

    @PostMapping("/trainer")
    @ResponseStatus(HttpStatus.CREATED)
    public Trainer createTrainer(@RequestBody String trainerJSON){
        return trainerService.createTrainer(trainerJSON);
    }

    // Delete route to delete a trainer by id

    @DeleteMapping("/trainer/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTrainer(@PathVariable("id") Integer id) {
        trainerService.deleteTrainer(id);
    }

    //Get route to bring an specific team by id

    @GetMapping("/trainer/{id}/team")
    @ResponseStatus(HttpStatus.OK)
    public TeamDTO getTeam(@PathVariable Integer id) { return trainerService.getTeam(id); }
}
