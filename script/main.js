var mt = null;
var halt = false;

/**
 * Clear all log.
 */
function clearLog() {
  document.getElementById("log").innerHTML = '';
}

function print(str) {
  var log = document.getElementById("log");
  log.innerHTML += str;
  log.scrollTop = log.scrollHeight;
}

function printError(error) {
  print('<span style="color: red;">' + escapeHtml(error) + '</span><br/>');
}

function printMessage(message) {
  print(escapeHtml(message) + '<br/>');
}

function printHaltMessage(message) {
  print('<br/>' + escapeHtml(message) + '<br/>');
}

function printTell(array) {
  print(escapeHtml(array[0]));
}

function printInstruction(instruction) {
  print('    ->    ' + escapeHtml(instruction.toString()) + '<br/>');
}

/**
 * Use preset table and tape.
 */
function preset() {
  document.getElementById("table").value = '' +
      'q0,1,1,R,q0\n' +
      'q0,0,0,R,q1\n' +
      'q1,1,0,R,q2\n' +
      'q1,0,0,R,q1\n';
  document.getElementById("tape").value = '110111';
  reset();
}

function reset() {
  clearLog();

  var table = document.getElementById("table").value;
  var tape = document.getElementById("tape").value;
  try {
    mt = new TuringMachine(table, tape);
    halt = false;
    updateTapeCellValues();
    printMessage('New Turing Machine');
    printTell(mt.tell());
  } catch (error) {
    printError(error);
  }
}

function step() {
  if (mt == null) {
    reset();
  }

  if (mt == null) {
    return 0;
  }

  if (!halt) {
    var result = mt.step();
    updateTapeCellValues();
    if (result instanceof Instruction) {
      printInstruction(result);
      printTell(mt.tell());
      return 1;
    } else {
      printHaltMessage(result);
      halt = true;
      return 0;
    }
  } else {
    printMessage("The Turing Machine has halted");
    return 0;
  }
}

var tapeRowWidth = -1;

function onLoad() {
  updateTapeCells();
}

function onResize() {
  updateTapeCells();
}

function cellCount(tapeRowWidth) {
  var count = Math.max(1, Math.floor((tapeRowWidth - 10) / 50));
  if (count % 2 === 0) {
    return count - 1;
  } else {
    return count;
  }
}

function updateTapeCells() {
  var row = document.getElementById('tape_row1');
  var oldTapeRowWidth = tapeRowWidth;
  tapeRowWidth = row.clientWidth;

  if (tapeRowWidth !== oldTapeRowWidth) {
    // Remove all children
    while (row.firstChild) {
      row.removeChild(row.firstChild);
    }

    // Add children to fit row width
    for (var i = 0, len = cellCount(tapeRowWidth); i < len; i++) {
      var cell = document.createElement('div');
      cell.className = "tape_cell";
      row.appendChild(cell);
    }
  }

  updateTapeCellValues();
}

function updateTapeCellValues() {
  var children = document.getElementById('tape_row1').children;
  var len = children.length;

  if (mt) {
    for (var offset = 0, center = Math.floor(len / 2); offset <= center; offset++) {
      children[center + offset].innerHTML = mt.tape.readForDisplay(offset);
      children[center - offset].innerHTML = mt.tape.readForDisplay(-offset);
    }

    document.getElementById('tape_state').innerHTML = mt.state;
    var instruction = mt.nextInstruction();
    document.getElementById('tape_instruction').innerHTML = instruction === null ? '' : instruction.toString();
  } else {
    // Clear all cells
    for (var i = 1; i < len; i++) {
      children[i].innerHTML = '';
    }

    document.getElementById('tape_state').innerHTML = '';
    document.getElementById('tape_instruction').innerHTML = '';
  }
}
