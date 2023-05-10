<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="index.js"></script>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <link rel="stylesheet" href="style.css">
    <title>Registro Elettronico - Studente</title>
</head>
<body>
    <span class="material-symbols-outlined" id="btnHome" onclick="ritornaHome()">
        home
    </span>
    <?php
        echo "<h1 class='titolo'> Registro Elettronico </h1>";
        echo "<h2> Studente </h2>";
        echo "<br>";
        echo "<div id='divLogin'>";
        echo "<h3> Effettua il Login </h3>";
        echo "<input class='inputLogin' type='text' id='codFiscaleScuola' readonly='true' placeholder='83003390040'> </input>";
        echo "<input class='inputLogin' type='text' id='codiceUtente' placeholder='codice utente...'> </input>";
        echo "<input class='inputLogin' type='password' id='password' placeholder='password...'> </input>";
        echo "<button id='btnLogin' onclick='loginStudente()'> </button>";
        echo "</div>";
    ?>
</body>
</html>