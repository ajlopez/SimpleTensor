
var st = require('..');

exports['sin number'] = function (test) {
	var number = st.constant(1.5);
	
	var oper = st.sin(number);
	
	test.ok(oper.isNumber());
	test.ok(!oper.isVector());
	test.ok(!oper.isMatrix());
	test.deepEqual(oper.shape(), []);
	
	test.equal(oper.value(), Math.sin(1.5));
	
	var result = oper.evaluate();
	
	test.ok(result.isNumber());
	test.ok(!result.isVector());
	test.ok(!result.isMatrix());
	test.deepEqual(result.shape(), []);
	test.equal(result.value(), Math.sin(1.5));
};

exports['sin vector'] = function (test) {
	var value = st.constant([ -1, 2.5, -0.3 ]);
	
	var oper = st.sin(value);
	
	test.ok(!oper.isNumber());
	test.ok(oper.isVector());
	test.ok(!oper.isMatrix());
	test.deepEqual(oper.shape(), [ 3 ]);
	
	test.deepEqual(oper.value(), [ Math.sin(-1), Math.sin(2.5), Math.sin(-0.3) ]);
	
	var result = oper.evaluate();
	
	test.ok(!result.isNumber());
	test.ok(result.isVector());
	test.ok(!result.isMatrix());
	test.deepEqual(result.shape(), [ 3 ]);
	test.deepEqual(result.value(), [ Math.sin(-1), Math.sin(2.5), Math.sin(-0.3) ]);
};

exports['sin matrix'] = function (test) {
	var value = st.constant([ [ 3.5, -0.2, 1 ], [ 1, -0.2, 0.3 ] ]);
	
	var oper = st.sin(value);
	
	test.ok(!oper.isNumber());
	test.ok(!oper.isVector());
	test.ok(oper.isMatrix());
	test.deepEqual(oper.shape(), [ 2, 3 ]);
	
	test.deepEqual(oper.value(), [ [ Math.sin(3.5), Math.sin(-0.2), Math.sin(1) ], [ Math.sin(1), Math.sin(-0.2), Math.sin(0.3) ] ]);
	
	var result = oper.evaluate();
	
	test.ok(!result.isNumber());
	test.ok(!result.isVector());
	test.ok(result.isMatrix());
	test.deepEqual(result.shape(), [ 2, 3 ]);
	test.deepEqual(result.value(), [ [ Math.sin(3.5), Math.sin(-0.2), Math.sin(1) ], [ Math.sin(1), Math.sin(-0.2), Math.sin(0.3) ] ]);
};

