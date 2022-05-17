var WebSocketClient = require('websocket').client;

const host = 'localhost';

var aviablePorts = [5001, 5002, 5003, 5004];
var connectedPorts = [];
var service =  "account";
module.exports = {
    bind: function bind() {
        console.log(aviablePorts.length);
        setInterval(() => {
            if (aviablePorts.length > 0) {
                var x = aviablePorts.shift();
                console.log("reading" + x);
                try {
                    var client = new WebSocketClient();

                    client.on('connectFailed', function (error) {
                        console.log(x + ' Connect Error: ' + error.toString());
                        aviablePorts.push(x);
                        module.exports.notify(service, 'disconnect', client.port);
                    });

                    client.on('connect', function (connection) {
                        console.log('WebSocket Client Connected');
                        module.exports.notify(service, 'connected', client.port);
                        connectedPorts.push(x);

                        connection.on('error', function (error) {
                            console.log("Connection Error: " + error.toString());
                            aviablePorts.push(x);
                            module.exports.notify(service, 'disconnect', client.port);
                        });

                        connection.on('close', function () {
                            console.log('echo-protocol Connection Closed');
                            aviablePorts.push(x);
                            module.exports.notify(service, 'disconnect', client.port);
                        });
                    });

                    client.connect('ws://localhost:' + x + '/');
                } catch {
                    console.log('c')
                    module.exports.notify(service, 'disconnect', client.port);
                }
            }
        }, 1000);
            
        

    },
    notify: function () { }
}