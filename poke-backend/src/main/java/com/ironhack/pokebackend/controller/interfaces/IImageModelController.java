package com.ironhack.pokebackend.controller.interfaces;

import com.ironhack.pokebackend.model.ImageModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface IImageModelController {
    void uploadImage(MultipartFile file) throws IOException;

    ImageModel getImage(String imageName) throws IOException;
}
