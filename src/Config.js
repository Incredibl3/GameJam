import device;

var CLOUD_SCALE = 0.7;
var BOX_SCALE = 0.8;
var TILE_SCALE = 0.8;
var BUTTON_SCALE = device.width / 576;
var BG_WIDTH = 576;
var BG_HEIGHT = 1024;
var PLAYER_SCALE = 0.6;
var PLAYER_OFFSETX = (BG_WIDTH - 480 * PLAYER_SCALE) / 2;
var TILE_HEIGHT = 150 * TILE_SCALE;
var TILE_VELOCITY = 0.1;
var TILE_HIT_BOUNDS_MARGIN_X = 10;
var TILE_HIT_BOUNDS_MARGIN_BOTTOM = 15;
var BOX_HEIGHT = 400 * BOX_SCALE;
var BOX_OFFSETY = BG_HEIGHT - BOX_HEIGHT - 0.5 * BOX_HEIGHT;
var FALLING_OFFSETY = BOX_OFFSETY + BOX_HEIGHT;
var PLAYER_OFFSETY_ADJUSTMENT = 50;
var PLAYER_OFFSETY = BG_HEIGHT / 2 - 550 * PLAYER_SCALE + PLAYER_OFFSETY_ADJUSTMENT;
var TILE_RELATIVEY = 500 * PLAYER_SCALE;
var TILE_OFFSETY = PLAYER_OFFSETY + TILE_RELATIVEY;
var BUTTON_WIDTH = 115;
var BUTTON_HEIGHT = 115;

