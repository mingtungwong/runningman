var level1State = {
  create: function() {
    this.checkButton = this.checkButton.bind(this);
    game.physics.startSystem(Phaser.Physics.ARCADE);

    this.scrollingbg = game.add.tileSprite(0, 0, 800, 600, 'scrolling');

    //Platforms
    this.platforms = game.add.group();
    this.platforms.enableBody = true;

    //Ground
    this.ground = this.platforms.create(0, 500, 'ground');
    this.ground.body.immovable = true;

    //Obstacles
    this.obstacles = game.add.group();
    this.obstacles.enableBody = true;
    this.obstacle = this.obstacles.create(1500, 440, 'obstacle');

    //Gun
    this.guns = game.add.group();
    this.guns.enableBody = true;
    this.gun = this.guns.create(900, 375, 'gun');

    //Hero
    this.hero = game.add.sprite(300, 375, 'hero');
    this.hero.animations.add('run', [0, 1, 2, 3], 15, true);
    this.hero.width = 48;

    game.physics.arcade.enable(this.hero);
    this.hero.animations.play('run', 15, true);

    this.hero.body.gravity.y = 500;
    this.hero.body.collideWorldBounds = true;

    //Score
    score = 0;
    scoreText = game.add.text(20, 20, 'Score: 0', {backgroundColor: 'black', fill: 'white'});

    this.gunSpeed = 0;
    game.input.keyboard.onDownCallback = this.checkButton;
  },
  checkButton: function(event) {
    const key = event.key;
    if(key === 't') score += 900;
  },
  update: function() {
    this.scrollingbg.tilePosition.x -= 5;
    const overlap = game.physics.arcade.overlap(this.obstacles, this.hero);
    const hitPlatform = game.physics.arcade.collide(this.ground, this.hero);
    const hitGun = game.physics.arcade.overlap(this.gun, this.hero);
    const cursors = game.input.keyboard.createCursorKeys();

    if(overlap) game.state.start('nopizzalose');

    score++;
    scoreText.text = `Score: ${score}`;

    if(this.obstacle.x <= -100 && score < 1000) this.obstacle.x = 900 + ((Math.random() * 1000) | 0);
    this.obstacle.x -= 10;

    if(cursors.up.isDown
        && this.hero.body.touching.down
        && hitPlatform
        && !(score < 1000 && this.obstacle.x <= -100)
      ) {
      this.hero.body.velocity.y = -300;
    }

    if(this.obstacle.x <= -100 && score > 1000) this.gunSpeed = -10;
    this.gun.x += this.gunSpeed;

    if(hitGun) this.startLevel2();
  },
  startLevel2: function() {
    bgXPos = this.scrollingbg.tilePosition.x;
    bgYPos = this.scrollingbg.tilePosition.y;
    game.input.keyboard.onDownCallback = null;
    game.state.start('level2');
  }
}
