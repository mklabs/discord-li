# discord-li

Little routing framework for discord bots

---

## Usage

**Install**

    npm i @mklabs/discord-li
    
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

Then each command should live in its own file in `lib/commands`
    
## Thanks

- @eslachance for this [gist](https://gist.github.com/eslachance/3349734a98d30011bb202f47342601d3)
    
