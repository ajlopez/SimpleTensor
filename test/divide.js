
var st = require('..');

exports['divide numbers'] = function (test) {
	var number1 = st.constant(2);
	var number2 = st.constant(21);
	
	var oper = st.divide(number1, number2);
	
	test.ok(oper.isNumber());
	test.ok(!oper.isVector());
	test.ok(!oper.isMatrix());
	test.deepEqual(oper.shape(), []);
	
	test.equal(oper.value(), 2 / 21);
	
	var result = oper.evaluate();
	
	test.ok(result.isNumber());
	test.ok(!result.isVector());
	test.ok(!result.isMatrix());
	test.deepEqual(result.shape(), []);
	test.equal(result.value(), 2 / 21);
};

exports['divide number by vector'] = function (test) {
	var value1 = st.constant(2);
	var value2 = st.constant([ 1, 2, 3, 21 ]);
	
	var oper = st.divide(value1, value2);
	
	test.ok(!oper.isNumber());
	test.ok(oper.isVector());
	test.ok(!oper.isMatrix());
	test.deepEqual(oper.shape(), [ 4 ]);
	test.deepEqual(oper.value(), [ 2, 1, 2/3, 2/21 ]);
	
	var result = oper.evaluate();
	
	test.ok(!result.isNumber());
	test.ok(result.isVector());
	test.ok(!result.isMatrix());
	test.deepEqual(result.shape(), [ 4 ]);
	test.deepEqual(result.value(), [ 2, 1, 2/3, 2/21 ]);
};

exports['divide vector by number'] = function (test) {
	var value1 = st.constant([ 1, 2, 3, 21 ]);
	var value2 = st.constant(2);
	
	var oper = st.divide(value1, value2);
	
	test.ok(!oper.isNumber());
	test.ok(oper.isVector());
	test.ok(!oper.isMatrix());
	test.deepEqual(oper.shape(), [ 4 ]);
	test.deepEqual(oper.value(), [ 1/2, 1, 3/2, 21/2 ]);
	
	var result = oper.evaluate();
	
	test.ok(!result.isNumber());
	test.ok(result.isVector());
	test.ok(!result.isMatrix());
	test.deepEqual(result.shape(), [ 4 ]);
	test.deepEqual(result.value(), [ 1/2, 1, 3/2, 21/2 ]);
};

exports['divide vector by vector'] = function (test) {
	var value1 = st.constant([ 1, 2, 3 ]);
	var value2 = st.constant([ 2, 3, 4 ]);
	
	var oper = st.divide(value1, value2);
	
	test.ok(!oper.isNumber());
	test.ok(oper.isVector());
	test.ok(!oper.isMatrix());
	test.deepEqual(oper.shape(), [ 3 ]);
	test.deepEqual(oper.value(), [ 1/2, 2/3, 3/4 ]);
	
	var result = oper.evaluate();
		
	test.ok(!oper.isNumber());
	test.ok(oper.isVector());
	test.ok(!oper.isMatrix());
	test.deepEqual(oper.shape(), [ 3 ]);
	test.deepEqual(oper.value(), [ 1/2, 2/3, 3/4 ]);
};

exports['divide matrix by matrix'] = function (test) {
	var value1 = st.constant([ [ 1, 2, 3 ], [ 4, 5, 6 ] ]);
	var value2 = st.constant([ [ 7, 8, 9 ], [ 10, 11, 12 ] ]);
	
	var oper = st.divide(value1, value2);
	
	test.ok(!oper.isNumber());
	test.ok(!oper.isVector());
	test.ok(oper.isMatrix());
	test.deepEqual(oper.shape(), [ 2 , 3 ]);
	test.deepEqual(oper.value(), [ [ 1/7, 1/4, 1/3 ], [ 2/5, 5/11, 1/2 ] ]);
	
	var result = oper.evaluate();
		
	test.ok(!oper.isNumber());
	test.ok(!oper.isVector());
	test.ok(oper.isMatrix());
	test.deepEqual(oper.shape(), [ 2 , 3 ]);
	test.deepEqual(oper.value(), [ [ 1/7, 1/4, 1/3 ], [ 2/5, 5/11, 1/2 ] ]);
};

