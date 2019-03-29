
var st = require('..');

exports['tan number'] = function (test) {
	var number = st.constant(0.5);
	
	var oper = st.tan(number);
	
	test.ok(oper.isNumber());
	test.ok(!oper.isVector());
	test.ok(!oper.isMatrix());
	test.deepEqual(oper.shape(), []);
	
	test.equal(oper.value(), Math.tan(0.5));
	
	var result = oper.evaluate();
	
	test.ok(result.isNumber());
	test.ok(!result.isVector());
	test.ok(!result.isMatrix());
	test.deepEqual(result.shape(), []);
	test.equal(result.value(), Math.tan(0.5));
};

exports['tan vector'] = function (test) {
	var value = st.constant([ -1, 0.5, -0.3 ]);
	
	var oper = st.tan(value);
	
	test.ok(!oper.isNumber());
	test.ok(oper.isVector());
	test.ok(!oper.isMatrix());
	test.deepEqual(oper.shape(), [ 3 ]);
	
	test.deepEqual(oper.value(), [ Math.tan(-1), Math.tan(0.5), Math.tan(-0.3) ]);
	
	var result = oper.evaluate();
	
	test.ok(!result.isNumber());
	test.ok(result.isVector());
	test.ok(!result.isMatrix());
	test.deepEqual(result.shape(), [ 3 ]);
	test.deepEqual(result.value(), [ Math.tan(-1), Math.tan(0.5), Math.tan(-0.3) ]);
};

exports['tan matrix'] = function (test) {
	var value = st.constant([ [ 0.5, -0.2, 1 ], [ 1, -0.2, 0.3 ] ]);
	
	var oper = st.tan(value);
	
	test.ok(!oper.isNumber());
	test.ok(!oper.isVector());
	test.ok(oper.isMatrix());
	test.deepEqual(oper.shape(), [ 2, 3 ]);
	
	test.deepEqual(oper.value(), [ [ Math.tan(0.5), Math.tan(-0.2), Math.tan(1) ], [ Math.tan(1), Math.tan(-0.2), Math.tan(0.3) ] ]);
	
	var result = oper.evaluate();
	
	test.ok(!result.isNumber());
	test.ok(!result.isVector());
	test.ok(result.isMatrix());
	test.deepEqual(result.shape(), [ 2, 3 ]);
	test.deepEqual(result.value(), [ [ Math.tan(0.5), Math.tan(-0.2), Math.tan(1) ], [ Math.tan(1), Math.tan(-0.2), Math.tan(0.3) ] ]);
};

