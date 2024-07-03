const express = require('express');
const router = express.Router();
const pool = require('../config/db');
// const bcrypt = require('bcryptjs');

// ----------------------------------------------------Função para reservar uma mesa---------------------------------------------------------------------------------------
const reservarMesa = async (pessoasStr, data, email, hora) => {
  const client = await pool.connect();
  const pessoas = parseInt(pessoasStr, 10); // Converter a string 'pessoas' para número

  try {
    // Procurar mesa com capacidade igual ou superior ao número de pessoas
    const querySelect = `
      SELECT mesaid, capacidade FROM Mesas
      WHERE disponivel = TRUE AND capacidade >= $1
      ORDER BY capacidade ASC
      LIMIT 1;
    `;
    const resultSelect = await client.query(querySelect, [pessoas]);
    const mesa = resultSelect.rows[0];

    if (mesa) {
      const mesaId = mesa.mesaid;
      // Atualizar os campos da mesa
      const queryUpdate = `
        UPDATE Mesas
        SET email = $1,
            disponivel = FALSE,
            dataDaReserva = $2,
            horaDaReserva = $3,
            persons = $4
        WHERE mesaid = $5;
      `;
      await client.query(queryUpdate, [email, data, hora, pessoasStr, mesaId]);
      await client.query('COMMIT');
      return `Mesa ${mesaId} reservada com sucesso para ${pessoasStr} pessoas.`;
    } else {
      return `Não há mesas disponíveis para ${pessoasStr} pessoas ou mais.`;
    }

  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

//------------------------------------------------- Rota POST para reservar uma mesa
router.post('/reservar_mesa', async (req, res) => {
  const { pessoas, data, email, hora } = req.body;

  try {
    const resultado = await reservarMesa(pessoas, data, email, hora);
    res.status(200).send(resultado);
  } catch (error) {
    console.error('Erro ao reservar mesa:', error);
    res.status(500).send('Erro no servidor');
  }
});

//------------------------------------------------Função para salvar dados do formulário------------------------------------------------------------------------
const salvarFormulario = async (nome, email, subject, mensagem) => {
  const client = await pool.connect();

  try {
    const queryInsert = `
      INSERT INTO form (nome, email, subject, mensagem)
      VALUES ($1, $2, $3, $4)
    `;
    await client.query(queryInsert, [nome, email, subject, mensagem]);
    await client.query('COMMIT');
    return 'Formulário enviado com sucesso.';
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

//---------------------------------------------Rota POST para salvar dados do formulário
router.post('/enviar_formulario', async (req, res) => {
  const { nome, email, subject, mensagem } = req.body;

  try {
    const resultado = await salvarFormulario(nome, email, subject, mensagem);
    res.status(200).send(resultado);
  } catch (error) {
    console.error('Erro ao enviar formulário:', error);
    res.status(500).send('Erro no servidor');
  }
});


//---------------------------------------------------Função para login de funcionários---------------------------------------------------------------------------
// logins the user and saves the user data in the client session
const loginFuncionario = async (cpf, senha) => {
  const client = await pool.connect();
  const userData = {}; // create an empty object to store user data

  // try to find the user by CPF

  try {
    // Procurar funcionário pelo CPF
    const querySelect = `
      SELECT nome, senha, endereco, especializacao, quantidadedemesas FROM Funcionario
      WHERE cpf = $1;
    `;
    const resultSelect = await client.query(querySelect, [cpf]);
    const funcionario = resultSelect.rows[0];
    userData.funcionario = funcionario; // save the user data in the client session
    userData.funcionario.senha = senha; // save the user password in the client session
    

    // if the user is found, check if the password is correct
    if (funcionario) {
      if (senha === funcionario.senha) {
        // generate the HTML for the user
        return userData;

      } else {
        return `Senha incorreta.`;
      }
    } else {
      return `Funcionário com CPF ${cpf} não encontrado.`;
    }

  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};

//----------------------------------------------------- Rota POST para login de funcionários
router.post('/login', async (req, res) => {
  const { cpf, senha } = req.body;

  try {
    const resultado = await loginFuncionario(cpf, senha);
    res.status(200).send(resultado);
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).send('Erro no servidor');
  }
});

// -----------------------------------------Função para calcular o valor total dos pedidos finalizados------------------------------------
const calcularValorTotalFinalizados = async (mesaId) => {
  const client = await pool.connect();

  try {
    // Executar a consulta para obter os valores unitários dos pedidos finalizados para uma mesa específica
    const query = `
      SELECT valorunitario
      FROM finalizado
      WHERE mesaId = $1
    `;
    const result = await client.query(query, [mesaId]);

    // Coletar os valores unitários e convertê-los para numérico
    const valoresUnitarios = result.rows.map(row => parseFloat(row.valorunitario));

    // Somar os valores unitários
    const valorTotal = valoresUnitarios.reduce((total, valor) => total + valor, 0);

    // Sempre retorna o valor total como string
    return valorTotal.toFixed(2).toString();
  } catch (error) {
    console.error(`Erro ao calcular valor total dos pedidos finalizados da mesa ${mesaId}: ${error}`);
    throw error;
  } finally {
    client.release();
  }
};

//-----------------------------------------Rota GET para calcular o valor total dos pedidos finalizados
router.get('/calcular_valor_total_finalizados/:mesaId', async (req, res) => {
  const mesaId = req.params.mesaId;
  try {
    const valorTotal = await calcularValorTotalFinalizados(mesaId);
    res.status(200).json({ valorTotal });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
});

//-----------------------------------------Função para finalizar um pedido ----------------------------------------------------------------------------------

const finalizarPedido = async (mesaId) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Atualizar a tabela finalizado para definir mesaId como NULL para a mesaId específica
    const updateQuery = `
      UPDATE finalizado
      SET mesaid = NULL
      WHERE mesaid = $1
    `;
    await client.query(updateQuery, [mesaId]);

    await client.query('COMMIT');
    return { success: true };
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(`Erro ao finalizar pedidos para a mesa ${mesaId}: ${error}`);
    throw error;
  } finally {
    client.release();
  }
};

//----------------------------------------- rota para a Função para finalizar um pedido

router.post('/finalizar_pedido/:mesaId', async (req, res) => {
  const mesaId = req.params.mesaId;
  try {
    const result = await finalizarPedido(mesaId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
});

//------------------------------------------------------função para atualizar o status de um pedido------------------------------------------------------------------------------------
const atualizarStatusPedido = async (pedidoId, novoStatus) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN'); // Iniciar transação

    // Verificar se o pedido existe antes de atualizar
    const querySelect = 'SELECT * FROM pedidos WHERE pedidoid = $1';
    const resultSelect = await client.query(querySelect, [pedidoId]);
    const pedido = resultSelect.rows[0];

    if (!pedido) {
      // console.log(`Pedido com ID ${pedidoId} não encontrado.`);
      return false;
    }

    // Atualizar o status do pedido na tabela Pedidos
    const queryUpdate = `
      UPDATE pedidos
      SET statuspedido = $1
      WHERE pedidoid = $2
      RETURNING *
    `;
    const resultUpdate = await client.query(queryUpdate, [novoStatus, pedidoId]);
    const pedidoAtualizado = resultUpdate.rows[0];

    // Verificar se o status atualizado é 'finalizado'
    if (novoStatus.toLowerCase() === 'finalizado') {
  
      const queryInsertFinalizado = `
        INSERT INTO finalizado (pedidoid, produtoid, quantidade, valorunitario, mesaid, clienteid, data_horaPedido, statuspedido, observacao)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `;
      await client.query(queryInsertFinalizado, [
        pedidoAtualizado.pedidoid, pedidoAtualizado.produtoid, pedidoAtualizado.quantidade,
        pedidoAtualizado.valorunitario, pedidoAtualizado.mesaid, pedidoAtualizado.clienteid,
        pedidoAtualizado.data_horapedido, pedidoAtualizado.statuspedido, pedidoAtualizado.observacao
      ]);
  
      // Remover o pedido da tabela Pedidos
      const queryDelete = 'DELETE FROM Pedidos WHERE pedidoid = $1';
      await client.query(queryDelete, [pedidoId]);
    }

    // Confirmar a transação
    await client.query('COMMIT');

    // console.log(`Status do pedido ID ${pedidoId} atualizado para '${novoStatus}'.`);
    return true;
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(`Erro ao atualizar status do pedido: ${error}`);
    return false;
  } finally {
    client.release();
  }
};

//-------------------------------------------------------Rota POST para atualizar o status de um pedido-------------------------------------------------------------------------------
router.post('/atualizar_status_pedido', async (req, res) => {
  const { pedidoId, novoStatus } = req.body;

  try {
    const sucesso = await atualizarStatusPedido(pedidoId, novoStatus);
    if (sucesso) {
      res.status(200).send(`Status do pedido ID ${pedidoId} atualizado para '${novoStatus}'.`);
    } else {
      res.status(404).send(`Pedido com ID ${pedidoId} não encontrado.`);
    }
  } catch (error) {
    res.status(500).send('Erro no servidor');
  }
});

//-----------------------------------------------------------Função para adicionar um novo produto-----------------------------------------------------------------
const adicionarProduto = async (nome, descricao, categoria, preco) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN'); // Iniciar transação

    // Inserir o novo produto na tabela Produtos
    const queryInsert = `
      INSERT INTO produtos (nome, descricao, categoria, preco)
      VALUES ($1, $2, $3, $4)
    `;
    await client.query(queryInsert, [nome, descricao, categoria, preco]);

    // Confirmar a transação
    await client.query('COMMIT');

    // console.log(`Novo produto '${nome}' adicionado com sucesso.`);
    return true;
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(`Erro ao adicionar novo produto: ${error}`);
    return false;
  } finally {
    client.release();
  }
};

//----------------------------------------------------------Rota POST para adicionar um novo produto
router.post('/adicionar_produto', async (req, res) => {
  const { nome, descricao, categoria, preco } = req.body;

  try {
    const sucesso = await adicionarProduto(nome, descricao, categoria, preco);
    if (sucesso) {
      res.status(200).send(`Novo produto '${nome}' adicionado com sucesso.`);
    } else {
      res.status(500).send('Erro ao adicionar novo produto.');
    }
  } catch (error) {
    res.status(500).send('Erro no servidor');
  }
});


//-----------------------------------------------------------Função para adicionar um novo pedido ao carrinho ()---------------------------------------------------
const adicionarPedido = async (produtoId, mesaId, quantidade) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN'); // Iniciar transação

    // Verificar se o produto existe no estoque (opcional)
    const querySelectProduto = 'SELECT * FROM produtos WHERE produtoid = $1';
    const resultSelectProduto = await client.query(querySelectProduto, [produtoId]);
    const produto = resultSelectProduto.rows[0];
    if (!produto) {
      // console.log(`Produto com ID ${produtoId} não encontrado no estoque.`);
      return false;
    }

    // Inserir o pedido na tabela Carrinho
    const queryInsertPedido = `
      INSERT INTO pedidos (produtoid, quantidade, valorunitario, mesaid, clienteid, data_horaPedido)
      VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)
    `;
    await client.query(queryInsertPedido, [produtoId, quantidade, produto.preco, mesaId, 0]); // Assumindo que mesaId e clienteId são 0 por simplicidade

    // Confirmar a transação
    await client.query('COMMIT');

    return true;
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(`Erro ao adicionar pedido: ${error}`);
    return false;
  } finally {
    client.release();
  }
};

