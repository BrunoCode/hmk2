window.onload = function() {

    var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update});
    var cells = [];
    var h = 30;
    var w = 30;
    var cellsize = 20;
    var run = 0;
    var deadCell = new Cell();
    var deadRow = [];
    var graphics;
    for (var i = 0; i < w; i++){
      deadRow[i] = deadCell;
    }

    function preload () {
      game.load.spritesheet('button', 'play.png', 128, 128);
    }

    function create () {
      game.stage.backgroundColor = 0xffffff;
      button = game.add.button(700, 400, 'button', action, this, 0, 0, 0);
      graphics = game.add.graphics(0, 0);
      graphics.lineStyle(2, 0xe0e0e0, 1);

      for(var i = 0;  i < h; i++){
        cells[i]=[];
        for(var j = 0; j < w; j++){
          cells[i][j] = new Cell();
          graphics.drawRect(j * cellsize, i * cellsize, cellsize, cellsize);
        }
      }

      cells[10][10].state =1;
      cells[10][11].state =1;
      cells[10][12].state =1;
      window.graphics = graphics;

    }

    function update() {
      if(game.input.activePointer.isDown){
        var pos = game.input.activePointer.position;
        if (pos.x < 600 && pos.y < 600){
          var j = Math.floor(pos.x / 20);
          var i = Math.floor(pos.y / 20);
          cells[i][j].state = 1;
          graphics.beginFill(0xFF0000, 1);
          graphics.drawRect(j * cellsize, i * cellsize, cellsize, cellsize);
          graphics.endFill();
        }
      }

      if(run) {
        graphics.clear();
        step();
      }
    }
    function action(){
      run = !run;
    }

    function step(){
      var topRow;
      var bottomRow;
      var ncount = 0
      var n;
      var genCells = [];
      for(var i = 0;  i < h; i++) {
        topRow = cells[i-1] || deadRow;
        bottomRow = cells[i+1] || deadRow;
        genCells[i] = [];

        for(var j = 0; j < w; j++){
          n = topRow[j - 1] || deadCell;
          if(n.state) { ncount++;}
          n = topRow[j];
          if(n.state) { ncount++;}
          n = topRow[j + 1] || deadCell;
          if(n.state) { ncount++;}
          n = cells[i][j - 1] || deadCell;
          if(n.state) { ncount++;}
          n = cells[i][j + 1] || deadCell;
          if(n.state) { ncount++;}
          n = bottomRow[j - 1] || deadCell;
          if(n.state) { ncount++;}
          n = bottomRow[j];
          if(n.state) { ncount++;}
          n = bottomRow[j + 1] || deadCell;
          if(n.state) { ncount++;}

          //change state
          if (ncount < 2 || ncount > 3) {
            genCells[i][j] = 0;
          } else if (ncount == 3) {
            genCells[i][j] = 1;
          } else {
            genCells[i][j] = cells[i][j].state;
          }
          ncount = 0;
          graphics.lineStyle(2, 0xe0e0e0, 1);
          graphics.drawRect(j * cellsize, i * cellsize, cellsize, cellsize);

          if(genCells[i][j]){
            graphics.beginFill(0xFF0000, 1);
            graphics.drawRect(j * cellsize, i * cellsize, cellsize, cellsize);
            graphics.endFill();
          }
        }
      }
      for(var i = 0; i < h; i++){
        for(var j = 0; j < w; j++){
          cells[i][j].state = genCells[i][j];
        }
      }
    }
};
