var events = require('./events');
var dispatcher = require('./sharedDispatcher');
var ansi = require('./ansi');
var util = require('util');

var _cursorPositionCallbackStack = [];


function write(str) {
    process.stdout.write(str);
}


function _handleResize() {
    if(exports.columns !== process.stdout.columns || exports.rows !== process.stdout.rows) {
        exports.columns = process.stdout.columns;
        exports.rows = process.stdout.rows;
        dispatcher.dispatch(events.terminal.RESIZE);
    }
}


function getCursorPosition(callback) {
    _cursorPositionCallbackStack.push(callback);
    write(ansi.cursor.requestCursorPosition);
}


function _tryPositionMatch(data) {
    return ansi.cursor.checkForPositionResponse(data, function (column, row) {
        var callback = _cursorPositionCallbackStack.shift();
        if (callback) callback(column, row);
    });
}


function _handleData(data) {
//    var util = require('util');
//    write(util.inspect(data), data.charCodeAt(0), data.match(/^\w/), data.length);
    if (ansi.isSpecialKey(data)) {
        dispatcher.dispatch(data, data);
    } else if (data.length > 1) {
        if (!_tryPositionMatch(data)) {
            for (var i = 0; i < data.length; i++) {
                _handleData(data.charAt(i));
            }
        }
    } else {
        dispatcher.dispatch(data, data);
        dispatcher.dispatch(events.terminal.NORMAL_KEY, data);
    }
}


process.stdin.on('data', _handleData);
process.stdout.on('resize', _handleResize);
exports.columns = 0;
exports.rows = 0;
_handleResize(); // (sets columns and rows)


exports.write = write;
exports.getCursorPosition = getCursorPosition;


exports.blank = function () {
    for (var i = 1; i < process.stdout.rows; i++) {
        write('\n');
    }
    write(ansi.cursor.clearScreen);
};
exports.setUnderline = function (isUnderlined) {
    write(ansi.text.setUnderline(isUnderlined));
};
exports.setBold = function (isBold) {
    write(ansi.text.setBold(isBold));
};
exports.setForeground = function (n) {
    write(ansi.text.setForeground(n));
};
exports.setBackground = function (n) {
    write(ansi.text.setBackground(n));
};
exports.resetFont = function () {
    write(ansi.text.resetFont);
};
exports.up = function (n) {
    write(ansi.cursor.up(n));
};
exports.down = function (n) {
    write(ansi.cursor.down(n));
};
exports.right = function (n) {
    write(ansi.cursor.right(n));
};
exports.left = function (n) {
    write(ansi.cursor.left(n));
};
exports.moveTo = function (c, r) {
    write(ansi.cursor.moveTo(c, r));
};
exports.clearScreenDown = function () {
    write(ansi.cursor.clearScreenDown);
};
exports.clearScreenUp = function () {
    write(ansi.cursor.clearScreenUp);
};
exports.clearScreen = function () {
    write(ansi.cursor.clearScreen);
};
exports.clearLineRight = function () {
    write(ansi.cursor.clearLineRight);
};
exports.clearLineLeft = function () {
    write(ansi.cursor.clearLineLeft);
};
exports.clearLine = function () {
    write(ansi.cursor.clearLine);
};
exports.scrollUpOne = function () {
    write(ansi.cursor.scrollUpOne);
};
exports.scrollDownOne = function () {
    write(ansi.cursor.scrollDownOne);
};
exports.saveCursor = function () {
    write(ansi.cursor.saveCursor);
};
exports.restoreCursor = function () {
    write(ansi.cursor.restoreCursor);
};
exports.hideCursor = function () {
    write(ansi.cursor.hideCursor);
};
exports.showCursor = function () {
    write(ansi.cursor.showCursor);
};


