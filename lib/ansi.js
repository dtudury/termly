
//-------------------------------------------------------
// font control (SGR parameters)
//-------------------------------------------------------
exports.colors = {};
exports.colors.BLACK = 0;
exports.colors.RED = 1;
exports.colors.GREEN = 2;
exports.colors.YELLOW = 3;
exports.colors.BLUE = 4;
exports.colors.MAGENTA = 5;
exports.colors.CYAN = 6;
exports.colors.WHITE = 7;

exports.text = {};
exports.text.setUnderline = function setUnderline(isUnderlined) {
    if (isUnderlined) {
        return '\033[4m';
    } else {
        return '\033[24m';
    }
};

exports.text.setBold = function setBold(isBold) {
    if (isBold) {
        return '\033[1m';
    } else {
        return '\033[22m';
    }
};

exports.text.setForeground = function setColor(n) {
    var fg = 30 + n;
    return '\033[' + fg + 'm';
};

exports.text.setBackground = function setColor(n) {
    var bg = 40 + n;
    return '\033[' + bg + 'm';
};

exports.text.resetFont = '\033[0m';

exports.text.stripFormatting = function(str) {
    return str.replace(/\033[^a-z]*[a-z]/gi, "");
};


//-------------------------------------------------------
// movement control
//-------------------------------------------------------
exports.cursor = {};
exports.cursor.up = function up(n) {
    return "\033[" + (n || 1) + "A";
};

exports.cursor.down = function down(n) {
    return "\033[" + (n || 1) + "B";
};

exports.cursor.right = function right(n) {
    return "\033[" + (n || 1) + "C";
};

exports.cursor.left = function left(n) {
    return "\033[" + (n || 1) + "D";
};

exports.cursor.moveTo = function moveTo(c, r) {
    return "\033[" + (r || 1) + ";"  + (c || 1) + "H";
};

