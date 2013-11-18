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
    write(ansi.requestCursorPosition);
}


function _tryPositionMatch(data) {
    return ansi.checkForPositionResponse(data, function (column, row) {
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
    write(ansi.clearScreen);
};
exports.setUnderline = function (isUnderlined) {
    write(ansi.setUnderline(isUnderlined));
};
exports.setBold = function (isBold) {
    write(ansi.setBold(isBold));
};
exports.setForeground = function (n) {
    write(ansi.setForeground(n));
};
exports.setBackground = function (n) {
    write(ansi.setBackground(n));
};
exports.resetFont = function () {
    write(ansi.resetFont);
};
exports.up = function (n) {
    write(ansi.up(n));
};
exports.down = function (n) {
    write(ansi.down(n));
};
exports.right = function (n) {
    write(ansi.right(n));
};
exports.left = function (n) {
    write(ansi.left(n));
};
exports.moveTo = function (c, r) {
    write(ansi.moveTo(c, r));
};
exports.clearScreenDown = function () {
    write(ansi.clearScreenDown);
};
exports.clearScreenUp = function () {
    write(ansi.clearScreenUp);
};
exports.clearScreen = function () {
    write(ansi.clearScreen);
};
exports.clearLineRight = function () {
    write(ansi.clearLineRight);
};
exports.clearLineLeft = function () {
    write(ansi.clearLineLeft);
};
exports.clearLine = function () {
    write(ansi.clearLine);
};
exports.scrollUpOne = function () {
    write(ansi.scrollUpOne);
};
exports.scrollDownOne = function () {
    write(ansi.scrollDownOne);
};
exports.saveCursor = function () {
    write(ansi.saveCursor);
};
exports.restoreCursor = function () {
    write(ansi.restoreCursor);
};
exports.hideCursor = function () {
    write(ansi.hideCursor);
};
exports.showCursor = function () {
    write(ansi.showCursor);
};


