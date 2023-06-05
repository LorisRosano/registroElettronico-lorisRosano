<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="index.js"></script>
    <link rel="stylesheet" href="style.css">
    <title>Registro Elettronico</title>
</head>
<body>
<h1 class="titolo">Registro Elettronico</h1>
    <div id="divPadre">
        <?php
            echo "<div id='divStudente' class='divLogin'>";
            echo "<img src='img/user.png' alt='utente' class='imgUtente'>";
            echo "<button class='btnLogin' id='btnLoginStudente' onclick='apriPaginaLoginStudente()'>";
            echo "<span class='textBtnLogin'> Login Studente </span> <div class='barra'> </button>";
            echo "</div>";
        ?>
    </div>
</body>
</html>