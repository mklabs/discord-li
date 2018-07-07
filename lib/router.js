const commands = require('./commands');
const config   = require('../config.json');

// Thanks to [The Perfect Lil' Bot](https://gist.github.com/eslachance/3349734a98d30011bb202f47342601d3)
module.exports = (client) => {
  return async (message) => {
    // This event will run on every single message received, from any channel or DM.

    // It's good practice to ignore other bots. This also makes your bot ignore itself
    // and not get into a spam loop (we call that 'botception').
    if(message.author.bot) return;

    // Also good practice to ignore any message that does not start with our prefix,
    // which is set in the configuration file.
    if(message.content.indexOf(config.prefix) !== 0) return;

    // Here we separate our 'command' name, and our 'arguments' for the command.
    // e.g. if we have the message '+say Is this the real life?' , we'll get the following:
    // command = say
    // args = ['Is', 'this', 'the', 'real', 'life?']
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // Now, find the good command to execute based on fist param
    const cmd = commands.find(cmdName => cmdName === command + '.js');
    if (!cmd) {
      const msg = `Sorry mate, no ${command} to execute ...`
      const m = await message.channel.send(msg);
      return m.edit(msg);
    }

    // Failsafe check on empty command
    if (!command) {
      const msg = `Sorry mate, no ${command} to execute ...`
      const m = await message.channel.send(msg);
      return m.edit(msg);
    }

    // We found a command, execute with (client, message, command, args)
    const commander = require('./commands/' + cmd);
    return commander(client, message, command, args);
  };
};
