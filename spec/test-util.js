var jsdom = require("jsdom");

var PAGE = '<html><head></head><body><div id="divOnPage">jQuery Detached</div></body></html>';

exports.onPage = function(testFunc) {
    jsdom.env(PAGE, [],
        function (errors, window) {
            exports.mockWindow(window);
            testFunc(window);
        }
    );    
}

exports.mockWindow = function(window) {
    var internal = require("../js/internal");
    internal.getWindow = function() {
        return window;
    };    
}