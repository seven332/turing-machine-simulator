var DEFAULT_CELL_VALUE = '0';

/**
 * Create a Tape object for a sequence of '0' and '1'.
 *
 * @param sequence
 * @constructor
 */
function Tape(sequence) {
  this.array = [];
  this.head = 0;

  for (var i = 0, len = sequence.length; i < len; i++) {
    var value = sequence.charAt(i);
    if (value === '0' || value === '1') {
      this.array.push(value);
    } else {
      throw 'Unsupported value: ' + value;
    }
  }
}

/**
 * Left shift.
 */
Tape.prototype.left = function () {
  this.head -= 1;
  if (this.head < 0) {
    this.head = 0;
    throw 'Left shift out of range'
  }
};

/**
 * Right shift.
 */
Tape.prototype.right = function () {
  this.head += 1;
};

/**
 * Returns the value of the current cell.
 * Returns DEFAULT_CELL_VALUE if the cell has not been wrote.
 *
 * @returns {*}
 */
Tape.prototype.read = function () {
  if (this.head < this.array.length) {
    return this.array[this.head];
  } else {
    return DEFAULT_CELL_VALUE;
  }
};

/**
 * Writes value to the current cell.
 *
 * @param value
 */
Tape.prototype.write = function (value) {
  if (value !== '0' && value !== '1') {
    throw 'Unsupported value: ' + value;
  }

  if (this.head >= this.array.length) {
    // The value is still DEFAULT_CELL_VALUE, just end here
    if (value === DEFAULT_CELL_VALUE) {
      return
    }

    // Fill block with DEFAULT_CELL_VALUE
    var i = this.head - this.array.length + 1;
    while (i--) {
      this.array.push(DEFAULT_CELL_VALUE);
    }
  }

  this.array[this.head] = value;
};

/**
 * Returns a string representing the tape state.
 *
 * First one is the state string.
 * Second one is the start index of input state.
 * Third one is the end index of input state.
 *
 * @param state
 * @returns {*[]}
 */
Tape.prototype.tell = function (state) {
  if (this.head >= this.array.length) {
    // Fill block with DEFAULT_CELL_VALUE
    var i = this.head - this.array.length + 1;
    while (i--) {
      this.array.push(DEFAULT_CELL_VALUE);
    }
  }

  var array = [].concat(this.array);

  var insert = '(' + state + ')';
  array.splice(this.head, 0, insert);

  return [array.join(''), this.head, this.head + insert.length];
};
