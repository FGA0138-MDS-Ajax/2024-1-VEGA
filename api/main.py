from fastapi import FastAPI

app = FastAPI()

@app.post("/cadastro-mesa/")
async def cadastrar_mesa():
    # Lógica para lidar com a requisição POST aqui
    return {"message": "Requisição POST recebida com sucesso"}
