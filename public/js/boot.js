var fontInfo = {font: '25pt Press Start 2P', background: 'black', fill: 'white'};

var bootState = {
  create: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.state.start('load');
  }
}
