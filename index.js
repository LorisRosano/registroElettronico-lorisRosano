window.onload = () => {
    function sus(btn){
        $(".btnLogin").siblings("imgUtente").toggleClass("sus");
    }
    $(".btnLogin").on("mouseover", () => {sus(this)});
    $(".btnLogin").on("mouseout", () => {sus(this)});

    $("#codFiscaleScuola").animate({
        width: "12vw",
        height:"3vh"
    }, 1000)
};
function apriPaginaLoginStudente(){
    window.location = "studente.php";
}
function ritornaHome(){
    window.location = "index.php";
}
function animationInput(input){
    input.animate({
        width: "12vw",
        height:"3vh"
    }, 1000)
}