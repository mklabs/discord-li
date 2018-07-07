const fs   = require('fs');
const path = require('path');

// Here, we go through each file in lib/commands
// TODO: pass in parameters to use as a real library
const commands = fs.readdirSync(__dirname).filter(file => {
  return path.basename(file, '.js') !== 'index';
});

module.exports = commands;
