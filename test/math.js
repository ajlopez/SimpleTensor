
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
    
    test.equal(st.math.cosh, st.cosh);
    test.equal(st.math.sinh, st.sinh);
    test.equal(st.math.tanh, st.tanh);
    
    test.equal(st.math.acosh, st.acosh);
    test.equal(st.math.asinh, st.asinh);
    test.equal(st.math.atanh, st.atanh);
};
