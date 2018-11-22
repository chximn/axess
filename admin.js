var page = require('webpage').create();

var passcode = 'JFtMf1T2pv2nGVc87jp9WSjSj6A3vJ70';
var url = 'http://localhost:3000/?hash=' + passcode


page.open(url, function(status){
	console.log('[INFO] Page loaded' + status)

    setTimeout(function() {
		page.evaluate(function () {
			click(document.querySelector('.users .user'))

			function click(el){
				var ev = document.createEvent("MouseEvent");
				ev.initMouseEvent("click", true, true, window, null, 0, 0, 0, 0, false, false, false, false, 0, null)
				el.dispatchEvent(ev);
			}
		})

		setTimeout(function() { phantom.exit() }, 1000)
	}, 1000)
})

page.onError = function (msg, trace) {
    console.log(msg);
    trace.forEach(function(item) {
        console.log('  ', item.file, ':', item.line);
    });
};
