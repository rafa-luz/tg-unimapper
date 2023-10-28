<?php

$servername = "localhost";
$username = "rafa";
$password = "1234";
$dbname = "unimapper";    


$email = $_POST['email'];
$ocorrencia = $_POST['ocorrencia'];


$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die("Erro na conexão com o banco de dados: " . $conn->connect_error);
}


$sql = "INSERT INTO emails (email) VALUES ('$email')";
$sql = "INSERT INTO ocorrencias (texto) VALUES ('$ocorrencia')";


if ($conn->query($sql) === TRUE) {
    echo "Registro salvo com sucesso!";
} else {
    echo "Erro ao salvar o registro: " . $conn->error;
}


$conn->close();
?>