exports = {
  debugParallax: false,
  maxTick: 100,
  bgWidth: BG_WIDTH,
  bgHeight: BG_HEIGHT,
  player_scale: PLAYER_SCALE,
  player_offsetX: PLAYER_OFFSETX,
  tile_ralativeY: TILE_RELATIVEY,
  tile_velocity: TILE_VELOCITY,
  falling_offsetY: FALLING_OFFSETY,
  yAdjustment: PLAYER_OFFSETY_ADJUSTMENT,
  gameOverDelay: 3000,
  MainUI: {
    name: 'UILayout',
    x: 0,
    y: 0,
    width: 576,
    height: 250,
    children: [
      {
        name: "ComboImage",
        cls: "ui.ImageView",
        width: 250,
        height: 250,
        x: 0,
        y: 0,
        image: "resources/images/game/UI/time_icon_0001.png"
      },
      {
        name: "ComboMenu",
        layout: "linear",
        direction: "horizontal",
        width: 326,
        height: 200,
        x: 250,
        y: 0,
        children: [
          {
            name: "ComboMenu1",
            cls: "ui.ImageView",
            width: 80,
            height: 80,
            x: 0,
            y: 0,
            image: "resources/images/game/UI/time_icon_0001.png"
          },
          {
            name: "ComboMenu2",
            cls: "ui.ImageView",
            width: 80,
            height: 80,
            x: 0,
            y: 0,
            image: "resources/images/game/UI/time_icon_0001.png"
          },
          {
            name: "ComboMenu3",
            cls: "ui.ImageView",
            width: 80,
            height: 80,
            x: 0,
            y: 0,
            image: "resources/images/game/UI/time_icon_0001.png"
          },
          {
            name: "ComboMenu4",
            cls: "ui.ImageView",
            width: 80,
            height: 80,
            x: 0,
            y: 0,
            image: "resources/images/game/UI/time_icon_0001.png"
          }
        ]       
      },
      // {
      //   name: "Timer",
      //   cls: "ui.ImageView",
      //   width: 250,
      //   height: 250,
      //   x: 0,
      //   y: 0,
      //   image: "resources/images/game/UI/time_icon_0001.png"
      // }      
    ]
  },
  backgroundLayers: [
    {
      id: 'bg',
      spawnCount: 3,
      spawnBounded: true,
      xMultiplier: 0,
      xCanSpawn: false,
      xCanRelease: false,
      yMultiplier: 0.15,
      yCanSpawn: true,
      yCanRelease: false,
      yLimitMax: 0,
      ordered: true,
      pieceOptions: [
        { 
          y: BG_HEIGHT,
          yAlign: 'bottom',
          height: BG_HEIGHT,
          image: "resources/images/game/GameScreen/sky_bottom.png" 
        },
        { image: "resources/images/game/GameScreen/sky_top.png" },
        { image: "resources/images/game/GameScreen/sky_middle.png" }
      ]
    },
    {
      id: 'midground',
      spawnCount: 1,
      xMultiplier: 0,
      xCanSpawn: false,
      xCanRelease: false,
      yMultiplier: 0.2,
      yCanSpawn: true,
      yCanRelease: false,
      pieceOptions: [
        {
          y: BG_HEIGHT,
          x: BG_WIDTH,
          width: 450,
          height: 1516,
          yAlign: 'bottom',
          xAlign: 'right',
          image: "resources/images/game/GameScreen/midground.png"
        }
      ]
    },    
    {
      id: 'left_ship',
      spawnCount: 40,
      xMultiplier: 0,
      xCanSpawn: false,
      xCanRelease: false,
      xVelocity: 4,
      yMultiplier: 0.25,
      yCanSpawn: true,
      yCanRelease: false,
      yGapRange: [200, 450],
      yLimitMax: BG_HEIGHT / 16,
      pieceOptions: [
        {
          styleRanges: { x: [0 - 260 * CLOUD_SCALE / 2, BG_WIDTH / 2 - 260 * CLOUD_SCALE / 2] },
          width: 160 * CLOUD_SCALE,
          height: 86 * CLOUD_SCALE,
          scale: 0.75,
          image: "resources/images/game/GameScreen/ship_01.png"
        },
        {
          styleRanges: { x: [0 - 450 * CLOUD_SCALE / 2, BG_WIDTH / 2 - 450 * CLOUD_SCALE / 2] },
          width: 190 * CLOUD_SCALE,
          height: 100 * CLOUD_SCALE,
          scale: 0.75,
          image: "resources/images/game/GameScreen/ship_02.png"
        },
        {
          styleRanges: { x: [0 - 450 * CLOUD_SCALE / 2, BG_WIDTH / 2 - 450 * CLOUD_SCALE / 2] },
          width: 168 * CLOUD_SCALE,
          height: 104 * CLOUD_SCALE,
          scale: 0.75,
          image: "resources/images/game/GameScreen/ship_04.png"
        }     
      ]
    },
    {
      id: 'right_ship',
      spawnCount: 40,
      xMultiplier: 0,
      xCanSpawn: false,
      xCanRelease: false,
      xVelocity: -4,
      yMultiplier: 0.25,
      yCanSpawn: true,
      yCanRelease: false,
      yGapRange: [200, 450],
      yLimitMax: - BG_HEIGHT / 16,
      pieceOptions: [
        {
          styleRanges: { x: [BG_WIDTH / 2, BG_WIDTH - 260 * CLOUD_SCALE / 2 ] },
          width: 160 * CLOUD_SCALE,
          height: 86 * CLOUD_SCALE,
          scale: 0.75,
          image: "resources/images/game/GameScreen/ship_01.png"
        },
        {
          styleRanges: { x: [BG_WIDTH / 2, BG_WIDTH - 450 * CLOUD_SCALE / 2] },
          width: 190 * CLOUD_SCALE,
          height: 100 * CLOUD_SCALE,
          scale: 0.75,
          image: "resources/images/game/GameScreen/ship_02.png"
        },
        {
          styleRanges: { x: [BG_WIDTH / 2, BG_WIDTH - 450 * CLOUD_SCALE / 2] },
          width: 168 * CLOUD_SCALE,
          height: 104 * CLOUD_SCALE,
          scale: 0.75,
          image: "resources/images/game/GameScreen/ship_04.png"
        }  
      ]
    },    
    {
      id: 'ship2',
      spawnCount: 20,
      xMultiplier: 0, // To make it move, use xVelocity
      xCanSpawn: false,
      xCanRelease: false,
      xVelocity: 10,
      yMultiplier: 0.4,
      yCanSpawn: true,
      yCanRelease: false,
      yGapRange: [300, 400],
      yLimitMax: BG_HEIGHT / 8,
      pieceOptions: [
        {
          styleRanges: { x: [0, BG_WIDTH * 0.25] },
          width: 168 * CLOUD_SCALE,
          height: 104 * CLOUD_SCALE,
          image: "resources/images/game/GameScreen/ship_03.png"
        }
      ]
    },
    {
      id: 'ship3',
      spawnCount: 20,
      xMultiplier: 0, // To make it move, use xVelocity
      xCanSpawn: false,
      xCanRelease: false,
      xVelocity: -10,
      yMultiplier: 0.4,
      yCanSpawn: true,
      yCanRelease: false,
      yGapRange: [250, 550],
      yLimitMax: - BG_HEIGHT / 4,
      pieceOptions: [
        {
          styleRanges: { x: [BG_WIDTH * 0.75, BG_WIDTH] },
          width: 168 * CLOUD_SCALE,
          height: 104 * CLOUD_SCALE,
          image: "resources/images/game/GameScreen/ship_03.png"
        }
      ]
    },
    {
      id: 'foreground',
      spawnCount: 1,
      xMultiplier: 0,
      xCanSpawn: false,
      xCanRelease: false,
      yMultiplier: 0.4,
      yCanSpawn: true,
      yCanRelease: false,
      pieceOptions: [
        {
          y: BG_HEIGHT,
          width: BG_WIDTH,
          height: 1084,
          yAlign: 'bottom',
          image: "resources/images/game/GameScreen/foreground.png"
        }
      ]
    },
    {
      id: 'wire',
      spawnCount: 6,
      xMultiplier: 0,
      xCanSpawn: false,
      xCanRelease: false,
      yMultiplier: 0.45,
      yCanSpawn: true,
      yCanRelease: false,
      yGapRange: [350, 600],
      yLimitMax: -BG_HEIGHT / 8,
      pieceOptions: [
        {
          width: 576,
          height: 137,
          image: "resources/images/game/GameScreen/wire_01.png"
        },
        {
          width: 576,
          height: 109,
          image: "resources/images/game/GameScreen/wire_02.png"
        },
        {
          width: 576,
          height: 216,
          image: "resources/images/game/GameScreen/wire_03.png"
        }     
      ]
    }
  ],
  Combo: [
    {
      name: "combo1",
      menus: [
        "tile_godzilla",
        "tile_jelly",
        "tile_kong",
        "tile_squid",
        "tile_wolf"
      ]
    },
    {
      name: "combo2",
      menus: [
        "tile_godzilla",
        "tile_jelly", 
        "tile_kong",
        "tile_jelly"
      ]
    },
    {
      name: "combo3",
      menus: [
        "tile_godzilla",
        "tile_jelly",
        "tile_kong",
        "tile_jelly",
        "tile_godzilla",
        "tile_kong"
      ]
    }
  ],
  playerEntityPool: {
    offsetX: PLAYER_OFFSETX,
    offsetY: PLAYER_OFFSETY,
    dotted_box: {
      x: (BG_WIDTH - 176 * TILE_SCALE) / 2,
      y: TILE_OFFSETY,
    hitOpts: {
      width: 176 * (TILE_SCALE + 0.1),
      height: 147 * (TILE_SCALE + 0.1)
    },
    viewOpts: {
      width: 176 * (TILE_SCALE + 0.1),
      height: 147 * (TILE_SCALE + 0.1),
      opacity: 0.5,
      url: "resources/images/game/UI/dottedbox.png"
    }          
    },
	  koala: {
	    x: PLAYER_OFFSETX,
	    y: PLAYER_OFFSETY,
		hitOpts: {
		  width: 480 * PLAYER_SCALE,
		  height: 550 * PLAYER_SCALE
		},
		viewOpts: {
		  zIndex: 500,
		  width: 480 * PLAYER_SCALE,
		  height: 550 * PLAYER_SCALE,
		  defaultAnimation: "blink",
		  autoStart: false,
      frameRate: 20,
		  loop: true,
		  url: "resources/images/game/Character/kaiju"
		}
	  },
	  blimp: {
	    x: PLAYER_OFFSETX,
	    y: PLAYER_OFFSETY,
		hitOpts: {
		  width: 530 * PLAYER_SCALE,
		  height: 870 * PLAYER_SCALE
		},
		viewOpts: {
		  zIndex: 0,
		  width: 530 * PLAYER_SCALE,
		  height: 870 * PLAYER_SCALE,
		  url: "resources/images/game/Character/blimp.png"
		}	
	  },
	  dotted_line: {
	    x: 0,
	    y: FALLING_OFFSETY + 10,

		hitOpts: {
		  width: 576,
		  height: 21
		},
		viewOpts: {
		  zIndex: 0,
		  width: 576,
		  height: 21,
		  url: "resources/images/game/UI/dottedline.png"
		}	
	  }	  
  },
  tileObjects: {
  	types: [
  		{
  			id: "tile_godzilla",
        zTop: 1,
        zBottom: 0,
			  x: (BG_WIDTH - 166 * TILE_SCALE) / 2,
			  y: TILE_OFFSETY,
  			hitOpts: {
          offsetX: 0,
          offsetY: 10,  // If you change this, change the value in height too
  				width: 166 * TILE_SCALE,
				  height: 150 * TILE_SCALE - 10 - TILE_HIT_BOUNDS_MARGIN_BOTTOM
  			},
  			viewOpts: {
  			  width: 166 * TILE_SCALE,
  			  height: 150 * TILE_SCALE,
          anchorX: 166 * TILE_SCALE / 2,
          anchorY: 150 * TILE_SCALE,
          r: 0,
  			  url: "resources/images/game/GameScreen/tile_godzilla.png"
  			}	
  		},
      {
        id: "tile_jelly",
        zTop: 0,
        zBottom: 0,
        x: (BG_WIDTH - 166 * TILE_SCALE) / 2,
        y: TILE_OFFSETY,
        hitOpts: {
          offsetX: 0,
          offsetY: 0,
          width: 166 * TILE_SCALE,
          height: 140 * TILE_SCALE - TILE_HIT_BOUNDS_MARGIN_BOTTOM
        },
        viewOpts: {
          width: 166 * TILE_SCALE,
          height: 140 * TILE_SCALE,
          anchorX: 166 * TILE_SCALE / 2,
          anchorY: 140 * TILE_SCALE,
          r: 0,
          url: "resources/images/game/GameScreen/tile_jelly.png"
        } 
      },
      {
        id: "tile_kong",
        zTop: 1,
        zBottom: 0,
        x: (BG_WIDTH - 192 * TILE_SCALE) / 2,
        y: TILE_OFFSETY,
        hitOpts: {
          offsetX: 20,
          offsetY: 20,
          width: 192 * TILE_SCALE - 40,
          height: 166 * TILE_SCALE - 20 - TILE_HIT_BOUNDS_MARGIN_BOTTOM
        },
        viewOpts: {
          width: 192 * TILE_SCALE,
          height: 166 * TILE_SCALE,
          anchorX: 192 * TILE_SCALE / 2,
          anchorY: 166 * TILE_SCALE,
          r: 0,
          url: "resources/images/game/GameScreen/tile_kong.png"
        }
      },
      {
        id: "tile_squid",
        zTop: 0,
        zBottom: 2,
        x: (BG_WIDTH - 166 * TILE_SCALE) / 2,
        y: TILE_OFFSETY,
        hitOpts: {
          offsetX: 0,
          offsetY: 0,
          width: 166 * TILE_SCALE,
          height: 155 * TILE_SCALE - 15 - TILE_HIT_BOUNDS_MARGIN_BOTTOM
        },
        viewOpts: {
          width: 166 * TILE_SCALE,
          height: 155 * TILE_SCALE,
          anchorX: 166 * TILE_SCALE / 2,
          anchorY: 155 * TILE_SCALE,
          r: 0,
          url: "resources/images/game/GameScreen/tile_squid.png"
        } 
      },
      {
        id: "tile_wolf",
        zTop: 1,
        zBottom: 0,
        x: (BG_WIDTH - 166 * TILE_SCALE) / 2,
        y: TILE_OFFSETY,
        hitOpts: {
          offsetX: 0,
          offsetY: 5,
          width: 166 * TILE_SCALE,
          height: 142 * TILE_SCALE - 5 - TILE_HIT_BOUNDS_MARGIN_BOTTOM
        },
        viewOpts: {
          width: 166 * TILE_SCALE,
          height: 142 * TILE_SCALE,
          anchorX: 166 * TILE_SCALE / 2,
          anchorY: 142 * TILE_SCALE,
          r: 0,
          url: "resources/images/game/GameScreen/tile_wolf.png"
        } 
      },
      {
        id: "tile_star_blue",
        zTop: 0,
        zBottom: 0,
        x: (BG_WIDTH - 172 * TILE_SCALE) / 2,
        y: TILE_OFFSETY,
        hitOpts: {
          offsetX: 0,
          offsetY: 5,
          width: 172 * TILE_SCALE,
          height: 140 * TILE_SCALE - 5 - TILE_HIT_BOUNDS_MARGIN_BOTTOM
        },
        viewOpts: {
          width: 172 * TILE_SCALE,
          height: 140 * TILE_SCALE,
          anchorX: 172 * TILE_SCALE / 2,
          anchorY: 140 * TILE_SCALE,
          r: 0,
          url: "resources/images/game/GameScreen/tile_star_blue.png"
        }
      },
      {
        id: "tile_star_green",
        zTop: 0,
        zBottom: 0,
        x: (BG_WIDTH - 172 * TILE_SCALE) / 2,
        y: TILE_OFFSETY,
        hitOpts: {
          offsetX: 0,
          offsetY: 5,
          width: 172 * TILE_SCALE,
          height: 140 * TILE_SCALE - 5 - TILE_HIT_BOUNDS_MARGIN_BOTTOM
        },
        viewOpts: {
          width: 172 * TILE_SCALE,
          height: 140 * TILE_SCALE,
          anchorX: 172 * TILE_SCALE / 2,
          anchorY: 140 * TILE_SCALE,
          r: 0,
          url: "resources/images/game/GameScreen/tile_star_green.png"
        }
      },
      {
        id: "tile_star_purple",
        zTop: 0,
        zBottom: 0,
        x: (BG_WIDTH - 172 * TILE_SCALE) / 2,
        y: TILE_OFFSETY,
        hitOpts: {
          offsetX: 0,
          offsetY: 5,
          width: 172 * TILE_SCALE,
          height: 140 * TILE_SCALE - TILE_HIT_BOUNDS_MARGIN_BOTTOM
        },
        viewOpts: {
          width: 172 * TILE_SCALE,
          height: 140 * TILE_SCALE,
          anchorX: 172 * TILE_SCALE / 2,
          anchorY: 140 * TILE_SCALE,
          r: 0,
          url: "resources/images/game/GameScreen/tile_star_purple.png"
        }
      },
      {
        id: "tile_star_yellow",
        zTop: 0,
        zBottom: 0,
        x: (BG_WIDTH - 172 * TILE_SCALE) / 2,
        y: TILE_OFFSETY,
        hitOpts: {
          offsetX: 0,
          offsetY: 5,
          width: 172 * TILE_SCALE,
          height: 140 * TILE_SCALE - 5 - TILE_HIT_BOUNDS_MARGIN_BOTTOM
        },
        viewOpts: {
          width: 172 * TILE_SCALE,
          height: 140 * TILE_SCALE,
          anchorX: 172 * TILE_SCALE / 2,
          anchorY: 140 * TILE_SCALE,
          r: 0,
          url: "resources/images/game/GameScreen/tile_star_yellow.png"
      }
      },       
  	]
  },
  scoreView: {
    x: 0,
    y: 0,
    width: 576,
    height: 100,
    text: "0000",
    horizontalAlign: "center",
    spacing: -24,
    characterData: {
      "0": {image: "resources/images/game/numbers/0.png"},
      "1": {image: "resources/images/game/numbers/1.png"},
      "2": {image: "resources/images/game/numbers/2.png"},
      "3": {image: "resources/images/game/numbers/3.png"},
      "4": {image: "resources/images/game/numbers/4.png"},
      "5": {image: "resources/images/game/numbers/5.png"},
      "6": {image: "resources/images/game/numbers/6.png"},
      "7": {image: "resources/images/game/numbers/7.png"},
      "8": {image: "resources/images/game/numbers/8.png"},
      "9": {image: "resources/images/game/numbers/9.png"}
    }
  }, 
  heightView: {
    x: 8,
    y: FALLING_OFFSETY - 40,  
    width: 576,
    height: 50,
    text: "00",
    horizontalAlign: "left",
    spacing: -8,
    characterData: {
      "0": {image: "resources/images/game/numbers/0.png"},
      "1": {image: "resources/images/game/numbers/1.png"},
      "2": {image: "resources/images/game/numbers/2.png"},
      "3": {image: "resources/images/game/numbers/3.png"},
      "4": {image: "resources/images/game/numbers/4.png"},
      "5": {image: "resources/images/game/numbers/5.png"},
      "6": {image: "resources/images/game/numbers/6.png"},
      "7": {image: "resources/images/game/numbers/7.png"},
      "8": {image: "resources/images/game/numbers/8.png"},
      "9": {image: "resources/images/game/numbers/9.png"}
    }
  },
  pause_button: {
      x: 0,
      y: BG_HEIGHT - BUTTON_HEIGHT,
      zIndex: 1000,
      width: BUTTON_WIDTH,
      height: BUTTON_HEIGHT,
      image: "resources/images/game/UI/button_pause.png"    
  },
  comboView: {
    x: 10,
    y: 10,
    width: BG_WIDTH - 10,
    height: 200,
    zIndex: 1
  },
  timerView: {
    //x: BG_WIDTH - BUTTON_WIDTH,
    x: 100,
    //y: (BG_HEIGHT - 105),
    y: 105,
    width: 350,
    height: 95,
    zIndex: 1000,
    timer_full: {
      image: "resources/images/game/UI/timer_big_full.png",
      x: 0,
      y: 0,
      width: 350,
      height: 95,
      zIndex: 999,
    },
    timer_empty: {
      image: "resources/images/game/UI/timer_big_empty.png",
      x: 110,
      y: 0,
      width: 350,
      height: 95,
      zIndex: 998
    },
    number: {
      width: 576,
      height: 50,
      text: "00",
      horizontalAlign: "left",
      spacing: -8,
      characterData: {
        "0": {image: "resources/images/game/timer_numbers/0.png"},
        "1": {image: "resources/images/game/timer_numbers/1.png"},
        "2": {image: "resources/images/game/timer_numbers/2.png"},
        "3": {image: "resources/images/game/timer_numbers/3.png"},
        "4": {image: "resources/images/game/timer_numbers/4.png"},
        "5": {image: "resources/images/game/timer_numbers/5.png"},
        "6": {image: "resources/images/game/timer_numbers/6.png"},
        "7": {image: "resources/images/game/timer_numbers/7.png"},
        "8": {image: "resources/images/game/timer_numbers/8.png"},
        "9": {image: "resources/images/game/timer_numbers/9.png"}
      }
    }
  }
};
