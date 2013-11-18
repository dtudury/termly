var terminal = require('./terminal');
var ansi = require('./ansi');

var _previousBuffer = [];
var _nextBuffer = [];
exports.draw = function(force) {
    for(var y = 0; y < terminal.rows; y++) {
        terminal.moveTo(1, y + 1);
        if(force) {
            terminal.write(_nextBuffer[y] || (_nextBuffer[y] = ""));
            _previousBuffer[y] = _nextBuffer[y].slice();
            terminal.clearLineRight();
        } else {
            if(_nextBuffer[y]) {
                if(_nextBuffer[y] !== _previousBuffer[y]) {
                    terminal.write(_nextBuffer[y]);
                    _previousBuffer[y] = _nextBuffer[y].slice();
                    terminal.clearLineRight();
                }
            } else  {
                delete _previousBuffer[y];
                terminal.clearLine();
            }
        }
        terminal.write(ansi.text.resetFont)
    }
};

exports.clear = function() {
    _nextBuffer = [];
};

exports.writeAt = function(x, y, message) {
    var line = _nextBuffer[y] || (_nextBuffer[y] = "");
    var pre = line.substring(0, x);
    while(pre.length < x) {
        pre += " ";
    }
    var post = line.substring(x + message.length);
    line = pre + message + post;
    _nextBuffer[y] = line.substring(0, terminal.columns);
};

exports.setLine = function(y, message) {
    _nextBuffer[y] = message;
};

exports.miniBuffer = function(isPassword) {
    this.isPassword = isPassword || false;
    var _fromBottom = true;
    var _bottom = 0;
    var _top = 0;
    var _message = [];
    this.lines = [];

    this.top = function(n) {
        if(n !== undefined) {
            _top = n;
            _fromBottom = false;
            _bottom = _top + (this.lines.length - 1);
        }
        return _top;
    };

    this.bottom = function(n) {
        if(n !== undefined) {
            _bottom = n;
            _fromBottom = true;
            _top = _bottom + (this.lines.length - 1);
        }
        return _bottom;
    };

    this.messageLength = function() {
        return _message.length;
    };
    this.spliceMessage = function(index, howMany, str) {
        _message.splice.apply(_message, arguments);
    };
    this.render = function() {
        this.lines = [];
        var messageCopy = _message.slice();
        if(this.isPassword) {
            messageCopy = messageCopy.replace(/./g, '*');
        }
        while(messageCopy.length) {
            this.lines.push(messageCopy.slice(0, terminal.columns));
            messageCopy = messageCopy.slice(terminal.columns);
        }
        var lastLine = this.lines[this.lines.length - 1];
        if(!lastLine || lastLine.length === terminal.columns) {
            this.lines.push([]);
        }
        _top = _bottom - (this.lines.length - 1);
        for(var y = 0; y < this.lines.length; y++) {
            exports.setLine(y + _top, this.lines[y].join(""));
        }
    };
};