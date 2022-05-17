const express = require('express');
const { Server } = require('ws');

const PORT = 3000;
const INDEX = 'index.html';

var usuarios= []
var cuentas= []
var operaciones= []
var consolidacion= []

const server = express()
    .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new Server({ server });
var uId = 0;
wss.on('connection', (ws) => {
    ws.emit("1");
    ws.on("message", function (msg) {
        console.log(msg)
    });
    ws.on('close', () => {
    });
});