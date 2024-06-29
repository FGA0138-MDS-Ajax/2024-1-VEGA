const express = require('express');
const path = require('path');
const app = express();

// Middleware para analisar o corpo das requisições
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Defina a pasta 'Front-view' como a pasta estática
app.use(express.static(path.join(__dirname, 'view')));

// Roteamento da API
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Defina o arquivo HTML principal para a rota raiz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'view', 'index-01.html'));
});

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
