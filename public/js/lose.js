var loseState = {
  create: function() {
    const loseLabel = game.add.text(game.world.centerX - 380, game.world.centerY - 200, "You have been pizza'ed!", fontInfo);
    const scoreInfoLabel = game.add.text(game.world.centerX - 200, game.world.centerY - 100, 'Your Score', fontInfo);
    const scoreLabel = game.add.text(game.world.centerX - 100, game.world.centerY, score, fontInfo);
    const instructionLabel = game.add.text(game.world.centerX - 400, game.world.centerY + 100, 'Press any key to restart', fontInfo);

    loseLabel.padding.set(10, 16);
    scoreInfoLabel.padding.set(10, 16);
    scoreLabel.padding.set(10, 16);
    instructionLabel.padding.set(10, 16);

    game.input.keyboard.onDownCallback = this.restart;
  },
  restart: function(event) {
    if(event.key.length === 1 && event.key !== ' ') {
      score = 0;
      game.input.keyboard.onDownCallback = null;
      game.state.start('menu');
    }
  }
}
