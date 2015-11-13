// devkit and module imports
import animate;
import device;
import ui.View as View;
import ui.ViewPool as ViewPool;
import ui.ImageView as ImageView;
import ui.widget.GridView as GridView;
import ui.widget.ButtonView as ButtonView;
import ui.ImageScaleView as ImageScaleView;
import ui.SpriteView as SpriteView;
import ui.ScoreView as ScoreView;
import ui.ParticleEngine as ParticleEngine;
import entities.Entity as Entity;
import entities.EntityPool as EntityPool;
import parallax.Parallax as Parallax;
import ui.resource.loader as loader;
import effects;
import src.lib.uiInflater as uiInflater;

// game imports
import src.Config as config;

// math and utils shortcut references
var PI = Math.PI;
var abs = Math.abs;
var min = Math.min;
var max = Math.max;

// game constants
var MAX_TICK = config.maxTick;
var BG_WIDTH = config.bgWidth;
var BG_HEIGHT = config.bgHeight;
var STEP_TO_UPDATE_PARALLAX = 3;
var SHOW_HIT_BOUNDS = false;
var GAME_OVER_DELAY = config.gameOverDelay;
var MAX_TIME = 90000;
var TIMER_WIDTH = 402;
var TIMER_MARGIN = 0;
var TIMER_REAL_WIDTH = TIMER_WIDTH - 2 * TIMER_MARGIN; // Remove Margin
var MAIN_CHARATER_OSCILLATOR_DURATION = 500;
var SQUISH_DURATION = 500;

/**
 * Application Class
 * ~ automatically instantiated by devkit
 * ~ handles game initialization and loop
 * ~ the variable 'app' is a reference to the instance of Application
 */
