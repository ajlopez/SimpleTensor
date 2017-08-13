
var st = require('..');

exports['session run constant'] = function (test) {
	var sess = st.session();
	var x = st.constant(42);
	
	test.equal(sess.run(x), 42);
};

