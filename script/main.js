var mt = null;
var init = false;
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
}

function reset() {
  clearLog();

  var table = document.getElementById("table").value;
  var tape = document.getElementById("tape").value;
  try {
    mt = new TuringMachine(table, tape);
    init = true;
    halt = false;
    printMessage('New Turing Machine');
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
    if (init) {
      init = false;
      printTell(mt.tell());
    }

    var result = mt.step();
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

function run() {
  while (step() === 1);
}
