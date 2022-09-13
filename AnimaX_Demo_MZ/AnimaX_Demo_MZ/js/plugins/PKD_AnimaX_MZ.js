/*
 * Copyright (c) 2021 Vladimir Skrypnikov (Pheonix KageDesu)
 * <http://kdworkshop.net/>
 *
* License: Creative Commons 4.0 Attribution, Share Alike, Non-Commercial
 */

 // * CHANGELOG ===================
 //
 // v1.0 (20.03.2021)
 //    - Release
 // ===============================

/*:
 * @plugindesc (v.1.0)[BASIC] Characters animations system
 * @author Pheonix KageDesu
 * @target MZ
 * @url http://kdworkshop.net/plugins/animax
 *
 * 
 * @help
 * ---------------------------------------------------------------------------
 *
 * Detailed guide: http://kdworkshop.net/animax-plugin-guide/
 * (!better read guid and download Demo, it's not simple to use plugin)
 *
 * Plugin working directory: img\charactersAA\
 *
 * Add animations for characers in Plugin Parameters
 *
 * === Animations:
 *
 * For Actor, add Note: <xAnima:NAME>
 * For equipments (weapons), add Note: <xAnimaSet:NAME>
 * For event, add Comment: XA:NAME
 * 
 * === Extra layers:
 *
 * For equipments (weapons), add Note:
 * <xAnimaLayer:NAME>
 * <xAnimaLayerRelative:NAME>
 *
 * ===
 * Alpha ABS Z should be Below this plugin in Plugin Manager
 *
 * === Plugin have Plugin Commands
 *
 * ---------------------------------------------------------------------------
  *
  * This is BASIC plugin version and have some restrictions: *    - You can add only 3 extra layers per character *    - You can define only 3 actions for animation *    - Diagonal animation not supported (DL, DR, UR, UL frames) *    - Plugin usage allowed only in Non-Commercial project *  *  PRO version of plugin don't have this restrictions!
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

 * @param xAnimations:structA
 * @text Animations List
 * @type struct<LAnimaX>[]
 * @default []
 * @desc XAnima System Animations List
 * 
 * @param xAnimaParts:structA
 * @text Animation Layers List
 * @type struct<LAnimaXPart>[]
 * @default []
 * @desc XAnima System animation layers list
 * 


 * @command ChangePlayerAnimationSet
 * @text Change Player Animation
 * @desc Change player animation set
 * 
 * @arg animationSetName
 * @text Animation ID
 * @desc Animation ID form Animation List (plugin paramters)
 * @type text
 * @default
 * 
 * @command ResetPlayerAnimationSet
 * @text Reset Player Animation
 * @desc Reset player animation set to default (from Actor's Note)
 * 
 * 
 * @command PlayAnimationAction
 * @text Play Anima Action
 * @desc Start playing animation action for character
 * 
 * @arg actionName
 * @text Action Name
 * @desc Action Name form Actions List (plugin paramters) or empty string (clear all actions)
 * @type text
 * @default
 * 
 * @arg eventId
 * @text Character ID
 * @desc Animation target. Event ID. 0 - Player, -1 - current event ID
 * @type number
 * @min -1
 * @default -1
 * 
 *  @arg isLoop
 *  @text Is Looping?
 *  @type boolean
 *  @default false
 *  @desc Animation will be looped while character is not moving, event commands is continue
 * 
 *  @arg isWait
 *  @text Is Wait?
 *  @type boolean
 *  @default true
 *  @desc Next event commands will wait animation to complete
 * 
 * 
 * @command StopAnimationAction
 * @text Stop Anima Action
 * @desc Stop looping animation action for character
 * 
 * @arg eventId
 * @text Character ID
 * @desc Animation target. Event ID. 0 - Player, -1 - current event ID
 * @type number
 * @min -1
 * @default -1
 * 
 * @command AddPart
 * @text Add Layer
 * @desc Add extra layer on character
 * 
 * @arg eventId
 * @text Character ID
 * @desc Character with AnimaX animation. Event ID. 0 - Player, -1 - current event ID
 * @type number
 * @min -1
 * @default -1
 * 
 * @arg layerName
 * @text Layer ID
 * @desc Layer ID form Animation Layers List (plugin paramters)
 * @type text
 * @default
 * 
 * @arg isRelative
 * @text Relative?
 * @type boolean
 * @desc If false - layer will be loaded from CommonLayers folder, if true - layer will be loaded from character AnimaX folder
 * @default false
 * 
 * @command RemovePart
 * @text Remove Layer
 * @desc Remove extra layer from character
 * 
 * @arg eventId
 * @text Character ID
 * @desc Character with AnimaX animation. Event ID. 0 - Player, -1 - current event ID
 * @type number
 * @min -1
 * @default -1
 * 
 * @arg layerName
 * @text Layer ID
 * @desc Added layer ID form Animation Layers List (plugin paramters)
 * @type text
 * @default
 * 
 * @command ClearParts
 * @text Clear layers
 * @desc Remove all layers from character
 * 
 * @arg eventId
 * @text Character ID
 * @desc Character with AnimaX animation. Event ID. 0 - Player, -1 - current event ID
 * @type number
 * @min -1
 * @default -1


 */
/*~struct~LAnimaXPart:
 * @param id
 * @text ID
 * @default
 * @desc Unique ID for layer (also folder Name)
  
 * @param isLowerBodyPart:b
 * @text Is Lower Body Layer?
 * @type boolean
 * @default false
 * @desc If true - this layer will be half transparent when character in bushes
 
 * @param sortingLevel:i
 * @text Sorting order
 * @type number
 * @default 0
 * @min -100
 * @desc Layer sorting order
 *
 * @param layerRule:struct
 * @text Layer Settings
 * @type struct<LAnimaXPartDirLevel>
 * @default {"noDir:b":"false","dirD:b":"false","dirL:b":"false","dirR:b":"false","dirU:b":"false","8wayGroup":"","dirDL:b":"false","dirDR:b":"false","dirUR:b":"false","dirUL:b":"false"}
 * @desc Setting of layer direciton sprites positions
 *
 * @param baseRule:struct
 * @text Base Rule
 * @type struct<LAnimaXPartDefRule>
 * @default {"isHaveDirections:b":"true","isHaveFrames:b":"true"}
 * @desc Default animation layer settings. Using for all action without own rules

 * @param moveRule:struct
 * @text Move Rule
 * @type struct<LAnimaXPartDefRule>
 * @default {"isHaveDirections:b":"true","isHaveFrames:b":"true"}
 * @desc [Optional] Animation layer settings for moving

 * @param idleRule:struct
 * @text Idle Rule
 * @type struct<LAnimaXPartDefRule>
 * @default {"isHaveDirections:b":"true","isHaveFrames:b":"true"}
 * @desc [Optional] Animation layer settings for idle

 * @param actionRules:structA
 * @text Actions Rules
 * @type struct<LAnimaXPartActionRule>[]
 * @default []
 * @desc [Optional] Animation layer settings for actions
*/

/*~struct~LAnimaXPartActionRule:

 * @param actionName
 * @text Action Name
 * @default
 * @desc Name of action that rules for

 * @param fileName
 * @text Extra File Name
 * @default 
 * @desc Filename for this action, leave empty to use filename same as Action Name

 * @param enabled:b
 * @text Is Enabled?
 * @type boolean
 * @default true
 * @desc If false - this layer will hide completly when this action is playing

 * @param actionRule:struct
 * @text Rule
 * @type struct<LAnimaXPartDefRule>
 * @default {"isHaveDirections:b":"true","isHaveFrames:b":"true"}
 * @desc Layer settings only for this action

*/

/*~struct~LAnimaXPartDefRule:

 * @param isHaveDirections:b
 * @text Is change direction?
 * @type boolean
 * @default true
 * @desc Layer have direction related sprites _D, _U, _R, _L ?
 
 * @param isHaveFrames:b
 * @text Is have frames?
 * @type boolean
 * @default true
 * @desc If false - layer have only one frame (0 - zero), if true - layer have same frame count as parent animation

*/

/*~struct~LAnimaXPartDirLevel:

 * @param noDir:b
 * @text Default
 * @type boolean
 * @on Below
 * @off Above
 * @default false
 * @desc Is layer sprite with no directions will be below character sprite?

 * @param dirD:b
 * @text Down (_D)
 * @type boolean
  * @on Below
 * @off Above
 * @default false
 * @desc Is layer Down direction sprites will be below character sprite?

 * @param dirL:b
 * @text Left (_L)
 * @type boolean
  * @on Below
 * @off Above
 * @default false
 * @desc Is layer Left direction sprites will be below character sprite?

 * @param dirR:b
 * @text Right (_R)
 * @type boolean
  * @on Below
 * @off Above
 * @default false
 * @desc Is layer Right direction sprites will be below character sprite?

 * @param dirU:b
 * @text Up (_U)
 * @type boolean
  * @on Below
 * @off Above
 * @default false
 * @desc Is layer Up direction sprites will be below character sprite?

 * @param 8wayGroup
 * @text Diagonal Settings

 * @param dirDL:b
 * @parent 8wayGroup
 * @text Down Left (_DL)
 * @type boolean
  * @on Below
 * @off Above
 * @default false
 * @desc Is layer Down Left direction sprites will be below character sprite?

 * @param dirDR:b
 * @parent 8wayGroup
 * @text Down Right (_DR)
 * @type boolean
  * @on Below
 * @off Above
 * @default false
 * @desc Is layer Left Right direction sprites will be below character sprite?

 * @param dirUR:b
 * @parent 8wayGroup
 * @text Up Right (_UR)
 * @type boolean
  * @on Below
 * @off Above
 * @default false
 * @desc Is layer Up Right direction sprites will be below character sprite?

 * @param dirUL:b
 * @parent 8wayGroup
 * @text Up Left (_UL)
 * @type boolean
  * @on Below
 * @off Above
 * @default false
 * @desc Is layer Up Left direction sprites will be below character sprite?

*/

/*~struct~LAnimaX:
 * @param id
 * @text ID
 * @default
 * @desc Unique ID for animation (also folder Name)
 * 
 * @param base:s
 * @text Base
 * @type struct<LAnimaXSet>
 * @default
 * @desc Base animation set (for movement)
 * 
 * @param ABSZe
 * @text AABS Z
 * @default Only for Alpha ABS Z
 *
 * @param inBattle:s
 * @parent ABSZe
 * @text In Battle
 * @type struct<LAnimaXSet>
 * @default
 * @desc Battle state animation set
 * 
 * @param dead:s
 * @parent ABSZe
 * @text Dead
 * @type struct<LAnimaXSet>
 * @default
 * @desc Dead state animation set
 *
 * @param actions:structA
 * @text Actions
 * @type struct<LAnimaXAction>[]
 * @default []
 * @desc Actions List
*/
/*~struct~LAnimaXSet:
 * @param move:s
 * @text Movement
 * @type struct<LAnimaXParameters>
 * @default
 * @desc Movement animation settings
 * 
 * @param idle:s
 * @text Idle
 * @type struct<LAnimaXParameters>
 * @default
 * @desc Idle animation settings
 * 
 * @param moveToIdleDelay:i
 * @text Idle Delay
 * @type number
 * @default 30
 * @min 0
 * @desc Speed of change from movement to idle when character is not moving
*/
/*~struct~LAnimaXAction:
 * @param name
 * @text Action Name
 * @default Action
 * @desc Name for aciton
 * 
 * @param animation:s
 * @text Settings
 * @type struct<LAnimaXParameters>
 * @default
 * @desc Action animation settings
*/
/*~struct~LAnimaXParameters:
 * @param isOneDirection:b
 * @text One Direction?
 * @type boolean
 * @default false
 * @desc Animation will use only one direciton (without _D, _L, _R, _U frames)
 * 
 * @param frames:i
 * @text Frames Count
 * @type number
 * @default 3
 * @min 1
 * @desc Frames count
 * 
 * @param speed:i
 * @text Speed
 * @type number
 * @default 15
 * @min 1
 * @desc Frames change speed in frames
 * 
 * @param expandFirstFrame:i
 * @text Repeat first frame times
 * @type number
 * @default 0
 * @min 0
 * @max 100
 * @desc Times to repeat first frame (make only first frame dalayed)
 * 
 * @param is8Way:b
 * @text Is Support Diagonal?
 * @type boolean
 * @default false
 * @desc Animatin support 8 way diagonal movement, require _DL, _DR, _UL, _UR frames images
 * 
 * @param dx:int
 * @text Offset X
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * @desc Animation offset by X coordinate
 * 
 * @param dy:int
 * @text Offset Y
 * @min -100
 * @max 100
 * @type number
 * @default 0
 * @desc Animation offset by Y coordinate
*/
var Imported = Imported || {};
Imported.PKD_AnimaX = true;

var PKD_ANIMAX = {};
PKD_ANIMAX.version = 100; // 1.0.0

// Generated by CoffeeScript 2.3.0
// * Классы и методы из KDCore
PKD_ANIMAX.isMV = function() {
  return Utils.RPGMAKER_NAME.contains("MV");
};

// * Utils =========================================================
PKD_ANIMAX.getEventCommentValue = function(commentCode, list) {
  var comment, e, i, item;
  try {
    if (list && list.length > 1) {
      i = 0;
      while (i < list.length) {
        item = list[i++];
        if (!item) {
          continue;
        }
        if (item.code === 108) {
          comment = item.parameters[0];
          if (comment.contains(commentCode)) {
            return comment;
          }
        }
      }
    }
  } catch (error) {
    e = error;
    console.warn(e);
  }
  return null;
};

