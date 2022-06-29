/*
 * License
 * Creative Commons 4.0 Attribution, Share Alike, Non-Commercial
 * <https://creativecommons.org/licenses/by-nc-sa/4.0/>
 *
 * Copyright (c) 2020 Vladimir Skrypnikov (Pheonix KageDesu)
 * <https://kagedesuworkshop.blogspot.ru/>
 *
 */

// * CHANGELOG ===================
//
// v1.0 (11.09.2020)
//    - Release
// ===============================

/*:
 * @plugindesc (v.1.0)[BASIC] Allow you spawn Events during game with placement select
 * @author Pheonix KageDesu
 * @target MZ
 * @url https://kagedesuworkshop.blogspot.com/p/pocket-events-mz.html
 *
 * 
 * @help
 * 
 * This plugin allows player placing events from a specified 'template' map
 * with placement selecting for them in the current map.
 * This template map is designated with the "Templates Map" plugin setting.
 * 
 * For create rules and setup placement events, see plugin parameter
 * 'Placement Items'
 * 
 * For place and removing events, use plugin commands.
 * 
 * This is BASIC plugin version and have some restrictions:
 *    - Player can place only 5 pocket events on map at same time
 *    - Placed events not keeps when you change maps
 *    - Plugin usage allowed only in Non-Commercial project
 * 
 * Visit plugin web page for more information, also you can find Demo project.
 * 
 * If you like my Plugins, want more and offten updates,
 * please support me on Patreon!
 * 
 * Patreon Page:
 *      https://www.patreon.com/KageDesu
 * YouTube Channel:
 *      https://www.youtube.com/channel/UCA3R61ojF5vp5tGwJ1YqdgQ?
 *
 * You can use this plugin in your game thanks to all my Patrons!
 * 
 * License: Creative Commons 4.0 Attribution, Share Alike, Non-Commercial
 * 
 * @ ================================================================
 * 
 * @param TemplatesMap
 * @text Templates Map
 * @type number
 * @min 1
 * @default 1
 * @desc Map ID with Placement Events templates
 * 
 * @param GlobalExceptRegions
 * @text Forbidden Regions
 * @type number[]
 * @min 1
 * @max 255
 * @desc Region ID's where placement items cannot be placed
 * @default []
 * 
 * @param PlacementsList
 * @text Placement Items
 * @type struct<PlacementItem>[]
 * @desc Placement Items List
 * @default []
 * 
 * @ ================================================================
 * 
 * @command PlacePocketEvent
 * @text Place Pocket Event
 * @desc Placing pocket event on map with placement select
 * 
 * @arg placementItemId
 * @text Placement Item
 * @desc Placement Item Index from Placement Items plugin parameter
 * @type number
 * @min 1
 * @default 1
 * 
 * @arg gameItemId
 * @text Consume Item
 * @desc Item that's will be deleting from inventory when item is placed [optional]
 * @type item
 * @default 0
 * 
 * 
 * @command RemovePocketEvent
 * @text PickUp Pocket Event
 * @desc PickUp (removing) pocket event from map
 * 
 * @arg placementItemId
 * @text Placement Item
 * @desc Placement Item Index from Placement Items plugin parameter
 * @type number
 * @min 1
 * @default 1
 * 
 * @arg gameItemId
 * @text Gain Item
 * @desc Item that's will be added to inventory when item is removed from map [optional]
 * @type item
 * @default 0
 * 
 */
/*~struct~PlacementItem:
 * @param eventId
 * @text Event ID
 * @type number
 * @default 1
 * @min 1
 * @desc Event ID on Placements Templates Map
 *
 * @param animationId
 * @text Place Animation
 * @type animation
 * @default 0
 * @desc Animation that will be playing after item placed
 * 
 * @param gridVisiblity
 * @text Grid
 * @type boolean
 * @default true
 * @desc Show map grid when this item placing?
 * 
 * @param sSwitch
 * @text Self Switch
 * @type combo
 * @option None
 * @option A
 * @option B
 * @option C
 * @option D
 * @default None
 * @desc Select which Self Switch will be turned ON when item been placed
 * 
 * @param exceptRegions
 * @text Forbidden Regions
 * @type number[]
 * @min 1
 * @max 255
 * @desc Region ID's where this item cannot be placed 
 * @default []
 * 
 * @param onlyRegions
 * @text Allowed Only Regions
 * @type number[]
 * @min 1
 * @max 255
 * @desc Only Region ID's where this item can be placed
 * @default []
 * 
 */
