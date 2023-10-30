const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const MONGO_URI = "mongodb+srv://mcampagnoli:carminha@cluster0.rg6ulqh.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp";
const STATIC_PATH = path.join(__dirname, 'public', 'static', 'images');

let db;

MongoClient.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados', err);
        return;
    }
    db = client.db('Unimapper');
    console.log('Conexão com o banco de dados estabelecida');
});

app.get('/', (req, res) => {
    let user_id = req.cookies.user_id;
    if (!user_id) {
        user_id = uuid.v4();
        res.cookie('user_id', user_id, { maxAge: 365 * 24 * 60 * 60 * 1000 }); // Define o cookie por 1 ano
    }
    res.sendFile(path.join(__dirname, 'public', 'mapa1.html'));
});


app.post('/get_image', (req, res) => {
    const { choice1, choice2 } = req.body;

    storeUserChoices(req.cookies.user_id, choice1, choice2);

    const image_path = determineImagePath(choice1, choice2);
    res.json({ image_path: image_path });
});

function storeUserChoices(user_id, choice1, choice2) {
    const current_time = new Date().toLocaleString();

    db.collection('historico').insertOne({
        user_id: user_id,
        choice1: choice1,
        choice2: choice2,
        timestamp: current_time
    }, (err, result) => {
        if (err) {
            console.error('Erro ao inserir escolhas do usuário:', err);
        }
    });
}

function determineImagePath(choice1, choice2) {
    const filename = `${choice1}-${choice2}.png`;
    return path.join(STATIC_PATH, filename);
}
app.listen(PORT, () => {
    console.log(`Servidor Node.js iniciado na porta ${PORT}`);
});
