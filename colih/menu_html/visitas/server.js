/**
 * ==============================================================================
 * SERVIDOR REST API EXPRESS E REGISTRO DE ROTAS CRUD (server.js)
 * ==============================================================================
 * 
 * Este arquivo define o servidor web Express que escuta requisições HTTP e 
 * conecta o frontend JavaScript ao banco de dados PostgreSQL 'colih'.
 * 
 * Tabela: cadvisitas
 * Chave Primária: _id (bigserial)
 * Campo de Conteúdo: dados (json)
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares essenciais
app.use(cors()); // Habilita requisições Cross-Origin (CORS)
app.use(express.json()); // Habilita o parse automático de requisições com payload JSON
app.use(express.urlencoded({ extended: true })); // Parse para envios de formulário padrão URL Encoded

// Serve os arquivos estáticos da interface HTML/CSS/JS (frontend)
app.use(express.static(path.join(__dirname)));

// ==============================================================================
// ROTAS DA API REST (CRUD) - TABELA: cadvisitas
// ==============================================================================

/**
 * 1. CREATE (INSERIR NOVA VISITA)
 * Rota: POST /api/visitas
 * Descrição: Recebe os atributos da visita em formato JSON e insere na coluna 'dados' da tabela 'cadvisitas'.
 */
app.post('/api/visitas', async (req, res) => {
    try {
        const dadosFormulario = req.body;

        // Validação simples de recebimento de dados
        if (!dadosFormulario || Object.keys(dadosFormulario).length === 0) {
            return res.status(400).json({ error: 'Nenhum dado enviado para cadastro.' });
        }

        // Consulta SQL parametrizada para inserção no PostgreSQL no campo dados (json)
        // O operador RETURNING "_id" AS id devolve o ID auto-gerado do tipo bigserial
        const queryText = 'INSERT INTO cadvisitas (dados) VALUES ($1) RETURNING "_id" AS id, dados';
        const values = [JSON.stringify(dadosFormulario)];

        const result = await db.query(queryText, values);
        const novoRegistro = result.rows[0];

        // Retorna resposta HTTP 201 (Created) com os dados e o ID inserido
        res.status(201).json({
            success: true,
            message: 'Visita cadastrada com sucesso!',
            id: novoRegistro.id,
            dados: typeof novoRegistro.dados === 'string' ? JSON.parse(novoRegistro.dados) : novoRegistro.dados
        });
    } catch (error) {
        console.error('Erro ao cadastrar visita:', error);
        res.status(500).json({ error: 'Erro interno ao salvar visita no banco de dados.', details: error.message });
    }
});

/**
 * 2. READ LISTA (LISTAR TODAS AS VISITAS)
 * Rota: GET /api/visitas
 * Descrição: Consulta todos os registros da tabela 'cadvisitas' ordenados pelo ID decrescente.
 */
app.get('/api/visitas', async (req, res) => {
    try {
        // Consulta SQL buscando o "_id" como id e a coluna dados de todas as visitas
        const queryText = 'SELECT "_id" AS id, dados FROM cadvisitas ORDER BY "_id" DESC';
        const result = await db.query(queryText);

        // Mapeia os registros garantindo o parse do campo JSON se retornado como string
        const visitas = result.rows.map(row => ({
            id: row.id,
            dados: typeof row.dados === 'string' ? JSON.parse(row.dados) : row.dados
        }));

        // Retorna a lista em formato JSON
        res.json(visitas);
    } catch (error) {
        console.error('Erro ao buscar lista de visitas:', error);
        res.status(500).json({ error: 'Erro interno ao buscar lista de visitas.', details: error.message });
    }
});

/**
 * 3. READ INDIVIDUAL (BUSCAR DETALHES DE UMA VISITA POR ID)
 * Rota: GET /api/visitas/:id
 * Descrição: Busca uma única visita na tabela 'cadvisitas' através de seu ID (bigserial).
 */
app.get('/api/visitas/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Consulta SQL buscando o registro específico pelo campo "_id"
        const queryText = 'SELECT "_id" AS id, dados FROM cadvisitas WHERE "_id" = $1';
        const result = await db.query(queryText, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Visita não encontrada.' });
        }

        const row = result.rows[0];
        const visita = {
            id: row.id,
            dados: typeof row.dados === 'string' ? JSON.parse(row.dados) : row.dados
        };

        // Retorna o registro individual
        res.json(visita);
    } catch (error) {
        console.error('Erro ao buscar visita individual:', error);
        res.status(500).json({ error: 'Erro ao carregar detalhes da visita.', details: error.message });
    }
});

/**
 * 4. UPDATE (ATUALIZAR UMA VISITA EXISTENTE)
 * Rota: PUT /api/visitas/:id
 * Descrição: Atualiza os dados JSON de um registro existente identificado por seu ID.
 */
app.put('/api/visitas/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const dadosFormulario = req.body;

        if (!dadosFormulario || Object.keys(dadosFormulario).length === 0) {
            return res.status(400).json({ error: 'Nenhum dado fornecido para atualização.' });
        }

        // Consulta SQL para atualizar o campo 'dados' com o novo JSON para o "_id" especificado
        const queryText = 'UPDATE cadvisitas SET dados = $1 WHERE "_id" = $2 RETURNING "_id" AS id, dados';
        const values = [JSON.stringify(dadosFormulario), id];

        const result = await db.query(queryText, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Visita não encontrada para atualização.' });
        }

        const rowAtualizada = result.rows[0];

        res.json({
            success: true,
            message: 'Visita atualizada com sucesso!',
            id: rowAtualizada.id,
            dados: typeof rowAtualizada.dados === 'string' ? JSON.parse(rowAtualizada.dados) : rowAtualizada.dados
        });
    } catch (error) {
        console.error('Erro ao atualizar visita:', error);
        res.status(500).json({ error: 'Erro interno ao atualizar a visita.', details: error.message });
    }
});

/**
 * 5. DELETE (EXCLUIR UMA VISITA)
 * Rota: DELETE /api/visitas/:id
 * Descrição: Remove permanentemente um registro da tabela 'cadvisitas' pelo seu ID ("_id").
 */
app.delete('/api/visitas/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Consulta SQL para deletar a visita pelo "_id"
        const queryText = 'DELETE FROM cadvisitas WHERE "_id" = $1 RETURNING "_id" AS id';
        const result = await db.query(queryText, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Visita não encontrada para exclusão.' });
        }

        res.json({
            success: true,
            message: `Visita #${id} excluída com sucesso!`
        });
    } catch (error) {
        console.error('Erro ao excluir visita:', error);
        res.status(500).json({ error: 'Erro interno ao excluir a visita.', details: error.message });
    }
});

// Inicializa o servidor HTTP na porta definida
app.listen(PORT, () => {
    console.log(` Servidor rodando com sucesso na porta ${PORT}`);
    console.log(` Endereço local: http://localhost:${PORT}`);
    console.log(` Tela de Lista: http://localhost:${PORT}/lista.html`);
    console.log(` Tela de Cadastro: http://localhost:${PORT}/index.html`);
});
