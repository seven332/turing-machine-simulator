/**
 * 'q0,1,0,R,q0'
 * If current state is q1 and current cell value is 1, then
 * modify current cell value to 0, right shift and change state to q2.
 *
 * @param line
 * @constructor
 */
function Instruction(line) {
  var pattern = /(q\d+),([01B]),([01B]),([RLN]),(q\d+)/i;
  var match = pattern.exec(line);

  if (match !== null) {
    this.state = match[1];
    this.value = match[2];
    this.newValue = match[3];
    this.action = match[4];
    this.newState = match[5];
  } else {
    throw 'Invalid instruction: ' + line;
  }
}

Instruction.prototype.toString = function () {
  return this.state + ',' + this.value + ',' + this.newValue + ',' + this.action + ',' + this.newState;
};

/**
 * Parses a paragraph to an array of instruction.
 */
function table(paragraph) {
  var instructions = [];
  var lines = paragraph.split('\n');
  for (var i = 0, len = lines.length; i < len; i++) {
    var line = lines[i].trim();
    if (line.length > 0) {
      instructions.push(new Instruction(line));
    }
  }
  return instructions;
}
