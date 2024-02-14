function postavi() {
    var radioGumbi = document.getElementsByName("spol");
    var lista = document.getElementById("odabirSpola");
    var rezultatLabela = document.getElementById("rezultat");

    var odabranaVrijednost = "";

    for (var i = 0; i < radioGumbi.length; i++) {
        if (radioGumbi[i].checked) {
            odabranaVrijednost = radioGumbi[i].value;
            break;
        }
    }

    rezultatLabela.innerHTML = "Odabrani spol: " + odabranaVrijednost;

  
    var odabraniRadioGumb = document.getElementById(odabranaVrijednost.toLowerCase());
    if (odabraniRadioGumb) {
        odabraniRadioGumb.checked = true;
    }

    
    for (var j = 0; j < lista.options.length; j++) {
        if (lista.options[j].value === odabranaVrijednost) {
            lista.selectedIndex = j;
            break;
        }
    }
}

function postaviIzPadajuceListe() {
    var lista = document.getElementById("odabirSpola");
    var odabranaOpcija = lista.options[lista.selectedIndex].value;

    
    var odabraniRadioGumb = document.getElementById(odabranaOpcija);
    if (odabraniRadioGumb) {
        odabraniRadioGumb.checked = true;
    }

    document.getElementById("rezultat").innerHTML = "Odabrani spol: " + odabranaOpcija;
}

function ponisti() {
    var radioGumbi = document.getElementsByName("spol");
    var rezultatLabela = document.getElementById("rezultat");

    for (var i = 0; i < radioGumbi.length; i++) {
        radioGumbi[i].checked = false;
    }

    rezultatLabela.innerHTML = "";
}
