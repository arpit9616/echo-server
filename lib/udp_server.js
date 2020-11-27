if (!global.CONSTANTS) global.CONSTANTS = require(__dirname + "/constants.js");

const udp = require("dgram");

const initUDPServer = () => {

    const conf = require(`${CONSTANTS.CONFDIR}/server.json`);
    if (!conf.udp) { console.error("Error in UDP configuration."); process.exit(1); } if (!conf.udp.host) conf.udp.host = "::";
    if (!conf.udp.version || !CONSTANTS.UDP_VERSIONS.includes(conf.udp.version)) conf.udp.version = _getVersion(conf.udp);

    const server = udp.createSocket(conf.udp.version);

    server.on("close", () => console.log("Socket is closed!"));
    server.on("error", (error) => console.error(error));

    server.on("message", (msg, rinfo) => {
        console.log(`Received ${msg.length} bytes from ${rinfo.address}:${rinfo.port}`);
        console.log(`Data received from client: ${msg.toString()}`);
        server.send(msg, rinfo.port, rinfo.address, (error) => (error) ? console.error(error) : null);
    });

    server.on("listening", () => {
        const address = server.address();
        console.log(`[UDP][${address.family}] Server listening at ${address.address}:${address.port}`);
    });

    server.bind(conf.udp.port, conf.udp.host);
}

const _getVersion = (udpConf) => (udpConf.host.indexOf(":") == -1) ? CONSTANTS.UDP_VERSIONS[0] : CONSTANTS.UDP_VERSIONS[1];

module.exports = { initUDPServer };

// Support direct execution
if (require.main == module) initUDPServer();