//----------------------------------------------------Rota POST para adicionar um novo pedido ao carrinho ()
router.post('/adicionar_pedido', async (req, res) => {
  const { produtoId, mesaId, quantidade } = req.body;

  try {
    const sucesso = await adicionarPedido(produtoId, mesaId, quantidade);
    if (sucesso) {
      res.status(200).send(`Pedido do produto ID ${produtoId} adicionado com sucesso ao carrinho.`);
    } else {
      res.status(500).send('Erro ao adicionar pedido.');
    }
  } catch (error) {
    res.status(500).send('Erro no servidor');
  }
});

const listarPedidosPorMesa = async (mesaId) => {
  const client = await pool.connect();
  const pedidosList = [];

  try {
    // Consultar todos os pedidos na tabela Pedidos para uma mesa específica
    const querySelectPedidos = 'SELECT * FROM pedidos WHERE mesaid = $1';
    const resultSelectPedidos = await client.query(querySelectPedidos, [mesaId]);
    const pedidos = resultSelectPedidos.rows;

    // Verificar se há pedidos para listar
    if (pedidos.length === 0) {
      // console.log(`Não há pedidos para a mesa ${mesaId}.`);
      return { message: `Não há pedidos para a mesa ${mesaId}.` };
    }

    // Formatar os pedidos para retorno
    pedidos.forEach(pedido => {
      pedidosList.push({
        pedidoId: pedido.pedidoid,
        produtoId: pedido.produtoid,
        quantidade: pedido.quantidade,
        valorUnitario: pedido.valorunitario,
        mesaId: pedido.mesaid,
        clienteId: pedido.clienteid,
        dataHoraPedido: pedido.data_horapedido,
        status: pedido.statuspedido
      });
    });

    return pedidosList;
  } catch (error) {
    console.error(`Erro ao listar pedidos para a mesa ${mesaId}: ${error}`);
    throw error;
  } finally {
    client.release();
  }
};


