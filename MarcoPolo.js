(function(root) {
    'use strict';

    var LOOP_FUNCTION = document.querySelector('#loop').checked;
    var MarcoPolo = function(world) {
        this.world = world;
        LOOP_FUNCTION = document.querySelector('#loop').checked;
        iteration = 0;
    };

    MarcoPolo.prototype.generateColor = function() {
        return ('rgba('+
            Math.floor(Math.random() * 255)+','+
            Math.floor(Math.random() * 255)+','+
            Math.floor(Math.random() * 255)+',0.7)');
    };

    var iteration = 0;
    MarcoPolo.prototype.run = function () {
        var x, y, fnUsed = LOOP_FUNCTION?'fillIslandsLoop':'fillIslandsRecur';
        for (x = 0; x < this.world.width; x++) {
            for (y = 0; y < this.world.height; y++) {
                if (this.isFlagable(x, y)) this[fnUsed](x, y, this.generateColor());
            }
        }

        console.info(iteration + ' itérations with ' + fnUsed);
        document.querySelector('#iteration').textContent = iteration + ' itérations with ' + fnUsed;
    };

    MarcoPolo.prototype.fillIslandsLoop = function(x, y, color) {
        var that = this, area, island = [{x:x,y:y}],
            philadelphia = function(a, b, c) {
                if (that.isFlagable(a, b)) {
                    that.world.flagArea(a, b, c);
                    island.push({x:a,y:b});
                }
            };
        while (island.length != 0 && iteration < (this.world.width*this.world.height)) {
            area = island.pop();
            philadelphia(area.x + 1, area.y, color);
            philadelphia(area.x - 1, area.y, color);
            philadelphia(area.x, area.y + 1, color);
            philadelphia(area.x, area.y - 1, color);
            iteration++;
        }
    };

    MarcoPolo.prototype.fillIslandsRecur = function(x, y, color) {
        if (this.isFlagable(x, y)) {
            this.world.flagArea(x, y, color);
            iteration++;
            this.fillIslandsRecur(x + 1, y, color);
            this.fillIslandsRecur(x - 1, y, color);
            this.fillIslandsRecur(x, y + 1, color);
            this.fillIslandsRecur(x, y - 1, color);
        }
    };

    MarcoPolo.prototype.isFlagable = function(x, y) {
        return (this.world.matrix[x] !== undefined
            && this.world.matrix[x][y] !== undefined
            && this.world.getFlag(x, y) === 1);
    };

    root.MarcoPolo = MarcoPolo;

})(window);