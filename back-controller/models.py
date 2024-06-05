class Pedido:
    def __init__(self, numero_pedido, itens):
        self.numero_pedido = numero_pedido
        self.itens = itens
        self.status = "Em andamento"

    def __str__(self):
        return f"Pedido {self.numero_pedido}: {self.itens} - {self.status}"
