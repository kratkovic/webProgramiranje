function postavi() {
    var radioGumbi = document.getElementsByName("spol");
    var rezultatLabela = document.getElementById("rezultat");

    for (var i = 0; i < radioGumbi.length; i++) {
        if (radioGumbi[i].checked) {
            rezultatLabela.innerHTML = "Odabrani spol: " + radioGumbi[i].value;
            break;
        }
    }
}

function postaviIzPadajuceListe(){
    var lista = document.getElementById("odabirSpola");
    var odabranaOpcija = lista.options[lista.selectedIndex].value;

    document.getElementById(odabranaOpcija).checked = true;
    document.getElementById("rezultat").innerHTML = "Odabrani spol" + odabranaOpcija;
}

function ponisti() {
    var radioGumbi = document.getElementsByName("spol");
    var rezultatLabela = document.getElementById("rezultat");

    for (var i = 0; i < radioGumbi.length; i++) {
        radioGumbi[i].checked = false;
    }

    rezultatLabela.innerHTML = "";
}
