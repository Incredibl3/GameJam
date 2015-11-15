import device;

//Reference aspect ratio as long/short
var delta = 0.01;
var _16x9 = 16/9;
var _3x2 = 3/2;
var _4x3 = 4/3;
var ASPECT_RATIO = device.screen.height / device.screen.width;
logger.log ("aspect ratio ", ASPECT_RATIO);

var CLOUD_SCALE = 0.7;
var BOX_SCALE = 1;
var TILE_SCALE = 1;
var BUTTON_SCALE = device.width / 576;
var BG_WIDTH = 576;
var BG_HEIGHT = 1024;
var PLAYER_SCALE = 2;
var PLAYER_OFFSETX = (BG_WIDTH - 151 * PLAYER_SCALE) / 2;
var TILE_HEIGHT = 150 * TILE_SCALE;
var TILE_VELOCITY = 0.1;
var TILE_HIT_BOUNDS_MARGIN_X = 10;
var TILE_HIT_BOUNDS_MARGIN_BOTTOM = 15;
var BOX_HEIGHT = 74 * BOX_SCALE;
var BOX_OFFSETY = BG_HEIGHT - BOX_HEIGHT - BOX_HEIGHT;
var FALLING_OFFSETY = BOX_OFFSETY + BOX_HEIGHT;
var PLAYER_OFFSETY_ADJUSTMENT = 50;
var PLAYER_OFFSETY = BG_HEIGHT / 2 - 550 * PLAYER_SCALE + PLAYER_OFFSETY_ADJUSTMENT;
var TILE_RELATIVEY = 51 * PLAYER_SCALE + 30;
var TILE_OFFSETY = PLAYER_OFFSETY + TILE_RELATIVEY;
var BUTTON_WIDTH = 115;
var BUTTON_HEIGHT = 115;
var STEP_TO_UPDATE_PARALLAX = 2;

// Main Menu scale
var mmbuttonX = (BG_WIDTH - 197) / 2;
var mmbuttonY = BG_HEIGHT - 74 * 2;
var mmButtonScale = 1;
var startComboY = 187;

//3:2
if(ASPECT_RATIO < (_16x9-delta) ) {
  logger.log ("aspect ratio less than 16:9");
  mmbuttonX = 10;
  mmbuttonY = startComboY;
  mmButtonScale = 0.8;
}

