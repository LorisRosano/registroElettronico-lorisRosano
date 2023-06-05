<?php

header("content-type:application/json; charset=utf-8");
require("server/MySQLi.php");

$connection = openConnection();
$sql = "SELECT materia FROM materie";
$data = eseguiQuery($connection, $sql);

http_response_code(200);
echo (json_encode($data));

$connection->close();

?>