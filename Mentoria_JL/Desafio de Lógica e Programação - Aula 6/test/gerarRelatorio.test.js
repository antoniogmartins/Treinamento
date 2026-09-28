const { gerarRelatorio } = require("../source/gerarRelatorio");

describe("GerarRelatorio com 'n' entradas", () => {

    test("CT01 - deve retornar 5 casos de Sucesso e 2 de Falha", () => {
        expect(gerarRelatorio(["pass", "fail", "pass", "fail", "pass"])).toEqual({
            totalTestes: 5,
            totalSucessos: 3,
            totalFalhas: 2,
            passRate: 60
        });
    });

    test("CT02 - deve retornar 2 casos de Sucesso e 2 de Falha", () => {
        expect(gerarRelatorio(["pass", "fail", "pass", "fail"])).toEqual({
            totalTestes: 4,
            totalSucessos: 2,
            totalFalhas: 2,
            passRate: 50
        });
    });

    test("CT03 - deve retornar 3 casos de Falha", () => {
        expect(gerarRelatorio(["fail", "fail", "fail"])).toEqual({
            totalTestes: 3,
            totalSucessos: 0,
            totalFalhas: 3,
            passRate: 0
        });
    });

    test("CT04 - deve retornar 3 casos de Sucesso", () => {
        expect(gerarRelatorio(["pass", "pass", "pass"])).toEqual({
            totalTestes: 3,
            totalSucessos: 3,
            totalFalhas: 0,
            passRate: 100
        });
    });

});