var Imported = Imported || {};
Imported.PKD_EasyPlacement = true;


var PKD_EasyPlacement = {};
PKD_EasyPlacement.LIBS = {};
PKD_EasyPlacement.register = function (library) {
    this.LIBS[library.name] = library;
};


var KDCoreMini = {};

window.KDCoreMini = KDCoreMini;

(function(){

    Array.prototype.delete = function () {
        var L, a, ax, what;
        what = void 0;
        a = arguments;
        L = a.length;
        ax = void 0;
        while (L && this.length) {
            what = a[--L];
            while ((ax = this.indexOf(what)) !== -1) {
                this.splice(ax, 1);
            }
        }
        return this;
    };
    
    KDCoreMini.TimedUpdate = class TimedUpdate {
        constructor(interval, method1) {
            this.interval = interval;
            this.method = method1;
            this._timer = 0;
            this._once = false;
        }

        update() {
            if (this.interval == null) {
                return;
            }
            this._timer++;
            if (this._timer >= this.interval) {
                if (this.method != null) {
                    this.method();
                }
                this._timer = 0;
                if (this._once === true) {
                    return this.stop();
                }
            }
        }

        once() {
            return this._once = true;
        }

        onUpdate(method1) {
            this.method = method1;
        }

        stop() {
            return this.interval = null;
        }

        isAlive() {
            return this.interval != null;
        }

    };

})();
(function(){
    

    PKD_EasyPlacement.pluginName = "PKD_PocketEvents";

    PKD_EasyPlacement.LoadPluginSettings = () => {
        const params = PluginManager.parameters(PKD_EasyPlacement.pluginName);
        //console.info(params);
        PKD_EasyPlacement.ITEMS_MAP = parseInt(params.TemplatesMap) || 0;
        PKD_EasyPlacement.PARAMS = {};
        
        PKD_EasyPlacement.PARAMS.BAD_REGIONS = ParsePluginRegionArray(params.GlobalExceptRegions);
        PKD_EasyPlacement.PARAMS.ITEMS = ParsePluginItemsList(params.PlacementsList);

        //console.info(PKD_EasyPlacement.PARAMS);
        RegisterPluginCommnads();
    };


    ParsePluginRegionArray = (arrayList) => {
        let list = JsonEx.parse(arrayList);
        list = list.map((e) => parseInt(e));
        return list;
    };

    ParsePluginItemsList = (arrayList) => {
        let lines = JsonEx.parse(arrayList);
        let parsed = lines.map((l) => JsonEx.parse(l));
        parsed.forEach(element => {
            element.gridVisiblity = JsonEx.parse(element.gridVisiblity);
            element.animationId = parseInt(element.animationId);
            element.eventId = parseInt(element.eventId);
            element.exceptRegions = ParsePluginRegionArray(element.exceptRegions);
            element.onlyRegions = ParsePluginRegionArray(element.onlyRegions);
        });
        parsed = [null].concat(parsed);
        return parsed;
    };

    RegisterPluginCommnads = () => {

        PluginManager.registerCommand(PKD_EasyPlacement.pluginName, 'PlacePocketEvent', args => {
            try {
                let pItemId = parseInt(args.placementItemId);
                let gItemId = parseInt(args.gameItemId);
                if(pItemId >= 0)
                    PKD_EPManager.Start(pItemId, gItemId);
            } catch (e) {
                console.warn(e);
            }
        });

        PluginManager.registerCommand(PKD_EasyPlacement.pluginName, 'RemovePocketEvent', args => {
            try {
                let pItemId = parseInt(args.placementItemId);
                let gItemId = parseInt(args.gameItemId);
                if (pItemId >= 0)
                    PKD_EPManager.PickUpPlacedItem(pItemId, gItemId);
            } catch (e) {
                console.warn(e);
            }
        });

    };

})();
// Generated by CoffeeScript 2.5.1
// * MAIN
TouchInput.mapPoint = function() {
  var x, y;
  x = $gameMap.canvasToMapX(TouchInput.x);
  y = $gameMap.canvasToMapY(TouchInput.y);
  return {x, y};
};

