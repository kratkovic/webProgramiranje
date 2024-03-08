function osvjeziTablicuArtikala() {
    fetch('http://localhost:3000/api/artikl')
        .then(response => response.json())
        .then(artikli => {
            var body = document.getElementById("tab_art");
            //iniciljano postavljanje prije foreach petlje
            let bufferZaIspis = "";
            // foreach element iz polja podaci (napunjen u podaci.js skripti)
            artikli.forEach(element => {
                bufferZaIspis += "<tr onclick=\"dohvatiDetaljeArt('" + element.id + "')\" >";
                bufferZaIspis += "<td></td>";
                bufferZaIspis += "<td>" + element.naziv + "</td>";
                bufferZaIspis += "<td>" + element.cijena + "</td>";
                bufferZaIspis += "</tr>";
            }
            );
            //istakanje renderirane vrijednosti u body DOM element
            body.innerHTML = bufferZaIspis;
            //aktiviram željeni dio stranice (html dokumenta)
            aktivirajPregled("pregled-artikala");
        })
        .catch(error => {
            console.error('Greška prilikom dohvata:', error);
        });
}

function dohvatiDetaljeArt(x) {
    //tražim element iz polja koji ima id jednak vrijednosti parametra x
    for (let i = 0; i < artikli.length; i++) {
        if (artikli[i].id == x) {
            //kada nađemo element moramo napuniti formu
            document.getElementById("brNar").value = artikli[i].brart;
            document.getElementById("partner").value = narudzbe[i].naziv;
            odabraniID = x;//zapamti koji id smo odabrali
            break;
        }
    }
    document.getElementById("pregled-korisnika").style.display = "none";
    document.getElementById("izmjena-korisnika").style.display = "none";
    document.getElementById("pregled-narudžbi").style.display = "none";
    document.getElementById("pregled-artikala").style.display = "none";
    document.getElementById("izmjena-narudzbi").style.display = "none";
    document.getElementById("izmjena-artikla").style.display = "block";

    //Ako se prije primjenio naziv na novi korisnik, sada vraćam nazad na: izmjeni korisnika
    let naslov = document.querySelector('#izmjena-artikla h2');
    naslov.innerHTML = "Izmjeni artikal";
}
function spremiIzmjeneArtikla() {
    if (odabraniID == "") {
        odabraniID = +"artikli.length";
        let noviClan = {
            id: odabraniID,
            brart: document.getElementById("brart").value,
            naziv: document.getElementById("naziv").value,

        };
        artikli.push(noviClan);
        odabraniID = "";
        document.getElementById("brart").value = "";
        document.getElementById("naziv").value = "";
    } else {

        //tražim element iz polja koji ima id jednak vrijednosti parametra x
        for (let i = 0; i < artikli.length; i++) {
            if (artikli[i].id == odabraniID) {
                //kada nađemo element moramo napuniti formu
                artikli[i].brart = document.getElementById("brart").value;
                artikli[i].naziv = document.getElementById("naziv").value;



                break;
            }
        }
    }
    osvjeziTablicuArtikla();
}
