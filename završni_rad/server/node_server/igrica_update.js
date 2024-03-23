const getDBConnection = require('./simpleserver_connection.js');

// Funkcija za izmjenu igre preko ID-a
function updateIgrica(id, naziv, izdavac, datum_izdavanja, cijena, zanr) {
    return new Promise((resolve, reject) => {
        const sqlUpit = 'UPDATE igre SET naziv=?, izdavac=?, datum_izdavanja=?,  cijena=?, zanr=?  WHERE id=?';

        let datum;
        if(datum_izdavanja){
            
            const dijelovi = datum_izdavanja.split('. '); // Razdvajamo string na dijelove

            const dan = parseInt(dijelovi[0].trim(), 10); // Parsiramo dan kao cjelobrojnu vrijednost
            const mjesec = parseInt(dijelovi[1].trim(), 10) - 1; // Parsiramo mjesec (od 0 do 11)
            const godina = parseInt(dijelovi[2].trim(), 10); // Parsiramo godinu

            datum = new Date(godina, mjesec, dan);    
        }
        console.log(datum_izdavanja+ '=>'+ datum);
        const connection = getDBConnection();

        connection.query(sqlUpit, [naziv, izdavac, datum, cijena, zanr, id], (err, results) => {
            if (err) {
                console.error('Greška prilikom ažuriranja igre:', err);
                reject(err); // Odbaci grešku ako se dogodi
            } else {
                resolve(); // Ažuriranje uspješno
            }
        });
    });
}

module.exports = updateIgrica;
