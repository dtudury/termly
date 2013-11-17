var terminal = require('./terminal');

var _previousBuffer = [];
var _nextBuffer = [];
exports.draw = function() {
    for(var y = 0; y < terminal.rows; y++) {
        if(_nextBuffer[y]) {
            if(_nextBuffer[y] !== _previousBuffer[y]) {
                terminal.moveTo(1, y + 1);
                terminal.write(_nextBuffer[y]);
                terminal.clearLineRight();
                _previousBuffer[y] = _nextBuffer[y].slice();
            }
        } else if(_previousBuffer[y]) {
            terminal.moveTo(1, y + 1);
            terminal.clearLine();
            delete _previousBuffer[y];
        }
    }
}

exports.writeAt = function(x, y, message) {
    var line = _nextBuffer[y] || (_nextBuffer[y] = "");
    var pre = line.substring(0, x);
    while(pre.length < x) {
        pre += " ";
    }
    var post = line.substring(x + message.length);
    line = pre + message + post;
    _nextBuffer[y] = line.substring(0, terminal.columns);
}

exports.setLine = function(y, message) {
    _nextBuffer[y] = message;
}

exports.miniBuffer = function() {
    this.editable = false;
    this.password = false;
    this.bottom = 0;
    var _top = this.bottom;
    this.lines = [];

    this.redraw = function() {
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
}