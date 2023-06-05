//#region ONLOAD


window.addEventListener("load", async function () {
    $(".pseudoSelect").on("click", ".option", async function () {
        let target = !!event;
        target = target ? $(event.target).text() != "close" : true;
        if(!$(this).text().includes("Cerca") && target)
        {
            chiudiElemento($(this), null);
        }
    })
    $(".selectBody").on("blur", function () {
        let select = $(this).parent();
        setTimeout(() =>{
            chiudiElemento(null, select.find(".selectOptions"));
        },1);
    })
});

var resizeOpzioni = (select, elem) =>{
    let n = select.find(`.${elem}`).length;
    n = n < 3 ? n+2 : n;
    select.find(".selectOptions").css({height: `${n * 2}rem`});
}

var chiudiElemento = (opzione = null, select = null) =>{
    if(!!opzione)select = opzione;
    while(!select.hasClass("pseudoSelect") && select.prop("id") != "root"){
        select = select.parent();   
    }
    select.removeClass("espanso");
    if(!!opzione){
        let val = opzione.closest(".option").attr("valore")
        if(val)
        {
            select.find(".selectBody > .testoSelect").attr("valore", val);
        }
        select.find(".selectBody > .testoSelect").text(opzione.children().eq(0).text());
        const opz = opzione.closest(".option");
        select.find(".material-symbols-outlined").text("")
        opz.children().eq(1).text("done")
        opz.addClass("selezionata");
    }
    select.find(".selectOptions").css({height: 0});
}

var espandiSelect = (select) =>{
    while(!select.hasClass("pseudoSelect") && select.prop("id") != "root"){
        select = select.parent();   
    }
    if(select.hasClass("espanso")) return chiudiElemento(null, select);
    select.toggleClass("espanso");
    if(select.prop("id") == "root") return alert("s");  
    let opzioni = select.find(".selectOptions");
    if(opzioni.height() > 0) return select.find(".selectBody").blur();
    select.find(".selectBody")
    resizeOpzioni(select, "option");
}