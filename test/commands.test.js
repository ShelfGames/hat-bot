const commands = require('../src/commands');

test ('Test helpcmd is correct for valid command', () => {
    expect(commands.helpcmd.test("!hat help"));
});

test ('Test helpcmd is correct for invalid command', () => {
    expect(commands.helpcmd.test("!hat invalid"));
});