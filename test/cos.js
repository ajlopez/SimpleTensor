
var st = require('..');

exports['acos number'] = function (test) {
	var number = st.constant(1.5);
	
	var oper = st.cos(number);
	
	test.ok(oper.isNumber());
	test.ok(!oper.isVector());
	test.ok(!oper.isMatrix());
	test.deepEqual(oper.shape(), []);
	
	test.equal(oper.value(), Math.cos(1.5));
	
	var result = oper.evaluate();
	
	test.ok(result.isNumber());
	test.ok(!result.isVector());
	test.ok(!result.isMatrix());
	test.deepEqual(result.shape(), []);
	test.equal(result.value(), Math.cos(1.5));
};

exports['acos vector'] = function (test) {
	var value = st.constant([ -1, 2.5, -0.3 ]);
	
	var oper = st.cos(value);
	
	test.ok(!oper.isNumber());
	test.ok(oper.isVector());
	test.ok(!oper.isMatrix());
	test.deepEqual(oper.shape(), [ 3 ]);
	
	test.deepEqual(oper.value(), [ Math.cos(-1), Math.cos(2.5), Math.cos(-0.3) ]);
	
	var result = oper.evaluate();
	
	test.ok(!result.isNumber());
	test.ok(result.isVector());
	test.ok(!result.isMatrix());
	test.deepEqual(result.shape(), [ 3 ]);
	test.deepEqual(result.value(), [ Math.cos(-1), Math.cos(2.5), Math.cos(-0.3) ]);
};

exports['acos matrix'] = function (test) {
	var value = st.constant([ [ 3.5, -0.2, 1 ], [ 1, -0.2, 0.3 ] ]);
	
	var oper = st.cos(value);
	
	test.ok(!oper.isNumber());
	test.ok(!oper.isVector());
	test.ok(oper.isMatrix());
	test.deepEqual(oper.shape(), [ 2, 3 ]);
	
	test.deepEqual(oper.value(), [ [ Math.cos(3.5), Math.cos(-0.2), Math.cos(1) ], [ Math.cos(1), Math.cos(-0.2), Math.cos(0.3) ] ]);
	
	var result = oper.evaluate();
	
	test.ok(!result.isNumber());
	test.ok(!result.isVector());
	test.ok(result.isMatrix());
	test.deepEqual(result.shape(), [ 2, 3 ]);
	test.deepEqual(result.value(), [ [ Math.cos(3.5), Math.cos(-0.2), Math.cos(1) ], [ Math.cos(1), Math.cos(-0.2), Math.cos(0.3) ] ]);
};

