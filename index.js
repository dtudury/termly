//https://github.com/hij1nx/cdir/blob/master/cdir.js#L26
//http://tldp.org/HOWTO/Bash-Prompt-HOWTO/x361.html
//http://ascii-table.com/ansi-escape-sequences-vt-100.php
//
//Position the Cursor: \033[<L>;<C>H or \033[<L>;<C>f (puts the cursor at line L and column C)


exports.dispatcher = require('./lib/sharedDispatcher');
exports.events = require('./lib/events');
exports.terminal = require('./lib/terminal');
exports.lineEditor = require('./lib/messageEditor');
exports.ansi = require('./lib/ansi');


exports.init = function init() {
    if (!process.stdout.isTTY) {
        throw new Error("termly is tty only");
    }
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
}

exports.blankTerminal = exports.terminal.blank;
exports.getCursorPosition = exports.terminal.getCursorPosition;

