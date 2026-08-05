/**
 * ==============================================================================
 * LÓGICA DE VISUALIZAÇÃO INDIVIDUAL (js/detalhe.js)
 * ==============================================================================
 * 
 * Obtém o parâmetro 'id' da URL, consulta o registro individual no PostgreSQL
 * via GET /api/visitas/:id e exibe todos os 16 atributos formatados na tela.
 */

document.addEventListener('DOMContentLoaded', () => {
    carregarDetalhesVisita();
});

async function carregarDetalhesVisita() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    const tituloEl = document.getElementById('tituloFicha');
    const corpoTabela = document.getElementById('corpoTabelaDetalhe');
    const btnEditar = document.getElementById('btnLinkEditar');
    const btnExcluir = document.getElementById('btnExcluirDetalhe');
    const feedbackEl = document.getElementById('mensagemFeedback');

    if (!id) {
        corpoTabela.innerHTML = `
            <tr>
                <td colspan="2" style="text-align: center; color: red; padding: 20px;">
                    ❌ ID de visita não informado na URL.
                </td>
            </tr>
        `;
        return;
    }

    // Configura o link do botão editar
    btnEditar.href = `editar.html?id=${id}`;

    // Configura o evento de exclusão
    btnExcluir.addEventListener('click', async () => {
        const confirmou = confirm(`Tem certeza que deseja excluir permanentemente a visita #${id}?`);
        if (confirmou) {
            try {
                await deleteVisita(id);
                alert(`Visita #${id} excluída com sucesso!`);
                window.location.href = 'lista.html';
            } catch (error) {
                alert(`Erro ao excluir visita: ${error.message}`);
            }
        }
    });

    try {
        // 1. Busca os dados da visita no backend
        const visita = await getVisitaById(id);
        const d = visita.dados || {};

        tituloEl.innerText = `📄 Ficha da Visita #${visita.id}`;

        // 2. Mapeamento dos 16 atributos para exibição organizada
        const atributos = [
            { label: 'ID da Visita (PostgreSQL)', valor: `#${visita.id}` },
            { label: 'Nome Completo do Paciente', valor: d['Nome Completo do Paciente'] },
            { label: 'Nome do Pai/Mãe ou Responsável Legal', valor: d['Nome do Pai/Mãe ou Responsável Legal'] },
            { label: 'Idade do(a) Paciente', valor: d['Idade do(a) Paciente'] },
            { label: 'Data da Visita GVP', valor: formatarData(d['Data da Visita GVP']) },
            { label: 'Hospital', valor: d['Hospital'] },
            { label: 'Nome do Médico(a) Especialidade', valor: d['Nome do Médico(a) Especialidade'] },
            { label: 'Procedimento', valor: d['Procedimento'] },
            { label: 'Cidade', valor: d['Cidade'] },
            { label: 'Congregação', valor: d['Congregação'] },
            { label: 'O Paciente é Batizado?', valor: d['O Paciente é Batizado?'] },
            { label: 'Paciente - (Número)', valor: d['Paciente - (Número)'] },
            { label: 'Familiar - (Nome, Número e Parentesco)', valor: d['Familiar - (Nome, Número e Parentesco)'] },
            { label: 'Acompanhante - (Nome e Número)', valor: d['Acompanhante - (Nome e Número)'] },
            { label: 'DPA em dia, bom estado e atualizado?', valor: d['DPA em dia, bom estado e atualizado? Sim ou Não'] },
            { label: 'Nome do GVP que finalizou a visita', valor: d['Nome do GVP que finalizou a visita'] },
            { label: 'Data do Preenchimento do Formulário', valor: formatarData(d['Hoje']) }
        ];

        // 3. Renderiza a tabela de atributos
        corpoTabela.innerHTML = '';
        atributos.forEach(attr => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td class="campo-label">${escapeHTML(attr.label)}:</td>
                <td class="campo-valor">${attr.valor ? escapeHTML(attr.valor) : '<em>Não informado</em>'}</td>
            `;
            corpoTabela.appendChild(tr);
        });

    } catch (error) {
        console.error('Erro ao carregar detalhes:', error);
        corpoTabela.innerHTML = `
            <tr>
                <td colspan="2" style="text-align: center; color: red; padding: 20px;">
                    Falha ao carregar detalhes da visita: ${error.message}
                </td>
            </tr>
        `;
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
 * Utilitário para sanitizar HTML
 */
function escapeHTML(str) {
    return String(str || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
