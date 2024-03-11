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
});