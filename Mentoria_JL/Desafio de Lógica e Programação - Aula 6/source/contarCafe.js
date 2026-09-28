function contarCafe(pedidos) {
    return pedidos.filter(pedido => pedido === "café").length;
}

module.exports = { contarCafe };