var canvas = document.getElementById('canvas');

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key == 37 || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == 39 || e.key == "ArrowLeft") {
        leftPressed = true;
    }
    else if(e.key == 38 || e.key == "ArrowUp") {
        upPressed = true;
    }
    else if(e.key == 40 || e.key == "ArrowDown") {
        downPressed = true;
    }
}


function keyUpHandler(e) {
    if(e.key == 37 || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == 39 || e.key == "ArrowLeft") {
        leftPressed = false;
    }
    else if(e.key == 38 || e.key == "ArrowUp") {
        upPressed = false;
    }
    else if(e.key == 40 || e.key == "ArrowDown") {
        downPressed = false;
    }
}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');
var raf;

let g = 9.8;
let f = -0.02;
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
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
}

class Circle {
    constructor(center=new Vector(0, 0), radius=10, color="blue") {
        this.pos = center;
        this.vel = new Vector(0, 0);
        this.acc = new Vector(0, 0);
        this.radius = radius;
        this.color = color
    }

    update() {
        if (leftPressed) {
            this.acc.x = -5;
        } else if (rightPressed) {
            this.acc.x = 5;
        }

        this.acc.x += this.vel.x * f;
        this.acc.y = g;
        this.vel = this.vel.add(this.acc);
        this.pos = this.pos.add(this.vel.add(this.acc.div(2)));

        if (this.pos.y + this.radius > canvas.height || this.pos.y - this.radius < 0) {
            this.pos.y = canvas.height - this.radius;
        } else if (this.pos.x + this.radius > canvas.width) {
            this.pos.x = canvas.width - this.radius;
        } else if (this.pos.x - this.radius < 0) {
            this.pos.x = this.radius;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

// var ball = {
//     x: 100,
//     y: 100,
//     vx: 5,
//     vy: 1,
//     radius: 25,
//     color: 'blue',
//     draw: function () {
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
//         ctx.closePath();
//         ctx.fillStyle = this.color;
//         ctx.fill();
//     }
// };
var ball = new Circle(new Vector(100, 100), 25, 'blue');


function clear() {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function draw() {
    clear();
    ball.draw();
    ball.update();

    raf = window.requestAnimationFrame(draw);
}

canvas.addEventListener('mousemove', function (e) {
    if (!running) {
        clear();
        ball.x = e.clientX;
        ball.y = e.clientY;
        ball.draw();
    }
});

canvas.addEventListener('click', function (e) {
    if (!running) {
        raf = window.requestAnimationFrame(draw);
        running = true;
    }
});

canvas.addEventListener('mouseout', function (e) {
    window.cancelAnimationFrame(raf);
    running = false;
});

// canvas.addEventListener('draw', function (e) {
//
// });

ball.draw();
