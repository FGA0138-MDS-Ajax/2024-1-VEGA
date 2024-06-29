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

//------------------------------------------------- Rota POST para reservar uma mesa--------------------------------------------------------------------------------
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

//---------------------------------------------Rota POST para salvar dados do formulário------------------------------------------------------------------------------------
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
const loginFuncionario = async (cpf, senha) => {
  const client = await pool.connect();

  try {
    // Procurar funcionário pelo CPF
    const querySelect = `
      SELECT nome, senha FROM Funcionario
      WHERE cpf = $1;
    `;
    const resultSelect = await client.query(querySelect, [cpf]);
    const funcionario = resultSelect.rows[0];

    if (funcionario) {
      // Verificar se a senha está correta
      // const senhaCorreta = await bcrypt.compare(senha, funcionario.senha);
      // if (senhaCorreta) {
      //   return `Login bem-sucedido. Bem-vindo, ${funcionario.nome}!`;
      // } else {
      //   return `Senha incorreta.`;
      // }
       if (senha===funcionario.senha) {
        return `Login bem-sucedido. Bem-vindo, ${funcionario.nome}!`;
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

//----------------------------------------------------- Rota POST para login de funcionários--------------------------------------------------------------------
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
const calcularValorTotalFinalizados = async () => {
  const client = await pool.connect();

  try {
    // Executar a consulta e calcular o valor total dos pedidos finalizados
    const query = `
      SELECT SUM(quantidade * valorUnitario) AS valor_total
      FROM finalizado
    `;
    const result = await client.query(query);
    const valorTotal = result.rows[0].valor_total;

    if (valorTotal !== null) {
      console.log(`Valor total dos pedidos finalizados: R$ ${valorTotal.toFixed(2)}`);
      return valorTotal.toFixed(2);
    } else {
      console.log("Nenhum pedido finalizado encontrado.");
      return null;
    }
  } catch (error) {
    console.error(`Erro ao calcular valor total dos pedidos finalizados: ${error}`);
    throw error;
  } finally {
    client.release();
  }
};

//-----------------------------------------Rota GET para calcular o valor total dos pedidos finalizados------------------------------------------------
router.get('/calcular_valor_total_finalizados', async (req, res) => {
  try {
    const valorTotal = await calcularValorTotalFinalizados();
    if (valorTotal !== null) {
      res.status(200).send(`Valor total dos pedidos finalizados: R$ ${valorTotal}`);
    } else {
      res.status(404).send("Nenhum pedido finalizado encontrado.");
    }
  } catch (error) {
    res.status(500).send('Erro no servidor');
  }
});


//------------------------------------------------Função para atualizar o status de um pedido--------------------------------------------------------------
const atualizarStatusFinalizado = async (pedidoId, novoStatus) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN'); // Iniciar transação

    // Verificar se o pedido existe antes de atualizar
    const querySelect = 'SELECT * FROM Pedidos WHERE pedidoId = $1';
    const resultSelect = await client.query(querySelect, [pedidoId]);
    const pedido = resultSelect.rows[0];

    if (!pedido) {
      console.log(`Pedido com ID ${pedidoId} não encontrado.`);
      return false;
    }

    // Atualizar o status do pedido na tabela Pedidos
    const queryUpdate = `
      UPDATE Pedidos
      SET statusPedido = $1
      WHERE pedidoId = $2
      RETURNING *
    `;
    const resultUpdate = await client.query(queryUpdate, [novoStatus, pedidoId]);
    const pedidoAtualizado = resultUpdate.rows[0];

    // Verificar se o status atualizado é 'finalizado'
    if (novoStatus.toLowerCase() === 'finalizado') {
      const queryInsertFinalizado = `
        INSERT INTO finalizado (pedidoId, produtoId, quantidade, valorUnitario, mesaId, clienteId, data_horaPedido, statusPedido, observacao)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `;
      await client.query(queryInsertFinalizado, [
        pedidoAtualizado.pedidoid, pedidoAtualizado.produtoid, pedidoAtualizado.quantidade,
        pedidoAtualizado.valorunitario, pedidoAtualizado.mesaid, pedidoAtualizado.clienteid,
        pedidoAtualizado.data_horapedido, pedidoAtualizado.statuspedido, pedidoAtualizado.observacao
      ]);

      // Remover o pedido da tabela Pedidos
      const queryDelete = 'DELETE FROM Pedidos WHERE pedidoId = $1';
      await client.query(queryDelete, [pedidoId]);
    }

    // Confirmar a transação
    await client.query('COMMIT');

    console.log(`Status do pedido ID ${pedidoId} atualizado para '${novoStatus}'.`);
    return true;
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(`Erro ao atualizar status do pedido: ${error}`);
    return false;
  } finally {
    client.release();
  }
};

//-----------------------------------------------------Rota POST para atualizar o status de um pedido-------------------------------------------------------------------------
router.post('/atualizar_status_finalizado', async (req, res) => {
  const { pedidoId, novoStatus } = req.body;

  try {
    const sucesso = await atualizarStatusFinalizado(pedidoId, novoStatus);
    if (sucesso) {
      res.status(200).send(`Status do pedido ID ${pedidoId} atualizado para '${novoStatus}'.`);
    } else {
      res.status(404).send(`Pedido com ID ${pedidoId} não encontrado.`);
    }
  } catch (error) {
    res.status(500).send('Erro no servidor');
  }
});


//------------------------------------------------------unção para atualizar o status de um pedido------------------------------------------------------------------------------------
const atualizarStatusPedido = async (pedidoId, novoStatus) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN'); // Iniciar transação

    // Verificar se o pedido existe antes de atualizar
    const querySelect = 'SELECT * FROM Pedidos WHERE pedidoId = $1';
    const resultSelect = await client.query(querySelect, [pedidoId]);
    const pedido = resultSelect.rows[0];

    if (!pedido) {
      console.log(`Pedido com ID ${pedidoId} não encontrado.`);
      return false;
    }

    // Atualizar o status do pedido na tabela Pedidos
    const queryUpdate = `
      UPDATE Pedidos
      SET statusPedido = $1
      WHERE pedidoId = $2
    `;
    await client.query(queryUpdate, [novoStatus, pedidoId]);

    // Confirmar a transação
    await client.query('COMMIT');

    console.log(`Status do pedido ID ${pedidoId} atualizado para '${novoStatus}'.`);
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
      INSERT INTO Produtos (nome, descricao, categoria, preco)
      VALUES ($1, $2, $3, $4)
    `;
    await client.query(queryInsert, [nome, descricao, categoria, preco]);

    // Confirmar a transação
    await client.query('COMMIT');

    console.log(`Novo produto '${nome}' adicionado com sucesso.`);
    return true;
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(`Erro ao adicionar novo produto: ${error}`);
    return false;
  } finally {
    client.release();
  }
};

//----------------------------------------------------------Rota POST para adicionar um novo produto--------------------------------------------------------------
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
const adicionarPedido = async (produtoId, quantidade) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN'); // Iniciar transação

    // Verificar se o produto existe no estoque (opcional)
    const querySelectProduto = 'SELECT * FROM Produtos WHERE produtoId = $1';
    const resultSelectProduto = await client.query(querySelectProduto, [produtoId]);
    const produto = resultSelectProduto.rows[0];
    if (!produto) {
      console.log(`Produto com ID ${produtoId} não encontrado no estoque.`);
      return false;
    }

    // Inserir o pedido na tabela Carrinho
    const queryInsertPedido = `
      INSERT INTO Carrinho (produtoId, quantidade, valorUnitario, mesaId, clienteId, data_horaPedido)
      VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)
    `;
    await client.query(queryInsertPedido, [produtoId, quantidade, produto.preco, 0, 0]); // Assumindo que mesaId e clienteId são 0 por simplicidade

    // Confirmar a transação
    await client.query('COMMIT');

    console.log(`Pedido do produto '${produto.nome}' adicionado com sucesso ao carrinho.`);
    return true;
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(`Erro ao adicionar pedido: ${error}`);
    return false;
  } finally {
    client.release();
  }
};

//----------------------------------------------------Rota POST para adicionar um novo pedido ao carrinho ()---------------------------------------------------------
router.post('/adicionar_pedido', async (req, res) => {
  const { produtoId, quantidade } = req.body;

  try {
    const sucesso = await adicionarPedido(produtoId, quantidade);
    if (sucesso) {
      res.status(200).send(`Pedido do produto ID ${produtoId} adicionado com sucesso ao carrinho.`);
    } else {
      res.status(500).send('Erro ao adicionar pedido.');
    }
  } catch (error) {
    res.status(500).send('Erro no servidor');
  }
});

//--------------------------------------------------------Função para listar pedidos e confirmar-------------------------------------------------------------------------
const listarPedidosEConfirmar = async () => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN'); // Iniciar transação

    // Consultar todos os pedidos no carrinho (tabela Carrinho)
    const querySelectPedidos = 'SELECT * FROM Carrinho';
    const resultSelectPedidos = await client.query(querySelectPedidos);
    const pedidos = resultSelectPedidos.rows;

    // Verificar se há pedidos para listar
    if (pedidos.length === 0) {
      console.log("Não há pedidos no carrinho para listar.");
      return;
    }

    // Exibir os pedidos
    console.log("Lista de Pedidos no Carrinho:");
    pedidos.forEach(pedido => {
      console.log(`ID do Pedido: ${pedido.carrinhoid}, Produto: ${pedido.produtoid}, Quantidade: ${pedido.quantidade}, Valor Unitário: R$${pedido.valorunitario.toFixed(2)}`);
    });

    // Perguntar ao usuário se deseja realizar o pedido
    const confirmacao = 's'; // Aqui você pode simular a entrada do usuário ou implementar uma lógica de interação real

    if (confirmacao === 's') {
      // Mover os pedidos do carrinho (Carrinho) para a tabela de pedidos (Pedidos)
      for (const pedido of pedidos) {
        const queryInsertPedido = `
          INSERT INTO Pedidos (produtoId, quantidade, valorUnitario, mesaId, clienteId, data_horaPedido)
          VALUES ($1, $2, $3, $4, $5, $6)
        `;
        await client.query(queryInsertPedido, [pedido.produtoid, pedido.quantidade, pedido.valorunitario, pedido.mesaid, pedido.clienteid, pedido.data_horapedido]);
      }

      // Confirmar a transação para mover os pedidos para a tabela Pedidos
      await client.query('COMMIT');
      console.log("Pedidos movidos para a tabela Pedidos.");

      // Limpar o carrinho após a confirmação do pedido
      const queryDeleteCarrinho = 'DELETE FROM Carrinho';
      await client.query(queryDeleteCarrinho);
      await client.query('COMMIT');
      console.log("Carrinho limpo após a confirmação do pedido.");
    } else {
      console.log("Pedido não confirmado.");
    }
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(`Erro ao listar ou confirmar pedidos: ${error}`);
  } finally {
    client.release();
  }
};

//-----------------------------------------------------Rota GET para listar pedidos e confirmar----------------------------------------------------------------------------
router.get('/listar_pedidos_e_confirmar', async (req, res) => {
  try {
    await listarPedidosEConfirmar();
    res.status(200).send('Operação concluída.');
  } catch (error) {
    console.error('Erro no servidor:', error);
    res.status(500).send('Erro no servidor');
  }
});

module.exports = router;