<?php ?>

<html>
<head>
	<title>Confirmção de dados</title>
</head>

<body>
<?php
//including the database connection file
include_once(".conn.php");

// echo "<h2>Confirmação de dados.. passou</h2>";

if(isset($_POST['paciente'])){	
	// ---- CREATE (Inserir) ----
	// echo "<h2>Confirmação de dados.. entrou</h2>";
	try {
		// 2. Os dados que você quer salvar (sem esquema fixo)
		$novoProduto = [
			"Nome Completo do Paciente" => $_POST['paciente'],
			"Nome do Pai/Mãe ou Responsável Legal" => $_POST['responsavel'],	
			"Idade do(a) Paciente" => $_POST['idade'],
			"Data da Visita GVP" => $_POST['visita'],
			"Hospital" => $_POST['hospital'],
			"Nome do Médico(a) Especialidade" => $_POST['medico'],
			"Procedimento" => $_POST['procedimento'],
			"Cidade" => $_POST['cidade'],
			"Congregação" => $_POST['congregacao'],
			"O Paciente é Batizado?" => $_POST['batizado'],
			"Paciente - (Número)" => $_POST['telpaciente'],
			"Familiar - (Nome, Número e Parentesco)" => $_POST['telfamiliar'],
			"Acompanhante - (Nome e Número)" => $_POST['telacompanhante'],
			"DPA em dia, bom estado e atualizado? Sim ou Não" => $_POST['dpa'],
			"Nome do GVP que finalizou a visita" => $_POST['nomegvp'],
			"Hoje" => $_POST['hoje']
			];

			// 3. Preparando a query SQL
			$sql = "INSERT INTO cadvisitas (dados) VALUES (:dados)";
			$stmt = $pdo->prepare($sql);

			// 4. Transformando o array em JSON e executando
			$jsonDados = json_encode($novoProduto);
			$stmt->bindParam(':dados', $jsonDados);
			$stmt->execute();

			echo "Documento inserido com sucesso!";

		echo "<a href='index.html'>Voltar</a>";
	} catch (Exception $e) {
		echo "Erro ao inserir documento: ", $e->getMessage();}
} else {
	echo "Erro: Nenhum dado recebido.";
}
?>
	
</body></html>