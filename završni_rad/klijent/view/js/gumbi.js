let gumbPregledKorisnika = document.querySelector('[href="pregled-korisnika"]');
gumbPregledKorisnika.addEventListener('click', function(e){
    e.preventDefault();
    osvjeziTablicuKorisnika();//ovim se regeneira sadržaj tablice korisnika
    
});

let gumbPregledNar = document.querySelector('[href="pregled-narudžbi"]');
gumbPregledNar.addEventListener('click', function(e){
    e.preventDefault();
    osvjeziTablicuNarudzbi();
});

let gumbPregledArt = document.querySelector('[href="pregled-artikala"]');
gumbPregledArt.addEventListener('click', function(e){
    e.preventDefault();
    osvjeziTablicuArtikala();

});

let gumbPregledIgrica = document.querySelector('[href="pregled-igrica"]');
gumbPregledIgrica.addEventListener('click', function(e){
    e.preventDefault();
    osvjeziTablicuIgrica();

});
let gumbIzmjenaKorsnika = document.querySelector('[href="novi-korisnik"]');
gumbIzmjenaKorsnika.addEventListener('click', function(e){
    e.preventDefault();
    aktivirajPregled("izmjena-korisnika");
    let naslov=document.querySelector('#izmjena-korisnika h2');
    naslov.innerHTML="Novi korisnik";
});

let gumbNovaNar = document.querySelector('[href="nova-narudzba"]');
gumbNovaNar.addEventListener('click', function(e){
    e.preventDefault();
    aktivirajPregled("izmjena-narudzbe");

    let naslov=document.querySelector('#izmjena-narudzbe h2');
    naslov.innerHTML="Nova Narudžba";
});
let gumbNoviArtikl = document.querySelector('[href="novi-artikl"]');
gumbNoviArtikl.addEventListener('click', function(e){
    e.preventDefault();
    aktivirajPregled("izmjena-artikla");

    let naslov=document.querySelector('#izmjena-artikla h2');
    naslov.innerHTML="Novi Artikl";

    odabraniArtID=''; //varijabla definirana u artikli.js - sadrži info o odabranom artiklu-ovdje resetiram jer inaće radi PUT umjesto POST
});
let gumbNovaIgrica = document.querySelector('[href="nova-igrica"]');
gumbNovaIgrica.addEventListener('click', function(e){
    e.preventDefault();
    aktivirajPregled("izmjena-igrice");

    let naslov=document.querySelector('#izmjena-igrice h2');
    naslov.innerHTML="Nova Igrica";
    
    odabraniIgrID='';
});
