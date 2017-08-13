
var st = require('..');

exports['pow numbers'] = function (test) {
	var number1 = st.constant(12);
	var number2 = st.constant(2);
	
	var oper = st.pow(number1, number2);
	
	test.ok(oper.isNumber());
	test.ok(!oper.isVector());
	test.ok(!oper.isMatrix());
	test.deepEqual(oper.shape(), []);
	
	test.equal(oper.value(), 144);
	
	var result = oper.evaluate();
	
	test.ok(result.isNumber());
	test.ok(!result.isVector());
	test.ok(!result.isMatrix());
	test.deepEqual(result.shape(), []);
	test.equal(result.value(), 144);
};

exports['pow vectors'] = function (test) {
	var vector1 = st.constant([ 2, 3, 4 ]);
	var vector2 = st.constant([ 2, 3, 1 ]);
	
	var oper = st.pow(vector1, vector2);
	
	test.ok(!oper.isNumber());
	test.ok(oper.isVector());
	test.ok(!oper.isMatrix());
	test.deepEqual(oper.shape(), [ 3 ]);
	
	test.deepEqual(oper.value(), [ 4, 27, 4 ]);
	
	var result = oper.evaluate();
	
	test.ok(!result.isNumber());
	test.ok(result.isVector());
	test.ok(!result.isMatrix());
	test.deepEqual(result.shape(), [ 3 ]);
	test.deepEqual(result.value(), [ 4, 27, 4 ]);
};