var app;
exports = Class(GC.Application, function(supr) {
	this._settings = {
		alwaysRepaint: true,
		logsEnabled: true,
		showFPS: false,
		preload: ["resources/images/kfc"]
	};

	/**
	 * initUI
	 * ~ called automatically by devkit
	 * ~ initialize view hierarchy and game elements
	 */
	this.initUI = function() {
		app = this;

		this.setScreenDimensions(BG_WIDTH > BG_HEIGHT);

		// accepts and interprets player input
		this.inputLayer = new InputView({ parent: this.view, zIndex: 2 });

		// a 0.5 opacity dark overley at game over
		this.gameOverLayer = new View({
			parent: this.view,
			y: this.view.style.height - BG_HEIGHT,
			width: BG_WIDTH,
			height: BG_HEIGHT,
			zIndex: 1
		});
		this.gameOverLayer.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
		this.gameOverLayer.style.visible = false;

		// GameOver Text
		this.gameOverTxt = new ImageView({
			superview: this.gameOverLayer,
			x: (BG_WIDTH - 550) / 2,
			y: -345,
			width: 550,
			height: 345,
			image: "resources/images/game/UI/txt_gameover.png"
		});
		this.gameOverTxt.style.visible = false;

		// Ready Text
		this.readyTxt = new ImageView({
			superview: this.gameOverLayer,
			x: (BG_WIDTH - 530) / 2,
			y: (BG_HEIGHT - 160) / 2 - 200,
			scale:2,
			anchorX: 265,
			anchorY: 80,
			width: 530,
			height: 160,
			image: "resources/images/game/UI/txt_ready.png"
		});
		this.readyTxt.style.visible = false;

		// Go Text
		this.goTxt = new ImageView({
			superview: this.gameOverLayer,
			x: (BG_WIDTH - 400) / 2,
			y: (BG_HEIGHT - 200) / 2 - 200,
			anchorX: 200,
			anchorY: 100,
			scale: 0.5,
			width: 400,
			height: 200,
			image: "resources/images/game/UI/txt_go.png"
		});
		this.goTxt.style.visible = false;

		//Select Combo View
		this.selectComboView = new View({
			parent: this.view,
			y: this.view.style.height - BG_HEIGHT,
			width: BG_WIDTH,
			height: BG_HEIGHT,
			zIndex: 2000
		});
		this.selectComboView.style.backgroundColor = "#FFFFFF";
		this.selectComboView.style.visible = true;

		this.combo1Button = new ButtonView({
	      superview: this.selectComboView,
	      width: 200,
	      height: 60,
	      x: BG_WIDTH / 2 - 100,
	      y: 250,
	      backgroundColor : "#7f8c8d",
	      // images: {
	      //   up: "resources/images/blue1.png",
	      //   down: "resources/images/blue2.png",
	      //   disabled: "resources/images/white1.png"
	      // },
	      scaleMethod: "9slice",
	      sourceSlices: {
	        horizontal: {left: 80, center: 116, right: 80},
	        vertical: {top: 10, middle: 80, bottom: 10}
	      },
	      destSlices: {
	        horizontal: {left: 40, right: 40},
	        vertical: {top: 4, bottom: 4}
	      },
	      title: "Combo 1",
	      text: {
	        color: "#000044",
	        size: 16,
	        autoFontSize: false,
	        autoSize: false
	      },
	      on:{
	            up: bind(this, "onCombo1")
	      }
	    });

		this.onCombo1 = function() {
			animate(this.selectComboView).now({ opacity: 0 }, 400);
			this.selectComboView.style.visible = false;
		    app.reset();
		}

		// blocks player input to avoid traversing game elements' view hierarchy
		this.bgLayer = new View({
			parent: this.view,
			y: this.view.style.height - BG_HEIGHT,
			width: BG_WIDTH,
			height: BG_HEIGHT,
			blockEvents: true
		});

		this.mainUI = new View(merge({ parent: this.bgLayer, zIndex: 1000, y: BG_HEIGHT - this.view.style.height }, config.MainUI));
		uiInflater.addChildren(config.MainUI.children, this.mainUI);
		console.log("tententente");

		// Display score using ScoreView
		//this.scoreView = new ScoreView(merge({parent: this.view}, config.scoreView));
		// this view has relative position to the _dot_line (which is inside the bgLayer) 
		// => actually the offset y of it should calculate with the y of bgLayer
		this.heightView = new ScoreView(merge({parent: this.view, y: config.heightView.y + this.bgLayer.style.y}, config.heightView));

		// Display the timer
		this.timerView = new TimerView({ 
			superview: this.mainUI
		});
		
		
		// this._pause_button = new ImageView(merge({parent: app.view, x: 435, y: config.timerView.y + 83}, config.pause_button));
		// The parallax that holds all background objects
		this.parallax = new Parallax({ parent: this.bgLayer });
		
		// The ViewPool to creat trail animation
		this._trails = new ViewPool({
			ctor: TrailScore,
			initCount: 0,
			initOpts: {superview: this.view}
		});

		// scrolling layer relative to player
		this.elementLayer = new View({
			parent: this.bgLayer,
			zIndex: 10
		});
		
		// game elements
		this.playerEntityPool = new PlayerEntityPool({ parent: this.elementLayer });
		this.tileObjects = new TileObjects({ parent: this.elementLayer });

		// this.reset();
	};

	/**
	 * launchUI
	 * ~ called automatically by devkit when its engine is ready
	 */
	this.launchUI = function() {};

	/**
	 * setScreenDimensions
	 * ~ normalizes the game's root view to fit any device screen
	 */
	this.setScreenDimensions = function(horz) {
		var ds = device.screen;
		var vs = this.view.style;
		vs.width = horz ? ds.width * (BG_HEIGHT / ds.height) : BG_WIDTH;
		vs.height = horz ? BG_HEIGHT : ds.height * (BG_WIDTH / ds.width);
		vs.scale = horz ? ds.height / BG_HEIGHT : ds.width / BG_WIDTH;
	};

	/**
	 * reset
	 * ~ resets all game elements for a new game
	 */
	this.reset = function(data) {
		this.model = {
			currentscore: 0,
			targetscore: 0,
			comboscore: 0,
			totalheight: 0,
			gameOver: false
		};

		this._combo = new Combo(config.Combo[1]);
		// this.scoreView.setText(this.model.currentscore);
		this.heightView.setText(this.model.totalheight);
		this.heightView.style.y = config.heightView.y + this.bgLayer.style.y;
		this.timerView.reset();

		this._isStarActive = 0;
		this.elementLayer.style.y = 0;
		this.parallax.reset(config.backgroundLayers);
		this.playerEntityPool.reset();
		this.tileObjects.reset();
		this.inputLayer.reset();

		this._debugParallax = config.debugParallax;
		this.game_pause = false;
		this._heightDiff = 0;

		this.ShowReadyGo();
	};

	/**
	 * tick
	 * ~ called automatically by devkit for each frame
	 * ~ updates all game elements by delta time, dt
	 */
	var tickCount = 0;
	this.tick = function(dt) {
		if (this.game_pause || !this.model) 
			return;

		// Update the scoreView by animating to the target score		
		// if (this.model.currentscore < this.model.targetscore) {
		// 	this.model.currentscore += 3;
		// 	this.scoreView.setText(this.model.currentscore);
		// }

		// No need to update if the game is over of waits for restart
		if (app.model.gameOver || app.isShowingReadyGo)
			return;

		// TimerView should be update normally
		this.timerView.update(dt);
	 	this._trails.forEachActiveView(function(view, index) {
	 		view.update(dt);
	 	}, this);

	 	// limit to 60 FPS per second
		dt = 16;
		
		// update entities
		this.playerEntityPool.update(dt);
		this.tileObjects.update(dt);
		
		// players vertical movement determines view offset for everything
		// Only update parallax view after a '_stepToParallaxUpdate + 1' moves, to avoid blinking due to float calculation
		// the parallax.update(tickCount) is to make some layers (clouds) move
		if (!this._debugParallax) {
			if (this.playerEntityPool._playerOFFY != 0 && this.playerEntityPool._stepToParallaxUpdate < 0) {
				var screenOffY = -this.playerEntityPool.getScreenY();
				this.elementLayer.style.y = screenOffY;
				this.parallax.update(0, screenOffY, dt);
			} else {
				this.parallax.update(0, 0, dt);
			}
		} else {
			this.parallax.update(0, 10 * tickCount, dt);
		}
		tickCount++;
	};

	this.onHit = function() {
		if (!this._activeTile._isBouncingBack) {	// no need to process if the tile is boucing back because of a soft collision
			var collidedWidth = 0;
			var left = false;
			if (this._activeTile.x <= this._topTile.x) {
				collidedWidth = this._activeTile.x + this._activeTile.width - this._topTile.x;
				left = true;
			} else {
				collidedWidth = this._topTile.x + this._topTile.width - this._activeTile.x;
				left = false;
			}

			if (collidedWidth/this._topTile.width > 0.6) {	// A hard collision happens when the collided surfact is large than 60% of the width
				// End of falling action of the tile
				this._activeTile.onFallingFinished();
				this._heightDiff = -this._activeTile.height;
				this.onFallingFinished(true);

				// Update ScoreView + HeightView
				this.model.targetscore += Math.floor(collidedWidth/this._topTile.width * 100);
				this.model.totalheight++;
				this.heightView.setText(this.model.totalheight);

				// Start trail animation
				var srcY = this._topTile.y + this._topTile.height/2;
				if (this.playerEntityPool._playerOFFY != 0)
					srcY -= this.playerEntityPool.getScreenY();
				var ran = Math.random();
				if (ran > 0.5) {
					var left_trail = this._trails.obtainView({x: this._topTile.x + app._topTile.width/2, y: srcY, zIndex: 1000});
					left_trail.startTrailing({direction: "left"});
					ran = Math.random();
				} else {
					ran = 1;
				}

				if (ran > 0.5) {
					var right_trail = this._trails.obtainView({x: this._topTile.x + app._topTile.width/2, y: srcY, zIndex: 1000});
					right_trail.startTrailing({});
				}
			} else {
				// A soft collision makes the tile bounce back and fall out of the screen
				effects.squish(this._activeTile, {loop: false, duration: SQUISH_DURATION}).then(bind(this, function() {
					
				}));
				this._activeTile.startBounceBack(left);
			}
		}
	};

  /**
   * The function used to end falling state
   * @arg {boolean} hit - tells if the fall was a hard 
   */
	this.onFallingFinished = function(hit) {
		this.playerEntityPool.onFallingFinished(hit);
		if (hit) {
			if (this._activeTile.name == "tile_ice_yellow") {
				effects.sparkle(this._activeTile, {duration: 200});
				animate(this.view).wait(SQUISH_DURATION).then(bind(this, function() {
					effects.stop();
				}));
			} else {
				effects.squish(this._activeTile, {loop: false, duration: SQUISH_DURATION});
			}
			// Check if the landed tile has the same type with the current tile of the combo
			if(this._activeTile.name == app._combo.getCurrentMenuID())
			{
				console.log("Correct menu order");
				if(app._combo.isFinishCombo())
				{
					app._combo.reset();
					comboscore++;
				}
			}else{
				console.log("Not correct menu order"); 
				app._combo.reset();
			}

			this._topTile = this._activeTile;

			//Add time to the time left
			this.timerView.addTime();
		} else {
			app._combo.reset();
			if (this._isStarActive > 0) {
				this._isStarActive = 0;
				this.playerEntityPool.revertVX();
			}
		}
	};

	this.spawnTile = function(isFirst) {
		if (!isFirst) {
			app._combo.increaseIndex();
			this.tileObjects.spawn();
		}
	}

	this.startStarFall = function() {
		this._isStarActive = 4;

	}

	this.gameOver = function() {
		if (!this.model.gameOver) {
			this.model.gameOver = true;
			this.gameOverLayer.style.visible = true;
			this.gameOverTxt.style.visible = true;
			animate(this.gameOverTxt).now({y: (BG_HEIGHT - 345)/2}, 1000);
			animate(this.view).wait(500).then(bind(this, function() {	
				this._toConfirmRestart = true;
			}));
			app.playerEntityPool._koala.view.pause();
		}
	};

	this.restart = function() {
		this.gameOverLayer.style.visible = false;
		this.gameOverTxt.style.visible = false;
		this.gameOverTxt.style.y = -345;
		this.ShowReadyGo();
		this.reset();
	};

	this.ShowReadyGo = function() {
		this.isShowingReadyGo = true;
		this.gameOverLayer.style.visible = true;
		this.readyTxt.style.visible = true;
		animate(this.readyTxt).wait(500).now({ scale: 1}, 1000).wait(800).then(bind(this, function() {
			this.readyTxt.style.visible = false;
			this.readyTxt.style.scale = 2;
			this.goTxt.style.visible = true;
			animate(this.goTxt).wait(200).now({ scale: 1}, 400). wait(500).then({opacity: 0}, 1000).then(bind(this, function() {
				this.goTxt.style.visible = false;
				this.goTxt.style.opacity = 1;
				this.goTxt.style.scale = 0.5;
				animate(this.gameOverLayer).now({ opacity: 0 }, 400).then(bind(this, function() {
					this.gameOverLayer.style.visible = false;
					this.gameOverLayer.style.opacity = 1;
					this.isShowingReadyGo = false;
					this.playerEntityPool._koala.view.startAnimation("blink", {});
					this.playerEntityPool._initialY = this.playerEntityPool.getCurrentFrameMargin();
					this.playerEntityPool._dotted_box.view.style.visible = true;
				}));
			}));
		}));
	};
});

