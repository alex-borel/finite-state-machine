class FSM {

    constructor(config) {
        if (!!config) {
            this.config = config;
            this.currentState = config.initial;
            this.history = [];
            this.undoHistory = [];
        } else {
            throw new Error("Config isn't passed");
        }
    }

    getState() {
        return this.currentState;
    }

    changeState(state) {
        if (this.config.states.hasOwnProperty(state)) {
            this.history.push(this.currentState);
            this.undoHistory = [];
            this.currentState = state;
        } else {
            throw new Error("State isn't exist");
        }
    }

    trigger(event) {
        if (this.config.states[this.currentState].transitions.hasOwnProperty(event)) {
            this.history.push(this.currentState);
            this.undoHistory = [];
            this.currentState = this.config.states[this.currentState].transitions[event];
        } else {
            throw new Error("Event isn't exist");
        }
    }

    reset() {
        this.currentState = this.config.initial;
        this.history = [];
    }

    getStates(event) {
        this.states = [];
        if (!event) {
            for (var key in this.config.states) {
                this.states.push(key);
            }
            return this.states;
        }
        
        for (var key in this.config.states) {
            if (this.config.states[key].transitions.hasOwnProperty(event)) {
                this.states.push(key);
            }

        }
        return this.states;
    }

    undo() {
        if (this.history.length === 0) {
            return false;
        } else {
            this.undoHistory.push(this.currentState);
            this.currentState = this.history.pop();
            return true;
        }
    }

    redo() {
        if (this.undoHistory.length === 0) {
            return false;
        } else {
            this.history.push(this.currentState);
            this.currentState = this.undoHistory.pop();
            return true;
        }
    }

    clearHistory() {
        this.history = [];
        this.undoHistory = [];
    }
}

module.exports = FSM;
