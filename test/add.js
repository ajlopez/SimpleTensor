
var st = require('..');

exports['add numbers'] = function (test) {
	var number1 = st.constant(20);
	var number2 = st.constant(22);
	
	var oper = st.add(number1, number2);
	
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

exports['add vector to vector'] = function (test) {
	var value1 = st.constant([ 1, 2, 3 ]);
	var value2 = st.constant([ 2, 3, 4 ]);
	
	var oper = st.add(value1, value2);
	
	test.ok(!oper.isNumber());
	test.ok(oper.isVector());
	test.ok(!oper.isMatrix());
	test.deepEqual(oper.shape(), [ 3 ]);
	test.deepEqual(oper.value(), [ 3, 5, 7 ]);
	
	var result = oper.evaluate();
	
	test.ok(!result.isNumber());
	test.ok(result.isVector());
	test.ok(!result.isMatrix());
	test.deepEqual(result.shape(), [ 3 ]);
	test.deepEqual(result.value(), [ 3, 5, 7 ]);
};

exports['add matrix to matrix'] = function (test) {
	var value1 = st.constant([ [ 1, 2, 3 ], [ 3, 4, 5 ] ]);
	var value2 = st.constant([ [ 2, 3, 4 ], [ 10, 11, 12 ] ]);
	
	var oper = st.add(value1, value2);
	
	test.ok(!oper.isNumber());
	test.ok(!oper.isVector());
	test.ok(oper.isMatrix());
	test.deepEqual(oper.shape(), [ 2, 3 ]);
	test.deepEqual(oper.value(), [ [ 3, 5, 7 ], [ 13, 14, 17 ] ]);
	
	var result = oper.evaluate();
	
	test.ok(!result.isNumber());
	test.ok(!result.isVector());
	test.ok(result.isMatrix());
	test.deepEqual(result.shape(), [ 2, 3 ]);
	test.deepEqual(result.value(), [ [ 3, 5, 7 ], [ 13, 14, 17 ] ]);
};