/**
 * Player Class
 */
var Player = Class(Entity, function() {
	var sup = Entity.prototype;
	this.name = "Player";
	
	this.update = function(dt) {
	};
});
 
var PlayerEntityPool = Class(EntityPool, function() {
	var sup = EntityPool.prototype;
	this.name = "playerEntityPool";

	this.init = function(opts) {
		opts.ctor = Entity;
		sup.init.call(this, opts);
	};

	// This Pool is special, we don't release Player when reset the game
	// But we create them :)
	this.reset = function() {
		sup.reset.call(this);
	
		this._dotted_box = this.obtain(config.playerEntityPool.dotted_box);
		this._koala = this.obtain(config.playerEntityPool.koala);
		this._blimp = this.obtain(config.playerEntityPool.blimp);
		this._dotted_line = this.obtain(config.playerEntityPool.dotted_line);

		this._koala_targetY = BG_HEIGHT;
		this._dotted_box.view.style.visible = false;

		this._isWaitingForTap = true;
		this._isMoving = false;	// Wait for the first tap to start moving
		this._stepToParallaxUpdate = STEP_TO_UPDATE_PARALLAX;
		this._playerOFFY = 0;	// This indicates the offset of koala when the parallax start moving up
		if (this._stepToParallaxUpdate == 0)
			this._playerOFFY = this._koala.y;
		this._height = 0;	// The total height

		this._mainCharaterAnim = animate(this._koala);
		this._mainCharaterAnim.clear();

		this._dotted_line_animation = animate(this._dotted_line);
		this._dotted_line_animation.clear();

	};
	
	this.update = function(dt) {

		this._blimp.x = this._koala.x;
		if (!app._activeTile._isFalling && app._activeTile.CanFall && !app._activeTile._isBouncingBack) {
			app._activeTile.x = this._koala.x + (BG_WIDTH - app._activeTile.view.width) / 2 - config.player_offsetX;
		}
		if (this._koala_targetY != BG_HEIGHT) { // this means player entities should be animated up
			this._koala.y = this._koala.y + (this._dotted_line.y - this._dotted_line_offsetY);
			this._dotted_box.y = this._dotted_box.y + (this._dotted_line.y - this._dotted_line_offsetY);
			this._dotted_line_offsetY = this._dotted_line.y;
			if (this._koala.y <= this._koala_targetY) {
				this._dotted_line_animation.clear();
				this._koala_targetY = BG_HEIGHT;
				if (this._playerOFFY == 0)
					app.heightView.style.y = this._dotted_line.y - 40 + app.bgLayer.style.y;	// this view has relative position to the _dot_line (which is inside the bgLayer) 
				// Here we start to receive input again + spawn new tile
				// Also, update the position of heightview
				// And therefore, we need to store the dotted_box original Y
				this._dotted_box._initialY = this._dotted_box.y;
				app.spawnTile(false);
			} else {
				if (this._stepToParallaxUpdate == 0) {
					app.heightView.style.y = this._dotted_line.y - 40 + app.bgLayer.style.y;	// this view has relative position to the _dot_line (which is inside the bgLayer) 
					this._playerOFFY = this._koala.y;
				}
			}
		}

		sup.update.call(this, dt);
	};

	this.animateKoala = function() {
		this._mainCharaterAnim
		.now({ x:  BG_WIDTH - this._koala.width}, MAIN_CHARATER_OSCILLATOR_DURATION, animate.easeOut)
		.then({ x: (BG_WIDTH - this._koala.width) / 2}, MAIN_CHARATER_OSCILLATOR_DURATION, animate.easeIn)
		.then({ x: 0 }, MAIN_CHARATER_OSCILLATOR_DURATION, animate.easeOut)
		.then({ x: (BG_WIDTH - this._koala.width) / 2}, MAIN_CHARATER_OSCILLATOR_DURATION, animate.easeIn)
		.then(bind(this, function() {
			this.animateKoala();
		}));
	};

	this.onInputSelect = function() {
		if (this._isWaitingForTap) {
			// Stop receiving user input
			this._isWaitingForTap = false;
			// Active falling state of the current active tile, don't let it move along the main character anymore
			if (app._activeTile._isFirst)
				app.timerView.showTimer();
			app._activeTile.startFalling();

			// Start moving the main character around x center
			if (!this._isMoving) {
				this._isMoving = true;
				this.animateKoala();
			}
			
			// if the active tile is a blue star, stop moving
			if (app._isStarActive == 4) {
				this._mainCharaterAnim.pause();
			}
			
			this._koala.view.startAnimation("drop", {});
		}
	};

	this.onFallingFinished = function(hit) {
		if (!hit)
			return;

		// Update the new position
		this._koala_targetY = this._koala.y + app._heightDiff;
		this._dotted_line_offsetY = this._dotted_line.y;

		// This one is actually a hack, -0.1 to be sure that the main character will reach its target above
		this._dotted_line_animation.now({y: this._dotted_line.y + app._heightDiff - 0.1}, 200, animate.linear);
		this._dotted_box.x = app._activeTile.x;
		this._stepToParallaxUpdate--;
	};

	this.getScreenY = function() {
		return this._koala.y - this._playerOFFY;
	};

	this.revertVX = function() {
		this._mainCharaterAnim.resume();
	};

	this.getCurrentFrameMargin = function() {
		var view = this._koala.view;
		var img = view.getFrame(view._currentAnimationName, view._currentFrame);
		var imgMap = img && img.getMap();
		var offY = config.player_scale * (imgMap && imgMap.marginBottom) || 0;

		return offY;
	};
});

