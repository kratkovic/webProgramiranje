const Igrica = require('./Igrica.js');
const getDBConnection = require('./simpleserver_connection.js');

let games = new Array();

function getIgrica(sort, smjer, filter, pageSize, page) {
    return new Promise((resolve, reject) => {
        // 1. kreiranje SQL upita za dohvat

        let sqlUpit = 'SELECT id, naziv, izdavac, datum_izdavanja, zanr, cijena FROM igre ';

        // Dinamička dopuna SQL upita za filtriranje
        if (filter) {
            sqlUpit += ` WHERE (naziv LIKE '%${filter}%' `;
            sqlUpit += ` OR izdavac LIKE '%${filter}%')`;
        }
        if (sort) {
            sqlUpit += ` ORDER BY ${sort} `;
        }
        if (smjer) {
            sqlUpit += smjer;
        }
        if (pageSize) {
            sqlUpit += ` LIMIT ${pageSize} OFFSET ${(page - 1) * pageSize}`;
        }

        // 2. kreiranje SQL upita za brojanje redaka
        let sqlUpitBrojanje = 'SELECT COUNT(*) AS total_rows FROM igre ';
        if (filter) {
            sqlUpitBrojanje += ` WHERE (naziv LIKE '%${filter}%' `;
            sqlUpitBrojanje += ` OR izdavac LIKE '%${filter}%')`;
        }
        let brojRedaka = 0;
        let brojStranica = 0;
        
        // Izvršavanje upita
        const connection = getDBConnection();
        // Brojanje redaka u prvom upitu, a zatim dohvaćanje istih
        connection.query(sqlUpitBrojanje, (countError, countResult) => {
            if (countError) {
                reject(countError);
            } else {
                brojRedaka = countResult[0].total_rows;
                brojStranica = Math.ceil(brojRedaka / pageSize);              
                
                // Dohvaćanje podataka s ciljane stranice
                console.log("SQL upit = " + sqlUpit);
                connection.query(sqlUpit, (error, results, fields) => {
                    games.splice(0);
                    if (error) {
                        reject(error);
                    }
                    results.forEach(element => {
                        let formatiraniDatum = '';
                        if (element.datum_izdavanja) {
                            let dateTemp = element.datum_izdavanja;
                            formatiraniDatum = dateTemp.toLocaleDateString('hr-HR',
                                { day: '2-digit', month: '2-digit', year: 'numeric' });
                        }

                        // Poziv konstruktora klase Igrica
                        let x = new Igrica(
                            element.id,
                            element.naziv,
                            element.izdavac,
                            formatiraniDatum,
                            element.zanr,
                            element.cijena
                        );
                        // Dodavanje objekta u polje                    
                        games.push(x);
                    });
                                   
                    console.log('games.length: ' + games.length);
                  
                    resolve({ games, brojStranica, brojRedaka, page, pageSize });
                });
            }
        });
    });
}

function getRowNumber(filter, pageSize) {
    return new Promise((resolve, reject) => {
        let sqlUpit = 'SELECT COUNT(*) AS total_rows FROM igre ';

        // Dinamička dopuna SQL upita za filtriranje
        if (filter) {
            sqlUpit += ` WHERE (naziv LIKE '%${filter}%' `;
            sqlUpit += ` OR izdavac LIKE '%${filter}%')`;
        }
        console.log("SQL upit = " + sqlUpit);

        // Izvršavanje upita
        const connection = getDBConnection();
        connection.query(sqlUpit, (error, results, fields) => {
            if (error) {
                console.error('Greška prilikom dohvaćanja igre:', error);
                reject(error);
            }
            resolve(results[0]);
        });
    });
}

module.exports = getIgrica;
