
let indeksPolja = 0;
const poljeSlika = ['/Kristijan_ponavljanje6/slike/slika1.jpg', '/Kristijan_ponavljanje6/slike/slika2.jpg', '/Kristijan_ponavljanje6/slike/slika3.jpg'];

function promijeniSliku() {
    indeksPolja = (indeksPolja + 1) % poljeSlika.length;
    document.getElementById('album').src = poljeSlika[indeksPolja]; 
}