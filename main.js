(function(root) {
    'use strict';

    var AREA_SIZE = 10;
    var RATE = 3;
    var SCENE = document.querySelector('#scene');

    var World = function() {
        this.scene = SCENE.getContext('2d');
        this.width = SCENE.width / AREA_SIZE;
        this.height = SCENE.height / AREA_SIZE;
        this.matrix = new Array(this.width);

        this.render('rgba(139,131,120,0.8)');
    };

    World.prototype.render = function(color) {
        var x, y;
        this.scene.fillStyle = color;
        this.scene.strokeStyle = color;
        for (x = 0; x < this.width; x++) {
            if (this.matrix[x] === undefined) {
                this.matrix[x] = new Array(this.height);
            }
            for (y = 0; y < this.height; y++) {
                if (Math.floor(Math.random() * RATE) === 1) {
                    this.scene.fillRect(x * AREA_SIZE, y * AREA_SIZE, AREA_SIZE, AREA_SIZE);
                    this.matrix[x][y] = {
                        flag: 1,
                        color: color
                    };
                } else {
                    this.matrix[x][y] = {
                        flag: 0,
                        color: null
                    };
                }
                this.scene.strokeRect(x * AREA_SIZE, y * AREA_SIZE, AREA_SIZE, AREA_SIZE);
            }
        }
    };

    World.prototype.getFlag = function(x, y) {
        return this.matrix[x][y].flag;
    };

    World.prototype.flagArea = function(x, y, color) {
        this.matrix[x][y].color = color;
        this.matrix[x][y].flag = 2;
        var tmpColor = this.scene.fillStyle;
        this.scene.fillStyle = color;

        this.scene.fillRect(x * AREA_SIZE, y * AREA_SIZE, AREA_SIZE, AREA_SIZE);
        this.scene.strokeRect(x * AREA_SIZE, y * AREA_SIZE, AREA_SIZE, AREA_SIZE);
        this.scene.fillStyle = tmpColor;
    };

    root.World = World;

})(window);