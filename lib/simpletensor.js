
function sign(value) {
    if (value < 0)
        return -1;
    
    if (value === 0)
        return 0;
    
    return 1;
}

function createShapedValue(value, shape) {
	if (shape.length === 0)
		return value;
	
	const l = shape[0];
	const subshape = shape.slice(1);
	
	const result = [];
	
	for (let k = 0; k < l; k++)
		result[k] = createShapedValue(value, subshape);
	
	return result;
}

function isSquareMatrix(shape) {
	return !(!shape || shape.length !== 2 || shape[0] !== shape[1]);
}

function subvalues(values, x) {
	const result = [];
	const l = values.length;
	
	for (let k = 0; k < l; k++) {
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
	
	const l = values.length;
	let result = 0;

	for (let k = 0; k < l; k++) {
		const d = determinant(subvalues(values, k));
		
		if (k % 2)
			result -= values[k][0] * d;
		else
			result += values[k][0] * d;
	}
	
	return result;
}

function mapValues(values, fn) {
    if (!Array.isArray(values))
        return fn(values);
        
    const result = [];
    const l = values.length;
    
    for (let k = 0; k < l; k++)
        result[k] = mapValues(values[k], fn);
        
    return result;
}

function mapValuesValues(values1, values2, fn) {
    if (!Array.isArray(values1) && !Array.isArray(values2))
        return fn(values1, values2);
    
    const result = [];
    const l = Array.isArray(values1) ? values1.length : values2.length;
    
    if (!Array.isArray(values1))
        for (let k = 0; k < values2.length; k++)
            result[k] = mapValuesValues(values1, values2[k], fn);
    else if (!Array.isArray(values2))    
        for (let k = 0; k < values1.length; k++)
            result[k] = mapValuesValues(values1[k], values2, fn);
        
    else
        // TODO check case values1.length != values2.length
        for (let k = 0; k < values1.length; k++)
            result[k] = mapValuesValues(values1[k], values2[k], fn);
        
    return result;
}

function multiply(matrix1, matrix2) {
	const result = [];
	
	const nrows = matrix1.length;
	const ncols = matrix2[0].length;
	const nterms = matrix1[0].length;
	
	for (let k = 0; k < nrows; k++)
		for (let j = 0; j < ncols; j++) {
			const value = 0;
			
			for (let l = 0; l < nterms; l++)
				value += matrix1[k][l] * matrix2[l][j];
			
			if (!result[k])
				result[k] = [];
			
			result[k][j] = value;
		}
	
	return result;
}

function Node() {
	let value;
	
	this.evaluate = function () {
		if (value)
			return value;
		
		value = createConstantValue(this.value());
		
		return value;
	}
	
	this.clear = function () { value = null; }
}

Node.prototype.rank = function () { return this.shape().length; };
Node.prototype.isNumber = function () { return this.rank() === 0 };
Node.prototype.isVector = function () { return this.rank() === 1 };
Node.prototype.isMatrix = function () { return this.rank() === 2 };

function Value(value, options) {
	Node.call(this);
	
	options = options || {};
    
	let shape;
	
	if (options.shape) {
		shape = options.shape.slice();
		value = createShapedValue(value, shape);
	}
	else {
		shape = [];
		let v = value;
		
		while (Array.isArray(v)) {
			shape.push(v.length);
			v = v[0];
		}
	}
	
	this.value = function () { return value; };
	this.shape = function () { return shape; };
	
	if (isSquareMatrix(shape)) {
		this.determinant = function () { return determinant(value); };
		this.isSquareMatrix = function () { return true; };
	}
	else if (shape.length === 2)
		this.isSquareMatrix = function () { return false; };
};

// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Inheritance

Value.prototype = Object.create(Node.prototype);
Value.prototype.constructor = Value;

Value.prototype.evaluate = function () { return this; }
Value.prototype.context = function () { return false; }

function BinaryOperation(left, right) {
	Node.call(this);

	let value;
	
	this.value = function () {
		if (value)
			return value;
		
		value = this.calculate(left.value(), right.value());
		
		return value;
	}
	
	this.context = function (ctx) {
		const lresult = left.context(ctx);
		const rresult = right.context(ctx);
		
		const result = lresult || rresult;
		
		if (result) {
			this.clear();
			value = null;
		}
		
		return result;
	}
}

// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Inheritance

BinaryOperation.prototype = Object.create(Node.prototype);
BinaryOperation.prototype.constructor = BinaryOperation;

function GenericBinaryOperation(left, right, fn) {
	BinaryOperation.call(this, left, right);

	const shape = left.shape().length > right.shape().length ? left.shape() : right.shape();
	
	this.shape = function () { return shape; };

    this.calculate = function (leftvalue, rightvalue) {
        return mapValuesValues(leftvalue, rightvalue, fn);
    }
}

// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Inheritance

GenericBinaryOperation.prototype = Object.create(BinaryOperation.prototype);
GenericBinaryOperation.prototype.constructor = GenericBinaryOperation;

function UnaryOperation(node) {
	Node.call(this);

	let value;
	
	this.value = function () {
		if (value)
			return value;
		
		value = this.calculate(node.value());
		
		return value;
	}
	
	this.context = function (ctx) {
		const result = node.context(ctx);
		
		if (result) {
			this.clear();
			value = null;
		}
		
		return result;
	}
}

// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Inheritance

UnaryOperation.prototype = Object.create(Node.prototype);
UnaryOperation.prototype.constructor = UnaryOperation;

function GenericUnaryOperation(node, fn) {
	UnaryOperation.call(this, node);

	const shape = node.shape();
	
	this.shape = function () { return shape; };

    this.calculate = function (value) {
        return mapValues(value, fn);
    }
}

// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Inheritance

GenericUnaryOperation.prototype = Object.create(UnaryOperation.prototype);
GenericUnaryOperation.prototype.constructor = GenericUnaryOperation;

function createConstantValue(value, options) {
	return new Value(value, options);
}

function createZeros(shape) {
	return new Value(0, { shape: shape });
}

function createOnes(shape) {
	return new Value(1, { shape: shape });
}

function createFill(value, shape) {
	return new Value(value, { shape: shape });
}

function createAddOperation(left, right) {
	return new GenericBinaryOperation(left, right, function (x, y) { return x + y });
}

function createSubtractOperation(left, right) {
	return new GenericBinaryOperation(left, right, function (x, y) { return x - y });
}

function createPowOperation(left, right) {
	return new GenericBinaryOperation(left, right, Math.pow);
}

function createMultiplyOperation(left, right) {
	return new GenericBinaryOperation(left, right, function (x, y) { return x * y });
}

function createDivideOperation(left, right) {
	return new GenericBinaryOperation(left, right, function (x, y) { return x / y });
}

function Placeholder(name, shape) {
	this.shape = function () { return shape; };
	this.rank = function () { return shape.length; };
	this.isNumber = function () { return shape.length === 0; };
	this.isVector = function () { return shape.length === 1; };
	this.isMatrix = function () { return shape.length === 2; };
	
	let value;
	
	this.context = function (ctx) {
		if (!ctx)
			return false;
	
		value = ctx[name];
		
		return true;
	}
	
	this.value = function () {
		if (!value)
			return null;
		
		return value.value();
	}
	
	this.evaluate = function (ctx) {
		return value;
	};
}

function Session() {
	this.run = function (node, options) { 
		const ctx = options && options.context ? options.context : null;

		if (ctx)
			node.context(ctx);
		
		return node.evaluate(); 
	};
}

function createSession() {
	return new Session();
}

function createPlaceholder(name, shape) {
	return new Placeholder(name, shape);
}

function createNegativeOperation(node) {
	return new GenericUnaryOperation(node, function (x) { return -x; });
}

function createSignOperation(node) {
	return new GenericUnaryOperation(node, sign);
}

function createCeilOperation(node) {
	return new GenericUnaryOperation(node, Math.ceil);
}

function createFloorOperation(node) {
	return new GenericUnaryOperation(node, Math.floor);
}

function createAbsOperation(node) {
	return new GenericUnaryOperation(node, Math.abs);
}

function createExpOperation(node) {
	return new GenericUnaryOperation(node, Math.exp);
}

function createCosOperation(node) {
	return new GenericUnaryOperation(node, Math.cos);
}

function createSinOperation(node) {
	return new GenericUnaryOperation(node, Math.sin);
}

function createACosOperation(node) {
	return new GenericUnaryOperation(node, Math.acos);
}

function createTanOperation(node) {
	return new GenericUnaryOperation(node, Math.tan);
}

function createASinOperation(node) {
	return new GenericUnaryOperation(node, Math.asin);
}

function createATanOperation(node) {
	return new GenericUnaryOperation(node, Math.atan);
}

function createCosHOperation(node) {
	return new GenericUnaryOperation(node, Math.cosh);
}

function createSinHOperation(node) {
	return new GenericUnaryOperation(node, Math.sinh);
}

function createTanHOperation(node) {
	return new GenericUnaryOperation(node, Math.tanh);
}

function createACosHOperation(node) {
	return new GenericUnaryOperation(node, Math.acosh);
}

function createASinHOperation(node) {
	return new GenericUnaryOperation(node, Math.asinh);
}

function createATanHOperation(node) {
	return new GenericUnaryOperation(node, Math.atanh);
}

function createIdentityOperation(node) {
	return new GenericUnaryOperation(node, function (x) { return x; });
}

function createUniform(shape, options) {
    options = options || {};
    
    if (options.minval == null)
        options.minval = 0;
    if (options.maxval == null)
        options.maxval = 1;
        
    const range = options.maxval - options.minval;
    const minimum = options.minval;
    
	const value = createShapedValue(0, shape);
	
	const result = mapValues(value, function (v) { return Math.random() * range + minimum; });
	
	return createConstantValue(result);
}

module.exports = {
	constant: createConstantValue,

	add: createAddOperation,
	subtract: createSubtractOperation,
	multiply: createMultiplyOperation,
	divide: createDivideOperation,

	pow: createPowOperation,
    exp: createExpOperation,

	negative: createNegativeOperation,
    sign: createSignOperation,
	ceil: createCeilOperation,
	floor: createFloorOperation,
	abs: createAbsOperation,
	identity: createIdentityOperation,
    
    cos: createCosOperation,
    sin: createSinOperation,
    tan: createTanOperation,
    acos: createACosOperation,
    asin: createASinOperation,
    atan: createATanOperation,
    
    cosh: createCosHOperation,
    sinh: createSinHOperation,
    tanh: createTanHOperation,

    acosh: createACosHOperation,
    asinh: createASinHOperation,
    atanh: createATanHOperation,

	placeholder: createPlaceholder,

	zeros: createZeros,
	ones: createOnes,
	fill: createFill,
	
	random: {
		uniform: createUniform
	},
	
	session: createSession,
    
    math: {
        abs: createAbsOperation,
        exp: createExpOperation,
        
        cos: createCosOperation,
        sin: createSinOperation,
        tan: createTanOperation,
                
        cosh: createCosHOperation,
        sinh: createSinHOperation,
        tanh: createTanHOperation,
                
        acosh: createACosHOperation,
        asinh: createASinHOperation,
        atanh: createATanHOperation,
        
        acos: createACosOperation,
        asin: createASinOperation,
        atan: createATanOperation,
    }
}

