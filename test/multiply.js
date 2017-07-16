
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
};