PKD_ANIMAX.hasMeta = function(symbol, obj) {
  return (obj.meta != null) && (obj.meta[symbol] != null);
};

PKD_ANIMAX.getValueFromMeta = function(symbol, obj) {
  if (!PKD_ANIMAX.hasMeta(symbol, obj)) {
    return null;
  }
  return obj.meta[symbol];
};

// * Array ========================================================
Array.prototype.delete = function() {
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

// * String ========================================================
String.prototype.isEmpty = function() {
  return this.length === 0 || !this.trim();
};

String.isNullOrEmpty = function(str) {
  return (str == null) || str.isEmpty();
};

String.any = function(str) {
  return !String.isNullOrEmpty(str);
};

// * ParametersManager
//------------------------------------------------------------------------------
PluginManager.getPluginParametersByRoot = function(rootName) {
  var pluginParameters, property;
  for (property in this._parameters) {
    if (this._parameters.hasOwnProperty(property)) {
      pluginParameters = this._parameters[property];
      if (PluginManager.isPluginParametersContentKey(pluginParameters, rootName)) {
        return pluginParameters;
      }
    }
  }
  return PluginManager.parameters(rootName);
};

PluginManager.isPluginParametersContentKey = function(pluginParameters, key) {
  return pluginParameters[key] != null;
};

//! Нету обработки цвета
//@[AUTO EXTEND]
PKD_ANIMAX.ParamLoader = class ParamLoader {
  constructor(pluginName) {
    this.pluginName = pluginName;
    this.paramsRaw = PluginManager.getPluginParametersByRoot(this.pluginName);
    this.params = this.parseParameters(this.paramsRaw);
  }

  parseParameters(paramSet) {
    var clearKey, key, params, typeKey, value;
    params = {};
    for (key in paramSet) {
      value = paramSet[key];
      clearKey = this.parseKey(key);
      typeKey = this.parseKeyType(key);
      params[clearKey] = this.parseParamItem(typeKey, value);
    }
    return params;
  }

  parseKey(keyRaw) {
    return keyRaw.split(":")[0];
  }

  parseKeyType(keyRaw) {
    return keyRaw.split(":")[1];
  }

  // * Проверка, загружены ли параметры плагина
  isLoaded() {
    return (this.paramsRaw != null) && this.paramsRaw.hasOwnProperty(this.pluginName);
  }

  // * Имя параметра без ключа
  isHasParameter(paramName) {
    return this.params[paramName] != null;
  }

  
  // * Возвращает значение параметра (def - по умолчанию, если не найден)
  getParam(paramName, def) {
    if (this.isHasParameter(paramName)) {
      return this.params[paramName];
    } else {
      return def;
    }
  }

  // * Данные ключи должны идти после названия параметра через :
  // * Пример: @param ShowDelay:int, @param TestBool:bool
  // * Текстовые параметры, которые надо вернуть как есть, можно без типа (text, file, combo, ...)
  parseParamItem(type, item) {
    var e;
    if (type == null) {
      return item;
    }
    try {
      switch (type) {
        case "int":
        case "i":
          return parseInt(item);
        case "intA": // * массив чисел
          if (String.any(item)) {
            return JsonEx.parse(item).map((e) => {
              return this.parseParamItem("int", e);
            });
          } else {
            return [];
          }
          break;
        case "bool":
        case "b":
        case "e":
          return eval(item);
        case "struct":
        case "s":
          if (String.any(item)) {
            return this.parseParameters(JsonEx.parse(item));
          } else {
            return null;
          }
          break;
        case "structA": // * массив структур
          return JsonEx.parse(item).map((e) => {
            return this.parseParameters(JsonEx.parse(e));
          });
        case "str":
          return item;
        case "strA":
          if (String.any(item)) {
            return JsonEx.parse(item).map((e) => {
              return this.parseParamItem("str", e);
            });
          } else {
            return [];
          }
          break;
        case "note": // * если несколько строк в тексте
          return JsonEx.parse(item);
        default:
          return item;
      }
    } catch (error) {
      e = error;
      console.warn(e);
      return item;
    }
  }

};

// Generated by CoffeeScript 2.5.1
// * Классы и методы из KDCore
PKD_ANIMAX.isMV = function() {
  return Utils.RPGMAKER_NAME.contains("MV");
};

// * Utils =========================================================
PKD_ANIMAX.getEventCommentValue = function(commentCode, list) {
  var comment, e, i, item;
  try {
    if (list && list.length > 1) {
      i = 0;
      while (i < list.length) {
        item = list[i++];
        if (!item) {
          continue;
        }
        if (item.code === 108) {
          comment = item.parameters[0];
          if (comment.contains(commentCode)) {
            return comment;
          }
        }
      }
    }
  } catch (error) {
    e = error;
    console.warn(e);
  }
  return null;
};

PKD_ANIMAX.hasMeta = function(symbol, obj) {
  return (obj.meta != null) && (obj.meta[symbol] != null);
};

PKD_ANIMAX.getValueFromMeta = function(symbol, obj) {
  if (!PKD_ANIMAX.hasMeta(symbol, obj)) {
    return null;
  }
  return obj.meta[symbol];
};

// * Array ========================================================
Array.prototype.delete = function() {
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

// * String ========================================================
String.prototype.isEmpty = function() {
  return this.length === 0 || !this.trim();
};

String.isNullOrEmpty = function(str) {
  return (str == null) || str.isEmpty();
};

String.any = function(str) {
  return !String.isNullOrEmpty(str);
};

// * ParametersManager
//------------------------------------------------------------------------------
PluginManager.getPluginParametersByRoot = function(rootName) {
  var pluginParameters, property;
  for (property in this._parameters) {
    if (this._parameters.hasOwnProperty(property)) {
      pluginParameters = this._parameters[property];
      if (PluginManager.isPluginParametersContentKey(pluginParameters, rootName)) {
        return pluginParameters;
      }
    }
  }
  return PluginManager.parameters(rootName);
};

PluginManager.isPluginParametersContentKey = function(pluginParameters, key) {
  return pluginParameters[key] != null;
};

//! Нету обработки цвета
//@[AUTO EXTEND]
PKD_ANIMAX.ParamLoader = class ParamLoader {
  constructor(pluginName) {
    this.pluginName = pluginName;
    this.paramsRaw = PluginManager.getPluginParametersByRoot(this.pluginName);
    this.params = this.parseParameters(this.paramsRaw);
  }

  parseParameters(paramSet) {
    var clearKey, key, params, typeKey, value;
    params = {};
    for (key in paramSet) {
      value = paramSet[key];
      clearKey = this.parseKey(key);
      typeKey = this.parseKeyType(key);
      params[clearKey] = this.parseParamItem(typeKey, value);
    }
    return params;
  }

  parseKey(keyRaw) {
    return keyRaw.split(":")[0];
  }

  parseKeyType(keyRaw) {
    return keyRaw.split(":")[1];
  }

  // * Проверка, загружены ли параметры плагина
  isLoaded() {
    return (this.paramsRaw != null) && this.paramsRaw.hasOwnProperty(this.pluginName);
  }

  // * Имя параметра без ключа
  isHasParameter(paramName) {
    return this.params[paramName] != null;
  }

  
    // * Возвращает значение параметра (def - по умолчанию, если не найден)
  getParam(paramName, def) {
    if (this.isHasParameter(paramName)) {
      return this.params[paramName];
    } else {
      return def;
    }
  }

  // * Данные ключи должны идти после названия параметра через :
  // * Пример: @param ShowDelay:int, @param TestBool:bool
  // * Текстовые параметры, которые надо вернуть как есть, можно без типа (text, file, combo, ...)
  parseParamItem(type, item) {
    var e;
    if (type == null) {
      return item;
    }
    try {
      switch (type) {
        case "int":
        case "i":
          return parseInt(item);
        case "intA": // * массив чисел
          if (String.any(item)) {
            return JsonEx.parse(item).map((e) => {
              return this.parseParamItem("int", e);
            });
          } else {
            return [];
          }
          break;
        case "bool":
        case "b":
        case "e":
          return eval(item);
        case "struct":
        case "s":
          if (String.any(item)) {
            return this.parseParameters(JsonEx.parse(item));
          } else {
            return null;
          }
          break;
        case "structA": // * массив структур
          return JsonEx.parse(item).map((e) => {
            return this.parseParameters(JsonEx.parse(e));
          });
        case "str":
          return item;
        case "strA":
          if (String.any(item)) {
            return JsonEx.parse(item).map((e) => {
              return this.parseParamItem("str", e);
            });
          } else {
            return [];
          }
          break;
        case "note": // * если несколько строк в тексте
          return JsonEx.parse(item);
        default:
          return item;
      }
    } catch (error) {
      e = error;
      console.warn(e);
      return item;
    }
  }

};

// Generated by CoffeeScript 2.5.1
PKD_ANIMAX.LoadPluginSettings = function() {
  var a, animList, i, len, partsList;
  PKD_ANIMAX.Params = new PKD_ANIMAX.ParamLoader("xAnimations:structA");
  animList = PKD_ANIMAX.Params.getParam("xAnimations", []);
  for (i = 0, len = animList.length; i < len; i++) {
    a = animList[i];
    a.actions = XAnimaTools.convertActionsFromParameters(a.actions);
  }
  PKD_ANIMAX.Animations = animList;
  partsList = PKD_ANIMAX.Params.getParam("xAnimaParts", []);
  PKD_ANIMAX.AnimationParts = partsList;
  PKD_ANIMAX.RegisterPluginCommnads();
};

PKD_ANIMAX.RegisterPluginCommnads = () => {

    const pluginName = "PKD_AnimaX";

    PKD_ANIMAX.RegisterPluginCommnadsForName(pluginName);
    PKD_ANIMAX.RegisterPluginCommnadsForName(pluginName + "_MZ");

};

PKD_ANIMAX.RegisterPluginCommnadsForName = (pluginName) => {

    PluginManager.registerCommand(pluginName, 'ChangePlayerAnimationSet', args => {
        try {
            let animationSetName = args.animationSetName;
            if(String.any(animationSetName)) {
                PKD_ANIMAX.PluginCommand_ChangePlayerAnimationSet(animationSetName);
            }
        } catch (e) {
            console.warn(e);
        }
    });

    PluginManager.registerCommand(pluginName, 'ResetPlayerAnimationSet', args => {
        try {
            PKD_ANIMAX.PluginCommand_ChangePlayerAnimationSet(null);
        } catch (e) {
            console.warn(e);
        }
    });

    PluginManager.registerCommand(pluginName, 'PlayAnimationAction', args => {
        try {
            let actionName = args.actionName;
            let charaId = parseInt(args.eventId);
            let isLoop = eval(args.isLoop);
            let isWait = eval(args.isWait);
            PKD_ANIMAX.PluginCommand_PlayAnimationAction(actionName, charaId, isLoop, isWait);
        } catch (e) {
            console.warn(e);
        }
    });

    PluginManager.registerCommand(pluginName, 'StopAnimationAction', args => {
        try {
            let charaId = parseInt(args.eventId);
            PKD_ANIMAX.PluginCommand_StopAnimationAction(charaId);
        } catch (e) {
            console.warn(e);
        }
    });

    PluginManager.registerCommand(pluginName, 'AddPart', args => {
        try {
            let charaId = parseInt(args.eventId);
            let partId = args.layerName;
            let isRelative = eval(args.isRelative);
            PKD_ANIMAX.PluginCommand_AddPart(charaId, partId, isRelative);
        } catch (e) {
            console.warn(e);
        }
    });

    PluginManager.registerCommand(pluginName, 'RemovePart', args => {
        try {
            let charaId = parseInt(args.eventId);
            let partId = args.layerName;
            PKD_ANIMAX.PluginCommand_RemovePart(charaId, partId);
        } catch (e) {
            console.warn(e);
        }
    });

    PluginManager.registerCommand(pluginName, 'ClearParts', args => {
        try {
            let charaId = parseInt(args.eventId);
            PKD_ANIMAX.PluginCommand_ClearParts(charaId);
        } catch (e) {
            console.warn(e);
        }
    });

};
(function () {

    PKD_ANIMAX.PluginCommand_ChangePlayerAnimationSet = (animationSetName) => {
        try {
            $gamePlayer.setExternalAnimaX(animationSetName);
        } catch (e) {
            console.warn(e);
        }
    };

    PKD_ANIMAX.PluginCommand_PlayAnimationAction = (actionName, charaId, isLoop, isWait) => {
        try {
            let char = PKD_ANIMAX.GetProperCharacter(charaId);
            if(char) {
                if(!String.any(actionName)) {
                    char.resetXAnima();
                } else {
                    if(char.startAnimaXCustomAction(actionName, isLoop, isWait)) {
                        if(isWait == true && isLoop == false) {
                            PKD_ANIMAX.SetInterpreterToWait(char);
                        }
                    }
                }
            }
        } catch (e) {
            console.warn(e);
        }
    };

    PKD_ANIMAX.PluginCommand_StopAnimationAction = (charaId) => {
        try {
            let char = PKD_ANIMAX.GetProperCharacter(charaId);
            if(char) char.resetXAnima();
        } catch (e) {
            console.warn(e);
        }
    };

    PKD_ANIMAX.PluginCommand_AddPart = (charaId, partId, isRelative) => {
        try {
            let char = PKD_ANIMAX.GetProperCharacter(charaId);
            if(char) char.addNewXAnimPart(partId, isRelative);
        } catch (e) {
            console.warn(e);
        }
    };

    PKD_ANIMAX.PluginCommand_RemovePart = (charaId, partId) => {
        try {
            let char = PKD_ANIMAX.GetProperCharacter(charaId);
            if(char) char.removeXAnimPart(partId);
        } catch (e) {
            console.warn(e);
        }
    };

    PKD_ANIMAX.PluginCommand_ClearParts = (charaId) => {
        try {
            let char = PKD_ANIMAX.GetProperCharacter(charaId);
            if(char) char.clearXAnimParts();
        } catch (e) {
            console.warn(e);
        }
    };

    PKD_ANIMAX.GetProperCharacter = (charId) => {
        var char = null;
        try {
            if (!charId || charId == 0) {
                char = $gamePlayer;
            } else if (charId < 0) {
                let int = $gameMap._interpreter;
                charId = int.eventId();
                if (charId > 0) {
                    char = $gameMap.event(charId);
                } else {
                    return null;
                }
            } else {
                char = $gameMap.event(charId);
            }
            if (!char) return null;
            if (!char.isAnimX()) return null;
            return char;
        } catch (e) {
            console.warn(e, "Can't find character with ID " + charId + " for PlayAnimationAction");
        }
    };

    PKD_ANIMAX.SetInterpreterToWait = (char) => {
        let int = $gameMap._interpreter;
        int.xAnimaTarget = char;
        int._waitMode = 'xAnima';
    };

})();
// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ DataManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__loadDatabase, _;
  //@[DEFINES]
  _ = DataManager;
  //@[ALIAS]
  ALIAS__loadDatabase = _.loadDatabase;
  _.loadDatabase = function() {
    PKD_ANIMAX.LoadPluginSettings();
    return ALIAS__loadDatabase.call(this);
  };
})();

