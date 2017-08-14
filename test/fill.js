
var st = require('..');

exports['fill numbers'] = function (test) {
	var result = st.fill(42, []);
	
	test.ok(result.isNumber());
	test.ok(!result.isVector());
	test.ok(!result.isMatrix());
	test.deepEqual(result.shape(), []);
	test.equal(result.value(), 42);
};

exports['fill vector'] = function (test) {
	var result = st.fill(42, [ 3 ]);
	
	test.ok(!result.isNumber());
	test.ok(result.isVector());
	test.ok(!result.isMatrix());
	test.deepEqual(result.shape(), [ 3 ]);
	test.deepEqual(result.value(), [ 42, 42, 42 ]);
};

exports['fill matrix'] = function (test) {
	var result = st.fill(42, [ 2, 3 ]);
	
	test.ok(!result.isNumber());
	test.ok(!result.isVector());
	test.ok(result.isMatrix());
	test.deepEqual(result.shape(), [ 2, 3 ]);
	test.deepEqual(result.value(), [ [ 42, 42, 42 ], [ 42, 42, 42 ] ]);
};

