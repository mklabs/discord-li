# discord-li

Little routing framework for discord bots

---

## Usage

**Install**

    git clone https://github.com/mklabs/discord-li.git
    cd discord-li
    # or yarn
    npm install
    touch lib/commands/say.js
    
**Usage**

```js
const Discord = require('discord.js');
const config  = require('./config.json');
const router  = require('./lib/router');

// Your client.
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

// This event triggers when the bot joins a guild.
client.on('guildCreate', guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

// this event triggers when the bot is removed from a guild.
client.on('guildDelete', guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on('message', router(client));
```

Then each command should live in its own file in `lib/commands`:

```js
// In lib/commands/ping.js
module.exports = async (client, message, command, args) => {
  // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
  // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
  const m = await message.channel.send('Ping?');
  m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
};
```

Each command function should take `(client, message, command, args) => {}`

Where:

- `client` is the discord client
- `message` is the original message
- `command` is the actual command (ex: ping)
- `args` are every arguments after the command as an array
    
## Thanks

- **[@eslachance](https://github.com/eslachance)** for [The Perfect Lil' Bot](https://gist.github.com/eslachance/3349734a98d30011bb202f47342601d3)
    