TouchInput.mapScreenPoint = function() {
  var t, th, tw, x, y;
  ({x, y} = TouchInput.mapPoint());
  t = $gameMap.adjustX(x);
  tw = $gameMap.tileWidth();
  x = Math.round(t * tw + tw / 2);
  t = $gameMap.adjustY(y);
  th = $gameMap.tileHeight();
  y = Math.round(t * th + th);
  return {x, y};
};

// Generated by CoffeeScript 2.5.1
var PKD_EPManager;

PKD_EPManager = function() {};

(function() {
  var _;
  _ = PKD_EPManager;
  _.Scene = function() {
    return SceneManager._scene;
  };
  _.OnMapLoaded = function() {
    this.isActive = false;
    this.SetGridVisibility(false);
    if (this.isShouldLoadEvents()) {
      this.CreateEPEventsOnMap();
      return this.isNextMapLoaded = false;
    }
  };
  _.OnNextMapLoaded = function() {
    return this.isNextMapLoaded = true;
  };
  _.isShouldLoadEvents = function() {
    return this.isNextMapLoaded === true;
  };
  _.IsGridVisible = function() {
    return this.isGridVisible;
  };
  _.IsActive = function() {
    return this.isActive === true;
  };
  _.IsPointIsGood = function() {
    var x, y;
    ({x, y} = TouchInput.mapPoint());
    // * > 1 because self under mouse
    if ($gameMap.eventsXy(x, y).length > 1) {
      return false;
    }
    if ($gamePlayer.pos(x, y)) {
      return false;
    }
    if (Game_CharacterBase.prototype.isCollidedWithVehicles(x, y)) {
      return false;
    }
    return this.CheckRegions(x, y);
  };
  _.CheckRegions = function(x, y) {
    var item, region, regionSet;
    regionSet = PKD_EasyPlacement.PARAMS.BAD_REGIONS;
    region = $gameMap.regionId(x, y);
    if (regionSet.contains(region)) {
      return false;
    }
    item = this.ItemData($gameTemp._epPlacementItemId);
    if (item == null) {
      return true;
    }
    if (item.onlyRegions.length > 0) {
      if (!item.onlyRegions.contains(region)) {
        return false;
      }
    } else if (item.exceptRegions.length > 0) {
      if (item.exceptRegions.contains(region)) {
        return false;
      }
    }
    return true;
  };
  _.SetGridVisibility = function(isGridVisible) {
    this.isGridVisible = isGridVisible;
  };
  _.ItemData = function(pItemIndex) {
    return PKD_EasyPlacement.PARAMS.ITEMS[pItemIndex];
  };
  //?VERSION
  _.Start = function(pItemIndex, gItemId = 0) {};
  _.Stop = function() {
    //"STOP".p()
    this.Scene().pEndEPMode();
    this.SetGridVisibility(false);
    this.isActive = false;
    $gameTemp._epPlacementPartyItemId = null;
    $gameTemp._epPlacementItemId = null;
  };
  _.PlaceItemOn = function(x, y) {
    var animationId, evId, itemId;
    evId = $gameTemp._epSpawned.eventId();
    itemId = $gameTemp._epPlacementItemId;
    $gameSystem.pRegisterEPItem(itemId, x, y, evId);
    this.ActivatePlacedItem(itemId, evId);
    this.ChangePlacementItem(-1);
    animationId = this.ItemData(itemId).animationId;
    if (animationId > 0) {
      return $gameTemp.requestAnimation([$gameTemp._epSpawned], animationId);
    }
  };
  _.ChangePlacementItem = function(count) {
    var itemId;
    itemId = $gameTemp._epPlacementPartyItemId;
    if (itemId == null) {
      return;
    }
    if ($dataItems[itemId] == null) {
      return;
    }
    return $gameParty.gainItem($dataItems[itemId], count);
  };
  _.ActivatePlacedItem = function(itemId, eventId) {
    var key, sSwitch;
    sSwitch = this.ItemData(itemId).sSwitch;
    if (sSwitch === "None" || sSwitch === "") {
      return;
    }
    key = [$gameMap.mapId(), eventId, sSwitch];
    $gameSelfSwitches.setValue(key, true);
    return $gameMap.requestRefresh();
  };
  _.ClearSelfSwitches = function(eventId) {
    var j, key, len, mapId, ref, s;
    mapId = $gameMap.mapId();
    ref = ['A', 'B', 'C', 'D'];
    for (j = 0, len = ref.length; j < len; j++) {
      s = ref[j];
      key = [mapId, eventId, s];
      $gameSelfSwitches.setValue(key, false);
    }
    return $gameMap.requestRefresh();
  };
  // * Удаляет по событию
  _.PickUpPlacedItemByEvent = function(eventId, gItemId = 0) {
    var ev;
    ev = $gameMap.event(eventId);
    if (ev == null) {
      return;
    }
    if (ev.pGetEPDynamicObjId() < 0) {
      return;
    }
    $gameSystem.pRemoveEPItem(eventId);
    this.Scene().pUnSpawnEPEvent(eventId);
    PKD_EPManager.ClearSelfSwitches(eventId);
    if (gItemId <= 0) {
      return;
    }
    $gameTemp._epPlacementPartyItemId = gItemId;
    this.ChangePlacementItem(1);
    return $gameTemp._epPlacementPartyItemId = null;
  };
  
  // * Удаляет по предмету, событие сам находит
  _.PickUpPlacedItem = function(pItemIndex, gItemId) {
    var db, item;
    db = $gameSystem.pGetEPDB()[$gameMap.mapId()];
    if (db == null) {
      return;
    }
    item = db.find(function(i) {
      return i[0] === pItemIndex;
    });
    if (item == null) {
      return;
    }
    return this.PickUpPlacedItemByEvent(item[3], gItemId);
  };
  //?VERSION
  _.CreateEPEventsOnMap = function() {};
})();

