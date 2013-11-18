var dispatcher = require('./sharedDispatcher');
var events = require('./events');
var terminal = require('./terminal');
var ansi = require('./ansi');

exports.makeEditable = function () {
    terminal.setBackground(ansi.BLACK);
    terminal.setForeground(ansi.CYAN);
    terminal.clearLine(); //draw with background color
    var message = "";
    var _currentLine = "";
    var column = 0;
    var row = 0;
    terminal.getCursorPosition(function(x, y) {
        column = x;
        row = y;
    });
    dispatcher.on(ansi.LEFT, left);
    dispatcher.on(ansi.RIGHT, right);
    dispatcher.on(ansi.PAGEUP, pageup);
    dispatcher.on(ansi.PAGEDOWN, pagedown);
    dispatcher.on(ansi.UP, up);
    dispatcher.on(ansi.DOWN, down);
    dispatcher.on(ansi.SPACE, append);
    dispatcher.on(ansi.BACKSPACE, backspace);
    dispatcher.on(ansi.DEL, del);
    dispatcher.on(events.terminal.NORMAL_KEY, append);

    function left() {
        if(column > 1) {
            column--;
            terminal.left();
        }
    }
    function right() {
        if(column < terminal.columns) {
            if(column < currentLine().length) {
                terminal.right();
                column++;
            } else {
                append(' ');
            }
        }
    }

    function up() {
        terminal.up();
    }

    function down() {
        terminal.down();
    }

    function pageup() {
//        terminal.scrollUpOne();
    }

    function pagedown() {
//        terminal.scrollDownOne();
    }

    function append(data) {
        terminal.write(data);
        currentLine(currentLine().substring(0, column - 1) + data + currentLine().substring(column - 1));
        column += data.length;
        rewriteRightOfCursor();
    }

    function backspace() {
        if(column > 1) {
            currentLine(currentLine().substring(0, column - 2) + currentLine().substring(column - 1));
            column--;
            terminal.left();
            rewriteRightOfCursor();
        }
    }

    function del() {
        if(column < currentLine().length) {
            currentLine(currentLine().substring(0, column - 1) + currentLine().substring(column));
            rewriteRightOfCursor();
        }
    }

    function rewriteRightOfCursor() {
        terminal.saveCursor();
//        terminal.clearLineRight();
        terminal.write(currentLine().substring(column - 1));
        terminal.write(":" + column + "," + row);
//        terminal.restoreCursor();
        terminal.moveTo(column, row);
    }

    function currentLine(str) {
        if(arguments.length) {
            _currentLine = str;
        }
        return _currentLine;
    }
};

