const getDBConnection = require('./simpleserver_connection.js');

function deleteIgre(id) {
    return new Promise((resolve, reject) => {
        const sqlUpit = 'DELETE FROM igre WHERE id = ?';
        const connection = getDBConnection();
        connection.query(sqlUpit, [id ], (err, results) => {
            if (err) {
                console.error('Greška prilikom brisanja igre:', err);
                reject(err); // Odbaci grešku ako se dogodi
            }
            // connection.end();//ovo nam treba kod testnog- samostalnog izvršavanja , inače ne..
            resolve();
        });
    });
}
module.exports = deleteIgre;
