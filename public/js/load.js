var score = 0;
var bgXPos = 0;
var bgYPos = 0;
var heroYPos = 0;

var loadState = {
  preload: function() {
    const loadLabel = game.add.text(
      game.world.centerX - 150,
      game.world.centerY - 50,
      'Starting run engine',
      fontInfo);

      const dir = '/assets/';

      game.load.image('background', `${dir}background.png`);
      game.load.image('ground', `${dir}ground.png`);
      game.load.spritesheet('hero', `${dir}herorunning.png`, 48, 120);
      game.load.spritesheet('angryhero', `${dir}angryherorunning.png`, 73, 120);
      game.load.spritesheet('animatedship', `${dir}spaceshipsprite.png`, 390, 350);
      game.load.spritesheet('animatedsmallship', `${dir}spaceshipsmallsprite.png`, 98, 88);
      game.load.image('scrolling', `${dir}scrollingbackground.png`);
      game.load.image('obstacle', `${dir}obstacle.png`);
      game.load.image('gun', `${dir}gun.png`);
      game.load.image('bullet', `${dir}bullet.png`);
      game.load.image('cssmonster', `${dir}cssmonster.png`);
      game.load.image('spaceship', `${dir}spaceship.png`);
      game.load.image('pizza', `${dir}pizza.png`);
      game.load.image('pepperonibullet', `${dir}pepperonibullet.png`);
      game.load.image('spaceshipsmall', `${dir}spaceshipsmall.png`);
      game.load.image('pizzaboss', `${dir}pizzaboss.png`);
      game.load.image('pizzabg', `${dir}pizzabg.png`);
      game.load.image('uplaser', `${dir}upgradelaser.png`);
  },
  create: function() {
    game.state.start('menu');
  }
}
