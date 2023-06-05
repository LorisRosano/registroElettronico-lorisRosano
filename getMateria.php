<?php

header("content-type:application/json; charset=utf-8");
require("server/MySQLi.php");

if (isset($_GET["id"])) {
    $id = $_GET["id"];
} else {
    http_response_code(400);
    die("Manca parametro materia");
}

$connection = openConnection();
$sql = "SELECT materia FROM materie WHERE id='$id'";
$data = eseguiQuery($connection, $sql);

http_response_code(200);
echo (json_encode($data[0]));

$connection->close();

?>