// ■ END DataManager.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Actor.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initMembers, ALIAS__refresh, _;
  //@[DEFINES]
  _ = Game_Actor.prototype;
  //@[ALIAS]
  ALIAS__initMembers = _.initMembers;
  _.initMembers = function() {
    ALIAS__initMembers.call(this);
    this.axLayersByEquips = [];
    this.axLayersByEquipsRelative = [];
    // * Слои которые надо снять, после обновления экипировки
    this.axPreviousLayers = [];
  };
  //@[ALIAS]
  ALIAS__refresh = _.refresh;
  _.refresh = function() {
    ALIAS__refresh.call(this);
    this.refreshAnimaXLayers();
    this.requestRefreshAnimaX();
  };
})();

// ■ END Game_Actor.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Actor.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Actor.prototype;
  _.requestRefreshAnimaX = function() {
    return this._isNeedAnimaXRefresh = true;
  };
  _.isNeedAnimaXRefresh = function() {
    return this._isNeedAnimaXRefresh === true;
  };
  _.onAnimaXRefresh = function() {
    return this._isNeedAnimaXRefresh = null;
  };
  _.getAnimaXEquipmentSet = function() {
    var e, equipSet, i, len, ref;
    ref = this.equips();
    for (i = 0, len = ref.length; i < len; i++) {
      e = ref[i];
      if (e == null) {
        continue;
      }
      equipSet = PKD_ANIMAX.getValueFromMeta('xAnimaSet', e);
      if (String.any(equipSet)) {
        return equipSet;
      }
    }
    return null;
  };
  // * Чтобы не удалялись части, которые добавленны параметром плагина
  // * используется массив axPreviousLayers, в котором храняться части
  // * которые были в прошлый раз, но в этот их уже нету - т.е. их надо удалить
  _.refreshAnimaXLayers = function() {
    var e, equipLayer, i, len, ref;
    this.axPreviousLayers = [...this.axLayersByEquips, ...this.axLayersByEquipsRelative];
    this.axLayersByEquips = [];
    this.axLayersByEquipsRelative = [];
    ref = this.equips();
    for (i = 0, len = ref.length; i < len; i++) {
      e = ref[i];
      if (e == null) {
        continue;
      }
      equipLayer = PKD_ANIMAX.getValueFromMeta('xAnimaLayer', e);
      this._registerLayerByEquip(equipLayer, false);
      equipLayer = PKD_ANIMAX.getValueFromMeta('xAnimaLayerRelative', e);
      this._registerLayerByEquip(equipLayer, true);
    }
  };
  _._registerLayerByEquip = function(name, isRelative) {
    if (!String.any(name)) {
      return;
    }
    this.axPreviousLayers.delete(name);
    if (isRelative === true) {
      this.axLayersByEquipsRelative.push(name);
    } else {
      this.axLayersByEquips.push(name);
    }
  };
})();

// ■ END Game_Actor.coffee
//---------------------------------------------------------------------------

