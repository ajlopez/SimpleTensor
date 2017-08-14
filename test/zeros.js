
var st = require('..');

exports['zeros numbers'] = function (test) {
	var result = st.zeros([]);
	
	test.ok(result.isNumber());
	test.ok(!result.isVector());
	test.ok(!result.isMatrix());
	test.deepEqual(result.shape(), []);
	test.equal(result.value(), 0);
};

exports['zeros vector'] = function (test) {
	var result = st.zeros([ 3 ]);
	
	test.ok(!result.isNumber());
	test.ok(result.isVector());
	test.ok(!result.isMatrix());
	test.deepEqual(result.shape(), [ 3 ]);
	test.deepEqual(result.value(), [ 0, 0, 0 ]);
};

exports['zeros matrix'] = function (test) {
	var result = st.zeros([ 2, 3 ]);
	
	test.ok(!result.isNumber());
	test.ok(!result.isVector());
	test.ok(result.isMatrix());
	test.deepEqual(result.shape(), [ 2, 3 ]);
	test.deepEqual(result.value(), [ [ 0, 0, 0 ], [ 0, 0, 0 ] ]);
};

