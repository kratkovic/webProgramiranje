function dodajTekst() {

    var unosTeksta = document.getElementById('unosTeksta').value;
    var drugiDiv = document.getElementById('drugiDiv');

    drugiDiv.textContent += unosTeksta + ' ';
    document.getElementById('unosTeksta').value = '';
}
function obrisiTekst(){
    var drugiDiv = document.getElementById('drugiDiv');
    drugiDiv.textContent = " ";
}