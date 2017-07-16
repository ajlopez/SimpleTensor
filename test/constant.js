
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

exports['create matrix constant'] = function (test) {
	var result = st.constant([ [ 1, 2, 3 ], [ 5, 7, 42 ] ]);
	
	test.ok(result);
	test.deepEqual(result.shape(), [ 2, 3 ]);
	test.deepEqual(result.value(), [ [ 1, 2, 3 ], [ 5, 7, 42 ] ]);
};

exports['create constant using value and shape option'] = function (test) {
	var result = st.constant(0, { shape: [ 2, 3 ] });
	
	test.ok(result);
	test.deepEqual(result.shape(), [ 2, 3 ]);
	test.deepEqual(result.value(), [ [ 0, 0, 0 ], [ 0, 0, 0 ] ]);
};

exports['determinant from simple 2x2 matrix'] = function (test) {
	var result = st.constant([ [ 1, 2 ], [ 3, 4 ] ]);
	
	test.ok(result);
	test.equal(result.determinant(), -2);
};

exports['determinant from simple 3x3 matrix'] = function (test) {
	var result = st.constant([ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ]);
	
	test.ok(result);
	test.equal(result.determinant(), 0);
};
