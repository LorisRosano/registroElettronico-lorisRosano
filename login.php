<?php
  require("server/MySQLi.php");
  $connection = openConnection("registroelettronico");
  if(isset($_GET["user"]) && isset($_GET["pass"])){
    $username = $_GET["user"];
    $password = $_GET["pass"];
  }
  else{
    die("Parametri mancanti");
  }

  $data = 0;
  $sql = "SELECT * FROM studenti WHERE user = '$username' AND pass = '$password'";
  $data = eseguiQuery($connection, $sql);


  http_response_code(200);
  echo json_encode($data);

?>
