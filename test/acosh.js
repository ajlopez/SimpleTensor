
var st = require('..');

exports['acosh number'] = function (test) {
	var number = st.constant(1.5);
	
	var oper = st.acosh(number);
	
	test.ok(oper.isNumber());
	test.ok(!oper.isVector());
	test.ok(!oper.isMatrix());
	test.deepEqual(oper.shape(), []);
	
	test.equal(oper.value(), Math.acosh(1.5));
	
	var result = oper.evaluate();
	
	test.ok(result.isNumber());
	test.ok(!result.isVector());
	test.ok(!result.isMatrix());
	test.deepEqual(result.shape(), []);
	test.equal(result.value(), Math.acosh(1.5));
};

exports['acosh vector'] = function (test) {
	var value = st.constant([ 1, 1.5, 1.3 ]);
	
	var oper = st.acosh(value);
	
	test.ok(!oper.isNumber());
	test.ok(oper.isVector());
	test.ok(!oper.isMatrix());
	test.deepEqual(oper.shape(), [ 3 ]);
	
	test.deepEqual(oper.value(), [ Math.acosh(1), Math.acosh(1.5), Math.acosh(1.3) ]);
	
	var result = oper.evaluate();
	
	test.ok(!result.isNumber());
	test.ok(result.isVector());
	test.ok(!result.isMatrix());
	test.deepEqual(result.shape(), [ 3 ]);
	test.deepEqual(result.value(), [ Math.acosh(1), Math.acosh(1.5), Math.acosh(1.3) ]);
};

exports['acosh matrix'] = function (test) {
	var value = st.constant([ [ 1.5, 1.2, 1 ], [ 1, 1.2, 1.3 ] ]);
	
	var oper = st.acosh(value);
	
	test.ok(!oper.isNumber());
	test.ok(!oper.isVector());
	test.ok(oper.isMatrix());
	test.deepEqual(oper.shape(), [ 2, 3 ]);
	
	test.deepEqual(oper.value(), [ [ Math.acosh(1.5), Math.acosh(1.2), Math.acosh(1) ], [ Math.acosh(1), Math.acosh(1.2), Math.acosh(1.3) ] ]);
	
	var result = oper.evaluate();
	
	test.ok(!result.isNumber());
	test.ok(!result.isVector());
	test.ok(result.isMatrix());
	test.deepEqual(result.shape(), [ 2, 3 ]);
	test.deepEqual(result.value(), [ [ Math.acosh(1.5), Math.acosh(1.2), Math.acosh(1) ], [ Math.acosh(1), Math.acosh(1.2), Math.acosh(1.3) ] ]);
};

