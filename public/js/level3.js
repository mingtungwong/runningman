var level3State = {
  create: function() {
    //this.pizzaHit = this.pizzaHit.bind(this);
    this.checkSpace = this.checkSpace.bind(this);
    scoreText = game.add.text(20, 20, `Score: ${score}`, {backgroundColor: 'black', fill: 'white'});

    this.pizzas = game.add.group();
    this.pizzas.enableBody = true;
    this.makePizzas();

    //Ship stuff
    this.ships = game.add.group();
    this.ships.enableBody = true;
    this.spaceship = this.ships.create(350, 500, 'animatedsmallship');
    this.spaceship.animations.add('animatedsmallship', [1, 2, 3, 4], 15, true);

    //Le Pizza Chief
    this.boss = game.add.group();
    this.boss.enableBody = true;
    this.pizzaBoss = this.boss.create(250, -1000, 'pizzaboss');
    this.bossEnabled = false;
    this.bossHealth = 20;
    this.bossXSpd = 0;
    this.bossYSpd = 0;
    this.bossBaseSpeed = 5;

    //Le Pepperonis
    this.pepperonis = game.add.group();
    this.pepperonis.enableBody = true;
    this.pepperonis.physicsBodyType = Phaser.Physics.ARCADE;
    this.pepperonis.createMultiple(200, 'pepperonibullet');
    this.pepperonis.setAll('checkWorldBounds', true);
    this.pepperonis.setAll('outOfBoundsKill', true);
    this.pepeTime = 0;
    this.numPepes = 1;

    //Le Upgrades
    this.upgrades = game.add.group();
    this.upgrades.enableBody = true;
    this.upgrades.physicsBodyType = Phaser.Physics.ARCADE;
    this.upgrades.createMultiple(50, 'uplaser');
    this.upgrades.setAll('checkWorldBounds', true);
    this.upgrades.setAll('outOfBoundsKill', true);

    //Set up keyboard
    this.cursors = game.input.keyboard.createCursorKeys();
    this.firePepperonis = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    game.input.keyboard.onDownCallback = this.checkSpace;
  },
  update: function() {
    this.spaceship.body.velocity.setTo(0, 0);
    if(this.cursors.left.isDown || this.cursors.right.isDown) {
      this.spaceship.animations.play('animatedsmallship', 15, false);
      if(this.cursors.left.isDown && this.spaceship.x > 0) this.spaceship.body.velocity.x = -1000;
      else if(this.spaceship.x < 600 + this.spaceship.width)this.spaceship.body.velocity.x = 1000;
    }

    game.physics.arcade.overlap(this.pepperonis, this.pizzas, this.pizzaHit, null, this);

    if(!this.pizzas.countLiving() && !this.bossEnabled) this.activateBoss();
    else {
      this.pizzaBoss.x += this.bossXSpd;
      this.pizzaBoss.y += this.bossYSpd;
      if(this.pizzaBoss.x <= 0 || this.pizzaBoss.x >= 500) this.bossXSpd *= -1;
      if(this.pizzaBoss.y <= 0 || this.pizzaBoss.y >= 300) this.bossYSpd *= -1;
      game.physics.arcade.overlap(this.pizzaBoss, this.spaceship, this.gameover, null, this);
      game.physics.arcade.overlap(this.pepperonis, this.pizzaBoss, this.bossHit, null, this);
      game.physics.arcade.overlap(this.spaceship, this.upgrades, this.upgradeShip, null, this);
    }
  },
  upgradeShip: function(ship, upgrade) {
    upgrade.kill();
    this.numPepes++;
  },
  bossHit: function(boss, pepe) {
    pepe.kill();
    this.bossHealth--;
    if(this.bossHealth <= 0) {
      boss.kill();
      score += 1000;
      game.state.start('win');
    }
  },
  gameover: function() {
    this.state.start('lose');
  },
  activateBoss: function() {
    if(!this.bossEnabled) {
      const moveToScreen = game.add.tween(this.pizzaBoss);
      moveToScreen.to({ x: 250, y: 20}, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
      this.bossEnabled = true;
      this.pizzaBoss.body.setCircle(150);
      this.bossXSpd = this.bossBaseSpeed * (Math.random() < 0.5 ? -1 : 1);
      this.bossYSpd = this.bossBaseSpeed * (Math.random() < 0.5 ? -1 : 1);
    }
  },
  makePizzas: function() {
    for(let y = 0; y < 5; y++) {
      for(let x = 0; x < 20; x++) {
        let pizza = this.pizzas.create(x * 30, y * 30, 'pizza');
        pizza.anchor.setTo(0.5, 0.5);
        pizza.body.moves = false;
      }
    }

    this.pizzas.x = 50;
    this.pizzas.y = 100;
    game.add.tween(this.pizzas).to({ x: 180 }, 1000, Phaser.Easing.Linear.None, true, 0, 1000, true);
  },
  fireLePepes: function() {
    console.log("Le pepes are on fire!");
    if(game.time.now > this.pepeTime) {
      for(let i = 0; i < this.numPepes; i++) {
        let pepe = this.pepperonis.getFirstExists(false);
        if(pepe) {
          pepe.reset(this.spaceship.x + (47 * (this.numPepes - i - ((this.numPepes / 2) | 0))), this.spaceship.y - 10);
          pepe.body.velocity.y = -500;
          this.pepeTime = game.time.now + 100;
        }
      }
    }
  },
  pizzaHit: function(pepe, pizza) {
    pepe.kill();
    const x = pizza.body.x;
    const y = pizza.body.y;
    pizza.kill();

    if(Math.random() < .05) {
      let upgrade = this.upgrades.getFirstExists(false);
      if(upgrade) {
        upgrade.reset(x, y + 25);
        upgrade.body.velocity.y = 150;
      }
    }

    score += 20;
    scoreText.text = `Score: ${score}`;
  },
  checkSpace: function(event) {
    const key = event.key;
    if(key === ' ') this.fireLePepes();
    if(key === 't') this.numPepes++;
    if(key === 'q') this.numPepes = 1;
  }
}
