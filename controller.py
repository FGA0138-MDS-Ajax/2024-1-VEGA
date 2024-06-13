import psycopg2

# Parâmetros de conexão com o banco de dados
dbname = "mesaFacil"
user = "postgres"
password = "xpedro03"
host = "localhost"
port = "5432"


# Função para somar e imprimir o valor total dos pedidos finalizados
def calcular_valor_total_finalizados():
    try:
        # Estabelecer a conexão
        conn = psycopg2.connect(dbname=dbname, user=user, password=password, host=host, port=port)
        
        # Criar um cursor
        cur = conn.cursor()

        # Consultar e calcular o valor total dos pedidos finalizados
        cur.execute("""
            SELECT SUM(quantidade * valorUnitario) AS valor_total
            FROM finalizado
        """)
        
        # Recuperar o resultado da consulta
        resultado = cur.fetchone()
        if resultado:
            valor_total = resultado[0]
            print(f"Valor total dos pedidos finalizados: R$ {valor_total:.2f}")
        else:
            print("Nenhum pedido finalizado encontrado.")

    except psycopg2.Error as e:
        print(f"Erro ao calcular valor total dos pedidos finalizados: {e}")

    finally:
        # Fechar o cursor e a conexão
        if cur:
            cur.close()
        if conn:
            conn.close()

# Função para atualizar o status de um pedido e mover para a tabela finalizado se for 'finalizado'
def atualizar_status_finalizado(pedido_id, novo_status):
    try:
        # Estabelecer a conexão
        conn = psycopg2.connect(dbname=dbname, user=user, password=password, host=host, port=port)
        
        # Criar um cursor
        cur = conn.cursor()

        # Verificar se o pedido existe antes de atualizar
        cur.execute("SELECT * FROM Pedidos WHERE pedidoId = %s", (pedido_id,))
        pedido = cur.fetchone()
        if not pedido:
            print(f"Pedido com ID {pedido_id} não encontrado.")
            return False

        # Atualizar o status do pedido na tabela Pedidos
        cur.execute("""
            UPDATE Pedidos
            SET statusPedido = %s
            WHERE pedidoId = %s
            RETURNING *
            """, (novo_status, pedido_id))
        
        # Verificar se o status atualizado é 'finalizado'
        if novo_status.lower() == 'finalizado'.lower():
            pedido_atualizado = cur.fetchone()
            
            # Inserir o pedido finalizado na tabela finalizado
            cur.execute("""
                INSERT INTO finalizado (pedidoId, produtoId, quantidade, valorUnitario, mesaId, clienteId, data_horaPedido, statusPedido, observacao)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                """, (pedido_atualizado[0], pedido_atualizado[1], pedido_atualizado[2], pedido_atualizado[3], pedido_atualizado[4],
                      pedido_atualizado[5], pedido_atualizado[6], pedido_atualizado[7], pedido_atualizado[8]))
            
            # Remover o pedido da tabela Pedidos
            cur.execute("DELETE FROM Pedidos WHERE pedidoId = %s", (pedido_id,))
        
        # Confirmar a transação
        conn.commit()

        print(f"Status do pedido ID {pedido_id} atualizado para '{novo_status}'.")
        return True

    except psycopg2.Error as e:
        print(f"Erro ao atualizar status do pedido: {e}")
        return False

    finally:
        # Fechar o cursor e a conexão
        if cur:
            cur.close()
        if conn:
            conn.close()

# Função para atualizar o status de um pedido na tabela Pedidos
def atualizar_status_pedido(pedido_id, novo_status):
    try:
        # Estabelecer a conexão
        conn = psycopg2.connect(dbname=dbname, user=user, password=password, host=host, port=port)
        
        # Criar um cursor
        cur = conn.cursor()

        # Verificar se o pedido existe antes de atualizar
        cur.execute("SELECT * FROM Pedidos WHERE pedidoId = %s", (pedido_id,))
        pedido = cur.fetchone()
        if not pedido:
            print(f"Pedido com ID {pedido_id} não encontrado.")
            return False

        # Atualizar o status do pedido na tabela Pedidos
        cur.execute("""
            UPDATE Pedidos
            SET statusPedido = %s
            WHERE pedidoId = %s
            """, (novo_status, pedido_id))
        
        # Confirmar a transação
        conn.commit()

        print(f"Status do pedido ID {pedido_id} atualizado para '{novo_status}'.")
        return True

    except psycopg2.Error as e:
        print(f"Erro ao atualizar status do pedido: {e}")
        return False

    finally:
        # Fechar o cursor e a conexão
        if cur:
            cur.close()
        if conn:
            conn.close()

# Função para adicionar um novo produto à tabela Produtos
def adicionar_produto(nome, descricao, categoria, preco):
    try:
        # Estabelecer a conexão
        conn = psycopg2.connect(dbname=dbname, user=user, password=password, host=host, port=port)
        
        # Criar um cursor
        cur = conn.cursor()

        # Inserir o novo produto na tabela Produtos
        cur.execute("""
            INSERT INTO Produtos (nome, descricao, categoria, preco)
            VALUES (%s, %s, %s, %s)
            """, (nome, descricao, categoria, preco))
        
        # Confirmar a transação
        conn.commit()

        print(f"Novo produto '{nome}' adicionado com sucesso.")
        return True

    except psycopg2.Error as e:
        print(f"Erro ao adicionar novo produto: {e}")
        return False

    finally:
        # Fechar o cursor e a conexão
        if cur:
            cur.close()
        if conn:
            conn.close()

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
    #adicionar_pedido(1, 2)  # Exemplo: adicionar 2 unidades do produto com ID 1 ao carrinho

    # Listar os pedidos no carrinho e perguntar se pode-se realizar o pedido
    #listar_pedidos_e_confirmar()

    # Exemplo de chamada da função para adicionar um novo produto
    #adicionar_produto("Coca-Cola", "Refrigerante de cola", "Bebida", 5.00)

    # Exemplo de chamada da função para atualizar o status de um pedido
    #atualizar_status_pedido(1, 'finalizado')  # Exemplo: atualizar o status do pedido com ID 1 para 'em preparo'

    # Exemplo de chamada da função para atualizar o status de um pedido para 'finalizado'
    #atualizar_status_finalizado(4, 'finalizado')  # Exemplo: atualizar o status do pedido com ID 1 para 'finalizado'
    #calcular_valor_total_finalizados()

