let gumbPregledKorisnika = document.querySelector('[href="pregled-korisnika"]');
gumbPregledKorisnika.addEventListener('click', function (e) {
    e.preventDefault();
    osvjeziTablicuKorisnika();

});

let gumbPregledNar = document.querySelector('[href="pregled-narudžbi"]');
gumbPregledNar.addEventListener('click', function (e) {
    e.preventDefault();
    osvjeziTablicuNarudzbi();

});
let gumbPregledArt = document.querySelector('[href="pregled-artikala"]');
gumbPregledArt.addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById("pregled-korisnika").style.display = "none";
    document.getElementById("izmjena-korisnika").style.display = "none";
    document.getElementById("pregled-narudžbi").style.display = "none";
    document.getElementById("pregled-artikala").style.display = "block";
    document.getElementById("izmjena-narudzbi").style.display = "none";

});
let gumbIzmjenaKorsnika = document.querySelector('[href="novi-korisnik"]');
gumbIzmjenaKorsnika.addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById("pregled-korisnika").style.display = "none";
    document.getElementById("izmjena-korisnika").style.display = "block";
    document.getElementById("pregled-narudžbi").style.display = "none";
    document.getElementById("pregled-artikala").style.display = "none";
     document.getElementById("izmjena-korisnika").style.display = "none";
     document.getElementById("izmjena-narudzbi").style.display = "none";
    let naslov = document.querySelector('#izmjena-korisnika h2');
    naslov.innerHTML = "Novi korisnik";
});

let gumbIzmjenaNarudzbi = document.querySelector('[href="nova-narudzba"]');
gumbIzmjenaNarudzbi.addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById("pregled-korisnika").style.display = "none";
    document.getElementById("izmjena-korisnika").style.display = "none";
    document.getElementById("pregled-narudžbi").style.display = "none";
    document.getElementById("pregled-artikala").style.display = "none";
     document.getElementById("izmjena-korisnika").style.display = "none";
     document.getElementById("izmjena-narudzbi").style.display = "block";
    let naslov = document.querySelector('#izmjena-narudzbi h2');
    naslov.innerHTML = "Nova narudžba";
});



body = document.getElementById("tab_nar");
//iniciljano postalvjanje prije foreach petlje
bufferZaIspis = "";
// foreach element iz polja narudzbe (napunjen u podaci.js skripti)
narudzbe.forEach(element => {
    bufferZaIspis += "<tr>";
    bufferZaIspis += "<td></td>";
    bufferZaIspis += "<td>" + element.brNar + "</td>";
    bufferZaIspis += "<td>" + element.partner + "</td>";
    bufferZaIspis += "</tr>";
}
);

body.innerHTML = bufferZaIspis;

body = document.getElementById("tab_art");
//istakanje renedirane vrijedsnoti u body DOM element
//iniciljano postalvjanje prije foreach petlje
bufferZaIspis = "";
// foreach element iz polja narudzbe (napunjen u podaci.js skripti)
artikli.forEach(element => {
    bufferZaIspis += "<tr>";
    bufferZaIspis += "<td></td>";
    bufferZaIspis += "<td>" + element.brart + "</td>";
    bufferZaIspis += "<td>" + element.naziv + "</td>";
    bufferZaIspis += "</tr>";
}
);
