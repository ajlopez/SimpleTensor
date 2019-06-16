
var st = require('..');

exports['tanh number'] = function (test) {
	var number = st.constant(1.5);
	
	var oper = st.tanh(number);
	
	test.ok(oper.isNumber());
	test.ok(!oper.isVector());
	test.ok(!oper.isMatrix());
	test.deepEqual(oper.shape(), []);
	
	test.equal(oper.value(), Math.tanh(1.5));
	
	var result = oper.evaluate();
	
	test.ok(result.isNumber());
	test.ok(!result.isVector());
	test.ok(!result.isMatrix());
	test.deepEqual(result.shape(), []);
	test.equal(result.value(), Math.tanh(1.5));
};

exports['tanh vector'] = function (test) {
	var value = st.constant([ -1, 2.5, -0.3 ]);
	
	var oper = st.tanh(value);
	
	test.ok(!oper.isNumber());
	test.ok(oper.isVector());
	test.ok(!oper.isMatrix());
	test.deepEqual(oper.shape(), [ 3 ]);
	
	test.deepEqual(oper.value(), [ Math.tanh(-1), Math.tanh(2.5), Math.tanh(-0.3) ]);
	
	var result = oper.evaluate();
	
	test.ok(!result.isNumber());
	test.ok(result.isVector());
	test.ok(!result.isMatrix());
	test.deepEqual(result.shape(), [ 3 ]);
	test.deepEqual(result.value(), [ Math.tanh(-1), Math.tanh(2.5), Math.tanh(-0.3) ]);
};

exports['tanh matrix'] = function (test) {
	var value = st.constant([ [ 3.5, -0.2, 1 ], [ 1, -0.2, 0.3 ] ]);
	
	var oper = st.tanh(value);
	
	test.ok(!oper.isNumber());
	test.ok(!oper.isVector());
	test.ok(oper.isMatrix());
	test.deepEqual(oper.shape(), [ 2, 3 ]);
	
	test.deepEqual(oper.value(), [ [ Math.tanh(3.5), Math.tanh(-0.2), Math.tanh(1) ], [ Math.tanh(1), Math.tanh(-0.2), Math.tanh(0.3) ] ]);
	
	var result = oper.evaluate();
	
	test.ok(!result.isNumber());
	test.ok(!result.isVector());
	test.ok(result.isMatrix());
	test.deepEqual(result.shape(), [ 2, 3 ]);
	test.deepEqual(result.value(), [ [ Math.tanh(3.5), Math.tanh(-0.2), Math.tanh(1) ], [ Math.tanh(1), Math.tanh(-0.2), Math.tanh(0.3) ] ]);
};