//Compressed by MV Plugin Builder
(function(){var _0x142e = [
    '0xa',
    '0xb',
    '0xc',
    'SetGridVisibility',
    '0xe',
    'isActive',
    '_epPlacementPartyItemId',
    '_epPlacementItemId',
    'Scene',
    'pActivateEPMode',
    'gridVisiblity',
    'CreateEPEventsOnMap',
    'pGetEPDB',
    'Pswkf',
    'Start',
    'ItemData',
    'eventId',
    'GDteh',
    'length',
    'Placement\x20more\x20than\x205\x20items\x20allowed\x20in\x20[PRO]\x20version\x20of\x20the\x20plugin',
    'qXudv',
    'shift',
    'jpKxE',
    'KKnJu',
    '0x1',
    'rGdiR',
    'push',
    'Emobr',
    'hhbRO',
    'BTVuH',
    '0x2',
    'GivqY',
    'rCVFT',
    '0x3',
    '0x4',
    '0x5',
    '0x6',
    'rAqlP',
    '0x7',
    'alert',
    '0x9'
];
(function (_0x2699a9, _0x501e82) {
    var _0x5b6c40 = function (_0xa3de42) {
        while (--_0xa3de42) {
            _0x2699a9['push'](_0x2699a9['shift']());
        }
    };
    _0x5b6c40(++_0x501e82);
}(_0x142e, 0x125));
var _0x5b01 = function (_0x30098a, _0x2d299c) {
    _0x30098a = _0x30098a - 0x0;
    var _0x503292 = _0x142e[_0x30098a];
    return _0x503292;
};
(function () {
    var _0x58c066 = [
        _0x5b01('0x0'),
        _0x5b01('0x1'),
        _0x5b01('0x2'),
        _0x5b01('0x3'),
        _0x5b01('0x4'),
        _0x5b01('0x5'),
        _0x5b01('0x6'),
        _0x5b01('0x7'),
        _0x5b01('0x8'),
        _0x5b01('0x9'),
        _0x5b01('0xa'),
        _0x5b01('0xb'),
        'mapId',
        _0x5b01('0xc'),
        _0x5b01('0xd')
    ];
    (function (_0x2f5e51, _0x5ebf62) {
        var _0x1dbf57 = function (_0x386379) {
            while (--_0x386379) {
                if (_0x5b01('0xe') === _0x5b01('0xe')) {
                    _0x2f5e51['push'](_0x2f5e51[_0x5b01('0xf')]());
                } else {
                    return;
                }
            }
        };
        _0x1dbf57(++_0x5ebf62);
    }(_0x58c066, 0x6e));
    var _0x1c6811 = function (_0x1279e8, _0x363969) {
        if (_0x5b01('0x10') === 'aYWoP') {
            return;
        } else {
            _0x1279e8 = _0x1279e8 - 0x0;
            var _0x28dd7e = _0x58c066[_0x1279e8];
            return _0x28dd7e;
        }
    };
    PKD_EPManager[_0x1c6811('0x0')] = function () {
        if (_0x5b01('0x11') === _0x5b01('0x11')) {
            var _0xee511f, _0x2a51c9;
            _0xee511f = $gameSystem[_0x1c6811(_0x5b01('0x12'))]();
            _0x2a51c9 = $gameMap['mapId']();
            if (!_0xee511f[_0x2a51c9]) {
                if (_0x5b01('0x13') !== _0x5b01('0x13')) {
                    while (--_0x30d230) {
                        _0x4c6a5c[_0x5b01('0x14')](_0x4c6a5c['shift']());
                    }
                } else {
                    if (_0x5b01('0x15') !== _0x1c6811('0x2')) {
                        if (_0x5b01('0x16') === _0x5b01('0x17')) {
                            if ('Emobr' !== _0x1c6811(_0x5b01('0x18'))) {
                                return;
                            } else {
                                return;
                            }
                        } else {
                            return;
                        }
                    } else {
                        if (_0x5b01('0x19') === _0x5b01('0x1a')) {
                            return;
                        } else {
                            return;
                        }
                    }
                }
            }
            return _0xee511f[_0x2a51c9] = [];
        } else {
            return;
        }
    };
    PKD_EPManager[_0x1c6811(_0x5b01('0x1b'))] = function (_0x271171, _0x3ff6b4 = 0x0) {
        var _0xebbba7, _0x1f6e4a, _0x29057b;
        if (_0x271171 == null) {
            return;
        }
        if (_0x271171 < 0x0) {
            return;
        }
        _0x1f6e4a = this[_0x1c6811(_0x5b01('0x1c'))](_0x271171);
        if (_0x1f6e4a == null) {
            return;
        }
        if (_0x1f6e4a[_0x1c6811(_0x5b01('0x1d'))] <= 0x0) {
            if (_0x1c6811(_0x5b01('0x1e')) !== _0x1c6811('0x6')) {
                return;
            } else {
                if (_0x5b01('0x1f') === _0x5b01('0x1f')) {
                    return;
                } else {
                    var _0x3d5d9a = function (_0x50d89e) {
                        while (--_0x50d89e) {
                            _0x4c6a5c['push'](_0x4c6a5c[_0x5b01('0xf')]());
                        }
                    };
                    _0x3d5d9a(++_0x5202e9);
                }
            }
        }
        _0xebbba7 = $gameSystem[_0x1c6811(_0x5b01('0x12'))]();
        _0x29057b = $gameMap[_0x1c6811(_0x5b01('0x20'))]();
        if (_0xebbba7[_0x29057b] != null && _0xebbba7[_0x29057b][_0x1c6811('0x8')] >= 0x5) {
            window[_0x5b01('0x21')](_0x1c6811(_0x5b01('0x22')));
            return;
        }
        $gameTemp[_0x1c6811(_0x5b01('0x23'))] = _0x3ff6b4;
        $gameTemp[_0x1c6811(_0x5b01('0x24'))] = _0x271171;
        this[_0x1c6811(_0x5b01('0x25'))]()[_0x1c6811('0xd')](_0x1f6e4a['eventId']);
        this[_0x5b01('0x26')](_0x1f6e4a[_0x1c6811(_0x5b01('0x27'))]);
        this[_0x5b01('0x28')] = !![];
    };
}());
})();

