class World {
    constructor(gravity=9.8) {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.fps = 1000;
        this.gravity = 100 * gravity / this.fps ** 2;
    }
}