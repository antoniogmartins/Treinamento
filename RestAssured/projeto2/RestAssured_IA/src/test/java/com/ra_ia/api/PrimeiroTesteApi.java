package com.ra_ia.api;
import com.ra_ia.dto.createUserRequest;
import com.ra_ia.dto.updateUserRequest;
import com.ra_ia.prediario.UsuarioNaoEncontradoException;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.response.Response;
import org.junit.jupiter.api.Test;
import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;

public class PrimeiroTesteApi {

    String baseUrl = "https://jsonplaceholder.typicode.com/";

   //  @Test
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

   // @Test
    void deveEncontrarUsuarioPorEmail() {

        Response resposta = RestAssured
                .given()
                .header("Accept", "application/json")
                .when()
                .get(baseUrl + "users")
                .then()
                .statusCode(200)
                .extract().response();

        List<UserDTO> usuarios = resposta.jsonPath().getList("", UserDTO.class);

        String nomeEsperado = "Clementine Bauch";
        String emailEsperado = "Nathan@yesenia.net";
        String usernameEsperado = "Samantha";

        Optional<UserDTO> resultado = usuarios.stream()
                .filter(cadaUsuario ->
                        emailEsperado.equals(cadaUsuario.getEmail())
                )
                .findFirst();

        UserDTO usuarioEncontrado = resultado.orElseThrow(
                () -> new UsuarioNaoEncontradoException(
                        "Usuário com o e-mail " + emailEsperado + " não encontrado")
        );


        assertEquals(nomeEsperado, usuarioEncontrado.getName());
        assertEquals(emailEsperado, usuarioEncontrado.getEmail());
        assertEquals(usernameEsperado, usuarioEncontrado.getUsername());
    }

   // @Test
    void deveCriarUsuario() {

        createUserRequest novoUsuario = new createUserRequest();

        Response resposta = RestAssured
                .given()
                .header("Accept", "application/json")
                .contentType(ContentType.JSON)
                .body(novoUsuario)
                .when()
                .post(baseUrl + "users")
                .then()
                .statusCode(201)
                .contentType(ContentType.JSON)
                .extract()
                .response();

        UserDTO usuarioCriado = resposta.as(UserDTO.class);

        assertEquals(11, usuarioCriado.getId());
        assertEquals(novoUsuario.getName(), usuarioCriado.getName());
        assertEquals(novoUsuario.getUsername(), usuarioCriado.getUsername());
        assertEquals(novoUsuario.getEmail(), usuarioCriado.getEmail());
    }

    @Test
    void deveAtualizarUsuario() {

        updateUserRequest atualizarUsuario = new  updateUserRequest();

        Response resposta = RestAssured
                .given()
                .header("Accept", "application/json")
                .contentType(ContentType.JSON)
                .body(atualizarUsuario)
                .when()
                .put(baseUrl + "users/10")
                .then()
                .statusCode(200)
                .contentType(ContentType.JSON)
                .extract()
                .response();

        UserDTO usuarioAtualizado = resposta.as(UserDTO.class);
        assertEquals(10, usuarioAtualizado.getId());
        assertEquals(atualizarUsuario.getName(), usuarioAtualizado.getName());
        assertEquals(atualizarUsuario.getUsername(), usuarioAtualizado.getUsername());
        assertEquals(atualizarUsuario.getEmail(), usuarioAtualizado.getEmail());
    }
}