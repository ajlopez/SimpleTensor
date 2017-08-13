
var st = require('..');

exports['ones numbers'] = function (test) {
	var result = st.ones([]);
	
	test.ok(result.isNumber());
	test.ok(!result.isVector());
	test.ok(!result.isMatrix());
	test.deepEqual(result.shape(), []);
	test.equal(result.value(), 1);
};

exports['ones vector'] = function (test) {
	var result = st.ones([ 3 ]);
	
	test.ok(!result.isNumber());
	test.ok(result.isVector());
	test.ok(!result.isMatrix());
	test.deepEqual(result.shape(), [ 3 ]);
	test.deepEqual(result.value(), [ 1, 1, 1 ]);
};

exports['ones matrix'] = function (test) {
	var result = st.ones([ 2, 3 ]);
	
	test.ok(!result.isNumber());
	test.ok(!result.isVector());
	test.ok(result.isMatrix());
	test.deepEqual(result.shape(), [ 2, 3 ]);
	test.deepEqual(result.value(), [ [ 1, 1, 1 ], [ 1, 1, 1 ] ]);
};

