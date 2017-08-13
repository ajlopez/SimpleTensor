
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

function isSquareMatrix(shape) {
	return !(!shape || shape.length !== 2 || shape[0] !== shape[1]);
}

function subvalues(values, x) {
	var result = [];
	var l = values.length;
	
	for (var k = 0; k < l; k++) {
		if (k === x)
			continue;
		
		result.push(values[k].slice(1));
	}
	
	return result;
}

function determinant(values) {
	if (!Array.isArray(values))
		return values;
	
	if (values.length === 1)
		return values[0];
	
	var l = values.length;
	var result = 0;

	for (var k = 0; k < l; k++) {
		var d = determinant(subvalues(values, k));
		
		if (k % 2)
			result -= values[k][0] * d;
		else
			result += values[k][0] * d;
	}
	
	return result;
}

function multiply(matrix1, matrix2) {
	var result = [];
	
	for (var k = 0; k < matrix1.length; k++) {
		result[k] = [];
		
		for (var j = 0; j < matrix2[0].length; j++) {
			var total = 0;
			
			for (var i = 0; i < matrix1[k].length; i++)
				total += matrix1[k][i] * matrix2[i][j];
			
			result[k][j] = total;
		}
	}
	
	return result;
}

function add(matrix1, matrix2) {
	var result = [];
	
	for (var k = 0; k < matrix1.length; k++) {
		result[k] = [];
		
		for (var j = 0; j < matrix1[0].length; j++)
			result[k][j] = matrix1[k][j] + matrix2[k][j];
	}
	
	return result;
}

function subtract(matrix1, matrix2) {
	var result = [];
	
	for (var k = 0; k < matrix1.length; k++) {
		result[k] = [];
		
		for (var j = 0; j < matrix1[0].length; j++)
			result[k][j] = matrix1[k][j] - matrix2[k][j];
	}
	
	return result;
}

function multiply(matrix1, matrix2) {
	var result = [];
	
	var nrows = matrix1.length;
	var ncols = matrix2[0].length;
	var nterms = matrix1[0].length;
	
	for (var k = 0; k < nrows; k++)
		for (var j = 0; j < ncols; j++) {
			var value = 0;
			
			for (var l = 0; l < nterms; l++)
				value += matrix1[k][l] * matrix2[l][j];
			
			if (!result[k])
				result[k] = [];
			
			result[k][j] = value;
		}
	
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
	
	this.isNumber = function() { return shape.length === 0; };
	this.isVector = function() { return shape.length === 1; };
	this.isMatrix = function() { return shape.length === 2; };
	
	this.multiply = function (matrix) {
		var newvalue = multiply(value, matrix.value());
		return createConstantValue(newvalue);
	}
	
	if (isSquareMatrix(shape)) {
		this.determinant = function () { return determinant(value); };
		this.isSquareMatrix = function () { return true; };
	}
	else if (shape.length === 2)
		this.isSquareMatrix = function () { return false; };
	
	this.evaluate = function () { return this.value(); };
};

function AddOperation(left, right) {
	if (left.isNumber()) {
		if (right.isNumber()) {
			this.shape = function () { return []; };
			this.isNumber = function () { return true; };
			this.isVector = function () { return false; };
			this.isMatrix = function () { return false; };
			this.value = function () { return left.value() + right.value(); }
		}	
	}
	else if (left.isVector()) {
		if (right.isVector()) {
			var shape = left.shape();
			
			this.shape = function () { return shape; };
			this.isNumber = function () { return false; };
			this.isVector = function () { return true; };
			this.isMatrix = function () { return false; };

			this.value = function () { 
				var value1 = left.value();
				var value2 = right.value();
				var l = value1.length;
				
				var result = [];
				
				for (var k = 0; k < l; k++)
					result[k] = value1[k] + value2[k];
				
				return result;
			};
		}
	}
	else if (left.isMatrix()) {
		if (right.isMatrix()) {
			var shape = left.shape();
			
			this.shape = function () { return shape; };
			this.isNumber = function () { return false; };
			this.isVector = function () { return false; };
			this.isMatrix = function () { return true; };

			this.value = function () { 
				var value1 = left.value();
				var value2 = right.value();
				
				return add(value1, value2);
			};
		}
	}

	this.evaluate = function () { return createConstantValue(this.value()); };
}

