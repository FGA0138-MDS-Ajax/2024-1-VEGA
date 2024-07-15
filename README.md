# Sistema de Gerenciamento de Restaurantes VEGA

## Visão Geral do Projeto

O Sistema de Gerenciamento de Restaurantes VEGA é uma aplicação web abrangente projetada para facilitar as operações de um restaurante. Este projeto inclui funcionalidades para gerenciar reservas de mesas, registro e login de usuários, e processamento de pagamentos tanto online quanto no restaurante. O sistema segue a arquitetura MVC (Model-View-Controller) e é construído usando Node.js e Express para o backend, com PostgreSQL como banco de dados.

## Funcionalidades

- **Registro e Login de Usuários:** Registre e autentique usuários com segurança.
- **Reservas de Mesas:** Permite que os clientes reservem mesas no restaurante.
- **Processamento de Pagamentos:** Gerencie pagamentos para produtos e reservas.
- **Painel de Administração:** Área restrita para gerenciar operações do restaurante.
- **Execução Automática de HTML:** Páginas HTML com fluxo automático para ações do usuário.

## Estrutura do Projeto

- **config/**: Arquivos de configuração, incluindo conexões de banco de dados.
- **db.js**: Arquivo de conexão e configuração do banco de dados (lembre-se de atualizar as senhas).
- **docs/**: Documentação do projeto.
- **node_modules/**: Dependências do Node.js.
- **routes/**: Definições de rotas da API.
- **view/**: Visões frontend incluindo arquivos HTML, CSS e JavaScript.
- **server.js**: Arquivo principal do servidor backend.

## Pré-requisitos

Antes de começar, certifique-se de ter atendido aos seguintes requisitos:

- [Node.js](https://nodejs.org/en/download/) instalado na sua máquina.
- [Express.js](https://expressjs.com/pt-br/starter/installing.html) instalado. Você pode instalá-lo usando o seguinte comando:
  ```sh
  npm install express
  ```
- [PostgreSQL](https://www.postgresql.org/download/) instalado e em execução.
- [pgAdmin](https://www.pgadmin.org/download/) instalado para gerenciar o banco de dados PostgreSQL.
- Um editor de código como [Visual Studio Code](https://code.visualstudio.com/).

## Começando

1. **Clonar o Repositório**
   ```sh
   git clone https://github.com/FGA0138-MDS-Ajax/2024-1-VEGA.git
   cd 2024-1-VEGA
   ```

2. **Instalar Dependências**
   ```sh
   npm install
   ```

3. **Configuração do Banco de Dados**
   Crie um banco de dados PostgreSQL e atualize o arquivo `config/db.js` com as credenciais do seu banco de dados.
   Exemplo:
   ```js
   const pool = new Pool({
     user: 'seu_usuario_db',
     host: 'localhost',
     database: 'seu_nome_db',
     password: 'sua_senha_db',
     port: 5432,
   });
   ```

4. **Executar o Servidor**
   ```sh
   node server.js
   ```

## Gestão do Banco de Dados
Certifique-se de que PostgreSQL e pgAdmin estão instalados e em execução no seu sistema. Você pode baixá-los do site oficial do PostgreSQL e do site oficial do pgAdmin.

## Configuração do banco de dados
Dentro das pastas do projeto, há uma pasta chamada 'BancoDeDados'. Dentro dessa pasta, há uma parte do código chamada 'Criando o Banco de Dados'. Copie esse código e execute-o no PGAdmin 4 do PostgreSQL. Uma vez criado o banco de dados, devemos popular alguns campos. Para isso, volte à pasta 'BancoDeDados' e copie a parte chamada 'Popular bancos de dados' e também execute no PGAdmin 4.

## Uso
- **Acessando a Aplicação:** Abra seu navegador e navegue até http://localhost:3000.
- **Funções Administrativas:** Navegue até o painel de administração para gerenciar as operações do restaurante.
- **Reservas:** Usuários podem reservar mesas através do formulário de reserva.
- **Pagamentos:** Processar pagamentos diretamente na plataforma.

## Desenvolvimento

### Scripts
**Iniciar o Servidor**
```sh
npm start
```

**Executar Testes** (Não recomendado)
```sh
npm test
```
*Nota: Testes de funcionalidade em PHP foram planejados, mas não finalizados.*

## Contribuindo
Para contribuir com o Sistema de Gerenciamento de Restaurantes VEGA, siga estas etapas:

1. Faça um fork deste repositório.
2. Crie uma branch: `git checkout -b <nome_da_branch>`.
3. Faça suas alterações e commite-as: `git commit -m '<mensagem_do_commit>'`.
4. Faça um push para a branch original: `git push origin <nome_do_projeto>/<local>`.
5. Crie um pull request.