//4:3
if(ASPECT_RATIO < (_3x2-delta) ){
  logger.log ("aspect ratio less than 3:2");
  STEP_TO_UPDATE_PARALLAX = 1;
}


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
  parallaxStep: STEP_TO_UPDATE_PARALLAX,
  gameOverDelay: 3000,
  MainMenu: {
    name: "MainMenu",
    width: BG_WIDTH,
    height: BG_HEIGHT,
    zIndex: 2000,
    children: [
      {
        name: "mainbg",
        cls: "ui.ImageView",
        width: BG_WIDTH,
        height: BG_HEIGHT,
        x: 0,
        y: 0,
        image: "resources/images/kfc/MainMenu/Main_BG.png"            
      },
      {
        name: "mmtitle",
        cls: "ui.ImageView",
        width: BG_WIDTH,
        height: 187,
        x: 0,
        y: 0,
        image: "resources/images/kfc/MainMenu/Main_Title.png"            
      },
      {
        name: "combo0",
        cls: "ui.ImageView",
        width: BG_WIDTH,
        height: 325,
        x: 0,
        y: startComboY,
        image: "resources/images/kfc/MainMenu/ClassicCombos_able.png"         
      },
      {
        name: "combo1",
        cls: "ui.ImageView",
        width: BG_WIDTH,
        height: 371,
        x: 0,
        y: 362,
        image: "resources/images/kfc/MainMenu/Chicken_Little_Combo_able.png"
      },
      {
        name: "combo2",
        cls: "ui.ImageView",
        width: BG_WIDTH,
        height: 262,
        x: 0,
        y: 623,
        image: "resources/images/kfc/MainMenu/Combo1_able.png"            
      },           
      {
        name: "mmbutton",
        cls: "ui.widget.ButtonView",
        width: 197,
        height: 74,
        x: mmbuttonX,
        y: mmbuttonY,
        scale: mmButtonScale,
        images: {
          "up": "resources/images/kfc/MainMenu/PlayButton.png",
          "down": "resources/images/kfc/MainMenu/PlayButton.png"
        }
      }      
    ]
  },
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
        x: 149,
        y: 0,
        children: [
          {
            name: "menu0",
            cls: "src.MenuItem",
            width: 108,
            height: 105,
            x: 0,
            y: 0,
          },
          {
            name: "menu1",
            cls: "src.MenuItem",
            width: 108,
            height: 105,
            x: 0,
            y: 0,
          },
          {
            name: "menu2",
            cls: "src.MenuItem",
            width: 108,
            height: 105,
            x: 0,
            y: 0,
          },
          {
            name: "menu3",
            cls: "src.MenuItem",
            width: 108,
            height: 105,
            x: 0,
            y: 0,
          }
        ]       
      },
    ]
  },
  kfcMan: {
    name: 'kfcManLayout',
    x: 136,
    y: 200,
    width: 147,
    height: 200,
    children: [
      {
        name: "crossbeam",
        cls: "ui.ImageView",
        width: 147,
        height: 61,
        x: 298,
        y: 350,
        image: "resources/images/kfc/crossbeam.png"
      },
      {
        name: "character",
        cls: "ui.ImageView",
        width: 74,
        height: 181,
        x: 330,
        y: 175,
        image: "resources/images/kfc/Character_NoTouch.png"
      },
      {
        name: "energy",
        cls: "ui.ImageView",
        width: 101,
        height: 82,
        x: 240,
        y: 205,
        image: "resources/images/kfc/Enegy.png"
      }
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
  ],
  Combo: [
    {
      name: "classic",
      menus: [
        {
          id: "tile_burger",
          image: "resources/images/kfc/Combo_Item/burger_able.png",
          completeImage: "resources/images/kfc/Combo_Item/burger_Completed.png",
          disabledImage: "resources/images/kfc/Combo_Item/burger_disable.png"          
        },
        {
          id: "tile_potato",
          image: "resources/images/kfc/Combo_Item/potato_able.png",
          completeImage: "resources/images/kfc/Combo_Item/potato_Completed.png",
          disabledImage: "resources/images/kfc/Combo_Item/potato_disable.png"
        },
        {
          id: "tile_pepsi",
          image: "resources/images/kfc/Combo_Item/pepsi_able.png",
          completeImage: "resources/images/kfc/Combo_Item/pepsi_Completed.png",
          disabledImage: "resources/images/kfc/Combo_Item/pepsi_disable.png"
        },
        {
          id: "tile_wings",
          image: "resources/images/kfc/Combo_Item/wing_able.png",
          completeImage: "resources/images/kfc/Combo_Item/wing_Completed.png",
          disabledImage: "resources/images/kfc/Combo_Item/wing_disable.png"          
        }
      ]
    },
    {
      name: "chickenlittles",
      menus: [
        {
          id: "tile_double_burger",
          image: "resources/images/kfc/Combo_Item/double_burger_able.png",
          completeImage: "resources/images/kfc/Combo_Item/double_burger_Completed.png",
          disabledImage: "resources/images/kfc/Combo_Item/double_burger_disable.png"          
        },
        {
          id: "tile_potato",
          image: "resources/images/kfc/Combo_Item/potato_able.png",
          completeImage: "resources/images/kfc/Combo_Item/potato_Completed.png",
          disabledImage: "resources/images/kfc/Combo_Item/potato_disable.png"
        },
        {
          id: "tile_pepsi",
          image: "resources/images/kfc/Combo_Item/pepsi_able.png",
          completeImage: "resources/images/kfc/Combo_Item/pepsi_Completed.png",
          disabledImage: "resources/images/kfc/Combo_Item/pepsi_disable.png"
        },
        {
          id: "tile_icecream",
          image: "resources/images/kfc/Combo_Item/icecream_able.png",
          completeImage: "resources/images/kfc/Combo_Item/icecream_Completed.png",
          disabledImage: "resources/images/kfc/Combo_Item/icecream_disable.png"          
        }      
      ]
    },
    {
      name: "combo1",
      menus: [
        {
          id: "tile_big_burger",
          image: "resources/images/kfc/Combo_Item/big_burger_able.png",
          completeImage: "resources/images/kfc/Combo_Item/big_burger_Completed.png",
          disabledImage: "resources/images/kfc/Combo_Item/big_burger_disable.png"          
        },
        {
          id: "tile_potato",
          image: "resources/images/kfc/Combo_Item/potato_able.png",
          completeImage: "resources/images/kfc/Combo_Item/potato_Completed.png",
          disabledImage: "resources/images/kfc/Combo_Item/potato_disable.png"
        },
        {
          id: "tile_pepsi",
          image: "resources/images/kfc/Combo_Item/pepsi_able.png",
          completeImage: "resources/images/kfc/Combo_Item/pepsi_Completed.png",
          disabledImage: "resources/images/kfc/Combo_Item/pepsi_disable.png"
        },
        {
          id: "tile_thigh",
          image: "resources/images/kfc/Combo_Item/thigh_able.png",
          completeImage: "resources/images/kfc/Combo_Item/thigh_Completed.png",
          disabledImage: "resources/images/kfc/Combo_Item/thigh_disable.png"          
        }
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
	  pinwheel: {
	    x: PLAYER_OFFSETX,
	    y: 500,
  		hitOpts: {
  		  width: 151 * PLAYER_SCALE,
  		  height: 38 * PLAYER_SCALE
  		},
  		viewOpts: {
  		  zIndex: 500,
  		  width: 151 * PLAYER_SCALE,
  		  height: 38 * PLAYER_SCALE,
  		  defaultAnimation: "blink",
  		  autoStart: false,
        frameRate: 20,
  		  loop: true,
  		  url: "resources/images/game/Character/pinwheel"
  		}
	  },
    pinwheelStick: {
      x: (BG_WIDTH - 42 * PLAYER_SCALE) / 2,
      y: 530,
      hitOpts: {
        width: 42 * PLAYER_SCALE,
        height: 51 * PLAYER_SCALE
      },
      viewOpts: {
        zIndex: 500,
        width: 42 * PLAYER_SCALE,
        height: 51 * PLAYER_SCALE,
        image: "resources/images/kfc/pinwheel2.png"
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
  			id: "tile_big_burger",
        zTop: 1,
        zBottom: 0,
			  x: (BG_WIDTH - 136 * TILE_SCALE) / 2,
			  y: TILE_OFFSETY,
  			hitOpts: {
          offsetX: 0,
          offsetY: 10,  // If you change this, change the value in height too
  				width: 136 * TILE_SCALE,
				  height: 136 * TILE_SCALE - TILE_HIT_BOUNDS_MARGIN_BOTTOM
  			},
  			viewOpts: {
  			  width: 136 * TILE_SCALE,
  			  height: 136 * TILE_SCALE,
          anchorX: 136 * TILE_SCALE / 2,
          anchorY: 136 * TILE_SCALE / 2,
          r: 0,
  			  url: "resources/images/kfc/tiles/tile_bigburger.png"
  			}	
  		},
      {
        id: "tile_burger",
        zTop: 1,
        zBottom: 0,
        x: (BG_WIDTH - 136 * TILE_SCALE) / 2,
        y: TILE_OFFSETY,
        hitOpts: {
          offsetX: 0,
          offsetY: 10,  // If you change this, change the value in height too
          width: 136 * TILE_SCALE,
          height: 136 * TILE_SCALE - TILE_HIT_BOUNDS_MARGIN_BOTTOM
        },
        viewOpts: {
          width: 136 * TILE_SCALE,
          height: 136 * TILE_SCALE,
          anchorX: 136 * TILE_SCALE / 2,
          anchorY: 136 * TILE_SCALE / 2,
          r: 0,
          url: "resources/images/kfc/tiles/tile_burger.png"
        } 
      },
      {
        id: "tile_double_burger",
        zTop: 1,
        zBottom: 0,
        x: (BG_WIDTH - 136 * TILE_SCALE) / 2,
        y: TILE_OFFSETY,
        hitOpts: {
          offsetX: 0,
          offsetY: 10,  // If you change this, change the value in height too
          width: 136 * TILE_SCALE,
          height: 136 * TILE_SCALE - TILE_HIT_BOUNDS_MARGIN_BOTTOM
        },
        viewOpts: {
          width: 136 * TILE_SCALE,
          height: 136 * TILE_SCALE,
          anchorX: 136 * TILE_SCALE / 2,
          anchorY: 136 * TILE_SCALE / 2,
          r: 0,
          url: "resources/images/kfc/tiles/tile_double_burger.png"
        } 
      },
      {
        id: "tile_icecream",
        zTop: 1,
        zBottom: 0,
        x: (BG_WIDTH - 136 * TILE_SCALE) / 2,
        y: TILE_OFFSETY,
        hitOpts: {
          offsetX: 0,
          offsetY: 10,  // If you change this, change the value in height too
          width: 136 * TILE_SCALE,
          height: 136 * TILE_SCALE - TILE_HIT_BOUNDS_MARGIN_BOTTOM
        },
        viewOpts: {
          width: 136 * TILE_SCALE,
          height: 136 * TILE_SCALE,
          anchorX: 136 * TILE_SCALE / 2,
          anchorY: 136 * TILE_SCALE / 2,
          r: 0,
          url: "resources/images/kfc/tiles/tile_icecream.png"
        } 
      },
      {
        id: "tile_pepsi",
        zTop: 1,
        zBottom: 0,
        x: (BG_WIDTH - 136 * TILE_SCALE) / 2,
        y: TILE_OFFSETY,
        hitOpts: {
          offsetX: 0,
          offsetY: 10,  // If you change this, change the value in height too
          width: 136 * TILE_SCALE,
          height: 136 * TILE_SCALE - TILE_HIT_BOUNDS_MARGIN_BOTTOM
        },
        viewOpts: {
          width: 136 * TILE_SCALE,
          height: 136 * TILE_SCALE,
          anchorX: 136 * TILE_SCALE / 2,
          anchorY: 136 * TILE_SCALE / 2,
          r: 0,
          url: "resources/images/kfc/tiles/tile_pepsi.png"
        } 
      },
      {
        id: "tile_potato",
        zTop: 1,
        zBottom: 0,
        x: (BG_WIDTH - 136 * TILE_SCALE) / 2,
        y: TILE_OFFSETY,
        hitOpts: {
          offsetX: 0,
          offsetY: 10,  // If you change this, change the value in height too
          width: 136 * TILE_SCALE,
          height: 136 * TILE_SCALE - TILE_HIT_BOUNDS_MARGIN_BOTTOM
        },
        viewOpts: {
          width: 136 * TILE_SCALE,
          height: 136 * TILE_SCALE,
          anchorX: 136 * TILE_SCALE / 2,
          anchorY: 136 * TILE_SCALE / 2,
          r: 0,
          url: "resources/images/kfc/tiles/tile_potato.png"
        } 
      },
      {
        id: "tile_thigh",
        zTop: 1,
        zBottom: 0,
        x: (BG_WIDTH - 136 * TILE_SCALE) / 2,
        y: TILE_OFFSETY,
        hitOpts: {
          offsetX: 0,
          offsetY: 10,  // If you change this, change the value in height too
          width: 136 * TILE_SCALE,
          height: 136 * TILE_SCALE - TILE_HIT_BOUNDS_MARGIN_BOTTOM
        },
        viewOpts: {
          width: 136 * TILE_SCALE,
          height: 136 * TILE_SCALE,
          anchorX: 136 * TILE_SCALE / 2,
          anchorY: 136 * TILE_SCALE / 2,
          r: 0,
          url: "resources/images/kfc/tiles/tile_thigh.png"
        } 
      },
      {
        id: "tile_wings",
        zTop: 1,
        zBottom: 0,
        x: (BG_WIDTH - 136 * TILE_SCALE) / 2,
        y: TILE_OFFSETY,
        hitOpts: {
          offsetX: 0,
          offsetY: 10,  // If you change this, change the value in height too
          width: 136 * TILE_SCALE,
          height: 136 * TILE_SCALE - TILE_HIT_BOUNDS_MARGIN_BOTTOM
        },
        viewOpts: {
          width: 136 * TILE_SCALE,
          height: 136 * TILE_SCALE,
          anchorX: 136 * TILE_SCALE / 2,
          anchorY: 136 * TILE_SCALE / 2,
          r: 0,
          url: "resources/images/kfc/tiles/tile_wings.png"
        } 
      }   
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
  switch_button: {
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
