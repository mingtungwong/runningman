var winState = {
  create: function() {
    const font = {font: '12pt', background: 'black', fill: 'white'};

    const winLabel = game.add.text(15, game.world.centerY - 200, "You have triumphed over", fontInfo);
    const pizzaLabel = game.add.text(game.world.centerX - 110, game.world.centerY - 150, "pizza!", fontInfo);
    const scoreInfoLabel = game.add.text(game.world.centerX - 200, game.world.centerY - 100, 'Your Score', fontInfo);
    const scoreLabel = game.add.text(game.world.centerX - 100, game.world.centerY, score, fontInfo);
    const instructionLabel = game.add.text(game.world.centerX - 400, game.world.centerY + 100, 'Press any key to restart', fontInfo);

    winLabel.padding.set(10, 16);
    pizzaLabel.padding.set(10, 16);
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
