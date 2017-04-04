var menuState = {
  create: function() {
    const nameLabel = game.add.text(game.world.centerX - 200, game.world.centerY - 100, 'Running Man', fontInfo);
    const instructionLabel = game.add.text(game.world.centerX - 270, game.world.centerY, 'Press any button', fontInfo);
    game.input.keyboard.onDownCallback = this.start;
  },
  start: function(event) {
    const key = event.key;
    game.input.keyboard.onDownCallback = null;
    if(key === '1' || key === '2' || key === '3') game.state.start(`level${key}`);
    else game.state.start('level1');
  }
}