//Compressed by MV Plugin Builder
(function(){var a0_0x300f=['isAnimXPartsChanged','QrAVU','qAfiR','cRIwC','moveToIdleDelay','_updateMovingAnimX','_updateMoveIdleAnimaX','removeXAnimPart','UJUzF','isAnimaXActionIsPreloaded','_axState','_updateAnimXRefresh','phoqZ','_xAnimaPartsRequireRefresh','_axCurrent','_createAnimaXSetFromParams','155381rUZmGQ','waitActionEnd','isInMovementAnimaX','warn','FXVFp','prototype','idleSet','animaXParts','IBqRa','tpyth','isHaveAnimaXState','_setAnimaXToMovement','_isHaveAnimaX','isHaveIdleAnimaX','145284NWKCGG','_updateAnimX','clearXAnimParts','_xAnimaToIdleTimer','kMrhz','_axIdle','resetXAnimaState','qSaAB','lbteP','_getAnimaXMoveToIdleDelay','_axId','IBBLt','createXAnimaSetForMove','SjwPu','_axPreloadedActions','_createXAnimaSetsForState','switchToXAnimaState','xAlrL','getCurrentAnimX','LXKua','startAnimaXAction','ywHaH','qyYxm','isAction','QdxLT','ccHEL','497906xlSxrS','dZpOs','_inAnimXAction','getPreloadAnimaXActionSet','_axMovement','EsPIP','NDwaI','2xqrMKy','STBNH','_axAvailableActionsList','hSbfz','rPzIl','XEtPL','ROOOc','startAnimaXCustomAction','preLoad','FTCAc','isWait','rUhvF','_setAnimaXToIdle','458271KoJYac','moveSet','GuJQe','isInAnimXAction','30rKRqQJ','onAnimaXActionEnd','XZfGu','Pvurs','animXId','initAnimaX','move','BIUfh','MqwzJ','ddZzr','523Ceyrte','isShouldWaitAnimaXAction','QTtmW','23223oEoibH','isAnimX','resetXAnima','createAnimaXActionSet','185XAKfik','contains','10347BgBcBz','createXAnimaSetForIdle','_axStates','base','isMoving'];var a0_0x4f65=function(_0x13d73d,_0x5ea6d8){_0x13d73d=_0x13d73d-0xab;var _0x300f1d=a0_0x300f[_0x13d73d];return _0x300f1d;};(function(_0x45962e,_0x15b7d9){var _0xd07f50=a0_0x4f65;while(!![]){try{var _0x451b30=parseInt(_0xd07f50(0xc2))+-parseInt(_0xd07f50(0xeb))+-parseInt(_0xd07f50(0x105))+-parseInt(_0xd07f50(0x10c))*-parseInt(_0xd07f50(0xdd))+-parseInt(_0xd07f50(0xb5))*-parseInt(_0xd07f50(0xc8))+parseInt(_0xd07f50(0xc6))*-parseInt(_0xd07f50(0xbf))+parseInt(_0xd07f50(0xb1));if(_0x451b30===_0x15b7d9)break;else _0x45962e['push'](_0x45962e['shift']());}catch(_0x36338){_0x45962e['push'](_0x45962e['shift']());}}}(a0_0x300f,0x588e1),function(){var _0xf8bd4d=a0_0x4f65,_0x3420a0;_0x3420a0=Game_Character[_0xf8bd4d(0xe2)],function(){var _0x3f588b=_0xf8bd4d;_0x3420a0[_0x3f588b(0xc3)]=function(){return this['_isHaveAnimaX']===!![];},_0x3420a0['animXId']=function(){var _0x15c3b2=_0x3f588b;if(_0x15c3b2(0xb7)!==_0x15c3b2(0xb7)){function _0x54ef01(){var _0x1f7074=_0x15c3b2;return this[_0x1f7074(0xf5)];}}else return this['_axId'];},_0x3420a0[_0x3f588b(0xea)]=function(){return this['_axIdle']()!=null;},_0x3420a0['isHaveAnimaXState']=function(_0x48369d){var _0x5e070a=_0x3f588b;return this[_0x5e070a(0xca)][_0x48369d]!=null;},_0x3420a0['isInAnimXAction']=function(){var _0x556a8f=_0x3f588b;if(_0x556a8f(0xf8)==='SjwPu')return this[_0x556a8f(0xc3)]()&&this[_0x556a8f(0xfd)]()[_0x556a8f(0x102)]();else{function _0x328a6c(){return![];}}},_0x3420a0[_0x3f588b(0xdf)]=function(){var _0x598d0b=_0x3f588b;return this[_0x598d0b(0xdb)]===this['_axMovement']();},_0x3420a0['isInIdleAnimaX']=function(){var _0x3f27f7=_0x3f588b;if(_0x3f27f7(0xbe)!==_0x3f27f7(0x111))return this[_0x3f27f7(0xdb)]===this[_0x3f27f7(0xf0)]();else{function _0x488311(){return;}}},_0x3420a0['onAnimaXActionStart']=function(){var _0x4c5df1=_0x3f588b;return this[_0x4c5df1(0xee)]=0x0;},_0x3420a0[_0x3f588b(0xb6)]=function(){var _0x54e04c=_0x3f588b;return this[_0x54e04c(0xc4)]();},_0x3420a0['isShouldWaitAnimaXAction']=function(){var _0x4df94a=_0x3f588b;if(_0x4df94a(0xfe)===_0x4df94a(0xfe)){var _0x13a24b;if(this['isInMovementAnimaX']()){if(_0x4df94a(0x106)!==_0x4df94a(0xf3))return![];else{function _0x277df5(){var _0x80c60f=_0x4df94a;this[_0x80c60f(0xd7)]=_0x80c60f(0xcb),!this['isInAnimXAction']()&&this[_0x80c60f(0xc4)]();}}}if(!this[_0x4df94a(0xb4)]())return![];return _0x13a24b=this[_0x4df94a(0xfd)](),_0x13a24b[_0x4df94a(0x102)]()&&_0x13a24b[_0x4df94a(0xae)]();}else{function _0x52fe25(){var _0xc35a7f=_0x4df94a;return this[_0xc35a7f(0xf0)]()[_0xc35a7f(0xd1)];}}},_0x3420a0['isHaveAnimaXActionWithName']=function(_0x353f81){var _0x26d11a=_0x3f588b;return this[_0x26d11a(0x10e)]['contains'](_0x353f81);},_0x3420a0[_0x3f588b(0xfd)]=function(){var _0x30b4c7=_0x3f588b;return this[_0x30b4c7(0xdb)];},_0x3420a0['startAnimaXAction']=function(_0x340f75){return this['_axCurrent']=_0x340f75;},_0x3420a0[_0x3f588b(0xfb)]=function(_0x2cd0a4){var _0xc56fe2=_0x3f588b;if(this[_0xc56fe2(0xe7)](_0x2cd0a4))this[_0xc56fe2(0xd7)]=_0x2cd0a4,!this['isInAnimXAction']()&&this[_0xc56fe2(0xc4)]();else{if(_0xc56fe2(0xb8)===_0xc56fe2(0xb8))this['resetXAnimaState']();else{function _0x1fcc3d(){var _0x1a3792=_0xc56fe2;return this['isAnimX']()&&this[_0x1a3792(0xfd)]()['isAction']();}}}},_0x3420a0[_0x3f588b(0xba)]=function(_0xf4bffd,_0x4afa5a){var _0x1e90f5=_0x3f588b;if(_0x1e90f5(0x10f)===_0x1e90f5(0x10b)){function _0x1a3ba5(){return;}}else{this[_0x1e90f5(0xf5)]=_0xf4bffd,this['clearXAnimParts'](),this[_0x1e90f5(0x10e)]=[],this[_0x1e90f5(0xf9)]={},this[_0x1e90f5(0xca)]={},this[_0x1e90f5(0xd7)]=_0x1e90f5(0xcb),this['registerAnimaXState'](this[_0x1e90f5(0xd7)],_0x4afa5a);if(this[_0x1e90f5(0xca)][this['_axState']]==null)return;this[_0x1e90f5(0xc4)](),this[_0x1e90f5(0xe9)]=!![];}},_0x3420a0['registerAnimaXState']=function(_0x15ff95,_0x3d6eea){var _0x4719f9=_0x3f588b;if('ywHaH'===_0x4719f9(0x100)){var _0x13d623,_0x15cd78,_0x535350;try{if(_0x4719f9(0x10d)===_0x4719f9(0x10d)){if(_0x3d6eea==null)return;_0x535350=this['_createAnimaXSetFromParams'](0x0,_0x15ff95,_0x3d6eea[_0x4719f9(0xbb)]);if(_0x535350==null){if(_0x4719f9(0xd5)===_0x4719f9(0xd5))return;else{function _0x23c529(){_0x30043a['preLoad']();}}}_0x535350['preLoad'](),_0x15cd78=this[_0x4719f9(0xdc)](0x1,_0x15ff95,_0x3d6eea['idle']),_0x15cd78!=null&&_0x15cd78[_0x4719f9(0xac)](),_0x15cd78!=null&&_0x3d6eea['moveToIdleDelay']!=null&&(_0x15cd78[_0x4719f9(0xd1)]=_0x3d6eea['moveToIdleDelay']),this[_0x4719f9(0xfa)](_0x15ff95,_0x535350,_0x15cd78);}else{function _0x59abc4(){var _0x1cd997=_0x4719f9;return this[_0x1cd997(0xee)]=0x0;}}}catch(_0x476536){_0x13d623=_0x476536,console[_0x4719f9(0xe0)](_0x13d623),this[_0x4719f9(0xca)][_0x15ff95]=null;}}else{function _0x541e04(){var _0x516db2=_0x4719f9;return this[_0x516db2(0x10e)][_0x516db2(0xc7)](_0x7b991f);}}},_0x3420a0[_0x3f588b(0xf1)]=function(){var _0x31d4e0=_0x3f588b;this[_0x31d4e0(0xd7)]=_0x31d4e0(0xcb);if(!this['isInAnimXAction']()){if(_0x31d4e0(0xce)!==_0x31d4e0(0xce)){function _0x5c4da0(){return;}}else this[_0x31d4e0(0xc4)]();}},_0x3420a0[_0x3f588b(0xc4)]=function(){var _0x41fda4=_0x3f588b;this[_0x41fda4(0x107)]=![],this['_xAnimaToIdleTimer']=0x0,this[_0x41fda4(0xe8)]();},_0x3420a0['registerAnimaXAction']=function(_0x112b8a){var _0x3b5ddd=_0x3f588b;if(_0x3b5ddd(0x103)!==_0x3b5ddd(0xbc))return this[_0x3b5ddd(0x10e)]['push'](_0x112b8a);else{function _0x16bd51(){var _0x5353ba=_0x3b5ddd;return this[_0x5353ba(0xdb)];}}},_0x3420a0['_initMembersAnimaX']=function(){var _0x37d2e1=_0x3f588b;return this[_0x37d2e1(0xda)]=![],this[_0x37d2e1(0xee)]=0x0,this[_0x37d2e1(0xe9)]=![];},_0x3420a0[_0x3f588b(0xfa)]=function(_0x114f73,_0xe46067,_0xaca81e){var _0x2b677e=_0x3f588b;if(_0x2b677e(0xef)==='kMrhz'){this['_axStates'][_0x114f73]={},_0xe46067['preLoad'](),this[_0x2b677e(0xca)][_0x114f73][_0x2b677e(0xb2)]=_0xe46067;if(_0xaca81e!=null)_0xaca81e['isLoop']=!![],_0xaca81e[_0x2b677e(0xac)](),this[_0x2b677e(0xca)][_0x114f73][_0x2b677e(0xe3)]=_0xaca81e;else{if('gODEL'===_0x2b677e(0xe1)){function _0x2e96e2(){var _0x1b7c97=_0x2b677e;this[_0x1b7c97(0xe4)][_0x3f2fc2]=null,delete this['animaXParts'][_0x4c500a],this[_0x1b7c97(0xda)]=!![];}}else this[_0x2b677e(0xca)][_0x114f73][_0x2b677e(0xe3)]=null;}}else{function _0x76c24b(){var _0x3f5f9a=_0x2b677e;return this[_0x3f5f9a(0xdb)]===this[_0x3f5f9a(0x109)]();}}},_0x3420a0['_createAnimaXSetFromParams']=function(_0x4a56e1,_0x4506eb,_0xfcb90e){var _0x485c41=_0x3f588b,_0x386c3d,_0x341337;_0x386c3d=null;try{if(_0x485c41(0xe5)!==_0x485c41(0xf6)){if(_0x4a56e1===0x0){if(_0x485c41(0x104)!=='ccHEL'){function _0x4e11e5(){var _0x30a6f8=_0x485c41,_0x16e4e3;if(this[_0x30a6f8(0xdf)]())return![];if(!this['isInAnimXAction']())return![];return _0x16e4e3=this[_0x30a6f8(0xfd)](),_0x16e4e3['isAction']()&&_0x16e4e3[_0x30a6f8(0xae)]();}}else _0xfcb90e!=null&&(_0x386c3d=XAnimaTools[_0x485c41(0xf7)](this[_0x485c41(0xb9)](),_0x4506eb,_0xfcb90e));}else{if(_0xfcb90e!=null){if(_0x485c41(0x10a)!=='EsPIP'){function _0x984153(){var _0xd31837=_0x485c41;_0x8a06d5=_0x4ebf32,_0x3cd7ed[_0xd31837(0xe0)](_0x544df2),_0x1e3121=null;}}else _0x386c3d=XAnimaTools['createXAnimaSetForIdle'](this[_0x485c41(0xb9)](),_0x4506eb,_0xfcb90e);}}}else{function _0x240462(){var _0x2fc70d=_0x485c41;return this[_0x2fc70d(0xe9)]===!![];}}}catch(_0x595d29){if(_0x485c41(0xb3)===_0x485c41(0xb3))_0x341337=_0x595d29,console[_0x485c41(0xe0)](_0x341337),_0x386c3d=null;else{function _0x451364(){var _0x3ab7a0=_0x485c41;if(!this[_0x3ab7a0(0xcc)]()){this[_0x3ab7a0(0xee)]++;if(this['_xAnimaToIdleTimer']>=this[_0x3ab7a0(0xf4)]())return this[_0x3ab7a0(0xb0)]();}}}}return _0x386c3d;},_0x3420a0[_0x3f588b(0xec)]=function(){var _0x9e5289=_0x3f588b;this[_0x9e5289(0xd8)]();if(this[_0x9e5289(0xc0)]()){if(_0x9e5289(0xad)!==_0x9e5289(0xad)){function _0x2f56f5(){return this['_xAnimaPartsRequireRefresh']=![];}}else return;}this[_0x9e5289(0xd2)]();if(this[_0x9e5289(0xea)]()&&this['isInMovementAnimaX']())return this[_0x9e5289(0xd3)]();},_0x3420a0[_0x3f588b(0xd2)]=function(){var _0x5b5001=_0x3f588b;if(_0x5b5001(0xd9)!=='egAfK'){if(!this[_0x5b5001(0xcc)]())return;this['_xAnimaToIdleTimer']=0x0;if(!this[_0x5b5001(0xdf)]())return this[_0x5b5001(0xc4)]();}else{function _0x1842db(){var _0x11a917=_0x5b5001;_0x5cf212!=null&&(_0x522bd9=_0x11db5e[_0x11a917(0xc9)](this[_0x11a917(0xb9)](),_0x130af4,_0x3d1e77));}}},_0x3420a0[_0x3f588b(0xd3)]=function(){var _0x10eef5=_0x3f588b;if(!this[_0x10eef5(0xcc)]()){if(_0x10eef5(0x112)!==_0x10eef5(0xd0)){this[_0x10eef5(0xee)]++;if(this['_xAnimaToIdleTimer']>=this[_0x10eef5(0xf4)]())return this[_0x10eef5(0xb0)]();}else{function _0x2d7c85(){return![];}}}},_0x3420a0[_0x3f588b(0xf4)]=function(){var _0x294ba9=_0x3f588b;return this[_0x294ba9(0xf0)]()[_0x294ba9(0xd1)];},_0x3420a0[_0x3f588b(0x109)]=function(){var _0x45f21a=_0x3f588b;return this[_0x45f21a(0xca)][this[_0x45f21a(0xd7)]][_0x45f21a(0xb2)];},_0x3420a0[_0x3f588b(0xf0)]=function(){var _0xfb0500=_0x3f588b;return this['_axStates'][this[_0xfb0500(0xd7)]]['idleSet'];},_0x3420a0[_0x3f588b(0xb0)]=function(){var _0x24fc86=_0x3f588b;if(_0x24fc86(0xfc)!==_0x24fc86(0xfc)){function _0x5b2db9(){return this['resetXAnima']();}}else return this[_0x24fc86(0xdb)]=this['_axIdle']();},_0x3420a0[_0x3f588b(0xe8)]=function(){var _0x17fcfa=_0x3f588b;return this[_0x17fcfa(0xdb)]=this['_axMovement']();},_0x3420a0['clearAnimaX']=function(){var _0x2d484b=_0x3f588b;this[_0x2d484b(0xc4)](),this['_isHaveAnimaX']=![],this[_0x2d484b(0xba)](null,null);},_0x3420a0[_0x3f588b(0xcd)]=function(){var _0xea3358=_0x3f588b;return this[_0xea3358(0xda)]===!![];},_0x3420a0['onAnimXPartsRefreshed']=function(){var _0x2582a7=_0x3f588b;return this[_0x2582a7(0xda)]=![];},_0x3420a0['addNewXAnimPart']=function(_0x20b5e2,_0x5c7c91=![]){var _0x4eef1e=_0x3f588b;if(_0x4eef1e(0xe6)===_0x4eef1e(0xaf)){function _0x59c378(){var _0x1fcbfa=_0x4eef1e;this['_updateAnimXRefresh']();if(this['isShouldWaitAnimaXAction']())return;this['_updateMovingAnimX']();if(this[_0x1fcbfa(0xea)]()&&this[_0x1fcbfa(0xdf)]())return this[_0x1fcbfa(0xd3)]();}}else{var _0x1aa740;if(this[_0x4eef1e(0xe4)][_0x20b5e2]!=null)return;_0x1aa740=XAnimaTools['createXAnimaPart'](this[_0x4eef1e(0xb9)](),_0x20b5e2,_0x5c7c91);if(_0x1aa740==null){if(_0x4eef1e(0xbd)!=='MqwzJ'){function _0x4d6519(){var _0x568584=_0x4eef1e;this[_0x568584(0xca)][_0x19b8a5]['idleSet']=null;}}else return;}this['animaXParts'][_0x20b5e2]=_0x1aa740,this[_0x4eef1e(0xda)]=!![];}},_0x3420a0[_0x3f588b(0xd4)]=function(_0x3606ae){var _0x7290eb=_0x3f588b;this['animaXParts'][_0x3606ae]=null,delete this[_0x7290eb(0xe4)][_0x3606ae],this[_0x7290eb(0xda)]=!![];},_0x3420a0[_0x3f588b(0xed)]=function(){var _0x2d9198=_0x3f588b;if('qyYxm'!==_0x2d9198(0x101)){function _0x474d60(){return;}}else this[_0x2d9198(0xe4)]={},this[_0x2d9198(0xda)]=!![];},_0x3420a0[_0x3f588b(0xab)]=function(_0x1f9f64,_0xd7360f=![],_0x3aac6f=![]){var _0x3cf615=_0x3f588b,_0x1b3120,_0x115b12;if(!this['isHaveAnimaXActionWithName'](_0x1f9f64))return![];if(this[_0x3cf615(0xd6)](_0x1f9f64)){if(_0x3cf615(0x110)!==_0x3cf615(0xf2))_0x115b12=this[_0x3cf615(0x108)](_0x1f9f64);else{function _0x5709d4(){var _0x1a2bde=_0x3cf615;this['_xAnimaToIdleTimer']++;if(this[_0x1a2bde(0xee)]>=this[_0x1a2bde(0xf4)]())return this[_0x1a2bde(0xb0)]();}}}else _0x1b3120=XAnimaTools['getXAnimaParamsForAction'](_0x1f9f64,this['animXId']()),_0x115b12=this[_0x3cf615(0xc5)](_0x1b3120);if(_0x115b12!=null){if(_0x3cf615(0xc1)!==_0x3cf615(0xcf))return _0x115b12[_0x3cf615(0xde)]=_0x3aac6f,_0x115b12['isLoop']=_0xd7360f,this[_0x3cf615(0xff)](_0x115b12),!![];else{function _0x2387f8(){var _0x1c1270=_0x3cf615;return this[_0x1c1270(0xdb)]=this[_0x1c1270(0xf0)]();}}}return![];};}();}());
})();

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Character.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Character.prototype;
  (function() {    // * Система анимации XAnima и ABS
    // -----------------------------------------------------------------------
    // * Предзагрузить действие
    _.preloadAnimaXAction = function(actionParams, isWaiting) {
      var animaSet;
      if (actionParams == null) {
        return;
      }
      animaSet = this.createAnimaXActionSet(actionParams);
      if (animaSet != null) {
        animaSet.preLoad();
      }
      this._axPreloadedActions[actionParams.name] = animaSet;
    };
    // * Создать AnimaXSet из параметров плагина анимации
    _.createAnimaXActionSet = function(actionParams) {
      var animaSet, name;
      name = actionParams.name;
      animaSet = XAnimaTools.createXAnimaSetForAction(this.animXId(), actionParams);
      animaSet.preLoad();
      return animaSet;
    };
    _.isAnimaXActionIsPreloaded = function(actionName) {
      return this.getPreloadAnimaXActionSet(actionName) != null;
    };
    _.getPreloadAnimaXActionSet = function(actionName) {
      return this._axPreloadedActions[actionName];
    };
    _.refreshAnimaX = function() {
      var animaXProfile;
      animaXProfile = this.getCurrentAnimaXProfile();
      if ((this._currentAnimaXProfile != null) && (animaXProfile == null)) {
        this._currentAnimaXProfile = null;
        if (this.isAnimX()) {
          this.clearAnimaX();
        }
        return;
      }
      if (this._currentAnimaXProfile === animaXProfile) {

      } else {
        this.createNewAnimaXForCharacter(animaXProfile);
      }
    };
    _.createNewAnimaXForCharacter = function(animaXProfile) {
      var animaX;
      animaX = XAnimaTools.getXAnimaParamsForState('base', animaXProfile);
      if (animaX == null) {
        if (String.any(animaXProfile)) {
          console.warn("Can't find Base animation settings for " + animaXProfile);
        }
        return;
      }
      this._currentAnimaXProfile = animaXProfile;
      this.initAnimaX(animaXProfile, animaX);
      this.registerAnimaXActions(animaXProfile);
      this.refreshAnimaXLayers();
    };
    // * Получить профиль анимации (для загрузки)
    _.getCurrentAnimaXProfile = function() {
      return null;
    };
    // * Получить начальный профиль персонажа (без экипировки)
    _.getInitialXProfile = function() {
      return null;
    };
    // * Регистрация действий (названий) и предзагрузка
    _.registerAnimaXActions = function(animaXProfile) {
      var action, actionList, i, len;
      actionList = XAnimaTools.getXAnimaActionList(animaXProfile);
      for (i = 0, len = actionList.length; i < len; i++) {
        action = actionList[i];
        this.registerAnimaXAction(action.name);
        if (this.isAnimaXAADefaultAction(action.name)) {
          this.preloadAnimaXAction(action);
        }
      }
    };
    // * Набор имён стандартных действий (нужны для предзагрузки)
    _.isAnimaXAADefaultAction = function(actionName) {
      return false;
    };
    // * Проверка обновления состояния анимации на Battler
    _._updateAnimXRefresh = function() {
      var b;
      b = this.getBattlerForAnimaX();
      if (b == null) {
        return;
      }
      if (b.isNeedAnimaXRefresh()) {
        this.refreshAnimaX();
        this.refreshAnimaXLayers();
        b.onAnimaXRefresh();
      }
    };
    _.getBattlerForAnimaX = function() {
      return null;
    };
    // * Получить набор экипировки для Анимации
    _._getEquipmentAnimaXSet = function() {
      var b, equipmentXSet;
      b = this.getBattlerForAnimaX();
      if (b == null) {
        return null;
      }
      equipmentXSet = b.getAnimaXEquipmentSet();
      if (equipmentXSet != null) {
        return this.getInitialXProfile() + "_" + equipmentXSet;
      }
      return null;
    };
    // * Обновить слои с учётом экипировки
    return _.refreshAnimaXLayers = function() {
      var actor, e, i, j, k, l, len, len1, len2, ref, ref1, ref2;
      if (!this.isAnimX()) {
        return;
      }
      actor = this.getBattlerForAnimaX();
      if (actor == null) {
        return;
      }
      try {
        ref = actor.axLayersByEquips;
        for (i = 0, len = ref.length; i < len; i++) {
          l = ref[i];
          this.addNewXAnimPart(l, false);
        }
        ref1 = actor.axLayersByEquipsRelative;
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          l = ref1[j];
          this.addNewXAnimPart(l, true);
        }
        ref2 = actor.axPreviousLayers;
        for (k = 0, len2 = ref2.length; k < len2; k++) {
          l = ref2[k];
          this.removeXAnimPart(l);
        }
      } catch (error) {
        e = error;
        console.warn(e);
      }
    };
  })();
  (function() {    // * Действия
    // -----------------------------------------------------------------------
    _.startAnimaXAA_Attack = function() {
      return this.startAnimaXCustomAction('Attack', false, true);
    };
    return _.startAnimaXAA_Defense = function() {
      return this.startAnimaXCustomAction('Defense', true, false);
    };
  })();
})();

