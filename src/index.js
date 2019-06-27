const Discord = require('discord.js');
const client = new Discord.Client();

const axios = require('axios');
const Promise = require('bluebird');

const StateMachine = require('./StateMachine/StateMachine');
const { generateResponse } = require('./ResponseGenerator/ResponseGenerator');

const config = require('../config.json');

/* ============ Discord bot events ========= */

client.once('ready', () => {
	console.log('Ready!');
});

// Keeps the bot from talking while debugging
var SILENT = false;

client.on('message', message => {

	/// Put the users message through a statemachine
	StateMachine.parseMessage(message)
	.then ((stateMachineResponse) => {
		if (stateMachineResponse != null) {
			if (stateMachineResponse.type === "image") {
				return Promise.props({ stateMachineResponse: stateMachineResponse, image: axios.get(stateMachineResponse.imageURL)});
			}
			else {
				return Promise.props({ stateMachineResponse: stateMachineResponse, image: null});
			}
		}
		else {
			throw null;
		}
	})
	
	.then((result) => generateResponse(result.stateMachineResponse, result.image))
	.then((response) => {
		if (response && !SILENT) {
			message.channel.send(response);
		}
	})
	.catch((error) => {
		if (!SILENT && error !== null) {
			console.log(error);
			message.channel.send("Ooops there was some sort of error! :(");
		}
	});

});

client.login(config.token);