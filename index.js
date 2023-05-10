window.onload = () => {
    function sus(btn){
        $(".btnLogin").siblings("imgUtente").toggleClass("sus");
    }
    $(".btnLogin").on("mouseover", () => {sus(this)});
    $(".btnLogin").on("mouseout", () => {sus(this)});
};
function apriPaginaLoginStudente(){
    window.location = "studente.php";
}
function ritornaHome(){
    window.location = "index.php";
}
