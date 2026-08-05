/**
 * ==============================================================================
 * MÓDULO DE CONEXÃO COM O BANCO DE DADOS POSTGRESQL (db.js)
 * ==============================================================================
 * 
 * Este arquivo utiliza a biblioteca 'pg' (node-postgres) para gerenciar o pool
 * de conexões com o banco de dados PostgreSQL 'colih'.
 * 
 * Informações do Banco:
 * - Banco de Dados (Database): colih
 * - Tabela Principal: cadvisitas
 * - Campo ID: _id (bigserial primary key)
 * - Campo Dados: dados (json / jsonb)
 */

const { Pool } = require('pg');

require('dotenv').config('');

const pool = new Pool({
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
});


// Evento disparado quando uma nova conexão é estabelecida no Pool
pool.on('connect', () => {
    console.log(' Conectado com sucesso ao PostgreSQL (Banco: colih)');
});

// Evento de captura de erros inesperados em conexões ociosas no Pool
pool.on('error', (err) => {
    console.error(' Erro inesperado no pool do PostgreSQL:', err);
});

/**
 * Função utilitária para executar queries SQL com suporte a Prepared Statements
 * @param {string} text - Consulta SQL
 * @param {Array} params - Parâmetros da consulta (evita SQL Injection)
 * @returns {Promise<import('pg').QueryResult>} Resultado da query
 */
const query = (text, params) => {
    // Comentário: Executa a instrução SQL parametrizada garantindo segurança contra SQL Injection
    return pool.query(text, params);
};

module.exports = {
    pool,
    query
};
