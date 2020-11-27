if (!global.CONSTANTS) global.CONSTANTS = require(__dirname + "/constants.js");

const net = require("net");

const initTCPServer = () => {

    const conf = require(`${CONSTANTS.CONFDIR}/server.json`);
    if (!conf.tcp) { console.error("Error in TCP configuration."); process.exit(1); }
    if (!conf.tcp.host) conf.tcp.host = "::";

    const server = net.createServer((socket) => {
        socket.on("data", (data) => {
            console.log(`Received ${data.length} bytes from ${socket.remoteAddress}:${socket.remotePort}`);
            console.log(`Data received from client: ${data.toString()}`);
            socket.write(data, (error) => (error) ? console.error(error) : null);
        })
    });

    server.on("close", () => console.log("Server is closed!"));
    server.on("error", (error) => console.error(error));

    server.listen(conf.tcp.port, conf.tcp.host, () => {
        const address = server.address();
        console.log(`[TCP][${address.family}] Server listening at ${address.address}:${address.port}`);
    });
}

module.exports = { initTCPServer };

// Support direct execution
if (require.main == module) initTCPServer();