/**
 * Tile Class
 */
 var TileObject = Class(Entity, function() {
 	var sup = Entity.prototype;

 	this.init = function(opts) {
 		sup.init.call(this, opts);
 	}

 	this.reset = function(opts) {
		sup.reset.call(this, opts);
		this.CanFall = true;	// indicates that this TileObject is waiting for input from user, it's active
		this._isFalling = false; // when this object starts to fall, the tile will not move along with the main character anymore
		this._isFirst = false; // first tile always stop at box.y, the rest will fall until it collides with others, or our of the screen		
		this._isBouncingBack = false;	// indicates that this TileObject is still bouncing or not

		if (this.view.sparkleEngine)
			this.view.sparkleEngine.killAllParticles();

		this.name = opts.id;
		this.zTop = opts.zTop;
		this.zBottom = opts.zBottom;
		this._targetY = 50000;	// Temporary
 	}

 	this.updatePos = function(dt) {
 		this.updateModel(dt);
 		this.view && this.view.update(dt);
 	};

 	this.updateModel = function(dt) {
	    this.model._previous.x = this.x;
    	this.model._previous.y = this.y;
    	
    	// update physics here
	    var x = this.model.x;
	    var y = this.model.y;
	    var vx = this.model.vx;
	    var vy = this.model.vy;
	    var ax = this.model.ax;
	    var ay = this.model.ay;

	    x += dt * vx / 2;
	    vx += dt * ax;
	    x += dt * vx / 2;

		var hit = false;
	    y += dt * vy / 2;
	    if (this._isFalling && !this._isBouncingBack && app._topTile && (app._topTile.uid != this.uid) && app._topTile.collidesWith(this)) {
	    	y = this._targetY;
	    	app.onHit();
	    	hit = true;
	    } else {
	    	vy += dt * ay;
	    	y += dt * vy / 2;
	    	if (this._isFalling && !this._isBouncingBack && app._topTile && (app._topTile.uid != this.uid) && app._topTile.collidesWith(this)) {
	    		y = this._targetY;
	    		app.onHit();	
	    		hit = true;	    		
	    	}
	    }

	    this.model.x = x;
	    this.model.y = y;
		if (!hit) {
		    this.model.vx = vx;
		    this.model.vy = vy;
		}
 	};

 	this.transform = function() {
 		var type = app.tileObjects.caclulateOpts();
 		var _isFirst = this._isFirst;

 		this.reset(type);
 		this._isFirst = _isFirst;
 	};

 	this.updateOpts = function(opts) {

 	};

 	this.update = function(dt) {
		// sup.update.call(this, dt);
		// Override udpate function
		this.updatePos(dt);

 		// calculate its target Y
		var desY = BG_HEIGHT;
		if (app.playerEntityPool._stepToParallaxUpdate >= 0) {
			desY = this._isFirst ? config.falling_offsetY : (BG_HEIGHT + this.view.height);
		}
		else {
			desY = BG_HEIGHT + this.view.height + app.playerEntityPool.getScreenY();
		}

		if (this.CanFall) {	// if the tile does not yet fall to a collision position
			if (!this._isFalling && !this._isBouncingBack) {
				this.view.style.y = this._initialY + (app.playerEntityPool._initialY - app.playerEntityPool.getCurrentFrameMargin());
				// app.playerEntityPool._dotted_box.y = app.playerEntityPool._dotted_box._initialY + (app.playerEntityPool._initialY - app.playerEntityPool.getCurrentFrameMargin());
			}


			if (!app.playerEntityPool._isWaitingForTap && this._isFalling) {
				if (this.y + this.height < desY) {
				} else {
					this.onFallingFinished();

					app._heightDiff = -this.height;
					app.onFallingFinished(this._isFirst);
					// Update score for this special case
					app.heightView.setText(++app.model.totalheight);
					app.model.targetscore += 100;

					// if (this._isFirst) app.timerView.showTimer();
					// As the tile goes out of screen, we wait for new tap
					app.spawnTile(this._isFirst);
					if (!this._isFirst) this.destroy();	
				}
			}

			if (this._isBouncingBack) {
				this.ay += dt/100000;

				if ((this.x + this.height < 0 || this.x > BG_WIDTH)
					&& (this.y > desY)) {
					this.ay = 0;
					this._isBouncingBack = false;
					this.onFallingFinished();
					app.onFallingFinished(false);
					
					// It's time to spawn another tile
					app.spawnTile(false);
					animate(this).clear();
					this.scaleX = this.scaleY = 1;
					this.destroy();
				}
			}
		} else {
			if (this.y + this.height > desY && !this._isFirst) this.destroy();
		}
 	};

 	this.isStar = function() {
 		if ( (this.name == "tile_star_blue") || (this.name == "tile_star_green") || (this.name == "tile_star_purple") || (this.name == "tile_star_yellow") )
 			return true;

 		return false;
 	}

 	this.onFallingFinished = function() {
 		this.CanFall = false;
 		this._isFalling = false;
 		this.vy = 0;
 		this.ay = 0;
 		this.vx = 0;
 	};

 	this.startBounceBack = function(isLeft) {
 		this.view.style.anchorX = this.view.style.width / 2;
 		this.view.style.anchorY = this.view.style.height / 2;
 		var _r = 0;
 		if (isLeft) _r = -Math.PI / 6;
 		else _r = Math.PI / 6;
 		animate(this.view).now({r: _r}, 100);

 		this._isFalling = false;
 		this._time = 0;
 		this.vy = -0.2;
 		this.ay = -0.001;
 		if (isLeft) { this.vx = -0.02; this.ax = -0.001; }
 		else { this.vx = 0.02; this.ax = 0.001; }

 		this._isBouncingBack = true;

 		if (app._topTile && app._topTile.zTop >= this.zBottom)
 			app.tileObjects._zIndex++;
 		else
 			app.tileObjects._zIndex--; 		
 	};

 	this.startFalling = function() {
		this._isFalling = true;

		if (this._isFirst) {
			this.ay = 0.005;
		} else {
			// Calculate a good acceleration
			// Starting velocity = 0, so the total travelling distance = 1/2a * t^2 while t = 16 * deltaT			
			// The target should be app._topTile.y + app._topTile.model.offsetY
			var distance = (app._topTile.y + app._topTile.model.offsetY) - (this.y + this.model.offsetY + this.model.height);

			// Let's say the duration is 20 frame
			if (!this.isStar())
				this.ay = distance * 2 / (16 * 20) / (16 * 20);
			else 
				this.ay = distance * 2 / (16 * 10) / (16 * 10);

			this._targetY = (app._topTile.y + app._topTile.model.offsetY) - (this.model.offsetY + this.model.height);
		}
 	};
 });

