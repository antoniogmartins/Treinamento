package com.ra_ia.prediario;

// Geralmente estendemos RuntimeException para não sermos obrigados a usar 'try-catch' ou 'throws' toda vez
public class UsuarioNaoEncontradoException extends RuntimeException {

    public UsuarioNaoEncontradoException(String mensagem) {
        super(mensagem);
    }
}
