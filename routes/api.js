const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Função para reservar uma mesa
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

// Rota POST para reservar uma mesa
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

module.exports = router;
