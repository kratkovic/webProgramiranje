const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const getArticles=require('./artikl_pregled');
const getArtiklById=require('./artikl_dohvat');
const createArtikl=require('./artikl_insert');
const updateArtikl=require('./artikl_update');
const deleteArtikl=require('./artikl_delete');


// Simulirani podaci (umjesto baze podataka)
let articles = [
    { id: 1, sifra: 'ax1', naziv: 'Artikl 1', cijena: 10.11, datum_unosa: '17.08.2023', datum_aktivacije: '01.09.2023' },
    { id: 2, sifra: 'ax2', naziv: 'Artikl 2', cijena: 20.23, datum_unosa: '14.11.2023', datum_aktivacije: '01.09.2023' },
    { id: 3, sifra: 'ax3', naziv: 'Artikl 3', cijena: 30.34, datum_unosa: '03.12.2023', datum_aktivacije: '01.09.2023' }
];

// Kreiranje HTTP servera
const server = http.createServer((req, res) => {
    //* otvaranje skripte pozivima sa drugih*/

    if (req.url === '/favicon.ico') {
        // Čitajte favicon.ico datoteku
        fs.readFile(path.join(__dirname, './public/favicon.ico'), (err, data) => {
            if (err) {
                // Ako dođe do pogreške prilikom čitanja datoteke, pošaljite 404
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Favicon not found');
            } else {
                // Ako uspješno pročitate datoteku, pošaljite je klijentu
                res.writeHead(200, { 'Content-Type': 'image/x-icon' });
                res.end(data);
            }
     });
    } else if (req.method === 'OPTIONS') {
        //uklanjamo CORS blokiranje
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.writeHead(200);
        res.end();
    } else {
        //uklanjamo CORS blokiranje
        //moramo i ovako , jer čini se da edge ne šalje OPTIONS request
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);

        const parsedUrl = url.parse(req.url, true);
        const path = parsedUrl.pathname;
        const primljeniDodatniParametri = parsedUrl.query;
        console.log( '   ====================  ');
        console.log( 'URL '+ req.url);
        console.log( 'Osnovna API putanja:'+path);
        console.log( 'metoda:'+req.method );
        //provjera putanje
        if (path === '/api/artikl'
            || path.startsWith('/api/artikl/')) {
            // Metoda GET za dohvaćanje svih artikala
            if (req.method === 'GET' && path === '/api/artikl') {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                // očekujemo oblik npr: /api/artikl?sort=naziv&smjer=asc
                

                getArticles(primljeniDodatniParametri['sort'] 
                            , primljeniDodatniParametri['smjer']
                            , primljeniDodatniParametri['art_filter'] 
                            , primljeniDodatniParametri['pageSize'] 
                            , primljeniDodatniParametri['page'] ) 
                .then((data) => {
                    res.end(JSON.stringify(data));
                })
                .catch(error => {
                    console.error('Greška prilikom dohvaćanja artikala iz baze podataka:', error);
                    res.status(500).send('Greška prilikom dohvaćanja artikala');                    
                });
                
            }

            // Metoda GET za dohvaćanje pojedinačnog artikla po ID-u
            else if (req.method === 'GET' && path.startsWith('/api/artikl/')) {
                const id = parseInt(path.split('/')[3]);
                getArtiklById(id)
                .then((article) => {
                    if (!article) {
                        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
                        res.end('Artikl nije pronađen.');
                    } else {
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify(article));
                    }
                })
                .catch(error => {
                    console.error('Greška prilikom dohvaćanja artikala iz baze podataka:', error);
                    res.status(500).send('Greška prilikom dohvaćanja artikala');                    
                });
               
            }
            // Metoda DELETE za brisanje postojećeg artikla po ID-u
            else if (req.method === 'DELETE' && path.startsWith('/api/artikl/')) {
                console.log('Brisanje!');
                const id = parseInt(path.split('/')[3]);
                console.log('za ID ' + id);

                deleteArtikl(id)
                        .then((x) => {
                            if (x>1) {
                                res.writeHead(400, { 'Content-Type': 'text/plain' });
                                res.end('Greška pri brisanju podataka.');
                            } else {
                                res.writeHead(201, { 'Content-Type': 'application/json' });
                                res.end(JSON.stringify({ message: 'Podaci uspješno uklonjeni.' }));
                            }
                        })
                        .catch(error => {
                            console.error('Greška prilikom brisanja artikla:', error);
                            res.status(500).send('Greška prilikom brisanja artikala');                    
                        });

            }

            // Metoda POST za stvaranje novog artikla
            else if (req.method === 'POST' && path === '/api/artikl') {
                let body = '';
                req.on('data', chunk => {
                    body += chunk.toString(); // Konvertiraj buffer u string
                });
                req.on('end', () => {

                    try {
                        console.log('Kreiranje novog!');
                        console.log(body);
                        const parsedBody = JSON.parse(body);

                        createArtikl(parsedBody.naziv, parsedBody.cijena, parsedBody.sifra, parsedBody.datum_aktivacije)
                        .then((id) => {
                            if (!id) {
                                res.writeHead(400, { 'Content-Type': 'text/plain' });
                                res.end('Greška pri insertu podataka.');
                            } else {
                                
                            res.writeHead(201, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ message: 'Podaci uspješno spremljeni.' }));
                            }
                        })
                        .catch(error => {
                            console.error('Greška prilikom kreiranja artikla:', error);
                            res.status(500).send('Greška prilikom kreiranja artikala');                    
                        });


                    } catch (error) {
                        console.log(error);
                        console.error('Greška pri parsiranju podataka:', error);
                        res.writeHead(400, { 'Content-Type': 'text/plain' });
                        res.end('Greška pri parsiranju podataka.');
                    }
                });
            }


            // Metoda PUT za ažuriranje postojećeg artikla po ID-u
            else if (req.method === 'PUT' && path.startsWith('/api/artikl/')) {
                console.log('Promjena!');
                const id = parseInt(path.split('/')[3]);
                console.log('Za id:' + id);
                let body = '';
                req.on('data', chunk => {
                    body += chunk.toString(); // Konvertiraj buffer u string
                });
                req.on('end', () => {
                    try {
                        const parsedBody = JSON.parse(body);
                        updateArtikl(id, parsedBody.naziv, parsedBody.cijena, parsedBody.sifra, parsedBody.datum_aktivacije)
                        .then((nest) => {
                            if (nest) {
                                res.writeHead(400, { 'Content-Type': 'text/plain' });
                                res.end('Greška pri izmjeni podataka.');
                            } else {                                
                                res.writeHead(201, { 'Content-Type': 'application/json' });
                                res.end(JSON.stringify({ message: 'Podaci uspješno spremljeni.' }));
                            }
                        })
                        .catch(error => {
                            console.error('Greška prilikom kreiranja artikla:', error);
                            res.status(500).send('Greška prilikom kreiranja artikala');                    
                        });
                    } catch (error) {
                        console.error('Greška pri parsiranju podataka:', error);
                        res.writeHead(400, { 'Content-Type': 'text/plain' });
                        res.end('Greška pri parsiranju podataka.');
                    }
                });
            }
        }
        // Putanja nije pronađena
        else {
            res.writeHead(404);
            res.end('Putanja nije pronađena.');
        }
    }
});

// Pokretanje servera
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
