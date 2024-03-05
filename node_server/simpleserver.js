const http = require('http');
// Kreiranje HTTP servera
const server = http.createServer((req, res) => {
console.log(`Zaprimljen HTTP zahtijev!`);
res.end('Pozdrav svijete!');
});
// Pokretanje servera
const PORT = 3000;
server.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});