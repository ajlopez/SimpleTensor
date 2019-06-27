
var st = require('..');

exports['atanh number'] = function (test) {
	var number = st.constant(0.5);
	
	var oper = st.atanh(number);
	
	test.ok(oper.isNumber());
	test.ok(!oper.isVector());
	test.ok(!oper.isMatrix());
	test.deepEqual(oper.shape(), []);
	
	test.equal(oper.value(), Math.atanh(0.5));
	
	var result = oper.evaluate();
	
	test.ok(result.isNumber());
	test.ok(!result.isVector());
	test.ok(!result.isMatrix());
	test.deepEqual(result.shape(), []);
	test.equal(result.value(), Math.atanh(0.5));
};

exports['atanh vector'] = function (test) {
	var value = st.constant([ -0.5, 0.5, -0.3 ]);
	
	var oper = st.atanh(value);
	
	test.ok(!oper.isNumber());
	test.ok(oper.isVector());
	test.ok(!oper.isMatrix());
	test.deepEqual(oper.shape(), [ 3 ]);
	
	test.deepEqual(oper.value(), [ Math.atanh(-0.5), Math.atanh(0.5), Math.atanh(-0.3) ]);
	
	var result = oper.evaluate();
	
	test.ok(!result.isNumber());
	test.ok(result.isVector());
	test.ok(!result.isMatrix());
	test.deepEqual(result.shape(), [ 3 ]);
	test.deepEqual(result.value(), [ Math.atanh(-0.5), Math.atanh(0.5), Math.atanh(-0.3) ]);
};

exports['atanh matrix'] = function (test) {
	var value = st.constant([ [ 0.5, -0.2, 0.1 ], [ 0.1, -0.2, 0.3 ] ]);
	
	var oper = st.atanh(value);
	
	test.ok(!oper.isNumber());
	test.ok(!oper.isVector());
	test.ok(oper.isMatrix());
	test.deepEqual(oper.shape(), [ 2, 3 ]);
	
	test.deepEqual(oper.value(), [ [ Math.atanh(0.5), Math.atanh(-0.2), Math.atanh(0.1) ], [ Math.atanh(0.1), Math.atanh(-0.2), Math.atanh(0.3) ] ]);
	
	var result = oper.evaluate();
	
	test.ok(!result.isNumber());
	test.ok(!result.isVector());
	test.ok(result.isMatrix());
	test.deepEqual(result.shape(), [ 2, 3 ]);
	test.deepEqual(result.value(), [ [ Math.atanh(0.5), Math.atanh(-0.2), Math.atanh(0.1) ], [ Math.atanh(0.1), Math.atanh(-0.2), Math.atanh(0.3) ] ]);
};

