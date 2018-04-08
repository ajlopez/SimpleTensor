
var st = require('..');

exports['session run constant'] = function (test) {
	var sess = st.session();
	var x = st.constant(42);
	
	test.equal(sess.run(x).value(), 42);
};

exports['session run placeholder using context'] = function (test) {
	var sess = st.session();
	var x = st.placeholder('x', []);
	
	test.equal(sess.run(x, { context: { x: st.constant(42) } }).value(), 42);
};

exports['session run add operation with placeholders using context'] = function (test) {
	var sess = st.session();
	var x = st.placeholder('x', []);
	var add = st.add(x, x);
	
	test.equal(sess.run(add, { context: { x: st.constant(21) } }).value(), 42);
};

exports['session run add operation with vectors in placeholders'] = function (test) {
	var sess = st.session();
	var x = st.placeholder('x', [ 3 ]);
	var y = st.placeholder('y', [ 3 ]);
	var add = st.add(x, y);
	
	test.deepEqual(sess.run(add, { context: { x: st.constant([ 1, 2, 3 ]), y: st.constant([ 4, 5, 6 ]) } }).value(), [ 5, 7, 9 ]);
};
