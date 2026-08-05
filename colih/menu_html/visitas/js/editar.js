/**
 * ==============================================================================
 * LÓGICA DE EDIÇÃO DE VISITA (js/editar.js)
 * ==============================================================================
 * 
 * Preenche o formulário de edição com os dados existentes recuperados via GET /api/visitas/:id,
 * e envia as alterações via PUT /api/visitas/:id para atualizar no PostgreSQL.
 */

document.addEventListener('DOMContentLoaded', () => {
    carregarDadosFormularioEdicao();
    configurarEventoSubmissaoEdicao();
});

let idVisitaAtual = null;

/**
 * 1. Carrega a visita do banco de dados e preenche os campos do formulário
 */
async function carregarDadosFormularioEdicao() {
    const params = new URLSearchParams(window.location.search);
    idVisitaAtual = params.get('id');

    const tituloEl = document.getElementById('tituloEditar');
    const feedbackEl = document.getElementById('mensagemFeedback');

    if (!idVisitaAtual) {
        feedbackEl.className = 'alert alert-error';
        feedbackEl.innerText = ' ID da visita não informado.';
        feedbackEl.style.display = 'block';
        return;
    }

    try {
        // Consulta os dados atuais da visita no backend PostgreSQL
        const visita = await getVisitaById(idVisitaAtual);
        const d = visita.dados || {};

        tituloEl.innerText = `✏️ Editar Visita #${visita.id}`;
        document.getElementById('visitaId').value = visita.id;

        // Preenche cada um dos 16 campos com os valores armazenados no JSON
        document.getElementById('paciente').value = d['Nome Completo do Paciente'] || '';
        document.getElementById('responsavel').value = d['Nome do Pai/Mãe ou Responsável Legal'] || '';
        document.getElementById('idade').value = d['Idade do(a) Paciente'] || '';
        document.getElementById('visita').value = d['Data da Visita GVP'] || '';
        document.getElementById('hospital').value = d['Hospital'] || '';
        document.getElementById('medico').value = d['Nome do Médico(a) Especialidade'] || '';
        document.getElementById('procedimento').value = d['Procedimento'] || '';
        document.getElementById('cidade').value = d['Cidade'] || '';
        document.getElementById('congregacao').value = d['Congregação'] || '';
        document.getElementById('batizado').value = d['O Paciente é Batizado?'] || 'Não';
        document.getElementById('telpaciente').value = d['Paciente - (Número)'] || '';
        document.getElementById('telfamiliar').value = d['Familiar - (Nome, Número e Parentesco)'] || '';
        document.getElementById('telacompanhante').value = d['Acompanhante - (Nome e Número)'] || '';
        document.getElementById('dpa').value = d['DPA em dia, bom estado e atualizado? Sim ou Não'] || 'Não';
        document.getElementById('nomegvp').value = d['Nome do GVP que finalizou a visita'] || '';
        document.getElementById('hoje').value = d['Hoje'] || '';

    } catch (error) {
        console.error('Erro ao carregar formulário de edição:', error);
        feedbackEl.className = 'alert alert-error';
        feedbackEl.innerText = ` Falha ao carregar dados da visita #${idVisitaAtual}: ${error.message}`;
        feedbackEl.style.display = 'block';
    }
}

/**
 * 2. Captura o submit do formulário e envia o PUT para o PostgreSQL
 */
function configurarEventoSubmissaoEdicao() {
    const formEditar = document.getElementById('formEditarVisita');
    const feedbackEl = document.getElementById('mensagemFeedback');

    formEditar.addEventListener('submit', async (e) => {
        e.preventDefault();

        feedbackEl.style.display = 'none';

        if (!idVisitaAtual) {
            alert('ID da visita ausente.');
            return;
        }

        // Monta o objeto com os 16 atributos atualizados
        const dadosAtualizados = {
            "Nome Completo do Paciente": document.getElementById('paciente').value.trim(),
            "Nome do Pai/Mãe ou Responsável Legal": document.getElementById('responsavel').value.trim(),
            "Idade do(a) Paciente": document.getElementById('idade').value,
            "Data da Visita GVP": document.getElementById('visita').value,
            "Hospital": document.getElementById('hospital').value.trim(),
            "Nome do Médico(a) Especialidade": document.getElementById('medico').value.trim(),
            "Procedimento": document.getElementById('procedimento').value.trim(),
            "Cidade": document.getElementById('cidade').value.trim(),
            "Congregação": document.getElementById('congregacao').value.trim(),
            "O Paciente é Batizado?": document.getElementById('batizado').value,
            "Paciente - (Número)": document.getElementById('telpaciente').value.trim(),
            "Familiar - (Nome, Número e Parentesco)": document.getElementById('telfamiliar').value.trim(),
            "Acompanhante - (Nome e Número)": document.getElementById('telacompanhante').value.trim(),
            "DPA em dia, bom estado e atualizado? Sim ou Não": document.getElementById('dpa').value,
            "Nome do GVP que finalizou a visita": document.getElementById('nomegvp').value.trim(),
            "Hoje": document.getElementById('hoje').value
        };

        try {
            // Executa a requisição PUT para o backend
            const resultado = await updateVisita(idVisitaAtual, dadosAtualizados);

            feedbackEl.className = 'alert alert-success';
            feedbackEl.innerText = ` Visita #${resultado.id} atualizada com sucesso no banco colih!`;
            feedbackEl.style.display = 'block';

            // Redireciona de volta para a lista após 1.5 segundos
            setTimeout(() => {
                window.location.href = `detalhe.html?id=${idVisitaAtual}`;
            }, 1500);

        } catch (error) {
            console.error('Erro ao salvar edição:', error);
            feedbackEl.className = 'alert alert-error';
            feedbackEl.innerText = ` Falha ao atualizar a visita: ${error.message}`;
            feedbackEl.style.display = 'block';
        }
    });
}