/**
 * Tiles Class
 */
 var TileObjects = Class(EntityPool, function() {
 	var sup = EntityPool.prototype;

 	this.init = function(opts) {
		opts.ctor = TileObject;
		sup.init.call(this, opts);
 	};

 	this.reset = function() {		
 		sup.reset.call(this);
 		this._zIndex = 300;
 		this.spawn();
 		app._activeTile._isFirst = true;
 		// And we recalculate the dotted_box
 		app.playerEntityPool._dotted_box.x = (BG_WIDTH - app.playerEntityPool._dotted_box.width) / 2;
 		app.playerEntityPool._dotted_box.y = app.playerEntityPool._dotted_box._initialY = app._activeTile.y + (app._activeTile.height / 2 - app.playerEntityPool._dotted_box.height / 2) / 2;
 		// When reset the game, we need the _topTile to reset too
 		app._topTile = app._activeTile;
 	};

 	this.update = function(dt) {
 		sup.update.call(this, dt);
 	};

 	this.caclulateOpts = function() {
 		var type;
 		
 		if (app._isStarActive > 1) {
 			app._isStarActive --;
 			type = config.tileObjects.types[config.tileObjects.types.length - app._isStarActive];
 		} else {
 			var done = false;
	 		while (!done) {
	 			done = true;
	 			// Limit the rate of star to 10% only
	 			// var star_ok = (Math.floor(Math.random() * 100) > 50);
	 			var star_ok = false;
	 			type = config.tileObjects.types[Math.floor(Math.random() * (config.tileObjects.types.length - 3))];	
	 			if (type.id == "tile_star_blue" && (app.playerEntityPool._stepToParallaxUpdate > -5 || !star_ok)) done = false;
	 		}

	 		if (app._isStarActive == 1) {
	 			app._isStarActive = 0;
	 			app.playerEntityPool.revertVX();
	 		}
 		}
 		
 		if (type.id == "tile_star_blue") 
 			app.startStarFall();
 		// type = app._combo.Next(config.tileObjects.types);


 		if (app._topTile && app._topTile.zTop >= type.zBottom)
 			this._zIndex--;
 		else
 			this._zIndex++;

		var offsetX = (BG_WIDTH - type.viewOpts.width) / 2 - config.player_offsetX + app.playerEntityPool._koala.x;
		var offsetY = app.playerEntityPool._koala.y + config.tile_ralativeY - type.viewOpts.height / 2;
		type = merge({x: offsetX, y: offsetY, viewOpts: merge({zIndex: this._zIndex}, type.viewOpts)}, type); 	

		return type;
 	}

 	this.spawn = function(opts) {
 		var type = opts || this.caclulateOpts();
 		
		app._activeTile = this.obtain(type);
		app._activeTile._initialY = app._activeTile.view.style.y;
 		app.playerEntityPool._dotted_box.y = app.playerEntityPool._dotted_box._initialY = app._activeTile.y + (app._activeTile.height / 2 - app.playerEntityPool._dotted_box.height / 2) / 2;
		if (!app._activeTile.isStar()) {
			var _width = app._activeTile.view.width;
			app._activeTile.view.width = 0;
			app._activeTile.view.height = 0;
			app._activeTile.vy = app.playerEntityPool._koala.vy;

			animate(app._activeTile.view).now({width: _width, height: type.viewOpts.height}, 200).then(function() {
				// As the new tile is ready, we wait for new tap
				app.playerEntityPool._isWaitingForTap = true;
			});
		} else {
			app.playerEntityPool._isWaitingForTap = true;
		}

		SHOW_HIT_BOUNDS && app._activeTile.view.showHitBounds();
 	};
 });

