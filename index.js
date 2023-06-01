

window.onload = () => {
    var nomeUtente;
    $(".divsSelezione").on("click", function(){
        let divSelezionato = $("#divSelezionato");
        divSelezionato.animate({ width: "98.7vw", left: "1vh", top: "120vw"}, 1000);
        $("#divDestra").animate({left: "50vw"}, 1000);
        $("#divSinistra").animate({height: "38vh"}, 1000);
    });
    function sus(btn){
        $(".btnLogin").siblings("imgUtente").toggleClass("sus");
    }
    $(".btnLogin").on("mouseover", () => {sus(this)});
    $(".btnLogin").on("mouseout", () => {sus(this)});
    $("#login-btn").on("click", () => {
        let user = $("#username").val();
        let pass = $("#password").val();
        while(user === "" || pass === ""){
            swal({
                title: "Attenzione!",
                text: "Compilare tutti i campi!",
                icon: "warning",
                button: "Ok",
                timer: 3000,
                closeOnClickOutside: false,
                closeOnEsc: false,
                className: "swal-bg-red"
            });
        } 
        pass = CryptoJS.MD5(pass);
        inviaRichiesta("GET", "login.php", {user, pass}
        ).then((response) => {
            response = response.data;
            let nome = response[0].nome;
            nome = nome[0].toUpperCase() + nome.substring(1);
            let cognome = response[0].cognome;
            cognome = cognome[0].toUpperCase() + cognome.substring(1);
            //console.log(nome + " " + cognome);
            nomeUtente = nome + " " + cognome;
            //console.log(nomeUtente);
            if(response.length == 0){
                swal({
                    title: "Attenzione!",
                    text: "Password o codice utente errati!",
                    icon: "error",
                    button: "Ok",
                    timer: 3000,
                    closeOnClickOutside: false,
                    closeOnEsc: false,
                    className: "swal-bg-red"
                });
                return;
            }
            else{           
                swal({
                    title: "Benvenuto!",
                    text: "Login effettuato con successo!",
                    icon: "success",
                    button: "Ok",
                    timer: 3000,
                    closeOnClickOutside: false,
                    closeOnEsc: false,
                    className: "swal-bg-red"
                });
                setTimeout(() => {
                    console.log(nomeUtente);
                    window.location = "paginaStudente.html";
                    $("#h2Benvenuto").text(nomeUtente);

                }, 1000);
            }
        })
        .catch(console.log(errore))
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

    $("#divAnagrafico").on("click", function (){
        $("#contentAnagrafico").animate({opacity: "100%"}, 1000);
        //Crea una richiesta che va a prendere i dati dell'anagrafica
        inviaRichiesta("GET", "anagrafica.php", {
            "user": "1"
        }).then((response) => {
            response = response.data;
            console.log(response);
            $("#nome").text(response[0].nome);
            $("#cognome").text(response[0].cognome);
            $("#user").text(response[0].user);
            $("#classe").text(response[0].classe);
            $("#residenza").text(response[0].residenza);
            $("#indirizzo").text(response[0].indirizzo);
        })

    })
};
function apriPaginaLoginStudente(){
    window.location = "studente.html";
}
function ritornaHome(){
    window.location = "index.php";
}
function cambiaPassword(){
    let divLogin = $(".login-container");
    divLogin.animate({height: "toggle", opacity: "toggle"}, "slow", () => {
        let aus = $("#divLogin").children().not(".nascosto");
        let aus2 = $("#divLogin").children(".nascosto");
        aus.toggleClass("nascosto");
        aus2.toggleClass("nascosto");
        console.log(aus);
    });
    divLogin.animate({height: "toggle", opacity: "toggle"}, "slow");
}
function apriDivSelezionato(){
   
    
}


