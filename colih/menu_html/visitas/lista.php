<?php

include '.conn.php'; // Inclui o arquivo de conecction com o banco de dados
include ('../../cabeca.php');

echo '<!DOCTYPE html>';
echo '<html lang="pt-BR">';
echo '<head>';
echo '    <meta charset="UTF-8">';
echo '    <!--meta name="viewport" content="width=device-width, initial-scale=1.0" -->';
echo '    <link rel="stylesheet" href="../style/style-gg.css">';
echo '</head>';
echo '<body>';
echo '    <h3>Lista de Visitas - GVP</h3>';
echo '    <a href="dados.php" class="btn btn-primary">&#43; Nova Visita</a><br>';
echo '    <position: relative; left: 150px; transform: translateX(-50%);>';

/*
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
*/


// O restante do seu codigo continua aqui...
$sql = "SELECT * FROM cadvisitas";
$stmt = $pdo->prepare($sql);
$stmt->execute();
$cursor = $stmt->fetchAll(PDO::FETCH_ASSOC);

foreach ($cursor as $cadvisitas) {
    $dados = json_decode($cadvisitas['dados'], true);
    echo '<a href="editar.php?id=' . urlencode($cadvisitas['_id']) . '">Editar</a><br>';
    echo 'Nome Completo do Paciente: ' . htmlspecialchars($dados['Nome Completo do Paciente'] ?? '') . '<br>';
    echo 'Nome do Pai/Mãe ou Responsável: ' . htmlspecialchars($dados['Nome do Pai/Mãe ou Responsável Legal'] ?? '') . '<br>';
    echo 'Idade do(a) Paciente: ' . htmlspecialchars($dados['Idade do(a) Paciente'] ?? '') . '<br>';
    echo 'Data da Visita GVP: ' . htmlspecialchars($dados['Data da Visita GVP'] ?? '') . '<br>';
    echo 'Hospital: ' . htmlspecialchars($dados['Hospital'] ?? '') . '<br>';
    echo 'Nome do Médico(a): ' . htmlspecialchars($dados['Nome do Médico(a) Especialidade'] ?? '') . '<br>';
    echo 'Procedimento: ' . htmlspecialchars($dados['Procedimento'] ?? '') . '<br>';
    echo 'Cidade: ' . htmlspecialchars($dados['Cidade'] ?? '') . '<br>';
    echo 'Congregação: ' . htmlspecialchars($dados['Congregação'] ?? '') . '<br>';
    echo 'O Paciente é Batizado?: ' . htmlspecialchars($dados['O Paciente é Batizado?'] ?? '') . '<br>';
    echo 'Paciente - (Número): ' . htmlspecialchars($dados['Paciente - (Número)'] ?? '') . '<br>';
    echo 'Familiar - (Nome, Número e parentesco): ' . htmlspecialchars($dados['Familiar - (Nome, Número e Parentesco)'] ?? '') . '<br>';
    echo 'Acompanhante - (Nome e Número): ' . htmlspecialchars($dados['Acompanhante - (Nome e Número)'] ?? '') . '<br>';
    echo 'DPA em dia, bom estado e atualizado?: ' . htmlspecialchars($dados['DPA em dia, bom estado e atualizado? Sim ou Não'] ?? '') . '<br>';
    echo 'Nome do GVP que finalizou: ' . htmlspecialchars($dados['Nome do GVP que finalizou a visita'] ?? '') . '<br>';
    echo 'Hoje: ' . htmlspecialchars($dados['Hoje'] ?? '') . '<br>';
    echo "</article><hr>";
}

?>

	</body>
</html>
