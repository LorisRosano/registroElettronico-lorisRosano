window.onload = () => {
    function sus(btn){
        $(".btnLogin").siblings("imgUtente").toggleClass("sus");
    }
    $(".btnLogin").on("mouseover", () => {sus(this)});
    $(".btnLogin").on("mouseout", () => {sus(this)});
    $("#login-btn").on("click", () => {
        //Controlla che i campi siano stati riempiti
        let username = $("#username").val();
        let password = $("#password").val();
        if(username === "" || password === ""){
            //Crea uno sweatalert che segnala di compilare tutti i campi con sfondo #474E68
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
        //Effettua il controllo all'interno del database registroElettronico.sql per verificare che l'utente sia registrato
        inviaRichiesta("GET", "login.php", {"user": username, "pass": password}
        ).then((response) => {
            console.log(response.data);
        })
        .catch(errore);

        window.location = "paginaStudente.html";
        

        
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


