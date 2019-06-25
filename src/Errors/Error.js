function nonFiniteStateMachine () {
    return new HatError(0, "The state machine is not finite, so  there's a open path")
}

class HatError extends Error {
    constructor(id, reason) {
        this.id = id;
        this.reason = reason;     
    }
}

module.exports = {
    nonFiniteStateMachine
}