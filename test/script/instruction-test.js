QUnit.test('instruction new', function (assert) {
  var instruction = new Instruction('q0,0,1,R,q1');
  assert.ok(instruction.state === 'q0');
  assert.ok(instruction.newState === 'q1');
  assert.ok(instruction.value === '0');
  assert.ok(instruction.newValue === '1');
  assert.ok(instruction.action === 'R');
});

QUnit.test('instruction invalid new', function (assert) {
  try {
    var instruction = new Instruction('q0,0,1,C,q1');
  } catch (e) {
    assert.ok(e === 'Invalid instruction: q0,0,1,C,q1');
  }
});

QUnit.test('table', function (assert) {
  var instructions = table('q0,0,1,R,q1\n'
      + 'q1,0,1,R,q2\n'
      + '\n');

  assert.ok(instructions.length === 2);

  assert.ok(instructions[0].state === 'q0');
  assert.ok(instructions[0].newState === 'q1');
  assert.ok(instructions[0].value === '0');
  assert.ok(instructions[0].newValue === '1');
  assert.ok(instructions[0].action === 'R');

  assert.ok(instructions[1].state === 'q1');
  assert.ok(instructions[1].newState === 'q2');
  assert.ok(instructions[1].value === '0');
  assert.ok(instructions[1].newValue === '1');
  assert.ok(instructions[1].action === 'R');
});