// ■ END Game_Character.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_CharacterBase.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_CharacterBase.prototype;
  (function() {    // * Система анимации XAnima
    // -----------------------------------------------------------------------
    
    // * Персонаж использует XAnima
    _.isAnimX = function() {
      return false;
    };
    // * ID набора анимаций
    _.animXId = function() {
      return null;
    };
    // * Когда запускается действие
    _.onAnimaXActionStart = function() {};
    // * Когда действие заканчивается
    _.onAnimaXActionEnd = function() {};
    
    // * Находится ли анимация в действии
    _.isInAnimXAction = function() {
      return false;
    };
    // * Находится ли анимация в действии и необходимо ждать завершения
    _.isAnimXIsBusy = function() {
      return this.isAnimX() && this.isInAnimXAction() && this.isShouldWaitAnimaXAction();
    };
    // * Находится ли анимация в движении (имеется в виду moveSet)
    _.isInMovementAnimaX = function() {
      return false;
    };
    // * Находится ли анимация в Idle
    _.isInIdleAnimaX = function() {
      return false;
    };
    // * Есть ли Idle анимация у текущего состояния
    _.isHaveIdleAnimaX = function() {
      return false;
    };
    // * Есть ли анимация для состояния
    _.isHaveAnimaXState = function() {
      return false;
    };
    // * Есть ли данное действие у текущей XAnima конфигурации
    _.isHaveAnimaXActionWithName = function() {
      return false;
    };
    // * Должен ли ждать завершения действия
    _.isShouldWaitAnimaXAction = function() {
      return false;
    };
    // * Отключить анимацию
    _.clearAnimaX = function() {};
    // * Действие является стандартным (используется для предзагрузки)
    _.isAnimaXAADefaultAction = function(actionName) {
      return false;
    };
    // * Анимация действия была предзагруженна
    _.isAnimaXActionIsPreloaded = function() {
      return false;
    };
    // * Были ли изменены слои (части) анимации?
    _.isAnimXPartsChanged = function() {
      return false;
    };
  })();
})();

// ■ END Game_CharacterBase.coffee
//---------------------------------------------------------------------------
// -----------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Event.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__setupPage, ALIAS__update, _;
  //@[DEFINES]
  _ = Game_Event.prototype;
  //@[ALIAS]
  ALIAS__setupPage = _.setupPage;
  _.setupPage = function() {
    ALIAS__setupPage.call(this);
    this._isHaveAnimaX = false;
    return this.refreshAnimaX();
  };
  
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    if (this.isAnimX()) {
      return this._updateAnimX();
    }
  };
})();

// ■ END Game_Event.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Event.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Event.prototype;
  _.getCurrentAnimaXProfile = function() {
    var animXParameter, list;
    if (this.page() == null) {
      return null;
    }
    list = this.page().list;
    animXParameter = PKD_ANIMAX.getEventCommentValue('XA:', list);
    if (animXParameter != null) {
      return this._parseAnimaXAParameterForEvent(animXParameter);
    }
    return null;
  };
  _._parseAnimaXAParameterForEvent = function(animXParameter) {
    var id, parts;
    if (animXParameter == null) {
      return;
    }
    parts = animXParameter.split(":");
    id = parts[1];
    return id;
  };
})();

// ■ END Game_Event.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Follower.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__refresh, ALIAS__update, _;
  //@[DEFINES]
  _ = Game_Follower.prototype;
  //@[ALIAS]
  ALIAS__refresh = _.refresh;
  _.refresh = function() {
    ALIAS__refresh.call(this);
    return this.refreshAnimaX();
  };
  
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    if (this.isAnimX()) {
      return this._updateAnimX();
    }
  };
})();

// ■ END Game_Follower.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Follower.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Follower.prototype;
  _.getCurrentAnimaXProfile = function() {
    var equipAnimaXSet;
    if (this.isAnimX()) {
      equipAnimaXSet = this._getEquipmentAnimaXSet();
      if (String.any(equipAnimaXSet)) {
        return equipAnimaXSet;
      }
    }
    return this.getInitialXProfile();
  };
  _.getInitialXProfile = function() {
    var actor;
    actor = this.getBattlerForAnimaX();
    if (actor == null) {
      return null;
    }
    return PKD_ANIMAX.getValueFromMeta('xAnima', actor.actor());
  };
  _.getBattlerForAnimaX = function() {
    return this.actor();
  };
})();

// ■ END Game_Follower.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Interpreter.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__updateWaitMode, _;
  //@[DEFINES]
  _ = Game_Interpreter.prototype;
  //@[ALIAS]
  ALIAS__updateWaitMode = _.updateWaitMode;
  _.updateWaitMode = function() {
    if (this._waitMode === 'xAnima') {
      return this._updateXAnimaWait();
    } else {
      return ALIAS__updateWaitMode.call(this);
    }
  };
})();

// ■ END Game_Interpreter.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Interpreter.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Interpreter.prototype;
  _._updateXAnimaWait = function() {
    var waiting;
    waiting = this.xAnimaTarget.isInAnimXAction();
    if (!waiting) {
      this._waitMode = '';
      this.xAnimaTarget = null;
    }
    return waiting;
  };
})();

// ■ END Game_Interpreter.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Party.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__addActor, _;
  //@[DEFINES]
  _ = Game_Party.prototype;
  //@[ALIAS]
  ALIAS__addActor = _.addActor;
  _.addActor = function(actorId) {
    var actor;
    ALIAS__addActor.call(this, actorId);
    // * Чтобы приминялась анимация с оружием (если была)
    if (this._actors.includes(actorId)) { // * Если был добавлен
      actor = $gameActors.actor(actorId);
      if (actor != null) {
        actor.refresh();
      }
    }
  };
})();

// ■ END Game_Party.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Player.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__canMove, ALIAS__refresh, ALIAS__update, _;
  //@[DEFINES]
  _ = Game_Player.prototype;
  //?[ANIMAX_E]
  // * Система анимации XAnima
  // -----------------------------------------------------------------------
  //@[ALIAS]
  ALIAS__refresh = _.refresh;
  _.refresh = function() {
    ALIAS__refresh.call(this);
    return this.refreshAnimaX();
  };
  
  //@[ALIAS]
  ALIAS__canMove = _.canMove;
  _.canMove = function() {
    if (this.isAnimXIsBusy()) {
      // * Дополнительная проверка анимации, т.к. Game_Player перекрывает метод canMove из Character_Base
      return false;
    }
    return ALIAS__canMove.call(this);
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function(sceneActive) {
    ALIAS__update.call(this, sceneActive);
    if (sceneActive) {
      if (this.isAnimX()) {
        return this._updateAnimX();
      }
    }
  };
})();

// ■ END Game_Player.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Player.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Player.prototype;
  //?[ANIMAX_E]
  // * Система анимации XAnima и ABS
  // -----------------------------------------------------------------------
  _.getCurrentAnimaXProfile = function() {
    var equipAnimaXSet;
    if (this.isAnimX()) {
      equipAnimaXSet = this._getEquipmentAnimaXSet();
      if (String.any(equipAnimaXSet)) {
        return equipAnimaXSet;
      }
    }
    return this.getInitialXProfile();
  };
  _.getInitialXProfile = function() {
    if (String.any($gameSystem.lastPlayerAnimaXExternProfile)) {
      return $gameSystem.lastPlayerAnimaXExternProfile;
    } else {
      return PKD_ANIMAX.getValueFromMeta('xAnima', $gameParty.leader().actor());
    }
  };
  _.isAnimaXAADefaultAction = function(actionName) {
    return ['Attack', 'Defense', 'Skill'].contains(actionName);
  };
  _.getBattlerForAnimaX = function() {
    return $gameParty.leader();
  };
  _.setExternalAnimaX = function(name) {
    $gameSystem.lastPlayerAnimaXExternProfile = name;
    return this.refresh();
  };
})();

// ■ END Game_Player.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ ImageManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = ImageManager;
  _.loadAnimaX = function(filename) {
    return this.loadBitmap('img/charactersAA/', filename, 0, false);
  };
})();

// ■ END ImageManager.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Спрайт для анимации слоя (части)
var Sprite_AnimaXPart;

Sprite_AnimaXPart = class Sprite_AnimaXPart extends Sprite {
  constructor(animPart, rootAnimation) {
    super();
    this.animPart = animPart;
    this.animPart.applyRootAnimation(rootAnimation);
    this.visible = !this.animPart.isDisabled();
    this.anchor.x = 0.5;
    this.anchor.y = 1;
    this.isLowerBodyPart = this.animPart.isLowerBodyPart;
  }

  refreshPart(frame, dir) {
    return this.bitmap = this.animPart.getPartBitmap(dir, frame);
  }

};

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Character.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__characterBlockX, ALIAS__characterBlockY, ALIAS__characterPatternX, ALIAS__characterPatternY, ALIAS__isEmptyCharacter, ALIAS__isImageChanged, ALIAS__patternHeight, ALIAS__patternWidth, ALIAS__updateBitmap, ALIAS__updateFrame, ALIAS__updatePosition, ALIAS__updateVisibility, _;
  //@[DEFINES]
  _ = Sprite_Character.prototype;
  //@[ALIAS]
  ALIAS__isEmptyCharacter = _.isEmptyCharacter;
  _.isEmptyCharacter = function() {
    if (this.isAnimX()) {
      return false;
    } else {
      return ALIAS__isEmptyCharacter.call(this);
    }
  };
  //@[ALIAS]
  ALIAS__updateBitmap = _.updateBitmap;
  _.updateBitmap = function() {
    if (this.isAnimX()) {
      this._updateBitmapAnimX();
    } else {
      ALIAS__updateBitmap.call(this);
    }
  };
  //@[ALIAS]
  ALIAS__updateVisibility = _.updateVisibility;
  _.updateVisibility = function() {
    if (this.isAnimX()) {
      return this._updateVisibilityAnimX();
    } else {
      return ALIAS__updateVisibility.call(this);
    }
  };
  
  //@[ALIAS]
  ALIAS__updateFrame = _.updateFrame;
  _.updateFrame = function() {
    ALIAS__updateFrame.call(this);
    if (this.isAnimX()) {
      this._axCntr.update(this._character);
      if (this._animaXParts != null) {
        this._updateAnimaXPartsDepth();
        this._updateAnimaXParts();
      }
    }
  };
  //@[ALIAS]
  ALIAS__updatePosition = _.updatePosition;
  _.updatePosition = function() {
    ALIAS__updatePosition.call(this);
    if (this.isAnimX()) {
      this.x += this._axCntr.rootAnimation.dx;
      this.y += this._axCntr.rootAnimation.dy;
    }
  };
  
  //@[ALIAS]
  ALIAS__isImageChanged = _.isImageChanged;
  _.isImageChanged = function() {
    if (this.isAnimX()) {
      return this._animaXSet !== this._character.getCurrentAnimX();
    } else {
      return ALIAS__isImageChanged.call(this);
    }
  };
  //@[ALIAS]
  ALIAS__patternWidth = _.patternWidth;
  _.patternWidth = function() {
    if (this.isAnimX()) {
      return this.bitmap.width;
    } else {
      return ALIAS__patternWidth.call(this);
    }
  };
  
  //@[ALIAS]
  ALIAS__patternHeight = _.patternHeight;
  _.patternHeight = function() {
    if (this.isAnimX()) {
      return this.bitmap.height;
    } else {
      return ALIAS__patternHeight.call(this);
    }
  };
  
  //@[ALIAS]
  ALIAS__characterBlockX = _.characterBlockX;
  _.characterBlockX = function() {
    if (this.isAnimX()) {
      return 0;
    }
    return ALIAS__characterBlockX.call(this);
  };
  
  //@[ALIAS]
  ALIAS__characterBlockY = _.characterBlockY;
  _.characterBlockY = function() {
    if (this.isAnimX()) {
      return 0;
    }
    return ALIAS__characterBlockY.call(this);
  };
  //@[ALIAS]
  ALIAS__characterPatternX = _.characterPatternX;
  _.characterPatternX = function() {
    if (this.isAnimX()) {
      return 0;
    }
    return ALIAS__characterPatternX.call(this);
  };
  //@[ALIAS]
  ALIAS__characterPatternY = _.characterPatternY;
  _.characterPatternY = function() {
    if (this.isAnimX()) {
      return 0;
    }
    return ALIAS__characterPatternY.call(this);
  };
})();

