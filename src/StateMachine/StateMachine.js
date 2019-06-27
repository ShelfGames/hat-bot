const Errors = require('../Errors/Error');

const Promise = require('bluebird');

const Commands = require('./commands');

/// Encaptulates the state machines response
var StateMachineResponse = class {

    constructor (type, responseType, imageURL) {
        this.type = type;
        this.responseType = responseType;
        this.imageURL = imageURL;
    }

    static textResponse(responseType) {
        return new StateMachineResponse('text', responseType, null);
    }

    static imageResponse(imageURL) {
        return new StateMachineResponse('image', 'hat', imageURL);
    }

};

/// Parses a discord message and returns a promise
function parseMessage (message) {
    
    // The actual user text
    let messageText = message.content; 
    // Gets the image url attachment
    let imageURL;

    // Send help message
    if (Commands.helpcmd.test(messageText)) {
        return Promise.resolve(StateMachineResponse.textResponse('help'));
    }
    else if (Commands.randomHatsCmd.test(messageText)) {
        // There's no image
        if (message.attachments.size < 0) {
            return Promise.reject(Errors.noHat());
        }

        // get the iamge url
        imageURL = message.attachments.array()[0].proxyURL;

        // Generate a random hat image
        if (Commands.randomHatsCmd.test(message)) {
            return Promise.resolve(StateMachineResponse.imageResponse(imageURL));
        }
    }
    else {
        return Promise.resolve(null);
    }

    // return Promise.reject(Errors.nonFiniteStateMachine());
}

module.exports = {
    parseMessage
};