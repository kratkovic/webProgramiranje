const mysql = require('mysql2');
const connection = mysql.createConnection({
host: 'localhost',
user: 'root',
password: '',
database: 'kristijandb'
});
connection.query(
'SELECT * FROM artikl',
function(err, results, fields) {
if (err) throw err;
console.log('Rezultati:', results);
}
);
connection.end();