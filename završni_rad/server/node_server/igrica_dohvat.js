const getDBConnection = require('./simpleserver_connection.js');

function getdohvatiIgru(igreId) {
    return new Promise((resolve, reject) => {
        const sqlUpit = 'SELECT sifra, naziv, izdavac, datum_izdavanja, zanr, cijena FROM igre WHERE id = ?';
        const connection = getDBConnection();
        connection.query(sqlUpit, [igreId], (err, results) => {            
            if (err) {
                console.error('Greška prilikom dohvaćanja igre:', err);
                reject(err); // Odbaci grešku ako se dogodi
                return; // Dodaj return kako bi se spriječilo daljnje izvršavanje koda
            }
            if (results.length === 0) {
                console.log('Igrica s ID-om', igreId, 'nije pronađena.');
                resolve(null); // Vraćamo null jer igra s traženim ID-om nije pronađena
                return; // Dodaj return kako bi se spriječilo daljnje izvršavanje koda
            }
            const igra = results[0];
            let formatiraniDatum = '';
            if (igra.datum_izdavanja) {
                const dateTemp = new Date(igra.datum_izdavanja);
                formatiraniDatum = dateTemp.toLocaleDateString('hr-HR', { day: '2-digit', month: '2-digit', year: 'numeric' }) + ' ' + dateTemp.toLocaleTimeString('hr-HR');
            }
            const igricaData = {
                id: igreId,
                naziv: igra.naziv,
                izdavac: igra.izdavac,
                datumIzdavanja: formatiraniDatum,
                zanr: igra.zanr,
                cijena: igra.cijena
            };
            resolve(igricaData);
        });
    });
}

module.exports = getdohvatiIgru;
