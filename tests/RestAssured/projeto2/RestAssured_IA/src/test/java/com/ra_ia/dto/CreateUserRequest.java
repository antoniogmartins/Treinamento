package com.ra_ia.dto;

import com.ra_ia.api.UserDTO;

public class CreateUserRequest extends UserDTO
{
    UserDTO novoUsuario = new UserDTO(
            "Antonio Martins",
            "AntonioQA",
            "antonio@gmail.com"
    );

}
