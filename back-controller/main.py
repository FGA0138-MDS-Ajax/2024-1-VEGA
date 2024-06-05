from controllers import ControladorDePedidos

if __name__ == "__main__":
    controlador = ControladorDePedidos()
    controlador.fazer_pedido(1, ["Hamburguer", "Batata frita", "Refrigerante"])
    controlador.fazer_pedido(2, ["Pizza", "Cerveja"])
    controlador.exibir_pedidos()
    controlador.atualizar_status_pedido(1, "Concluído")
    controlador.remover_pedido(1)
    controlador.exibir_pedidos()