/**
 * TimerView Class
 * ~ a view that indicates time left
 */
var TimerView = Class(View, function() {
	var sup = View.prototype;

	this.init = function(opts) {
		opts.y = config.timerView.y;// + app.bgLayer.style.y;
		opts.x = config.timerView.x;
		opts = merge(opts, config.timerView);
		sup.init.call(this, opts);

		this._timer_full_parent = new View({
			parent: this,
			x: 0,
			y: config.timerView.timer_full.y,
			width: config.timerView.timer_full.width,
			height: config.timerView.timer_full.height,
			zIndex: config.timerView.timer_full.zIndex,
			clip: true
		})
		this._timer_empty_bar = new ImageView(merge({superview: this, image: "resources/images/kfc/BG_Timeline.png", zIndex: 997}, config.timerView.timer_empty));
		this._timer_full = new ImageView(merge({superview: this._timer_full_parent}, config.timerView.timer_full));
		this._timer_empty = new ImageView(merge({superview: this}, config.timerView.timer_empty));
		this._timer_number = new ScoreView(merge({parent: this, x: 196, y: 5, zIndex: 1000}, config.timerView.number));
		this._pause_button = new ImageView(merge({parent: app.view, x: BG_WIDTH - 105, y: 165}, config.pause_button));

		this._pause_button.on("InputSelect", bind(this, function() {
			this._pause_button.setImage("resources/images/kfc/Switch_Button.png");
			animate(this._pause_button).wait(50).then(bind(this, function() {
				this._pause_button.setImage("resources/images/kfc/Switch_Button_touched.png");
				app._activeTile.transform();
			}));
			// if (app.model.gameOver || app.isShowingReadyGo)
			// 	return;
			// this._pause_button.setImage("resources/images/game/UI/button_pause_pressed.png");
			// animate(this._pause_button).wait(50).then(bind(this, function() {
			// 	this._pause_button.setImage("resources/images/game/UI/button_pause.png");
			// 	app.game_pause = !app.game_pause;

			// 	if (app.game_pause) {
			// 		app.gameOverLayer.style.opacity = 0.5;
			// 		app.gameOverLayer.style.visible = true;
			// 		animate(app.gameOverLayer).now({ opacity: 1 }, 500);
			// 		app.playerEntityPool._mainCharaterAnim.pause();
			// 		app.playerEntityPool._koala.view.pause();
			// 	}
			// 	else {
			// 		animate(app.gameOverLayer).now({ opacity: 0 }, 500).then(function() {
			// 			app.gameOverLayer.style.visible = false;
			// 			app.gameOverLayer.style.opacity = 1;
			// 			app.playerEntityPool._mainCharaterAnim.resume();
			// 			app.playerEntityPool._koala.view.resume();	
			// 		});
			// 	}
			// }));
		}));

		this._timeIcon = new ImageView({
			superview: app.bgLayer,
			x: BG_WIDTH - 50 - 17.5,
			y: BG_HEIGHT - 80,
			anchorX: 17.5,
			anchorY: 17.5, 
			zIndex: 1000,
			width: 35,
			height: 35,
			image: "resources/images/game/UI/time_icon_0001.png"
		});
		this._timeIconAnimation = animate(this._timeIcon);		
	};

	this.reset = function(opts) {
		this._timer_full.style.visible = false;
		this._timer_empty.style.visible = false;
		this._timer_empty_bar.style.visible = false;
		this._timer_number.style.visible = false;
		this._timeIcon.style.visible = false;
		this._timerStart = false;
		this._intTime == -1;
		this.setTime(MAX_TIME);
		this._timer_number.setText("90");
	};

	this.setTime = function(time) {
		this._time = time;	
	};

	this.update = function(dt) {
		if (!this._timerStart)
			return;
			
		this._time -= dt;
		this._timer_full_parent.style.width = TIMER_MARGIN + this._time / MAX_TIME * TIMER_REAL_WIDTH;
		this._timer_number.setText(Math.floor(this._time / 1000) > 0 ? Math.floor(this._time / 1000) : 0);
		
		if (this._time < 0)
			app.gameOver();
	};

	this.showTimer = function() {
		this._timer_empty.style.visible = true;
		this._timer_empty_bar.style.visible = true;
		this._timer_full.style.visible = true;
		this._timer_number.style.visible = true;
		this._timerStart = true;
		this.setTime(MAX_TIME);
		this._timer_number.setText("90");
	};

	this.addTime = function() {
		this._timeIcon.style.visible = true;
		this._timeIconAnimation.clear();
		this._time += 100;
		this._timeIconAnimation.now({scale: 2.5}, 20).wait(300).then({scale: 1}, 20).then(bind(this, function() {
			this._timeIcon.style.visible = false;
		}));
	}
});

