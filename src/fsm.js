class FSM {

    constructor(config) {
        if (config) {
            this.config = config;
            this.initial = config.initial;
            this.conditions = [this.initial];
        } else {
            throw new Error("Config isn't passed");
        }
    }

    getState() {
        return this.initial;
    }

    changeState(state) {
        if (this.config.states.hasOwnProperty(state)) {
            this.initial = state;
            this.conditions.push(this.initial);
        } else {
            throw new Error("State isn't exist");
        }
    }

    trigger(event) {
        if (this.config.states[this.initial].transitions.hasOwnProperty(event)) {
            this.initial = this.config.states[this.initial].transitions[event];
            this.conditions.push(this.initial);
        } else {
            throw new Error("Event isn't exist");
        }
    }

    reset() {
        this.initial = "normal";
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
        if (this.initial === this.conditions[0]) {
            return false;
        } else {
            this.initial = this.conditions[this.conditions.length - 2];
            return true;
        }
    }

    redo() {
        if (this.initial === this.conditions[0]) {
            return false;
        } else {
            this.initial = this.conditions[this.conditions.length - 1];
        }
    }

    clearHistory() {
        this.initial = this.conditions[0];
    }
}

module.exports = FSM;
