window.onload = () => {
    $("#iconClose").hide();
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
        $("#divContent > div").removeClass("visibile");
        $("#contentAnagrafico").addClass("visibile");
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
        $("#divContent > div").removeClass("visibile");
        $("#contentVoti").addClass("visibile");
        inviaRichiesta("GET", "getVoti.php", {})
        .catch(errore)
        .then((response) => {
            response = response.data;
            console.log(response);
            
        })

    })
    $(".divsSelezione").on("click", function(){
        // let divSelezionato = $("#divSelezionato");
        // divSelezionato.animate({ width: "98.7vw", left: "1vh", top: "120vw"}, 1000);
        // $("#divDestra").animate({left: "50vw"}, 1000);
        // $("#divSinistra").animate({height: "38vh"}, 1000);
        
        const destra = $("#divDestra");
        const sinistra = $("#divSinistra");
        destra.addClass("collassaDestra")
        sinistra.addClass("collassaSinistra")
    });

    $(".divsSelezione").on("click", function(){
        $("#iconClose").show(500);
    })

    $("#iconClose").on("click", function(){
        $("#iconClose").hide(500);
        const destra = $("#divDestra");
        const sinistra = $("#divSinistra");
        const coll = $("#divDestra, #divSinistra");
        coll.addClass("lento")
        setTimeout(() => {coll.removeClass("lento")}, 1000);
        destra.removeClass("collassaDestra")
        sinistra.removeClass("collassaSinistra")
    })
};


