<?php
	header("content-type:application/json; charset=utf-8");
    require("server/MySQLi.php");

    $connection = openConnection();
    if(isset($_GET["matricola"]))
    {
        $matr = $connection->real_escape_string($_GET["matricola"]);
        http_response_code(400);
    }else die(json_encode(['errore' => "Parametro mancante matricola"]));

    $query = "SELECT id, data, giustificato FROM assenze WHERE matricola = '$matr' ORDER BY data DESC";
    $data = eseguiQuery($connection, $query);
    http_response_code(200);
    echo json_encode($data);

    $connection->close();
?>