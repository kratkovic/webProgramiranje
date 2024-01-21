function osvjeziTablicuNarudzbi() {
    var body = document.getElementById("tab_nar");
    //iniciljano postalvjanje prije foreach petlje
    let bufferZaIspis = "";
    // foreach element iz polja podaci (napunjen u podaci.js skripti)
   narudzbe.forEach(element => {
        bufferZaIspis += "<tr onclick=\" dohvatiDetaljeNar('" + element.id + "')\" >";
        bufferZaIspis += "<td></td>";
        bufferZaIspis += "<td>" + element.brNar + "</td>";
        bufferZaIspis += "<td>" + element.partner + "</td>";
        bufferZaIspis += "</tr>";
    });


    //istakanje renedirane vrijedsnoti u body DOM element
    body.innerHTML = bufferZaIspis;

    document.getElementById("pregled-korisnika").style.display = "none";
    document.getElementById("izmjena-korisnika").style.display = "none";
    document.getElementById("pregled-narudžbi").style.display = "block";
    document.getElementById("pregled-artikala").style.display = "none";
    document.getElementById("izmjena-narudzbi").style.display = "none";
    document.getElementById("izmjena-artikla").style.display = "none";
}

function dohvatiDetaljeNar(x) {
    //tražim element iz polja koji ima id jednak vrijednosti parametra x
    for (let i = 0; i < narudzbe.length; i++) {
        if (narudzbe[i].id == x) {
            //kada nađemo element moramo napuniti formu
            document.getElementById("brNar").value = narudzbe[i].brNar;
            document.getElementById("partner").value = narudzbe[i].partner;
            odabraniID = x;//zapamti koji id smo odabrali
            break;
        }
    }
    document.getElementById("pregled-korisnika").style.display = "none";
    document.getElementById("izmjena-korisnika").style.display = "none";
    document.getElementById("pregled-narudžbi").style.display = "none";
    document.getElementById("pregled-artikala").style.display = "none";
    document.getElementById("izmjena-narudzbi").style.display = "block";
    document.getElementById("izmjena-artikla").style.display = "none";
    //Ako se prije primjenio naziv na novi korisnik, sada vraćam nazad na: izmjeni korisnika
    let naslov = document.querySelector('#izmjena-narudzbe h2');
    naslov.innerHTML = "Izmjeni narudžbu";
}
function spremiIzmjeneNarudzbe() {
    if (odabraniID == "") {
        odabraniID = +"narudzbe.length";
        let noviClan = {
            id: odabraniID,
            brNar: document.getElementById("brNar").value,
            partner: document.getElementById("partner").value,
           
        };
        narudzbe.push(noviClan);
        odabraniID = "";
        document.getElementById("brNar").value = "";
        document.getElementById("partner").value = "";
        } else {

        //tražim element iz polja koji ima id jednak vrijednosti parametra x
        for (let i = 0; i < narudzbe.length; i++) {
            if (narudzbe[i].id == odabraniID) {
                //kada nađemo element moramo napuniti formu
                narudzbe[i].brNar = document.getElementById("brNar").value;
                narudzbe[i].partner = document.getElementById("partner").value;
              


                break;
            }
        }
    }
    osvjeziTablicuNarudzbi();
}
