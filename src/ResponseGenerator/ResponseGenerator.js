const Errors = require('../Errors/Error');
const Promise = require('bluebird');

/// The bots help response
const helpText = "```Here's some help```";

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