function Game_EPEvent() {
    this.initialize.apply(this, arguments);
}

Game_EPEvent.prototype = Object.create(Game_Event.prototype);
Game_EPEvent.prototype.constructor = Game_EPEvent;

Game_EPEvent.prototype.initialize = function (templateEventId, eventId, epItemId) {
    this._templateEventId = templateEventId;
    this._epItemId = epItemId;
    Game_Event.prototype.initialize.call(this, $gameMap.mapId(), eventId);
    DataManager.extractMetadata(this.event());
    this.setPosition(-1, -1);
};

Game_EPEvent.prototype.event = function () {
    return $dataEPEventsMap.events[this._templateEventId];
};

Game_EPEvent.prototype.pGetEPDynamicObjId = function () {
    return 1; // * JUST FOR CONDITIONS
};

// Generated by CoffeeScript 2.5.1
(function() {
  var Sprite_GridCell;
  Sprite_GridCell = class Sprite_GridCell extends Sprite {
    constructor() {
      super(new Bitmap($gameMap.tileWidth(), $gameMap.tileHeight()));
      this.anchor.x = 0.5;
      this.anchor.y = 1;
      this.z = 1;
      this.maxOpacity = 80;
      this.minOpacity = 40;
      this.opacity = this.maxOpacity;
      this.setNormalColor();
      this.updateOpacityChange = this.updateOpacityDown;
      this.colorChangeThread = new KDCoreMini.TimedUpdate(2, this._colorChange.bind(this));
      this._colorChange();
    }

    setNormalColor() {
      return this.bitmap.fillAll('rgba(255, 255, 255, 1)');
    }

    setForbiddenColor() {
      return this.bitmap.fillAll('rgba(255, 0, 0, 1)');
    }

    update() {
      super.update();
      if (this.visible === false) {
        return;
      }
      this.updateOpacityChange();
      return this.colorChangeThread.update();
    }

    _colorChange() {
      if (!this.visible) {
        return;
      }
      if (PKD_EPManager.IsPointIsGood()) {
        return this.setNormalColor();
      } else {
        return this.setForbiddenColor();
      }
    }

    updateOpacityChange() {} // * EMPTPY

    updateOpacityDown() {
      this.opacity -= 3;
      if (this.opacity <= this.minOpacity) {
        return this.updateOpacityChange = this.updateOpacityUp;
      }
    }

    updateOpacityUp() {
      this.opacity += 3;
      if (this.opacity >= this.maxOpacity) {
        return this.updateOpacityChange = this.updateOpacityDown;
      }
    }

  };
  PKD_EasyPlacement.register(Sprite_GridCell);
})();

