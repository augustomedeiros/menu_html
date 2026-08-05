<!DOCTYPE html>
<html lang="pt-BR">
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<head>
	<link rel="stylesheet" href="../style/style-gg.css">
	<title>Cadastro de Aluno</title>
</head>

<body>
	<center>

	<!--a href="index.html">Home</a> | <a href="">View Products</a> | <a href="logout.php">Logout</a>
	<br/><br/-->
	<H3>Cadastro de Visitas - GVP</H3>
	<!--H4>Data: 25/04/2026 - Sábado: 14h30</H4-->

	<form action="add.php" method="post" name="form1">
		<table width="100%" border="0">
		<tr><td>Nome Completo do Paciente:</td><td><input class="input-rebaixado" type="text" name="paciente"></td></tr> 
		<tr><td>Nome do Pai/Mãe ou Responsável Legal:</td><td><input class="input-rebaixado" type="text" name="responsavel"></td></tr> 
		<tr><td>Idade do(a) Paciente:</td><td><input class="input-rebaixado" type="number" name="idade"></td></tr>    
		<tr><td>Data da Visita GVP:</td><td><input class="input-rebaixado" type="date" name="visita"></td></tr>  
		<tr><td>Hospital:</td><td><input class="input-rebaixado" type="text" name="hospital"></td></tr>  
		<tr><td>Nome do Médico(a) Especialidade:</td><td><input class="input-rebaixado" type="text" name="medico"></td></tr>  
		<tr><td>Procedimento:</td><td><input class="input-rebaixado" type="text" name="procedimento"></td></tr>  
		<tr><td>Cidade:</td><td><input class="input-rebaixado" type="text" name="cidade"></td></tr>
		<tr><td>Congregação:</td><td><input class="input-rebaixado" type="text" name="congregacao"></td></tr>
		<tr><td>O Paciente é Batizado?:</td><td><input class="input-rebaixado" type="text" name="batizado"></td></tr>
		<tr><td>Paciente - (Número):</td><td><input class="input-rebaixado" type="text" name="telpaciente"></td></tr>  
		<tr><td>Familiar - (Nome, Número e Parentesco):</td><td><input class="input-rebaixado" type="text" name="telfamiliar"></td></tr> 
		<tr><td>Acompanhante - (Nome e Número):</td><td><input class="input-rebaixado" type="text" name="telacompanhante"></td></tr>  
		<tr><td>DPA em dia, bom estado e atualizado? Sim ou Não:</td><td><input class="input-rebaixado" type="text" name="dpa"></td></tr>  
		<tr><td>Nome do GVP que finalizou a visita:</td><td><input class="input-rebaixado" type="text" name="nomegvp"></td></tr>  
		<tr><td>Data do Preenchimento do Formulário:</td><td><input class="input-rebaixado" type="date" name="hoje" id="hoje"></td></tr>	
		</table>
		<input type="submit" value="Submit" name="Submit">
		<input type="button" onclick="location.href='/'" value="Voltar">
	</form>
	
	</center>
</body>

<script>
	document.getElementById('hoje').valueAsDate = new Date();
</script>

</html>

