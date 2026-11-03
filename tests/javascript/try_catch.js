const ambiente = false;

const consultarAmbiente = async () => {

    if (ambiente === true) {
    console.log("Ambiente disponível");
} else
    throw new Error("Ambiente indisponível");
};

const executar = async () => {
    try {
        const resultado = await consultarAmbiente();
        console.log(resultado);
    } catch (erro) {
        console.log("Falha:", erro.message);
    }
};

executar();