let indeksPolja = 0;
let timer; 

const poljeSlika = ['/Kristijan_ponavljanje8/slike/slika1.jpg', '/Kristijan_ponavljanje8/slike/slika2.jpg', '/Kristijan_ponavljanje8/slike/slika3.jpg'];

function promijeniSliku() {
    indeksPolja = (indeksPolja + 1) % poljeSlika.length;
    document.getElementById('album').src = poljeSlika[indeksPolja]; 
}

function pokreniTimer() {
    const intervalInput = document.getElementById('intervalInput').value;
    const br_mili_sek = intervalInput * 1000;

  
    if (timer) {
        clearInterval(timer);
    }


    timer = setInterval(promijeniSliku, br_mili_sek);
}

function zaustaviTimer() {
    clearInterval(timer);
}

function promijeniInterval() {
    const intervalInput = document.getElementById('intervalInput').value;
    const br_mili_sek = intervalInput * 1000;

    
    if (timer) {
        clearInterval(timer);
        timer = setInterval(promijeniSliku, br_mili_sek);
    }
}
