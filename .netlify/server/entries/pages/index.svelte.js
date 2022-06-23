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
var import_index_c41c42e8 = require("../../chunks/index-c41c42e8.js");
var import_get = __toESM(require("lodash/get.js"));
var import_has = __toESM(require("lodash/has.js"));
var import_js_cookie = require("js-cookie");
var import_movement_33798768 = require("../../chunks/movement-33798768.js");
var import_sample = __toESM(require("lodash/sample.js"));
var import_howler = require("howler");
var import_inRange = require("lodash/inRange.js");
var import_lodash = require("lodash");
var import_throttle = require("lodash/throttle.js");
var import_date_fns = require("date-fns");
var import_get_video_id = __toESM(require("get-video-id"));
var import_html_truncate = require("html-truncate");
var import_slugify = require("slugify");
var import_keycloak_js = require("keycloak-js");
var import_client = require("@sanity/client");
var import_block_content_to_html = require("@sanity/block-content-to-html");
var import_image_url = require("@sanity/image-url");
var AvatarPicker_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => ".inner.svelte-i1o3ve.svelte-i1o3ve{display:flex;flex-wrap:wrap;margin-top:20px}.inner.svelte-i1o3ve .avatar.svelte-i1o3ve{cursor:pointer;padding:5px;border:2px solid transparent;border-radius:5px}@media(max-width: 800px){.inner.svelte-i1o3ve .avatar.svelte-i1o3ve{padding:10px}}.inner.svelte-i1o3ve .avatar.selected.svelte-i1o3ve{border:2px solid #221f20}")();
const css$h = {
  code: ".inner.svelte-i1o3ve.svelte-i1o3ve{display:flex;flex-wrap:wrap;margin-top:20px}.inner.svelte-i1o3ve .avatar.svelte-i1o3ve{cursor:pointer;padding:5px;border:2px solid transparent;border-radius:5px}@media(max-width: 800px){.inner.svelte-i1o3ve .avatar.svelte-i1o3ve{padding:10px}}.inner.svelte-i1o3ve .avatar.selected.svelte-i1o3ve{border:2px solid #221f20}",
  map: null
};
const AvatarPicker = (0, import_index_c41c42e8.c)(($$result, $$props, $$bindings, slots) => {
  const dispatch = (0, import_index_c41c42e8.h)();
  let { avatars = [] } = $$props;
  let selectedAvatar = (0, import_sample.default)(avatars)._id;
  dispatch("select", { id: selectedAvatar });
  if ($$props.avatars === void 0 && $$bindings.avatars && avatars !== void 0)
    $$bindings.avatars(avatars);
  $$result.css.add(css$h);
  return `<div class="${"avatar-picker"}"><div>Select your avatar</div>
  <div class="${"inner svelte-i1o3ve"}">${(0, import_index_c41c42e8.b)(avatars, (avatar, i) => {
    return `<div class="${["avatar svelte-i1o3ve", selectedAvatar == avatar._id ? "selected" : ""].join(" ").trim()}"><img${(0, import_index_c41c42e8.f)("src", avatar.imageUrl, 0)}>
      </div>`;
  })}</div>
</div>`;
});
var Onboarding_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => '.onboarding-screen.svelte-1i69y61.svelte-1i69y61{position:fixed;top:0;left:0;width:100vw;height:100vh;color:#f5f4ee;display:flex;justify-content:center;align-items:center;z-index:100000;backdrop-filter:blur(10px)}.onboarding-screen.svelte-1i69y61 .box.svelte-1i69y61{font-family:"Literata", serif;padding:40px;width:400px;background:#f5f4ee;color:#221f20;font-size:14px;text-align:center;user-select:none;max-width:90%}.btn.svelte-1i69y61.svelte-1i69y61{background:#dedcd5;padding:10px;margin-top:20px;cursor:pointer;border:1px solid #221f20}.btn.svelte-1i69y61.svelte-1i69y61:hover{opacity:0.8}.name.svelte-1i69y61.svelte-1i69y61{margin-top:10px;width:100%;padding:5px;font-size:14px;text-align:center;outline:none;font-family:"Literata", serif}')();
const css$g = {
  code: '.onboarding-screen.svelte-1i69y61.svelte-1i69y61{position:fixed;top:0;left:0;width:100vw;height:100vh;color:#f5f4ee;display:flex;justify-content:center;align-items:center;z-index:100000;backdrop-filter:blur(10px)}.onboarding-screen.svelte-1i69y61 .box.svelte-1i69y61{font-family:"Literata", serif;padding:40px;width:400px;background:#f5f4ee;color:#221f20;font-size:14px;text-align:center;user-select:none;max-width:90%}.btn.svelte-1i69y61.svelte-1i69y61{background:#dedcd5;padding:10px;margin-top:20px;cursor:pointer;border:1px solid #221f20}.btn.svelte-1i69y61.svelte-1i69y61:hover{opacity:0.8}.name.svelte-1i69y61.svelte-1i69y61{margin-top:10px;width:100%;padding:5px;font-size:14px;text-align:center;outline:none;font-family:"Literata", serif}',
  map: null
};
const Onboarding = (0, import_index_c41c42e8.c)(($$result, $$props, $$bindings, slots) => {
  (0, import_index_c41c42e8.h)();
  let { avatars = [] } = $$props;
  let slides = false;
  let slideIndex = 0;
  let name = "";
  if ($$props.avatars === void 0 && $$bindings.avatars && avatars !== void 0)
    $$bindings.avatars(avatars);
  $$result.css.add(css$g);
  return `<div class="${"onboarding-screen svelte-1i69y61"}"><div class="${"box svelte-1i69y61"}">
    ${``}
    
    ${slideIndex === slides.length ? `<div class="${"slide"}"><div class="${"name svelte-1i69y61"}">What would you like to be called?</div>
        <div class="${"input-container"}"><input class="${"name svelte-1i69y61"}" type="${"text"}" placeholder="${"Name"}" autofocus${(0, import_index_c41c42e8.f)("value", name, 0)}></div>
        <div class="${"btn next svelte-1i69y61"}">Next</div></div>` : ``}
    
    ${slideIndex === slides.length + 1 ? `<div class="${"slide"}"><div class="${"name svelte-1i69y61"}">${(0, import_index_c41c42e8.v)(AvatarPicker, "AvatarPicker").$$render($$result, { avatars }, {}, {})}</div>
        <div class="${"btn next svelte-1i69y61"}">Enter</div></div>` : ``}</div>
</div>`;
});
var Room_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => ".room.svelte-947h49.svelte-947h49{position:absolute;top:50%;left:50%;background:#dedcd5;background-repeat:no-repeat;background-size:cover;will-change:transform;transition:transform 0.5s ease-out}.room.svelte-947h49 video.svelte-947h49{width:100%;height:100%;object-fit:cover}")();
const css$f = {
  code: ".room.svelte-947h49.svelte-947h49{position:absolute;top:50%;left:50%;background:#dedcd5;background-repeat:no-repeat;background-size:cover;will-change:transform;transition:transform 0.5s ease-out}.room.svelte-947h49 video.svelte-947h49{width:100%;height:100%;object-fit:cover}",
  map: null
};
const Room = (0, import_index_c41c42e8.c)(($$result, $$props, $$bindings, slots) => {
  let $centeringInlineStyles, $$unsubscribe_centeringInlineStyles;
  $$unsubscribe_centeringInlineStyles = (0, import_index_c41c42e8.a)(import_movement_33798768.e, (value) => $centeringInlineStyles = value);
  let { room = {} } = $$props;
  if ($$props.room === void 0 && $$bindings.room && room !== void 0)
    $$bindings.room(room);
  $$result.css.add(css$f);
  $$unsubscribe_centeringInlineStyles();
  return `<div class="${"room svelte-947h49"}" id="${"room"}"${(0, import_index_c41c42e8.f)("style", `${room.inlineStyles} ${$centeringInlineStyles}`, 0)} aria-live="${"polite"}">${slots.default ? slots.default({}) : ``}

  ${room.bgVideoUrl ? `<video${(0, import_index_c41c42e8.f)("src", room.bgVideoUrl, 0)} autoplay loop muted class="${"svelte-947h49"}"></video>` : ``}
</div>`;
});
var Avatar_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => ".avatar.svelte-1qs6xkk.svelte-1qs6xkk{height:32px;width:32px;position:absolute;top:0;left:0;z-index:100;background:#dedcd5;opacity:0}.avatar.svelte-1qs6xkk img.svelte-1qs6xkk{width:100%;height:100%;image-rendering:pixelated}.avatar.shown.svelte-1qs6xkk.svelte-1qs6xkk{opacity:1}.avatar.blinking.svelte-1qs6xkk.svelte-1qs6xkk{animation:svelte-1qs6xkk-blink 0.65s infinite;animation-timing-function:ease-out}.avatar.self.svelte-1qs6xkk.svelte-1qs6xkk{z-index:100000}@keyframes svelte-1qs6xkk-blink{0%{opacity:0}50%{opacity:1}100%{opacity:0}}")();
const css$e = {
  code: ".avatar.svelte-1qs6xkk.svelte-1qs6xkk{height:32px;width:32px;position:absolute;top:0;left:0;z-index:100;background:#dedcd5;opacity:0}.avatar.svelte-1qs6xkk img.svelte-1qs6xkk{width:100%;height:100%;image-rendering:pixelated}.avatar.shown.svelte-1qs6xkk.svelte-1qs6xkk{opacity:1}.avatar.blinking.svelte-1qs6xkk.svelte-1qs6xkk{animation:svelte-1qs6xkk-blink 0.65s infinite;animation-timing-function:ease-out}.avatar.self.svelte-1qs6xkk.svelte-1qs6xkk{z-index:100000}@keyframes svelte-1qs6xkk-blink{0%{opacity:0}50%{opacity:1}100%{opacity:0}}",
  map: null
};
const Avatar = (0, import_index_c41c42e8.c)(($$result, $$props, $$bindings, slots) => {
  let $isPhone, $$unsubscribe_isPhone;
  let $chatMessages, $$unsubscribe_chatMessages;
  let $focusPlayer, $$unsubscribe_focusPlayer;
  $$unsubscribe_isPhone = (0, import_index_c41c42e8.a)(import_movement_33798768.f, (value) => $isPhone = value);
  $$unsubscribe_chatMessages = (0, import_index_c41c42e8.a)(import_movement_33798768.g, (value) => $chatMessages = value);
  $$unsubscribe_focusPlayer = (0, import_index_c41c42e8.a)(import_movement_33798768.h, (value) => $focusPlayer = value);
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
  let gridPosY = player.y * import_movement_33798768.G;
  let gridPosX = player.x * import_movement_33798768.G;
  const checkIfCloseToEdge = () => {
    if (avatarEl && avatarEl.parentElement) {
      let avatarRect = avatarEl.getBoundingClientRect();
      if (avatarRect.left < ($isPhone ? 40 : 100) || avatarRect.top < ($isPhone ? 120 : 100) || avatarRect.right > window.innerWidth - ($isPhone ? 40 : 100) || avatarRect.bottom > window.innerHeight - ($isPhone ? 180 : 100)) {
        return true;
      }
    }
    return false;
  };
  const centerViewOnPlayer = () => {
    import_movement_33798768.e.set(`transform: translateX(-${gridPosX}px) translateY(-${gridPosY}px);`);
  };
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
      gridPosY = player.y * import_movement_33798768.G;
      gridPosX = player.x * import_movement_33798768.G;
    }
  }
  {
    if (player.self && (player.x || player.y)) {
      if (checkIfCloseToEdge()) {
        centerViewOnPlayer();
      }
    }
  }
  $$unsubscribe_isPhone();
  $$unsubscribe_chatMessages();
  $$unsubscribe_focusPlayer();
  return `<div class="${[
    "avatar svelte-1qs6xkk",
    (!$focusPlayer || player.self ? "shown" : "") + " " + (player.self ? "self" : "") + " " + ($focusPlayer && player.self ? "blinking" : "")
  ].join(" ").trim()}"${(0, import_index_c41c42e8.f)("id", key, 0)}${(0, import_index_c41c42e8.f)("alt", player.name, 0)}${(0, import_index_c41c42e8.f)("style", "transform: translateY(" + gridPosY + "px) translateX(" + gridPosX + "px)", 0)}${(0, import_index_c41c42e8.f)("this", avatarEl, 0)}><img${(0, import_index_c41c42e8.f)("src", avatar && avatar.imageUrl ? avatar.imageUrl : (0, import_sample.default)(avatars).imageUrl, 0)} class="${"svelte-1qs6xkk"}">
</div>`;
});
const Players = (0, import_index_c41c42e8.c)(($$result, $$props, $$bindings, slots) => {
  let { players: players2 = {} } = $$props;
  let { currentRoomId = "" } = $$props;
  let { avatars = [] } = $$props;
  if ($$props.players === void 0 && $$bindings.players && players2 !== void 0)
    $$bindings.players(players2);
  if ($$props.currentRoomId === void 0 && $$bindings.currentRoomId && currentRoomId !== void 0)
    $$bindings.currentRoomId(currentRoomId);
  if ($$props.avatars === void 0 && $$bindings.avatars && avatars !== void 0)
    $$bindings.avatars(avatars);
  return `${(0, import_index_c41c42e8.b)(Object.entries(players2), ([key, player]) => {
    return `${player.room === currentRoomId && !player.inTransit ? `${(0, import_index_c41c42e8.v)(Avatar, "Avatar").$$render($$result, { player, key, avatars }, {}, {})}` : ``}`;
  })}`;
});
var Object_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => ".object.svelte-pj284l.svelte-pj284l{height:32px;width:32px;overflow:hidden;position:absolute;top:0;left:0;background:#dedcd5}.object.svelte-pj284l img.svelte-pj284l{height:100%;width:100%;object-fit:cover}.object.static.svelte-pj284l.svelte-pj284l{pointer-events:none;cursor:default}")();
const css$d = {
  code: ".object.svelte-pj284l.svelte-pj284l{height:32px;width:32px;overflow:hidden;position:absolute;top:0;left:0;background:#dedcd5}.object.svelte-pj284l img.svelte-pj284l{height:100%;width:100%;object-fit:cover}.object.static.svelte-pj284l.svelte-pj284l{pointer-events:none;cursor:default}",
  map: null
};
const Object$1 = (0, import_index_c41c42e8.c)(($$result, $$props, $$bindings, slots) => {
  let $showLabels, $$unsubscribe_showLabels;
  let $$unsubscribe_currentRoom;
  $$unsubscribe_showLabels = (0, import_index_c41c42e8.a)(import_movement_33798768.s, (value) => $showLabels = value);
  $$unsubscribe_currentRoom = (0, import_index_c41c42e8.a)(import_movement_33798768.c, (value) => value);
  let { object = {} } = $$props;
  let objectEl = {};
  let label = {};
  let gridPosY = object.y * import_movement_33798768.G;
  let gridPosX = object.x * import_movement_33798768.G;
  let gridWidth = (0, import_get.default)(object, "dimensions.width", 1) * import_movement_33798768.G;
  let gridHeight = (0, import_get.default)(object, "dimensions.height", 1) * import_movement_33798768.G;
  const inlineStyles = `transform: translateY(${gridPosY}px) translateX(${gridPosX}px); width: ${gridWidth}px; height: ${gridHeight}px;`;
  (0, import_index_c41c42e8.h)();
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
  $$unsubscribe_currentRoom();
  return `<div class="${[
    "object svelte-pj284l",
    (object.static ? "static" : "") + " " + (object.iconImage ? "image" : "")
  ].join(" ").trim()}"${(0, import_index_c41c42e8.f)("id", object._id, 0)}${(0, import_index_c41c42e8.f)("alt", object.title, 0)}${(0, import_index_c41c42e8.f)("style", inlineStyles, 0)} tabindex="${"0"}"${(0, import_index_c41c42e8.f)("aria-label", object.static ? "Inspect " + object.title : "A static image of a " + object.title, 0)}${(0, import_index_c41c42e8.f)("this", objectEl, 0)}>${object.iconImage ? `<img${(0, import_index_c41c42e8.f)("src", (0, import_movement_33798768.j)(object.iconImage).quality(100).height(300).url(), 0)}${(0, import_index_c41c42e8.f)("alt", object.title, 0)} class="${"svelte-pj284l"}">` : ``}
</div>`;
});
const Objects = (0, import_index_c41c42e8.c)(($$result, $$props, $$bindings, slots) => {
  let $focusPlayer, $$unsubscribe_focusPlayer;
  $$unsubscribe_focusPlayer = (0, import_index_c41c42e8.a)(import_movement_33798768.h, (value) => $focusPlayer = value);
  let { objects = {} } = $$props;
  if ($$props.objects === void 0 && $$bindings.objects && objects !== void 0)
    $$bindings.objects(objects);
  $$unsubscribe_focusPlayer();
  return `${!$focusPlayer ? `${(0, import_index_c41c42e8.b)(objects, (object) => {
    return `${(0, import_index_c41c42e8.v)(Object$1, "Object").$$render($$result, { object }, {}, {})}`;
  })}` : ``}`;
});
var Zone_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => ".zone.svelte-8z8z6b.svelte-8z8z6b{height:32px;width:32px;position:absolute;top:0;left:0;cursor:pointer;transition:opacity 0.5s cubic-bezier(0.23, 1, 0.32, 1);pointer-events:none}.zone.svelte-8z8z6b.svelte-8z8z6b:hover{background:transparent}.zone.svelte-8z8z6b img.svelte-8z8z6b{height:100%;width:100%;object-fit:cover;max-height:100%}.zone.svelte-8z8z6b video.svelte-8z8z6b{width:100%;height:100%;object-fit:cover}")();
const css$c = {
  code: ".zone.svelte-8z8z6b.svelte-8z8z6b{height:32px;width:32px;position:absolute;top:0;left:0;cursor:pointer;transition:opacity 0.5s cubic-bezier(0.23, 1, 0.32, 1);pointer-events:none}.zone.svelte-8z8z6b.svelte-8z8z6b:hover{background:transparent}.zone.svelte-8z8z6b img.svelte-8z8z6b{height:100%;width:100%;object-fit:cover;max-height:100%}.zone.svelte-8z8z6b video.svelte-8z8z6b{width:100%;height:100%;object-fit:cover}",
  map: null
};
const Zone = (0, import_index_c41c42e8.c)(($$result, $$props, $$bindings, slots) => {
  let $showLabels, $$unsubscribe_showLabels;
  $$unsubscribe_showLabels = (0, import_index_c41c42e8.a)(import_movement_33798768.s, (value) => $showLabels = value);
  let { zone = {} } = $$props;
  let zoneEl = {};
  let label = {};
  let gridPosY = zone.y * import_movement_33798768.G;
  let gridPosX = zone.x * import_movement_33798768.G;
  let gridWidth = (0, import_get.default)(zone, "dimensions.width", 1) * import_movement_33798768.G;
  let gridHeight = (0, import_get.default)(zone, "dimensions.height", 1) * import_movement_33798768.G;
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
  return `<div class="${"zone svelte-8z8z6b"}"${(0, import_index_c41c42e8.f)("id", zone._id, 0)}${(0, import_index_c41c42e8.f)("alt", zone.title, 0)}${(0, import_index_c41c42e8.f)("style", inlineStyles, 0)}${(0, import_index_c41c42e8.f)("this", zoneEl, 0)}>${zone.bgVideoUrl ? `<video${(0, import_index_c41c42e8.f)("src", zone.bgVideoUrl, 0)} autoplay loop muted class="${"svelte-8z8z6b"}"></video>` : `${zone.backgroundImage ? `<img${(0, import_index_c41c42e8.f)("src", (0, import_movement_33798768.j)(zone.backgroundImage).quality(100).url(), 0)} class="${"svelte-8z8z6b"}">` : ``}`}
</div>`;
});
const Zones = (0, import_index_c41c42e8.c)(($$result, $$props, $$bindings, slots) => {
  let $focusPlayer, $$unsubscribe_focusPlayer;
  $$unsubscribe_focusPlayer = (0, import_index_c41c42e8.a)(import_movement_33798768.h, (value) => $focusPlayer = value);
  let { zones = {} } = $$props;
  if ($$props.zones === void 0 && $$bindings.zones && zones !== void 0)
    $$bindings.zones(zones);
  $$unsubscribe_focusPlayer();
  return `${!$focusPlayer ? `${(0, import_index_c41c42e8.b)(zones, (zone) => {
    return `${(0, import_index_c41c42e8.v)(Zone, "Zone").$$render($$result, { zone }, {}, {})}`;
  })}` : ``}`;
});
const AmbientAudio = (0, import_index_c41c42e8.c)(($$result, $$props, $$bindings, slots) => {
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
  (0, import_index_c41c42e8.o)(async () => {
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
var Portal_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => ".portal.svelte-1ulo7kp{height:32px;width:32px;position:absolute;top:0;left:0;cursor:pointer;transition:opacity 0.5s cubic-bezier(0.23, 1, 0.32, 1);pointer-events:none;background-size:contain;background-repeat:no-repeat;background-color:#dedcd5}")();
const css$b = {
  code: ".portal.svelte-1ulo7kp{height:32px;width:32px;position:absolute;top:0;left:0;cursor:pointer;transition:opacity 0.5s cubic-bezier(0.23, 1, 0.32, 1);pointer-events:none;background-size:contain;background-repeat:no-repeat;background-color:#dedcd5}",
  map: null
};
const Portal = (0, import_index_c41c42e8.c)(($$result, $$props, $$bindings, slots) => {
  let $showLabels, $$unsubscribe_showLabels;
  $$unsubscribe_showLabels = (0, import_index_c41c42e8.a)(import_movement_33798768.s, (value) => $showLabels = value);
  let { portal = {} } = $$props;
  let portalEl = {};
  let label = {};
  let gridPosY = portal.y * import_movement_33798768.G;
  let gridPosX = portal.x * import_movement_33798768.G;
  const inlineStyles = `transform: translateY(${gridPosY}px) translateX(${gridPosX}px); width: ${import_movement_33798768.G}px; height: ${import_movement_33798768.G}px; background-color: ${(0, import_get.default)(portal, "backgroundColor.hex", "")}; background-image: url("${(0, import_get.default)(portal, "bgImageUrl", "")}");"`;
  (0, import_index_c41c42e8.h)();
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
  {
    console.log("portal: ", portal);
  }
  $$unsubscribe_showLabels();
  return `<div class="${"portal svelte-1ulo7kp"}"${(0, import_index_c41c42e8.f)("id", portal._id, 0)}${(0, import_index_c41c42e8.f)("alt", portal.title, 0)}${(0, import_index_c41c42e8.f)("style", inlineStyles, 0)} tabindex="${"0"}"${(0, import_index_c41c42e8.f)("aria-label", "Go to " + portal.title, 0)}${(0, import_index_c41c42e8.f)("this", portalEl, 0)}>${portal.iconImage ? `<img${(0, import_index_c41c42e8.f)("src", (0, import_movement_33798768.j)(portal.iconImage).quality(100).height(100).url(), 0)}>` : ``}
</div>`;
});
const Portals = (0, import_index_c41c42e8.c)(($$result, $$props, $$bindings, slots) => {
  let $focusPlayer, $$unsubscribe_focusPlayer;
  $$unsubscribe_focusPlayer = (0, import_index_c41c42e8.a)(import_movement_33798768.h, (value) => $focusPlayer = value);
  (0, import_index_c41c42e8.h)();
  let { portals = {} } = $$props;
  if ($$props.portals === void 0 && $$bindings.portals && portals !== void 0)
    $$bindings.portals(portals);
  $$unsubscribe_focusPlayer();
  return `${!$focusPlayer ? `${(0, import_index_c41c42e8.b)(portals, (portal) => {
    return `${(0, import_index_c41c42e8.v)(Portal, "Portal").$$render($$result, { portal }, {}, {})}`;
  })}` : ``}`;
});
var pauseBars_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => "svg.svelte-192w1ja.svelte-192w1ja{height:15px}svg.svelte-192w1ja path.svelte-192w1ja{fill:#221f20}")();
var StreamPlayer_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => ".stream-container.svelte-11tufvb.svelte-11tufvb{position:absolute;top:40px;left:10px;width:420px;border:1px solid #221f20;z-index:10000}.stream-container.audio.svelte-11tufvb.svelte-11tufvb{width:360px}@media(max-width: 800px){.stream-container.svelte-11tufvb.svelte-11tufvb{position:fixed;left:20px;width:calc(100vw - 40px)}}.stream-container.svelte-11tufvb .embed.svelte-11tufvb{width:100%;background:#f5f4ee;display:flex;padding:5px}.stream-container.svelte-11tufvb .embed .peertube-container.svelte-11tufvb,.stream-container.svelte-11tufvb .embed .youtube-container.svelte-11tufvb,.stream-container.svelte-11tufvb .embed .vimeo-container.svelte-11tufvb{position:relative;padding-bottom:56.25%;height:0;overflow:hidden;width:720px}.stream-container.svelte-11tufvb .embed .peertube-container.hidden.svelte-11tufvb{display:none}.stream-container.svelte-11tufvb .embed .peertube-container iframe.svelte-11tufvb,.stream-container.svelte-11tufvb .embed .youtube-container iframe.svelte-11tufvb,.stream-container.svelte-11tufvb .embed .vimeo-container iframe.svelte-11tufvb{position:absolute;top:0;left:0;width:100%;height:100%;border:0}.audio-interface.svelte-11tufvb.svelte-11tufvb{padding:10px;width:100%}.audio-interface.svelte-11tufvb .title.svelte-11tufvb{width:100%}.audio-interface.svelte-11tufvb .controls.svelte-11tufvb{width:100%;margin-top:10px;display:flex;justify-content:space-between}.audio-interface.svelte-11tufvb .controls .control.svelte-11tufvb{height:40px;width:40px;background:#dedcd5;text-align:center;user-select:none;cursor:pointer;display:flex;justify-content:center;align-items:center}.audio-interface.svelte-11tufvb .controls .playbar.svelte-11tufvb{background:#dedcd5;width:calc(100% - 50px);height:40px}.audio-interface.svelte-11tufvb .controls .playbar .progress.svelte-11tufvb{height:100%;background:#221f20}")();
const css$a = {
  code: ".stream-container.svelte-11tufvb.svelte-11tufvb{position:absolute;top:40px;left:10px;width:420px;border:1px solid #221f20;z-index:10000}.stream-container.audio.svelte-11tufvb.svelte-11tufvb{width:360px}@media(max-width: 800px){.stream-container.svelte-11tufvb.svelte-11tufvb{position:fixed;left:20px;width:calc(100vw - 40px)}}.stream-container.svelte-11tufvb .embed.svelte-11tufvb{width:100%;background:#f5f4ee;display:flex;padding:5px}.stream-container.svelte-11tufvb .embed .peertube-container.svelte-11tufvb,.stream-container.svelte-11tufvb .embed .youtube-container.svelte-11tufvb,.stream-container.svelte-11tufvb .embed .vimeo-container.svelte-11tufvb{position:relative;padding-bottom:56.25%;height:0;overflow:hidden;width:720px}.stream-container.svelte-11tufvb .embed .peertube-container.hidden.svelte-11tufvb{display:none}.stream-container.svelte-11tufvb .embed .peertube-container iframe.svelte-11tufvb,.stream-container.svelte-11tufvb .embed .youtube-container iframe.svelte-11tufvb,.stream-container.svelte-11tufvb .embed .vimeo-container iframe.svelte-11tufvb{position:absolute;top:0;left:0;width:100%;height:100%;border:0}.audio-interface.svelte-11tufvb.svelte-11tufvb{padding:10px;width:100%}.audio-interface.svelte-11tufvb .title.svelte-11tufvb{width:100%}.audio-interface.svelte-11tufvb .controls.svelte-11tufvb{width:100%;margin-top:10px;display:flex;justify-content:space-between}.audio-interface.svelte-11tufvb .controls .control.svelte-11tufvb{height:40px;width:40px;background:#dedcd5;text-align:center;user-select:none;cursor:pointer;display:flex;justify-content:center;align-items:center}.audio-interface.svelte-11tufvb .controls .playbar.svelte-11tufvb{background:#dedcd5;width:calc(100% - 50px);height:40px}.audio-interface.svelte-11tufvb .controls .playbar .progress.svelte-11tufvb{height:100%;background:#221f20}",
  map: null
};
const StreamPlayer = (0, import_index_c41c42e8.c)(($$result, $$props, $$bindings, slots) => {
  let { streamUrl = "" } = $$props;
  let { audioOnly = true } = $$props;
  let { title = "" } = $$props;
  let position = 0;
  if ($$props.streamUrl === void 0 && $$bindings.streamUrl && streamUrl !== void 0)
    $$bindings.streamUrl(streamUrl);
  if ($$props.audioOnly === void 0 && $$bindings.audioOnly && audioOnly !== void 0)
    $$bindings.audioOnly(audioOnly);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  $$result.css.add(css$a);
  return `<div class="${["stream-container svelte-11tufvb", audioOnly ? "audio" : ""].join(" ").trim()}"><div class="${"embed svelte-11tufvb"}">${streamUrl.includes("youtube") || streamUrl.includes("youtu.be") ? `<div class="${"youtube-container svelte-11tufvb"}"><iframe width="${"1920"}" height="${"1280"}"${(0, import_index_c41c42e8.f)("src", "https://www.youtube.com/embed/" + (0, import_get_video_id.default)(streamUrl).id + "?autoplay=1&rel=0&color=white", 0)} frameborder="${"no"}" allow="${"autoplay; fullscreen"}" allowfullscreen class="${"svelte-11tufvb"}"></iframe></div>` : `${streamUrl.includes("vimeo") ? `<div class="${"vimeo-container svelte-11tufvb"}"><iframe width="${"720"}" height="${"480"}"${(0, import_index_c41c42e8.f)("src", "https://player.vimeo.com/video/" + (0, import_get_video_id.default)(streamUrl).id + "?autoplay=1", 0)} frameborder="${"no"}" scrolling="${"no"}" byline="${"false"}" color="${"#ffffff"}" allow="${"autoplay; fullscreen"}" allowfullscreen class="${"svelte-11tufvb"}"></iframe></div>` : `${streamUrl.includes("undersco.re") ? `<div class="${["peertube-container svelte-11tufvb", audioOnly ? "hidden" : ""].join(" ").trim()}"><iframe class="${"peertube svelte-11tufvb"}" width="${"720"}" height="${"480"}"${(0, import_index_c41c42e8.f)("src", streamUrl + "?api=1", 0)} frameborder="${"no"}" color="${"#ffffff"}" allow="${"autoplay; fullscreen"}" sandbox="${"allow-same-origin allow-scripts allow-popups"}" allowfullscreen></iframe></div>
      ${audioOnly ? `<div class="${"audio-interface svelte-11tufvb"}"><div class="${"title svelte-11tufvb"}">${(0, import_index_c41c42e8.e)(title)}</div>
          <div class="${"controls svelte-11tufvb"}"><div class="${"control svelte-11tufvb"}">${`${(0, import_index_c41c42e8.v)(import_movement_33798768.P, "PlayArrow").$$render($$result, {}, {}, {})}`}</div>
            <div class="${"playbar svelte-11tufvb"}"><div class="${"progress svelte-11tufvb"}"${(0, import_index_c41c42e8.f)("style", "width: " + position + "%;", 0)}></div></div></div></div>` : ``}` : ``}`}`}</div>
</div>`;
});
var VideoPlayer_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => ".stream-container.svelte-rt5t1v.svelte-rt5t1v{width:720px}@media(max-width: 800px){.stream-container.svelte-rt5t1v.svelte-rt5t1v{width:90%}}.stream-container.svelte-rt5t1v .embed.svelte-rt5t1v{width:100%;background:black;display:flex;justify-content:center;align-items:center}.stream-container.svelte-rt5t1v .embed .peertube-container.svelte-rt5t1v,.stream-container.svelte-rt5t1v .embed .youtube-container.svelte-rt5t1v,.stream-container.svelte-rt5t1v .embed .vimeo-container.svelte-rt5t1v{position:relative;padding-bottom:56.25%;height:0;overflow:hidden;width:720px}.stream-container.svelte-rt5t1v .embed .peertube-container iframe.svelte-rt5t1v,.stream-container.svelte-rt5t1v .embed .youtube-container iframe.svelte-rt5t1v,.stream-container.svelte-rt5t1v .embed .vimeo-container iframe.svelte-rt5t1v{position:absolute;top:0;left:0;width:100%;height:100%;border:0}")();
const css$9 = {
  code: ".stream-container.svelte-rt5t1v.svelte-rt5t1v{width:720px}@media(max-width: 800px){.stream-container.svelte-rt5t1v.svelte-rt5t1v{width:90%}}.stream-container.svelte-rt5t1v .embed.svelte-rt5t1v{width:100%;background:black;display:flex;justify-content:center;align-items:center}.stream-container.svelte-rt5t1v .embed .peertube-container.svelte-rt5t1v,.stream-container.svelte-rt5t1v .embed .youtube-container.svelte-rt5t1v,.stream-container.svelte-rt5t1v .embed .vimeo-container.svelte-rt5t1v{position:relative;padding-bottom:56.25%;height:0;overflow:hidden;width:720px}.stream-container.svelte-rt5t1v .embed .peertube-container iframe.svelte-rt5t1v,.stream-container.svelte-rt5t1v .embed .youtube-container iframe.svelte-rt5t1v,.stream-container.svelte-rt5t1v .embed .vimeo-container iframe.svelte-rt5t1v{position:absolute;top:0;left:0;width:100%;height:100%;border:0}",
  map: null
};
const VideoPlayer = (0, import_index_c41c42e8.c)(($$result, $$props, $$bindings, slots) => {
  let { streamUrl = "" } = $$props;
  if ($$props.streamUrl === void 0 && $$bindings.streamUrl && streamUrl !== void 0)
    $$bindings.streamUrl(streamUrl);
  $$result.css.add(css$9);
  return `<div class="${"stream-container svelte-rt5t1v"}"><div class="${"embed svelte-rt5t1v"}">${streamUrl.includes("youtube") || streamUrl.includes("youtu.be") ? `<div class="${"youtube-container svelte-rt5t1v"}"><iframe width="${"1920"}" height="${"1280"}"${(0, import_index_c41c42e8.f)("src", "https://www.youtube.com/embed/" + (0, import_get_video_id.default)(streamUrl).id + "?rel=0&color=white", 0)} frameborder="${"no"}" allow="${"autoplay; fullscreen"}" allowfullscreen class="${"svelte-rt5t1v"}"></iframe></div>` : `${streamUrl.includes("vimeo") ? `<div class="${"vimeo-container svelte-rt5t1v"}"><iframe width="${"720"}" height="${"480"}"${(0, import_index_c41c42e8.f)("src", "https://player.vimeo.com/video/" + (0, import_get_video_id.default)(streamUrl).id, 0)} frameborder="${"no"}" scrolling="${"no"}" byline="${"false"}" color="${"#ffffff"}" allow="${"autoplay; fullscreen"}" allowfullscreen class="${"svelte-rt5t1v"}"></iframe></div>` : `${streamUrl.includes("undersco.re") ? `<div class="${"peertube-container svelte-rt5t1v"}"><iframe width="${"720"}" height="${"480"}"${(0, import_index_c41c42e8.f)("src", streamUrl, 0)} frameborder="${"no"}" color="${"#ffffff"}" allow="${"autoplay; fullscreen"}" sandbox="${"allow-same-origin allow-scripts allow-popups"}" allowfullscreen class="${"svelte-rt5t1v"}"></iframe></div>` : ``}`}`}</div>
</div>`;
});
var bulletinBoardEvent_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => ".event.svelte-1xm1bfg.svelte-1xm1bfg{display:flex;margin-bottom:40px;min-height:200px}.event.svelte-1xm1bfg .image-container.svelte-1xm1bfg{width:50%}.event.svelte-1xm1bfg .image-container img.svelte-1xm1bfg{max-width:100%}.event.svelte-1xm1bfg .text-container.svelte-1xm1bfg{padding-left:10px;width:50%}.event.svelte-1xm1bfg .text-container .date.svelte-1xm1bfg{background:#221f20;color:#f5f4ee;margin-bottom:1em;display:inline-block}.event.svelte-1xm1bfg .text-container .upcoming.svelte-1xm1bfg{background:#f5f4ee;color:#221f20;margin-bottom:0.5em;display:inline-block}.event.svelte-1xm1bfg .text-container .title.svelte-1xm1bfg{margin-bottom:2em}")();
const css$8 = {
  code: ".event.svelte-1xm1bfg.svelte-1xm1bfg{display:flex;margin-bottom:40px;min-height:200px}.event.svelte-1xm1bfg .image-container.svelte-1xm1bfg{width:50%}.event.svelte-1xm1bfg .image-container img.svelte-1xm1bfg{max-width:100%}.event.svelte-1xm1bfg .text-container.svelte-1xm1bfg{padding-left:10px;width:50%}.event.svelte-1xm1bfg .text-container .date.svelte-1xm1bfg{background:#221f20;color:#f5f4ee;margin-bottom:1em;display:inline-block}.event.svelte-1xm1bfg .text-container .upcoming.svelte-1xm1bfg{background:#f5f4ee;color:#221f20;margin-bottom:0.5em;display:inline-block}.event.svelte-1xm1bfg .text-container .title.svelte-1xm1bfg{margin-bottom:2em}",
  map: null
};
const Bulletin_board_event = (0, import_index_c41c42e8.c)(($$result, $$props, $$bindings, slots) => {
  let { event = {} } = $$props;
  if ($$props.event === void 0 && $$bindings.event && event !== void 0)
    $$bindings.event(event);
  $$result.css.add(css$8);
  return `<div class="${"event svelte-1xm1bfg"}">${``}
</div>`;
});
var ArticleBox_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => "button.svelte-pznsc8.svelte-pznsc8{all:unset}.return-button.svelte-pznsc8.svelte-pznsc8{position:fixed;top:40px;left:20px;background:#f5f4ee;color:#221f20;padding:5px;font-size:12px;z-index:100000;cursor:pointer}.viewer-count.svelte-pznsc8.svelte-pznsc8{position:absolute;top:60px;left:50%;transform:translateX(-50%);color:#f5f4ee;font-size:12px;z-index:100000}.article.svelte-pznsc8.svelte-pznsc8{position:fixed;top:0;left:0;width:100%;height:100%;background:#221f20;z-index:10000;display:flex;padding-top:60px;padding-bottom:80px;justify-content:center;cursor:pointer;transition:transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)}.article.svelte-pznsc8 .inner.svelte-pznsc8{background:#dedcd5;color:#221f20;width:800px;max-width:90%;z-index:10000;padding:20px;overflow-y:scroll;font-size:14px;cursor:default}@media(max-width: 800px){.article.svelte-pznsc8 .inner.svelte-pznsc8{width:90%}}.article.pushed.svelte-pznsc8.svelte-pznsc8{transform:translateY(240px)}.article img{max-width:100%}.video.svelte-pznsc8.svelte-pznsc8{position:fixed;top:0;left:0;width:100%;height:100%;background:#221f20;z-index:10000;display:flex;padding-top:60px;padding-bottom:60px;justify-content:center;align-items:center;transition:transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);cursor:pointer}.video.pushed.svelte-pznsc8.svelte-pznsc8{transform:translateY(240px)}.info-text.svelte-pznsc8.svelte-pznsc8{position:fixed;bottom:20px;left:20px;background:#221f20;z-index:10000;display:flex;padding:10px;font-size:14px;color:#f5f4ee;border:1px solid #f5f4ee}.bulletin-board.svelte-pznsc8.svelte-pznsc8{position:fixed;top:0;left:0;width:100%;height:100%;background:#221f20;z-index:10000;display:flex;padding-top:60px;padding-bottom:80px;justify-content:center;cursor:pointer;transition:transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)}.bulletin-board.svelte-pznsc8 .inner.svelte-pznsc8{background:#dedcd5;color:#221f20;width:800px;max-width:90%;z-index:10000;padding:20px;overflow-y:scroll;font-size:14px;cursor:default}.bulletin-board.svelte-pznsc8 .inner .bulletin-board-actions.svelte-pznsc8{margin-top:20px;margin-bottom:20px;display:inline-block}.bulletin-board.pushed.svelte-pznsc8.svelte-pznsc8{transform:translateY(240px)}")();
const css$7 = {
  code: "button.svelte-pznsc8.svelte-pznsc8{all:unset}.return-button.svelte-pznsc8.svelte-pznsc8{position:fixed;top:40px;left:20px;background:#f5f4ee;color:#221f20;padding:5px;font-size:12px;z-index:100000;cursor:pointer}.viewer-count.svelte-pznsc8.svelte-pznsc8{position:absolute;top:60px;left:50%;transform:translateX(-50%);color:#f5f4ee;font-size:12px;z-index:100000}.article.svelte-pznsc8.svelte-pznsc8{position:fixed;top:0;left:0;width:100%;height:100%;background:#221f20;z-index:10000;display:flex;padding-top:60px;padding-bottom:80px;justify-content:center;cursor:pointer;transition:transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)}.article.svelte-pznsc8 .inner.svelte-pznsc8{background:#dedcd5;color:#221f20;width:800px;max-width:90%;z-index:10000;padding:20px;overflow-y:scroll;font-size:14px;cursor:default}@media(max-width: 800px){.article.svelte-pznsc8 .inner.svelte-pznsc8{width:90%}}.article.pushed.svelte-pznsc8.svelte-pznsc8{transform:translateY(240px)}.article img{max-width:100%}.video.svelte-pznsc8.svelte-pznsc8{position:fixed;top:0;left:0;width:100%;height:100%;background:#221f20;z-index:10000;display:flex;padding-top:60px;padding-bottom:60px;justify-content:center;align-items:center;transition:transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);cursor:pointer}.video.pushed.svelte-pznsc8.svelte-pznsc8{transform:translateY(240px)}.info-text.svelte-pznsc8.svelte-pznsc8{position:fixed;bottom:20px;left:20px;background:#221f20;z-index:10000;display:flex;padding:10px;font-size:14px;color:#f5f4ee;border:1px solid #f5f4ee}.bulletin-board.svelte-pznsc8.svelte-pznsc8{position:fixed;top:0;left:0;width:100%;height:100%;background:#221f20;z-index:10000;display:flex;padding-top:60px;padding-bottom:80px;justify-content:center;cursor:pointer;transition:transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)}.bulletin-board.svelte-pznsc8 .inner.svelte-pznsc8{background:#dedcd5;color:#221f20;width:800px;max-width:90%;z-index:10000;padding:20px;overflow-y:scroll;font-size:14px;cursor:default}.bulletin-board.svelte-pznsc8 .inner .bulletin-board-actions.svelte-pznsc8{margin-top:20px;margin-bottom:20px;display:inline-block}.bulletin-board.pushed.svelte-pznsc8.svelte-pznsc8{transform:translateY(240px)}",
  map: null
};
const ArticleBox = (0, import_index_c41c42e8.c)(($$result, $$props, $$bindings, slots) => {
  let $players, $$unsubscribe_players;
  let $trayOpen, $$unsubscribe_trayOpen;
  $$unsubscribe_players = (0, import_index_c41c42e8.a)(import_movement_33798768.k, (value) => $players = value);
  $$unsubscribe_trayOpen = (0, import_index_c41c42e8.a)(import_movement_33798768.t, (value) => $trayOpen = value);
  let { article = {} } = $$props;
  let viewCount = 0;
  let viewCountText = "";
  (0, import_index_c41c42e8.o)(async () => {
    (0, import_movement_33798768.m)();
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
  return `${article.contentType === "video" ? `<div aria-live="${"polite"}" class="${"viewer-count svelte-pznsc8"}">${(0, import_index_c41c42e8.e)(viewCountText)}</div>` : ``}

<button class="${"return-button svelte-pznsc8"}" aria-label="${"Return"}">Return
</button>

${article.contentType === "video" ? `<div class="${["video svelte-pznsc8", $trayOpen ? "pushed" : ""].join(" ").trim()}" aria-live="${"polite"}">${(0, import_index_c41c42e8.v)(VideoPlayer, "VideoPlayer").$$render($$result, { streamUrl: article.videoUrl }, {}, {})}</div>` : `${article.contentType === "text" ? `${(0, import_has.default)(article, "content.content") ? `<div class="${["article svelte-pznsc8", $trayOpen ? "pushed" : ""].join(" ").trim()}" aria-live="${"polite"}"><div class="${"inner svelte-pznsc8"}">${(0, import_index_c41c42e8.v)(import_movement_33798768.B, "Blocks").$$render($$result, { blocks: article.content.content }, {}, {})}</div></div>` : ``}` : `${article.contentType === "importedPost" ? `<div class="${["article svelte-pznsc8", $trayOpen ? "pushed" : ""].join(" ").trim()}" aria-live="${"polite"}"><div class="${"inner svelte-pznsc8"}">${``}</div></div>` : `${article.isBulletinBoard ? `<div class="${["bulletin-board svelte-pznsc8", $trayOpen ? "pushed" : ""].join(" ").trim()}" aria-live="${"polite"}"><div class="${"inner svelte-pznsc8"}"><h1>Welcome to the Bulletin Board</h1>
      <div class="${"bulletin-board-actions svelte-pznsc8"}"></div>
      <div class="${"bulletin-board-events"}">${(0, import_index_c41c42e8.b)(article.events, (event) => {
    return `${(0, import_index_c41c42e8.v)(Bulletin_board_event, "BulletinBoardEvent").$$render($$result, { event }, {}, {})}`;
  })}</div></div></div>` : ``}`}`}`}

${article.infoText ? `<div class="${"info-text svelte-pznsc8"}">${(0, import_index_c41c42e8.e)(article.infoText)}</div>` : ``}`;
});
var RoomDialog_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => ".room-dialog-box.svelte-p2qmve.svelte-p2qmve{position:fixed;bottom:20px;left:20px;padding:15px;background:#e8eae6;color:#221f20;border:1px solid #221f20;z-index:1000;user-select:none}@media(max-width: 800px){.room-dialog-box.svelte-p2qmve.svelte-p2qmve{bottom:unset;top:40px;left:5px;max-width:calc(100% - 10px)}}.choice.svelte-p2qmve.svelte-p2qmve{display:flex;cursor:pointer;outline-color:#221f20;outline-width:1px}.choice.svelte-p2qmve .marker.svelte-p2qmve{opacity:0;width:1em;text-align:center}.choice.svelte-p2qmve:hover .marker.svelte-p2qmve,.choice.svelte-p2qmve:focus .marker.svelte-p2qmve{opacity:1}")();
const css$6 = {
  code: ".room-dialog-box.svelte-p2qmve.svelte-p2qmve{position:fixed;bottom:20px;left:20px;padding:15px;background:#e8eae6;color:#221f20;border:1px solid #221f20;z-index:1000;user-select:none}@media(max-width: 800px){.room-dialog-box.svelte-p2qmve.svelte-p2qmve{bottom:unset;top:40px;left:5px;max-width:calc(100% - 10px)}}.choice.svelte-p2qmve.svelte-p2qmve{display:flex;cursor:pointer;outline-color:#221f20;outline-width:1px}.choice.svelte-p2qmve .marker.svelte-p2qmve{opacity:0;width:1em;text-align:center}.choice.svelte-p2qmve:hover .marker.svelte-p2qmve,.choice.svelte-p2qmve:focus .marker.svelte-p2qmve{opacity:1}",
  map: null
};
const RoomDialog = (0, import_index_c41c42e8.c)(($$result, $$props, $$bindings, slots) => {
  (0, import_index_c41c42e8.h)();
  let { text = "" } = $$props;
  let { roomId = "" } = $$props;
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  if ($$props.roomId === void 0 && $$bindings.roomId && roomId !== void 0)
    $$bindings.roomId(roomId);
  $$result.css.add(css$6);
  return `<div class="${"room-dialog-box svelte-p2qmve"}"><div>${(0, import_index_c41c42e8.e)(text)}</div>
  <div class="${"multiple-choice"}"><div class="${"choice svelte-p2qmve"}" tabindex="${"0"}" autofocus><div class="${"marker svelte-p2qmve"}">\u25B8</div>
      Yes
    </div>
    <div class="${"choice svelte-p2qmve"}" tabindex="${"0"}"><div class="${"marker svelte-p2qmve"}">\u25B8</div>
      No
    </div></div>
</div>`;
});
var RoomEntryBox_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => ".caption-container.svelte-ukizaq{position:fixed;bottom:20px;left:20px;z-index:1000}")();
const css$5 = {
  code: ".caption-container.svelte-ukizaq{position:fixed;bottom:20px;left:20px;z-index:1000}",
  map: null
};
const RoomEntryBox = (0, import_index_c41c42e8.c)(($$result, $$props, $$bindings, slots) => {
  (0, import_index_c41c42e8.h)();
  let { roomIntent: roomIntent2 = "" } = $$props;
  let { roomTitle = "" } = $$props;
  if ($$props.roomIntent === void 0 && $$bindings.roomIntent && roomIntent2 !== void 0)
    $$bindings.roomIntent(roomIntent2);
  if ($$props.roomTitle === void 0 && $$bindings.roomTitle && roomTitle !== void 0)
    $$bindings.roomTitle(roomTitle);
  $$result.css.add(css$5);
  return `<div class="${"caption-container svelte-ukizaq"}">${(0, import_index_c41c42e8.v)(RoomDialog, "RoomDialog").$$render($$result, {
    text: `Go to ${roomTitle}?`,
    roomId: roomIntent2
  }, {}, {})}
</div>`;
});
var ObjectDialog_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => ".object-dialog-box.svelte-spoley.svelte-spoley{position:fixed;bottom:20px;left:20px;padding:15px;background:#e8eae6;color:#221f20;border:1px solid #221f20;z-index:1000;user-select:none}@media(max-width: 800px){.object-dialog-box.svelte-spoley.svelte-spoley{bottom:unset;top:40px;left:5px;max-width:calc(100% - 10px)}}.choice.svelte-spoley.svelte-spoley{display:flex;cursor:pointer;outline-color:#221f20;outline-width:1px}.choice.svelte-spoley .marker.svelte-spoley{opacity:0;width:1em;text-align:center}.choice.svelte-spoley:hover .marker.svelte-spoley,.choice.svelte-spoley:focus .marker.svelte-spoley{opacity:1}")();
const css$4 = {
  code: ".object-dialog-box.svelte-spoley.svelte-spoley{position:fixed;bottom:20px;left:20px;padding:15px;background:#e8eae6;color:#221f20;border:1px solid #221f20;z-index:1000;user-select:none}@media(max-width: 800px){.object-dialog-box.svelte-spoley.svelte-spoley{bottom:unset;top:40px;left:5px;max-width:calc(100% - 10px)}}.choice.svelte-spoley.svelte-spoley{display:flex;cursor:pointer;outline-color:#221f20;outline-width:1px}.choice.svelte-spoley .marker.svelte-spoley{opacity:0;width:1em;text-align:center}.choice.svelte-spoley:hover .marker.svelte-spoley,.choice.svelte-spoley:focus .marker.svelte-spoley{opacity:1}",
  map: null
};
const ObjectDialog = (0, import_index_c41c42e8.c)(($$result, $$props, $$bindings, slots) => {
  (0, import_index_c41c42e8.h)();
  let { text = "" } = $$props;
  let { objectId = "" } = $$props;
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  if ($$props.objectId === void 0 && $$bindings.objectId && objectId !== void 0)
    $$bindings.objectId(objectId);
  $$result.css.add(css$4);
  return `<div class="${"object-dialog-box svelte-spoley"}"><div>${(0, import_index_c41c42e8.e)(text)}</div>
  <div class="${"multiple-choice"}"><div class="${"choice svelte-spoley"}" tabindex="${"0"}" autofocus><div class="${"marker svelte-spoley"}">\u25B8</div>
      Yes
    </div>
    <div class="${"choice svelte-spoley"}" tabindex="${"0"}"><div class="${"marker svelte-spoley"}">\u25B8</div>
      No
    </div></div>
</div>`;
});
var ObjectInspectionBox_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => ".caption-container.svelte-ukizaq{position:fixed;bottom:20px;left:20px;z-index:1000}")();
const css$3 = {
  code: ".caption-container.svelte-ukizaq{position:fixed;bottom:20px;left:20px;z-index:1000}",
  map: null
};
const ObjectInspectionBox = (0, import_index_c41c42e8.c)(($$result, $$props, $$bindings, slots) => {
  (0, import_index_c41c42e8.h)();
  let { objectIntent: objectIntent2 = "" } = $$props;
  let { objectTitle = "" } = $$props;
  if ($$props.objectIntent === void 0 && $$bindings.objectIntent && objectIntent2 !== void 0)
    $$bindings.objectIntent(objectIntent2);
  if ($$props.objectTitle === void 0 && $$bindings.objectTitle && objectTitle !== void 0)
    $$bindings.objectTitle(objectTitle);
  $$result.css.add(css$3);
  return `<div class="${"caption-container svelte-ukizaq"}">${(0, import_index_c41c42e8.e)(objectTitle)}
  ${(0, import_index_c41c42e8.v)(ObjectDialog, "ObjectDialog").$$render($$result, {
    text: `Look at ${objectTitle}?`,
    objectId: objectIntent2
  }, {}, {})}
</div>`;
});
var triangleDown_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => "svg.svelte-fiesz8.svelte-fiesz8{transform:rotate(270deg)}svg.svelte-fiesz8 path.svelte-fiesz8{fill:#221f20}")();
var Caption_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => ".caption-container.svelte-ajuidy{position:fixed;bottom:20px;left:20px;z-index:100000;max-width:520px;display:flex}@media(max-width: 800px){.caption-container.svelte-ajuidy{bottom:unset;top:40px;left:5px;max-width:calc(100% - 10px)}}.caption-box.svelte-ajuidy{padding:15px;background:#f5f4ee;color:#221f20;border:1px solid #221f20;z-index:1000;font-size:14px;padding-bottom:0;cursor:pointer}.next-caption.svelte-ajuidy{padding-left:15px;padding-right:15px;background:#dedcd5;color:#221f20;border:1px solid #221f20;z-index:1000;font-size:14px;padding-bottom:0;cursor:pointer;margin-left:10px;display:flex;align-items:center;justify-content:center}")();
var Chat_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => '.chat-container.svelte-423k25.svelte-423k25{right:20px;bottom:20px;position:fixed;width:300px;z-index:10000}@media(max-width: 800px){.chat-container.svelte-423k25.svelte-423k25{bottom:125px;left:10px;width:calc(100% - 20px)}}.chat-input.svelte-423k25.svelte-423k25{width:100%;display:flex;align-items:center;user-select:none}.chat-input.svelte-423k25 input.svelte-423k25{font-family:"Literata", serif;font-size:14px;float:left;width:100%;display:block;background:#dedcd5;border:1px solid #221f20;color:#221f20;padding:0 10px;border-radius:0;outline:none;height:40px;margin-right:6px}.chat-input.svelte-423k25 button.svelte-423k25{font-family:"Literata", serif;font-size:14px;width:60px;float:right;display:block;background:#dedcd5;border:1px solid #221f20;color:#221f20;outline:none;cursor:pointer;border-radius:0;height:40px;padding:10px;line-height:20px}')();
const css$2 = {
  code: '.chat-container.svelte-423k25.svelte-423k25{right:20px;bottom:20px;position:fixed;width:300px;z-index:10000}@media(max-width: 800px){.chat-container.svelte-423k25.svelte-423k25{bottom:125px;left:10px;width:calc(100% - 20px)}}.chat-input.svelte-423k25.svelte-423k25{width:100%;display:flex;align-items:center;user-select:none}.chat-input.svelte-423k25 input.svelte-423k25{font-family:"Literata", serif;font-size:14px;float:left;width:100%;display:block;background:#dedcd5;border:1px solid #221f20;color:#221f20;padding:0 10px;border-radius:0;outline:none;height:40px;margin-right:6px}.chat-input.svelte-423k25 button.svelte-423k25{font-family:"Literata", serif;font-size:14px;width:60px;float:right;display:block;background:#dedcd5;border:1px solid #221f20;color:#221f20;outline:none;cursor:pointer;border-radius:0;height:40px;padding:10px;line-height:20px}',
  map: null
};
const Chat = (0, import_index_c41c42e8.c)(($$result, $$props, $$bindings, slots) => {
  (0, import_index_c41c42e8.h)();
  let chatInputValue = "";
  let { chatMessages: chatMessages2 = [] } = $$props;
  if ($$props.chatMessages === void 0 && $$bindings.chatMessages && chatMessages2 !== void 0)
    $$bindings.chatMessages(chatMessages2);
  $$result.css.add(css$2);
  return `<div class="${"chat-container svelte-423k25"}"><div class="${"chat-input svelte-423k25"}"><input placeholder="${"Write a message..."}" type="${"[text]"}" maxlength="${"600"}" class="${"svelte-423k25"}"${(0, import_index_c41c42e8.f)("value", chatInputValue, 0)}>
    <button class="${"svelte-423k25"}">Send</button></div>
</div>`;
});
var PhoneNavigation_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => ".phone-navigation.svelte-1q9tct4.svelte-1q9tct4{position:fixed;bottom:0;left:0;width:100vw;height:120px;backdrop-filter:blur(10px);padding-top:10px;padding-bottom:10px;padding-left:5px;padding-right:5px;cursor:pointer;font-size:22px;z-index:10000;display:flex;user-select:none}.left.svelte-1q9tct4.svelte-1q9tct4{height:calc(100% - 10px);width:calc(30% - 10px);background:#dedcd5;border:1px solid #221f20;margin:5px}.right.svelte-1q9tct4.svelte-1q9tct4{height:calc(100% - 10px);width:calc(30% - 10px);background:#dedcd5;border:1px solid #221f20;margin:5px}.vert.svelte-1q9tct4.svelte-1q9tct4{height:100%;width:40%;display:flex;flex-direction:column}.vert.svelte-1q9tct4 .up.svelte-1q9tct4{height:calc(50% - 10px);width:calc(100% - 10px);background:#dedcd5;border:1px solid #221f20;margin:5px}.vert.svelte-1q9tct4 .up span.svelte-1q9tct4{margin-bottom:10px}.vert.svelte-1q9tct4 .down.svelte-1q9tct4{height:calc(50% - 10px);width:calc(100% - 10px);background:#dedcd5;border:1px solid #221f20;margin:5px}.vert.svelte-1q9tct4 .down span.svelte-1q9tct4{margin-bottom:10px}.key.svelte-1q9tct4.svelte-1q9tct4{display:flex;justify-content:center;align-items:center}.key.svelte-1q9tct4.svelte-1q9tct4:hover,.key.svelte-1q9tct4.svelte-1q9tct4:active{background:#f5f4ee}")();
const css$1 = {
  code: ".phone-navigation.svelte-1q9tct4.svelte-1q9tct4{position:fixed;bottom:0;left:0;width:100vw;height:120px;backdrop-filter:blur(10px);padding-top:10px;padding-bottom:10px;padding-left:5px;padding-right:5px;cursor:pointer;font-size:22px;z-index:10000;display:flex;user-select:none}.left.svelte-1q9tct4.svelte-1q9tct4{height:calc(100% - 10px);width:calc(30% - 10px);background:#dedcd5;border:1px solid #221f20;margin:5px}.right.svelte-1q9tct4.svelte-1q9tct4{height:calc(100% - 10px);width:calc(30% - 10px);background:#dedcd5;border:1px solid #221f20;margin:5px}.vert.svelte-1q9tct4.svelte-1q9tct4{height:100%;width:40%;display:flex;flex-direction:column}.vert.svelte-1q9tct4 .up.svelte-1q9tct4{height:calc(50% - 10px);width:calc(100% - 10px);background:#dedcd5;border:1px solid #221f20;margin:5px}.vert.svelte-1q9tct4 .up span.svelte-1q9tct4{margin-bottom:10px}.vert.svelte-1q9tct4 .down.svelte-1q9tct4{height:calc(50% - 10px);width:calc(100% - 10px);background:#dedcd5;border:1px solid #221f20;margin:5px}.vert.svelte-1q9tct4 .down span.svelte-1q9tct4{margin-bottom:10px}.key.svelte-1q9tct4.svelte-1q9tct4{display:flex;justify-content:center;align-items:center}.key.svelte-1q9tct4.svelte-1q9tct4:hover,.key.svelte-1q9tct4.svelte-1q9tct4:active{background:#f5f4ee}",
  map: null
};
const PhoneNavigation = (0, import_index_c41c42e8.c)(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `<div class="${"phone-navigation svelte-1q9tct4"}"><div class="${"key left svelte-1q9tct4"}"><span>\u2190</span></div>
  <div class="${"vert svelte-1q9tct4"}"><div class="${"key up svelte-1q9tct4"}"><span class="${"svelte-1q9tct4"}">\u2191</span></div>
    <div class="${"key down svelte-1q9tct4"}"><span class="${"svelte-1q9tct4"}">\u2193</span></div></div>
  <div class="${"key right svelte-1q9tct4"}"><span>\u2192</span></div>
</div>`;
});
var index_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => ".viewport.svelte-pgjlfq{height:100vh;width:100vw;position:absolute;top:0;left:0;overflow:hidden;opacity:1;transition:transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);background:#221f20}.viewport.pushed.svelte-pgjlfq{transform:translateY(240px)}")();
const css = {
  code: ".viewport.svelte-pgjlfq{height:100vh;width:100vw;position:absolute;top:0;left:0;overflow:hidden;opacity:1;transition:transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);background:#221f20}.viewport.pushed.svelte-pgjlfq{transform:translateY(240px)}",
  map: null
};
const Routes = (0, import_index_c41c42e8.c)(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_isAuthenticated;
  let $worldObject, $$unsubscribe_worldObject;
  let $currentRoom, $$unsubscribe_currentRoom;
  let $$unsubscribe_profile;
  let $localPlayer, $$unsubscribe_localPlayer;
  let $players, $$unsubscribe_players;
  let $uiState, $$unsubscribe_uiState;
  let $trayOpen, $$unsubscribe_trayOpen;
  let $playSound, $$unsubscribe_playSound;
  let $streams, $$unsubscribe_streams;
  let $focusPlayer, $$unsubscribe_focusPlayer;
  let $activeZone, $$unsubscribe_activeZone;
  let $roomIntent, $$unsubscribe_roomIntent;
  let $objectIntent, $$unsubscribe_objectIntent;
  let $activeArticle, $$unsubscribe_activeArticle;
  let $chatMessages, $$unsubscribe_chatMessages;
  let $isPhone, $$unsubscribe_isPhone;
  $$unsubscribe_isAuthenticated = (0, import_index_c41c42e8.a)(import_movement_33798768.i, (value) => value);
  $$unsubscribe_worldObject = (0, import_index_c41c42e8.a)(import_movement_33798768.w, (value) => $worldObject = value);
  $$unsubscribe_currentRoom = (0, import_index_c41c42e8.a)(import_movement_33798768.c, (value) => $currentRoom = value);
  $$unsubscribe_profile = (0, import_index_c41c42e8.a)(import_movement_33798768.p, (value) => value);
  $$unsubscribe_localPlayer = (0, import_index_c41c42e8.a)(import_movement_33798768.n, (value) => $localPlayer = value);
  $$unsubscribe_players = (0, import_index_c41c42e8.a)(import_movement_33798768.k, (value) => $players = value);
  $$unsubscribe_uiState = (0, import_index_c41c42e8.a)(import_movement_33798768.u, (value) => $uiState = value);
  $$unsubscribe_trayOpen = (0, import_index_c41c42e8.a)(import_movement_33798768.t, (value) => $trayOpen = value);
  $$unsubscribe_playSound = (0, import_index_c41c42e8.a)(import_movement_33798768.d, (value) => $playSound = value);
  $$unsubscribe_streams = (0, import_index_c41c42e8.a)(import_movement_33798768.o, (value) => $streams = value);
  $$unsubscribe_focusPlayer = (0, import_index_c41c42e8.a)(import_movement_33798768.h, (value) => $focusPlayer = value);
  $$unsubscribe_activeZone = (0, import_index_c41c42e8.a)(import_movement_33798768.q, (value) => $activeZone = value);
  $$unsubscribe_roomIntent = (0, import_index_c41c42e8.a)(import_movement_33798768.r, (value) => $roomIntent = value);
  $$unsubscribe_objectIntent = (0, import_index_c41c42e8.a)(import_movement_33798768.v, (value) => $objectIntent = value);
  $$unsubscribe_activeArticle = (0, import_index_c41c42e8.a)(import_movement_33798768.b, (value) => $activeArticle = value);
  $$unsubscribe_chatMessages = (0, import_index_c41c42e8.a)(import_movement_33798768.g, (value) => $chatMessages = value);
  $$unsubscribe_isPhone = (0, import_index_c41c42e8.a)(import_movement_33798768.f, (value) => $isPhone = value);
  let viewportElement = {};
  let avatars = [];
  $$result.css.add(css);
  {
    {
      if ($players[$localPlayer.uuid]) {
        if ($players[$localPlayer.uuid].x || $players[$localPlayer.uuid].x) {
          (0, import_movement_33798768.x)();
          (0, import_movement_33798768.y)();
          (0, import_movement_33798768.z)();
        }
      }
    }
  }
  $$unsubscribe_isAuthenticated();
  $$unsubscribe_worldObject();
  $$unsubscribe_currentRoom();
  $$unsubscribe_profile();
  $$unsubscribe_localPlayer();
  $$unsubscribe_players();
  $$unsubscribe_uiState();
  $$unsubscribe_trayOpen();
  $$unsubscribe_playSound();
  $$unsubscribe_streams();
  $$unsubscribe_focusPlayer();
  $$unsubscribe_activeZone();
  $$unsubscribe_roomIntent();
  $$unsubscribe_objectIntent();
  $$unsubscribe_activeArticle();
  $$unsubscribe_chatMessages();
  $$unsubscribe_isPhone();
  return `
${$uiState == import_movement_33798768.S.ONBOARDING ? `${(0, import_index_c41c42e8.v)(Onboarding, "Onboarding").$$render($$result, { avatars }, {}, {})}` : ``}


${$currentRoom ? `<div class="${["viewport svelte-pgjlfq", $trayOpen ? "pushed" : ""].join(" ").trim()}"${(0, import_index_c41c42e8.f)("this", viewportElement, 0)}>${(0, import_index_c41c42e8.v)(Room, "Room").$$render($$result, { room: $currentRoom }, {}, {
    default: () => {
      return `
      ${(0, import_index_c41c42e8.v)(Players, "Players").$$render($$result, {
        players: $players,
        currentRoomId: $currentRoom._id,
        avatars
      }, {}, {})}
      
      ${(0, import_index_c41c42e8.v)(Objects, "Objects").$$render($$result, {
        objects: (0, import_get.default)($currentRoom, "objects", [])
      }, {}, {})}
      
      ${(0, import_index_c41c42e8.v)(Zones, "Zones").$$render($$result, { zones: (0, import_get.default)($currentRoom, "zones", []) }, {}, {})}
      
      ${(0, import_index_c41c42e8.v)(Portals, "Portals").$$render($$result, {
        portals: (0, import_get.default)($currentRoom, "portals", [])
      }, {}, {})}`;
    }
  })}</div>` : ``}


${(0, import_has.default)($currentRoom, "backgroundSound.asset") && $playSound ? `${(0, import_index_c41c42e8.v)(AmbientAudio, "AmbientAudio").$$render($$result, { soundFile: $currentRoom.backgroundSound }, {}, {})}` : ``}


${(0, import_index_c41c42e8.b)($streams, (stream) => {
    return `${!$focusPlayer && ($currentRoom._id == stream.parentArea._ref || $activeZone._id == stream.parentArea._ref) ? `${(0, import_index_c41c42e8.v)(StreamPlayer, "StreamPlayer").$$render($$result, {
      streamUrl: stream.videoUrl,
      audioOnly: stream.audioOnly,
      title: stream.title
    }, {}, {})}` : ``}`;
  })}


${$roomIntent ? `${(0, import_index_c41c42e8.v)(RoomEntryBox, "RoomEntryBox").$$render($$result, {
    roomIntent: $roomIntent,
    roomTitle: $worldObject[$roomIntent].title
  }, {}, {})}` : ``}


${$objectIntent ? `${(0, import_index_c41c42e8.v)(ObjectInspectionBox, "ObjectInspectionBox").$$render($$result, {
    objectIntent: $objectIntent,
    objectTitle: $currentRoom.objects.find((o) => o._id == $objectIntent).title
  }, {}, {})}` : ``}

${!$focusPlayer && !$trayOpen && !$activeArticle && !$roomIntent && !$objectIntent ? `${``}` : ``}


${$activeArticle ? `${(0, import_index_c41c42e8.v)(ArticleBox, "ArticleBox").$$render($$result, { article: $activeArticle }, {}, {})}` : ``}


${!$focusPlayer && !$trayOpen && !$activeArticle ? `${(0, import_index_c41c42e8.v)(Chat, "Chat").$$render($$result, {
    chatMessages: $chatMessages.filter((m) => m.room === $currentRoom._id)
  }, {}, {})}` : ``}

${$isPhone && !$activeArticle ? `${(0, import_index_c41c42e8.v)(PhoneNavigation, "PhoneNavigation").$$render($$result, {}, {}, {})}` : ``}`;
});
