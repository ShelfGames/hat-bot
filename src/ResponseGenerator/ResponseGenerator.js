const Errors = require('../Errors/Error');
const Promise = require('bluebird');

/// The bots help response
const helpText = "```Upload a photograph including the word 'hat' or 'hats' in the comment. A random hat will be added to each person detected.```";

function generateResponse (statemachineResponse, image) {
    return new Promise((resolve, reject) => {
        if (statemachineResponse.type === "text") {
            if (statemachineResponse.responseType === "help") {
                resolve(helpText);
            }
            else {
                reject(Errors.noResponseForStateMachineResponse(statemachineResponse.responseType));
            }
        }
        else if (statemachineResponse.type === "image") {
            if (image) {
                resolve("Processing image");
            }
            else {
                reject(Errors.noImageDownloaded());
            }
        }
        else {
            reject(Errors.invalidStatmachineResponseType(tatemachineResponse.type));
        }
    });
}   

module.exports = {
    generateResponse
}