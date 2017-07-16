
function Value(value) {
	var shape = [];
	
	var v = value;
	
	while (Array.isArray(v)) {
		shape.push(v.length);
		v = v[0];
	}
	
	this.value = function () { return value; };
	this.rank = function () { return shape.length; };
	this.shape = function () { return shape; };
};

function createConstant(value) {
	return new Value(value);
}

module.exports = {
	constant: createConstant
}