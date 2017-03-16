window.onload = function() {

    var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update});
    var cells = [];
    var h = 30;
    var w = 40;
    var cellsize = 20;
    var run = 0;
    var deadCell = new Cell();
    var deadRow = [];
    for (var i = 0; i < w; i++){
      deadRow[i] = deadCell;
    }

    function preload () {

    }

    function create () {
      game.stage.backgroundColor = 0xffff;
      var graphics = game.add.graphics(0, 0);
      graphics.lineStyle(2, 0xF3F3F3, 1);

      for(var i = 0;  i < h; i++){
        cells[i]=[];
        for(var j = 0; j < w; j++){
          cells[i][j] = new Cell();
          graphics.drawRect(j * cellsize, i * cellsize, cellsize, cellsize);
        }
      }
      window.graphics = graphics;

    }

    function update() {
      if(run){
        step();
      }
    }

    function step(){
      var cell;
      var topRow;
      var bottomRow;
      var ncount = 0
      var n;
      for(var i = 0;  i < h; i++) {
        topRow = cells[i-1] || deadRow;
        bottomRow = cells[i+1] || deadRow;

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
            cell.state = 0;
          } else if (ncount == 3) {
            cell.state = 1;
          }
        }
    }
};
