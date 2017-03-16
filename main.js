window.onload = function() {

    var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update});
    var cells = [];
    var h = 30;
    var w = 40;
    var cellsize = 20;

    function preload () {

    }

    function create () {
      var graphics = game.add.graphics(0, 0);
      graphics.lineStyle(2, 0x0000FF, 1);

      for(var i = 0;  i < h; i++){
        for(var j = 0; j < w; j++){
          graphics.drawRect(i * cellsize, j * cellsize, cellsize, cellsize);
        }
      }

      window.graphics = graphics;

    }

    function update() {
    }
};
