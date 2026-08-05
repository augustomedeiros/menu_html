<?php
// $pdo deve ser a sua conexão PDO com PostgreSQL

include_once('.conn.php');

function e($valor): string {
    return htmlspecialchars((string)$valor, ENT_QUOTES, 'UTF-8');
}

$campos = [
    'Nome Completo do Paciente',
    'Nome do Pai/Mãe ou Responsável Legal',
    'Idade do(a) Paciente',
    'Data da Visita GVP',
    'Hospital',
    'Nome do Médico(a) Especialidade',
    'Procedimento',
    'Cidade',
    'Congregação',
    'O Paciente é Batizado?',
    'Paciente - (Número)',
    'Familiar - (Nome, Número e Parentesco)',
    'Acompanhante - (Nome e Número)',
    'DPA em dia, bom estado e atualizado? Sim ou Não',
    'Nome do GVP que finalizou a visita',
    'Hoje',
];

$id = $_GET['id'] ?? $_POST['id'] ?? '';

if (!$id) {
    exit('ID não informado.');
}

/* Salva a edição */
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $dados = $_POST['dados'] ?? [];

    $sql = 'UPDATE cadvisitas
            SET dados = CAST(:dados AS jsonb)
            WHERE "_id" = :id';

    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':dados' => json_encode($dados, JSON_UNESCAPED_UNICODE),
        ':id'    => $id
    ]);

    header('Location: editar.php?id=' . urlencode($id) . '&salvo=1');
    exit;
}

/* Busca o registro atual */
$sql = 'SELECT "_id", dados FROM cadvisitas WHERE "_id" = :id';
$stmt = $pdo->prepare($sql);
$stmt->execute([':id' => $id]);

$cadvisitas = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$cadvisitas) {
    exit('Registro não encontrado.');
}

$dados = json_decode($cadvisitas['dados'], true) ?: [];
?>

<!doctype html>
<html lang="pt-BR">
<head>
    <meta charset="utf-8">
    <title>Editar visita</title>
    <link rel="stylesheet" href="../style/style-gg.css">
</head>
<body><center>

<h1>Editar visita #<?= e($cadvisitas['_id']) ?></h1>

<?php if (isset($_GET['salvo'])): ?>
    <p style="color: green;">Registro atualizado com sucesso.</p>
<?php endif; ?>

<form method="post">
    <br><Br>
    <table width="100%" border="0">
    <input type="hidden" name="id" value="<?= e($cadvisitas['_id']) ?>">

    <?php foreach ($campos as $campo): ?>
        <p>
            <label><tr><td>
                <?= e($campo) ?></td>
                <td><input class="input-rebaixado" 
                    type="text"
                    name="dados[<?= e($campo) ?>]"
                    value="<?= e($dados[$campo] ?? '') ?>"
                    style="width: 240px;"
                ></td></tr>
            </label>
        </p>
    <?php endforeach; ?>
    <tr><td><button type="submit">Salvar</button>
            <button type="button" onclick="window.location.href='/'">Cancelar</button></td></tr>
    </table>
        <br><br>
</form>

</body>
</html>