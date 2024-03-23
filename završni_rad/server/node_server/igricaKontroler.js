const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const getIgrica = require('./igrica_pregled');
const dohvatiIgru = require('./igrica_dohvat.js');
const createIgrica = require('./igrica_insert');
const updateIgrica = require('./igrica_update');
const deleteIgrica = require('./igrica_delete');
const dohvatiZanrove = require('./dohvati_zanrove');

const server = http.createServer((req, res) => {
    if (req.url === '/favicon.ico') {
        fs.readFile(path.join(__dirname, './public/favicon.ico'), (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Favicon not found');
            } else {
                res.writeHead(200, { 'Content-Type': 'image/x-icon' });
                res.end(data);
            }
        });
    } else if (req.method === 'OPTIONS') {
        // Obrada CORS zahtjeva
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.writeHead(200);
        res.end();
    } else {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        
        // Obrada ostalih zahtjeva
        const parsedUrl = url.parse(req.url, true);
        const path = parsedUrl.pathname;
        const primljeniDodatniParametri = parsedUrl.query;

        if (path === '/api/igre' || path.startsWith('/api/igre/')) {
            if (req.method === 'GET' && path === '/api/igre') {
                getIgrica(primljeniDodatniParametri['sort']
                        , primljeniDodatniParametri['smjer']
                        , primljeniDodatniParametri['igr_filter']
                        , primljeniDodatniParametri['pageSize']
                        , primljeniDodatniParametri['page']
                    )
                    .then((games) => {
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify(games));
                    })
                    .catch(error => {
                        console.error('Greška prilikom dohvaćanja igara iz baze podataka:', error);
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Greška prilikom dohvaćanja igara');
                    });
            } else if (req.method === 'GET' && path.startsWith('/api/igre/')) {
                const id = parseInt(path.split('/')[3]);
                dohvatiIgru(id)
                .then((article) => {
                    if (!article) {
                        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
                        res.end('Igrica nije pronađena.');
                    } else {
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify(article));
                    }
                })
                .catch(error => {
                    console.error('Greška prilikom dohvaćanja igara iz baze podataka:', error);
                    res.status(500).send('Greška prilikom dohvaćanja igara');
                });
            } else if (req.method === 'DELETE' && path.startsWith('/api/igre/')) {
                const id = parseInt(req.url.split('/')[3]);
                deleteIgrica(id)
                    .then(() => {
                        // res.writeHead(200, { 'Content-Type': 'text/plain' });
                        // res.end('Igra uspješno obrisana');
                        res.writeHead(201, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ message: 'Igra uspješno obrisana!' }));
                    })
                    .catch(error => {
                        console.error('Greška prilikom brisanja igre iz baze podataka:', error);
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Greška prilikom brisanja igre');
                    });
            } else if (req.method === 'POST' && path === '/api/igre') {
                let body = [];
                req.on('data', (chunk) => {
                    body.push(chunk);
                }).on('end', () => {
                    body = Buffer.concat(body).toString();
                    console.log(body);
                    const parsedBody = JSON.parse(body);

                    createIgrica(parsedBody.naziv, parsedBody.izdavac, parsedBody.datum_izdavanja, parsedBody.cijena, parsedBody.zanr)                    
                        .then((id) => {
                            // res.writeHead(200, { 'Content-Type': 'text/plain' });
                            // res.end(`Igra uspješno stvorena. ID: ${id}`);
                            res.writeHead(201, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ message:`Igra uspješno stvorena. ID: ${id}`}));
                        })
                        .catch(error => {
                            console.error('Greška prilikom stvaranja nove igre:', error);
                            res.writeHead(500, { 'Content-Type': 'text/plain' });
                            res.end('Greška prilikom stvaranja nove igre');
                        });
                });
            } else if (req.method === 'PUT' && path.startsWith('/api/igre/')) {
                let body = [];
                req.on('data', (chunk) => {
                    body.push(chunk);
                }).on('end', () => {
                    body = Buffer.concat(body).toString();
                    const id = parseInt(req.url.split('/')[3]);
                    const {
                        naziv,
                        izdavac,
                        datum_izdavanja,
                        cijena,
                        zanr
                    } = JSON.parse(body);
                    updateIgrica(id, naziv, izdavac, datum_izdavanja, cijena, zanr)
                        .then(() => {
                            // res.writeHead(200, { 'Content-Type': 'text/plain' });
                            // res.end('Igra uspješno ažurirana');
                            res.writeHead(201, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ message: 'Podaci uspješno spremljeni.' }));
                        })
                        .catch(error => {
                            console.error('Greška prilikom ažuriranja igre:', error);
                            res.writeHead(500, { 'Content-Type': 'text/plain' });
                            res.end('Greška prilikom ažuriranja igre');
                        });
                });
            }
        } else if (path === '/api/zanrovi' && req.method === 'GET') {
            // Ovdje dohvatite žanrove i pošaljite ih kao odgovor
            dohvatiZanrove()
                .then(zanrovi => {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(zanrovi));
                })
                .catch(error => {
                    console.error('Greška prilikom dohvaćanja žanrova:', error);
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Greška prilikom dohvaćanja žanrova');
                });
        }
    }
});

// Pokretanje servera
const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});