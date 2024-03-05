const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const queryParams = parsedUrl.query;
    console.log('Zaprimljen HTTP zahtjev! Metoda:', req.method , 'Putanja:' + path);
    console.log('Ostalo: ', queryParams);
    res.end('Pozdrav Svima!');
});

// Pokretanje servera
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
