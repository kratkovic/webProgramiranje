const http = require('http');
const url = require('url');

// Simulirani podaci (umjesto baze podataka)
let articles = [
    { id: 1, naziv: 'Artikl 1', cijena: 10 },
    { id: 2, naziv: 'Artikl 2', cijena: 20 },
    { id: 3, naziv: 'Artikl 3', cijena: 30 }
];

// Kreiranje HTTP servera
const server = http.createServer((req, res) => {
    const dijeloviURLa = url.parse(req.url, true);
    const path = dijeloviURLa.pathname;

    // Provjera putanje
    if (path === '/api/artikl' || path.startsWith('/api/artikl/')) {
        // Metoda GET za dohvaćanje svih artikala
        if (req.method === 'GET' && path === '/api/artikl') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(articles));
        }
        // Metoda GET za dohvaćanje pojedinačnog artikla po ID-u
        else if (req.method === 'GET' && path.startsWith('/api/artikl/')) {
            const id = parseInt(path.split('/')[3]);
            const article = articles.find(article => article.id === id);
            if (!article) {
                res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end('Artikl nije pronađen.');
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(article));
            }
        }
        // Metoda POST za dodavanje novog artikla
        else if (req.method === 'POST' && path === '/api/artikl') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString(); // Konvertiraj buffer u string
            });
            req.on('end', () => {
                try {
                    const parsedBody = JSON.parse(body);
                    articles.push(parsedBody);
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Podaci uspješno primljeni.' }));
                } catch (error) {
                    console.error('Greška pri parsiranju podataka:', error);
                    res.writeHead(400, { 'Content-Type': 'text/plain' });
                    res.end('Greška pri parsiranju podataka.');
                }
            });
        }
        else if (req.method === 'PUT' && path.startsWith('/api/artikl/')) {
            const id = parseInt(path.split('/')[3]);
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString(); // Konvertiraj buffer u string
            });
            req.on('end', () => {
                try {
                    const parsedBody = JSON.parse(body);
                    const index = articles.findIndex(article => article.id === id);
                    if (index === -1) {
                        res.writeHead(404);
                        res.end('Artikl nije pronađen.');
                    } else {
                        articles[index] = parsedBody;
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify(parsedBody));
                    }
                } catch (error) {
                    console.error('Greška pri parsiranju podataka:', error);
                    res.writeHead(400, { 'Content-Type': 'text/plain' });
                    res.end('Greška pri parsiranju podataka.');
                }
            });
        }
        // Ostale metode nisu implementirane
        else {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('Metoda nije još implementirana.');
        }
    }
    // Putanja nije pronađena
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Putanja nije pronađena.');
    }
});

// Pokretanje servera
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
