<?php

header("content-type:application/json; charset=utf-8");
require("MySQLi.php");

$connection = openConnection();

if (isset($_REQUEST["id"])) {
    $id = $connection->real_escape_string($_REQUEST["id"]);
} else {
    http_response_code(400);
    die("Manca parametro id");
}

if (isset($_REQUEST["reason"])) {
    $reason = $connection->real_escape_string($_REQUEST["reason"]);
} else {
    http_response_code(400);
    die("Manca parametro motivazione");
}

$sql = "UPDATE assenze SET motivazione='$reason' WHERE id=$id";
$data = eseguiQuery($connection, $sql);

http_response_code(200);
echo (json_encode($data));

?>