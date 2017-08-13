
var st = require('..');

exports['evaluate placeholder'] = function (test) {
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