(function(){
    
    DataManager.pLoadEPEventData = function () {
        var mapId = PKD_EasyPlacement.ITEMS_MAP;
        if (mapId > 0) {
            var filename = 'Map%1.json'.format(mapId.padZero(3));
            this.loadDataFile('$dataEPEventsMap', filename);
        } else {
            console.warn("EasyPlacement.js: You didn't set a map ID for placement events!");
            window.alert("EasyPlacement.js: You didn't set a map ID for placement events!");
        }
    };

    //@[ALIAS]
    var _alias_DataManager_loadDatabase = DataManager.loadDatabase;
    DataManager.loadDatabase = function () {
        PKD_EasyPlacement.LoadPluginSettings();
        DataManager.pLoadEPEventData();
        _alias_DataManager_loadDatabase.call(this);
    };

})();
// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_CharacterBase.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_CharacterBase.prototype;
  // * DUMMY
  _.pGetEPDynamicObjId = function() {
    return -1;
  };
})();

// ■ END Game_CharacterBase.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__setup, _;
  //@[DEFINES]
  _ = Game_Map.prototype;
  //@[ALIAS]
  ALIAS__setup = _.setup;
  _.setup = function(mapId) {
    ALIAS__setup.call(this, mapId);
    return PKD_EPManager.OnNextMapLoaded();
  };
})();

