
var st = require('..');

exports['multiply numbers'] = function (test) {
	var number1 = st.constant(2);
	var number2 = st.constant(21);
	
	var oper = st.multiply(number1, number2);
	
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

exports['multiply number by vector'] = function (test) {
	var value1 = st.constant(2);
	var value2 = st.constant([ 1, 2, 3, 21 ]);
	
	var oper = st.multiply(value1, value2);
	
	test.ok(!oper.isNumber());
	test.ok(oper.isVector());
	test.ok(!oper.isMatrix());
	test.deepEqual(oper.shape(), [ 4 ]);
	test.deepEqual(oper.value(), [ 2, 4, 6, 42 ]);
	
	var result = oper.evaluate();
	
	test.ok(!result.isNumber());
	test.ok(result.isVector());
	test.ok(!result.isMatrix());
	test.deepEqual(result.shape(), [ 4 ]);
	test.deepEqual(result.value(), [ 2, 4, 6, 42 ]);
};

exports['multiply vector by number'] = function (test) {
	var value1 = st.constant([ 1, 2, 3, 21 ]);
	var value2 = st.constant(2);
	
	var oper = st.multiply(value1, value2);
	
	test.ok(!oper.isNumber());
	test.ok(oper.isVector());
	test.ok(!oper.isMatrix());
	test.deepEqual(oper.shape(), [ 4 ]);
	test.deepEqual(oper.value(), [ 2, 4, 6, 42 ]);
	
	var result = oper.evaluate();
	
	test.ok(!result.isNumber());
	test.ok(result.isVector());
	test.ok(!result.isMatrix());
	test.deepEqual(result.shape(), [ 4 ]);
	test.deepEqual(result.value(), [ 2, 4, 6, 42 ]);
};

exports['multiply vector by vector'] = function (test) {
	var value1 = st.constant([ 1, 2, 3 ]);
	var value2 = st.constant([ 2, 3, 4 ]);
	
	var oper = st.multiply(value1, value2);
	
	test.ok(!oper.isNumber());
	test.ok(oper.isVector());
	test.ok(!oper.isMatrix());
	test.deepEqual(oper.shape(), [ 3 ]);
	test.deepEqual(oper.value(), [ 2, 6, 12 ]);
	
	var result = oper.evaluate();
		
	test.ok(!oper.isNumber());
	test.ok(oper.isVector());
	test.ok(!oper.isMatrix());
	test.deepEqual(oper.shape(), [ 3 ]);
	test.deepEqual(oper.value(), [ 2, 6, 12 ]);
};

exports['multiply matrix by matrix'] = function (test) {
	var value1 = st.constant([ [ 1, 2, 3 ], [ 4, 5, 6 ] ]);
	var value2 = st.constant([ [ 7, 8, 9 ], [ 10, 11, 12 ] ]);
	
	var oper = st.multiply(value1, value2);
	
	test.ok(!oper.isNumber());
	test.ok(!oper.isVector());
	test.ok(oper.isMatrix());
	test.deepEqual(oper.shape(), [ 2 , 3 ]);
	test.deepEqual(oper.value(), [ [ 7, 16, 27 ], [ 40, 55, 72 ] ]);
	
	var result = oper.evaluate();
		
	test.ok(!oper.isNumber());
	test.ok(!oper.isVector());
	test.ok(oper.isMatrix());
	test.deepEqual(oper.shape(), [ 2 , 3 ]);
	test.deepEqual(oper.value(), [ [ 7, 16, 27 ], [ 40, 55, 72 ] ]);
};