//-----------------------------------------------------Rota GET para listar pedidos por mesa----------------------------------------------------------------------------
router.get('/listar_pedidos/:mesaId', async (req, res) => {
  const { mesaId } = req.params;

  try {
    const pedidosList = await listarPedidosPorMesa(mesaId);
    res.status(200).json(pedidosList);
  } catch (error) {
    console.error('Erro no servidor:', error);
    res.status(500).send('Erro no servidor');
  }
});


// ----------------------------------------- Listar todas as mesas ------------------------------------

const listarTodasAsMesas = async () => {
  const client = await pool.connect();
  const mesasList = [];

  try {
    // Consultar todas as mesas na tabela Mesas
    const querySelectMesas = 'SELECT * FROM mesas';
    const resultSelectMesas = await client.query(querySelectMesas);
    const mesas = resultSelectMesas.rows;

    // Verificar se há mesas para listar
    if (mesas.length === 0) {
      // console.log('Não há mesas.');
      return { message: 'Não há mesas.' };
    }

    // Exibir as mesas
    // console.log('Lista de Mesas:');
    mesas.forEach(mesa => {
      // console.log(`ID da Mesa: ${mesa.mesaid}, Capacidade: ${mesa.capacidade}, Email: ${mesa.email}, Disponivel: ${mesa.disponivel}, Data da Reserva: ${mesa.datadareserva}, Hora da Reserva: ${mesa.horadareserva}, Pessoas: ${mesa.persons}`);
      mesasList.push({
        mesaId: mesa.mesaid,
        capacidade: mesa.capacidade,
        email: mesa.email,
        disponivel: mesa.disponivel,
        dataDaReserva: mesa.datadareserva,
        horaDaReserva: mesa.horadareserva,
        pessoas: mesa.persons
      });
    });

    return mesasList;
  } catch (error) {
    console.error(`Erro ao listar mesas: ${error}`);
    throw error;
  } finally {
    client.release();
  }
};

