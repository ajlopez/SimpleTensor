
var st = require('..');

exports['random numbers'] = function (test) {
	for (var k = 0; k < 100; k++) {
		var result = st.random.uniform([]);
		
		test.ok(result.value() >= 0);
		test.ok(result.value() < 1);
	}
};

exports['random numbers with minval, maxval'] = function (test) {
	for (var k = 0; k < 100; k++) {
		var result = st.random.uniform([], { minval: -10, maxval: 20 });
		
		test.ok(result.value() >= -10);
		test.ok(result.value() < 20);
	}
};
