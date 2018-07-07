const fs   = require('fs');
const path = require('path');

const commands = module.exports;

// This is an holder to wherever the user decides to store commands to execute
let internalPath;

commands.findCommands = (commandsPath) => {
  // If a commandsPath is given, update our internalPath here
  if (commandsPath) internalPath = commandsPath;

  // Here, we go through each file in lib/commands
  const internalCommands = fs.readdirSync(__dirname)
    .filter(file => {
      return path.basename(file, '.js') !== 'index';
    })
    .map(filepath => path.join(__dirname, filepath))

  const userCommands = internalPath ?
    // If internalPath is set, return the list of commands
    fs.readdirSync(internalPath).map(filepath => path.join(internalPath, filepath)) :
    // If it's not set, just return an empty array
    [];

  return internalCommands.concat(userCommands);
};

// getter / setter
commands.setPath = (commandsPath) => {
  if (!commandsPath) {
    if (!internalPath) throw new Error('Internal path not set yet. Please provide one.');
    return internalPath;
  }

  // a commandsPath has been passed in, update internalPath with it.
  internalPath = commandsPath;
};
