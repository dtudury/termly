var termly = require('../index');

var t = termly.terminal;

termly.init();
termly.dispatcher.on(termly.ansi.CTRL_P, function () {
    termly.getCursorPosition(function (x, y) {
        console.log(arguments);
    })
});
termly.dispatcher.on(termly.events.terminal.RESIZE, function () {
    console.log(t.columns, t.rows);
});
termly.dispatcher.on(termly.ansi.CTRL_C, function () {
    process.exit();
});
//termly.dispatcher.on(termly.ansi.UP, function() {
//    var x = Math.floor(Math.random() * t.columns) + 1;
//    var y = Math.floor(Math.random() * t.rows) + 1;
//    t.saveCursor();
//    t.setBold(true);
//    t.write("moving to: " + x + "," + y);
//    t.moveTo(x, y);
//    t.getCursorPosition(function(x, y) {
//        t.setBold(false);
//        t.write("at: " + x + "," + y);
//    })
//});
termly.dispatcher.on(termly.ansi.DOWN, function() {
    t.restoreCursor();
});
termly.lineEditor.makeEditable();
