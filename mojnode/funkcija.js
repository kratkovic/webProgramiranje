function total(a, b) {
    rezultat = Math.round((a + b)%5 ); 
    return rezultat;
}
console.log("rezulat funkcije total je :" + total(22.3,33.5));