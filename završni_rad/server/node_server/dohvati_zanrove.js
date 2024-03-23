const getDBConnection = require('./simpleserver_connection.js');

function dohvatiZanrove() {
    return new Promise((resolve, reject) => {
        const connection = getDBConnection(); // Dobijanje konekcije na bazu
        const query = 'SELECT zanr FROM igre'; // SQL upit za dohvatanje naziva žanrova iz tabele "igre"

        connection.query(query, (error, results) => {
            if (error) {
                console.error('Greška prilikom dohvatanja žanrova iz baze podataka:', error);
                reject(error); // Odbacivanje obećanja u slučaju greške
            } else {
                console.log('Žanrovi su uspešno dohvaćeni iz baze podataka.');
                // Rezultati su u obliku niz objekata, gde svaki objekat ima ključ "zanr"
                const zanrovi = results.map(row => row.zanr);
                resolve(zanrovi); // Rešavanje obećanja sa nizom žanrova
            }
            connection.end(); // Zatvaranje konekcije nakon završetka upita
        });
    });
}

module.exports = {
    dohvatiZanrove
};
