 <?php

  include "con_odbc.php";

  echo "<Center><h1>";
  echo "Substituir";
  echo "</h1></Center>";

  $Cod = $_POST['Cod'];
  $Data = date_create($_POST['Data']);
  $DData = "'".date_format($Data,'m/d/y')."'";
  $SubstOuPerm = "'".$_POST['perm']."'";
  // echo $SubstOuPerm;
  $Carrinho = $_POST['Carrinho'];
  $irmao = $_POST['Irmao'];

  // Pegar o nome do irmao
  $sql = "SELECT NRTPE, NOME FROM CONTATOS WHERE CODCONTATOS = ".$irmao;
  $Query_ID = odbc_exec($conn, $sql);
  $NomeIrmao1 = "'".odbc_result($Query_ID, 2)."'";
  
  $sql = 
  "INSERT INTO substituicao (codsubst,publicadoem,perm_ou_subst,carrinho,irmao,irmao_nome) 
   VALUES ($Cod,$DData,$SubstOuPerm,$Carrinho,$irmao,$NomeIrmao1)";

  if (odbc_exec($conn, $sql) == False) {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }

  odbc_close($conn); 

?> 