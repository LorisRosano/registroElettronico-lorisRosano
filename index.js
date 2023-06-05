

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
        if(user === "" || pass === ""){
            swal({
                title: "Attenzione!",
                text: "Compilare tutti i campi!",
                icon: "warning",
                button: "Ok",
                timer: 3000,
                closeOnClickOutside: false,
                closeOnEsc: false,
                className: "swal-bg-change"
            });
            return;
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
                    className: "swal-bg-change"
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
                    icon: 'success',
                    button: "Ok",
                    timer: 3000,
                    closeOnClickOutside: false,
                    closeOnEsc: false,
                    className: "swal-bg-change"
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



