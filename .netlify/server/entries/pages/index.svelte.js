var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  default: () => Routes
});
module.exports = __toCommonJS(stdin_exports);
var import_index_fb0a7752 = require("../../chunks/index-fb0a7752.js");
var import_get = __toESM(require("lodash/get.js"));
var import_sample = __toESM(require("lodash/sample.js"));
var import_has = __toESM(require("lodash/has.js"));
var import_movement_6bb91b26 = require("../../chunks/movement-6bb91b26.js");
var import_howler = require("howler");
var import_get_video_id = __toESM(require("get-video-id"));
var import_slugify = require("slugify");
var import_date_fns = require("date-fns");
var import_keycloak_js = require("keycloak-js");
var import_inRange = require("lodash/inRange.js");
var import_throttle = require("lodash/throttle.js");
var import_client = require("@sanity/client");
var import_block_content_to_html = require("@sanity/block-content-to-html");
var import_image_url = require("@sanity/image-url");
var Room_svelte_svelte_type_style_lang = "";
const css$f = {
  code: ".room.svelte-ib3ibm{position:absolute;top:50%;left:50%;background:#dedcd5}.center-view.svelte-ib3ibm{position:fixed;top:100px;left:20px;padding:5px;background:#f5f4ee;cursor:pointer;font-size:14px;display:none}.center-view.svelte-ib3ibm:hover{background:#221f20;color:#f5f4ee}",
  map: null
};
const Room = (0, import_index_fb0a7752.c)(($$result, $$props, $$bindings, slots) => {
  let $showGrid, $$unsubscribe_showGrid;
  $$unsubscribe_showGrid = (0, import_index_fb0a7752.a)(import_movement_6bb91b26.e, (value) => $showGrid = value);
  (0, import_index_fb0a7752.h)();
  let { room = {} } = $$props;
  let { x = 0 } = $$props;
  let { y = 0 } = $$props;
  let roomElement = {};
  let inlineStyles = "";
  const centerViewOnPlayer = (x2, y2) => {
    inlineStyles = `${room.inlineStyles} transform: translateX(-${x2 * import_movement_6bb91b26.G}px) translateY(-${y2 * import_movement_6bb91b26.G}px);`;
  };
  if ($$props.room === void 0 && $$bindings.room && room !== void 0)
    $$bindings.room(room);
  if ($$props.x === void 0 && $$bindings.x && x !== void 0)
    $$bindings.x(x);
  if ($$props.y === void 0 && $$bindings.y && y !== void 0)
    $$bindings.y(y);
  $$result.css.add(css$f);
  {
    {
      centerViewOnPlayer(x, y);
    }
  }
  inlineStyles = `${room.inlineStyles} transform: translateX(-50%) translateY(-50%);`;
  $$unsubscribe_showGrid();
  return `

<div class="${"room svelte-ib3ibm"}" id="${"room"}"${(0, import_index_fb0a7752.f)("style", inlineStyles, 0)}${(0, import_index_fb0a7752.f)("this", roomElement, 0)}>${$showGrid ? `` : ``}
  ${slots.default ? slots.default({}) : ``}</div>

<div class="${"center-view svelte-ib3ibm"}">CENTER VIEW (DEBUG)</div>`;
});
var Avatar_svelte_svelte_type_style_lang = "";
const css$e = {
  code: ".avatar.svelte-zqf5vo.svelte-zqf5vo{height:32px;width:32px;position:absolute;top:0;left:0;z-index:100;background:#dedcd5}.avatar.svelte-zqf5vo img.svelte-zqf5vo{width:100%;height:100%;image-rendering:pixelated}.avatar.self.svelte-zqf5vo.svelte-zqf5vo{z-index:100000}",
  map: null
};
const Avatar = (0, import_index_fb0a7752.c)(($$result, $$props, $$bindings, slots) => {
  let $chatMessages, $$unsubscribe_chatMessages;
  $$unsubscribe_chatMessages = (0, import_index_fb0a7752.a)(import_movement_6bb91b26.f, (value) => $chatMessages = value);
  let chatPopUp = {};
  let chatTimeOut = {};
  const showMessage = (msg) => {
    if (chatPopUp.popper) {
      chatPopUp.hide();
      chatPopUp.destroy();
      clearTimeout(chatTimeOut);
    }
    if (avatarEl && avatarEl.nodeName) {
      chatPopUp = tippy(avatarEl, {
        content: msg.text,
        arrow: false,
        offset: [0, 5],
        sticky: true,
        animation: "fade",
        inertia: true,
        theme: "chat",
        popperOptions: {
          modifiers: [
            { name: "flip", enabled: false },
            { name: "preventOverflow", enabled: false }
          ]
        }
      });
      chatPopUp.show();
      chatTimeOut = setTimeout(() => {
        chatPopUp.hide();
        setTimeout(() => {
          chatPopUp.destroy();
        }, 500);
      }, 4e3);
    }
  };
  let { player = {} } = $$props;
  let { avatars = [] } = $$props;
  let { key = "" } = $$props;
  let avatarEl = {};
  let avatar = avatars.find((a) => a._id === player.shape);
  let gridPosY = player.y * import_movement_6bb91b26.G;
  let gridPosX = player.x * import_movement_6bb91b26.G;
  if ($$props.player === void 0 && $$bindings.player && player !== void 0)
    $$bindings.player(player);
  if ($$props.avatars === void 0 && $$bindings.avatars && avatars !== void 0)
    $$bindings.avatars(avatars);
  if ($$props.key === void 0 && $$bindings.key && key !== void 0)
    $$bindings.key(key);
  $$result.css.add(css$e);
  {
    {
      let lastMessage = $chatMessages[$chatMessages.length - 1];
      if (lastMessage && lastMessage.uuid == key && Date.now() - lastMessage.timestamp < 5e3) {
        showMessage(lastMessage);
      }
    }
  }
  {
    {
      gridPosY = player.y * import_movement_6bb91b26.G;
      gridPosX = player.x * import_movement_6bb91b26.G;
    }
  }
  $$unsubscribe_chatMessages();
  return `<div class="${["avatar svelte-zqf5vo", player.self ? "self" : ""].join(" ").trim()}"${(0, import_index_fb0a7752.f)("id", key, 0)}${(0, import_index_fb0a7752.f)("alt", player.name, 0)}${(0, import_index_fb0a7752.f)("style", "transform: translateY(" + gridPosY + "px) translateX(" + gridPosX + "px)", 0)}${(0, import_index_fb0a7752.f)("this", avatarEl, 0)}><img${(0, import_index_fb0a7752.f)("src", avatar && avatar.imageUrl ? avatar.imageUrl : (0, import_sample.default)(avatars).imageUrl, 0)} class="${"svelte-zqf5vo"}">
</div>`;
});
const Players = (0, import_index_fb0a7752.c)(($$result, $$props, $$bindings, slots) => {
  let { players: players2 = {} } = $$props;
  let { currentRoomId = "" } = $$props;
  let { avatars = [] } = $$props;
  if ($$props.players === void 0 && $$bindings.players && players2 !== void 0)
    $$bindings.players(players2);
  if ($$props.currentRoomId === void 0 && $$bindings.currentRoomId && currentRoomId !== void 0)
    $$bindings.currentRoomId(currentRoomId);
  if ($$props.avatars === void 0 && $$bindings.avatars && avatars !== void 0)
    $$bindings.avatars(avatars);
  return `${(0, import_index_fb0a7752.b)(Object.entries(players2), ([key, player]) => {
    return `${player.room === currentRoomId && !player.inTransit ? `${(0, import_index_fb0a7752.v)(Avatar, "Avatar").$$render($$result, { player, key, avatars }, {}, {})}` : ``}`;
  })}`;
});
var Object_svelte_svelte_type_style_lang = "";
const css$d = {
  code: ".object.svelte-rtn8vc.svelte-rtn8vc{height:32px;width:32px;overflow:hidden;position:absolute;top:0;left:0;background:#dedcd5}.object.svelte-rtn8vc img.svelte-rtn8vc{height:100%;width:100%;object-fit:cover;image-rendering:pixelated}.object.static.svelte-rtn8vc.svelte-rtn8vc{pointer-events:none;cursor:default}",
  map: null
};
const Object$1 = (0, import_index_fb0a7752.c)(($$result, $$props, $$bindings, slots) => {
  let $showLabels, $$unsubscribe_showLabels;
  $$unsubscribe_showLabels = (0, import_index_fb0a7752.a)(import_movement_6bb91b26.s, (value) => $showLabels = value);
  let { object = {} } = $$props;
  let objectEl = {};
  let label = {};
  let gridPosY = object.y * import_movement_6bb91b26.G;
  let gridPosX = object.x * import_movement_6bb91b26.G;
  let gridWidth = (0, import_get.default)(object, "dimensions.width", 1) * import_movement_6bb91b26.G;
  let gridHeight = (0, import_get.default)(object, "dimensions.height", 1) * import_movement_6bb91b26.G;
  const inlineStyles = `transform: translateY(${gridPosY}px) translateX(${gridPosX}px); width: ${gridWidth}px; height: ${gridHeight}px;`;
  if ($$props.object === void 0 && $$bindings.object && object !== void 0)
    $$bindings.object(object);
  $$result.css.add(css$d);
  {
    {
      if (label.popper) {
        if ($showLabels) {
          label.show();
        } else {
          label.hide();
        }
      }
    }
  }
  $$unsubscribe_showLabels();
  return `<div class="${[
    "object svelte-rtn8vc",
    (object.static ? "static" : "") + " " + (object.iconImage ? "image" : "")
  ].join(" ").trim()}"${(0, import_index_fb0a7752.f)("id", object._id, 0)}${(0, import_index_fb0a7752.f)("alt", object.title, 0)}${(0, import_index_fb0a7752.f)("style", inlineStyles, 0)}${(0, import_index_fb0a7752.f)("this", objectEl, 0)}>${object.iconImage ? `<img${(0, import_index_fb0a7752.f)("src", (0, import_movement_6bb91b26.g)(object.iconImage).quality(100).height(300).url(), 0)} class="${"svelte-rtn8vc"}">` : ``}
</div>`;
});
const Objects = (0, import_index_fb0a7752.c)(($$result, $$props, $$bindings, slots) => {
  let { objects = {} } = $$props;
  if ($$props.objects === void 0 && $$bindings.objects && objects !== void 0)
    $$bindings.objects(objects);
  return `${(0, import_index_fb0a7752.b)(objects, (object) => {
    return `${(0, import_index_fb0a7752.v)(Object$1, "Object").$$render($$result, { object }, {}, {})}`;
  })}`;
});
var Zone_svelte_svelte_type_style_lang = "";
const css$c = {
  code: ".zone.svelte-1sqo6n0{height:32px;width:32px;position:absolute;top:0;left:0;cursor:pointer;transition:opacity 0.5s cubic-bezier(0.23, 1, 0.32, 1);pointer-events:none}.zone.svelte-1sqo6n0:hover{background:transparent}",
  map: null
};
const Zone = (0, import_index_fb0a7752.c)(($$result, $$props, $$bindings, slots) => {
  let $showLabels, $$unsubscribe_showLabels;
  $$unsubscribe_showLabels = (0, import_index_fb0a7752.a)(import_movement_6bb91b26.s, (value) => $showLabels = value);
  let { zone = {} } = $$props;
  let zoneEl = {};
  let label = {};
  let gridPosY = zone.y * import_movement_6bb91b26.G;
  let gridPosX = zone.x * import_movement_6bb91b26.G;
  let gridWidth = (0, import_get.default)(zone, "dimensions.width", 1) * import_movement_6bb91b26.G;
  let gridHeight = (0, import_get.default)(zone, "dimensions.height", 1) * import_movement_6bb91b26.G;
  const inlineStyles = `transform: translateY(${gridPosY}px) translateX(${gridPosX}px); width: ${gridWidth}px; height: ${gridHeight}px;};`;
  if ($$props.zone === void 0 && $$bindings.zone && zone !== void 0)
    $$bindings.zone(zone);
  $$result.css.add(css$c);
  {
    {
      if (label.popper) {
        if ($showLabels) {
          label.show();
        } else {
          label.hide();
        }
      }
    }
  }
  $$unsubscribe_showLabels();
  return `<div class="${"zone svelte-1sqo6n0"}"${(0, import_index_fb0a7752.f)("id", zone._id, 0)}${(0, import_index_fb0a7752.f)("alt", zone.title, 0)}${(0, import_index_fb0a7752.f)("style", inlineStyles, 0)}${(0, import_index_fb0a7752.f)("this", zoneEl, 0)}>${zone.backgroundImage ? `<img${(0, import_index_fb0a7752.f)("src", (0, import_movement_6bb91b26.g)(zone.backgroundImage).quality(100).url(), 0)}>` : ``}
</div>`;
});
const Zones = (0, import_index_fb0a7752.c)(($$result, $$props, $$bindings, slots) => {
  let { zones = {} } = $$props;
  if ($$props.zones === void 0 && $$bindings.zones && zones !== void 0)
    $$bindings.zones(zones);
  return `${(0, import_index_fb0a7752.b)(zones, (zone) => {
    return `${(0, import_index_fb0a7752.v)(Zone, "Zone").$$render($$result, { zone }, {}, {})}`;
  })}`;
});
const AmbientAudio = (0, import_index_fb0a7752.c)(($$result, $$props, $$bindings, slots) => {
  let { soundFile = false } = $$props;
  let audioURL = false;
  let audioPlayer = {};
  const destroySound = () => {
    if (audioPlayer && audioPlayer.playing) {
      audioPlayer.stop();
      audioPlayer.unload();
      audioPlayer = {};
    }
  };
  (0, import_index_fb0a7752.o)(async () => {
    destroySound();
  });
  if ($$props.soundFile === void 0 && $$bindings.soundFile && soundFile !== void 0)
    $$bindings.soundFile(soundFile);
  {
    {
      if (soundFile) {
        audioURL = "https://cdn.sanity.io/files/58ueii0w/production/" + (0, import_get.default)(soundFile, "asset._ref", "").replace("file-", "").replace("-mp3", ".mp3");
        destroySound();
        audioPlayer = new import_howler.Howl({
          src: [audioURL],
          loop: true,
          autoplay: true
        });
      }
    }
  }
  return ``;
});
var Portal_svelte_svelte_type_style_lang = "";
const css$b = {
  code: ".portal.svelte-1ulo7kp{height:32px;width:32px;position:absolute;top:0;left:0;cursor:pointer;transition:opacity 0.5s cubic-bezier(0.23, 1, 0.32, 1);pointer-events:none;background-size:contain;background-repeat:no-repeat;background-color:#dedcd5}",
  map: null
};
const Portal = (0, import_index_fb0a7752.c)(($$result, $$props, $$bindings, slots) => {
  let $showLabels, $$unsubscribe_showLabels;
  $$unsubscribe_showLabels = (0, import_index_fb0a7752.a)(import_movement_6bb91b26.s, (value) => $showLabels = value);
  let { portal = {} } = $$props;
  let portalEl = {};
  let label = {};
  let gridPosY = portal.y * import_movement_6bb91b26.G;
  let gridPosX = portal.x * import_movement_6bb91b26.G;
  const inlineStyles = `transform: translateY(${gridPosY}px) translateX(${gridPosX}px); width: ${import_movement_6bb91b26.G}px; height: ${import_movement_6bb91b26.G}px; background-color: ${(0, import_get.default)(portal, "backgroundColor.hex", "")}; background-image: url("${(0, import_get.default)(portal, "bgImageUrl", "")}");"`;
  if ($$props.portal === void 0 && $$bindings.portal && portal !== void 0)
    $$bindings.portal(portal);
  $$result.css.add(css$b);
  {
    {
      if (label.popper) {
        if ($showLabels) {
          label.show();
        } else {
          label.hide();
        }
      }
    }
  }
  $$unsubscribe_showLabels();
  return `<div class="${"portal svelte-1ulo7kp"}"${(0, import_index_fb0a7752.f)("id", portal._id, 0)}${(0, import_index_fb0a7752.f)("alt", portal.title, 0)}${(0, import_index_fb0a7752.f)("style", inlineStyles, 0)}${(0, import_index_fb0a7752.f)("this", portalEl, 0)}>${portal.iconImage ? `<img${(0, import_index_fb0a7752.f)("src", (0, import_movement_6bb91b26.g)(portal.iconImage).quality(100).height(100).url(), 0)}>` : ``}
</div>`;
});
const Portals = (0, import_index_fb0a7752.c)(($$result, $$props, $$bindings, slots) => {
  let { portals = {} } = $$props;
  if ($$props.portals === void 0 && $$bindings.portals && portals !== void 0)
    $$bindings.portals(portals);
  return `${(0, import_index_fb0a7752.b)(portals, (portal) => {
    return `${(0, import_index_fb0a7752.v)(Portal, "Portal").$$render($$result, { portal }, {}, {})}`;
  })}`;
});
var StreamPlayer_svelte_svelte_type_style_lang = "";
const css$a = {
  code: ".stream-container.svelte-ldmhir.svelte-ldmhir{position:absolute;top:40px;left:80px;width:380px;border:1px solid #f5f4ee;z-index:10000}.stream-container.svelte-ldmhir .embed.svelte-ldmhir{width:100%;background:black;display:flex;justify-content:center;align-items:center}.stream-container.svelte-ldmhir .embed .peertube-container.svelte-ldmhir,.stream-container.svelte-ldmhir .embed .youtube-container.svelte-ldmhir,.stream-container.svelte-ldmhir .embed .vimeo-container.svelte-ldmhir{position:relative;padding-bottom:56.25%;height:0;overflow:hidden;width:720px}.stream-container.svelte-ldmhir .embed .peertube-container iframe.svelte-ldmhir,.stream-container.svelte-ldmhir .embed .youtube-container iframe.svelte-ldmhir,.stream-container.svelte-ldmhir .embed .vimeo-container iframe.svelte-ldmhir{position:absolute;top:0;left:0;width:100%;height:100%;border:0}",
  map: null
};
const StreamPlayer = (0, import_index_fb0a7752.c)(($$result, $$props, $$bindings, slots) => {
  let { streamUrl = "" } = $$props;
  if ($$props.streamUrl === void 0 && $$bindings.streamUrl && streamUrl !== void 0)
    $$bindings.streamUrl(streamUrl);
  $$result.css.add(css$a);
  return `<div class="${"stream-container svelte-ldmhir"}"><div class="${"embed svelte-ldmhir"}">${streamUrl.includes("youtube") || streamUrl.includes("youtu.be") ? `<div class="${"youtube-container svelte-ldmhir"}"><iframe width="${"1920"}" height="${"1280"}"${(0, import_index_fb0a7752.f)("src", "https://www.youtube.com/embed/" + (0, import_get_video_id.default)(streamUrl).id + "?autoplay=1&rel=0&color=white", 0)} frameborder="${"no"}" allow="${"autoplay; fullscreen"}" allowfullscreen class="${"svelte-ldmhir"}"></iframe></div>` : `${streamUrl.includes("vimeo") ? `<div class="${"vimeo-container svelte-ldmhir"}"><iframe width="${"720"}" height="${"480"}"${(0, import_index_fb0a7752.f)("src", "https://player.vimeo.com/video/" + (0, import_get_video_id.default)(streamUrl).id + "?autoplay=1", 0)} frameborder="${"no"}" scrolling="${"no"}" byline="${"false"}" color="${"#ffffff"}" allow="${"autoplay; fullscreen"}" allowfullscreen class="${"svelte-ldmhir"}"></iframe></div>` : `${streamUrl.includes("undersco.re") ? `<div class="${"peertube-container svelte-ldmhir"}"><iframe width="${"720"}" height="${"480"}"${(0, import_index_fb0a7752.f)("src", streamUrl, 0)} frameborder="${"no"}" color="${"#ffffff"}" allow="${"autoplay; fullscreen"}" sandbox="${"allow-same-origin allow-scripts allow-popups"}" allowfullscreen class="${"svelte-ldmhir"}"></iframe></div>` : ``}`}`}</div>
</div>`;
});
var VideoPlayer_svelte_svelte_type_style_lang = "";
const css$9 = {
  code: ".stream-container.svelte-174tb22.svelte-174tb22{width:720px}.stream-container.svelte-174tb22 .embed.svelte-174tb22{width:100%;background:black;display:flex;justify-content:center;align-items:center}.stream-container.svelte-174tb22 .embed .peertube-container.svelte-174tb22,.stream-container.svelte-174tb22 .embed .youtube-container.svelte-174tb22,.stream-container.svelte-174tb22 .embed .vimeo-container.svelte-174tb22{position:relative;padding-bottom:56.25%;height:0;overflow:hidden;width:720px}.stream-container.svelte-174tb22 .embed .peertube-container iframe.svelte-174tb22,.stream-container.svelte-174tb22 .embed .youtube-container iframe.svelte-174tb22,.stream-container.svelte-174tb22 .embed .vimeo-container iframe.svelte-174tb22{position:absolute;top:0;left:0;width:100%;height:100%;border:0}",
  map: null
};
const VideoPlayer = (0, import_index_fb0a7752.c)(($$result, $$props, $$bindings, slots) => {
  let { streamUrl = "" } = $$props;
  if ($$props.streamUrl === void 0 && $$bindings.streamUrl && streamUrl !== void 0)
    $$bindings.streamUrl(streamUrl);
  $$result.css.add(css$9);
  return `<div class="${"stream-container svelte-174tb22"}"><div class="${"embed svelte-174tb22"}">${streamUrl.includes("youtube") || streamUrl.includes("youtu.be") ? `<div class="${"youtube-container svelte-174tb22"}"><iframe width="${"1920"}" height="${"1280"}"${(0, import_index_fb0a7752.f)("src", "https://www.youtube.com/embed/" + (0, import_get_video_id.default)(streamUrl).id + "?rel=0&color=white", 0)} frameborder="${"no"}" allow="${"autoplay; fullscreen"}" allowfullscreen class="${"svelte-174tb22"}"></iframe></div>` : `${streamUrl.includes("vimeo") ? `<div class="${"vimeo-container svelte-174tb22"}"><iframe width="${"720"}" height="${"480"}"${(0, import_index_fb0a7752.f)("src", "https://player.vimeo.com/video/" + (0, import_get_video_id.default)(streamUrl).id, 0)} frameborder="${"no"}" scrolling="${"no"}" byline="${"false"}" color="${"#ffffff"}" allow="${"autoplay; fullscreen"}" allowfullscreen class="${"svelte-174tb22"}"></iframe></div>` : `${streamUrl.includes("undersco.re") ? `<div class="${"peertube-container svelte-174tb22"}"><iframe width="${"720"}" height="${"480"}"${(0, import_index_fb0a7752.f)("src", streamUrl, 0)} frameborder="${"no"}" color="${"#ffffff"}" allow="${"autoplay; fullscreen"}" sandbox="${"allow-same-origin allow-scripts allow-popups"}" allowfullscreen class="${"svelte-174tb22"}"></iframe></div>` : ``}`}`}</div></div>



`;
});
var bulletinBoardEvent_svelte_svelte_type_style_lang = "";
const css$8 = {
  code: ".event.svelte-1unfe15.svelte-1unfe15{display:flex;margin-bottom:20px;min-height:200px}.event.svelte-1unfe15 .image-container.svelte-1unfe15{width:50%}.event.svelte-1unfe15 .image-container img.svelte-1unfe15{max-width:100%}.event.svelte-1unfe15 .text-container.svelte-1unfe15{padding-left:10px;width:50%}.event.svelte-1unfe15 .text-container .date.svelte-1unfe15{background:#221f20;color:#f5f4ee;margin-bottom:1em;display:inline-block}.event.svelte-1unfe15 .text-container .title.svelte-1unfe15{margin-bottom:1em}",
  map: null
};
const Bulletin_board_event = (0, import_index_fb0a7752.c)(($$result, $$props, $$bindings, slots) => {
  let { event = {} } = $$props;
  if ($$props.event === void 0 && $$bindings.event && event !== void 0)
    $$bindings.event(event);
  $$result.css.add(css$8);
  return `<div class="${"event svelte-1unfe15"}">${``}
</div>`;
});
var ArticleBox_svelte_svelte_type_style_lang = "";
const css$7 = {
  code: ".return-button.svelte-1ncn684.svelte-1ncn684{position:fixed;top:40px;left:20px;background:#f5f4ee;color:#221f20;padding:5px;font-size:12px;z-index:100000;cursor:pointer}.viewer-count.svelte-1ncn684.svelte-1ncn684{position:absolute;top:60px;left:50%;transform:translateX(-50%);color:#f5f4ee;font-size:12px;z-index:100000}.article.svelte-1ncn684.svelte-1ncn684{position:fixed;top:0;left:0;width:100%;height:100%;background:#221f20;z-index:10000;display:flex;padding-top:60px;padding-bottom:80px;justify-content:center;transition:transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)}.article.svelte-1ncn684 .inner.svelte-1ncn684{background:#dedcd5;color:#221f20;width:800px;max-width:90%;z-index:10000;padding:20px;overflow-y:scroll;font-size:14px}.article.pushed.svelte-1ncn684.svelte-1ncn684{transform:translateY(240px)}.article img{max-width:100%}.video.svelte-1ncn684.svelte-1ncn684{position:fixed;top:0;left:0;width:100%;height:100%;background:#221f20;z-index:10000;display:flex;padding-top:60px;padding-bottom:60px;justify-content:center;align-items:center;transition:transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)}.video.pushed.svelte-1ncn684.svelte-1ncn684{transform:translateY(240px)}.info-text.svelte-1ncn684.svelte-1ncn684{position:fixed;bottom:20px;left:20px;background:#221f20;z-index:10000;display:flex;padding:10px;font-size:14px;color:#f5f4ee;border:1px solid #f5f4ee}.bulletin-board.svelte-1ncn684.svelte-1ncn684{position:fixed;top:0;left:0;width:100%;height:100%;background:#221f20;z-index:10000;display:flex;padding-top:60px;padding-bottom:80px;justify-content:center;transition:transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)}.bulletin-board.svelte-1ncn684 .inner.svelte-1ncn684{background:#dedcd5;color:#221f20;width:800px;max-width:90%;z-index:10000;padding:20px;overflow-y:scroll;font-size:14px}.bulletin-board.svelte-1ncn684 .inner .bulletin-board-actions .action.svelte-1ncn684{padding:10px;border:1px solid #221f20;display:inline-block}.bulletin-board.svelte-1ncn684 .inner .bulletin-board-actions.svelte-1ncn684{margin-top:20px;margin-bottom:20px;display:inline-block}.bulletin-board.pushed.svelte-1ncn684.svelte-1ncn684{transform:translateY(240px)}",
  map: null
};
const ArticleBox = (0, import_index_fb0a7752.c)(($$result, $$props, $$bindings, slots) => {
  let $players, $$unsubscribe_players;
  let $trayOpen, $$unsubscribe_trayOpen;
  $$unsubscribe_players = (0, import_index_fb0a7752.a)(import_movement_6bb91b26.h, (value) => $players = value);
  $$unsubscribe_trayOpen = (0, import_index_fb0a7752.a)(import_movement_6bb91b26.t, (value) => $trayOpen = value);
  let { article = {} } = $$props;
  let viewCount = 0;
  let viewCountText = "";
  (0, import_index_fb0a7752.o)(async () => {
    (0, import_movement_6bb91b26.j)();
  });
  if ($$props.article === void 0 && $$bindings.article && article !== void 0)
    $$bindings.article(article);
  $$result.css.add(css$7);
  {
    {
      viewCount = 0;
      for (const [key, value] of Object.entries($players)) {
        if (value.viewing === article._id) {
          viewCount++;
        }
      }
    }
  }
  viewCountText = viewCount === 1 ? "You are the only one here." : `${viewCount} people are here.`;
  $$unsubscribe_players();
  $$unsubscribe_trayOpen();
  return `${article.contentType === "video" ? `<div class="${"viewer-count svelte-1ncn684"}">${(0, import_index_fb0a7752.e)(viewCountText)}</div>` : ``}

<div class="${"return-button svelte-1ncn684"}">Return
</div>

${article.contentType === "video" ? `<div class="${["video svelte-1ncn684", $trayOpen ? "pushed" : ""].join(" ").trim()}">${(0, import_index_fb0a7752.v)(VideoPlayer, "VideoPlayer").$$render($$result, { streamUrl: article.videoUrl }, {}, {})}</div>` : `${article.contentType === "text" ? `${(0, import_has.default)(article, "content.content") ? `<div class="${["article svelte-1ncn684", $trayOpen ? "pushed" : ""].join(" ").trim()}"><div class="${"inner svelte-1ncn684"}">${(0, import_index_fb0a7752.v)(import_movement_6bb91b26.B, "Blocks").$$render($$result, { blocks: article.content.content }, {}, {})}</div></div>` : ``}` : `${article.contentType === "importedPost" ? `<div class="${["article svelte-1ncn684", $trayOpen ? "pushed" : ""].join(" ").trim()}"><div class="${"inner svelte-1ncn684"}">${``}</div></div>` : `${article.isBulletinBoard ? `<div class="${["bulletin-board svelte-1ncn684", $trayOpen ? "pushed" : ""].join(" ").trim()}"><div class="${"inner svelte-1ncn684"}"><h1>Welcome to the Bulletin Board</h1>
      <div class="${"bulletin-board-actions svelte-1ncn684"}"><div class="${"action svelte-1ncn684"}">Subscribe to Calendar</div></div>
      <div class="${"bulletin-board-events"}">${(0, import_index_fb0a7752.b)(article.events, (event) => {
    return `${(0, import_index_fb0a7752.v)(Bulletin_board_event, "BulletinBoardEvent").$$render($$result, { event }, {}, {})}`;
  })}</div></div></div>` : ``}`}`}`}

${article.infoText ? `<div class="${"info-text svelte-1ncn684"}">${(0, import_index_fb0a7752.e)(article.infoText)}</div>` : ``}`;
});
var RoomDialog_svelte_svelte_type_style_lang = "";
const css$6 = {
  code: ".room-dialog-box.svelte-pi72xu.svelte-pi72xu{position:fixed;bottom:20px;left:20px;padding:15px;background:#e8eae6;color:#221f20;border:1px solid #221f20;z-index:1000;user-select:none}.choice.svelte-pi72xu.svelte-pi72xu{display:flex;cursor:pointer;outline-color:#221f20;outline-width:1px}.choice.svelte-pi72xu .marker.svelte-pi72xu{opacity:0;width:1em;text-align:center}.choice.svelte-pi72xu:hover .marker.svelte-pi72xu,.choice.svelte-pi72xu:focus .marker.svelte-pi72xu{opacity:1}",
  map: null
};
const RoomDialog = (0, import_index_fb0a7752.c)(($$result, $$props, $$bindings, slots) => {
  (0, import_index_fb0a7752.h)();
  let { text = "" } = $$props;
  let { roomId = "" } = $$props;
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  if ($$props.roomId === void 0 && $$bindings.roomId && roomId !== void 0)
    $$bindings.roomId(roomId);
  $$result.css.add(css$6);
  return `<div class="${"room-dialog-box svelte-pi72xu"}"><div>${(0, import_index_fb0a7752.e)(text)}</div>
  <div class="${"multiple-choice"}"><div class="${"choice svelte-pi72xu"}" tabindex="${"0"}" autofocus><div class="${"marker svelte-pi72xu"}">\u25B8</div>
      Yes
    </div>
    <div class="${"choice svelte-pi72xu"}" tabindex="${"0"}"><div class="${"marker svelte-pi72xu"}">\u25B8</div>
      No
    </div></div>
</div>`;
});
var RoomEntryBox_svelte_svelte_type_style_lang = "";
const css$5 = {
  code: ".caption-container.svelte-ukizaq{position:fixed;bottom:20px;left:20px;z-index:1000}",
  map: null
};
const RoomEntryBox = (0, import_index_fb0a7752.c)(($$result, $$props, $$bindings, slots) => {
  (0, import_index_fb0a7752.h)();
  let { roomIntent: roomIntent2 = "" } = $$props;
  let { roomTitle = "" } = $$props;
  if ($$props.roomIntent === void 0 && $$bindings.roomIntent && roomIntent2 !== void 0)
    $$bindings.roomIntent(roomIntent2);
  if ($$props.roomTitle === void 0 && $$bindings.roomTitle && roomTitle !== void 0)
    $$bindings.roomTitle(roomTitle);
  $$result.css.add(css$5);
  return `<div class="${"caption-container svelte-ukizaq"}">${(0, import_index_fb0a7752.v)(RoomDialog, "RoomDialog").$$render($$result, {
    text: `Go to ${roomTitle}?`,
    roomId: roomIntent2
  }, {}, {})}
</div>`;
});
var ObjectDialog_svelte_svelte_type_style_lang = "";
const css$4 = {
  code: ".object-dialog-box.svelte-13prx36.svelte-13prx36{position:fixed;bottom:20px;left:20px;padding:15px;background:#e8eae6;color:#221f20;border:1px solid #221f20;z-index:1000;user-select:none}.choice.svelte-13prx36.svelte-13prx36{display:flex;cursor:pointer;outline-color:#221f20;outline-width:1px}.choice.svelte-13prx36 .marker.svelte-13prx36{opacity:0;width:1em;text-align:center}.choice.svelte-13prx36:hover .marker.svelte-13prx36,.choice.svelte-13prx36:focus .marker.svelte-13prx36{opacity:1}",
  map: null
};
const ObjectDialog = (0, import_index_fb0a7752.c)(($$result, $$props, $$bindings, slots) => {
  (0, import_index_fb0a7752.h)();
  let { text = "" } = $$props;
  let { objectId = "" } = $$props;
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  if ($$props.objectId === void 0 && $$bindings.objectId && objectId !== void 0)
    $$bindings.objectId(objectId);
  $$result.css.add(css$4);
  return `<div class="${"object-dialog-box svelte-13prx36"}"><div>${(0, import_index_fb0a7752.e)(text)}</div>
  <div class="${"multiple-choice"}"><div class="${"choice svelte-13prx36"}" tabindex="${"0"}" autofocus><div class="${"marker svelte-13prx36"}">\u25B8</div>
      Yes
    </div>
    <div class="${"choice svelte-13prx36"}" tabindex="${"0"}"><div class="${"marker svelte-13prx36"}">\u25B8</div>
      No
    </div></div>
</div>`;
});
var ObjectInspectionBox_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: ".caption-container.svelte-ukizaq{position:fixed;bottom:20px;left:20px;z-index:1000}",
  map: null
};
const ObjectInspectionBox = (0, import_index_fb0a7752.c)(($$result, $$props, $$bindings, slots) => {
  (0, import_index_fb0a7752.h)();
  let { objectIntent: objectIntent2 = "" } = $$props;
  let { objectTitle = "" } = $$props;
  if ($$props.objectIntent === void 0 && $$bindings.objectIntent && objectIntent2 !== void 0)
    $$bindings.objectIntent(objectIntent2);
  if ($$props.objectTitle === void 0 && $$bindings.objectTitle && objectTitle !== void 0)
    $$bindings.objectTitle(objectTitle);
  $$result.css.add(css$3);
  return `<div class="${"caption-container svelte-ukizaq"}">${(0, import_index_fb0a7752.e)(objectTitle)}
  ${(0, import_index_fb0a7752.v)(ObjectDialog, "ObjectDialog").$$render($$result, {
    text: `Look at ${objectTitle}?`,
    objectId: objectIntent2
  }, {}, {})}
</div>`;
});
var triangleDown_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: "svg.svelte-fiesz8.svelte-fiesz8{transform:rotate(270deg)}svg.svelte-fiesz8 path.svelte-fiesz8{fill:#221f20}",
  map: null
};
const Triangle_down = (0, import_index_fb0a7752.c)(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$2);
  return `<svg width="${"9"}" height="${"8"}" viewBox="${"0 0 9 8"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}" class="${"svelte-fiesz8"}"><path d="${"M4.8474 7.78418L0.703963 0.607532L8.99084 0.607531L4.8474 7.78418Z"}" class="${"svelte-fiesz8"}"></path></svg>`;
});
var Caption_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".caption-box.svelte-10yrac0{padding:15px;background:#f5f4ee;color:#221f20;border:1px solid #221f20;z-index:1000;font-size:14px;padding-bottom:0;cursor:pointer}.caption-container.svelte-10yrac0{position:fixed;bottom:20px;left:20px;z-index:100000;max-width:520px;display:flex}.next-caption.svelte-10yrac0{padding-left:15px;padding-right:15px;background:#dedcd5;color:#221f20;border:1px solid #221f20;z-index:1000;font-size:14px;padding-bottom:0;cursor:pointer;margin-left:10px;display:flex;align-items:center;justify-content:center}",
  map: null
};
const Caption = (0, import_index_fb0a7752.c)(($$result, $$props, $$bindings, slots) => {
  (0, import_index_fb0a7752.h)();
  let { text = [] } = $$props;
  let textIndex = 0;
  let currentText = false;
  if (text.length > 0) {
    currentText = text[textIndex];
  }
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  $$result.css.add(css$1);
  return `<div class="${"caption-container svelte-10yrac0"}"><div class="${"caption-box svelte-10yrac0"}"><!-- HTML_TAG_START -->${(0, import_movement_6bb91b26.r)(currentText.text.content)}<!-- HTML_TAG_END --></div>
  ${textIndex < text.length - 1 ? `<div class="${"next-caption svelte-10yrac0"}">${(0, import_index_fb0a7752.v)(Triangle_down, "TriangleDown").$$render($$result, {}, {}, {})}</div>` : ``}
</div>`;
});
var Chat_svelte_svelte_type_style_lang = "";
const css = {
  code: '.chat-container.svelte-oqrtp3.svelte-oqrtp3{right:20px;bottom:20px;position:fixed;width:300px;z-index:10000}.chat-input.svelte-oqrtp3.svelte-oqrtp3{width:100%;display:flex;align-items:center;user-select:none}.chat-input.svelte-oqrtp3 input.svelte-oqrtp3{font-family:"Literata", serif;font-size:14px;float:left;width:100%;display:block;background:#dedcd5;border:1px solid #221f20;color:#221f20;padding:12px;border-radius:0;outline:none;height:30px;margin-right:6px}.chat-input.svelte-oqrtp3 button.svelte-oqrtp3{font-family:"Literata", serif;font-size:14px;width:60px;float:right;display:block;background:#dedcd5;border:1px solid #221f20;color:#221f20;outline:none;cursor:pointer;border-radius:0;height:30px;line-height:20px}',
  map: null
};
const Chat = (0, import_index_fb0a7752.c)(($$result, $$props, $$bindings, slots) => {
  (0, import_index_fb0a7752.h)();
  let chatInputValue = "";
  let { chatMessages: chatMessages2 = [] } = $$props;
  if ($$props.chatMessages === void 0 && $$bindings.chatMessages && chatMessages2 !== void 0)
    $$bindings.chatMessages(chatMessages2);
  $$result.css.add(css);
  return `<div class="${"chat-container svelte-oqrtp3"}"><div class="${"chat-input svelte-oqrtp3"}"><input placeholder="${"Write a message..."}" type="${"[text]"}" maxlength="${"600"}" class="${"svelte-oqrtp3"}"${(0, import_index_fb0a7752.f)("value", chatInputValue, 0)}>
    <button class="${"svelte-oqrtp3"}">Send</button></div>
</div>`;
});
const Routes = (0, import_index_fb0a7752.c)(($$result, $$props, $$bindings, slots) => {
  let $currentRoom, $$unsubscribe_currentRoom;
  let $$unsubscribe_profile;
  let $localPlayer, $$unsubscribe_localPlayer;
  let $worldObject, $$unsubscribe_worldObject;
  let $players, $$unsubscribe_players;
  let $objectIntent, $$unsubscribe_objectIntent;
  let $roomIntent, $$unsubscribe_roomIntent;
  let $trayOpen, $$unsubscribe_trayOpen;
  let $playSound, $$unsubscribe_playSound;
  let $streams, $$unsubscribe_streams;
  let $activeZone, $$unsubscribe_activeZone;
  let $activeArticle, $$unsubscribe_activeArticle;
  let $chatMessages, $$unsubscribe_chatMessages;
  $$unsubscribe_currentRoom = (0, import_index_fb0a7752.a)(import_movement_6bb91b26.c, (value) => $currentRoom = value);
  $$unsubscribe_profile = (0, import_index_fb0a7752.a)(import_movement_6bb91b26.p, (value) => value);
  $$unsubscribe_localPlayer = (0, import_index_fb0a7752.a)(import_movement_6bb91b26.k, (value) => $localPlayer = value);
  $$unsubscribe_worldObject = (0, import_index_fb0a7752.a)(import_movement_6bb91b26.w, (value) => $worldObject = value);
  $$unsubscribe_players = (0, import_index_fb0a7752.a)(import_movement_6bb91b26.h, (value) => $players = value);
  $$unsubscribe_objectIntent = (0, import_index_fb0a7752.a)(import_movement_6bb91b26.o, (value) => $objectIntent = value);
  $$unsubscribe_roomIntent = (0, import_index_fb0a7752.a)(import_movement_6bb91b26.m, (value) => $roomIntent = value);
  $$unsubscribe_trayOpen = (0, import_index_fb0a7752.a)(import_movement_6bb91b26.t, (value) => $trayOpen = value);
  $$unsubscribe_playSound = (0, import_index_fb0a7752.a)(import_movement_6bb91b26.d, (value) => $playSound = value);
  $$unsubscribe_streams = (0, import_index_fb0a7752.a)(import_movement_6bb91b26.n, (value) => $streams = value);
  $$unsubscribe_activeZone = (0, import_index_fb0a7752.a)(import_movement_6bb91b26.q, (value) => $activeZone = value);
  $$unsubscribe_activeArticle = (0, import_index_fb0a7752.a)(import_movement_6bb91b26.b, (value) => $activeArticle = value);
  $$unsubscribe_chatMessages = (0, import_index_fb0a7752.a)(import_movement_6bb91b26.f, (value) => $chatMessages = value);
  let viewportElement = {};
  let avatars = [];
  let newRoomIntroduction = false;
  {
    console.log("$objectIntent", $objectIntent);
  }
  {
    {
      if ($roomIntent || $objectIntent) {
        newRoomIntroduction = false;
      }
    }
  }
  {
    {
      if ($players[$localPlayer.uuid]) {
        if ($players[$localPlayer.uuid].x || $players[$localPlayer.uuid].x) {
          (0, import_movement_6bb91b26.v)();
          (0, import_movement_6bb91b26.x)();
          (0, import_movement_6bb91b26.y)();
        }
      }
    }
  }
  $$unsubscribe_currentRoom();
  $$unsubscribe_profile();
  $$unsubscribe_localPlayer();
  $$unsubscribe_worldObject();
  $$unsubscribe_players();
  $$unsubscribe_objectIntent();
  $$unsubscribe_roomIntent();
  $$unsubscribe_trayOpen();
  $$unsubscribe_playSound();
  $$unsubscribe_streams();
  $$unsubscribe_activeZone();
  $$unsubscribe_activeArticle();
  $$unsubscribe_chatMessages();
  return `
${$currentRoom ? `<div class="${["viewport", $trayOpen ? "pushed" : ""].join(" ").trim()}"${(0, import_index_fb0a7752.f)("this", viewportElement, 0)}>${(0, import_index_fb0a7752.v)(Room, "Room").$$render($$result, {
    room: $currentRoom,
    x: (0, import_get.default)($players[$localPlayer.uuid], "x", 100),
    y: (0, import_get.default)($players[$localPlayer.uuid], "y", 100)
  }, {}, {
    default: () => {
      return `
      ${(0, import_index_fb0a7752.v)(Players, "Players").$$render($$result, {
        players: $players,
        currentRoomId: $currentRoom._id,
        avatars
      }, {}, {})}
      
      ${(0, import_index_fb0a7752.v)(Objects, "Objects").$$render($$result, {
        objects: (0, import_get.default)($currentRoom, "objects", [])
      }, {}, {})}
      
      ${(0, import_index_fb0a7752.v)(Zones, "Zones").$$render($$result, { zones: (0, import_get.default)($currentRoom, "zones", []) }, {}, {})}
      
      ${(0, import_index_fb0a7752.v)(Portals, "Portals").$$render($$result, {
        portals: (0, import_get.default)($currentRoom, "portals", [])
      }, {}, {})}
      
      `;
    }
  })}</div>` : ``}


${(0, import_has.default)($currentRoom, "backgroundSound.asset") && $playSound ? `${(0, import_index_fb0a7752.v)(AmbientAudio, "AmbientAudio").$$render($$result, { soundFile: $currentRoom.backgroundSound }, {}, {})}` : ``}


${(0, import_index_fb0a7752.b)($streams, (stream) => {
    return `${$currentRoom._id == stream.parentArea._ref || $activeZone._id == stream.parentArea._ref ? `${(0, import_index_fb0a7752.v)(StreamPlayer, "StreamPlayer").$$render($$result, { streamUrl: stream.videoUrl }, {}, {})}` : ``}`;
  })}


${$roomIntent ? `${(0, import_index_fb0a7752.v)(RoomEntryBox, "RoomEntryBox").$$render($$result, {
    roomIntent: $roomIntent,
    roomTitle: $worldObject[$roomIntent].title
  }, {}, {})}` : ``}


${$objectIntent ? `${(0, import_index_fb0a7752.v)(ObjectInspectionBox, "ObjectInspectionBox").$$render($$result, {
    objectIntent: $objectIntent,
    objectTitle: $currentRoom.objects.find((o) => o._id == $objectIntent).title
  }, {}, {})}` : ``}

${!$trayOpen && !$activeArticle && !$roomIntent && !$objectIntent ? `${newRoomIntroduction ? `${(0, import_index_fb0a7752.v)(Caption, "Caption").$$render($$result, { text: newRoomIntroduction }, {}, {})}` : ``}` : ``}


${$activeArticle ? `${(0, import_index_fb0a7752.v)(ArticleBox, "ArticleBox").$$render($$result, { article: $activeArticle }, {}, {})}` : ``}


${!$trayOpen && !$activeArticle ? `${(0, import_index_fb0a7752.v)(Chat, "Chat").$$render($$result, {
    chatMessages: $chatMessages.filter((m) => m.room === $currentRoom._id)
  }, {}, {})}` : ``}`;
});