// ■ END Sprite_Character.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.0
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Character.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Sprite_Character.prototype;
  (function() {    // * Система анимации XAnima
    // -----------------------------------------------------------------------
    _.isAnimX = function() {
      return this._character.isAnimX();
    };
    _._updateVisibilityAnimX = function() {
      if (PKD_ANIMAX.isMV()) {
        Sprite_Base.prototype.updateVisibility.call(this);
      } else {
        Sprite.prototype.updateVisibility.call(this);
      }
      if (this._character.isTransparent()) {
        this.visible = false;
      } else {
        if (this._character instanceof Game_Follower) {
          this.visible = this._character.isVisible();
        }
      }
    };
    _._updateBitmapAnimX = function() {
      if (this.isImageChanged()) {
        this._animaXSet = this._character.getCurrentAnimX();
        this._refreshAnimXSetController();
        this._createAnimaXParts();
      } else if (this.isXAnimPartsChanged()) {
        this._createAnimaXParts();
      }
      if (this._axCntr.isChanged()) {
        this._refreshAnimaXBitmap();
        this._refreshAnimXPartSprites();
      }
    };
    return _._refreshAnimXSetController = function() {
      this._axCntr = new XAnimaSetController(this._character.direction(), this._animaXSet);
      return this._refreshAnimaXBitmap();
    };
  })();
  (function() {    // * Система анимации XAnima - Части (слои)
    // -----------------------------------------------------------------------
    // * Синхронизируем координаты нижнего слоя
    _._updateAnimaXParts = function() {
      this._animaXPartBelow.x = this.x;
      return this._animaXPartBelow.y = this.y;
    };
    // * Чтобы lower и upper body прозрачность была (в кустах)
    _._updateAnimaXPartsDepth = function() {
      var i, j, len, len1, p, ref, ref1;
      // * Не обновлять, если не изменилась прозрачность
      if (this.__lBushDepth === this._bushDepth) {
        return;
      }
      this.__lBushDepth = this._bushDepth;
      if (this._bushDepth > 0) {
        ref = this.__tAnimxParts;
        for (i = 0, len = ref.length; i < len; i++) {
          p = ref[i];
          if (p.isLowerBodyPart === true) {
            p.opacity = 128;
          }
        }
      } else {
        ref1 = this.__tAnimxParts;
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          p = ref1[j];
          p.opacity = 255;
        }
      }
    };
    _.isXAnimPartsChanged = function() {
      if (this.isAnimX()) {
        return this._character.isAnimXPartsChanged();
      } else {
        return false;
      }
    };
    _._refreshAnimXPartSprites = function() {
      var i, len, part, ref;
      if (this._animaXParts == null) {
        return;
      }
      ref = this.__tAnimxParts;
      for (i = 0, len = ref.length; i < len; i++) {
        part = ref[i];
        part.refreshPart(this._axCntr.cFrame, this._axCntr.cDir);
        this._addPartOnSpriteByDirection(part, this._axCntr.cDir);
      }
    };
    _._refreshAnimaXBitmap = function() {
      return this.bitmap = this._axCntr.bitmap();
    };
    _._createAnimaXParts = function() {
      if (this._animaXParts != null) {
        this._destroyAnimaXParts();
      }
      // * Все части которые добавленны
      this.__tAnimxParts = [];
      // * Части над персонажем (стандарт)
      this._animaXParts = new Sprite();
      this._animaXParts.anchor.x = 0.5;
      this._animaXParts.anchor.y = 1;
      // * Части под персонажем
      this._animaXPartBelow = new Sprite();
      this._animaXPartBelow.anchor.x = 0.5;
      this._animaXPartBelow.anchor.y = 1;
      this._animaXPartBelow.z = 1;
      this._addAllAnimaXParts();
      this.addChild(this._animaXParts);
      this.parent.addChild(this._animaXPartBelow);
      this._character.onAnimXPartsRefreshed();
    };
    _._destroyAnimaXParts = function() {
      var i, len, p, ref;
      this._animaXParts.visible = false;
      this._animaXParts.parent.removeChild(this._animaXParts);
      this._animaXParts = null;
      if (this.__tAnimxParts != null) {
        ref = this.__tAnimxParts;
        for (i = 0, len = ref.length; i < len; i++) {
          p = ref[i];
          p.parent.removeChild(p);
          p.visible = false;
        }
        this.__tAnimxParts = null;
      }
      this.__lBushDepth = null;
    };
    _._addAllAnimaXParts = function() {
      var animaXPart, i, id, len, part, partData, parts, unsortedParts;
      parts = this._character.animaXParts;
      // * Преобразование в массив
      unsortedParts = [];
      for (id in parts) {
        partData = parts[id];
        unsortedParts.push(partData);
      }
      // * Сортировка
      unsortedParts.sort(function(a, b) {
        if (a.level > b.level) {
          return 1;
        }
        if (a.level === b.level) {
          return 0;
        }
        return -1;
      });
      for (i = 0, len = unsortedParts.length; i < len; i++) {
        part = unsortedParts[i];
        animaXPart = new Sprite_AnimaXPart(part, this._axCntr.rootAnimation);
        this.__tAnimxParts.push(animaXPart);
        this._addPartOnSpriteByDirection(animaXPart, this._axCntr.cDir);
      }
    };
    // * Добаить часть (слой) на персонажа с учётом "уровня" слоя (за или перед)
    _._addPartOnSpriteByDirection = function(part, dir) {
      var level;
      level = part.animPart.isBelowCharacter(dir);
      if (level === true) {
        this._animaXParts.removeChild(part);
        this._animaXPartBelow.addChild(part);
      } else {
        this._animaXPartBelow.removeChild(part);
        this._animaXParts.addChild(part);
      }
    };
  })();
})();

// ■ END Sprite_Character.coffee
//---------------------------------------------------------------------------
// -----------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Character.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Sprite_Character.prototype;
  (function() {    // * Система анимации XAnima
    // -----------------------------------------------------------------------
    _.isAnimX = function() {
      return this._character.isAnimX();
    };
    _._updateVisibilityAnimX = function() {
      if (PKD_ANIMAX.isMV()) {
        Sprite_Base.prototype.updateVisibility.call(this);
      } else {
        Sprite.prototype.updateVisibility.call(this);
      }
      if (this._character.isTransparent()) {
        this.visible = false;
      } else {
        if (this._character instanceof Game_Follower) {
          this.visible = this._character.isVisible();
        }
      }
    };
    _._updateBitmapAnimX = function() {
      if (this.isImageChanged()) {
        this._animaXSet = this._character.getCurrentAnimX();
        this._refreshAnimXSetController();
        this._createAnimaXParts();
      } else if (this.isXAnimPartsChanged()) {
        this._createAnimaXParts();
      }
      if (this._axCntr.isChanged()) {
        this._refreshAnimaXBitmap();
        this._refreshAnimXPartSprites();
      }
    };
    return _._refreshAnimXSetController = function() {
      this._axCntr = new XAnimaSetController(this._character.direction(), this._animaXSet);
      return this._refreshAnimaXBitmap();
    };
  })();
  (function() {    // * Система анимации XAnima - Части (слои)
    // -----------------------------------------------------------------------
    // * Синхронизируем координаты нижнего слоя
    _._updateAnimaXParts = function() {
      this._animaXPartBelow.x = this.x;
      return this._animaXPartBelow.y = this.y;
    };
    // * Чтобы lower и upper body прозрачность была (в кустах)
    _._updateAnimaXPartsDepth = function() {
      var i, j, len, len1, p, ref, ref1;
      // * Не обновлять, если не изменилась прозрачность
      if (this.__lBushDepth === this._bushDepth) {
        return;
      }
      this.__lBushDepth = this._bushDepth;
      if (this._bushDepth > 0) {
        ref = this.__tAnimxParts;
        for (i = 0, len = ref.length; i < len; i++) {
          p = ref[i];
          if (p.isLowerBodyPart === true) {
            p.opacity = 128;
          }
        }
      } else {
        ref1 = this.__tAnimxParts;
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          p = ref1[j];
          p.opacity = 255;
        }
      }
    };
    _.isXAnimPartsChanged = function() {
      if (this.isAnimX()) {
        return this._character.isAnimXPartsChanged();
      } else {
        return false;
      }
    };
    _._refreshAnimXPartSprites = function() {
      var i, len, part, ref;
      if (this._animaXParts == null) {
        return;
      }
      ref = this.__tAnimxParts;
      for (i = 0, len = ref.length; i < len; i++) {
        part = ref[i];
        part.refreshPart(this._axCntr.cFrame, this._axCntr.cDir);
        this._addPartOnSpriteByDirection(part, this._axCntr.cDir);
      }
    };
    _._refreshAnimaXBitmap = function() {
      return this.bitmap = this._axCntr.bitmap();
    };
    _._createAnimaXParts = function() {
      if (this._animaXParts != null) {
        this._destroyAnimaXParts();
      }
      // * Все части которые добавленны
      this.__tAnimxParts = [];
      // * Части над персонажем (стандарт)
      this._animaXParts = new Sprite();
      this._animaXParts.anchor.x = 0.5;
      this._animaXParts.anchor.y = 1;
      // * Части под персонажем
      this._animaXPartBelow = new Sprite();
      this._animaXPartBelow.anchor.x = 0.5;
      this._animaXPartBelow.anchor.y = 1;
      this._animaXPartBelow.z = 1;
      this._addAllAnimaXParts();
      this.addChild(this._animaXParts);
      this.parent.addChild(this._animaXPartBelow);
      this._character.onAnimXPartsRefreshed();
    };
    _._destroyAnimaXParts = function() {
      var i, len, p, ref;
      this._animaXParts.visible = false;
      this._animaXParts.parent.removeChild(this._animaXParts);
      this._animaXParts = null;
      if (this.__tAnimxParts != null) {
        ref = this.__tAnimxParts;
        for (i = 0, len = ref.length; i < len; i++) {
          p = ref[i];
          p.parent.removeChild(p);
          p.visible = false;
        }
        this.__tAnimxParts = null;
      }
      this.__lBushDepth = null;
    };
    _._addAllAnimaXParts = function() {
      var animaXPart, i, id, len, part, partData, parts, unsortedParts;
      parts = this._character.animaXParts;
      // * Преобразование в массив
      unsortedParts = [];
      for (id in parts) {
        partData = parts[id];
        unsortedParts.push(partData);
      }
      // * Сортировка
      unsortedParts.sort(function(a, b) {
        if (a.level > b.level) {
          return 1;
        }
        if (a.level === b.level) {
          return 0;
        }
        return -1;
      });
      for (i = 0, len = unsortedParts.length; i < len; i++) {
        part = unsortedParts[i];
        animaXPart = new Sprite_AnimaXPart(part, this._axCntr.rootAnimation);
        this.__tAnimxParts.push(animaXPart);
        this._addPartOnSpriteByDirection(animaXPart, this._axCntr.cDir);
      }
    };
    // * Добаить часть (слой) на персонажа с учётом "уровня" слоя (за или перед)
    _._addPartOnSpriteByDirection = function(part, dir) {
      var level;
      level = part.animPart.isBelowCharacter(dir);
      if (level === true) {
        this._animaXParts.removeChild(part);
        this._animaXPartBelow.addChild(part);
      } else {
        this._animaXPartBelow.removeChild(part);
        this._animaXParts.addChild(part);
      }
    };
  })();
})();

// ■ END Sprite_Character.coffee
//---------------------------------------------------------------------------
// -----------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Анимация (одна единица анимации, последовательность кадров)

//* STORABLE - значит класс сохраняется в сохранение (т.е. создаётся на игровом объекте)
//@[STORABLE]
var XAnima;