// ■ END Game_Map.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_System.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initialize, _;
  //@[DEFINES]
  _ = Game_System.prototype;
  //@[ALIAS]
  ALIAS__initialize = _.initialize;
  _.initialize = function() {
    ALIAS__initialize.call(this);
    return this.pGetEPDB(); // * Create
  };
  _.pGetEPDB = function() {
    if (this.pEPDB == null) {
      this.pEPDB = {};
    }
    return this.pEPDB;
  };
  _.pRegisterEPItem = function(itemId, x, y, eventId) {
    var db, mapId;
    // * Регестрирует созданный
    db = this.pGetEPDB();
    mapId = $gameMap.mapId();
    if (db[mapId] == null) {
      db[mapId] = [];
    }
    db[mapId].push([itemId, x, y, eventId]);
  };
  //"REGISTER".p(itemId)
  _.pRemoveEPItem = function(eventId) {
    var db, i, item, itemToDelete, len, mapId, ref;
    // * Удаляет созданные
    db = this.pGetEPDB();
    mapId = $gameMap.mapId();
    if (db[mapId] == null) {
      return;
    }
    itemToDelete = null;
    ref = db[mapId];
    for (i = 0, len = ref.length; i < len; i++) {
      item = ref[i];
      //if item[1] is x && item[2] is y
      //    itemToDelete = item
      if (item[3] === eventId) {
        itemToDelete = item;
      }
    }
    if (itemToDelete == null) {
      return;
    }
    db[mapId].delete(itemToDelete);
  };
})();

// ■ END Game_System.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__isMenuEnabled, ALIAS__onMapLoaded, ALIAS__update, ALIAS__updateDestination, _;
  //@[DEFINES]
  _ = Scene_Map.prototype;
  // * evId - event to spawn and move
  _.pActivateEPMode = function(evId) {
    this._pInEPMode = true;
    this._pIsSetupOk = false; // * User place Event?
    return $gameTemp._epSpawned = this.pSpawnEPEvent(evId, 0, 0, $gameMap._events.length);
  };
  _.pEndEPMode = function() {
    if (this._pIsSetupOk === false) {
      this.pUnSpawnEPEvent($gameTemp._epSpawned._eventId);
    }
    $gameTemp._epSpawned = null;
    return this._pInEPMode = false;
  };
  _.pIsEPMode = function() {
    return this._pInEPMode === true;
  };
  _.pSpawnEPEvent = function(evId, x, y, newEvId) {
    var ev;
    ev = new Game_EPEvent(evId, newEvId, $gameTemp._epPlacementItemId);
    $gameMap._events[newEvId] = ev;
    this._spriteset.pAddNewPlacementEvent(ev._eventId);
    ev.setPosition(x, y);
    return ev;
  };
  _.pUnSpawnEPEvent = function(evId) {
    var event;
    this._spriteset.pRemovePlacementEvent(evId);
    PKD_EPManager.ClearSelfSwitches(evId);
    event = $gameMap.event(evId);
    $gameMap._events[evId] = null;
    $gameMap.requestRefresh();
  };
  //@[ALIAS]
  ALIAS__onMapLoaded = _.onMapLoaded;
  _.onMapLoaded = function() {
    ALIAS__onMapLoaded.call(this);
    return PKD_EPManager.OnMapLoaded();
  };
  //@[ALIAS]
  ALIAS__updateDestination = _.updateDestination;
  _.updateDestination = function() {
    if (this.pIsEPMode()) {
      $gamePlayer.turnTowardCharacter(TouchInput.mapPoint());
    } else {
      return ALIAS__updateDestination.call(this);
    }
  };
  //@[ALIAS]
  ALIAS__isMenuEnabled = _.isMenuEnabled;
  _.isMenuEnabled = function() {
    if (this.pIsEPMode()) {
      return false;
    } else {
      return ALIAS__isMenuEnabled.call(this);
    }
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    if (this.pIsEPMode()) {
      return this.pUpdateEPCommon();
    }
  };
  _.pUpdateEPCommon = function() {
    var x, y;
    if (this.isMenuCalled()) {
      return PKD_EPManager.Stop();
    } else {
      ({x, y} = TouchInput.mapPoint());
      $gameTemp._epSpawned.setPosition(x, y);
      if (TouchInput.isTriggered()) {
        if (PKD_EPManager.IsPointIsGood()) {
          this.pPlaceEPItemOnSpot(x, y);
          return PKD_EPManager.Stop();
        } else {
          return SoundManager.playBuzzer();
        }
      }
    }
  };
  _.pPlaceEPItemOnSpot = function(x, y) {
    PKD_EPManager.PlaceItemOn(x, y);
    return this._pIsSetupOk = true;
  };
})();

