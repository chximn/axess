var page = require('webpage').create();
page.open('http://localhost:8000/test.html', function(status) {
	console.log("[STATUS]", status)

	setTimeout(phantom.exit.bind(phantom), 10000)
});

page.onConsoleMessage = function(msg, lineNum, sourceId) {
    console.log('[CONSOLE]', msg);
};

page.onError = function(msg) {
	console.log('[ERROR]', msg)
}
