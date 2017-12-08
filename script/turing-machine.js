/**
 * A new TuringMachine.
 *
 * @constructor
 */
function TuringMachine(tableStr, tapeStr) {
  this.state = 'q0';
  this.table = table(tableStr);
  this.tape = new Tape(tapeStr);
}

/**
 * Returns a string representing the TuringMachine state.
 *
 * First one is the state string.
 * Second one is the start index of machine state.
 * Third one is the end index of machine state.
 *
 * @returns {*[]}
 */
TuringMachine.prototype.tell = function () {
  return this.tape.tell(this.state);
};

/**
 * Does one step on this TuringMachine.
 *
 * Returns the applied instruction,
 * or returns a message about why it shuts down.
 *
 * @returns {*}
 */
TuringMachine.prototype.step = function () {
  var cell = this.tape.read();

  for (var i = 0, len = this.table.length; i < len; i++) {
    var instruction = this.table[i];
    if (instruction.state === this.state && instruction.value === cell) {
      this.state = instruction.newState;
      this.tape.write(instruction.newValue);
      switch (instruction.action) {
        case "L":
          this.tape.left();
          break;
        case "R":
          this.tape.right();
          break;
      }
      return instruction;
    }
  }

  return "No instruction matches. Halt";
};

/**
 * Returns next instruction for this turing machine.
 *
 * @returns {*}
 */
TuringMachine.prototype.nextInstruction = function () {
  var cell = this.tape.read();

  for (var i = 0, len = this.table.length; i < len; i++) {
    var instruction = this.table[i];
    if (instruction.state === this.state && instruction.value === cell) {
      return instruction;
    }
  }
  return null;
};
