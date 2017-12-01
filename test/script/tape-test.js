QUnit.test('tape invalid char new', function (assert) {
  try {
    var tape = new Tape('010J0');
  } catch (e) {
    assert.ok(e === 'Unsupported value: J');
  }
});

QUnit.test('tape shift and read test', function (assert) {
  var tape = new Tape('01010');
  assert.ok(tape.read() === '0');
  tape.right();
  assert.ok(tape.read() === '1');
  tape.right();
  assert.ok(tape.read() === '0');
  tape.right();
  assert.ok(tape.read() === '1');
  tape.right();
  assert.ok(tape.read() === '0');
  tape.right();
  assert.ok(tape.read() === '0');
  tape.left();
  assert.ok(tape.read() === '0');
  tape.left();
  assert.ok(tape.read() === '1');
});

QUnit.test('tape left shift out of range', function (assert) {
  var tape = new Tape('01010');
  try {
    tape.left();
    assert.ok(false);
  } catch (e) {
    assert.ok(e === 'Left shift out of range');
  }
});

QUnit.test('tape write', function (assert) {
  var tape = new Tape('01');
  assert.ok(tape.read() === '0');
  tape.write('1');
  assert.ok(tape.read() === '1');
});

QUnit.test('tape write out of range', function (assert) {
  var tape = new Tape('01');
  tape.right();
  tape.right();
  tape.write('0');
  assert.ok(tape.read() === '0');
});

QUnit.test('tape write invalid char', function (assert) {
  var tape = new Tape('01');
  try {
    tape.write('J');
  } catch (e) {
    assert.ok(e === 'Unsupported value: J');
  }
});

function arrayEqulal(a, b) {
  if (a === b) {
    return true;
  }

  if (a === null && b === null) {
    return true;
  }

  if (a.length !== b.length) {
    return false;
  }

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) {
      return false;
    }
  }

  return true;
}

QUnit.test('tape tell', function (assert) {
  var tape = new Tape('01');
  assert.ok(arrayEqulal(tape.tell('q0'), ['(q0)01', 0, 4]));
  tape.right();
  assert.ok(arrayEqulal(tape.tell('q0'), ['0(q0)1', 1, 5]));
  tape.right();
  assert.ok(arrayEqulal(tape.tell('q0'), ['01(q0)0', 2, 6]));
});
