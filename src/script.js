let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let g = 0.068;
let e = 0.5;

let mouse_start, mouse_end;

class Circle {
    constructor(center = new Vector(0, 0), radius = 10, color = "blue") {
        this.pos = center;
        this.vel = new Vector(0, 0);
        this.acc = new Vector(0, 0);
        this.apos = 0;
        this.avel = 0;
        this.aacc = 0;

        this.radius = radius;
        this.color = color
        this.dragging = false;
    }

    get left() {
        return this.pos.x - this.radius;
    }

    get right() {
        return this.pos.x + this.radius;
    }

    get top() {
        return this.pos.y - this.radius;
    }

    get bottom() {
        return this.pos.y + this.radius;
    }

    toString() {
        return `Circle(pos=${this.pos}, vel=${this.vel}, acc=${this.acc}, radius=${this.radius}, color=${this.color})`;
    }

    update() {
        this.acc.y = g;
        this.vel = add(this.vel, this.acc);
        this.pos = add(this.pos, this.vel, div(this.acc, 2));

        // this.aacc = this.acc.abs() / this.radius / 1000;
        // console.log(this.aacc);
        this.avel = (this.vel.abs() / this.radius);
        this.avel *= this.vel.x < 0 ? -1 : 1;
        this.apos += this.avel + this.aacc / 2;

        if (this.left < 0) {
            this.pos.x = this.radius;
            this.vel.x *= -1;
        } else if (this.right > canvas.width) {
            this.pos.x = canvas.width - this.radius;
            this.vel.x *= -1;
        } else if (this.top < 0) {
            this.pos.y = this.radius;
            this.vel.y *= -1;
        } else if (this.bottom > canvas.height) {
            this.pos.y = canvas.height - this.radius;
            this.vel.y *= -e;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.lineWidth = 7;
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
        ctx.strokeStyle = 'white';
        ctx.stroke();
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.moveTo(this.pos.x, this.pos.y);
        ctx.lineTo(this.pos.x + this.radius * Math.cos(this.apos), this.pos.y + this.radius * Math.sin(this.apos));
        ctx.strokeStyle = 'white';
        ctx.stroke();
        ctx.closePath();
    }
}

let balls = [
    new Circle(new Vector(100, 100), 35, 'blue'),
    new Circle(new Vector(200, 100), 25, 'red'),
    new Circle(new Vector(300, 100), 30, 'green'),
    new Circle(new Vector(400, 100), 40, 'magenta'),
];

canvas.addEventListener('mousedown', (e) => {
    let rect = canvas.getBoundingClientRect();
    let mouse_pos = new Vector(e.clientX - rect.x, e.clientY - rect.y);

    for (let ball of balls) {
        if (ball.pos.dist(mouse_pos) <= ball.radius) {
            ball.vel = new Vector(0, 0);
            ball.acc = new Vector(0, g);
            ball.dragging = true;
            mouse_start = ball.pos;
        }
    }
});

canvas.addEventListener('mousemove', (e) => {
    let rect = canvas.getBoundingClientRect();
    let mouse_pos = new Vector(e.clientX - rect.x, e.clientY - rect.y);

    for (let ball of balls) {
        if (ball.dragging) {
            mouse_end = mouse_pos;
        }
    }
});

canvas.addEventListener('mouseup', () => {
    for (let ball of balls) {
        if (ball.dragging) {
            ball.dragging = false;
            ball.vel = mouse_end.sub(mouse_start).div(50);
            mouse_start = null;
            mouse_end = null;
        }
    }
});

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let ball of balls) {
        ball.draw();
        if (!ball.dragging) {
            ball.update();
        }
    }

    if (mouse_start && mouse_end) {
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.moveTo(mouse_start.x, mouse_start.y);
        ctx.lineTo(mouse_end.x, mouse_end.y);
        ctx.strokeStyle = 'rgba(200, 200, 200, 0.5)';
        ctx.stroke();
        ctx.closePath();
    }
}

setInterval(draw, 1);