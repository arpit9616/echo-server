const path = require("path");
const rootdir = path.resolve(__dirname + "/../");

exports.ROOTDIR = rootdir;
exports.LIBDIR = rootdir + "/lib";
exports.CONFDIR = rootdir + "/conf";

exports.UDP_VERSIONS = ["udp4", "udp6"];
