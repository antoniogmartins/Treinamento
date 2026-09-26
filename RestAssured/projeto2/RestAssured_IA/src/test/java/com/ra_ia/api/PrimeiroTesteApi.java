package com.ra_ia.api;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.ra_ia.prediario.UsuarioNaoEncontradoException;
import io.restassured.RestAssured;
import io.restassured.response.Response;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

import static io.restassured.RestAssured.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class PrimeiroTesteApi {

    String baseUrl = "https://jsonplaceholder.typicode.com/";

   // @Test
    void deveConsultarUsuarios() {
    Response resposta = RestAssured
                .given()
                .header("Accept", "application/json")
                .when()
                .get(baseUrl + "users")
                .then()
                .statusCode(200)
                .extract().response();
        // System.out.println(resposta.asString());
        String nomePrimeiroUsuario = resposta.jsonPath().getString("[0].name");
        String emailPrimeiroUsuario = resposta.jsonPath().getString("[0].email");
        String addressPrimeiroUsuario = String.format("%s - %s", resposta.jsonPath().getString("[0].address.street"), resposta.jsonPath().getString("[0].address.suite"));
        String phonePrimeiroUsuario = resposta.jsonPath().getString("[0].phone");
        String companyPrimeiroUsuario = resposta.jsonPath().getString("[0].company.name");

        System.out.println("Primeiro Usuario: " + nomePrimeiroUsuario);
        System.out.println("Email: " + emailPrimeiroUsuario);
        System.out.println("Endereço: " + addressPrimeiroUsuario);
        System.out.println("Phone: " + phonePrimeiroUsuario);
        System.out.println("Company: " + companyPrimeiroUsuario);

    }

    @Test
    void deveEncontrarUsuarioPorEmail() {

        Response resposta = RestAssured
                .given()
                .header("Accept", "application/json")
                .when()
                .get(baseUrl + "users")
                .then()
                .statusCode(200)
                .extract().response();

//        List<Map<String, Object>> emailnomesDosUsuarios = resposta.jsonPath().getList("");
        List<UserDTO> usuarios = resposta.jsonPath().getList("", UserDTO.class);

        String nomeEsperado = "Clementine Bauch";
        String emailEsperado = "Nathan@yesenia.net";
        String usernameEsperado = "Samantha";

        Optional<UserDTO> resultado = usuarios.stream()
                .filter(cadaUsuario ->
                        emailEsperado.equals(cadaUsuario.getEmail())
                )
                .findFirst()
                ;

        UserDTO usuarioEncontrado = resultado.orElseThrow(
                () -> new UsuarioNaoEncontradoException(
                        "Usuário com o e-mail " + emailEsperado + " não encontrado")
        );


        assertEquals(nomeEsperado, usuarioEncontrado.getName());
        assertEquals(emailEsperado, usuarioEncontrado.getEmail());
        assertEquals(usernameEsperado, usuarioEncontrado.getUsername());


    }
}
