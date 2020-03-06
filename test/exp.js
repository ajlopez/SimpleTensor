
var st = require('..');

exports['exp number'] = function (test) {
	var number = st.constant(-42);
	
	var oper = st.exp(number);
	
	test.ok(oper.isNumber());
	test.ok(!oper.isVector());
	test.ok(!oper.isMatrix());
	test.deepEqual(oper.shape(), []);
	
	test.equal(oper.value(), Math.exp(-42));
	
	var result = oper.evaluate();
	
	test.ok(result.isNumber());
	test.ok(!result.isVector());
	test.ok(!result.isMatrix());
	test.deepEqual(result.shape(), []);
	test.equal(result.value(), Math.exp(-42));
};

exports['exp vector'] = function (test) {
	var value = st.constant([ -1, 2, -3 ]);
	
	var oper = st.exp(value);
	
	test.ok(!oper.isNumber());
	test.ok(oper.isVector());
	test.ok(!oper.isMatrix());
	test.deepEqual(oper.shape(), [ 3 ]);
	
	test.deepEqual(oper.value(), [ Math.exp(-1), Math.exp(2), Math.exp(-3) ]);
	
	var result = oper.evaluate();
	
	test.ok(!result.isNumber());
	test.ok(result.isVector());
	test.ok(!result.isMatrix());
	test.deepEqual(result.shape(), [ 3 ]);
	test.deepEqual(result.value(), [ Math.exp(-1), Math.exp(2), Math.exp(-3) ]);
};

exports['exp matrix'] = function (test) {
	var value = st.constant([ [ 1.5, -2.6, 3.7 ], [ 1, -2, 3 ] ]);
	
	var oper = st.exp(value);
	
	test.ok(!oper.isNumber());
	test.ok(!oper.isVector());
	test.ok(oper.isMatrix());
	test.deepEqual(oper.shape(), [ 2, 3 ]);
	
	test.deepEqual(oper.value(), [ [ Math.exp(1.5), Math.exp(-2.6), Math.exp(3.7) ], [ Math.exp(1), Math.exp(-2), Math.exp(3) ] ]);
	
	var result = oper.evaluate();
	
	test.ok(!result.isNumber());
	test.ok(!result.isVector());
	test.ok(result.isMatrix());
	test.deepEqual(result.shape(), [ 2, 3 ]);
	test.deepEqual(result.value(), [ [ Math.exp(1.5), Math.exp(-2.6), Math.exp(3.7) ], [ Math.exp(1), Math.exp(-2), Math.exp(3) ] ]);
};

