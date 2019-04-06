
var st = require('..');

exports['sinh number'] = function (test) {
	var number = st.constant(1.5);
	
	var oper = st.sinh(number);
	
	test.ok(oper.isNumber());
	test.ok(!oper.isVector());
	test.ok(!oper.isMatrix());
	test.deepEqual(oper.shape(), []);
	
	test.equal(oper.value(), Math.sinh(1.5));
	
	var result = oper.evaluate();
	
	test.ok(result.isNumber());
	test.ok(!result.isVector());
	test.ok(!result.isMatrix());
	test.deepEqual(result.shape(), []);
	test.equal(result.value(), Math.sinh(1.5));
};

exports['sinh vector'] = function (test) {
	var value = st.constant([ -1, 2.5, -0.3 ]);
	
	var oper = st.sinh(value);
	
	test.ok(!oper.isNumber());
	test.ok(oper.isVector());
	test.ok(!oper.isMatrix());
	test.deepEqual(oper.shape(), [ 3 ]);
	
	test.deepEqual(oper.value(), [ Math.sinh(-1), Math.sinh(2.5), Math.sinh(-0.3) ]);
	
	var result = oper.evaluate();
	
	test.ok(!result.isNumber());
	test.ok(result.isVector());
	test.ok(!result.isMatrix());
	test.deepEqual(result.shape(), [ 3 ]);
	test.deepEqual(result.value(), [ Math.sinh(-1), Math.sinh(2.5), Math.sinh(-0.3) ]);
};

exports['sinh matrix'] = function (test) {
	var value = st.constant([ [ 3.5, -0.2, 1 ], [ 1, -0.2, 0.3 ] ]);
	
	var oper = st.sinh(value);
	
	test.ok(!oper.isNumber());
	test.ok(!oper.isVector());
	test.ok(oper.isMatrix());
	test.deepEqual(oper.shape(), [ 2, 3 ]);
	
	test.deepEqual(oper.value(), [ [ Math.sinh(3.5), Math.sinh(-0.2), Math.sinh(1) ], [ Math.sinh(1), Math.sinh(-0.2), Math.sinh(0.3) ] ]);
	
	var result = oper.evaluate();
	
	test.ok(!result.isNumber());
	test.ok(!result.isVector());
	test.ok(result.isMatrix());
	test.deepEqual(result.shape(), [ 2, 3 ]);
	test.deepEqual(result.value(), [ [ Math.sinh(3.5), Math.sinh(-0.2), Math.sinh(1) ], [ Math.sinh(1), Math.sinh(-0.2), Math.sinh(0.3) ] ]);
};

