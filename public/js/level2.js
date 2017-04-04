var level2State = {
  create: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    //Setting up the background so it remains the same as level 1
    this.scrollingbg = game.add.tileSprite(0, 0, 800, 600, 'scrolling');
    this.scrollingbg.tilePosition.x = bgXPos;
    this.scrollingbg.tilePosition.y = bgYPos;

    if(score < 1000) score = 1000;

    //Platforms
    this.platforms = game.add.group();
    this.platforms.enableBody = true;

    //Ground
    this.ground = this.platforms.create(0, 500, 'ground');
    this.ground.body.immovable = true;

    //Obstacles
    this.obstacles = game.add.group();
    this.obstacles.enableBody = true;

    this.obstacle = this.obstacles.create(900 + ((Math.random() * 800) | 0), 440, 'obstacle');

    //Bullets
    this.bullets = game.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;

    this.bullets.createMultiple(10, 'bullet');
    this.bullets.setAll('checkWorldBounds', true);
    this.bullets.setAll('outOfBoundsKill', true);
    this.nextFire = 0;
    this.fireRate = 100;

    //Hero
    this.hero = game.add.sprite(300, 375, 'angryhero');
    this.hero.animations.add('run', [0, 1, 2, 3], 15, true);
    this.hero.width = 48;
    if(heroYPos) this.hero.position.y = heroYPos;
    this.hero.enableBody;

    game.physics.arcade.enable(this.hero);
    this.hero.animations.play('run', 15, true);

    this.hero.body.gravity.y = 500;
    this.hero.body.collideWorldBounds = true;

    //Monsters
    this.monsters = game.add.group();
    this.monsters.enableBody = true;
    this.cssmonster;
    this.setMonster();
    this.cssmonsterSpeed = -10;

    //Spaceship
    this.spaceships = game.add.group();
    this.spaceships.enableBody = true;
    this.spaceship = this.spaceships.create(1200, 175, 'animatedship', 390, 350);
    this.spaceship.animations.add('animatedship', [1, 2, 3], 15, true);
    this.spaceshipSpeed = 0;
    this.spaceshipYSpeed = 0;
    //Score
    scoreText = game.add.text(20, 20, `Score: ${score}`, {backgroundColor: 'black', fill: 'white'});

    //Set up button listener for firing bullets
    this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(this.fire, this);
    this.tileSpeed = -5;
    this.isPlaying = true;
    game.input.keyboard.onDownCallback = this.checkButton;
  },
  update: function() {
    this.scrollingbg.tilePosition.x += this.tileSpeed;
    const overlap = game.physics.arcade.overlap(this.obstacles, this.hero);
    const hitPlatform = game.physics.arcade.collide(this.ground, this.hero);
    const hitMonster = game.physics.arcade.overlap(this.monsters, this.hero);
    const shootMonster = game.physics.arcade.overlap(this.bullets, this.cssmonster, this.monsterHit, null, this);
    const boardSpaceship = game.physics.arcade.overlap(this.spaceships, this.hero);
    const cursors = game.input.keyboard.createCursorKeys();

    if(boardSpaceship) this.startTransition();

    if(shootMonster) this.resetMonster();

    if(overlap || hitMonster) game.state.start('nopizzalose');

    if(this.isPlaying) {
      score++;
      scoreText.text = `Score: ${score}`;
    }

    if(this.cssmonster.x <= -100 && score < 2000) this.resetMonster();
    if(this.isPlaying) this.cssmonster.x += this.cssmonsterSpeed;

    if(this.obstacle.x <= -100 && score < 2000) this.obstacle.x = 900 + ((Math.random() * 1000) | 0);
    if(this.isPlaying) this.obstacle.x -= 10;

    if(score >= 2000 && this.obstacle.x <= -100 && this.cssmonster.x <= -100 && this.isPlaying) this.spaceshipSpeed = -10;
    if(this.isPlaying) this.spaceship.x += this.spaceshipSpeed;
    if(!this.isPlaying) this.spaceship.y += this.spaceshipYSpeed;
    if(!this.isPlaying && this.spaceship.y <= -400) game.state.start('level2to3');

    if(cursors.up.isDown && this.hero.body && this.hero.body.touching.down && hitPlatform) {
      this.hero.body.velocity.y = -300;
    }
  },
  monsterHit: function(monster, bullet) {
    bullet.kill();
  },
  checkButton: function(event) {
    const key = event.key;
    if(key === 't') score += 900;
  },
  fire: function() {
    if (game.time.now > this.nextFire && this.bullets.countDead() > 0 && this.isPlaying) {
      nextFire = game.time.now + this.fireRate;
      this.bullet = this.bullets.getFirstDead();
      this.bullet.reset(this.hero.x + 20, this.hero.y + 40);
      game.physics.arcade.moveToXY(this.bullet, 900, this.hero.y + 40, 60, 300);
    }
  },
  destroySprite(sprite) {
    sprite.destroy();
  },
  setMonster: function() {
    let coords = this.generateMonsterCoords();
    this.cssmonster = this.monsters.create(coords[0], coords[1], 'cssmonster');
  },
  resetMonster: function() {
    if(score < 2000) {
      this.destroySprite(this.cssmonster);
      this.setMonster();
    }
    else {
      this.cssmonster.x = -150;
    }
  },
  generateMonsterCoords: function() {
    let regenXCoord = true;
    let xCoord, yCoord;

    while(regenXCoord) {
      xCoord = 1200 + ((Math.random() * 800) | 0);
      if(Math.abs(this.obstacle.x - xCoord) >= 200) regenXCoord = false;
    }

    yCoord = 350 - ((Math.random() * 50) | 0);

    return [xCoord, yCoord];
  },
  startTransition: function() {
    game.input.keyboard.onDownCallback = null;
    this.hero.destroy();
    this.spaceshipSpeed = 0;
    this.spaceshipYSpeed = -5;
    this.isPlaying = false;
    this.tileSpeed = 0;
    this.spaceship.animations.play('animatedship', 15, true);
  }
}
