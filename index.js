const express = require('express');
const { Server } = require('ws');
const usuariosClient = require('./business_modules_client/usuariosClient');
const accountsClient = require('./business_modules_client/accountsClient');
const operationsClient = require('./business_modules_client/operationsClient');
const consolidationClient = require('./business_modules_client/consolidationClient');
const PORT = 3000;
const INDEX = '/index.html';

var usuarios = []
var cuentas = []
var operaciones = []
var consolidacion = []

const server = express()
    .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new Server({ server });
wss.on('connection', (ws) => {
    ws.emit("1");
    ws.on("message", function (msg) {
        console.log(msg)
    });
    ws.on('close', () => {
    });
});


function notify(service, event, port) {
    console.log('not')
    wss.clients.forEach(x => {
        console.log('not')
        x.emit('{"service":' + service + ',"state":' + event + ',"port":' + port + '}');
    });
}

usuariosClient.notify = notify;
usuariosClient.bind();

accountsClient.notify = notify;
accountsClient.bind();

operationsClient.notify = notify;
operationsClient.bind();

consolidationClient.notify = notify;
consolidationClient.bind();