/**
 * TrailScore Class
 * ~ a view that manages game input
 */
var TrailScore = Class(View, function(supr) {
	var sup = View.prototype;

	this.init = function (opts) {
		sup.init.call(this, opts);

		this.style.visible = true;
		this._active = true;
	
	};

	this.startTrailing = function(opts) {
		var left = opts.direction || "";
		this.style.x = this.style.x || opts.x;
		this.style.y = this.style.y || opts.y;
		this._initialW = 30;
		this._initialH = 30;

		var offY = this.style.y - (this.style.y - 50) / 4 - Math.random() * (this.style.y / 2);
		animate(this).now({
			x: (BG_WIDTH - 30)/2,
			y: offY,
			width: 30,
			height: 30,
		}, 300, animate.linear)
		.then({ y: 50 }, 300, animate.linear)	
		.then(bind(this, function() {
			this.removeFromSuperview();
			app._trails.releaseView(this);
		}));


		var offX = 0;
		if (left == "left") {
			offX = -1 * (50 + 100 * Math.random());
		} else {
			offX = 50 + 100 * Math.random();
		}
		animate(this, 'curveOut')
		.now({ x: (BG_WIDTH - 30) / 2 + offX }, 300, animate.easeOut)
		.then({ x: (BG_WIDTH - 30) / 2}, 300, animate.easeIn);
	};

	this.update = function(dt) {
		this._initialW -= dt/100;
		this._initialH -= dt/100;
		var trail_image = new ImageView({
			superview: app.bgLayer,
			image: "resources/images/game/sparkly.png",
			x: this.style.x,
			y: this.style.y,
			zIndex: 1000,
			width: this._initialW,
			height: this._initialH,
			anchorX: this._initialW / 2,
			anchorY: this._initialH / 2,
			opacity: 0.8,
			compositeOperation: 'lighter'			
		});
		trail_image.style.visible = true;

		animate(trail_image).now({scale: 0}, dt * 24).then(function() { 	
			trail_image.style.visible = false;
			trail_image.removeFromSuperview();
		});
	}
});

