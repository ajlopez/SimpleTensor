
var st = require('..');

exports['evaluate number in placeholder'] = function (test) {
	var result = st.placeholder('x', []);
	
	test.ok(result);
	test.equal(result.rank(), 0);
	test.equal(result.value(), null);

	test.ok(result.isNumber());
	test.ok(!result.isVector());
	test.ok(!result.isMatrix());
	
	test.ok(result.context({ x: st.constant(42) }));
	test.equal(result.evaluate().value(), 42);

	test.ok(result.context({ y: st.constant(42) }));
	test.equal(result.evaluate(), null);
};

exports['evaluate vector in placeholder'] = function (test) {
	var result = st.placeholder('x', [ 3 ]);
	
	test.ok(result);
	test.equal(result.rank(), 1);
	test.deepEqual(result.shape(), [ 3 ]);
	test.equal(result.value(), null);

	test.ok(!result.isNumber());
	test.ok(result.isVector());
	test.ok(!result.isMatrix());
	
	test.ok(result.context({ x: st.constant([ 1, 2, 3 ]) }));
	test.deepEqual(result.evaluate().value(), [ 1, 2, 3 ]);
	
	test.ok(result.context({ y: 42 }));
	test.equal(result.evaluate(), null);
};

exports['evaluate matrix in placeholder'] = function (test) {
	var result = st.placeholder('x', [ 3, 2 ]);
	
	test.ok(result);
	test.equal(result.rank(), 2);
	test.deepEqual(result.shape(), [ 3, 2 ]);
	test.equal(result.value(), null);

	test.ok(!result.isNumber());
	test.ok(!result.isVector());
	test.ok(result.isMatrix());
	
	test.ok(result.context({ x: st.constant([ [ 1, 2, 3 ], [ 4, 5, 6 ] ] ) }));
	test.deepEqual(result.evaluate().value(), [ [ 1, 2, 3 ], [ 4, 5, 6 ] ]);
	
	test.ok(result.context({ y: st.constant(42) }));
	test.equal(result.evaluate(), null);
};
