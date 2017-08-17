
var st = require('..');

exports['ceil number'] = function (test) {
	var number = st.constant(41.5);
	
	var oper = st.ceil(number);
	
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

exports['ceil vector'] = function (test) {
	var value = st.constant([ 1.5, 2.6, 3.7 ]);
	
	var oper = st.ceil(value);
	
	test.ok(!oper.isNumber());
	test.ok(oper.isVector());
	test.ok(!oper.isMatrix());
	test.deepEqual(oper.shape(), [ 3 ]);
	
	test.deepEqual(oper.value(), [ 2, 3, 4 ]);
	
	var result = oper.evaluate();
	
	test.ok(!result.isNumber());
	test.ok(result.isVector());
	test.ok(!result.isMatrix());
	test.deepEqual(result.shape(), [ 3 ]);
	test.deepEqual(result.value(), [ 2, 3, 4 ]);
};

exports['ceil matrix'] = function (test) {
	var value = st.constant([ [ 1.5, 2.6, 3.7 ], [ 1, 2, 3 ] ]);
	
	var oper = st.ceil(value);
	
	test.ok(!oper.isNumber());
	test.ok(!oper.isVector());
	test.ok(oper.isMatrix());
	test.deepEqual(oper.shape(), [ 2, 3 ]);
	
	test.deepEqual(oper.value(), [ [ 2, 3, 4 ], [ 1, 2, 3 ] ]);
	
	var result = oper.evaluate();
	
	test.ok(!result.isNumber());
	test.ok(!result.isVector());
	test.ok(result.isMatrix());
	test.deepEqual(result.shape(), [ 2, 3 ]);
	test.deepEqual(result.value(), [ [ 2, 3, 4 ], [ 1, 2, 3 ] ]);
};

