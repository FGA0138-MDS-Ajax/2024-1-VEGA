from models import Pedido

class ControladorDePedidos:
    def __init__(self):
        self.fila_de_pedidos = []

    def fazer_pedido(self, numero_pedido, itens):
        novo_pedido = Pedido(numero_pedido, itens)
        self.fila_de_pedidos.append(novo_pedido)
        print(f"Pedido {numero_pedido} adicionado com sucesso.")
    
    def exibir_pedidos(self):
        if not self.fila_de_pedidos:
            print("Nenhum pedido na fila.")
        else:
            for pedido in self.fila_de_pedidos:
                print(pedido)

    def atualizar_status_pedido(self, numero_pedido, novo_status):
        for pedido in self.fila_de_pedidos:
            if pedido.numero_pedido == numero_pedido:
                pedido.status = novo_status
                print(f"Status do Pedido {numero_pedido} atualizado para '{novo_status}'.")
                return
        print(f"Pedido {numero_pedido} não encontrado.")

    def remover_pedido(self, numero_pedido):
        for pedido in self.fila_de_pedidos:
            if pedido.numero_pedido == numero_pedido:
                self.fila_de_pedidos.remove(pedido)
                print(f"Pedido {numero_pedido} removido.")
                return
        print(f"Pedido {numero_pedido} não encontrado.")
