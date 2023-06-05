window.onload = () => {
    let nomeUtente = "";
    let password = "password";
    let user = "";
    let matricola = "";
    let classe = "";
    let media = 0;
    let totVoti = 0;
    let ricordami = false;
    $("#iconClose").hide();

    dataDiOggi();

    inviaRichiesta("GET", "getUser.php", {})
    .catch(errore)
    .then((response) => {
        response = response.data;
        nomeUtente = response["nome"] + " " + response["cognome"];
        nomeUtente = nomeUtente.charAt(0).toUpperCase() + nomeUtente.slice(1);
        nomeUtente = nomeUtente.split(" ");
        nomeUtente[1] = nomeUtente[1].charAt(0).toUpperCase() + nomeUtente[1].slice(1);
        nomeUtente = nomeUtente.join(" ");

        user = response["user"];
        matricola = response["matricola"];
        $("#h2Benvenuto").text(nomeUtente);

        classe = response["classe"];
    })

     


    $("#divAnagrafico").on("click", function (){
        $("#divContent > div").removeClass("visibile");
        $("#contentAnagrafico").addClass("visibile");

        $("#contentAnagrafico").css("z-index", "1");

        inviaRichiesta("GET", "getUser.php", {})
        .catch(errore)
        .then((response) => {
            response = response.data;    
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
        $("#contentVoti").css("z-index", "1");

        $("#divContent > div").removeClass("visibile");
        $("#contentVoti").addClass("visibile");
        $("#selectMateria").off("change");
        $("#selectMateria").val(0);

        $(".option").on("click", function(){
            $("#tableVoti").empty();
            inviaRichiesta("GET", "getVoti.php", {'user': matricola})
            .catch(errore)
            .then((response) => {
                function funzione(i){
                    ciao.push(response[i]);   
                }
                function funzioneResponsePiuAlto(){
                    let aus = response.filter((voto) => {
                        return voto.materia == $(this).prop("id");
                    });
                    return aus;
                }
                response = response.data;
                let ciao = [];
                let l = response.length;
                let lVoto = 0;
                for(let i = 0; i < response.length; i++){
                    let voto = response[i]["voto"];
                    let materia = response[i]["materia"];
                    let idMateria = response[i]["materia"];
                    let data = response[i]["data"];
                    

                    inviaRichiesta("GET", "getMateria.php", {'id': materia})
                    .catch(errore)
                    .then((response) => {
                        response = response.data;
                        materia = response["materia"];
                        let materiaSelezionata = $(this).prop("id");
                        if(materiaSelezionata == idMateria){
                            funzione(i);
                            lVoto++;
                            aggiornaTabellaVoti(voto, materia, data);
                        }
                        else if(materiaSelezionata == 0){
                            funzione(i);
                            lVoto++;
                            aggiornaTabellaVoti(voto, materia, data);
                        }
                        if(i == l - 1){
                            let aus = funzioneResponsePiuAlto();
                            if($("#tableVoti").text() == ""){
                                $("#divMedia").text("Non ci sono voti per questa materia");
                                return;
                            }
                            media = ciao.reduce((tot, voto) => {return tot + parseFloat(voto.voto)}, 0)
                            media = media / lVoto;
                            media = Math.floor(media*100) / 100;
                            // response.forEach(voto => {
                            //     console.log(voto.voto);
                            // });
                            $("#divMedia").text("Media: " + media);
                        }
                        
                    })
                }
                 
        })
        });
        
        inviaRichiesta("GET", "getVoti.php", {'user': matricola})
        .catch(errore)
        .then((response) => {
            response = response.data;

            for(let i = 0; i < response.length; i++){
                let voto = response[i]["voto"];
                let materia = response[i]["materia"];
                let data = response[i]["data"];

                inviaRichiesta("GET", "getMateria.php", {'id': materia})
                .catch(errore)
                .then((response) => {
                    response = response.data;
                    materia = response["materia"];
                    aggiornaTabellaVoti(voto, materia, data);
                    
                })
            } 
            console.log(response)
            media = response.reduce((tot, voto) => {return tot + parseFloat(voto.voto)}, 0)
                    media = media / response.length;
                    media = media.toFixed(2);
                    // response.forEach(voto => {
                    //     console.log(voto.voto);
                    // });
                    $("#divMedia").text("Media: " + media);
        })

    })
    

    $("#divArgomenti").on("click", function (){
        $("#divNoArgomenti").text("");
        $("#divContent > div").removeClass("visibile");
        $("#contentArgomenti").addClass("visibile");

        $("#contentArgomenti").css("z-index", "1");

        inviaRichiesta("GET", "getArgomenti.php", {"class": classe})
        .catch(errore)
        .then(async(response) => {
            response = response.data;
            let materiaSelezionata2 = 0;
            if(materiaSelezionata2 != 0){
                response = response.filter((argomento) => {
                    return argomento.materia == materiaSelezionata2;
                });
            }
            let materia = await inviaRichiesta("GET", "getMateria.php", {"id": materiaSelezionata2});
            materia = materia.data;
            materia = typeof(materia) == "string" ? "Tutte" : materia["materia"];

            let materie = await inviaRichiesta("GET", "getMaterie.php", {});
            materie = materie.data;

           
            let table = $("#tableArgomenti");
            let tbody = $("<tbody>");
            for(let argomento of response){
                let materiaScelta = await inviaRichiesta("GET", "getMateria.php", {"id": argomento["materia"]});
                // let materiaScelta = materie.find((materia) => {
                //     return materia["materia"] == materie["materia"];
                // });
                materiaScelta = materiaScelta.data;

                let table = $("#tableArgomenti");
                let tbody = $("<tbody>");
                let td = $("<td>");
                td.text(argomento["argomento"]);
                td.appendTo(tbody);
                td = $("<td>");
                td.text(materiaScelta["materia"]);
                td.appendTo(tbody);
                td = $("<td>");
                td.text(argomento["data"]);
                td.appendTo(tbody);
                table.append(tbody);
            }
            
        })
        $(".option").on("click", function(){
            $("#divNoArgomenti").text("");
            $("#tableArgomenti").empty();
            let materiaSelezionata3 = $(this).prop("id");    
            inviaRichiesta("GET", "getArgomentiPerMateria.php", {"class": classe, "materia": materiaSelezionata3})
            .catch(errore)
            .then(async(response) => {
                
                response = response.data;
                console.log(response)
                let materiaSelezionata2 = $(this).prop("id");
                if(materiaSelezionata2 != 0){
                    response = response.filter((argomento) => {
                        return argomento.materia == materiaSelezionata2;
                    });
                    if(response.length == 0){
                        $("#divNoArgomenti").text("Non ci sono argomenti per questa materia");

                    }
                    let materia = await inviaRichiesta("GET", "getMateria.php", {"id": materiaSelezionata2});
                    materia = materia.data;
                    materia = typeof(materia) == "string" ? "Tutte" : materia["materia"];

                    let materie = await inviaRichiesta("GET", "getMaterie.php", {});
                    materie = materie.data;

                
                    let table = $("#tableArgomenti");
                    let tbody = $("<tbody>");
                    for(let argomento of response){
                        let materiaScelta = await inviaRichiesta("GET", "getMateria.php", {"id": argomento["materia"]});
                        // let materiaScelta = materie.find((materia) => {
                        //     return materia["materia"] == materie["materia"];
                        // });
                        materiaScelta = materiaScelta.data;

                        let table = $("#tableArgomenti");
                        let tbody = $("<tbody>");
                        let td = $("<td>");
                        td.text(argomento["argomento"]);
                        td.appendTo(tbody);
                        td = $("<td>");
                        td.text(materiaScelta["materia"]);
                        td.appendTo(tbody);
                        td = $("<td>");
                        td.text(argomento["data"]);
                        td.appendTo(tbody);
                        table.append(tbody);
                    }
                }
                else if(materiaSelezionata2 == 0){
                    inviaRichiesta("GET", "getArgomenti.php", {"class": classe})
                    .catch(errore)
                    .then(async(response) => {
                        response = response.data;
                        let materiaSelezionata2 = $(this).prop("id");
                        if(materiaSelezionata2 != 0){
                            response = response.filter((argomento) => {
                                return argomento.materia == materiaSelezionata2;
                            });
                        }
                        let materia = await inviaRichiesta("GET", "getMateria.php", {"id": materiaSelezionata2});
                        materia = materia.data;
                        materia = typeof(materia) == "string" ? "Tutte" : materia["materia"];

                        let materie = await inviaRichiesta("GET", "getMaterie.php", {});
                        materie = materie.data;

                    
                        let table = $("#tableArgomenti");
                        let tbody = $("<tbody>");
                        for(let argomento of response){
                            let materiaScelta = await inviaRichiesta("GET", "getMateria.php", {"id": argomento["materia"]});
                            // let materiaScelta = materie.find((materia) => {
                            //     return materia["materia"] == materie["materia"];
                            // });
                            materiaScelta = materiaScelta.data;

                            let table = $("#tableArgomenti");
                            let tbody = $("<tbody>");
                            let td = $("<td>");
                            td.text(argomento["argomento"]);
                            td.appendTo(tbody);
                            td = $("<td>");
                            td.text(materiaScelta["materia"]);
                            td.appendTo(tbody);
                            td = $("<td>");
                            td.text(argomento["data"]);
                            td.appendTo(tbody);
                            table.append(tbody);
                        }
                        
                    })
                }         
            })
        })
    });

    $("#divAssenze").on("click", async function (){
        $("#divContent > div").removeClass("visibile");
        $("#contentAssenze").addClass("visibile");
        let assenze = await inviaRichiesta("GET", "assenze.php", { matricola });
        const giustificate = assenze["data"].filter((assenza) => assenza["giustificato"] == 1);
        const nonGiustificate = assenze["data"].filter((assenza) => assenza["giustificato"] == 0);
        console.log(giustificate);
        console.log(nonGiustificate);
        const _gius = $("#giustificate").empty();
        for(const g of giustificate){
            let data = new Date(g["data"]);
            data = data.toLocaleDateString("it-IT", { day: "2-digit", month: "2-digit", year: "numeric" });
            const _div = $("<div>").addClass("giustificata")
            // _div.append($("<h5>").text("Assenza"))
            _div.append($("<span>").text(data).addClass("dataAssenza"));
           $("<span>").addClass("material-symbols-outlined").text("done").appendTo(_div);
            _div.appendTo(_gius);
        }
        const _nGius = $("#daGiustificare").empty();
        for(const ng of nonGiustificate){
            let data = new Date(ng["data"]);
            data = data.toLocaleDateString("it-IT", { day: "2-digit", month: "2-digit", year: "numeric" });
            const _div = $("<div>").addClass("assenza")
            _div.append($("<h5>").text("Assenza"))
            _div.append($("<span>").text(data).addClass("dataAssenza"));
            $("<button>").text("Giustifica").on("click", giustificaAssenza).appendTo(_div);

            _div.appendTo(_nGius);
           
        }
    })
    function giustificaAssenza(){
        //Crea uno sweatalert dove viene chiesto di confermare la password per giustificare
        //l'assenza
        const _this = $(this);
        swal({
            title: "Giustifica assenza",
            text: "Conferma la password per giustificare l'assenza",
            className: "swal-bg-change",
            content: {
                element: "input",
                attributes: {
                    placeholder: "Password",
                    type: "password"
                }
            },
            buttons: {
                cancel: true,
                confirm: true
            }
        }).then((value) => {
            if(value){
                inviaRichiesta("POST", "editAbsence.php", { id: _this.parent().data("id"), password: value })
                .then((response) => {
                    if(value == password){
                        swal("Assenza giustificata", "", "success", {className: "swal-bg-change"});
                        _this.parent().remove();

                        const _gius = $("#giustificate");
                        const _div = $("<div>").addClass("giustificata")
                        _div.append($("<span>").text(_this.parent().find(".dataAssenza").text()).addClass("dataAssenza"));
                        $("<span>").addClass("material-symbols-outlined").text("done").appendTo(_div);
                        _div.appendTo(_gius);

                    }
                    else{
                        swal("Errore", "Password errata", "error", {className: "swal-bg-change"});
                    }
                })
                .catch(errore);
            }
        }
     )

    }

    function aggiornaTabellaVoti(voto, materia, data) {
        let table = $("#tableVoti");
        let contentVoti = $("#contentVoti");
        let tbody = $("<tbody>");
        tbody.addClass("tbodyVoti");
        table.append(tbody);
        let tr = $("#trVoti");
        let td = $("<td>");
        if(voto < 6){
            td.css("color", "red");
        }
        else{
            td.css("color", "green");
        }
        td.text(voto);
        td.appendTo(tbody);
        td = $("<td>");
        td.text(materia);
        td.appendTo(tbody);
        td = $("<td>");
        td.text(data);
        td.appendTo(tbody);
    }

    $(".divsSelezione").on("click", function(){
        const destra = $("#divDestra");
        const sinistra = $("#divSinistra");
        destra.addClass("collassaDestra")
        sinistra.addClass("collassaSinistra")
        $("#iconClose").show(500);
    });

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
    

    function dataDiOggi(){ 
        let data = new Date();
        let giorno = data.getDate();
        let mese = data.getMonth();
        let anno = data.getFullYear();
        let giornoSettimana = data.getDay();
        let giorniSettimana = ["Domenica", "Lunedi", "Martedi", "Mercoledi", "Giovedi", "Venerdi", "Sabato"];
        let mesi = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Lugio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
        $("#h2DataDiOggi").text(giorniSettimana[giornoSettimana] + " " + giorno + " " + mesi[mese] + " " + anno);
    }
     
};

function logout(){
    window.location.href = "studente.html";
}
