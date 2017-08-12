
var st = require('..');

exports['subtract numbers'] = function (test) {
	var number1 = st.constant(44);
	var number2 = st.constant(2);
	
	var oper = st.subtract(number1, number2);
	
	test.ok(oper.isNumber());
	test.ok(!oper.isVector());
	test.ok(!oper.isMatrix());
	test.deepEqual(oper.shape(), []);
	
	test.equal(oper.value(), 42);
	
	var result = oper.evaluate();
	
	test.ok(result.isNumber());
	test.ok(!result.isVector());
	test.ok(!result.isMatrix());
	test.deepEqual(result.shape(), []);
	test.equal(result.value(), 42);
};

exports['subtract vector from vector'] = function (test) {
	var value1 = st.constant([ 1, 2, 3 ]);
	var value2 = st.constant([ 2, 3, 4 ]);
	
	var oper = st.subtract(value1, value2);
	
	test.ok(!oper.isNumber());
	test.ok(oper.isVector());
	test.ok(!oper.isMatrix());
	test.deepEqual(oper.shape(), [ 3 ]);
	test.deepEqual(oper.value(), [ -1, -1, -1 ]);
	
	var result = oper.evaluate();
	
	test.ok(!result.isNumber());
	test.ok(result.isVector());
	test.ok(!result.isMatrix());
	test.deepEqual(result.shape(), [ 3 ]);
	test.deepEqual(result.value(), [ -1, -1, -1 ]);
};

exports['subtract matrix from matrix'] = function (test) {
	var value1 = st.constant([ [ 1, 2, 3 ], [ 3, 4, 5 ] ]);
	var value2 = st.constant([ [ 2, 3, 4 ], [ 10, 11, 12 ] ]);
	
	var oper = st.subtract(value1, value2);
	
	test.ok(!oper.isNumber());
	test.ok(!oper.isVector());
	test.ok(oper.isMatrix());
	test.deepEqual(oper.shape(), [ 2, 3 ]);
	test.deepEqual(oper.value(), [ [ -1, -1, -1 ], [ -7, -7, -7 ] ]);
	
	var result = oper.evaluate();
	
	test.ok(!result.isNumber());
	test.ok(!result.isVector());
	test.ok(result.isMatrix());
	test.deepEqual(result.shape(), [ 2, 3 ]);
	test.deepEqual(oper.value(), [ [ -1, -1, -1 ], [ -7, -7, -7 ] ]);
};
