<?php
//require 'vendor/autoload.php'; // Carrega o Composer

try {
    // Conecta ao banco de dados
    // $manager = new MongoDB\Driver\Manager("mongodb://localhost:27017");
    // 1. Conexão com o banco de dados para PostgreSQL
    $pdo = new PDO("pgsql:host=localhost;port=5432;dbname=colih","postgres","272567");
    // echo "Conexão realizada com sucesso!";
} catch (Exception $e) {
    echo "Erro na conexão: ", $e->getMessage();
}

?>