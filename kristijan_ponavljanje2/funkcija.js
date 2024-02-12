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

function ponisti() {
    var radioGumbi = document.getElementsByName("spol");
    var rezultatLabela = document.getElementById("rezultat");

    for (var i = 0; i < radioGumbi.length; i++) {
        radioGumbi[i].checked = false;
    }

    rezultatLabela.innerHTML = "";
}
