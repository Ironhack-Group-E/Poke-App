package com.ironhack.pokebackend.repository;

import com.ironhack.pokebackend.model.ImageModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ImageModelRepository extends JpaRepository<ImageModel, Long> {
    Optional<ImageModel> findByName(String name);
}
