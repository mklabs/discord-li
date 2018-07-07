// Again, thanks to [The Perfect Lil' Bot](https://gist.github.com/eslachance/3349734a98d30011bb202f47342601d3)
module.exports = async (client, message, command, args) => {
  // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
  // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
  const m = await message.channel.send('Ping?');
  m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
};
