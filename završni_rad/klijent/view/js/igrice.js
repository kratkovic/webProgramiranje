let punaPutanja_fix = 'http://localhost:3001/api/igre';
let igr_url_pregled = punaPutanja_fix;

function osvjeziTablicuIgrica() {
    fetch(dodajParametreStranice_igr(igr_url_pregled))
        .then(response => {
            if (!response.ok) {
                const status = response.status;
                const statusText = response.statusText;                
                const errorMessage = `HTTP Status: ${status}, Status text: ${statusText}`;
                throw new Error(errorMessage);
            } else {
                return response.json();
            }
        })
        .then(data => {
            var body = document.getElementById("tab_igr");
            let bufferZaIspis = "";
            if(data.games && data.games.length>0){
                data.games.forEach(element => {
                    bufferZaIspis += "<tr>";
                    bufferZaIspis += "<td><img src=\"./slike/edit.png\" onclick=\"dohvatiDetaljeIgrice('" + element.id + "');\" alt=\"Izbriši\"></td>";
                    bufferZaIspis += "<td>" + element.naziv + "</td>"; 
                    bufferZaIspis += "<td>" + element.izdavac + "</td>"; 
                    bufferZaIspis += "<td>" + element.datum_izdavanja + "</td>"; 
                    bufferZaIspis += "<td>" + element.zanr + "</td>"; 
                    bufferZaIspis += "<td>" + element.cijena + "</td>"; 
                    bufferZaIspis += "<td><img src=\"./slike/delete.png\" onclick=\"obrisiIgricuPotvrda('" + element.id +"','"+ element.naziv + "');\" alt=\"Izbriši\"></td>";
                    bufferZaIspis += "</tr>";
                });                
            }
            body.innerHTML = bufferZaIspis;        
            aktivirajPregled("pregled-igrica");
            divBrStranice = document.getElementById("igrStranice");
            divBrStranice.innerHTML="";
            if (data.brojStranica > 0) {
                for (let index = 0; index < data.brojStranica; index++) {
                    if (data.page == (index + 1)) {
                        divBrStranice.innerHTML += `<button class="odabran paggination">${index+1}</button>`;
                    } else {
                        divBrStranice.innerHTML += `<button class="paggination" onclick="dohvatiStranicu_igr(${index+1})">${index+1}</button>`;
                    }
                }
            }
            divBrStranice.innerHTML += ` <div> Ukupno, ${data.brojRedaka} redaka </div>`;
        })
        .catch(error => {
            console.error('Greška prilikom dohvata:', error);
            alert("Greška:"+error);
        });
}

var odabraniIgrID;

function dohvatiDetaljeIgrice(i) {
    fetch(punaPutanja_fix+'/' + i)
        .then(response => response.json())
        .then(data => {
            document.getElementById("igrid").value = data.id;
            document.getElementById("igrnaziv").value = data.naziv;
            document.getElementById("igrizd").value = data.izdavac;
            // document.getElementById("igriz").value =  data.datum_izdavanja ? parseDateTime(data.datum_aktivacije) : '';
            document.getElementById("igriz").value =  data.datum_izdavanja ? parseDate(data.datum_izdavanja) : '';
            document.getElementById("igrcijena").value = data.cijena;
            document.getElementById("igrzn").value = data.zanr;
            odabraniIgrID = data.id; 
            aktivirajPregled("izmjena-igrice");
        })
        .catch(error => {
            console.error('Greška prilikom dohvatanja podataka:', error);
        });
}

function spremiIzmjeneIgrice() {
    let metoda;
    let punaPutanja = punaPutanja_fix;
    let dataToSend = {
        id: odabraniIgrID,
        naziv: document.getElementById("igrnaziv").value,
        izdavac: document.getElementById("igrizd").value,
        cijena: document.getElementById("igrcijena").value,
        zanr: document.getElementById("igrzn").value,
        datum_izdavanja: oblikujDatum(document.getElementById("igriz").value)             
    };

    if (odabraniIgrID == "") { 
        metoda = 'POST';
    }
    else {
        metoda = 'PUT';
        punaPutanja += '/' + odabraniIgrID;
    }
   
    const dodatno = {
        method: metoda, // POST ili PUT
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend) //sadržaj stavke za izmjenu
    };

    try {
        fetch(punaPutanja, dodatno)
            .then(response => response.json()) // Read response as text
            .then(data => {
                alert(data.message);//prikazujemo poruku sa servera na fronti
                osvjeziTablicuIgrica();
                odabraniIgrID = "";
                document.getElementById("igrnaziv").value = "";
                document.getElementById("igrizd").value = "";
                document.getElementById("igriz").value = "";
                document.getElementById("igrcijena").value = "";
                document.getElementById("igrzn").value = "";
            }); // Alert the response
    } catch (error) {
        alert('Greška pri spremanju!');
    }
}


