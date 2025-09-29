<?php
header("Content-Type: application/json");

include("../Connection/conn.php");

$action = $_GET['action'] ?? '';

if ($action === 'add') {
    $categoria = $_POST['categoria'];
    $valor = $_POST['valor'];
    $tipo = $_POST['tipo'];
    $conn->query("INSERT INTO despesas (categoria, valor, tipo) VALUES ('$categoria', '$valor', '$tipo')");
    echo json_encode(["success" => true]);
}
elseif ($action === 'delete') {
    $id = intval($_POST['id']);
    $conn->query("DELETE FROM despesas WHERE id=$id");
    echo json_encode(["success" => true]);
}
elseif ($action === 'update') {
    $id = $_POST['id'];
    $categoria = $_POST['categoria'];
    $valor = $_POST['valor'];
    $tipo = $_POST['tipo'];
    $conn->query("UPDATE despesas SET categoria='$categoria', valor='$valor', tipo='$tipo' WHERE id=$id");
    echo json_encode(["success" => true]);
}
elseif ($action === 'list') {
    $data = [];
    $res = $conn->query("SELECT * FROM despesas ORDER BY data_registro DESC");
    while ($row = $res->fetch_assoc()) { $data[] = $row; }

    $totalEntrada = $conn->query("SELECT SUM(valor) as total FROM despesas WHERE tipo='entrada'")->fetch_assoc()['total'] ?? 0;
    $totalSaida = $conn->query("SELECT SUM(valor) as total FROM despesas WHERE tipo='saida'")->fetch_assoc()['total'] ?? 0;
    $saldo = $totalEntrada - $totalSaida;

    echo json_encode([
        "despesas" => $data,
        "entradas" => $totalEntrada,
        "saidas" => $totalSaida,
        "saldo" => $saldo
    ]);
}
