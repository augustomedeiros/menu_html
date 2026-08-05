<?php

/*
var_dump(PHP_SAPI);
var_dump(PHP_BINARY);
var_dump(php_ini_loaded_file());
var_dump(PDO::getAvailableDrivers());
exit;
*/


/* Análize de erro de conexão
var_dump($dsn);
var_dump(PDO::getAvailableDrivers());
exit;
*/

// 2. Os dados que você quer salvar (sem esquema fixo)
$novoProduto = [
    "nome" => "Teclado Mecânico",
    "preco" => 350.00,
    "detalhes" => [
        "switch" => "Blue",
        "led" => "RGB"
    ]
];

// 3. Preparando a query SQL
$sql = "INSERT INTO cadvisitas (dados) VALUES (:dados)";
$stmt = $pdo->prepare($sql);

// 4. Transformando o array em JSON e executando
$jsonDados = json_encode($novoProduto);
$stmt->bindParam(':dados', $jsonDados);
$stmt->execute();

echo "Documento inserido com sucesso!";
