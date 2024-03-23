const mysqlModul = require('mysql2');
let connection;
// Konfiguracija za povezivanje na MySQL bazu podataka
function getDBConnection(){
    if(!connection){
            connection = mysqlModul.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'kristijandb'
        });       
    }
    connection.connect((err) => {
        if (err) {
          console.error('Error connecting to MySQL database:', err);
        } else {
          console.log('Connected to MySQL database.');
        }
      });
    return connection;
}
module.exports = getDBConnection;

