<?php

	include "con_odbc.php";

	echo "<Center><h1>";
	echo "Substituir";
	echo "</h1></Center>";

	$sql = 
		'SELECT CODSUBST, PUBLICADOEM, PERM_OU_SUBST, CARRINHO, IRMAO,'.
    	'IRMAO_NOME, DATA, DIADASEMANA, HORARIO, IRMA_NAO_PODE_IR, IRMA_NPI_NOME,'.
    	'IRMA_SUBSTITUIRA, IRMA_SUBST_NOME, OBS, BAIXADO, CAR_NOME '.
		'FROM SUBSTITUICAO'; /* ORDER BY 2,3'*/

	$res = odbc_exec($conn,$sql);

	echo '<center>';	
	echo '<table border=1';	
	echo '<tr>';
	while (odbc_fetch_row($res)) {
		echo '<td>';
		echo utf8_decode(odbc_result($res, 1)).'</td><td>'.utf8_decode(odbc_result($res, 2)).'</td><td>'.utf8_decode(odbc_result($res, 3))
			.'</td><td>'.utf8_decode(odbc_result($res, 4)).'</td><td>'.utf8_decode(odbc_result($res, 5)).'</td><td>'.utf8_decode(odbc_result($res, 6))
			.'</td><td>'.utf8_decode(odbc_result($res, 7)).'</td><td>'.utf8_decode(odbc_result($res, 8)).'</td><td>'.utf8_decode(odbc_result($res, 9))
			.'</td><td>'.utf8_decode(odbc_result($res, 10)).'</td><td>'.utf8_decode(odbc_result($res, 11)).'</td><td>'.utf8_decode(odbc_result($res, 2))
			.'</td><td>'.utf8_decode(odbc_result($res, 13)).'</td><td>'.utf8_decode(odbc_result($res, 14)).'</td><td>'.utf8_decode(odbc_result($res, 15))
			.'</td><td>'.utf8_decode(odbc_result($res, 16));
		echo '</td>';
		echo '</tr>';
 	}

 	echo '</table>';
	odbc_close($conn); 
	$res = null; 
	$conn = null;

?>