function SubtractOperation(left, right) {
	if (left.isNumber()) {
		if (right.isNumber()) {
			this.shape = function () { return []; };
			this.isNumber = function () { return true; };
			this.isVector = function () { return false; };
			this.isMatrix = function () { return false; };
			this.value = function () { return left.value() - right.value(); }
		}	
	}
	else if (left.isVector()) {
		if (right.isVector()) {
			var shape = left.shape();
			
			this.shape = function () { return shape; };
			this.isNumber = function () { return false; };
			this.isVector = function () { return true; };
			this.isMatrix = function () { return false; };

			this.value = function () { 
				var value1 = left.value();
				var value2 = right.value();
				var l = value1.length;
				
				var result = [];
				
				for (var k = 0; k < l; k++)
					result[k] = value1[k] - value2[k];
				
				return result;
			};
		}
	}
	else if (left.isMatrix()) {
		if (right.isMatrix()) {
			var shape = left.shape();
			
			this.shape = function () { return shape; };
			this.isNumber = function () { return false; };
			this.isVector = function () { return false; };
			this.isMatrix = function () { return true; };

			this.value = function () { 
				var value1 = left.value();
				var value2 = right.value();
				
				return subtract(value1, value2);
			};
		}
	}

	this.evaluate = function () { return createConstantValue(this.value()); };
}

function MultiplyOperation(left, right) {
	if (left.isNumber()) {
		if (right.isNumber()) {
			this.shape = function () { return []; };
			this.isNumber = function () { return true; };
			this.isVector = function () { return false; };
			this.isMatrix = function () { return false; };
			this.value = function () { return left.value() * right.value(); }
		}
		else if (right.isVector()) {
			var shape = right.shape();
			this.shape = function () { return shape; };
			this.isNumber = function () { return false; };
			this.isVector = function () { return true; };
			this.isMatrix = function () { return false; };
			
			this.value = function () { 
				var number = left.value();
				var vector = right.value();
				return vector.map(function (value) { return value * number });
			};
		}
	}
	else if (left.isVector()) {
		if (right.isNumber()) {
			var shape = left.shape();
			this.shape = function () { return shape; };
			this.isNumber = function () { return false; };
			this.isVector = function () { return true; };
			this.isMatrix = function () { return false; };

			this.value = function () { 
				var vector = left.value();
				var number = right.value();
				return vector.map(function (value) { return value * number });
			};
		}
		else if (right.isVector()) {
			this.shape = function () { return []; };
			this.isNumber = function () { return true; };
			this.isVector = function () { return false; };
			this.isMatrix = function () { return false; };

			this.value = function () { 
				var vector1 = left.value();
				var vector2 = right.value();
				var l = vector1.length;
				var result = 0;
				
				for (var k = 0; k < l; k++)
					result += vector1[k] * vector2[k];
				
				return result;
			};
		}
	}
	else if (left.isMatrix()) {
		if (right.isMatrix()) {
			var shape = [ left.shape()[0], right.shape()[1] ];
			
			this.shape = function () { return shape; };
			this.isNumber = function () { return false; };
			this.isVector = function () { return false; };
			this.isMatrix = function () { return true; };

			this.value = function () { 
				var value1 = left.value();
				var value2 = right.value();
				
				return multiply(value1, value2);
			};
		}
	}
	
	this.evaluate = function () { return createConstantValue(this.value()); };
}

function createConstantValue(value, options) {
	return new Value(value, options);
}

function createAddOperation(left, right) {
	return new AddOperation(left, right);
}

function createSubtractOperation(left, right) {
	return new SubtractOperation(left, right);
}

function createMultiplyOperation(left, right) {
	return new MultiplyOperation(left, right);
}

function Placeholder(name, shape) {
	this.shape = function () { return shape; };
	this.rank = function () { return shape.length; };
	this.isNumber = function () { return shape.length === 0; };
	this.isVector = function () { return shape.length === 1; };
	this.isMatrix = function () { return shape.length === 2; };
	
	this.value = function (ctx) {
		if (!ctx)
			return null;
		
		return ctx[name];
	}
	
	this.evaluate = function (ctx) {
		var value = this.value(ctx);
		
		if (value == null)
			return null;
		
		return new Value(ctx[name]);
	};
}

function Session() {
	this.run = function (node) { return node.evaluate(); };
}

function createSession() {
	return new Session();
}

function createPlaceholder(name, shape) {
	return new Placeholder(name, shape);
}

module.exports = {
	constant: createConstantValue,
	multiply: createMultiplyOperation,
	add: createAddOperation,
	subtract: createSubtractOperation,
	placeholder: createPlaceholder,
	
	session: createSession
}