function obrisiIgricuPotvrda(id, naziv) {
    const potvrda = confirm(`Jeste li sigurni da želite izbrisati igricu ${naziv}?`);
    if (potvrda) {
        obrisiIgricu(id);
    }
}

function obrisiIgricu(i) {
    let metoda;
    if (i) {
        let punaPutanja = punaPutanja_fix+'/' +i;
        metoda = 'DELETE';
        const dodatno = {
            method: metoda
        };
        try {
            fetch(punaPutanja, dodatno)
                .then(response => response.json())
                .then(data => {
                    alert(data);
                    osvjeziTablicuIgrica();               
                });
        } catch (error) {
            alert('An error occurred!');
        }
    }
}

let igrKolone = [ 'naziv', 'izdavac', 'datum_izdavanja', 'zanr','cijena'];
let igrKoloneNazivi = ['Naziv', 'Izdavač', 'Datum Izdavanja', 'Žanr', 'Cijena'];
let igr_smjer = 'asc';

function poredajIgricePo(idx) {
    igr_smjer = (igr_smjer == 'asc') ? 'desc' : 'asc';
    igr_url_pregled = punaPutanja_fix + '?sort=' + igrKolone[idx].toLowerCase().replace(' ', '_') + '&smjer=' + igr_smjer;
    pretraziIgrice();
    for (let index = 0; index < igrKolone.length; index++) {
        if (index == idx) {
            if (art_smjer == 'asc') {
                document.getElementById('c_gam' + index).innerHTML = igrKoloneNazivi[index] + ' &uarr;';
            } else {
                document.getElementById('c_gam' + index).innerHTML = igrKoloneNazivi[index] + ' &darr;';
            }
        } else {
            document.getElementById('c_gam' + index).innerHTML = igrKoloneNazivi[index];
        }
    }
}

function pretraziIgrice() {
    let filterInput = document.getElementById('filterInput_i').value;
    let filterIndex = igr_url_pregled.indexOf('?');  
    if (filterIndex > 0) {
        let filterIndex2 = igr_url_pregled.indexOf('igr_filter');
        if (filterIndex2 > 0) {
            igr_url_pregled = igr_url_pregled.substring(0, filterIndex2);
            igr_url_pregled += 'igr_filter=' + encodeURIComponent(filterInput);
        } else {
            igr_url_pregled += '&' + 'igr_filter=' + encodeURIComponent(filterInput);
        }
    } else {
        igr_url_pregled += '?' + 'igr_filter=' + encodeURIComponent(filterInput);
    }            
    osvjeziTablicuIgrica();
}

function ocistiPretraziIgrice() {
    document.getElementById('filterInput_i').value="";
    pretraziIgrice();
}

function prikaziIznadGumba(button, kojiPozorcic) {
    var message = document.getElementById(kojiPozorcic);
    message.style.display = "block";
    var buttonOkvir = button.getBoundingClientRect();
    message.style.top = (buttonOkvir.top - message.offsetHeight - 15 )+ "px";
    message.style.left = ( buttonOkvir.left + (button.offsetWidth - message.offsetWidth) / 2 )+ "px";
}

function hideMessage(kojiPozorcic) {
    var message = document.getElementById(kojiPozorcic);
    message.style.display = "none";
}

function dodajParametreStranice_igr(url) {
    let velicinaStranice = document.getElementById('paggingInput_i').value;
    const odabraniGumb = document.querySelector('#igrStranice .odabran');
    let vrijednostOdabranogGumba;
    if (odabraniGumb) {
        vrijednostOdabranogGumba = odabraniGumb.textContent;
    } else {
        vrijednostOdabranogGumba = 1;
    }
    let dodatakNaURL=`?pageSize=${velicinaStranice}&page=${vrijednostOdabranogGumba}`;
    const placeholder = '?'; 
    let noviURL;
    if (url.indexOf(placeholder) > 0) {
        noviURL = url.replace(placeholder, dodatakNaURL + "&");
    } else {
        noviURL = url + dodatakNaURL;    
    }    
    return  noviURL;    
}

function dohvatiStranicu_igr(selected) {
    const gumbi = document.querySelectorAll('#igrStranice button');
    let index=1;
    gumbi.forEach(gumb => {
        if (index == selected) {
            gumb.setAttribute('class', 'odabran paggination');            
        } else {
            gumb.setAttribute('class', 'paggination');              
        }        
        index++;
    });
    osvjeziTablicuIgrica();
}