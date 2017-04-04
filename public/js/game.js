var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('level1', level1State);
game.state.add('level2to3', transitionState);
game.state.add('level2', level2State);
game.state.add('level3', level3State);
game.state.add('lose', loseState);
game.state.add('nopizzalose', noPizzaState);
game.state.add('win', winState);

game.state.start('boot');
