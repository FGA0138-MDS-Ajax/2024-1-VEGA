import psycopg2

# Parâmetros de conexão com o banco de dados
dbname = "mesaFacil"
user = "postgres"
password = "xpedro03"
host = "localhost"
port = "5432"

# Função para adicionar um pedido ao carrinho de compras
def adicionar_pedido(produto_id, quantidade):
    try:
        # Estabelecer a conexão
        conn = psycopg2.connect(dbname=dbname, user=user, password=password, host=host, port=port)
        
        # Criar um cursor
        cur = conn.cursor()

        # Verificar se o produto existe no estoque (opcional)
        cur.execute("SELECT * FROM Produtos WHERE produtoId = %s", (produto_id,))
        produto = cur.fetchone()
        if not produto:
            print(f"Produto com ID {produto_id} não encontrado no estoque.")
            return False

        # Inserir o pedido na tabela Carrinho
        cur.execute("""
            INSERT INTO Carrinho (produtoId, quantidade, valorUnitario, mesaId, clienteId, data_horaPedido)
            VALUES (%s, %s, %s, %s, %s, CURRENT_TIMESTAMP)
            """, (produto_id, quantidade, produto[4], 0, 0))  # Assumindo que mesaId e clienteId são 0 por simplicidade
        
        # Confirmar a transação
        conn.commit()

        print(f"Pedido do produto '{produto[1]}' adicionado com sucesso ao carrinho.")
        return True

    except psycopg2.Error as e:
        print(f"Erro ao adicionar pedido: {e}")
        return False

    finally:
        # Fechar o cursor e a conexão
        if cur:
            cur.close()
        if conn:
            conn.close()

# Função para listar todos os pedidos adicionados ao carrinho e perguntar se pode-se realizar o pedido
def listar_pedidos_e_confirmar():
    try:
        # Estabelecer a conexão
        conn = psycopg2.connect(dbname=dbname, user=user, password=password, host=host, port=port)
        
        # Criar um cursor
        cur = conn.cursor()

        # Consultar todos os pedidos no carrinho (tabela Carrinho)
        cur.execute("SELECT * FROM Carrinho")
        pedidos = cur.fetchall()

        # Verificar se há pedidos para listar
        if not pedidos:
            print("Não há pedidos no carrinho para listar.")
            return

        # Exibir os pedidos
        print("Lista de Pedidos no Carrinho:")
        for pedido in pedidos:
            print(f"ID do Pedido: {pedido[0]}, Produto: {pedido[1]}, Quantidade: {pedido[2]}, Valor Unitário: R${pedido[3]:.2f}")

        # Perguntar ao usuário se deseja realizar o pedido
        confirmacao = input("Deseja realizar o pedido? (s/n): ").strip().lower()

        if confirmacao == 's':
            # Mover os pedidos do carrinho (Carrinho) para a tabela de pedidos (Pedidos)
            for pedido in pedidos:
                cur.execute("""
                    INSERT INTO Pedidos (produtoId, quantidade, valorUnitario, mesaId, clienteId, data_horaPedido)
                    VALUES (%s, %s, %s, %s, %s, %s)
                    """, (pedido[1], pedido[2], pedido[3], pedido[4], pedido[5], pedido[6]))
            
            # Confirmar a transação para mover os pedidos para a tabela Pedidos
            conn.commit()
            print("Pedidos movidos para a tabela Pedidos.")

            # Limpar o carrinho após a confirmação do pedido
            cur.execute("DELETE FROM Carrinho")
            conn.commit()
            print("Carrinho limpo após a confirmação do pedido.")
        else:
            print("Pedido não confirmado.")
            

    except psycopg2.Error as e:
        print(f"Erro ao listar ou confirmar pedidos: {e}")

    finally:
        # Fechar o cursor e a conexão
        if cur:
            cur.close()
        if conn:
            conn.close()

# Exemplo de uso das funções adicionar_pedido e listar_pedidos_e_confirmar
if __name__ == "__main__":
    # Adicionar um pedido de exemplo ao carrinho
    adicionar_pedido(1, 2)  # Exemplo: adicionar 2 unidades do produto com ID 1 ao carrinho

    # Listar os pedidos no carrinho e perguntar se pode-se realizar o pedido
    listar_pedidos_e_confirmar()
