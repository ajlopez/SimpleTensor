
var st = require('..');

exports['random numbers'] = function (test) {
	for (var k = 0; k < 100; k++) {
		var result = st.random.uniform([]);
		
		test.ok(result.value() >= 0);
		test.ok(result.value() < 1);
	}
};

