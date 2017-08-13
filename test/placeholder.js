
var st = require('..');

exports['evaluate number in placeholder'] = function (test) {
	var result = st.placeholder('x', []);
	
	test.ok(result);
	test.equal(result.rank(), 0);
	test.equal(result.value(), null);

	test.ok(result.isNumber());
	test.ok(!result.isVector());
	test.ok(!result.isMatrix());
	
	test.equal(result.evaluate({ x: 42 }).value(), 42);
	test.equal(result.evaluate({ y: 42 }), null);
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
	
	test.deepEqual(result.evaluate({ x: [ 1, 2, 3 ] }).value(), [ 1, 2, 3 ]);
	test.equal(result.evaluate({ y: 42 }), null);
};
