window.onload = () => {
    inviaRichiesta("GET", "getUser.php", {})
    .catch(errore)
    .then((response) => {
        response = response.data;
        nomeUtente = response["nome"] + " " + response["cognome"];
        nomeUtente = nomeUtente.charAt(0).toUpperCase() + nomeUtente.slice(1);
        nomeUtente = nomeUtente.split(" ");
        nomeUtente[1] = nomeUtente[1].charAt(0).toUpperCase() + nomeUtente[1].slice(1);
        nomeUtente = nomeUtente.join(" ");
        $("#h2Benvenuto").text(nomeUtente);
     })


    $("#divAnagrafico").on("click", function (){
        $("#contentAnagrafico").animate({opacity: "100%"}, 1000);
        $("#contentVoti").animate({opacity: "0%"}, 1000);
        $("#contentArgomenti").animate({opacity: "0%"}, 1000);
        $("#contentMaterie").animate({opacity: "0%"}, 1000);
        $("#contentAssenze").animate({opacity: "0%"}, 1000);
        inviaRichiesta("GET", "getUser.php", {})
        .catch(errore)
        .then((response) => {
            response = response.data;
            console.log(response);
            $("#nome").text(response["nome"]);
            $("#cognome").text(response["cognome"]);
            $("#user").text(response["user"]);
            $("#classe").text(response["classe"]);
            $("#residenza").text(response["residenza"]);
            $("#indirizzo").text(response["indrizzo"]);
            nomeUtente = response["nome"] + " " + response["cognome"];
                        nomeUtente = nomeUtente.charAt(0).toUpperCase() + nomeUtente.slice(1);
                        nomeUtente = nomeUtente.split(" ");
                        nomeUtente[1] = nomeUtente[1].charAt(0).toUpperCase() + nomeUtente[1].slice(1);
                        nomeUtente = nomeUtente.join(" ");
                        $("#h2Benvenuto").text(nomeUtente);
        })

    })

    $("#divVoti").on("click", function (){
        $("#contentVoti").animate({opacity: "100%"}, 1000);
        $("#contentAnagrafico").animate({opacity: "0%"}, 1000);
        $("#contentArgomenti").animate({opacity: "0%"}, 1000);
        $("#contentMaterie").animate({opacity: "0%"}, 1000);
        $("#contentAssenze").animate({opacity: "0%"}, 1000);
        inviaRichiesta("GET", "getUser.php", {})
        .catch(errore)
        .then((response) => {
            response = response.data;
            console.log(response);
            $("#nome").text(response["nome"]);
            $("#cognome").text(response["cognome"]);
            $("#user").text(response["user"]);
            $("#classe").text(response["classe"]);
            $("#residenza").text(response["residenza"]);
            $("#indirizzo").text(response["indrizzo"]);
            nomeUtente = response["nome"] + " " + response["cognome"];
            nomeUtente = nomeUtente.charAt(0).toUpperCase() + nomeUtente.slice(1);
            nomeUtente = nomeUtente.split(" ");
            nomeUtente[1] = nomeUtente[1].charAt(0).toUpperCase() + nomeUtente[1].slice(1);
            nomeUtente = nomeUtente.join(" ");
            $("#h2Benvenuto").text(nomeUtente);
        })

    })
    $(".divsSelezione").on("click", function(){
        let divSelezionato = $("#divSelezionato");
        divSelezionato.animate({ width: "98.7vw", left: "1vh", top: "120vw"}, 1000);
        $("#divDestra").animate({left: "50vw"}, 1000);
        $("#divSinistra").animate({height: "38vh"}, 1000);
    });

    $(".divsSelezione").on("click", function(){
        $("#iconClose").animate({opacity: "100%"}, 1000);
    })
    $("#iconClose").on("click", function(){
        let divSelezionato = $("#divSelezionato");
        divSelezionato.animate({ width: "73vw", left: "52vh", top: "0vw"}, 1000);
        $("#divDestra").animate({left: "50vw"}, 1000);
        $("#divSinistra").animate({height: "98vh"}, 1000);
        $("#iconClose").animate({opacity: "0%"}, 1000);
    })
};


