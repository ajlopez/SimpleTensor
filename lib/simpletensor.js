
function Value(value) {
	var shape = [];
	
	if (Array.isArray(value))
		shape = [ value.length ];
	
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