/**
 * InputView Class
 * ~ a view that manages game input
 */
var InputView = Class(View, function() {
	var sup = View.prototype;

	this.init = function(opts) {
		opts.infinite = true;
		app._toConfirmRestart = false;
		sup.init.call(this, opts);
	};

	this.reset = function() {

	};

	this.onInputSelect = function(evt, pt) { 
		if (!app.model.gameOver && !app.isShowingReadyGo && !app.game_pause)
			app.playerEntityPool.onInputSelect();
		else if (app._toConfirmRestart) {
			app._toConfirmRestart = false;
			app.restart();
		}
	};
});

var Combo = Class(function(supr) {
	this.id = "combo";
	
	this.init = function(opts) {
		this.id = opts.name;
		this._currentMenuID = 0;
		this._menuArray = opts.menus;

		this.shuffleComboArray(this._menuArray);
	};

	this.reset = function(opts) {
		this._currentMenuID = -1;
		this._menuArray = config.Combo[1].menus;

		this.shuffleComboArray(this._menuArray);
	};

	this.shuffleComboArray = function(array) {
		var count = array.length,
		 	randomnumber,
		 	temp;
		while( count ){
			randomnumber = Math.random() * count-- | 0;
			temp = array[count];
			array[count] = array[randomnumber];
			array[randomnumber] = temp;
		}

 		for (var i = 0; i < array.length; i++) {
			console.log("Current Menu: " + i + " is: " + array[i].id);

			var menu = "menu" + i;
			app.mainUI.ComboMenu[menu].updateImages(array[i]);
			if (i == 0)
				app.mainUI.ComboMenu[menu].updateState("enabled");
		}

	};

	this.increaseIndex = function() {
		this._currentMenuID++;
		if (this._currentMenuID - 1 > 0) {
			var menu = "menu" + this._currentMenuID;
			app.mainUI.ComboMenu[menu].updateState("completed");
		}	
		menu = "menu" + this._currentMenuID;
		app.mainUI.ComboMenu[menu].updateState("enabled");

		console.log("_currentMenuID " + this._currentMenuID);
	};

	this.getCurrentMenuID = function(){
		return this._menuArray[this._currentMenuID].id;
	};

	this.isFinishCombo = function(){
		return this._currentMenuID == this._menuArray.length - 1;
	};
});
