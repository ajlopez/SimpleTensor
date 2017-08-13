
var st = require('..');

exports['session run constant'] = function (test) {
	var sess = st.session();
	var x = st.constant(42);
	
	test.equal(sess.run(x), 42);
};

exports['session run placeholder using context'] = function (test) {
	var sess = st.session();
	var x = st.placeholder('x', []);
	
	test.equal(sess.run(x, { context: { x: 42 } }), 42);
};
