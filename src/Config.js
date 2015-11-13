import device;

var CLOUD_SCALE = 0.7;
var BOX_SCALE = 1;
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
var BOX_HEIGHT = 74 * BOX_SCALE;
var BOX_OFFSETY = BG_HEIGHT - BOX_HEIGHT - BOX_HEIGHT;
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
        width: 149,
        height: 157,
        x: 0,
        y: 0,
        image: "resources/images/kfc/ICON_Combo_1.png"
      },
      {
        name: "ComboMenu",
        layout: "linear",
        direction: "horizontal",
        width: 427,
        height: 157,
        x: 160,
        y: 0,
        children: [
          {
            name: "menu0",
            cls: "src.MenuItem",
            width: 108,
            height: 105,
            x: 0,
            y: 0,
            // image: "resources/images/kfc/burger_able.png",
            // completeImage: "resources/images/kfc/burger_Completed.png",
            // disabledImage: "resources/images/kfc/burger_disable.png"
          },
          {
            name: "menu1",
            cls: "src.MenuItem",
            width: 108,
            height: 105,
            x: 0,
            y: 0,
            // image: "resources/images/kfc/potato_able.png",
            // completeImage: "resources/images/kfc/potato_Completed.png",
            // disabledImage: "resources/images/kfc/potato_disable.png"
          },
          {
            name: "menu2",
            cls: "src.MenuItem",
            width: 108,
            height: 105,
            x: 0,
            y: 0,
            // image: "resources/images/kfc/pepsi_able.png",
            // completeImage: "resources/images/kfc/pepsi_Completed.png",
            // disabledImage: "resources/images/kfc/pepsi_disable.png"
          },
          {
            name: "menu3",
            cls: "src.MenuItem",
            width: 108,
            height: 105,
            x: 0,
            y: 0,
            // image: "resources/images/kfc/popcorn_able.png",
            // completeImage: "resources/images/kfc/popcorn_Completed.png",
            // disabledImage: "resources/images/kfc/popcorn_disable.png"
          }
        ]       
      },
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
          image: "resources/images/kfc/BG_back.png" 
        },
        { image: "resources/images/kfc/BG_Tile.png" },
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
          width: BG_WIDTH,
          height: BG_HEIGHT,
          yAlign: 'bottom',
          xAlign: 'right',
          image: "resources/images/kfc/BG_City_Middle.png"
        }
      ]
    },    
    {
      id: 'left_clouds',
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
          styleRanges: { x: [0 - 400 * CLOUD_SCALE / 2, BG_WIDTH / 2 - 400 * CLOUD_SCALE / 2] },
          width: 122,
          height: 44,
          image: "resources/images/kfc/Cloud_2.png"
        }    
      ]
    },
    {
      id: 'right_clouds',
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
          styleRanges: { x: [0 - 400 * CLOUD_SCALE / 2, BG_WIDTH / 2 - 400 * CLOUD_SCALE / 2] },
          width: 122,
          height: 44,
          image: "resources/images/kfc/Cloud_2.png"
        } 
      ]
    },    
    {
      id: 'cloud2',
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
          // styleRanges: { x: [0, BG_WIDTH * 0.25] },
          width: 337 * CLOUD_SCALE,
          height: 123 * CLOUD_SCALE,
          image: "resources/images/kfc/Cloud_1.png"
        }
      ]
    },
    {
      id: 'clould3',
      spawnCount: 20,
      xMultiplier: 0, // To make it move, use xVelocity
      xCanSpawn: false,
      xCanRelease: false,
      // xVelocity: -10,
      yMultiplier: 0.4,
      yCanSpawn: true,
      yCanRelease: false,
      yGapRange: [350, 550],
      yLimitMax: - BG_HEIGHT / 4,
      pieceOptions: [
        {
          // styleRanges: { x: [BG_WIDTH * 0.75, BG_WIDTH] },
          width: 561 * CLOUD_SCALE,
          height: 122 * CLOUD_SCALE,
          image: "resources/images/kfc/Cloud_3.png"
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
          height: BG_HEIGHT,
          yAlign: 'bottom',
          image: "resources/images/kfc/BG_KFC_Store_front.png"
        }
      ]
    },
    {
      id: 'redtable',
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
          height: 104,
          yAlign: 'bottom',
          image: "resources/images/kfc/RedTable.png"
        }
      ]
    },
    {
      id: 'tray',
      spawnCount: 1,
      xMultiplier: 0,
      xCanSpawn: false,
      xCanRelease: false,
      yMultiplier: 0.4,
      yCanSpawn: true,
      yCanRelease: false,
      pieceOptions: [
        {
          x: (BG_WIDTH - 226) / 2,
          y: BG_HEIGHT,
          width: 226,
          height: 74,
          yAlign: 'bottom',
          image: "resources/images/kfc/Tray.png"
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
        {
          id: "tile_godzilla",
          image: "resources/images/kfc/burger_able.png",
          completeImage: "resources/images/kfc/burger_Completed.png",
          disabledImage: "resources/images/kfc/burger_disable.png"          
        },
        {
          id: "tile_jelly",
          image: "resources/images/kfc/potato_able.png",
          completeImage: "resources/images/kfc/potato_Completed.png",
          disabledImage: "resources/images/kfc/potato_disable.png"
        },
        {
          id: "tile_kong",
          image: "resources/images/kfc/pepsi_able.png",
          completeImage: "resources/images/kfc/pepsi_Completed.png",
          disabledImage: "resources/images/kfc/pepsi_disable.png"
        },
        {
          id: "tile_jelly",
          image: "resources/images/kfc/popcorn_able.png",
          completeImage: "resources/images/kfc/popcorn_Completed.png",
          disabledImage: "resources/images/kfc/popcorn_disable.png"          
        }
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
      y: BG_HEIGHT - 96,
      zIndex: 1000,
      width: 92,
      height: 96,
      image: "resources/images/kfc/Switch_Button.png"    
  },
  comboView: {
    x: 10,
    y: 10,
    width: BG_WIDTH - 10,
    height: 200,
    zIndex: 1
  },
  timerView: {
    x: 160,
    y: 105,
    width: 402,
    height: 41,
    zIndex: 1000,
    timer_full: {
      image: "resources/images/kfc/Timeline.png",
      x: 0,
      y: 0,
      width: 402,
      height: 41,
      zIndex: 999,
    },
    timer_empty: {
      image: "resources/images/kfc/Boder_Timeline.png",
      x: 0,
      y: 0,
      width: 402,
      height: 41,
      zIndex: 998
    },
    number: {
      width: 402,
      height: 40,
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
