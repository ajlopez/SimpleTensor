
function Value(value) {
	this.value = function () { return value; };
	this.rank = function () { return 0; };
	this.shape = function () { return []; };
};

function createConstant(value) {
	return new Value(value);
}

module.exports = {
	constant: createConstant
}