// ■ END Scene_Map.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__createTilemap, ALIAS__update, _;
  //@[DEFINES]
  _ = Spriteset_Map.prototype;
  //@[ALIAS]
  ALIAS__createTilemap = _.createTilemap;
  _.createTilemap = function() {
    ALIAS__createTilemap.call(this);
    return this.pCreateEPGrid();
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    return this.pUpdateEPGridLayer();
  };
  _.pCreateEPGrid = function() {
    var bitmap;
    this._pEPGridLayer = new Sprite();
    this._pEPGridLayer.opacity = 50;
    bitmap = new Bitmap($gameMap.width() * $gameMap.tileWidth(), $gameMap.height() * $gameMap.tileHeight());
    this._pEPGridLayer.bitmap = bitmap;
    bitmap.addLoadListener(this.pDrawEPGrid.bind(this));
    this._pEPGridLayer.z = 1;
    this._tilemap.addChild(this._pEPGridLayer);
    return this.pCreateEPHoverCell();
  };
  _.pCreateEPHoverCell = function() {
    this._pEPCell = new PKD_EasyPlacement.LIBS.Sprite_GridCell();
    return this._tilemap.addChild(this._pEPCell);
  };
  _.pDrawEPGrid = function() {
    var drawLineHor, drawLineVert, i, j, k, l, ref, ref1, results;
    drawLineVert = function(b, i) {
      return b.fillRect(0, i * $gameMap.tileWidth(), b.width, 1, 'rgba(0, 0, 0, 1)');
    };
    drawLineHor = function(b, i) {
      return b.fillRect(i * $gameMap.tileHeight(), 0, 1, b.height, 'rgba(0, 0, 0, 1)');
    };
    for (i = k = 0, ref = $gameMap.height(); (0 <= ref ? k < ref : k > ref); i = 0 <= ref ? ++k : --k) {
      drawLineVert(this._pEPGridLayer.bitmap, i);
    }
    results = [];
    for (j = l = 0, ref1 = $gameMap.width(); (0 <= ref1 ? l < ref1 : l > ref1); j = 0 <= ref1 ? ++l : --l) {
      results.push(drawLineHor(this._pEPGridLayer.bitmap, j));
    }
    return results;
  };
  _.pUpdateEPGridLayer = function() {
    var screenTouchPoint, screenX, screenY, th, tw, tw2;
    this._pEPGridLayer.visible = PKD_EPManager.IsGridVisible();
    this._pEPCell.visible = PKD_EPManager.IsGridVisible();
    if (!this._pEPGridLayer.visible) {
      return;
    }
    if (this._pEPGridLayer == null) {
      return;
    }
    tw = $gameMap.tileWidth();
    tw2 = tw / 2;
    th = $gameMap.tileHeight();
    screenX = Math.round($gameMap.adjustX(-0.5) * tw + tw2);
    screenY = Math.round($gameMap.adjustY(-1) * th + th);
    this._pEPGridLayer.move(screenX, screenY);
    screenTouchPoint = TouchInput.mapScreenPoint();
    return this._pEPCell.move(screenTouchPoint.x, screenTouchPoint.y);
  };
  _.pAddNewPlacementEvent = function(id) {
    var event, spr;
    event = $gameMap._events[id];
    spr = new Sprite_Character(event);
    this._characterSprites.push(spr);
    this._tilemap.addChild(spr);
    spr.update();
  };
  _.pRemovePlacementEvent = function(id) {
    var spr;
    spr = this._characterSprites.find(function(i) {
      return (i._character != null) && i._character.pGetEPDynamicObjId() >= 0 && i._character._eventId === id;
    });
    if (spr == null) {
      return;
    }
    spr.visible = false;
    this._characterSprites.delete(spr);
    //for animSpr in spr._animationSprites
    //    @_tilemap.removeChild animSpr
    this._tilemap.removeChild(spr);
  };
})();

// ■ END Spriteset_Map.coffee
//---------------------------------------------------------------------------

// * DUMMY

//Plugin EasyPlacement automatic build by MVPluginBuilder 1.7 11.09.2020
