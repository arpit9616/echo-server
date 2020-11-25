global.CONSTANTS = require(__dirname + "/lib/constants.js");

const bootstrap = () => {

    const conf = require(`${CONSTANTS.CONFDIR}/server.json`);

    // Init TCP Echo Server
    if (conf.tcp) require(`${CONSTANTS.LIBDIR}/tcp_server.js`).initTCPServer();
    
    // Init UDP Echo Server
    if (conf.udp) require(`${CONSTANTS.LIBDIR}/udp_server.js`).initUDPServer();

};

module.exports = { bootstrap };

// support starting in stand-alone config
if (require("cluster").isMaster == true) bootstrap();	
