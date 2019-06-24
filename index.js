const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json');

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if (message.content === '!ping') {
		message.channel.send('Pong.');
	}
});

client.login(config.token);