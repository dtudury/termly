var termly = require('../index');
var dispatcher = require('../lib/sharedDispatcher');//termly.dispatcher;
var terminal = require('../lib/terminal');//termly.terminal;
var ansi = require('../lib/ansi');//termly.ansi;
var events = require('../lib/events');//termly.events;
var buffer = require('../lib/buffer');//termly.buffer;

var cursor = 0;
var x = 0;
var y = 0;
var miniBuffers = [new buffer.miniBuffer()];

termly.init();
termly.dispatcher.on(termly.ansi.CTRL_C, function () {
    terminal.moveTo(1, termly.terminal.columns);
    terminal.scrollUpOne();
    process.exit();
});
terminal.blank();

dispatcher.on(ansi.LEFT, left);
dispatcher.on(ansi.RIGHT, right);
dispatcher.on(ansi.UP, up);
dispatcher.on(ansi.DOWN, down);
dispatcher.on(ansi.SPACE, append);
dispatcher.on(ansi.BACKSPACE, backspace);
dispatcher.on(ansi.ENTER, enter);
dispatcher.on(ansi.DEL, del);
dispatcher.on(events.terminal.NORMAL_KEY, append);
dispatcher.on(events.terminal.RESIZE, handleResize);
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
    cursor += miniBuffers[0].lines[y].length;
    updateCursor();
}
function up() {
    cursor -= miniBuffers[0].lines[Math.max(0, y - 1)].length;
    updateCursor();
}
function append(data) {
    miniBuffers[0].spliceMessage(cursor, 0, [data]);
    cursor += data.length;
    redraw();
}
function backspace() {
    miniBuffers[0].spliceMessage(cursor - 1, 1);
    cursor--;
    redraw();
}
function del() {
    miniBuffers[0].spliceMessage(cursor, 1);
    redraw();
}
function enter() {
    var color = ansi.setBackground(Math.floor(Math.random() * 8));
    var label = "me: ".split("");
    label[0] = ansi.setBackground(ansi.CYAN) + label[0];
    label[label.length - 1] = label[label.length - 1] + ansi.resetFont;
    miniBuffers[0].spliceMessage(0, 0, label);
    miniBuffers.unshift(new buffer.miniBuffer());
    redraw();
}

function handleResize() {
    redraw(true);
}

function redraw(force) {
    buffer.clear();
    var bottomSoFar = terminal.rows - 1;
    for(var i = 0; i < miniBuffers.length && bottomSoFar > 0; i++) {
        miniBuffers[i].bottom(bottomSoFar);
        miniBuffers[i].render();
        bottomSoFar = miniBuffers[i].top() - 1;
    }
//    buffer.writeAt(1, 1, "size: " + terminal.columns + "x" + terminal.rows);
    buffer.draw(force);
    updateCursor();
}

function updateCursor() {
    var lines = miniBuffers[0].lines;
    cursor = Math.max(0, Math.min(miniBuffers[0].messageLength(), cursor));
    x = cursor;
    for(y = 0; y < lines.length && (x > lines[y].length || x === terminal.columns); y++) {
        x -= lines[y].length;
    }
    terminal.moveTo(x + 1, miniBuffers[0].top() + y + 1);
}