router.get('/listar_mesas', async (req, res) => {
  try {
    const mesasList = await listarTodasAsMesas();
    // console.log(mesasList);
    res.status(200).json(mesasList);
  } catch (error) {
    console.error('Erro no servidor:', error);
    res.status(500).send('Erro no servidor');
  }
});



// ----------------------------------------- apagar pedidos ------------------------------------

const apagarPedido = async (pedidoId) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN'); // Iniciar transação

    // Verificar se o pedido existe antes de apagar
    const querySelect = 'SELECT * FROM Pedidos WHERE pedidoId = $1';
    const resultSelect = await client.query(querySelect, [pedidoId]);
    const pedido = resultSelect.rows[0];

    if (!pedido) {
      // console.log(`Pedido com ID ${pedidoId} não encontrado.`);
      return false;
    }

    // Apagar o pedido na tabela Pedidos
    const queryDelete = 'DELETE FROM Pedidos WHERE pedidoId = $1';
    await client.query(queryDelete, [pedidoId]);

    // Confirmar a transação
    await client.query('COMMIT');

    // console.log(`Pedido ID ${pedidoId} apagado com sucesso.`);
    return true;
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(`Erro ao apagar pedido: ${error}`);
    return false;
  } finally {
    client.release();
  }
};

router.post('/apagar_pedido', async (req, res) => {
  const { pedidoId } = req.body;

  try {
    const sucesso = await apagarPedido(pedidoId);
    if (sucesso) {
      res.status(200).send(`Pedido ID ${pedidoId} apagado com sucesso.`);
    } else {
      res.status(404).send(`Pedido com ID ${pedidoId} não encontrado.`);
    }
  } catch (error) {
    res.status(500).send('Erro no servidor');
  }
});
module.exports = router;