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
var import_movement_ad82973e = require("../../chunks/movement-ad82973e.js");
var import_get = __toESM(require("lodash/get.js"));
var import_has = __toESM(require("lodash/has.js"));
var import_js_cookie = require("js-cookie");
var import_date_fns = require("date-fns");
var import_sample = __toESM(require("lodash/sample.js"));
var import_howler = require("howler");
var import_get_video_id = __toESM(require("get-video-id"));
var import_inRange = require("lodash/inRange.js");
var import_lodash = require("lodash");
var import_throttle = require("lodash/throttle.js");
var import_html_truncate = require("html-truncate");
var import_bad_words = __toESM(require("bad-words"));
var import_anchorme = __toESM(require("anchorme"));
var import_keycloak_js = require("keycloak-js");
var import_slugify = require("slugify");
var import_client = require("@sanity/client");
var import_block_content_to_html = require("@sanity/block-content-to-html");
var import_image_url = require("@sanity/image-url");
const isAuthenticated = (0, import_movement_ad82973e.w)(false);
const profile = (0, import_movement_ad82973e.w)(false);
var AvatarPicker_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => ".inner.svelte-i1o3ve.svelte-i1o3ve{display:flex;flex-wrap:wrap;margin-top:20px}.inner.svelte-i1o3ve .avatar.svelte-i1o3ve{cursor:pointer;padding:5px;border:2px solid transparent;border-radius:5px}@media(max-width: 800px){.inner.svelte-i1o3ve .avatar.svelte-i1o3ve{padding:10px}}.inner.svelte-i1o3ve .avatar.selected.svelte-i1o3ve{border:2px solid #221f20}")();
const css$j = {
  code: ".inner.svelte-i1o3ve.svelte-i1o3ve{display:flex;flex-wrap:wrap;margin-top:20px}.inner.svelte-i1o3ve .avatar.svelte-i1o3ve{cursor:pointer;padding:5px;border:2px solid transparent;border-radius:5px}@media(max-width: 800px){.inner.svelte-i1o3ve .avatar.svelte-i1o3ve{padding:10px}}.inner.svelte-i1o3ve .avatar.selected.svelte-i1o3ve{border:2px solid #221f20}",
  map: null
};
const AvatarPicker = (0, import_index_c41c42e8.c)(($$result, $$props, $$bindings, slots) => {
  (0, import_index_c41c42e8.h)();
  let { avatars = [] } = $$props;
  let selectedAvatar = (0, import_sample.default)(avatars)._id;
  if ($$props.avatars === void 0 && $$bindings.avatars && avatars !== void 0)
    $$bindings.avatars(avatars);
  $$result.css.add(css$j);
  return `<div class="${"avatar-picker"}"><div>Select your avatar</div>
  <div class="${"inner svelte-i1o3ve"}">${(0, import_index_c41c42e8.b)(avatars, (avatar, i) => {
    return `<div class="${["avatar svelte-i1o3ve", selectedAvatar == avatar._id ? "selected" : ""].join(" ").trim()}" tabindex="${"0"}"><img${(0, import_index_c41c42e8.f)("src", avatar.imageUrl, 0)}${(0, import_index_c41c42e8.f)("alt", avatar.alt, 0)}>
      </div>`;
  })}</div>
</div>`;
});
var Onboarding_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => '.onboarding-screen.svelte-1r2hhvy.svelte-1r2hhvy{position:fixed;top:0;left:0;width:100vw;height:100vh;color:#f5f4ee;display:flex;justify-content:center;align-items:center;z-index:100000;backdrop-filter:blur(10px)}.onboarding-screen.svelte-1r2hhvy .box.svelte-1r2hhvy{font-family:"Literata", serif;padding:40px;width:400px;background:#f5f4ee;color:#221f20;font-size:14px;text-align:center;user-select:none;max-width:90%}button.svelte-1r2hhvy.svelte-1r2hhvy{background:none;color:inherit;border:none;padding:0;font:inherit;cursor:pointer;outline:inherit}.btn.svelte-1r2hhvy.svelte-1r2hhvy{width:100%;background:#dedcd5;padding:10px;margin-top:20px;cursor:pointer;border:1px solid #221f20}.btn.svelte-1r2hhvy.svelte-1r2hhvy:hover{opacity:0.8}.name.svelte-1r2hhvy.svelte-1r2hhvy{margin-top:10px;width:100%;padding:5px;font-size:14px;text-align:center;outline:none;font-family:"Literata", serif}')();
const css$i = {
  code: '.onboarding-screen.svelte-1r2hhvy.svelte-1r2hhvy{position:fixed;top:0;left:0;width:100vw;height:100vh;color:#f5f4ee;display:flex;justify-content:center;align-items:center;z-index:100000;backdrop-filter:blur(10px)}.onboarding-screen.svelte-1r2hhvy .box.svelte-1r2hhvy{font-family:"Literata", serif;padding:40px;width:400px;background:#f5f4ee;color:#221f20;font-size:14px;text-align:center;user-select:none;max-width:90%}button.svelte-1r2hhvy.svelte-1r2hhvy{background:none;color:inherit;border:none;padding:0;font:inherit;cursor:pointer;outline:inherit}.btn.svelte-1r2hhvy.svelte-1r2hhvy{width:100%;background:#dedcd5;padding:10px;margin-top:20px;cursor:pointer;border:1px solid #221f20}.btn.svelte-1r2hhvy.svelte-1r2hhvy:hover{opacity:0.8}.name.svelte-1r2hhvy.svelte-1r2hhvy{margin-top:10px;width:100%;padding:5px;font-size:14px;text-align:center;outline:none;font-family:"Literata", serif}',
  map: null
};
const Onboarding = (0, import_index_c41c42e8.c)(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_isPhone;
  $$unsubscribe_isPhone = (0, import_index_c41c42e8.a)(import_movement_ad82973e.i, (value) => value);
  (0, import_index_c41c42e8.h)();
  let { avatars = [] } = $$props;
  import_movement_ad82973e.i.set((0, import_movement_ad82973e.d)());
  let slides = false;
  let slideIndex = 0;
  let name = "";
  if ($$props.avatars === void 0 && $$bindings.avatars && avatars !== void 0)
    $$bindings.avatars(avatars);
  $$result.css.add(css$i);
  $$unsubscribe_isPhone();
  return `<div class="${"onboarding-screen svelte-1r2hhvy"}"><div class="${"box svelte-1r2hhvy"}">
    ${``}
    
    ${slideIndex === slides.length ? `<div class="${"slide"}" aria-live="${"polite"}" tabindex="${"0"}"><div class="${"name svelte-1r2hhvy"}">What would you like to be called?</div>
        <div class="${"input-container"}"><input class="${"name svelte-1r2hhvy"}" type="${"text"}" placeholder="${"Name"}" autofocus minlength="${"1"}"${(0, import_index_c41c42e8.f)("value", name, 0)}></div>
        <button class="${"btn next svelte-1r2hhvy"}" tabindex="${"0"}">Next</button></div>` : ``}
    
    ${slideIndex === slides.length + 1 ? `<div class="${"slide"}" aria-live="${"polite"}" tabindex="${"0"}"><div class="${"name svelte-1r2hhvy"}">${(0, import_index_c41c42e8.v)(AvatarPicker, "AvatarPicker").$$render($$result, { avatars }, {}, {})}</div>
        <div class="${"btn next svelte-1r2hhvy"}">Enter</div></div>` : ``}</div>
</div>`;
});
var Room_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => ".room.svelte-f2n19i.svelte-f2n19i{position:absolute;top:50%;left:50%;background:#dedcd5;background-repeat:no-repeat;background-size:cover;will-change:transform;transition:transform 0.5s ease-out}.room.svelte-f2n19i video.svelte-f2n19i{width:100%;height:100%;object-fit:cover}.room.svelte-f2n19i iframe.svelte-f2n19i{width:100%;height:100%;border:none}")();
const css$h = {
  code: ".room.svelte-f2n19i.svelte-f2n19i{position:absolute;top:50%;left:50%;background:#dedcd5;background-repeat:no-repeat;background-size:cover;will-change:transform;transition:transform 0.5s ease-out}.room.svelte-f2n19i video.svelte-f2n19i{width:100%;height:100%;object-fit:cover}.room.svelte-f2n19i iframe.svelte-f2n19i{width:100%;height:100%;border:none}",
  map: null
};
const Room = (0, import_index_c41c42e8.c)(($$result, $$props, $$bindings, slots) => {
  let $centeringInlineStyles, $$unsubscribe_centeringInlineStyles;
  $$unsubscribe_centeringInlineStyles = (0, import_index_c41c42e8.a)(import_movement_ad82973e.e, (value) => $centeringInlineStyles = value);
  let { room = {} } = $$props;
  if ($$props.room === void 0 && $$bindings.room && room !== void 0)
    $$bindings.room(room);
  $$result.css.add(css$h);
  $$unsubscribe_centeringInlineStyles();
  return `<div class="${"room svelte-f2n19i"}" id="${"room"}"${(0, import_index_c41c42e8.f)("style", `${room.inlineStyles} ${$centeringInlineStyles}`, 0)} aria-live="${"polite"}">${slots.default ? slots.default({}) : ``}

  ${room.bgVideoUrl ? `<video${(0, import_index_c41c42e8.f)("src", room.bgVideoUrl, 0)} autoplay loop muted class="${"svelte-f2n19i"}"></video>` : ``}
  ${room.backgroundLink ? `<iframe id="${"bg-iframe"}"${(0, import_index_c41c42e8.f)("src", room.backgroundLink, 0)} class="${"svelte-f2n19i"}"></iframe>` : ``}
</div>`;
});
var Avatar_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => ".avatar.svelte-1k7yzd.svelte-1k7yzd{height:32px;width:32px;position:absolute;top:0;left:0;z-index:100;opacity:0}.avatar.svelte-1k7yzd img.svelte-1k7yzd{width:100%;height:100%;image-rendering:pixelated}.avatar.shown.svelte-1k7yzd.svelte-1k7yzd{opacity:1}.avatar.blinking.svelte-1k7yzd.svelte-1k7yzd{animation:svelte-1k7yzd-blink 0.65s infinite;animation-timing-function:ease-out}.avatar.self.svelte-1k7yzd.svelte-1k7yzd{z-index:100000}@keyframes svelte-1k7yzd-blink{0%{opacity:0}50%{opacity:1}100%{opacity:0}}")();
const css$g = {
  code: ".avatar.svelte-1k7yzd.svelte-1k7yzd{height:32px;width:32px;position:absolute;top:0;left:0;z-index:100;opacity:0}.avatar.svelte-1k7yzd img.svelte-1k7yzd{width:100%;height:100%;image-rendering:pixelated}.avatar.shown.svelte-1k7yzd.svelte-1k7yzd{opacity:1}.avatar.blinking.svelte-1k7yzd.svelte-1k7yzd{animation:svelte-1k7yzd-blink 0.65s infinite;animation-timing-function:ease-out}.avatar.self.svelte-1k7yzd.svelte-1k7yzd{z-index:100000}@keyframes svelte-1k7yzd-blink{0%{opacity:0}50%{opacity:1}100%{opacity:0}}",
  map: null
};
const Avatar = (0, import_index_c41c42e8.c)(($$result, $$props, $$bindings, slots) => {
  let $isPhone, $$unsubscribe_isPhone;
  let $chatMessages, $$unsubscribe_chatMessages;
  let $focusPlayer, $$unsubscribe_focusPlayer;
  $$unsubscribe_isPhone = (0, import_index_c41c42e8.a)(import_movement_ad82973e.i, (value) => $isPhone = value);
  $$unsubscribe_chatMessages = (0, import_index_c41c42e8.a)(import_movement_ad82973e.f, (value) => $chatMessages = value);
  $$unsubscribe_focusPlayer = (0, import_index_c41c42e8.a)(import_movement_ad82973e.g, (value) => $focusPlayer = value);
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
  if (avatar === void 0) {
    avatar = (0, import_sample.default)(avatars);
  }
  let gridPosY, gridPosX;
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
    import_movement_ad82973e.e.set(`transform: translateX(-${gridPosX}px) translateY(-${gridPosY}px);`);
  };
  if ($$props.player === void 0 && $$bindings.player && player !== void 0)
    $$bindings.player(player);
  if ($$props.avatars === void 0 && $$bindings.avatars && avatars !== void 0)
    $$bindings.avatars(avatars);
  if ($$props.key === void 0 && $$bindings.key && key !== void 0)
    $$bindings.key(key);
  $$result.css.add(css$g);
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
      gridPosY = player.y * import_movement_ad82973e.G;
      gridPosX = player.x * import_movement_ad82973e.G;
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
    "avatar svelte-1k7yzd",
    (!$focusPlayer || player.self ? "shown" : "") + " " + (player.self ? "self" : "") + " " + ($focusPlayer && player.self ? "blinking" : "")
  ].join(" ").trim()}"${(0, import_index_c41c42e8.f)("id", key, 0)}${(0, import_index_c41c42e8.f)("alt", player.name, 0)}${(0, import_index_c41c42e8.f)("style", "transform: translateY(" + gridPosY + "px) translateX(" + gridPosX + "px)", 0)} role="${"uiitem"}"${(0, import_index_c41c42e8.f)("this", avatarEl, 0)}><img${(0, import_index_c41c42e8.f)("src", avatar && avatar.imageUrl ? avatar.imageUrl : (0, import_sample.default)(avatars).imageUrl, 0)}${(0, import_index_c41c42e8.f)("alt", avatar.alt, 0)} class="${"svelte-1k7yzd"}">
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
  return `<div role="${"group"}">${(0, import_index_c41c42e8.b)(Object.entries(players2), ([key, player]) => {
    return `${player.room === currentRoomId && !player.inTransit ? `${(0, import_index_c41c42e8.v)(Avatar, "Avatar").$$render($$result, { player, key, avatars }, {}, {})}` : ``}`;
  })}</div>`;
});
var Object_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => ".object.svelte-y80ji7.svelte-y80ji7{height:32px;width:32px;overflow:hidden;position:absolute;top:0;left:0;z-index:1}.object.svelte-y80ji7 img.svelte-y80ji7{height:100%;width:100%;object-fit:cover}.object.static.svelte-y80ji7.svelte-y80ji7{pointer-events:none;cursor:default}")();
const css$f = {
  code: ".object.svelte-y80ji7.svelte-y80ji7{height:32px;width:32px;overflow:hidden;position:absolute;top:0;left:0;z-index:1}.object.svelte-y80ji7 img.svelte-y80ji7{height:100%;width:100%;object-fit:cover}.object.static.svelte-y80ji7.svelte-y80ji7{pointer-events:none;cursor:default}",
  map: null
};
const Object$1 = (0, import_index_c41c42e8.c)(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_currentRoom;
  let $showLabels, $$unsubscribe_showLabels;
  $$unsubscribe_currentRoom = (0, import_index_c41c42e8.a)(import_movement_ad82973e.c, (value) => value);
  $$unsubscribe_showLabels = (0, import_index_c41c42e8.a)(import_movement_ad82973e.s, (value) => $showLabels = value);
  let { object = {} } = $$props;
  let objectEl = {};
  let label = {};
  let gridPosY = object.y * import_movement_ad82973e.G;
  let gridPosX = object.x * import_movement_ad82973e.G;
  let gridWidth = (0, import_get.default)(object, "dimensions.width", 1) * import_movement_ad82973e.G;
  let gridHeight = (0, import_get.default)(object, "dimensions.height", 1) * import_movement_ad82973e.G;
  const inlineStyles = `transform: translateY(${gridPosY}px) translateX(${gridPosX}px); width: ${gridWidth}px; height: ${gridHeight}px;`;
  (0, import_index_c41c42e8.h)();
  if ($$props.object === void 0 && $$bindings.object && object !== void 0)
    $$bindings.object(object);
  $$result.css.add(css$f);
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
  $$unsubscribe_currentRoom();
  $$unsubscribe_showLabels();
  return `${!object.iframeEmbed ? `<div class="${[
    "object svelte-y80ji7",
    (object.static ? "static" : "") + " " + (object.iconImage ? "image" : "")
  ].join(" ").trim()}"${(0, import_index_c41c42e8.f)("id", object._id, 0)}${(0, import_index_c41c42e8.f)("style", inlineStyles, 0)} tabindex="${"0"}"${(0, import_index_c41c42e8.f)("aria-label", object.static ? "A static image of a " + object.title : "Inspect " + object.title, 0)} role="${"uiitem"}"${(0, import_index_c41c42e8.f)("this", objectEl, 0)}>${object.iconImage ? `<img${(0, import_index_c41c42e8.f)("src", (0, import_movement_ad82973e.h)(object.iconImage.asset._ref).url(), 0)}${(0, import_index_c41c42e8.f)("alt", object.alt, 0)} class="${"svelte-y80ji7"}">` : ``}</div>` : `${!object.externalLink ? `<div class="${["object svelte-y80ji7", object.static ? "static" : ""].join(" ").trim()}"${(0, import_index_c41c42e8.f)("style", inlineStyles, 0)}>${(0, import_index_c41c42e8.v)(import_movement_ad82973e.B, "Blocks").$$render($$result, { blocks: object.content.content }, {}, {})}</div>` : ``}`}`;
});
const Objects = (0, import_index_c41c42e8.c)(($$result, $$props, $$bindings, slots) => {
  let $focusPlayer, $$unsubscribe_focusPlayer;
  $$unsubscribe_focusPlayer = (0, import_index_c41c42e8.a)(import_movement_ad82973e.g, (value) => $focusPlayer = value);
  let { objects = {} } = $$props;
  if ($$props.objects === void 0 && $$bindings.objects && objects !== void 0)
    $$bindings.objects(objects);
  $$unsubscribe_focusPlayer();
  return `${!$focusPlayer ? `<div role="${"objects"}"><div role="${"group"}">${(0, import_index_c41c42e8.b)(objects, (object) => {
    return `${(0, import_index_c41c42e8.v)(Object$1, "Object").$$render($$result, { object }, {}, {})}`;
  })}</div></div>` : ``}`;
});
var Zone_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => ".zone.svelte-8z8z6b.svelte-8z8z6b{height:32px;width:32px;position:absolute;top:0;left:0;cursor:pointer;transition:opacity 0.5s cubic-bezier(0.23, 1, 0.32, 1);pointer-events:none}.zone.svelte-8z8z6b.svelte-8z8z6b:hover{background:transparent}.zone.svelte-8z8z6b img.svelte-8z8z6b{height:100%;width:100%;object-fit:cover;max-height:100%}.zone.svelte-8z8z6b video.svelte-8z8z6b{width:100%;height:100%;object-fit:cover}")();
const css$e = {
  code: ".zone.svelte-8z8z6b.svelte-8z8z6b{height:32px;width:32px;position:absolute;top:0;left:0;cursor:pointer;transition:opacity 0.5s cubic-bezier(0.23, 1, 0.32, 1);pointer-events:none}.zone.svelte-8z8z6b.svelte-8z8z6b:hover{background:transparent}.zone.svelte-8z8z6b img.svelte-8z8z6b{height:100%;width:100%;object-fit:cover;max-height:100%}.zone.svelte-8z8z6b video.svelte-8z8z6b{width:100%;height:100%;object-fit:cover}",
  map: null
};
const Zone = (0, import_index_c41c42e8.c)(($$result, $$props, $$bindings, slots) => {
  let $showLabels, $$unsubscribe_showLabels;
  $$unsubscribe_showLabels = (0, import_index_c41c42e8.a)(import_movement_ad82973e.s, (value) => $showLabels = value);
  let { zone = {} } = $$props;
  let zoneEl = {};
  let label = {};
  let gridPosY = zone.y * import_movement_ad82973e.G;
  let gridPosX = zone.x * import_movement_ad82973e.G;
  let gridWidth = (0, import_get.default)(zone, "dimensions.width", 1) * import_movement_ad82973e.G;
  let gridHeight = (0, import_get.default)(zone, "dimensions.height", 1) * import_movement_ad82973e.G;
  const inlineStyles = `transform: translateY(${gridPosY}px) translateX(${gridPosX}px); width: ${gridWidth}px; height: ${gridHeight}px;};`;
  if ($$props.zone === void 0 && $$bindings.zone && zone !== void 0)
    $$bindings.zone(zone);
  $$result.css.add(css$e);
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
  return `<div class="${"zone svelte-8z8z6b"}"${(0, import_index_c41c42e8.f)("id", zone._id, 0)}${(0, import_index_c41c42e8.f)("alt", zone.title, 0)}${(0, import_index_c41c42e8.f)("style", inlineStyles, 0)} role="${"uiitem"}"${(0, import_index_c41c42e8.f)("this", zoneEl, 0)}>${zone.bgVideoUrl ? `<video${(0, import_index_c41c42e8.f)("src", zone.bgVideoUrl, 0)} autoplay loop muted class="${"svelte-8z8z6b"}"></video>` : `${zone.backgroundImage ? `<img${(0, import_index_c41c42e8.f)("src", (0, import_movement_ad82973e.h)(zone.backgroundImage).quality(100).url(), 0)} class="${"svelte-8z8z6b"}">` : ``}`}
</div>`;
});
const Zones = (0, import_index_c41c42e8.c)(($$result, $$props, $$bindings, slots) => {
  let $focusPlayer, $$unsubscribe_focusPlayer;
  $$unsubscribe_focusPlayer = (0, import_index_c41c42e8.a)(import_movement_ad82973e.g, (value) => $focusPlayer = value);
  let { zones = {} } = $$props;
  if ($$props.zones === void 0 && $$bindings.zones && zones !== void 0)
    $$bindings.zones(zones);
  $$unsubscribe_focusPlayer();
  return `${!$focusPlayer ? `<div role="${"group"}">${(0, import_index_c41c42e8.b)(zones, (zone) => {
    return `${(0, import_index_c41c42e8.v)(Zone, "Zone").$$render($$result, { zone }, {}, {})}`;
  })}</div>` : ``}`;
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
var Portal_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => ".portal.svelte-1kgpwjb{height:32px;width:32px;position:absolute;top:0;left:0;z-index:1;cursor:pointer;transition:opacity 0.5s cubic-bezier(0.23, 1, 0.32, 1);pointer-events:none;background-size:contain;background-repeat:no-repeat}")();
const css$d = {
  code: ".portal.svelte-1kgpwjb{height:32px;width:32px;position:absolute;top:0;left:0;z-index:1;cursor:pointer;transition:opacity 0.5s cubic-bezier(0.23, 1, 0.32, 1);pointer-events:none;background-size:contain;background-repeat:no-repeat}",
  map: null
};
const Portal = (0, import_index_c41c42e8.c)(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_currentRoom;
  $$unsubscribe_currentRoom = (0, import_index_c41c42e8.a)(import_movement_ad82973e.c, (value) => value);
  let { portal = {} } = $$props;
  let portalEl = {};
  let label = {};
  let gridPosY = portal.y * import_movement_ad82973e.G;
  let gridPosX = portal.x * import_movement_ad82973e.G;
  const inlineStyles = `transform: translateY(${gridPosY}px) translateX(${gridPosX}px); width: ${import_movement_ad82973e.G}px; height: ${import_movement_ad82973e.G}px; background-color: ${(0, import_get.default)(portal, "backgroundColor.hex", "")}; background-image: url("${(0, import_get.default)(portal, "bgImageUrl", "")}");"`;
  (0, import_index_c41c42e8.h)();
  if ($$props.portal === void 0 && $$bindings.portal && portal !== void 0)
    $$bindings.portal(portal);
  $$result.css.add(css$d);
  {
    {
      if (label.popper) {
        label.show();
      }
    }
  }
  $$unsubscribe_currentRoom();
  return `${!portal.restricted ? `<div class="${"portal svelte-1kgpwjb"}"${(0, import_index_c41c42e8.f)("id", portal._id, 0)}${(0, import_index_c41c42e8.f)("style", inlineStyles, 0)} tabindex="${"0"}"${(0, import_index_c41c42e8.f)("aria-label", "Go to " + portal.title, 0)} role="${"uiitem"}"${(0, import_index_c41c42e8.f)("this", portalEl, 0)}>${portal.iconImage ? `<img${(0, import_index_c41c42e8.f)("src", (0, import_movement_ad82973e.h)(portal.iconImage).quality(100).height(100).url(), 0)}${(0, import_index_c41c42e8.f)("alt", portal.alt, 0)}>` : ``}</div>` : ``}`;
});
const Portals = (0, import_index_c41c42e8.c)(($$result, $$props, $$bindings, slots) => {
  let $focusPlayer, $$unsubscribe_focusPlayer;
  $$unsubscribe_focusPlayer = (0, import_index_c41c42e8.a)(import_movement_ad82973e.g, (value) => $focusPlayer = value);
  (0, import_index_c41c42e8.h)();
  let { portals = {} } = $$props;
  if ($$props.portals === void 0 && $$bindings.portals && portals !== void 0)
    $$bindings.portals(portals);
  $$unsubscribe_focusPlayer();
  return `${!$focusPlayer ? `<div role="${"portals"}"><div role="${"group"}">${(0, import_index_c41c42e8.b)(portals, (portal) => {
    return `${(0, import_index_c41c42e8.v)(Portal, "Portal").$$render($$result, { portal }, {}, {})}`;
  })}</div></div>` : ``}`;
});
var pauseBars_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => "svg.svelte-192w1ja.svelte-192w1ja{height:15px}svg.svelte-192w1ja path.svelte-192w1ja{fill:#221f20}")();
var StreamPlayer_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => ".stream-container.svelte-1hn1v36.svelte-1hn1v36{position:absolute;top:20px;left:10px;width:40%;border:1px solid #221f20;z-index:10000}.stream-container.audio.svelte-1hn1v36.svelte-1hn1v36{width:360px}@media(max-width: 800px){.stream-container.svelte-1hn1v36.svelte-1hn1v36{position:fixed;left:20px;width:calc(100vw - 40px)}}.stream-container.svelte-1hn1v36 .embed.svelte-1hn1v36{width:100%;background:#f5f4ee;display:flex;padding:5px}.stream-container.svelte-1hn1v36 .embed .peertube-container.svelte-1hn1v36,.stream-container.svelte-1hn1v36 .embed .youtube-container.svelte-1hn1v36,.stream-container.svelte-1hn1v36 .embed .vimeo-container.svelte-1hn1v36{position:relative;padding-bottom:56.25%;height:0;overflow:hidden;width:1080px}.stream-container.svelte-1hn1v36 .embed .peertube-container.hidden.svelte-1hn1v36{display:none}.stream-container.svelte-1hn1v36 .embed .peertube-container iframe.svelte-1hn1v36,.stream-container.svelte-1hn1v36 .embed .youtube-container iframe.svelte-1hn1v36,.stream-container.svelte-1hn1v36 .embed .vimeo-container iframe.svelte-1hn1v36{position:absolute;top:0;left:0;width:100%;height:100%;border:0}.audio-interface.svelte-1hn1v36.svelte-1hn1v36{padding:10px;width:100%}.audio-interface.svelte-1hn1v36 .title.svelte-1hn1v36{width:100%}.audio-interface.svelte-1hn1v36 .controls.svelte-1hn1v36{width:100%;margin-top:10px;display:flex;justify-content:space-between}.audio-interface.svelte-1hn1v36 .controls .control.svelte-1hn1v36{height:40px;width:40px;background:#dedcd5;text-align:center;user-select:none;cursor:pointer;display:flex;justify-content:center;align-items:center}.audio-interface.svelte-1hn1v36 .controls .playbar.svelte-1hn1v36{background:#dedcd5;width:calc(100% - 50px);height:40px}.audio-interface.svelte-1hn1v36 .controls .playbar .progress.svelte-1hn1v36{height:100%;background:#221f20}")();
const css$c = {
  code: ".stream-container.svelte-1hn1v36.svelte-1hn1v36{position:absolute;top:20px;left:10px;width:40%;border:1px solid #221f20;z-index:10000}.stream-container.audio.svelte-1hn1v36.svelte-1hn1v36{width:360px}@media(max-width: 800px){.stream-container.svelte-1hn1v36.svelte-1hn1v36{position:fixed;left:20px;width:calc(100vw - 40px)}}.stream-container.svelte-1hn1v36 .embed.svelte-1hn1v36{width:100%;background:#f5f4ee;display:flex;padding:5px}.stream-container.svelte-1hn1v36 .embed .peertube-container.svelte-1hn1v36,.stream-container.svelte-1hn1v36 .embed .youtube-container.svelte-1hn1v36,.stream-container.svelte-1hn1v36 .embed .vimeo-container.svelte-1hn1v36{position:relative;padding-bottom:56.25%;height:0;overflow:hidden;width:1080px}.stream-container.svelte-1hn1v36 .embed .peertube-container.hidden.svelte-1hn1v36{display:none}.stream-container.svelte-1hn1v36 .embed .peertube-container iframe.svelte-1hn1v36,.stream-container.svelte-1hn1v36 .embed .youtube-container iframe.svelte-1hn1v36,.stream-container.svelte-1hn1v36 .embed .vimeo-container iframe.svelte-1hn1v36{position:absolute;top:0;left:0;width:100%;height:100%;border:0}.audio-interface.svelte-1hn1v36.svelte-1hn1v36{padding:10px;width:100%}.audio-interface.svelte-1hn1v36 .title.svelte-1hn1v36{width:100%}.audio-interface.svelte-1hn1v36 .controls.svelte-1hn1v36{width:100%;margin-top:10px;display:flex;justify-content:space-between}.audio-interface.svelte-1hn1v36 .controls .control.svelte-1hn1v36{height:40px;width:40px;background:#dedcd5;text-align:center;user-select:none;cursor:pointer;display:flex;justify-content:center;align-items:center}.audio-interface.svelte-1hn1v36 .controls .playbar.svelte-1hn1v36{background:#dedcd5;width:calc(100% - 50px);height:40px}.audio-interface.svelte-1hn1v36 .controls .playbar .progress.svelte-1hn1v36{height:100%;background:#221f20}",
  map: null
};
const StreamPlayer = (0, import_index_c41c42e8.c)(($$result, $$props, $$bindings, slots) => {
  let { streamUrl = "" } = $$props;
  let { audioOnly = false } = $$props;
  let { title = "" } = $$props;
  let position = 0;
  if ($$props.streamUrl === void 0 && $$bindings.streamUrl && streamUrl !== void 0)
    $$bindings.streamUrl(streamUrl);
  if ($$props.audioOnly === void 0 && $$bindings.audioOnly && audioOnly !== void 0)
    $$bindings.audioOnly(audioOnly);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  $$result.css.add(css$c);
  return `<div class="${["stream-container svelte-1hn1v36", audioOnly ? "audio" : ""].join(" ").trim()}"><div class="${"embed svelte-1hn1v36"}">${streamUrl.includes("youtube") || streamUrl.includes("youtu.be") ? `<div class="${"youtube-container svelte-1hn1v36"}"><iframe width="${"1920"}" height="${"1280"}"${(0, import_index_c41c42e8.f)("src", "https://www.youtube.com/embed/" + (0, import_get_video_id.default)(streamUrl).id + "?autoplay=1&rel=0&color=white", 0)} frameborder="${"no"}" allow="${"autoplay; fullscreen"}" allowfullscreen class="${"svelte-1hn1v36"}"></iframe></div>` : `${streamUrl.includes("vimeo") ? `<div class="${"vimeo-container svelte-1hn1v36"}"><iframe width="${"720"}" height="${"480"}"${(0, import_index_c41c42e8.f)("src", "https://player.vimeo.com/video/" + (0, import_get_video_id.default)(streamUrl).id + "?autoplay=1", 0)} frameborder="${"no"}" scrolling="${"no"}" byline="${"false"}" color="${"#ffffff"}" allow="${"autoplay; fullscreen"}" allowfullscreen class="${"svelte-1hn1v36"}"></iframe></div>` : `${streamUrl.includes("undersco.re") ? `<div class="${["peertube-container svelte-1hn1v36", audioOnly ? "hidden" : ""].join(" ").trim()}"><iframe class="${"peertube svelte-1hn1v36"}" width="${"1920"}" height="${"1080"}"${(0, import_index_c41c42e8.f)("src", streamUrl + "?api=1", 0)} frameborder="${"no"}" color="${"#ffffff"}" allow="${"autoplay; fullscreen"}" sandbox="${"allow-same-origin allow-scripts allow-popups"}" allowfullscreen></iframe></div>
      ${audioOnly ? `<div class="${"audio-interface svelte-1hn1v36"}"><div class="${"title svelte-1hn1v36"}">${(0, import_index_c41c42e8.e)(title)}</div>
          <div class="${"controls svelte-1hn1v36"}"><div class="${"control svelte-1hn1v36"}">${`${(0, import_index_c41c42e8.v)(import_movement_ad82973e.P, "PlayArrow").$$render($$result, {}, {}, {})}`}</div>
            <div class="${"playbar svelte-1hn1v36"}"><div class="${"progress svelte-1hn1v36"}"${(0, import_index_c41c42e8.f)("style", "width: " + position + "%;", 0)}></div></div></div></div>` : ``}` : ``}`}`}</div>
</div>`;
});
var VideoPlayer_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => ".stream-container.svelte-rt5t1v.svelte-rt5t1v{width:720px}@media(max-width: 800px){.stream-container.svelte-rt5t1v.svelte-rt5t1v{width:90%}}.stream-container.svelte-rt5t1v .embed.svelte-rt5t1v{width:100%;background:black;display:flex;justify-content:center;align-items:center}.stream-container.svelte-rt5t1v .embed .peertube-container.svelte-rt5t1v,.stream-container.svelte-rt5t1v .embed .youtube-container.svelte-rt5t1v,.stream-container.svelte-rt5t1v .embed .vimeo-container.svelte-rt5t1v{position:relative;padding-bottom:56.25%;height:0;overflow:hidden;width:720px}.stream-container.svelte-rt5t1v .embed .peertube-container iframe.svelte-rt5t1v,.stream-container.svelte-rt5t1v .embed .youtube-container iframe.svelte-rt5t1v,.stream-container.svelte-rt5t1v .embed .vimeo-container iframe.svelte-rt5t1v{position:absolute;top:0;left:0;width:100%;height:100%;border:0}")();
const css$b = {
  code: ".stream-container.svelte-rt5t1v.svelte-rt5t1v{width:720px}@media(max-width: 800px){.stream-container.svelte-rt5t1v.svelte-rt5t1v{width:90%}}.stream-container.svelte-rt5t1v .embed.svelte-rt5t1v{width:100%;background:black;display:flex;justify-content:center;align-items:center}.stream-container.svelte-rt5t1v .embed .peertube-container.svelte-rt5t1v,.stream-container.svelte-rt5t1v .embed .youtube-container.svelte-rt5t1v,.stream-container.svelte-rt5t1v .embed .vimeo-container.svelte-rt5t1v{position:relative;padding-bottom:56.25%;height:0;overflow:hidden;width:720px}.stream-container.svelte-rt5t1v .embed .peertube-container iframe.svelte-rt5t1v,.stream-container.svelte-rt5t1v .embed .youtube-container iframe.svelte-rt5t1v,.stream-container.svelte-rt5t1v .embed .vimeo-container iframe.svelte-rt5t1v{position:absolute;top:0;left:0;width:100%;height:100%;border:0}",
  map: null
};
const VideoPlayer = (0, import_index_c41c42e8.c)(($$result, $$props, $$bindings, slots) => {
  let { streamUrl = "" } = $$props;
  if ($$props.streamUrl === void 0 && $$bindings.streamUrl && streamUrl !== void 0)
    $$bindings.streamUrl(streamUrl);
  $$result.css.add(css$b);
  return `<div class="${"stream-container svelte-rt5t1v"}"><div class="${"embed svelte-rt5t1v"}">${streamUrl.includes("youtube") || streamUrl.includes("youtu.be") ? `<div class="${"youtube-container svelte-rt5t1v"}"><iframe width="${"1920"}" height="${"1280"}"${(0, import_index_c41c42e8.f)("src", "https://www.youtube.com/embed/" + (0, import_get_video_id.default)(streamUrl).id + "?rel=0&color=white", 0)} frameborder="${"no"}" allow="${"autoplay; fullscreen"}" allowfullscreen class="${"svelte-rt5t1v"}"></iframe></div>` : `${streamUrl.includes("vimeo") ? `<div class="${"vimeo-container svelte-rt5t1v"}"><iframe width="${"720"}" height="${"480"}"${(0, import_index_c41c42e8.f)("src", "https://player.vimeo.com/video/" + (0, import_get_video_id.default)(streamUrl).id, 0)} frameborder="${"no"}" scrolling="${"no"}" byline="${"false"}" color="${"#ffffff"}" allow="${"autoplay; fullscreen"}" allowfullscreen class="${"svelte-rt5t1v"}"></iframe></div>` : `${streamUrl.includes("undersco.re") ? `<div class="${"peertube-container svelte-rt5t1v"}"><iframe width="${"720"}" height="${"480"}"${(0, import_index_c41c42e8.f)("src", streamUrl, 0)} frameborder="${"no"}" color="${"#ffffff"}" allow="${"autoplay; fullscreen"}" sandbox="${"allow-same-origin allow-scripts allow-popups"}" allowfullscreen class="${"svelte-rt5t1v"}"></iframe></div>` : ``}`}`}</div>
</div>`;
});
var bulletinBoardEvent_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => ".html-container.svelte-12z4nak.svelte-12z4nak{width:100%;min-height:200px}h3.svelte-12z4nak.svelte-12z4nak{margin:0;text-align:center}.event.svelte-12z4nak.svelte-12z4nak{display:flex;margin-bottom:40px;min-height:200px}.event.svelte-12z4nak .image-container.svelte-12z4nak{width:50%}.event.svelte-12z4nak .image-container img.svelte-12z4nak{max-width:100%}.event.svelte-12z4nak .text-container.svelte-12z4nak{padding-left:10px;width:50%}.event.svelte-12z4nak .text-container .date.svelte-12z4nak{background:#221f20;color:#f5f4ee;margin-bottom:1em;display:inline-block}.event.svelte-12z4nak .text-container .upcoming.svelte-12z4nak{background:#f5f4ee;color:#221f20;margin-bottom:0.5em;display:inline-block}.event.svelte-12z4nak .text-container .title.svelte-12z4nak{margin-bottom:2em}")();
const css$a = {
  code: ".html-container.svelte-12z4nak.svelte-12z4nak{width:100%;min-height:200px}h3.svelte-12z4nak.svelte-12z4nak{margin:0;text-align:center}.event.svelte-12z4nak.svelte-12z4nak{display:flex;margin-bottom:40px;min-height:200px}.event.svelte-12z4nak .image-container.svelte-12z4nak{width:50%}.event.svelte-12z4nak .image-container img.svelte-12z4nak{max-width:100%}.event.svelte-12z4nak .text-container.svelte-12z4nak{padding-left:10px;width:50%}.event.svelte-12z4nak .text-container .date.svelte-12z4nak{background:#221f20;color:#f5f4ee;margin-bottom:1em;display:inline-block}.event.svelte-12z4nak .text-container .upcoming.svelte-12z4nak{background:#f5f4ee;color:#221f20;margin-bottom:0.5em;display:inline-block}.event.svelte-12z4nak .text-container .title.svelte-12z4nak{margin-bottom:2em}",
  map: null
};
const Bulletin_board_event = (0, import_index_c41c42e8.c)(($$result, $$props, $$bindings, slots) => {
  let { event = {} } = $$props;
  let post = false;
  if ($$props.event === void 0 && $$bindings.event && event !== void 0)
    $$bindings.event(event);
  $$result.css.add(css$a);
  return `${``}

    ${(0, import_has.default)(post, "content.content") && post.content.content[0].style == "html" ? `<div class="${"html-container svelte-12z4nak"}"><h3 class="${"svelte-12z4nak"}">Messages</h3>
      ${(0, import_index_c41c42e8.v)(import_movement_ad82973e.B, "Blocks").$$render($$result, { blocks: post.content.content }, {}, {})}</div>` : ``}`;
});
var ArticleBox_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => "button.svelte-1o7zo20.svelte-1o7zo20{all:unset}.return-button.svelte-1o7zo20.svelte-1o7zo20{position:fixed;top:40px;left:20px;background:#f5f4ee;color:#221f20;padding:5px;font-size:12px;z-index:100000;cursor:pointer}.viewer-count.svelte-1o7zo20.svelte-1o7zo20{position:absolute;top:60px;left:50%;transform:translateX(-50%);color:#f5f4ee;font-size:12px;z-index:100000}.article.svelte-1o7zo20.svelte-1o7zo20{position:fixed;top:0;left:0;width:100%;height:100%;background:#221f20;z-index:10000;display:flex;padding-top:60px;padding-bottom:80px;justify-content:center;cursor:pointer;transition:transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)}.article.svelte-1o7zo20 .inner.svelte-1o7zo20{background:#dedcd5;color:#221f20;width:800px;max-width:90%;z-index:10000;padding:20px;overflow-y:scroll;font-size:14px;cursor:default}@media(max-width: 800px){.article.svelte-1o7zo20 .inner.svelte-1o7zo20{width:90%}}.article.pushed.svelte-1o7zo20.svelte-1o7zo20{transform:translateY(240px)}.article img{max-width:100%}.video.svelte-1o7zo20.svelte-1o7zo20{position:fixed;top:0;left:0;width:100%;height:100%;background:#221f20;z-index:10000;display:flex;padding-top:60px;padding-bottom:60px;justify-content:center;align-items:center;transition:transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);cursor:pointer}.video.pushed.svelte-1o7zo20.svelte-1o7zo20{transform:translateY(240px)}.info-text.svelte-1o7zo20.svelte-1o7zo20{position:fixed;bottom:20px;left:20px;background:#221f20;z-index:10000;display:flex;padding:10px;font-size:14px;color:#f5f4ee;border:1px solid #f5f4ee}.bulletin-board.svelte-1o7zo20.svelte-1o7zo20{position:fixed;top:0;left:0;width:100%;height:100%;background:#221f20;z-index:10000;display:flex;padding-top:60px;padding-bottom:80px;justify-content:center;cursor:pointer;transition:transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)}.bulletin-board.svelte-1o7zo20 h1.svelte-1o7zo20{margin:0}.bulletin-board.svelte-1o7zo20 .inner.svelte-1o7zo20{background:#dedcd5;color:#221f20;width:800px;max-width:90%;z-index:10000;padding:20px;overflow-y:scroll;font-size:14px;cursor:default}.bulletin-board.svelte-1o7zo20 .inner .bulletin-board-actions.svelte-1o7zo20{margin-top:20px;margin-bottom:20px;display:inline-block}.bulletin-board.pushed.svelte-1o7zo20.svelte-1o7zo20{transform:translateY(240px)}")();
const css$9 = {
  code: "button.svelte-1o7zo20.svelte-1o7zo20{all:unset}.return-button.svelte-1o7zo20.svelte-1o7zo20{position:fixed;top:40px;left:20px;background:#f5f4ee;color:#221f20;padding:5px;font-size:12px;z-index:100000;cursor:pointer}.viewer-count.svelte-1o7zo20.svelte-1o7zo20{position:absolute;top:60px;left:50%;transform:translateX(-50%);color:#f5f4ee;font-size:12px;z-index:100000}.article.svelte-1o7zo20.svelte-1o7zo20{position:fixed;top:0;left:0;width:100%;height:100%;background:#221f20;z-index:10000;display:flex;padding-top:60px;padding-bottom:80px;justify-content:center;cursor:pointer;transition:transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)}.article.svelte-1o7zo20 .inner.svelte-1o7zo20{background:#dedcd5;color:#221f20;width:800px;max-width:90%;z-index:10000;padding:20px;overflow-y:scroll;font-size:14px;cursor:default}@media(max-width: 800px){.article.svelte-1o7zo20 .inner.svelte-1o7zo20{width:90%}}.article.pushed.svelte-1o7zo20.svelte-1o7zo20{transform:translateY(240px)}.article img{max-width:100%}.video.svelte-1o7zo20.svelte-1o7zo20{position:fixed;top:0;left:0;width:100%;height:100%;background:#221f20;z-index:10000;display:flex;padding-top:60px;padding-bottom:60px;justify-content:center;align-items:center;transition:transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);cursor:pointer}.video.pushed.svelte-1o7zo20.svelte-1o7zo20{transform:translateY(240px)}.info-text.svelte-1o7zo20.svelte-1o7zo20{position:fixed;bottom:20px;left:20px;background:#221f20;z-index:10000;display:flex;padding:10px;font-size:14px;color:#f5f4ee;border:1px solid #f5f4ee}.bulletin-board.svelte-1o7zo20.svelte-1o7zo20{position:fixed;top:0;left:0;width:100%;height:100%;background:#221f20;z-index:10000;display:flex;padding-top:60px;padding-bottom:80px;justify-content:center;cursor:pointer;transition:transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)}.bulletin-board.svelte-1o7zo20 h1.svelte-1o7zo20{margin:0}.bulletin-board.svelte-1o7zo20 .inner.svelte-1o7zo20{background:#dedcd5;color:#221f20;width:800px;max-width:90%;z-index:10000;padding:20px;overflow-y:scroll;font-size:14px;cursor:default}.bulletin-board.svelte-1o7zo20 .inner .bulletin-board-actions.svelte-1o7zo20{margin-top:20px;margin-bottom:20px;display:inline-block}.bulletin-board.pushed.svelte-1o7zo20.svelte-1o7zo20{transform:translateY(240px)}",
  map: null
};
const ArticleBox = (0, import_index_c41c42e8.c)(($$result, $$props, $$bindings, slots) => {
  let $players, $$unsubscribe_players;
  let $trayOpen, $$unsubscribe_trayOpen;
  $$unsubscribe_players = (0, import_index_c41c42e8.a)(import_movement_ad82973e.j, (value) => $players = value);
  $$unsubscribe_trayOpen = (0, import_index_c41c42e8.a)(import_movement_ad82973e.t, (value) => $trayOpen = value);
  let { article = {} } = $$props;
  let viewCount = 0;
  let viewCountText = "";
  (0, import_index_c41c42e8.o)(async () => {
    (0, import_movement_ad82973e.k)();
  });
  if ($$props.article === void 0 && $$bindings.article && article !== void 0)
    $$bindings.article(article);
  $$result.css.add(css$9);
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
  return `${article.contentType === "video" ? `<div aria-live="${"polite"}" class="${"viewer-count svelte-1o7zo20"}">${(0, import_index_c41c42e8.e)(viewCountText)}</div>` : ``}

<button class="${"return-button svelte-1o7zo20"}" aria-label="${"Return"}">Return
</button>
<section role="${"presentation"}">${article.contentType === "video" ? `<div class="${["video svelte-1o7zo20", $trayOpen ? "pushed" : ""].join(" ").trim()}" role="${"presentation"}" aria-live="${"assertive"}" aria-modal="${"true"}">${(0, import_index_c41c42e8.v)(VideoPlayer, "VideoPlayer").$$render($$result, { streamUrl: article.videoUrl }, {}, {})}</div>` : `${article.contentType === "text" ? `${(0, import_has.default)(article, "content.content") ? `<div class="${["article svelte-1o7zo20", $trayOpen ? "pushed" : ""].join(" ").trim()}" aria-live="${"assertive"}" aria-modal="${"true"}" role="${"presentation"}"><div class="${"inner svelte-1o7zo20"}">${(0, import_index_c41c42e8.v)(import_movement_ad82973e.B, "Blocks").$$render($$result, { blocks: article.content.content }, {}, {})}</div></div>` : ``}` : `${article.contentType === "importedPost" ? `<div class="${["article svelte-1o7zo20", $trayOpen ? "pushed" : ""].join(" ").trim()}" aria-live="${"assertive"}" aria-modal="${"true"}" role="${"presentation"}"><div class="${"inner svelte-1o7zo20"}">${``}</div></div>` : `${article.isBulletinBoard ? `<div class="${["bulletin-board svelte-1o7zo20", $trayOpen ? "pushed" : ""].join(" ").trim()}" aria-live="${"polite"}" aria-modal="${"true"}" role="${"presentation"}"><div class="${"inner svelte-1o7zo20"}"><h1 class="${"svelte-1o7zo20"}">Bulletin Board</h1>
      <div class="${"bulletin-board-actions svelte-1o7zo20"}"></div>
      <div class="${"bulletin-board-events"}">${(0, import_index_c41c42e8.b)(article.events, (event) => {
    return `${(0, import_index_c41c42e8.v)(Bulletin_board_event, "BulletinBoardEvent").$$render($$result, { event }, {}, {})}`;
  })}</div></div></div>` : ``}`}`}`}

${article.infoText ? `<div class="${"info-text svelte-1o7zo20"}">${(0, import_index_c41c42e8.e)(article.infoText)}</div>` : ``}
</section>`;
});
var RoomDialog_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => ".room-dialog-box.svelte-1f100a4.svelte-1f100a4{position:fixed;bottom:20px;left:20px;padding:15px;background:#e8eae6;color:#221f20;border:1px solid #221f20;z-index:1000;user-select:none}.room-dialog-box.is-mobile.svelte-1f100a4.svelte-1f100a4{bottom:170px;font-size:22px;left:5px;width:calc(100% - 10px)}.choice.svelte-1f100a4.svelte-1f100a4{display:flex;cursor:pointer;border:1px solid #221f20;margin-bottom:4px}.choice.is-mobile.svelte-1f100a4.svelte-1f100a4{width:50%}.choice.svelte-1f100a4 .marker.svelte-1f100a4{opacity:0;width:1em;text-align:center}.choice.svelte-1f100a4:hover .marker.svelte-1f100a4,.choice.svelte-1f100a4:focus .marker.svelte-1f100a4{opacity:1}")();
const css$8 = {
  code: ".room-dialog-box.svelte-1f100a4.svelte-1f100a4{position:fixed;bottom:20px;left:20px;padding:15px;background:#e8eae6;color:#221f20;border:1px solid #221f20;z-index:1000;user-select:none}.room-dialog-box.is-mobile.svelte-1f100a4.svelte-1f100a4{bottom:170px;font-size:22px;left:5px;width:calc(100% - 10px)}.choice.svelte-1f100a4.svelte-1f100a4{display:flex;cursor:pointer;border:1px solid #221f20;margin-bottom:4px}.choice.is-mobile.svelte-1f100a4.svelte-1f100a4{width:50%}.choice.svelte-1f100a4 .marker.svelte-1f100a4{opacity:0;width:1em;text-align:center}.choice.svelte-1f100a4:hover .marker.svelte-1f100a4,.choice.svelte-1f100a4:focus .marker.svelte-1f100a4{opacity:1}",
  map: null
};
const RoomDialog = (0, import_index_c41c42e8.c)(($$result, $$props, $$bindings, slots) => {
  let $isPhone, $$unsubscribe_isPhone;
  $$unsubscribe_isPhone = (0, import_index_c41c42e8.a)(import_movement_ad82973e.i, (value) => $isPhone = value);
  (0, import_index_c41c42e8.h)();
  let { text = "" } = $$props;
  let { roomId = "" } = $$props;
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  if ($$props.roomId === void 0 && $$bindings.roomId && roomId !== void 0)
    $$bindings.roomId(roomId);
  $$result.css.add(css$8);
  $$unsubscribe_isPhone();
  return `<div class="${["room-dialog-box svelte-1f100a4", $isPhone ? "is-mobile" : ""].join(" ").trim()}" aria-live="${"polite"}"><div>${(0, import_index_c41c42e8.e)(text)}</div>
  <div class="${"multiple-choice"}"><div class="${["choice svelte-1f100a4", $isPhone ? "is-mobile" : ""].join(" ").trim()}" tabindex="${"0"}" autofocus><div class="${"marker svelte-1f100a4"}">\u25B8</div>
      Yes
    </div>
    <div class="${["choice svelte-1f100a4", $isPhone ? "is-mobile" : ""].join(" ").trim()}" tabindex="${"0"}"><div class="${"marker svelte-1f100a4"}">\u25B8</div>
      No
    </div></div>
</div>`;
});
var RoomEntryBox_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => ".caption-container.svelte-2b336u{position:fixed;bottom:20px;left:20px;z-index:1000}.caption-container.is-mobile.svelte-2b336u{bottom:160px}")();
const css$7 = {
  code: ".caption-container.svelte-2b336u{position:fixed;bottom:20px;left:20px;z-index:1000}.caption-container.is-mobile.svelte-2b336u{bottom:160px}",
  map: null
};
const RoomEntryBox = (0, import_index_c41c42e8.c)(($$result, $$props, $$bindings, slots) => {
  let $isPhone, $$unsubscribe_isPhone;
  $$unsubscribe_isPhone = (0, import_index_c41c42e8.a)(import_movement_ad82973e.i, (value) => $isPhone = value);
  (0, import_index_c41c42e8.h)();
  let { roomIntent: roomIntent2 = "" } = $$props;
  let { roomTitle = "" } = $$props;
  if ($$props.roomIntent === void 0 && $$bindings.roomIntent && roomIntent2 !== void 0)
    $$bindings.roomIntent(roomIntent2);
  if ($$props.roomTitle === void 0 && $$bindings.roomTitle && roomTitle !== void 0)
    $$bindings.roomTitle(roomTitle);
  $$result.css.add(css$7);
  $$unsubscribe_isPhone();
  return `<div class="${["caption-container svelte-2b336u", $isPhone ? "is-mobile" : ""].join(" ").trim()}" aria-live="${"polite"}">${(0, import_index_c41c42e8.v)(RoomDialog, "RoomDialog").$$render($$result, {
    text: `Go to ${roomTitle}?`,
    roomId: roomIntent2
  }, {}, {})}
</div>`;
});
var ObjectDialog_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => ".object-dialog-box.svelte-xh56cg.svelte-xh56cg{position:fixed;bottom:20px;left:20px;padding:15px;background:#e8eae6;color:#221f20;border:1px solid #221f20;z-index:1000;user-select:none}.object-dialog-box.is-mobile.svelte-xh56cg.svelte-xh56cg{bottom:170px;font-size:22px;left:5px;width:calc(100% - 10px)}.choice.svelte-xh56cg.svelte-xh56cg{display:flex;cursor:pointer;border:1px solid #221f20;margin-bottom:4px}.choice.is-mobile.svelte-xh56cg.svelte-xh56cg{width:50%}.choice.svelte-xh56cg .marker.svelte-xh56cg{opacity:0;width:1em;text-align:center}.choice.svelte-xh56cg:hover .marker.svelte-xh56cg,.choice.svelte-xh56cg:focus .marker.svelte-xh56cg{opacity:1}")();
const css$6 = {
  code: ".object-dialog-box.svelte-xh56cg.svelte-xh56cg{position:fixed;bottom:20px;left:20px;padding:15px;background:#e8eae6;color:#221f20;border:1px solid #221f20;z-index:1000;user-select:none}.object-dialog-box.is-mobile.svelte-xh56cg.svelte-xh56cg{bottom:170px;font-size:22px;left:5px;width:calc(100% - 10px)}.choice.svelte-xh56cg.svelte-xh56cg{display:flex;cursor:pointer;border:1px solid #221f20;margin-bottom:4px}.choice.is-mobile.svelte-xh56cg.svelte-xh56cg{width:50%}.choice.svelte-xh56cg .marker.svelte-xh56cg{opacity:0;width:1em;text-align:center}.choice.svelte-xh56cg:hover .marker.svelte-xh56cg,.choice.svelte-xh56cg:focus .marker.svelte-xh56cg{opacity:1}",
  map: null
};
const ObjectDialog = (0, import_index_c41c42e8.c)(($$result, $$props, $$bindings, slots) => {
  let $isPhone, $$unsubscribe_isPhone;
  $$unsubscribe_isPhone = (0, import_index_c41c42e8.a)(import_movement_ad82973e.i, (value) => $isPhone = value);
  (0, import_index_c41c42e8.h)();
  let { text = "" } = $$props;
  let { objectId = "" } = $$props;
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  if ($$props.objectId === void 0 && $$bindings.objectId && objectId !== void 0)
    $$bindings.objectId(objectId);
  $$result.css.add(css$6);
  $$unsubscribe_isPhone();
  return `<div class="${["object-dialog-box svelte-xh56cg", $isPhone ? "is-mobile" : ""].join(" ").trim()}" aria-live="${"polite"}"><div>${(0, import_index_c41c42e8.e)(text)}</div>
  <div class="${"multiple-choice"}"><div class="${["choice svelte-xh56cg", $isPhone ? "is-mobile" : ""].join(" ").trim()}" tabindex="${"0"}" autofocus><div class="${"marker svelte-xh56cg"}">\u25B8</div>
      Yes
    </div>
    <div class="${["choice svelte-xh56cg", $isPhone ? "is-mobile" : ""].join(" ").trim()}" tabindex="${"0"}"><div class="${"marker svelte-xh56cg"}">\u25B8</div>
      No
    </div></div>
</div>`;
});
var ObjectInspectionBox_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => ".caption-container.svelte-1n310o3{position:fixed;bottom:20px;left:20px;z-index:1000}")();
const css$5 = {
  code: ".caption-container.svelte-1n310o3{position:fixed;bottom:20px;left:20px;z-index:1000}",
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
  $$result.css.add(css$5);
  return `<div class="${"caption-container svelte-1n310o3"}" aria-live="${"polite"}">${(0, import_index_c41c42e8.e)(objectTitle)}
  ${(0, import_index_c41c42e8.v)(ObjectDialog, "ObjectDialog").$$render($$result, {
    text: `Look at ${objectTitle}?`,
    objectId: objectIntent2
  }, {}, {})}
</div>`;
});
var triangleDown_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => "svg.svelte-fiesz8.svelte-fiesz8{transform:rotate(270deg)}svg.svelte-fiesz8 path.svelte-fiesz8{fill:#221f20}")();
var Caption_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => ".caption-container.svelte-1w479lr{position:fixed;bottom:20px;left:20px;z-index:10000;max-width:520px;display:flex}.caption-container.is-mobile.svelte-1w479lr{bottom:160px;left:5px;max-width:calc(100% - 10px)}.caption-box.svelte-1w479lr{padding:15px;background:#f5f4ee;color:#221f20;border:1px solid #221f20;z-index:1000;font-size:14px;padding-bottom:0;cursor:pointer}.next-caption.svelte-1w479lr{padding-left:15px;padding-right:15px;background:#dedcd5;color:#221f20;border:1px solid #221f20;z-index:1000;font-size:14px;padding-bottom:0;cursor:pointer;margin-left:10px;display:flex;align-items:center;justify-content:center}")();
var ChatMessage_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => ".inline-link{color:#dedcd5 !important}.chat-message.svelte-rzyxal.svelte-rzyxal{display:flex;padding:12px;border-bottom:1px solid #dedcd5}.chat-message.svelte-rzyxal .message-text.svelte-rzyxal{padding-left:12px}.chat-message.svelte-rzyxal .username.svelte-rzyxal{font-weight:800}")();
const css$4 = {
  code: ".inline-link{color:#dedcd5 !important}.chat-message.svelte-rzyxal.svelte-rzyxal{display:flex;padding:12px;border-bottom:1px solid #dedcd5}.chat-message.svelte-rzyxal .message-text.svelte-rzyxal{padding-left:12px}.chat-message.svelte-rzyxal .username.svelte-rzyxal{font-weight:800}",
  map: null
};
const ChatMessage = (0, import_index_c41c42e8.c)(($$result, $$props, $$bindings, slots) => {
  let { message = {} } = $$props;
  if ($$props.message === void 0 && $$bindings.message && message !== void 0)
    $$bindings.message(message);
  $$result.css.add(css$4);
  return `<div class="${"chat-message svelte-rzyxal"}" aria-live="${"polite"}"><span class="${"username svelte-rzyxal"}">${(0, import_index_c41c42e8.e)(message.name)}: </span><span class="${"message-text svelte-rzyxal"}"><!-- HTML_TAG_START -->${(0, import_anchorme.default)({
    input: message.text,
    options: {
      attributes: { target: "_blank", class: "inline-link" }
    }
  })}<!-- HTML_TAG_END --></span>
</div>`;
});
var ChatBox_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => '.chat-log.svelte-wc3pj0.svelte-wc3pj0{width:100%;max-height:400px;min-height:200px;display:flex;align-items:center;overflow:scroll;font-family:"Literata", serif;font-size:14px;float:left;width:100%;display:block;background:#221f20;border:1px solid #dedcd5;color:#dedcd5;border-radius:0;outline:none;padding-top:70px;margin-right:6px;margin-bottom:12px}.chat-log.svelte-wc3pj0 a.svelte-wc3pj0{color:#dedcd5}.chat-log.is-mobile.svelte-wc3pj0.svelte-wc3pj0{height:50vh}.chat-pinned.svelte-wc3pj0.svelte-wc3pj0{position:absolute;background:#221f20;z-index:1;top:1px;height:70px;width:calc(100% - 2px)}.chat-message.svelte-wc3pj0.svelte-wc3pj0{display:flex;padding:12px;border-bottom:1px solid #dedcd5}.chat-message.svelte-wc3pj0 .message-text.svelte-wc3pj0{padding-left:12px}')();
const css$3 = {
  code: '.chat-log.svelte-wc3pj0.svelte-wc3pj0{width:100%;max-height:400px;min-height:200px;display:flex;align-items:center;overflow:scroll;font-family:"Literata", serif;font-size:14px;float:left;width:100%;display:block;background:#221f20;border:1px solid #dedcd5;color:#dedcd5;border-radius:0;outline:none;padding-top:70px;margin-right:6px;margin-bottom:12px}.chat-log.svelte-wc3pj0 a.svelte-wc3pj0{color:#dedcd5}.chat-log.is-mobile.svelte-wc3pj0.svelte-wc3pj0{height:50vh}.chat-pinned.svelte-wc3pj0.svelte-wc3pj0{position:absolute;background:#221f20;z-index:1;top:1px;height:70px;width:calc(100% - 2px)}.chat-message.svelte-wc3pj0.svelte-wc3pj0{display:flex;padding:12px;border-bottom:1px solid #dedcd5}.chat-message.svelte-wc3pj0 .message-text.svelte-wc3pj0{padding-left:12px}',
  map: null
};
const ChatBox = (0, import_index_c41c42e8.c)(($$result, $$props, $$bindings, slots) => {
  let $isPhone, $$unsubscribe_isPhone;
  $$unsubscribe_isPhone = (0, import_index_c41c42e8.a)(import_movement_ad82973e.i, (value) => $isPhone = value);
  let { messages = [] } = $$props;
  let { room = {} } = $$props;
  let scrollBox = null;
  if ($$props.messages === void 0 && $$bindings.messages && messages !== void 0)
    $$bindings.messages(messages);
  if ($$props.room === void 0 && $$bindings.room && room !== void 0)
    $$bindings.room(room);
  $$result.css.add(css$3);
  $$unsubscribe_isPhone();
  return `<div class="${["chat-log svelte-wc3pj0", $isPhone ? "is-mobile" : ""].join(" ").trim()}"${(0, import_index_c41c42e8.f)("this", scrollBox, 0)}><div class="${"chat-message chat-pinned svelte-wc3pj0"}"><span class="${"message-text svelte-wc3pj0"}">For a less ephemeral conversation, <a target="${"_blank"}" href="${"https://discord.gg/NK6EQwrsmz"}" class="${"svelte-wc3pj0"}">join our Discord</a>. Send us feedback <a target="${"_blank"}" href="${"https://desk.undersco.re/apps/forms/s/5BqyWk8EsSe4YtCfJEqyni9K"}" class="${"svelte-wc3pj0"}">here</a>.</span></div>
${messages.length <= 0 ? `<div class="${"chat-message svelte-wc3pj0"}">The chat is empty, for now.</div>` : ``}
  ${(0, import_index_c41c42e8.b)(messages, (message) => {
    return `${(0, import_index_c41c42e8.v)(ChatMessage, "ChatMessage").$$render($$result, { message }, {}, {})}`;
  })}
</div>`;
});
var Chat_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => '.discord-widget.svelte-wkmpvb.svelte-wkmpvb{position:fixed;right:20px;bottom:20px;width:300px;max-width:35%;height:70%}.mobile-button.svelte-wkmpvb.svelte-wkmpvb{display:none}.chat-container.svelte-wkmpvb.svelte-wkmpvb{right:20px;max-height:100%;bottom:20px;position:fixed;width:300px;z-index:10000}.chat-container.is-mobile.svelte-wkmpvb.svelte-wkmpvb{bottom:125px;right:10px;width:calc(100% - 20px)}.chat-container.minimize.svelte-wkmpvb.svelte-wkmpvb{width:calc(30% - 10px);height:auto}.chat-input.svelte-wkmpvb.svelte-wkmpvb{width:100%;display:flex;align-items:center;user-select:none;-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none}.chat-input.svelte-wkmpvb input.svelte-wkmpvb{font-family:"Literata", serif;font-size:14px;float:left;width:100%;display:block;background:#dedcd5;border:1px solid #221f20;color:#221f20;padding:0 10px;border-radius:0;outline:none;height:40px;margin-right:6px}button.svelte-wkmpvb.svelte-wkmpvb{font-family:"Literata", serif;font-size:14px;width:60px;float:right;display:block;background:#dedcd5;border:1px solid #221f20;color:#221f20;outline:none;cursor:pointer;border-radius:0;height:40px;padding:10px;line-height:20px}.is-mobile.svelte-wkmpvb .discord-widget.svelte-wkmpvb{height:45%;max-width:100%;width:100%;bottom:120px;right:0}.is-mobile.svelte-wkmpvb .mobile-button.svelte-wkmpvb{display:block;width:100%;z-index:1001}.is-mobile.svelte-wkmpvb .hidden-mobile.svelte-wkmpvb{display:none}.is-mobile.svelte-wkmpvb .minimize.svelte-wkmpvb{width:40px;height:40px;font-weight:bold;position:absolute;right:0}')();
const css$2 = {
  code: '.discord-widget.svelte-wkmpvb.svelte-wkmpvb{position:fixed;right:20px;bottom:20px;width:300px;max-width:35%;height:70%}.mobile-button.svelte-wkmpvb.svelte-wkmpvb{display:none}.chat-container.svelte-wkmpvb.svelte-wkmpvb{right:20px;max-height:100%;bottom:20px;position:fixed;width:300px;z-index:10000}.chat-container.is-mobile.svelte-wkmpvb.svelte-wkmpvb{bottom:125px;right:10px;width:calc(100% - 20px)}.chat-container.minimize.svelte-wkmpvb.svelte-wkmpvb{width:calc(30% - 10px);height:auto}.chat-input.svelte-wkmpvb.svelte-wkmpvb{width:100%;display:flex;align-items:center;user-select:none;-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none}.chat-input.svelte-wkmpvb input.svelte-wkmpvb{font-family:"Literata", serif;font-size:14px;float:left;width:100%;display:block;background:#dedcd5;border:1px solid #221f20;color:#221f20;padding:0 10px;border-radius:0;outline:none;height:40px;margin-right:6px}button.svelte-wkmpvb.svelte-wkmpvb{font-family:"Literata", serif;font-size:14px;width:60px;float:right;display:block;background:#dedcd5;border:1px solid #221f20;color:#221f20;outline:none;cursor:pointer;border-radius:0;height:40px;padding:10px;line-height:20px}.is-mobile.svelte-wkmpvb .discord-widget.svelte-wkmpvb{height:45%;max-width:100%;width:100%;bottom:120px;right:0}.is-mobile.svelte-wkmpvb .mobile-button.svelte-wkmpvb{display:block;width:100%;z-index:1001}.is-mobile.svelte-wkmpvb .hidden-mobile.svelte-wkmpvb{display:none}.is-mobile.svelte-wkmpvb .minimize.svelte-wkmpvb{width:40px;height:40px;font-weight:bold;position:absolute;right:0}',
  map: null
};
const Chat = (0, import_index_c41c42e8.c)(($$result, $$props, $$bindings, slots) => {
  let chatSettings;
  let discordURL;
  let $currentRoom, $$unsubscribe_currentRoom;
  let $isPhone, $$unsubscribe_isPhone;
  let $uiState, $$unsubscribe_uiState;
  $$unsubscribe_currentRoom = (0, import_index_c41c42e8.a)(import_movement_ad82973e.c, (value) => $currentRoom = value);
  $$unsubscribe_isPhone = (0, import_index_c41c42e8.a)(import_movement_ad82973e.i, (value) => $isPhone = value);
  $$unsubscribe_uiState = (0, import_index_c41c42e8.a)(import_movement_ad82973e.u, (value) => $uiState = value);
  (0, import_index_c41c42e8.h)();
  new import_bad_words.default();
  let chatInputValue = "";
  let { chatMessages: chatMessages2 = [] } = $$props;
  let showMobile = $isPhone ? false : null;
  const query = `*[_type == 'room' && _id == "${$currentRoom._id}"]`;
  import_movement_ad82973e.m.listen(query).subscribe((update) => {
    chatSettings = update.result.chatSettings;
  });
  if ($$props.chatMessages === void 0 && $$bindings.chatMessages && chatMessages2 !== void 0)
    $$bindings.chatMessages(chatMessages2);
  $$result.css.add(css$2);
  chatSettings = $currentRoom.chatSettings != void 0 ? $currentRoom.chatSettings : {
    useDiscord: false,
    discordChannelId: void 0
  };
  discordURL = `https://e.widgetbot.io/channels/806275264807698482/${chatSettings.discordChannelId}`;
  $$unsubscribe_currentRoom();
  $$unsubscribe_isPhone();
  $$unsubscribe_uiState();
  return `${chatSettings != void 0 && chatSettings.disableChat != true && $uiState != import_movement_ad82973e.S.ERROR ? `<div class="${[
    "chat-container svelte-wkmpvb",
    ($isPhone ? "is-mobile" : "") + " " + (($isPhone ? !showMobile : false) ? "minimize" : "")
  ].join(" ").trim()}"><button class="${["mobile-button svelte-wkmpvb", showMobile ? "minimize" : ""].join(" ").trim()}">${(0, import_index_c41c42e8.e)(showMobile ? "X" : "Chat")}</button>
${chatSettings.useDiscord != true || chatSettings.discordChannelId == void 0 ? `<div class="${["chat-content svelte-wkmpvb", !showMobile ? "hidden-mobile" : ""].join(" ").trim()}">${(0, import_index_c41c42e8.v)(ChatBox, "ChatBox").$$render($$result, {
    messages: chatMessages2,
    room: $currentRoom
  }, {}, {})}
    <div class="${"chat-input svelte-wkmpvb"}"><input placeholder="${"Write a message..."}" type="${"[text]"}" maxlength="${"600"}" class="${"svelte-wkmpvb"}"${(0, import_index_c41c42e8.f)("value", chatInputValue, 0)}>
    <button class="${"svelte-wkmpvb"}">Send</button></div></div>` : `<iframe class="${["discord-widget svelte-wkmpvb", !showMobile ? "hidden-mobile" : ""].join(" ").trim()}"${(0, import_index_c41c42e8.f)("src", discordURL, 0)} style="${"sidebar:display:none;"}"></iframe>`}</div>` : ``}`;
});
var PhoneNavigation_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => ".phone-navigation.svelte-1gdx3ae.svelte-1gdx3ae{position:fixed;bottom:0;left:0;width:100vw;height:120px;backdrop-filter:blur(10px);padding-top:10px;padding-bottom:10px;padding-left:5px;padding-right:5px;cursor:pointer;font-size:22px;z-index:10000;display:flex;user-select:none}.left.svelte-1gdx3ae.svelte-1gdx3ae{height:calc(100% - 10px);width:calc(30% - 10px);background:#dedcd5;border:1px solid #221f20;margin:5px}.right.svelte-1gdx3ae.svelte-1gdx3ae{height:calc(100% - 10px);width:calc(30% - 10px);background:#dedcd5;border:1px solid #221f20;margin:5px}.vert.svelte-1gdx3ae.svelte-1gdx3ae{height:100%;width:40%;display:flex;flex-direction:column}.vert.svelte-1gdx3ae .up.svelte-1gdx3ae{height:calc(50% - 10px);width:calc(100% - 10px);background:#dedcd5;border:1px solid #221f20;margin:5px}.vert.svelte-1gdx3ae .up span.svelte-1gdx3ae{margin-bottom:10px}.vert.svelte-1gdx3ae .down.svelte-1gdx3ae{height:calc(50% - 10px);width:calc(100% - 10px);background:#dedcd5;border:1px solid #221f20;margin:5px}.vert.svelte-1gdx3ae .down span.svelte-1gdx3ae{margin-bottom:10px}.key.svelte-1gdx3ae.svelte-1gdx3ae{display:flex;justify-content:center;align-items:center;user-select:none;-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none}.key.svelte-1gdx3ae.svelte-1gdx3ae:hover,.key.active.svelte-1gdx3ae.svelte-1gdx3ae{background:#f5f4ee}")();
const css$1 = {
  code: ".phone-navigation.svelte-1gdx3ae.svelte-1gdx3ae{position:fixed;bottom:0;left:0;width:100vw;height:120px;backdrop-filter:blur(10px);padding-top:10px;padding-bottom:10px;padding-left:5px;padding-right:5px;cursor:pointer;font-size:22px;z-index:10000;display:flex;user-select:none}.left.svelte-1gdx3ae.svelte-1gdx3ae{height:calc(100% - 10px);width:calc(30% - 10px);background:#dedcd5;border:1px solid #221f20;margin:5px}.right.svelte-1gdx3ae.svelte-1gdx3ae{height:calc(100% - 10px);width:calc(30% - 10px);background:#dedcd5;border:1px solid #221f20;margin:5px}.vert.svelte-1gdx3ae.svelte-1gdx3ae{height:100%;width:40%;display:flex;flex-direction:column}.vert.svelte-1gdx3ae .up.svelte-1gdx3ae{height:calc(50% - 10px);width:calc(100% - 10px);background:#dedcd5;border:1px solid #221f20;margin:5px}.vert.svelte-1gdx3ae .up span.svelte-1gdx3ae{margin-bottom:10px}.vert.svelte-1gdx3ae .down.svelte-1gdx3ae{height:calc(50% - 10px);width:calc(100% - 10px);background:#dedcd5;border:1px solid #221f20;margin:5px}.vert.svelte-1gdx3ae .down span.svelte-1gdx3ae{margin-bottom:10px}.key.svelte-1gdx3ae.svelte-1gdx3ae{display:flex;justify-content:center;align-items:center;user-select:none;-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none}.key.svelte-1gdx3ae.svelte-1gdx3ae:hover,.key.active.svelte-1gdx3ae.svelte-1gdx3ae{background:#f5f4ee}",
  map: null
};
const PhoneNavigation = (0, import_index_c41c42e8.c)(($$result, $$props, $$bindings, slots) => {
  let nodeUp, nodeDown, nodeLeft, nodeRight;
  $$result.css.add(css$1);
  return `<div class="${"phone-navigation svelte-1gdx3ae"}"><div class="${["key left svelte-1gdx3ae", "active"].join(" ").trim()}"${(0, import_index_c41c42e8.f)("this", nodeLeft, 0)}><span>\u2190</span></div>
  <div class="${"vert svelte-1gdx3ae"}"><div class="${["key up svelte-1gdx3ae", "active"].join(" ").trim()}"${(0, import_index_c41c42e8.f)("this", nodeUp, 0)}><span class="${"svelte-1gdx3ae"}">\u2191</span></div>
    <div class="${["key down svelte-1gdx3ae", "active"].join(" ").trim()}"${(0, import_index_c41c42e8.f)("this", nodeDown, 0)}><span class="${"svelte-1gdx3ae"}">\u2193</span></div></div>
  <div class="${["key right svelte-1gdx3ae", "active"].join(" ").trim()}"${(0, import_index_c41c42e8.f)("this", nodeRight, 0)}><span>\u2192</span></div>
</div>`;
});
var index_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => ".viewport.svelte-bjp79{height:100vh;width:100vw;position:absolute;top:0;left:0;overflow:hidden;opacity:1;transition:transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);background:#221f20}.viewport.pushed.svelte-bjp79{transform:translateY(240px)}.screenreader-only.svelte-bjp79{position:absolute;left:-100000000px;top:auto;width:1px;height:1px}")();
const css = {
  code: ".viewport.svelte-bjp79{height:100vh;width:100vw;position:absolute;top:0;left:0;overflow:hidden;opacity:1;transition:transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);background:#221f20}.viewport.pushed.svelte-bjp79{transform:translateY(240px)}.screenreader-only.svelte-bjp79{position:absolute;left:-100000000px;top:auto;width:1px;height:1px}",
  map: null
};
const Routes = (0, import_index_c41c42e8.c)(($$result, $$props, $$bindings, slots) => {
  let $universalStream, $$unsubscribe_universalStream;
  let $streams, $$unsubscribe_streams;
  let $$unsubscribe_isAuthenticated;
  let $worldObject, $$unsubscribe_worldObject;
  let $currentRoom, $$unsubscribe_currentRoom;
  let $$unsubscribe_profile;
  let $localPlayer, $$unsubscribe_localPlayer;
  let $players, $$unsubscribe_players;
  let $uiState, $$unsubscribe_uiState;
  let $trayOpen, $$unsubscribe_trayOpen;
  let $activeArticle, $$unsubscribe_activeArticle;
  let $playSound, $$unsubscribe_playSound;
  let $focusPlayer, $$unsubscribe_focusPlayer;
  let $activeZone, $$unsubscribe_activeZone;
  let $roomIntent, $$unsubscribe_roomIntent;
  let $objectIntent, $$unsubscribe_objectIntent;
  let $chatMessages, $$unsubscribe_chatMessages;
  let $isPhone, $$unsubscribe_isPhone;
  $$unsubscribe_streams = (0, import_index_c41c42e8.a)(import_movement_ad82973e.n, (value) => $streams = value);
  $$unsubscribe_isAuthenticated = (0, import_index_c41c42e8.a)(isAuthenticated, (value) => value);
  $$unsubscribe_worldObject = (0, import_index_c41c42e8.a)(import_movement_ad82973e.o, (value) => $worldObject = value);
  $$unsubscribe_currentRoom = (0, import_index_c41c42e8.a)(import_movement_ad82973e.c, (value) => $currentRoom = value);
  $$unsubscribe_profile = (0, import_index_c41c42e8.a)(profile, (value) => value);
  $$unsubscribe_localPlayer = (0, import_index_c41c42e8.a)(import_movement_ad82973e.q, (value) => $localPlayer = value);
  $$unsubscribe_players = (0, import_index_c41c42e8.a)(import_movement_ad82973e.j, (value) => $players = value);
  $$unsubscribe_uiState = (0, import_index_c41c42e8.a)(import_movement_ad82973e.u, (value) => $uiState = value);
  $$unsubscribe_trayOpen = (0, import_index_c41c42e8.a)(import_movement_ad82973e.t, (value) => $trayOpen = value);
  $$unsubscribe_activeArticle = (0, import_index_c41c42e8.a)(import_movement_ad82973e.b, (value) => $activeArticle = value);
  $$unsubscribe_playSound = (0, import_index_c41c42e8.a)(import_movement_ad82973e.p, (value) => $playSound = value);
  $$unsubscribe_focusPlayer = (0, import_index_c41c42e8.a)(import_movement_ad82973e.g, (value) => $focusPlayer = value);
  $$unsubscribe_activeZone = (0, import_index_c41c42e8.a)(import_movement_ad82973e.r, (value) => $activeZone = value);
  $$unsubscribe_roomIntent = (0, import_index_c41c42e8.a)(import_movement_ad82973e.v, (value) => $roomIntent = value);
  $$unsubscribe_objectIntent = (0, import_index_c41c42e8.a)(import_movement_ad82973e.x, (value) => $objectIntent = value);
  $$unsubscribe_chatMessages = (0, import_index_c41c42e8.a)(import_movement_ad82973e.f, (value) => $chatMessages = value);
  $$unsubscribe_isPhone = (0, import_index_c41c42e8.a)(import_movement_ad82973e.i, (value) => $isPhone = value);
  let viewportElement = {};
  let avatars = [];
  let { universalStream = (0, import_movement_ad82973e.w)({}) } = $$props;
  $$unsubscribe_universalStream = (0, import_index_c41c42e8.a)(universalStream, (value) => $universalStream = value);
  function getUniversalStream() {
    universalStream.set($streams.filter((stream) => {
      return stream.showEverywhere == true;
    })[0]);
  }
  if ($$props.universalStream === void 0 && $$bindings.universalStream && universalStream !== void 0)
    $$bindings.universalStream(universalStream);
  $$result.css.add(css);
  {
    {
      if ($players && $players[$localPlayer.uuid]) {
        if ($players[$localPlayer.uuid].x || $players[$localPlayer.uuid].x) {
          (0, import_movement_ad82973e.y)();
          (0, import_movement_ad82973e.z)();
          (0, import_movement_ad82973e.A)();
        }
      }
    }
  }
  $streams && getUniversalStream();
  $universalStream && getUniversalStream();
  $$unsubscribe_universalStream();
  $$unsubscribe_streams();
  $$unsubscribe_isAuthenticated();
  $$unsubscribe_worldObject();
  $$unsubscribe_currentRoom();
  $$unsubscribe_profile();
  $$unsubscribe_localPlayer();
  $$unsubscribe_players();
  $$unsubscribe_uiState();
  $$unsubscribe_trayOpen();
  $$unsubscribe_activeArticle();
  $$unsubscribe_playSound();
  $$unsubscribe_focusPlayer();
  $$unsubscribe_activeZone();
  $$unsubscribe_roomIntent();
  $$unsubscribe_objectIntent();
  $$unsubscribe_chatMessages();
  $$unsubscribe_isPhone();
  return `<div role="${"instructions"}" class="${"screenreader-only svelte-bjp79"}"><p>If you&#39;re using a screenreader, you can navigate through the page with the tab key. You can interact with objects by switching to focus mode and hitting the &quot;Enter&quot; key. If you run into any accessiblity issues, please let us know at tech@eyebeam.org. Enjoy!</p></div>


${$uiState == import_movement_ad82973e.S.ONBOARDING ? `${(0, import_index_c41c42e8.v)(Onboarding, "Onboarding").$$render($$result, { avatars }, {}, {})}` : ``}


${$currentRoom ? `<div class="${["viewport svelte-bjp79", $trayOpen ? "pushed" : ""].join(" ").trim()}"${(0, import_index_c41c42e8.f)("aria-hidden", !$activeArticle ? "false" : "true", 0)} role="${"ui"}"${(0, import_index_c41c42e8.f)("this", viewportElement, 0)}>${(0, import_index_c41c42e8.v)(Room, "Room").$$render($$result, { room: $currentRoom }, {}, {
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


${!$focusPlayer && $universalStream != void 0 ? `${(0, import_index_c41c42e8.v)(StreamPlayer, "StreamPlayer").$$render($$result, {
    streamUrl: $universalStream.videoUrl,
    audioOnly: $universalStream.audioOnly,
    title: $universalStream.title
  }, {}, {})}` : `${(0, import_index_c41c42e8.b)($streams, (stream) => {
    return `${!$focusPlayer && ($currentRoom._id == stream.parentArea._ref || $activeZone._id == stream.parentArea._ref) ? `${(0, import_index_c41c42e8.v)(StreamPlayer, "StreamPlayer").$$render($$result, {
      streamUrl: stream.videoUrl,
      audioOnly: stream.audioOnly,
      title: stream.title
    }, {}, {})}` : ``}`;
  })}`}


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
