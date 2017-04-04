var transitionState = {
  create: function() {
    const font = {font: '20pt Press Start 2P', background: 'black', fill: 'white'};
    const textLabel = game.add.text(game.world.centerX - 275, game.world.centerY - 100, 'Your people need you!', font);
    const scoreInfoLabel = game.add.text(game.world.centerX - 150, game.world.centerY, 'Your Score', font);
    const scoreLabel = game.add.text(game.world.centerX - 40, game.world.centerY + 100, score, font);
    const instructionLabel = game.add.text(game.world.centerX - 320, game.world.centerY + 200, 'Press any key to continue', font);
    game.input.keyboard.onDownCallback = this.start;

    textLabel.padding.set(10, 16);
    scoreInfoLabel.padding.set(10, 16);
    scoreLabel.padding.set(10, 16);
    instructionLabel.padding.set(10, 16);
    game.input.keyboard.onDownCallback = this.start;
  },
  start: function(event) {
    if(event.key.length === 1) {
      game.input.keyboard.onDownCallback = null;
      game.state.start('level3');
    }
  }
}
