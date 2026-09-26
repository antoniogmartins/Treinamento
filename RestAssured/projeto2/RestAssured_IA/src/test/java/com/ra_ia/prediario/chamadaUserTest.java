package com.ra_ia.prediario;

import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class chamadaUserTest {

    @Test
    public void testchamadaUserTest(){
        User usuario1 = new User(1, "Antonio", "antonio@gmail.com", "Quality Assurance");
        User usuario2 = new User(2, "Francileide", "francis@gmail.com", "Psicologa");
        User usuario3 = new User(3, "Carlos", "carlos@gmail.com", "Quality Assurance");

        List<User> users = new ArrayList<>();
        users.add(usuario1);
        users.add(usuario2);
        users.add(usuario3);

        for (User usuario : users) {
            System.out.println(usuario.getName());
        }
        String nome_usuario = "Antonio";
        String email1 = "antonio@gmail.com";

        users.stream()
                .filter(usuario ->
                       nome_usuario.equals(usuario.getName())
                                && email1.equals(usuario.getEmail())
                )
                .findFirst()
                .ifPresent(System.out::println);

        String email2 = "francis@gmail.com";
        Optional<User> resultado = users.stream()
                .filter(usuario -> email2.equals(usuario.getEmail())
                )
                .findFirst();

        User usuarioEncontrado = resultado.orElseThrow(() -> new UsuarioNaoEncontradoException("Usuario:"+email2+" nao enconrado"));
        boolean nomeCorreto = usuarioEncontrado.getName().equals(("Francileide"));
        boolean emailCorreto = usuarioEncontrado.getEmail().equals(("francis@gmail.com"));
        boolean profissaoCorreta = usuarioEncontrado.getRole().equals(("Psicologa"));

        if (nomeCorreto && emailCorreto && profissaoCorreta) {
            System.out.println("Dados Corretos");
        } else {
            System.out.println("Dados Incorretos");
        }

        users.stream()
                .filter(usuario ->
                        usuario.getRole().equals("Quality Assurance")
                )
                .forEach(usuario -> System.out.println(usuario.getName()+": "+usuario.getRole())
                );

        String role = "Quality Assurance";
        long qtde = users.stream()
                .filter(usuario ->role.equals(usuario.getRole())
                )
                .count();
        System.out.println("Qtde de Usuarios do tipo "+role+": "+ qtde);

    }
}
