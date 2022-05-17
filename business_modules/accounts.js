const express = require('express');
const { Server } = require('ws');


const ports = [5001, 5002, 5003, 5004];

for ( let PORT of ports)
{
    const server = express()
        .use((req, res) => console.log(`¡Funciona Accounts! ${PORT}`))
        .listen(PORT, () => console.log(`Listening on ${PORT}`));

    const wss = new Server({server});
    let uId = 0;
    wss.on('connection', (ws) => {
        ws.emit("1");
        ws.on("message", function (msg) {
            console.log(msg)
        });
        ws.on('close', () => {
        });
    });
}