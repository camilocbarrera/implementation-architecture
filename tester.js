const express = require('express');
const { Server } = require('ws');
const usuariosClient = require('./business_modules_client/usuariosClient');
const PORT = 4001;
const INDEX = '/index.html';


const server = express()
    .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new Server({ server });
var uId = 0;
wss.on('connection', (ws) => {
    console.log('connected');
    ws.on("message", function (msg) {
        console.log(msg)
    });
    ws.on('close', () => {
    });
});