exports.cursor.clearScreenDown = "\033[0J";
exports.cursor.clearScreenUp = "\033[1J";
exports.cursor.clearScreen = "\033[2J";
exports.cursor.clearLineRight = "\033[0K";
exports.cursor.clearLineLeft = "\033[1K";
exports.cursor.clearLine = "\033[2K";
exports.cursor.scrollUpOne = "\033[S";
exports.cursor.scrollDownOne = "\033[T";
exports.cursor.saveCursor = "\033[s";
exports.cursor.restoreCursor = "\033[u";
exports.cursor.hideCursor = "\033[?25l";
exports.cursor.showCursor = "\033[?25h";
exports.cursor.requestCursorPosition = "\033[6n";
exports.cursor.checkForPositionResponse = function(data, callback) {
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
exports.keys = {};
var F1 = exports.keys.F1 = '\u001bOP';
var F2 = exports.keys.F2 = '\u001bOQ';
var F3 = exports.keys.F3 = '\u001bOR';
var F4 = exports.keys.F4 = '\u001bOS';
var UP = exports.keys.UP = '\u001b[A';
var DOWN = exports.keys.DOWN = '\u001b[B';
var RIGHT = exports.keys.RIGHT = '\u001b[C';
var LEFT = exports.keys.LEFT = '\u001b[D';
var BACKSPACE = exports.keys.BACKSPACE = '\u007f';
var SPACE = exports.keys.SPACE = ' ';
var TAB = exports.keys.TAB = '\t';
var ENTER = exports.keys.ENTER = '\r';
var ESC = exports.keys.ESC = '\u001b';
var DEL = exports.keys.DEL = '\u001b[3~';

var END = exports.keys.END = '\u001b[F';
var HOME = exports.keys.HOME = '\u001b[H';
var PAGEUP = exports.keys.PAGEUP = '\u001b[5~';
var PAGEDOWN = exports.keys.PAGEDOWN = '\u001b[6~';

var CTRL_A = exports.keys.CTRL_A = '\u0001';
var CTRL_B = exports.keys.CTRL_B = '\u0002';
var CTRL_C = exports.keys.CTRL_C = '\u0003';
var CTRL_D = exports.keys.CTRL_D = '\u0004';
var CTRL_E = exports.keys.CTRL_E = '\u0005';
var CTRL_F = exports.keys.CTRL_F = '\u0006';
var CTRL_G = exports.keys.CTRL_G = '\u0007';
var CTRL_H = exports.keys.CTRL_H = '\u0008'; // \b
var CTRL_I = exports.keys.CTRL_I = '\u0009'; // \t
var CTRL_J = exports.keys.CTRL_J = '\u000a'; // \n
var CTRL_K = exports.keys.CTRL_K = '\u000b';
var CTRL_L = exports.keys.CTRL_L = '\u000c'; // \f
var CTRL_M = exports.keys.CTRL_M = '\u000d'; // \r
var CTRL_N = exports.keys.CTRL_N = '\u000e';
var CTRL_O = exports.keys.CTRL_O = '\u000f';
var CTRL_P = exports.keys.CTRL_P = '\u0010';
var CTRL_Q = exports.keys.CTRL_Q = '\u0011';
var CTRL_R = exports.keys.CTRL_R = '\u0012';
var CTRL_S = exports.keys.CTRL_S = '\u0013';
var CTRL_T = exports.keys.CTRL_T = '\u0014';
var CTRL_U = exports.keys.CTRL_U = '\u0015';
var CTRL_V = exports.keys.CTRL_V = '\u0016';
var CTRL_W = exports.keys.CTRL_W = '\u0017';
var CTRL_X = exports.keys.CTRL_X = '\u0018';
var CTRL_Y = exports.keys.CTRL_Y = '\u0019';
var CTRL_Z = exports.keys.CTRL_Z = '\u001a';

//haven't tried these...
var NUM_KEY_0 = exports.keys.NUM_KEY_0 = '\u001bOp';
var NUM_KEY_1 = exports.keys.NUM_KEY_1 = '\u001bOq';
var NUM_KEY_2 = exports.keys.NUM_KEY_2 = '\u001bOr';
var NUM_KEY_3 = exports.keys.NUM_KEY_3 = '\u001bOs';
var NUM_KEY_4 = exports.keys.NUM_KEY_4 = '\u001bOt';
var NUM_KEY_5 = exports.keys.NUM_KEY_5 = '\u001bOu';
var NUM_KEY_6 = exports.keys.NUM_KEY_6 = '\u001bOv';
var NUM_KEY_7 = exports.keys.NUM_KEY_7 = '\u001bOw';
var NUM_KEY_8 = exports.keys.NUM_KEY_8 = '\u001bOx';
var NUM_KEY_9 = exports.keys.NUM_KEY_9 = '\u001bOy';
var NUM_KEY_MINUS = exports.keys.NUM_KEY_MINUS = '\u001bOm';
var NUM_KEY_COMMA = exports.keys.NUM_KEY_COMMA = '\u001bOl';
var NUM_KEY_PERIOD = exports.keys.NUM_KEY_PERIOD = '\u001bOn';


var specialKeys = [F1, F2, F3, F4, UP, DOWN, RIGHT, LEFT, BACKSPACE, SPACE, TAB, ENTER, ESC, DEL, END, HOME, PAGEUP, PAGEDOWN, CTRL_A, CTRL_B, CTRL_C, CTRL_D, CTRL_E, CTRL_F, CTRL_G, CTRL_H, CTRL_I, CTRL_J, CTRL_K, CTRL_L, CTRL_M, CTRL_N, CTRL_O, CTRL_P, CTRL_Q, CTRL_R, CTRL_S, CTRL_T, CTRL_U, CTRL_V, CTRL_W, CTRL_X, CTRL_Y, CTRL_Z, NUM_KEY_0, NUM_KEY_1, NUM_KEY_2, NUM_KEY_3, NUM_KEY_4, NUM_KEY_5, NUM_KEY_6, NUM_KEY_7, NUM_KEY_8, NUM_KEY_9, NUM_KEY_MINUS, NUM_KEY_COMMA, NUM_KEY_PERIOD];
exports.isSpecialKey = function(data) {
    return specialKeys.indexOf(data) >= 0;
};