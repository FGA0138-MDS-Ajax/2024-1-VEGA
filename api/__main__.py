from fastapi import FastAPI
from pydantic import BaseModel
import psycopg2

app = FastAPI()

# Definir a estrutura do item esperado na requisição
class Item(BaseModel):
    numero_mesa: int
    cliente_id: int
    data_da_reserva: str
    capacidade: int

# Rota para cadastrar a mesa
@app.post("/cadastro-mesa/")
async def cadastro_mesa(item: Item):
    try:
        # Estabelecer a conexão com o banco de dados
        conn = psycopg2.connect(
            dbname="nome_do_banco",
            user="nome_do_usuario",
            password="senha",
            host="localhost",
            port="5432"
        )

        # Criar um cursor
        cur = conn.cursor()

        # Inserir os dados da reserva na tabela Mesas
        cur.execute("""
            INSERT INTO Mesas (numeroMesa, clienteId, disponivel, dataDaReserva, capacidade)
            VALUES (%s, %s, %s, %s, %s)
            """, (item.numero_mesa, item.cliente_id, True, item.data_da_reserva, item.capacidade))
        
        # Confirmar a transação
        conn.commit()

        return {"item": f"Mesa número {item.numero_mesa} criada com sucesso para reserva."}

    except psycopg2.Error as e:
        print(f"Erro ao criar reserva de mesa: {e}")
        return {"error": "Erro ao criar reserva de mesa"}

    finally:
        # Fechar o cursor e a conexão
        if cur:
            cur.close()
        if conn:
            conn.close()
