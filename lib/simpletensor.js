
function createShapedValue(value, shape) {
	if (shape.length === 0)
		return value;
	
	var l = shape[0];
	var subshape = shape.slice(1);
	
	var result = [];
	
	for (var k = 0; k < l; k++)
		result[k] = createShapedValue(value, subshape);
	
	return result;
}

function Value(value, options) {
	options = options || {};
	var shape;
	
	if (options.shape) {
		shape = options.shape.slice();
		value = createShapedValue(value, shape);
	}
	else {
		shape = [];
		var v = value;
		
		while (Array.isArray(v)) {
			shape.push(v.length);
			v = v[0];
		}
	}
	
	this.value = function () { return value; };
	this.rank = function () { return shape.length; };
	this.shape = function () { return shape; };
};

function createConstant(value, options) {
	return new Value(value, options);
}

module.exports = {
	constant: createConstant
}