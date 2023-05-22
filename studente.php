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
    <h1 class="titolo"> Registro Elettronico </h1>
    <h2> Studente </h2>
    <br>
    <div id="divLogin">
        <h3>Effettua il login</h3>
        <input type="text" class="inputLogin" id="codFiscaleScuola" readonly="true" placeholder="83003390040" onclick="animationInput($(this))">
        <div id="divCodiceUtente">
            <input type="text" class="inputLogin" id="codiceUtente" onclick="animationInput($(this))">
        </div>
        <div id="divPassword">
            <input type="text" class="inputLogin" id="password" onclick="animationInput($(this))">
        </div>
        
    </div>
</body>
</html>