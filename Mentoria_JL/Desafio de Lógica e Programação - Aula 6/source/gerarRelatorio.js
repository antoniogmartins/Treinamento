function gerarRelatorio(resultados) {
    const totalTestes = resultados.length;

    const sucessos = resultados.filter(resultado => resultado === "pass");
    const totalSucessos = sucessos.length;

    const falhas = resultados.filter(resultado => resultado === "fail");
    const totalFalhas = falhas.length;

    const passRate = (totalSucessos / totalTestes) * 100;

    return {
        totalTestes,
        totalSucessos,
        totalFalhas,
        passRate
    };
}

module.exports = { gerarRelatorio };