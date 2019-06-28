const Discord = require('discord.js');
const client = new Discord.Client();

const axios = require('axios');
const Promise = require('bluebird');

const StateMachine = require('./StateMachine/StateMachine');
const { generateResponse } = require('./ResponseGenerator/ResponseGenerator');
const { placeHat, downloadImage } = require('./ImageManipulation/ImageManipulator');
const { detectFaces } = require('./FaceRecognition/FaceRecognition');

const config = require('../config.json');

/* ============ Discord bot events ========= */

client.once('ready', () => {
	console.log('Ready!');
});

// Keeps the bot from talking while debugging
var SILENT = true;

client.on('message', message => {
	/// Put the users message through a statemachine
	StateMachine.parseMessage(message)
	// downloadImage
	.then ((stateMachineResponse) => {
		if (stateMachineResponse == null) throw null;
		return Promise.props ({ stateMachineResponse: stateMachineResponse, 
								imagePath: downloadImage(stateMachineResponse.imageURL) });
	})
	/// Find where the faces are
	.then((result) => {
		if (result == null) throw null;
		return Promise.props( { stateMachineResponse: result.stateMachineResponse, 
								hatPath: result.imagePath,
								faceData: detectFaces(result.imagePath) } );
	})
	/// Place the hat on the heads
	.then((result) => {
		if (result == null) throw null;
		return Promise.props( { stateMachineResponse: result.stateMachineResponse,
								hatPath: result.hatPath,
								hatPath: placeHat(result.hatPath, result.faceData) } );
	})
	/// Send the image back
	.then((result) => { 
		message.channel.sendFile(result.hatPath);
		throw null;
	})
	/// Respond with extra stuff
	.then((response) => {
		if (response && !SILENT) {
			message.channel.send(response);
		}
	})
	// catch errors
	.catch((error) => {
		if (!SILENT && error !== null) {
			console.log(error);
			message.channel.send("Ooops there was some sort of error! :(");
		}
	});

});

client.login(config.token);