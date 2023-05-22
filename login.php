<?php
  require("server/MySQLi.php");
  $connection = openConnection("registroElettronico");
  if(isset($_POST["user"]) && isset($_POST["pass"])){
    $username = $_POST["user"];
    $password = $_POST["pass"];
  }

  $sql = "SELECT * FROM studenti WHERE user = '$username' AND pass = '$password'";
  $data = eseguiQuery($connection, $sql);

  http_response_code(200);
  echo json_encode($data);
?>
