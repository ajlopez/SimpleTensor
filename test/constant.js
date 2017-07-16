
var st = require('..');

exports['create constant rank 0'] = function (test) {
	var result = st.constant(42);
	
	test.ok(result);
	test.equal(result.rank(), 0);
	test.equal(result.value(), 42);
};

exports['create constant shape []'] = function (test) {
	var result = st.constant(42);
	
	test.ok(result);
	test.deepEqual(result.shape(), []);
	test.equal(result.value(), 42);
};

exports['create vector constant'] = function (test) {
	var result = st.constant([ 1, 2, 3, 5, 7, 42 ]);
	
	test.ok(result);
	test.deepEqual(result.shape(), [ 6 ]);
	test.deepEqual(result.value(), [ 1, 2, 3, 5, 7, 42 ]);
};

