const { contarCafe } = require("../source/contarCafe");

describe("Contagem de pedidos de café", () => {

    test("CT01 - deve retornar 2 quando existem dois cafés", () => {
        const pedidos = [
            "café",
            "cha",
            "bolo de cenoura",
            "café",
            "suco de laranja"
        ];

        expect(contarCafe(pedidos)).toBe(2);
    });

    test("CT02 - deve retornar 0 quando não existe café", () => {
        const pedidos = [
            "cha",
            "bolo",
            "suco"
        ];

        expect(contarCafe(pedidos)).toBe(0);
    });

    test("CT03 - deve retornar 1 quando existe apenas um café", () => {
        const pedidos = ["café"];

        expect(contarCafe(pedidos)).toBe(1);
    });

    test("CT04 - deve retornar a quantidade total quando todos os pedidos são café", () => {
        const pedidos = [
            "café",
            "café",
            "café"
        ];

        expect(contarCafe(pedidos)).toBe(3);
    });

    test("CT05 - deve retornar 0 para uma lista vazia", () => {
        const pedidos = [];

        expect(contarCafe(pedidos)).toBe(0);
    });

});