function nonFiniteStateMachine () {
    return new HatError(0, "The state machine is not finite, so  there's a open path");
}

function noHat() {
    return new HatError(1, "I need a hat to process");
}

function noResponseForStateMachineResponse (responseType) {
    return new HatError(2, "StateMachine.responseType does not have a response for `" + responseType + "`, please check this");
}

function invalidStatmachineResponseType (type) {
    return new HatError(3, "StateMachine response type `" + type + "` is not valid")
}

function noImageDownloaded () {
    return new HatError(4, "The image passed to the response generator was null or undefined");
}

function noFaces() {
    return new HatError(4, "No faces to process")
}

class HatError extends Error {
    constructor(id, reason) {
        super(reason);
        this.id = id;
        this.reason = reason;     
    }
}

module.exports = {
    noHat,
    nonFiniteStateMachine,
    noImageDownloaded,
    invalidStatmachineResponseType,
    noResponseForStateMachineResponse,
    noFaces,
}