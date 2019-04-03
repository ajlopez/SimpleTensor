
var st = require('..');

exports['math package'] = function (test) {
    test.ok(st.math);
    test.equal(typeof st.math, 'object');
    test.equal(st.math.abs, st.abs);
    test.equal(st.math.cos, st.cos);
    test.equal(st.math.sin, st.sin);
    test.equal(st.math.tan, st.tan);
    test.equal(st.math.acos, st.acos);
    test.equal(st.math.asin, st.asin);
    test.equal(st.math.atan, st.atan);
};
