
function dodajElement() {
  
    var tekst = document.getElementById('textInput').value;
    var lista = document.getElementById('lista');
    var noviElement = document.createElement('li');
    noviElement.textContent = tekst;

    lista.appendChild(noviElement);


    document.getElementById('textInput').value = '';
}


document.getElementById('dodajButton').addEventListener('click', dodajElement);
