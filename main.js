window.onload = function() {

    var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update});
    var cells = [];
    var h = 50;
    var w = 50;
    var cellsize = 20;

    function preload () {

    }

    function create () {
      var graphics = game.add.graphics(100, 100);
      graphics.lineStyle(2, 0x0000FF, 1);
      graphics.drawRect(0, 0, 100, 100);
      window.graphics = graphics;
      // for(var i = 0;  i < h; i++){
      //
      // }
    }

    function update() {
    }
};