XAnima = class XAnima {
  constructor(framesCount, fileName) {
    this.framesCount = framesCount;
    this.fileName = fileName;
    this.frames = [];
    this._parseFrames();
  }

  // * Хранит только названия картинок кадров
  _parseFrames() {
    var i, j, ref, results;
    results = [];
    for (i = j = 0, ref = this.framesCount; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
      results.push(this.frames.push(this.fileName + "_" + i));
    }
    return results;
  }

  // * Умножить первый кадр times раз
  expandFirstFrame(times) {
    var i, j, ref, results;
    this.framesCount += times;
    results = [];
    for (i = j = 0, ref = times; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
      results.push(this.frames.splice(1, 0, this.frames[0]));
    }
    return results;
  }

  preLoad() {
    var f, j, len, ref, results;
    ref = this.frames;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      f = ref[j];
      results.push(ImageManager.loadAnimaX(f));
    }
    return results;
  }

  getFrame(index) {
    return ImageManager.loadAnimaX(this.frames[index]);
  }

};

//TODO: Загрузка всех анимаций при запуске игры?

// Generated by CoffeeScript 2.5.1
// * Дополнительный слой анимации

//@[STORABLE]
var XAnimaPart;

XAnimaPart = class XAnimaPart {
  constructor(filename, isLowerBodyPart, level) {
    this.filename = filename;
    this.isLowerBodyPart = isLowerBodyPart;
    this.level = level;
    this.animations = [];
    this.rules = {};
    this.disabledActions = [];
    if (this.isLowerBodyPart == null) {
      this.isLowerBodyPart = false;
    }
    if (this.level == null) {
      this.level = 0;
    }
    // D, L, R, U, DL, DR, UL, UR, noDir
    this.directionsLevels = [false, false, false, false, false, false, false, false, false];
    this._isDisabled = false;
    this.setDefaultRule(true, true);
  }

  isDisabled() {
    return this._isDisabled === true;
  }

  // * Тут задаётся стандартное правило
  setDefaultRule(haveDirs, haveFrames) {
    return this.rules['Basic'] = [haveDirs, haveFrames];
  }

  setRuleForMovement(haveDirs, haveFrames) {
    return this.rules['Move'] = [haveDirs, haveFrames];
  }

  setRuleForIdle(haveDirs, haveFrames) {
    return this.rules['Idle'] = [haveDirs, haveFrames];
  }

  setRuleForAction(actionName, haveDirs, haveFrames, fileName) {
    return this.rules[actionName] = [haveDirs, haveFrames, fileName];
  }

  disableForAction(actionName) {
    return this.disabledActions.push(actionName);
  }

  applyRootAnimation(xAnimaSet) {
    var cFileName, frames, isNoDir, rule, setName;
    setName = xAnimaSet.getActionName();
    if (this.disabledActions.contains(setName)) {
      this._isDisabled = true;
      return;
    } else {
      this._isDisabled = false;
    }
    rule = this.rules[setName];
    if (rule == null) {
      rule = this.rules['Basic'];
      cFileName = this.filename + setName;
    } else {
      if (String.any(rule[2])) {
        cFileName = this.filename + rule[2];
      } else {
        cFileName = this.filename + setName;
      }
    }
    frames = xAnimaSet.frames;
    if (!rule[1]) {
      frames = 1;
    }
    isNoDir = !rule[0];
    return this._setupAnimations(frames, cFileName, isNoDir, xAnimaSet.is8Way, frames === 1);
  }

  _setupAnimations(frames, cFileName, isNoDir, is8way, isNoFrames) {
    this.isOneFrame = isNoFrames;
    this.isNoDirections = isNoDir;
    if (this.isNoDirections === true) {
      this.animations[0] = new XAnima(frames, cFileName);
    } else {
      this.animations[0] = new XAnima(frames, cFileName + "_D");
      this.animations[1] = new XAnima(frames, cFileName + "_L");
      this.animations[2] = new XAnima(frames, cFileName + "_R");
      this.animations[3] = new XAnima(frames, cFileName + "_U");
      if (is8way === true) {
        this.animations[4] = new XAnima(frames, this.filename + "_DL");
        this.animations[5] = new XAnima(frames, this.filename + "_DR");
        this.animations[6] = new XAnima(frames, this.filename + "_UL");
        this.animations[7] = new XAnima(frames, this.filename + "_UR");
      }
      return;
    }
    this.preLoad();
  }

  preLoad() {
    var anim, i, len, ref, results;
    ref = this.animations;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      anim = ref[i];
      results.push(anim.preLoad());
    }
    return results;
  }

  getPartBitmap(dir, frame) {
    if (this.isOneFrame === true) {
      frame = 0;
    }
    return this.getAnimationByDirection(dir).getFrame(frame);
  }

  // * Часть (слой) должна быть под персонажем?
  isBelowCharacter(dir) {
    if (this.isNoDirections === true) {
      // * Отдельная настройка 8 позиция
      return this.directionsLevels[8];
    } else {
      switch (dir) {
        case 8:
          return this.directionsLevels[3];
        case 2:
          return this.directionsLevels[0];
        case 4:
          return this.directionsLevels[1];
        case 6:
          return this.directionsLevels[2];
        case 1: // * DL
          if (this.is8WayAnimation()) {
            return this.animations[4];
          } else {
            return this.animations[1];
          }
          break;
        case 3: // * DR
          if (this.is8WayAnimation()) {
            return this.animations[5];
          } else {
            return this.animations[2];
          }
          break;
        case 7: // * UL
          if (this.is8WayAnimation()) {
            return this.animations[6];
          } else {
            return this.animations[1];
          }
          break;
        case 9: // * UR
          if (this.is8WayAnimation()) {
            return this.animations[7];
          } else {
            return this.animations[2];
          }
      }
      return this.directionsLevels[8];
    }
  }

  getAnimationByDirection(dir) {
    if (this.isNoDirections === true) {
      return this.animations[0];
    }
    switch (dir) {
      case 8:
        return this.animations[3];
      case 2:
        return this.animations[0];
      case 4:
        return this.animations[1];
      case 6:
        return this.animations[2];
      case 1: // * DL
        if (this.is8WayAnimation()) {
          return this.animations[4];
        } else {
          return this.animations[1];
        }
        break;
      case 3: // * DR
        if (this.is8WayAnimation()) {
          return this.animations[5];
        } else {
          return this.animations[2];
        }
        break;
      case 7: // * UL
        if (this.is8WayAnimation()) {
          return this.animations[6];
        } else {
          return this.animations[1];
        }
        break;
      case 9: // * UR
        if (this.is8WayAnimation()) {
          return this.animations[7];
        } else {
          return this.animations[2];
        }
    }
    return this.animations[0];
  }

};

// Generated by CoffeeScript 2.5.1
// * Набор анимаций для всех направлений

//DIRECTIONS:
// 2 - DOWN
// 8 - UP
// 4 - LEFT
// 6 - RIGHT

//TYPE:
// 0 - movement
// 1 - idle
// 2 - action

//@[STORABLE]
var XAnimaSet;

XAnimaSet = class XAnimaSet {
  constructor(type, filename, frames, speed, isNoDirections, is8Way = false) {
    this.type = type;
    this.filename = filename;
    this.frames = frames;
    this.speed = speed;
    this.isNoDirections = isNoDirections;
    this.is8Way = is8Way;
    this._setupAnimations();
    this.isLoop = false;
    this.actionName = "Action";
    this.moveToIdleDelay = 30;
    this.waitActionEnd = true;
  }

  _setupAnimations() {
    this.animations = [];
    if (this.isNoDirections === true) {
      this.animations[0] = new XAnima(this.frames, this.filename);
    } else {
      this.animations[0] = new XAnima(this.frames, this.filename + "_D");
      this.animations[1] = new XAnima(this.frames, this.filename + "_L");
      this.animations[2] = new XAnima(this.frames, this.filename + "_R");
      this.animations[3] = new XAnima(this.frames, this.filename + "_U");
      if (this.is8WayAnimation()) {
        this.animations[4] = new XAnima(this.frames, this.filename + "_DL");
        this.animations[5] = new XAnima(this.frames, this.filename + "_DR");
        this.animations[6] = new XAnima(this.frames, this.filename + "_UL");
        this.animations[7] = new XAnima(this.frames, this.filename + "_UR");
      }
      return;
    }
    this.preLoad();
  }

  setActionName(actionName) {
    this.actionName = actionName;
  }

  // * Имя действия используется частями, чтобы определять правила и анимации нужные
  getActionName() {
    switch (this.type) {
      case 0:
        return "Move";
      case 1:
        return "Idle";
      default:
        return this.actionName;
    }
  }

  preLoad() {
    var anim, i, len, ref, results;
    ref = this.animations;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      anim = ref[i];
      results.push(anim.preLoad());
    }
    return results;
  }

  isNoFrames() {
    return this.frames === 1;
  }

  isWait() {
    return this.waitActionEnd === true;
  }

  expandFirstFrameTimes(times) {
    var anim, i, len, ref;
    ref = this.animations;
    for (i = 0, len = ref.length; i < len; i++) {
      anim = ref[i];
      anim.expandFirstFrame(times);
    }
    return this.frames += times;
  }

  //? Оптимизация заменой метода?
  getAnimationByDirection(dir) {
    if (this.isNoDirections === true) {
      return this.animations[0];
    }
    switch (dir) {
      case 8:
        return this.animations[3];
      case 2:
        return this.animations[0];
      case 4:
        return this.animations[1];
      case 6:
        return this.animations[2];
      case 1: // * DL
        if (this.is8WayAnimation()) {
          return this.animations[4];
        } else {
          return this.animations[1];
        }
        break;
      case 3: // * DR
        if (this.is8WayAnimation()) {
          return this.animations[5];
        } else {
          return this.animations[2];
        }
        break;
      case 7: // * UL
        if (this.is8WayAnimation()) {
          return this.animations[6];
        } else {
          return this.animations[1];
        }
        break;
      case 9: // * UR
        if (this.is8WayAnimation()) {
          return this.animations[7];
        } else {
          return this.animations[2];
        }
    }
    return this.animations[0];
  }

  is8WayAnimation() {
    return this.is8Way === true;
  }

  isMovement() {
    return this.type === 0;
  }

  isAction() {
    return this.type === 2;
  }

  isIdle() {
    return this.type === 1;
  }

};

// Generated by CoffeeScript 2.5.1
// * Контроллер анимации (смена кадров, направлений)
// * rootAnimation - это XAnimaSet
// * Контроллер хранится в Sprite_Character
var XAnimaSetController;

XAnimaSetController = class XAnimaSetController {
  constructor(startDirection, rootAnimation) {
    this.rootAnimation = rootAnimation;
    this.cFrame = 0;
    this.cDir = startDirection;
    this._timer = 0;
    this._sKoef = 0;
    this._requireRefresh = true;
    this._animPlaying = false;
    this._initialFrame = false;
  }

  isPlaying() {
    return this._animPlaying === true;
  }

  // * Класс каждый раз получает character, не хранит
  update(character) {
    this._requireRefresh = false;
    this._updateDirection(character);
    return this._updateFrames(character);
  }

  _updateDirection(character) {
    var cDir;
    if (this.rootAnimation.is8WayAnimation()) {
      cDir = character._diagonalDir;
      if (cDir == null) {
        //console.warn('You try start 8 way diagonal animation, but game not support 8 way movement')
        cDir = character.direction();
      }
      if (cDir === false) {
        cDir = character.direction();
      }
    } else {
      //console.log(cDir)
      cDir = character.direction();
    }
    if (cDir !== this.cDir) {
      this.requestRefresh();
    }
    this.cDir = cDir;
  }

  _updateFrames(character) {
    if (this.rootAnimation.isMovement()) {
      if (!this.rootAnimation.isNoFrames()) { // * IDLE AND ACTION SAME WAY
        return this._updateMovement(character);
      }
    } else {
      return this._updateAction(character);
    }
  }

  _updateMovement(c) {
    if (c.isMoving()) {
      this._sKoef = c.realMoveSpeed();
      this._setInitialFrame(1);
      this._animPlaying = true;
      this._updateTimer(c.isDashing());
      if (this._timer === 0) {
        return this._nextMovementFrame();
      }
    } else {
      this._sKoef = 0;
      this._updateTimer(false);
      if (this._timer === 0) {
        if (this.cFrame !== 0) {
          this.requestRefresh();
        }
        return this.resetAnimation();
      }
    }
  }

  _setInitialFrame(frameIndex) {
    if (this._initialFrame === true) { // * Установка начального кадра
      return;
    }
    this.cFrame = frameIndex;
    this._initialFrame = true;
    this._timer = 0;
    return this.requestRefresh();
  }

  _updateTimer(isFast) {
    this._timer += 1;
    if (isFast) {
      this._timer += 0.5;
    }
    if (this._timer >= this._speed()) {
      return this._timer = 0;
    }
  }

  _speed() {
    return this.rootAnimation.speed - this._sKoef;
  }

  _nextMovementFrame() {
    this.cFrame++;
    if (this.cFrame === this.rootAnimation.frames) {
      this.cFrame = 1; // * Не 0, 0 - когда стоит
    }
    return this.requestRefresh();
  }

  _updateAction(c) {
    if (this._initialFrame === false) {
      this._setInitialFrame(0);
      c.onAnimaXActionStart();
    }
    this._updateTimer(false);
    if (this._timer === 0) {
      return this._nextActionFrame(c);
    }
  }

  _nextActionFrame(c) {
    this._animPlaying = true;
    this.cFrame++;
    if (this.cFrame === this.rootAnimation.frames) {
      this.cFrame = 0;
      if (!this.rootAnimation.isLoop) {
        this.resetAnimation();
        c.onAnimaXActionEnd();
      }
    }
    return this.requestRefresh();
  }

  resetAnimation() {
    this._timer = 0;
    this.cFrame = 0;
    this._animPlaying = false;
    return this._initialFrame = false;
  }

  // * Если спрайт должен отрисовать новый кадр, то запрашиваем refresh
  requestRefresh() {
    return this._requireRefresh = true;
  }

  bitmap() {
    return this.rootAnimation.getAnimationByDirection(this.cDir).getFrame(this.cFrame);
  }

  isChanged() {
    return this._requireRefresh;
  }

};

