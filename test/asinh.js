
var st = require('..');

exports['asinh number'] = function (test) {
	var number = st.constant(1.5);
	
	var oper = st.asinh(number);
	
	test.ok(oper.isNumber());
	test.ok(!oper.isVector());
	test.ok(!oper.isMatrix());
	test.deepEqual(oper.shape(), []);
	
	test.equal(oper.value(), Math.asinh(1.5));
	
	var result = oper.evaluate();
	
	test.ok(result.isNumber());
	test.ok(!result.isVector());
	test.ok(!result.isMatrix());
	test.deepEqual(result.shape(), []);
	test.equal(result.value(), Math.asinh(1.5));
};

exports['asinh vector'] = function (test) {
	var value = st.constant([ 1, 1.5, 1.3 ]);
	
	var oper = st.asinh(value);
	
	test.ok(!oper.isNumber());
	test.ok(oper.isVector());
	test.ok(!oper.isMatrix());
	test.deepEqual(oper.shape(), [ 3 ]);
	
	test.deepEqual(oper.value(), [ Math.asinh(1), Math.asinh(1.5), Math.asinh(1.3) ]);
	
	var result = oper.evaluate();
	
	test.ok(!result.isNumber());
	test.ok(result.isVector());
	test.ok(!result.isMatrix());
	test.deepEqual(result.shape(), [ 3 ]);
	test.deepEqual(result.value(), [ Math.asinh(1), Math.asinh(1.5), Math.asinh(1.3) ]);
};

exports['asinh matrix'] = function (test) {
	var value = st.constant([ [ 1.5, 1.2, 1 ], [ 1, 1.2, 1.3 ] ]);
	
	var oper = st.asinh(value);
	
	test.ok(!oper.isNumber());
	test.ok(!oper.isVector());
	test.ok(oper.isMatrix());
	test.deepEqual(oper.shape(), [ 2, 3 ]);
	
	test.deepEqual(oper.value(), [ [ Math.asinh(1.5), Math.asinh(1.2), Math.asinh(1) ], [ Math.asinh(1), Math.asinh(1.2), Math.asinh(1.3) ] ]);
	
	var result = oper.evaluate();
	
	test.ok(!result.isNumber());
	test.ok(!result.isVector());
	test.ok(result.isMatrix());
	test.deepEqual(result.shape(), [ 2, 3 ]);
	test.deepEqual(result.value(), [ [ Math.asinh(1.5), Math.asinh(1.2), Math.asinh(1) ], [ Math.asinh(1), Math.asinh(1.2), Math.asinh(1.3) ] ]);
};

