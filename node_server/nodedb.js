const mysql = require('mysql2');

let sqlUpit = 'SELECT * from artikl';

const spajanje = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'kristijandb'
} );

spajanje.query(
    sqlUpit,
    function(err, result, fields){
        if (err) throw err;
       
    }
);
spajanje.end();