// Generated by CoffeeScript 2.5.1
// * Менеджер для работы с БД анимаций
var XAnimaTools;

XAnimaTools = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ XAnimaTools.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = XAnimaTools;
  _.animationsDB = function() {
    return PKD_ANIMAX.Animations;
  };
  _.animationPartsDB = function() {
    return PKD_ANIMAX.AnimationParts;
  };
  // * Список всех действий анимации
  _.getXAnimaActionList = function(id) {
    var data;
    data = this.getXAnimaSetById(id);
    if (data == null) {
      return [];
    }
    return data.actions;
  };
  // * Анимация по имени (ID)
  _.getXAnimaSetById = function(id) {
    var data;
    data = this.animationsDB();
    return data != null ? data.find(function(d) {
      return d.id === id;
    }) : void 0;
  };
  // * Настройки анимации для состояния
  _.getXAnimaParamsForState = function(state, id) {
    var data;
    data = this.getXAnimaSetById(id);
    if (data == null) {
      return null;
    }
    return data[state];
  };
  // * Настройки анимации для действия
  _.getXAnimaParamsForAction = function(actionName, setId) {
    var data;
    data = this.getXAnimaActionList(setId);
    return data != null ? data.find(function(a) {
      return a.name === actionName;
    }) : void 0;
  };
  // * Часть анимации (слой) по имени
  _.getXAnimaPartById = function(id) {
    var data;
    data = this.animationPartsDB();
    return data != null ? data.find(function(a) {
      return a.id === id;
    }) : void 0;
  };
  
  // * Конвертировать массив Actions из параметров плагина в более компактный вид
  _.convertActionsFromParameters = function(actions) {
    var action, i, item, len, shrinked;
    shrinked = [];
    for (i = 0, len = actions.length; i < len; i++) {
      action = actions[i];
      item = action.animation;
      item.name = action.name;
      shrinked.push(item);
    }
    return shrinked;
  };
  _.createXAnimaSetForAction = function(id, params) {
    var animaSet, e;
    try {
      animaSet = this._createXAnimaSetFromParams(id, 2, null, params);
      return animaSet;
    } catch (error) {
      e = error;
      console.warn(e);
      return null;
    }
  };
  _.createXAnimaSetForMove = function(id, state, params) {
    var animaSet, e;
    try {
      animaSet = this._createXAnimaSetFromParams(id, 0, state, params);
      return animaSet;
    } catch (error) {
      e = error;
      console.warn(e);
      return null;
    }
  };
  _.createXAnimaSetForIdle = function(id, state, params) {
    var animaSet, e;
    try {
      animaSet = this._createXAnimaSetFromParams(id, 1, state, params);
      return animaSet;
    } catch (error) {
      e = error;
      console.warn(e);
      return null;
    }
  };
  _._createXAnimaSetFromParams = function(id, type, state, params) {
    var animaSet, e, filename, frames, is8Way, isOneDirection, speed;
    try {
      ({frames, speed, isOneDirection, is8Way} = params);
      if (type === 2) { // * Action
        filename = this.createFilenameForAnimaAction(id, params.name);
      } else {
        filename = this.createFilenameForAnimaState(id, state, type);
      }
      animaSet = new XAnimaSet(type, filename, frames, speed, isOneDirection, is8Way);
      animaSet.dx = params.dx || 0;
      animaSet.dy = params.dy || 0;
      if (params.expandFirstFrame > 0) {
        animaSet.expandFirstFrameTimes(params.expandFirstFrame);
      }
      if (type === 2) {
        // * Задать имя действия
        animaSet.setActionName(params.name);
      }
      return animaSet;
    } catch (error) {
      e = error;
      console.warn(e);
      return null;
    }
  };
  _.createFilenameForAnimaState = function(id, state, type) {
    var path;
    path = id + "/";
    if (state !== 'base') {
      path += state + "/";
    }
    if (type === 0) {
      path += "Move";
    } else {
      path += "Idle";
    }
    return path;
  };
  _.createFilenameForAnimaAction = function(id, name) {
    var path;
    path = id + "/Actions/" + name;
    return path;
  };
  _.createFilenameForAnimaPart = function(id, name, isRelative) {
    var path;
    if (isRelative) {
      path = id + "/Layers/" + name + "/";
    } else {
      path = "CommonLayers/" + name + "/";
    }
    return path;
  };
  _.createXAnimaPart = function(id, partName, isRelative = false) {
    var animaPartSet, e, params;
    try {
      params = this.getXAnimaPartById(partName);
      if (params == null) {
        return null;
      }
      animaPartSet = this._createXAnimaPartFromParams(id, partName, params, isRelative);
      return animaPartSet;
    } catch (error) {
      e = error;
      console.warn(e);
      return null;
    }
  };
  // * isRelative - относительно ID анимации, например Harold\Parts\hat
  // * Если isRealtive = false, то будет Parts\hat
  _._createXAnimaPartFromParams = function(axId, partName, params, isRelative = false) {
    var actionRules, animaPart, baseRule, e, filename, i, idleRule, isLowerBodyPart, layerRule, len, moveRule, rule, sortingLevel;
    try {
      ({isLowerBodyPart, sortingLevel, baseRule, moveRule, idleRule, actionRules, layerRule} = params);
      filename = this.createFilenameForAnimaPart(axId, partName, isRelative);
      animaPart = new XAnimaPart(filename, isLowerBodyPart, sortingLevel);
      animaPart.directionsLevels = this._convertLayerRuleToDirectionLevels(layerRule);
      if (baseRule != null) {
        animaPart.setDefaultRule(baseRule.isHaveDirections, baseRule.isHaveFrames);
      }
      if (moveRule != null) {
        animaPart.setRuleForMovement(moveRule.isHaveDirections, moveRule.isHaveFrames);
      }
      if (idleRule != null) {
        animaPart.setRuleForIdle(idleRule.isHaveDirections, idleRule.isHaveFrames);
      }
      try {
        for (i = 0, len = actionRules.length; i < len; i++) {
          rule = actionRules[i];
          if (rule == null) {
            continue;
          }
          if (rule.enabled === false) {
            animaPart.disableForAction(rule.actionName);
          } else {
            animaPart.setRuleForAction(rule.actionName, rule.actionRule.isHaveDirections, rule.actionRule.isHaveFrames, rule.fileName);
          }
        }
      } catch (error) {
        e = error;
        console.warn(e);
      }
      return animaPart;
    } catch (error) {
      e = error;
      console.warn(e);
      return null;
    }
  };
  // * Преобразовать структуру LAnimaXPartDirLevel в массив directionsLevels для слоя
  _._convertLayerRuleToDirectionLevels = function(layerRule) {
    return [layerRule.dirD, layerRule.dirL, layerRule.dirR, layerRule.dirU, layerRule.dirDL, layerRule.dirDR, layerRule.dirUL, layerRule.dirUR, layerRule.noDir];
  };
})();

// ■ END XAnimaTools.coffee
//---------------------------------------------------------------------------

//Compressed by MV Plugin Builder
(function(){var a0_0x5615=['3RaXDyT','63688QFCcYS','_createXAnimaSetFromParams','143ebjlQq','wgpxY','839928IaEMuq','3wvOoMQ','name','createFilenameForAnimaAction','warn','expandFirstFrameTimes','expandFirstFrame','3410370ZivXMa','JkAHT','328799XxIVQc','237815IVFGAv','6289NsqmTt','465275fGzvBR'];var a0_0x1142=function(_0x1448bd,_0xc4100c){_0x1448bd=_0x1448bd-0x17f;var _0x5615fb=a0_0x5615[_0x1448bd];return _0x5615fb;};var a0_0x4bcd8e=a0_0x1142;(function(_0x9b225e,_0x4ee482){var _0x5476c6=a0_0x1142;while(!![]){try{var _0x368eef=parseInt(_0x5476c6(0x18c))*-parseInt(_0x5476c6(0x187))+parseInt(_0x5476c6(0x18f))*parseInt(_0x5476c6(0x186))+-parseInt(_0x5476c6(0x18e))+-parseInt(_0x5476c6(0x188))+-parseInt(_0x5476c6(0x185))*parseInt(_0x5476c6(0x189))+-parseInt(_0x5476c6(0x18a))+parseInt(_0x5476c6(0x183));if(_0x368eef===_0x4ee482)break;else _0x9b225e['push'](_0x9b225e['shift']());}catch(_0x2ebb6b){_0x9b225e['push'](_0x9b225e['shift']());}}}(a0_0x5615,0xd4350),XAnimaTools[a0_0x4bcd8e(0x18b)]=function(_0x370882,_0x1f5714,_0x105514,_0x10173c){var _0x593d75=a0_0x4bcd8e,_0x1c8ade,_0x3cc9cd,_0x18e6bc,_0xdb1d0,_0x46267b,_0x48faae;try{({frames:_0xdb1d0,speed:_0x48faae,isOneDirection:_0x46267b}=_0x10173c);_0x1f5714===0x2?_0x18e6bc=this[_0x593d75(0x17f)](_0x370882,_0x10173c[_0x593d75(0x190)]):_0x18e6bc=this['createFilenameForAnimaState'](_0x370882,_0x105514,_0x1f5714);_0x1c8ade=new XAnimaSet(_0x1f5714,_0x18e6bc,_0xdb1d0,_0x48faae,_0x46267b,![]),_0x1c8ade['dx']=_0x10173c['dx']||0x0,_0x1c8ade['dy']=_0x10173c['dy']||0x0;_0x10173c[_0x593d75(0x182)]>0x0&&_0x1c8ade[_0x593d75(0x181)](_0x10173c[_0x593d75(0x182)]);if(_0x1f5714===0x2){if('LvRXa'===_0x593d75(0x18d)){function _0x409b12(){var _0x5df1b3=_0x593d75;_0x5b1d63[_0x5df1b3(0x181)](_0x903417['expandFirstFrame']);}}else _0x1c8ade['setActionName'](_0x10173c['name']);}return _0x1c8ade;}catch(_0x570292){if(_0x593d75(0x184)!==_0x593d75(0x184)){function _0x5cedc3(){var _0x101f44=_0x593d75;return _0xc6d71a=_0x1af732,_0x2c31dc[_0x101f44(0x180)](_0x36b937),null;}}else return _0x3cc9cd=_0x570292,console['warn'](_0x3cc9cd),null;}});
})();

//Compressed by MV Plugin Builder
(function(){var a0_0x3cf2=['212616GwyjGi','85cAAlQk','call','1221duUcMr','230424RMACbF','animaXParts','addNewXAnimPart','_axAvailableActionsList','prototype','146687uTDrRO','length','2601QHEQjB','entries','698143OsATAs','262121ADxOyM','195XveQkT'];var a0_0x178f=function(_0x1c7f0a,_0x5e9f19){_0x1c7f0a=_0x1c7f0a-0x1d2;var _0x3cf2d4=a0_0x3cf2[_0x1c7f0a];return _0x3cf2d4;};(function(_0x549d30,_0x40f9ce){var _0x35a309=a0_0x178f;while(!![]){try{var _0x574502=parseInt(_0x35a309(0x1d3))*-parseInt(_0x35a309(0x1d7))+-parseInt(_0x35a309(0x1d4))+parseInt(_0x35a309(0x1d8))+parseInt(_0x35a309(0x1dd))+-parseInt(_0x35a309(0x1d2))+parseInt(_0x35a309(0x1df))*-parseInt(_0x35a309(0x1d5))+parseInt(_0x35a309(0x1e1));if(_0x574502===_0x40f9ce)break;else _0x549d30['push'](_0x549d30['shift']());}catch(_0x27848c){_0x549d30['push'](_0x549d30['shift']());}}}(a0_0x3cf2,0x22819),function(){var _0x177ab0=a0_0x178f,_0x38795a,_0x7e7041,_0x5d94cf;_0x5d94cf=Game_Character[_0x177ab0(0x1dc)],_0x7e7041=_0x5d94cf['registerAnimaXAction'],_0x5d94cf['registerAnimaXAction']=function(_0x28d96d){var _0x6164af=_0x177ab0;if(this[_0x6164af(0x1db)][_0x6164af(0x1de)]>=0x3)return;_0x7e7041[_0x6164af(0x1d6)](this,_0x28d96d);},_0x38795a=_0x5d94cf[_0x177ab0(0x1da)],_0x5d94cf[_0x177ab0(0x1da)]=function(_0x283018,_0x4d0fa1){var _0x390f4b=_0x177ab0;if(Object[_0x390f4b(0x1e0)](this[_0x390f4b(0x1d9)])[_0x390f4b(0x1de)]>=0x3)return;_0x38795a[_0x390f4b(0x1d6)](this,_0x283018,_0x4d0fa1);};}());
})();

//Plugin PKD_AnimaX automatic build by PKD PluginBuilder 1.9.2 20.03.2021
