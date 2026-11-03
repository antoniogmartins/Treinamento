const usuario = {
    nome: "qa_teste",
    senhaValida: true,
    tentativas: 2
};

const usuarios = [
    usuario,
    {
        nome: "qa_invalido",
        senhaValida: false,
        tentativas: 1
    }
];

const validarLogin = (usuario) => {
    return usuario.senhaValida && usuario.tentativas < 3;
};


for (const u of usuarios){
     console.log(u.nome + " " + validarLogin(u));
}

