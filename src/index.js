const Discord = require('discord.js');
const client = new Discord.Client();

const StateMachine = require('./StateMachine/StateMachine');

const config = require('../config.json');

/* ============ Discord bot events ========= */

client.once('ready', () => {
	console.log('Ready!');
});

// Keeps the bot from talking while debugging
var SILENT = true;

client.on('message', message => {

	StateMachine.parseMessage(message).then((response) => {
		if (response != null && !SILENT) {
			message.channel.send(response);
		}
	})
	.catch((error) => {
		console.log(error);
		message.channel.send("Ooops there was some sort of error! :(");
	});

});

client.login(config.token);