
var st = require('..');

exports['cosh number'] = function (test) {
	var number = st.constant(1.5);
	
	var oper = st.cosh(number);
	
	test.ok(oper.isNumber());
	test.ok(!oper.isVector());
	test.ok(!oper.isMatrix());
	test.deepEqual(oper.shape(), []);
	
	test.equal(oper.value(), Math.cosh(1.5));
	
	var result = oper.evaluate();
	
	test.ok(result.isNumber());
	test.ok(!result.isVector());
	test.ok(!result.isMatrix());
	test.deepEqual(result.shape(), []);
	test.equal(result.value(), Math.cosh(1.5));
};

exports['cosh vector'] = function (test) {
	var value = st.constant([ -1, 2.5, -0.3 ]);
	
	var oper = st.cosh(value);
	
	test.ok(!oper.isNumber());
	test.ok(oper.isVector());
	test.ok(!oper.isMatrix());
	test.deepEqual(oper.shape(), [ 3 ]);
	
	test.deepEqual(oper.value(), [ Math.cosh(-1), Math.cosh(2.5), Math.cosh(-0.3) ]);
	
	var result = oper.evaluate();
	
	test.ok(!result.isNumber());
	test.ok(result.isVector());
	test.ok(!result.isMatrix());
	test.deepEqual(result.shape(), [ 3 ]);
	test.deepEqual(result.value(), [ Math.cosh(-1), Math.cosh(2.5), Math.cosh(-0.3) ]);
};

exports['cosh matrix'] = function (test) {
	var value = st.constant([ [ 3.5, -0.2, 1 ], [ 1, -0.2, 0.3 ] ]);
	
	var oper = st.cosh(value);
	
	test.ok(!oper.isNumber());
	test.ok(!oper.isVector());
	test.ok(oper.isMatrix());
	test.deepEqual(oper.shape(), [ 2, 3 ]);
	
	test.deepEqual(oper.value(), [ [ Math.cosh(3.5), Math.cosh(-0.2), Math.cosh(1) ], [ Math.cosh(1), Math.cosh(-0.2), Math.cosh(0.3) ] ]);
	
	var result = oper.evaluate();
	
	test.ok(!result.isNumber());
	test.ok(!result.isVector());
	test.ok(result.isMatrix());
	test.deepEqual(result.shape(), [ 2, 3 ]);
	test.deepEqual(result.value(), [ [ Math.cosh(3.5), Math.cosh(-0.2), Math.cosh(1) ], [ Math.cosh(1), Math.cosh(-0.2), Math.cosh(0.3) ] ]);
};

