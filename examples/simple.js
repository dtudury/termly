var termly = require('../index');
var dispatcher = require('../lib/sharedDispatcher');//termly.dispatcher;
var terminal = require('../lib/terminal');//termly.terminal;
var ansi = require('../lib/ansi');//termly.ansi;
var events = require('../lib/events');//termly.events;
var buffer = require('../lib/buffer');//termly.buffer;

var bottom = terminal.rows - 1;
var top = bottom;
var cursor = 0;
var x = 0;
var y = 0;
var message = "";
var miniBuffer = [];

termly.init();
termly.dispatcher.on(termly.ansi.keys.CTRL_C, function () {
    terminal.moveTo(1, termly.terminal.columns);
    terminal.scrollUpOne();
    process.exit();
});
terminal.blank();

dispatcher.on(ansi.keys.LEFT, left);
dispatcher.on(ansi.keys.RIGHT, right);
dispatcher.on(ansi.keys.UP, up);
dispatcher.on(ansi.keys.DOWN, down);
dispatcher.on(ansi.keys.SPACE, append);
dispatcher.on(ansi.keys.BACKSPACE, backspace);
dispatcher.on(ansi.keys.DEL, del);
dispatcher.on(events.terminal.NORMAL_KEY, append);
redraw();

function left() {
    cursor--;
    updateCursor();
}
function right() {
    cursor++;
    updateCursor();
}
function down() {
    cursor += miniBuffer[y].length;
    updateCursor();
}
function up() {
    if(y > 0) {
        cursor -= miniBuffer[y - 1].length;
    } else {
        cursor -= miniBuffer[y].length;
    }
    updateCursor();
}
function append(data) {
    message = message.substring(0, cursor) + data + message.substring(cursor);
    cursor += data.length;
    redraw();
}
function backspace() {
    message = message.substring(0, cursor - 1) + message.substring(cursor);
    cursor--;
    redraw();
}
function del() {
    message = message.substring(0, cursor) + message.substring(cursor + 1);
    redraw();
}


function redraw() {
    miniBuffer = [];
    var messageCopy = message.slice();
    while(messageCopy.length) {
        miniBuffer.push(messageCopy.substring(0, terminal.columns));
        messageCopy = messageCopy.substring(terminal.columns);
    }
    var lastLine = miniBuffer[miniBuffer.length - 1];
    if(!lastLine || lastLine.length === terminal.columns) {
        miniBuffer.push("");
    }
    top = bottom - (miniBuffer.length - 1);
    for(var y = 0; y < miniBuffer.length; y++) {
        buffer.setLine(y + top, miniBuffer[y]);
    }
    buffer.draw();
    updateCursor();
}

function updateCursor() {
    cursor = Math.max(0, Math.min(message.length, cursor));
    x = cursor;
    y = 0;
    for(y = 0; y < miniBuffer.length && x > miniBuffer[y].length; y++) {
        x -= miniBuffer[y].length;
    }
    if(x === terminal.columns) {
        y++;
        x = 0;
    }
    terminal.moveTo(x + 1, top + y + 1);
}
