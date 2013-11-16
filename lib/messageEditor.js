var dispatcher = require('./sharedDispatcher');
var events = require('./events');
var terminal = require('./terminal');
var ansi = require('./ansi');

exports.makeEditable = function () {
    var frontBuffer = [];
    var backBuffer = [];
    dispatcher.on(ansi.LEFT, left);
    dispatcher.on(ansi.RIGHT, right);
    dispatcher.on(ansi.SPACE, append);
    dispatcher.on(ansi.BACKSPACE, backspace);
    dispatcher.on(ansi.DEL, del);
    dispatcher.on(events.terminal.NORMAL_KEY, append);

    function left() {
        if(frontBuffer.length) {
            backBuffer.unshift(frontBuffer.pop());
            terminal.left();
        }
    }
    function right() {
        if(backBuffer.length) {
            frontBuffer.push(backBuffer.shift());
            terminal.right();
        } else {
            append(' ');
        }
    }

    function append(data) {
        terminal.write(data);
        frontBuffer.push(data);
        rewriteBackBuffer();
    }

    function backspace() {
        if(frontBuffer.length) {
            frontBuffer.pop();
            terminal.left();
            rewriteBackBuffer();
        }
    }

    function del() {
        if(backBuffer.length) {
            backBuffer.shift();
            rewriteBackBuffer();
        }
    }

    function rewriteBackBuffer() {
        terminal.saveCursor();
        terminal.clearLineRight();
        terminal.write(backBuffer.join(""));
        terminal.restoreCursor();
    }
}

