/**
 * ==============================================================================
 * LÓGICA DE CADASTRO DE VISITA (js/cadastro.js)
 * ==============================================================================
 * 
 * Captura os 16 campos preenchidos pelo usuário no formulário de cadastro,
 * monta o objeto JSON e chama o módulo api.js para realizar a inserção no PostgreSQL.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Define a data de hoje automaticamente no campo 'hoje'
    const campoHoje = document.getElementById('hoje');
    if (campoHoje && !campoHoje.value) {
        campoHoje.valueAsDate = new Date();
    }

    // Elementos da página
    const formCadastro = document.getElementById('formCadastroVisita');
    const feedbackEl = document.getElementById('mensagemFeedback');

    // Evento de submissão do formulário
    formCadastro.addEventListener('submit', async (e) => {
        e.preventDefault(); // Impede o recarregamento padrão da página

        // Oculta mensagens de feedback anteriores
        feedbackEl.style.display = 'none';

        // 1. Extração e montagem do objeto de 16 atributos que será gravado no PostgreSQL (coluna 'dados')
        const novoCadastro = {
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
            // 2. Chamada à API REST via função createVisita (POST /api/visitas)
            const resultado = await createVisita(novoCadastro);

            // 3. Exibição de mensagem de sucesso
            feedbackEl.className = 'alert alert-success';
            feedbackEl.innerText = ` Visita #${resultado.id} registrada com sucesso no banco colih!`;
            feedbackEl.style.display = 'block';

            // Reseta o formulário
            formCadastro.reset();
            if (campoHoje) campoHoje.valueAsDate = new Date();

            // Redireciona para a lista após 1.5 segundos
            setTimeout(() => {
                window.location.href = 'lista.html';
            }, 1500);

        } catch (error) {
            console.error('Erro na gravação:', error);
            feedbackEl.className = 'alert alert-error';
            feedbackEl.innerText = ` Falha ao salvar no banco de dados: ${error.message}`;
            feedbackEl.style.display = 'block';
        }
    });
});
