/**
 * ==============================================================================
 * LÓGICA DA LISTA DE VISITAS (js/lista.js)
 * ==============================================================================
 * 
 * Busca a lista de visitas gravadas no PostgreSQL através do módulo api.js,
 * renderiza a tabela HTML dinamicamente e gerencia as ações de Excluir, Editar e Visualizar.
 */

document.addEventListener('DOMContentLoaded', () => {
    carregarTabelaVisitas();
});

/**
 * Função principal que consulta a API e preenche a tabela
 */
async function carregarTabelaVisitas() {
    const corpoTabela = document.getElementById('corpoTabelaVisitas');
    const feedbackEl = document.getElementById('mensagemFeedback');

    try {
        // 1. Consulta o backend (GET /api/visitas)
        const visitas = await getVisitas();

        // Limpa o indicador de carregamento
        corpoTabela.innerHTML = '';

        if (!visitas || visitas.length === 0) {
            corpoTabela.innerHTML = `
                <tr>
                    <td colspan="6" class="status-empty">Nenhuma visita registrada no banco de dados.</td>
                </tr>
            `;
            return;
        }

        // 2. Itera sobre cada registro retornado do PostgreSQL e cria a linha correspondente
        visitas.forEach(visita => {
            const id = visita.id;
            const d = visita.dados || {};

            const paciente = d['Nome Completo do Paciente'] || 'Não informado';
            const hospital = d['Hospital'] || 'Não informado';
            const dataVisita = d['Data da Visita GVP'] ? formatarData(d['Data da Visita GVP']) : 'N/A';
            const nomeGvp = d['Nome do GVP que finalizou a visita'] || 'N/A';

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>#${id}</strong></td>
                <td>${escapeHTML(paciente)}</td>
                <td>${escapeHTML(hospital)}</td>
                <td>${escapeHTML(dataVisita)}</td>
                <td>${escapeHTML(nomeGvp)}</td>
                <td style="text-align: center;">
                    <a href="detalhe.html?id=${id}" class="btn-acao btn-detalhes" title="Ver Ficha Completa">👁️ Ver</a>
                    <a href="editar.html?id=${id}" class="btn-acao btn-editar" title="Editar Registro">✏️ Editar</a>
                    <button class="btn-acao btn-excluir" onclick="confirmarExclusao(${id}, '${escapeHTML(paciente).replace(/'/g, "\\'")}')" title="Excluir do Banco">🗑️ Excluir</button>
                </td>
            `;

            corpoTabela.appendChild(tr);
        });

    } catch (error) {
        console.error('Erro ao carregar lista:', error);
        corpoTabela.innerHTML = `
            <tr>
                <td colspan="6" class="status-empty" style="color: red;">
                    Falha ao carregar dados do banco: ${error.message}
                </td>
            </tr>
        `;
    }
}

/**
 * Função de exclusão de visita com confirmação do usuário
 * @param {number} id - ID da visita no PostgreSQL
 * @param {string} nomePaciente - Nome do paciente para o prompt de confirmação
 */
async function confirmarExclusao(id, nomePaciente) {
    const feedbackEl = document.getElementById('mensagemFeedback');

    const confirmou = confirm(`Tem certeza que deseja excluir a visita #${id} do paciente "${nomePaciente}"?`);
    
    if (confirmou) {
        try {
            // Chamada à API para remover da tabela cadvisitas
            await deleteVisita(id);

            feedbackEl.className = 'alert alert-success';
            feedbackEl.innerText = ` Visita #${id} excluída com sucesso!`;
            feedbackEl.style.display = 'block';

            // Recarrega a tabela após a exclusão
            carregarTabelaVisitas();

            setTimeout(() => {
                feedbackEl.style.display = 'none';
            }, 3000);

        } catch (error) {
            console.error('Erro ao excluir:', error);
            feedbackEl.className = 'alert alert-error';
            feedbackEl.innerText = ` Erro ao excluir visita: ${error.message}`;
            feedbackEl.style.display = 'block';
        }
    }
}

/**
 * Utilitário para formatar a data ISO (YYYY-MM-DD) para o padrão brasileiro (DD/MM/YYYY)
 */
function formatarData(dataIso) {
    if (!dataIso) return '';
    const partes = dataIso.split('-');
    if (partes.length === 3) {
        return `${partes[2]}/${partes[1]}/${partes[0]}`;
    }
    return dataIso;
}

/**
 * Utilitário para sanitizar caracteres HTML e evitar XSS
 */
function escapeHTML(str) {
    return String(str || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
