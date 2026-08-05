/**
 * ==============================================================================
 * MÓDULO JS CLIENT-SIDE PARA CHAMADAS HTTP (js/api.js)
 * ==============================================================================
 * 
 * Este arquivo encapsula todas as requisições assíncronas (Fetch API) feitas
 * pelo navegador para o servidor Express (Node.js/PostgreSQL).
 * 
 * Todas as chamadas trocam dados em formato JSON com o backend.
 */

// URL base da API REST
const API_URL = '/api/visitas';

/**
 * 1. CRIAR VISITA (POST /api/visitas)
 * Envia o objeto JSON com os 16 atributos para serem gravados na tabela 'cadvisitas'.
 * @param {Object} dadosVisita - Objeto contendo os dados do formulário
 * @returns {Promise<Object>} Resposta JSON do servidor com o ID gerado
 */
async function createVisita(dadosVisita) {
    // Comentário: Faz a requisição POST com o header Content-Type application/json
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosVisita)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao cadastrar visita.');
    }

    return await response.json();
}

/**
 * 2. LISTAR TODAS AS VISITAS (GET /api/visitas)
 * Obtém do servidor a lista de todas as visitas gravadas no PostgreSQL.
 * @returns {Promise<Array>} Array de objetos { id, dados }
 */
async function getVisitas() {
    // Comentário: Faz a requisição GET para recuperar todas as visitas
    const response = await fetch(API_URL);

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao carregar a lista de visitas.');
    }

    return await response.json();
}

/**
 * 3. BUSCAR VISITA POR ID (GET /api/visitas/:id)
 * Recupera os dados individuais de uma visita específica pelo ID (bigserial).
 * @param {number|string} id - ID da visita
 * @returns {Promise<Object>} Objeto { id, dados } da visita encontrada
 */
async function getVisitaById(id) {
    // Comentário: Faz a requisição GET especificando o ID da visita na URL
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Erro ao carregar visita #${id}.`);
    }

    return await response.json();
}

/**
 * 4. ATUALIZAR VISITA (PUT /api/visitas/:id)
 * Envia os dados atualizados de uma visita existente para salvamento no banco.
 * @param {number|string} id - ID da visita a ser atualizada
 * @param {Object} dadosVisita - Objeto contendo os novos dados do formulário
 * @returns {Promise<Object>} Resposta do servidor indicando sucesso
 */
async function updateVisita(id, dadosVisita) {
    // Comentário: Faz a requisição PUT enviando o payload JSON atualizado
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosVisita)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Erro ao atualizar visita #${id}.`);
    }

    return await response.json();
}

/**
 * 5. EXCLUIR VISITA (DELETE /api/visitas/:id)
 * Remove a visita do banco de dados PostgreSQL.
 * @param {number|string} id - ID da visita a ser excluída
 * @returns {Promise<Object>} Confirmação de exclusão
 */
async function deleteVisita(id) {
    // Comentário: Faz a requisição DELETE informando o ID a ser removido
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Erro ao excluir visita #${id}.`);
    }

    return await response.json();
}
