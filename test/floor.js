
var st = require('..');

exports['floor number'] = function (test) {
	var number = st.constant(42.5);
	
	var oper = st.floor(number);
	
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

exports['floor vector'] = function (test) {
	var value = st.constant([ 1.5, 2.6, 3.7 ]);
	
	var oper = st.floor(value);
	
	test.ok(!oper.isNumber());
	test.ok(oper.isVector());
	test.ok(!oper.isMatrix());
	test.deepEqual(oper.shape(), [ 3 ]);
	
	test.deepEqual(oper.value(), [ 1, 2, 3 ]);
	
	var result = oper.evaluate();
	
	test.ok(!result.isNumber());
	test.ok(result.isVector());
	test.ok(!result.isMatrix());
	test.deepEqual(result.shape(), [ 3 ]);
	test.deepEqual(result.value(), [ 1, 2, 3 ]);
};

exports['floor matrix'] = function (test) {
	var value = st.constant([ [ 1.5, 2.6, 3.7 ], [ 1, 2, 3 ] ]);
	
	var oper = st.floor(value);
	
	test.ok(!oper.isNumber());
	test.ok(!oper.isVector());
	test.ok(oper.isMatrix());
	test.deepEqual(oper.shape(), [ 2, 3 ]);
	
	test.deepEqual(oper.value(), [ [ 1, 2, 3 ], [ 1, 2, 3 ] ]);
	
	var result = oper.evaluate();
	
	test.ok(!result.isNumber());
	test.ok(!result.isVector());
	test.ok(result.isMatrix());
	test.deepEqual(result.shape(), [ 2, 3 ]);
	test.deepEqual(result.value(), [ [ 1, 2, 3 ], [ 1, 2, 3 ] ]);
};

