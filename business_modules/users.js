const express = require('express');
const {Server} = require('ws');


const ports = [4001, 4002, 4003, 4004];

for ( let PORT of ports)
{
    const server = express()
        .use((req, res) => console.log(`¡Funciona Users! ${PORT}`))
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

