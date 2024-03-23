class Igrica {
    constructor(id, naziv, izdavac, datum_izdavanja, zanr, cijena) {
        this.id = id;
        this.naziv = naziv;
        this.izdavac = izdavac;
        this.datum_izdavanja = datum_izdavanja;
        this.zanr = zanr;
        this.cijena = cijena;
    }


getStarostIgrice() {
    const danas = new Date();
    const datum_izdavanja = new Date(this.datum_izdavanja);
    const razlika = danas - datum_izdavanja;
    return Math.floor(razlika / (1000 * 60 * 60 * 24)); // Pretvori u dane
}

}
module.exports = Igrica;