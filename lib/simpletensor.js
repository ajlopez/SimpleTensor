
function Value(value) {
	this.value = function () { return value; };
	this.rank = function () { return 0; };
};

function createConstant(value) {
	return new Value(value);
}

module.exports = {
	constant: createConstant
}