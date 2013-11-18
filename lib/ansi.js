
//-------------------------------------------------------
// font control (SGR parameters)
//-------------------------------------------------------
exports.BLACK = 0;
exports.RED = 1;
exports.GREEN = 2;
exports.YELLOW = 3;
exports.BLUE = 4;
exports.MAGENTA = 5;
exports.CYAN = 6;
exports.WHITE = 7;

exports.setUnderline = function setUnderline(isUnderlined) {
    if (isUnderlined) {
        return '\033[4m';
    } else {
        return '\033[24m';
    }
};

exports.setBold = function setBold(isBold) {
    if (isBold) {
        return '\033[1m';
    } else {
        return '\033[22m';
    }
};

exports.setForeground = function setColor(n) {
    var fg = 30 + n;
    return '\033[' + fg + 'm';
};

exports.setBackground = function setColor(n) {
    var bg = 40 + n;
    return '\033[' + bg + 'm';
};

exports.resetFont = '\033[0m';

exports.stripFormatting = function(str) {
    return str.replace(/\033[^a-z]*[a-z]/gi, "");
};


//-------------------------------------------------------
// movement control
//-------------------------------------------------------
exports.up = function up(n) {
    return "\033[" + (n || 1) + "A";
};

exports.down = function down(n) {
    return "\033[" + (n || 1) + "B";
};

exports.right = function right(n) {
    return "\033[" + (n || 1) + "C";
};

exports.left = function left(n) {
    return "\033[" + (n || 1) + "D";
};

exports.moveTo = function moveTo(c, r) {
    return "\033[" + (r || 1) + ";"  + (c || 1) + "H";
};

exports.clearScreenDown = "\033[0J";
exports.clearScreenUp = "\033[1J";
exports.clearScreen = "\033[2J";
exports.clearLineRight = "\033[0K";
exports.clearLineLeft = "\033[1K";
exports.clearLine = "\033[2K";
exports.scrollUpOne = "\033[S";
exports.scrollDownOne = "\033[T";
exports.saveCursor = "\033[s";
exports.restoreCursor = "\033[u";
exports.hideCursor = "\033[?25l";
exports.showCursor = "\033[?25h";
exports.requestCursorPosition = "\033[6n";
exports.checkForPositionResponse = function(data, callback) {
    var match = data.match(/\u001b\[(\d*);(\d*)R/);
    if(match) {
        callback(parseInt(match[2]), parseInt(match[1]));
        return true;
    }
    return false;
};


//-------------------------------------------------------
// key codes
//-------------------------------------------------------
var F1 = exports.F1 = '\u001bOP';
var F2 = exports.F2 = '\u001bOQ';
var F3 = exports.F3 = '\u001bOR';
var F4 = exports.F4 = '\u001bOS';
var UP = exports.UP = '\u001b[A';
var DOWN = exports.DOWN = '\u001b[B';
var RIGHT = exports.RIGHT = '\u001b[C';
var LEFT = exports.LEFT = '\u001b[D';
var BACKSPACE = exports.BACKSPACE = '\u007f';
var SPACE = exports.SPACE = ' ';
var TAB = exports.TAB = '\t';
var ENTER = exports.ENTER = '\r';
var ESC = exports.ESC = '\u001b';
var DEL = exports.DEL = '\u001b[3~';

var END = exports.END = '\u001b[F';
var HOME = exports.HOME = '\u001b[H';
var PAGEUP = exports.PAGEUP = '\u001b[5~';
var PAGEDOWN = exports.PAGEDOWN = '\u001b[6~';

var CTRL_A = exports.CTRL_A = '\u0001';
var CTRL_B = exports.CTRL_B = '\u0002';
var CTRL_C = exports.CTRL_C = '\u0003';
var CTRL_D = exports.CTRL_D = '\u0004';
var CTRL_E = exports.CTRL_E = '\u0005';
var CTRL_F = exports.CTRL_F = '\u0006';
var CTRL_G = exports.CTRL_G = '\u0007';
var CTRL_H = exports.CTRL_H = '\u0008'; // \b
var CTRL_I = exports.CTRL_I = '\u0009'; // \t
var CTRL_J = exports.CTRL_J = '\u000a'; // \n
var CTRL_K = exports.CTRL_K = '\u000b';
var CTRL_L = exports.CTRL_L = '\u000c'; // \f
var CTRL_M = exports.CTRL_M = '\u000d'; // \r
var CTRL_N = exports.CTRL_N = '\u000e';
var CTRL_O = exports.CTRL_O = '\u000f';
var CTRL_P = exports.CTRL_P = '\u0010';
var CTRL_Q = exports.CTRL_Q = '\u0011';
var CTRL_R = exports.CTRL_R = '\u0012';
var CTRL_S = exports.CTRL_S = '\u0013';
var CTRL_T = exports.CTRL_T = '\u0014';
var CTRL_U = exports.CTRL_U = '\u0015';
var CTRL_V = exports.CTRL_V = '\u0016';
var CTRL_W = exports.CTRL_W = '\u0017';
var CTRL_X = exports.CTRL_X = '\u0018';
var CTRL_Y = exports.CTRL_Y = '\u0019';
var CTRL_Z = exports.CTRL_Z = '\u001a';

//haven't tried these...
var NUM_KEY_0 = exports.NUM_KEY_0 = '\u001bOp';
var NUM_KEY_1 = exports.NUM_KEY_1 = '\u001bOq';
var NUM_KEY_2 = exports.NUM_KEY_2 = '\u001bOr';
var NUM_KEY_3 = exports.NUM_KEY_3 = '\u001bOs';
var NUM_KEY_4 = exports.NUM_KEY_4 = '\u001bOt';
var NUM_KEY_5 = exports.NUM_KEY_5 = '\u001bOu';
var NUM_KEY_6 = exports.NUM_KEY_6 = '\u001bOv';
var NUM_KEY_7 = exports.NUM_KEY_7 = '\u001bOw';
var NUM_KEY_8 = exports.NUM_KEY_8 = '\u001bOx';
var NUM_KEY_9 = exports.NUM_KEY_9 = '\u001bOy';
var NUM_KEY_MINUS = exports.NUM_KEY_MINUS = '\u001bOm';
var NUM_KEY_COMMA = exports.NUM_KEY_COMMA = '\u001bOl';
var NUM_KEY_PERIOD = exports.NUM_KEY_PERIOD = '\u001bOn';


var specialKeys = [F1, F2, F3, F4, UP, DOWN, RIGHT, LEFT, BACKSPACE, SPACE, TAB, ENTER, ESC, DEL, END, HOME, PAGEUP, PAGEDOWN, CTRL_A, CTRL_B, CTRL_C, CTRL_D, CTRL_E, CTRL_F, CTRL_G, CTRL_H, CTRL_I, CTRL_J, CTRL_K, CTRL_L, CTRL_M, CTRL_N, CTRL_O, CTRL_P, CTRL_Q, CTRL_R, CTRL_S, CTRL_T, CTRL_U, CTRL_V, CTRL_W, CTRL_X, CTRL_Y, CTRL_Z, NUM_KEY_0, NUM_KEY_1, NUM_KEY_2, NUM_KEY_3, NUM_KEY_4, NUM_KEY_5, NUM_KEY_6, NUM_KEY_7, NUM_KEY_8, NUM_KEY_9, NUM_KEY_MINUS, NUM_KEY_COMMA, NUM_KEY_PERIOD];
exports.isSpecialKey = function(data) {
    return specialKeys.indexOf(data) >= 0;
};