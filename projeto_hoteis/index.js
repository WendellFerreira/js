const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

const dataPath = './data.json';

app.get('/hoteis', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Erro ao ler o arquivo de dados.');
            return;
        }
        res.send(JSON.parse(data));
    });
});

app.get('/hoteis/:id', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Erro ao ler o arquivo de dados.');
            return;
        }
        const hoteis = JSON.parse(data);
        const hotel = hoteis.find(h => h.id == req.params.id);
        if (hotel) {
            res.send(hotel);
        } else {
            res.status(404).send('Hotel não encontrado.');
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});