const router = require('./lib/router');

module.exports = (client, config, commandsPath) => router(client, config, commandsPath);
