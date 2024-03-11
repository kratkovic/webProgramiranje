function osvjeziTablicuArtikala() {

    fetch('http://localhost:3000/api/artikl')
        .then(response => response.json())
        .then(artikli => {
            var body = document.getElementById("tab_art");
            //iniciljano postalvjanje prije foreach petlje
            let bufferZaIspis = "";
            // foreach element iz polja podaci (napunjen u podaci.js skripti)

            artikli.forEach(element => {
                // bufferZaIspis += "<tr onclick=\"dohvatiDetaljeArt('" + element.id + "');\" >";
                bufferZaIspis += "<tr>";
                bufferZaIspis += "<td><img src=\"./slike/edit.png\" onclick=\"dohvatiDetaljeArt('" + element.id + "');\" alt=\"Izbriši\"></td>";
                bufferZaIspis += "<td>" + element.sifra + "</td>";
                bufferZaIspis += "<td>" + element.naziv + "</td>";
                bufferZaIspis += "<td>" + element.cijena + "</td>";
                bufferZaIspis += "<td>" + element.datum_unosa + "</td>";
                bufferZaIspis += "<td>" + element.datum_aktivacije + "</td>";
                bufferZaIspis += "<td><img src=\"./slike/delete.png\" onclick=\"obrisiArtiklPotvrda('" + element.id +"','"+ element.naziv + "');\" alt=\"Izbriši\"></td>";
                bufferZaIspis += "</tr>";
            }
            );
            //istakanje renedirane vrijednosti u body DOM element
            body.innerHTML = bufferZaIspis;
            //aktiviram željeni dio stranice (html dokumenta)
            aktivirajPregled("pregled-artikala");
        })
        .catch(error => {
            console.error('Greška prilikom dohvata:', error);
        });
}
var odabraniArtID;

function dohvatiDetaljeArt(x) {
    fetch('http://localhost:3000/api/artikl/' + x)
        .then(response => response.json())
        .then(data => {

            document.getElementById("artnaziv").value = data.naziv;
            document.getElementById("artcijena").value = data.cijena;
            document.getElementById("artsifra").value = data.sifra;   

            document.getElementById("artunos").value = data.datum_unosa ? parseDateTime(data.datum_unosa):'';
            document.getElementById("artaktivacija").value =  data.datum_aktivacije ? parseDateOnly(data.datum_aktivacije):'';
            //document.getElementById('id-artikla').value = data.id;//moram u html dodati polje, ili izvući van varijablku da bude globalna
            odabraniArtID = data.id; //ili ovako
            aktivirajPregled("izmjena-artikla");

        })
        .catch(error => {
            console.error('Greška prilikom dohvatanja podataka:', error);
        });

    //Ako se prije primjenio naziv na novi korisnik, sada vraćam nazad na: izmjeni korisnika
    //let naslov=document.querySelector('#izmjena-artikli h2');
    //naslov.innerHTML="Izmjeni narudžbe";
}

function spremiIzmjeneArtikla() {
    let metoda;
    let punaPutanja = 'http://localhost:3000/api/artikl';
    let dataToSend = {
        id: odabraniArtID,
        naziv: document.getElementById("artnaziv").value,
        cijena: document.getElementById("artcijena").value,
        sifra: document.getElementById("artsifra").value,
        // datum_unosa: oblikujDatum(document.getElementById("artunos").value), //datum unosa skriptno stavljamo, ne na fronti
        datum_aktivacije: oblikujDatum(document.getElementById("artaktivacija").value)
    };

    if (odabraniArtID == "") { //kreiramo novi artikl
        metoda = 'POST';
    }
    else {
        metoda = 'PUT';
        punaPutanja += '/' + odabraniArtID;

    }
   
    const dodatno = {
        method: metoda, // Specify the HTTP method
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
    };


    try {
        fetch(punaPutanja, dodatno)
            .then(response => response.text()) // Read response as text
            .then(data => {
                alert(data);
                osvjeziTablicuArtikala();
                odabraniArtID = "";
                document.getElementById("artnaziv").value="";
                document.getElementById("artcijena").value="";
                document.getElementById("artsifra").value="";
                document.getElementById("artunos").value="";
                document.getElementById("artaktivacija").value="";
            }); // Alert the response
    } catch (error) {
        alert('An error occurred!');
    }
}

function obrisiArtiklPotvrda(id, naziv){
        const potvrda = confirm(`Jeste li sigurni da želite izbrisati artikl ${naziv}?`);
        if (potvrda) {
            obrisiArtikl(id);
        }
}

function obrisiArtikl(x) {
    let metoda;
    if(x){//ako ima neki id!
        let punaPutanja = 'http://localhost:3000/api/artikl/'+x;
        metoda = 'DELETE';
    
        const dodatno = {
            method: metoda // Specify the HTTP method
            // headers: {
            //     'Content-Type': 'application/json'
            // },
            // body: JSON.stringify(dataToSend)
        };


        try {
            fetch(punaPutanja, dodatno)
                .then(response => response.text()) // Read response as text
                .then(data => {
                    alert(data);
                    osvjeziTablicuArtikala();               
                }); // Alert the response
        } catch (error) {
            alert('An error occurred!');
        }
    }

}
