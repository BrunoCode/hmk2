function Cell(state, color,visited, delta);
{
  this.state = state || 0;
  this.color = color || 0;
  this.visited = visited || 0;
  this.delta = delta || 0;
}

Cell.prototype.change = function () {

};
