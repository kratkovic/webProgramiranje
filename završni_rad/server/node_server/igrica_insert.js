const getDBConnection = require('./simpleserver_connection.js');

// Funkcija za stvaranje nove igre
function createIgrica(naz, izd, datumIzd, cij, zanr) {
    return new Promise((resolve, reject) => {
        const sqlUpit = 'INSERT INTO igre (naziv, izdavac, datum_izdavanja, cijena ,zanr) VALUES (?, ?, ?, ?, ?)';
        
        let datum;
        if(datumIzd){
            
            const dijelovi = datumIzd.split('. '); // Razdvajamo string na dijelove

            const dan = parseInt(dijelovi[0].trim(), 10); // Parsiramo dan kao cjelobrojnu vrijednost
            const mjesec = parseInt(dijelovi[1].trim(), 10) - 1; // Parsiramo mjesec (od 0 do 11)
            const godina = parseInt(dijelovi[2].trim(), 10); // Parsiramo godinu

            datum = new Date(godina, mjesec, dan);            
        }
        console.log(datumIzd+ '=>'+ datum);
        const connection = getDBConnection();
        connection.query(sqlUpit, [naz, izd, datum, cij, zanr], (err, results) => {
            if (err) {
                console.error('Greška prilikom stvaranja nove igre:', err);
                reject(err); // Odbaci grešku ako se dogodi
            }
            resolve(results.insertId); // Vraća ID stvorene igre
        });
    });
}

module.exports = createIgrica;