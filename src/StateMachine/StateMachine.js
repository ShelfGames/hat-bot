const Errors = require('../Errors/Error');

const Promise = require('bluebird');
const Commands = require('./commands');

const helpText = "```Here's some help```";

/// Encaptulates the state machines response,
/// the type must either be "text" or "image"
var StateMachineResponse = class {
    constructor (type, response) {
        this.type = type;
        this.response = response;
    }
};

/// Parses a discord message and returns a promise
function parseMessage (message) {
    
    // The actual user text
    let messageText = message.contents; 
    // Gets the image url attachment
    let imageURL;

    // Send help message
    if (Commands.helpcmd.test(message)) {
        return Promise.resolve(helpText);
    }
    else {
        // There's no image
        if (message.attachments.size < 0) {
            return Promise.resolve("I need an image to put a hat on");
        }

        imageURL = message.attachments.get(Object.keys(message[0]));

        // Generate a random hat image
        if (Commands.randomHatsCmd.test(message)) {
            Promise.resolve("Displaying random hat");
        }
    }

    return Promise.reject(Errors.nonFiniteStateMachine());
}

module.exports = {
    parseMessage
};
