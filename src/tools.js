class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return `(${this.x}, ${this.y})`;
    }

    add(other) {
        return new Vector(this.x + other.x, this.y + other.y);
    }

    sub(other) {
        return new Vector(this.x - other.x, this.y - other.y);
    }

    mul(scalar) {
        return new Vector(this.x * scalar, this.y * scalar);
    }

    div(scalar) {
        return new Vector(this.x / scalar, this.y / scalar);
    }

    abs() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    dist(other) {
        return this.sub(other).abs();
    }
}

Number.prototype.add = function(other) {
    return this + other;
}

Number.prototype.sub = function(other) {
    return this - other;
}

Number.prototype.mul = function(other) {
    return this * other
}

Number.prototype.div = function(other) {
    return this / other;
}

function add(...args) {
    return args.reduce((acc, cur) => acc.add(cur));
}

function sub(...args) {
    return args.reduce((acc, cur) => acc.sub(cur));
}

function mul(...args) {
    return args.reduce((acc, cur) => acc.mul(cur));
}

function div(...args) {
    return args.reduce((acc, cur) => acc.div(cur));
}