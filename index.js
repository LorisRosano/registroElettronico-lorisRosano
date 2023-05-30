var nomeUtente;

window.onload = () => {


    
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
        let username = $("#username").val();
        let password = $("#password").val();
        if(username === "" || password === ""){
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
            return;
        } 
        inviaRichiesta("GET", "login.php", {"user": username, "pass": CryptoJS.MD5(password)}
        ).then((response) => {
            response = response.data;
            nomeUtente = response.nome + response.cognome;
            alert(nomeUtente)
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
                    window.location = "paginaStudente.html";
                }, 1000);

                
            }
        })
        .catch(errore);    
    });

    
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


