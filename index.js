

window.onload = () => {
    var nomeUtente;
    
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
        inviaRichiesta("GET", "login.php", {user, pass})
        .catch(function(err){
            if(err["response"] && err["response"]["status"] == 401){
                swal({
                    title: "Attenzione!",
                    text: "Password o codice utente errati!",
                    icon: "warning",
                    button: "Ok",
                    timer: 3000,
                    closeOnClickOutside: false,
                    closeOnEsc: false,
                    className: "swal-bg-red"
                });
            }
            else{
                error(err);
            }
        })
        .then((response) => {
            response = response.data;
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

                    
            }, 1000);
        })
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


