package com.ironhack.pokebackend.repository;

import com.ironhack.pokebackend.model.Team;
import com.ironhack.pokebackend.model.Trainer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TeamRepository extends JpaRepository<Team, Integer> {
    Optional<Team> findByTrainer(Trainer trainer);
}
