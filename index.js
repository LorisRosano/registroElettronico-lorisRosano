window.onload = () => {
    function sus(btn){
        $(".btnLogin").siblings("imgUtente").toggleClass("sus");
    }
    $(".btnLogin").on("mouseover", () => {sus(this)});
    $(".btnLogin").on("mouseout", () => {sus(this)});
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
