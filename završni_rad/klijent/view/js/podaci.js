//polje...
var korisnici = [
    //prvi element = JSON oblik zapisa
    {
        "id": "0",
        "ime": "Josip",
        "prezime": "Mirković",
        "slika": "https://as2.ftcdn.net/v2/jpg/03/16/76/07/1000_F_316760793_VwaEcqW6A4D5A6Li9j4ArqY2i0KuSS5o.jpg",
        "email": "josip@mirkovic.hr",
        "rodjendan": "2024-01-18T18:49"
    },
    //drugi element
    {
        "id": "1",
        "ime": "Ivana",
        "prezime": "Mirković",
        "slika": "https://as2.ftcdn.net/v2/jpg/03/16/76/07/1000_F_316760793_VwaEcqW6A4D5A6Li9j4ArqY2i0KuSS5o.jpg",
        "email": "ivana@mirkovic.hr"
    }
    //n elementa ..
];

//polje...
var narudzbe = [
    //prvi element = JSON oblik zapisa
    {
        "id": "0",
        "brNar": "100",
        "partner": "Đuro Đaković spec."
    },
    {
        "id": "1",
        "brNar": "400",
        "partner": "Drvna industrija Brod"
    }
    //n elementa ..
];
//polje sa popisom DOM-idova za html tagove <article>
var pregledi = [
    "pregled-korisnika",
    "pregled-narudžbi",
    "pregled-artikala",
    "izmjena-korisnika",
    "izmjena-narudzbe",
    "izmjena-artikla",
    "pregled-igrica",
    "izmjena-igrice"];

function aktivirajPregled(article_id) {
    pregledi.forEach(element => {
        if (element == article_id) {
            //za predani id aktiviraj(prikaži) pripadni html tag article article
            document.getElementById(element).style.display = "block";
        } else {
            //ostale html tagove article  -> deaktiviraj/sakrij
            document.getElementById(element).style.display = "none";
        }

    }
    );
}

function ispisDatumUCeliju(x) {
    let parsiraniDAtum = new Date(x);
    if (!isNaN(parsiraniDAtum)) {
        //let d=parsiraniDAtum.getDay();//broj dan u tjednu
        let d = parsiraniDAtum.getDate();
        let m = parsiraniDAtum.getMonth();//mjesec u godini, počevši od 0
        m += 1;
        let y = parsiraniDAtum.getFullYear();

        return "<td >" + d + "." + m + "." + y + "</td>";
    } else {
        return "<td ></td>";
    }
}

function parseDate(dateString) {
    //prasiram tekst datuma u datum dd.mm.yyyy
    // Razdvajamo datum po točki (.)
    var parts = dateString.split('.');

    // Pristupamo dijelovima datuma i stvaramo novi Date objekt
    var day = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10) - 1; // Mjeseci se računaju od 0 do 11
    var year = parseInt(parts[2], 10);

    // Stvaramo novi Date objekt
    var date = new Date(year, month, day);

    // iz nekog razloda imam probelm sa UTC zonom:
    // Dodajte vremensku razliku između UTC vremena i lokalnog vremena
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());

    return date;
}
//primjenjujemo na input type:datetime-local 
//tekst koji primimo sa server u obliku: "11. 03. 2024. 10:32:33" želimo tako i prikazati u datetime pickeru
function parseDateTime(dateString) {
    //moramo išćupati sve što se da:
    if (dateString) {
        // "11. 03. 2024. 10:32:33"
        //   0   1   2     3
        const dijelovi = dateString.split('. '); // Razdvajamo string na dijelove

        const dan = parseInt(dijelovi[0].trim(), 10); // Parsiramo dan kao cjelobrojnu vrijednost
        const mjesec = parseInt(dijelovi[1].trim(), 10) - 1; // Parsiramo mjesec (od 0 do 11)
        const godina = parseInt(dijelovi[2].trim().substr(0, 4), 10); // Parsiramo godinu

        const vrijeme = dijelovi[3].trim().split(':'); // Razdvajamo string na dijelove - vrijeme ide u 4. dijelu sa :

        const sat = parseInt(vrijeme[0].trim(), 10);
        const min = parseInt(vrijeme[1].trim(), 10);
        const sec = parseInt(vrijeme[2].trim(), 10);
        datum = new Date(godina, mjesec, dan, sat, min, sec);

        const prikaz = datum.toISOString().slice(0, 19);
        return prikaz;
    }
    return '';
}
//primjenjujemo na input type:date  
function parseDateOnly(dateString) {
    let x = parseDate(dateString).toISOString().split('T')[0]; //T je limiter između gggg-mm-ddThh:se
    return x;
}

function oblikujDatum(odabrani) {
    if (odabrani === 'undefined'
        || odabrani.trim() == ''
        || odabrani.indexOf('dd') > 0) {
        return '';
    }
    let d = new Date(odabrani);
    prikaz = d.toLocaleDateString("hr-HR", {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    });
    return prikaz;
}



