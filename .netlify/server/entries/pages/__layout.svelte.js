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
  default: () => _layout
});
module.exports = __toCommonJS(stdin_exports);
var import_index_d20a7d6e = require("../../chunks/index-d20a7d6e.js");
var import_get = __toESM(require("lodash/get.js"));
var import_sample = __toESM(require("lodash/sample.js"));
var import_has = __toESM(require("lodash/has.js"));
var import_inRange = __toESM(require("lodash/inRange.js"));
var import_client = __toESM(require("@sanity/client"));
var import_block_content_to_html = __toESM(require("@sanity/block-content-to-html"));
var import_image_url = __toESM(require("@sanity/image-url"));
var import_get_video_id = __toESM(require("get-video-id"));
var import_date_fns = require("date-fns");
var Colyseus = __toESM(require("colyseus.js"));
var import_howler = require("howler");
var import_slugify = __toESM(require("slugify"));
var import_core = require("@popperjs/core");
var import_keycloak_js = require("keycloak-js");
var import_throttle = require("lodash/throttle.js");
var LoadingScreen_svelte_svelte_type_style_lang = "";
var Error_svelte_svelte_type_style_lang = "";
var Reconnection_svelte_svelte_type_style_lang = "";
const SANITY_PROJECT_ID = "58ueii0w";
const longFormatDate = (date) => {
  try {
    if (date) {
      return (0, import_date_fns.format)((0, import_date_fns.parseISO)(date), "MMMM d, yyyy");
    }
  } catch (err) {
    console.dir(err);
  }
};
const roleToRoleName = {
  artist: "Artist",
  staff: "Staff",
  board: "Board",
  advisoryCommittee: "Advisory Committee"
};
const client = (0, import_client.default)({
  projectId: SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2021-10-05",
  token: "",
  useCdn: false
});
const h = import_block_content_to_html.default.h;
const prepareTextElements = (props) => {
  let textElements = [];
  if ((0, import_has.default)(props, "node.caption.content"))
    textElements.push(h("figcaption", { className: "caption" }, toPlainText(props.node.caption.content)));
  if ((0, import_has.default)(props, "node.attribution"))
    textElements.push(h("figcaption", { className: "credits" }, props.node.attribution));
  return textElements;
};
const renderBlockText = (text) => (0, import_block_content_to_html.default)({
  blocks: text,
  serializers,
  projectId: SANITY_PROJECT_ID,
  dataset: "production"
});
const toPlainText = (blocks = []) => {
  return blocks.map((block) => {
    if (block._type !== "block" || !block.children) {
      return "";
    }
    return block.children.map((child) => child.text).join("");
  }).join("\n\n");
};
const builder = (0, import_image_url.default)(client);
const urlFor = (source) => builder.image(source);
const serializers = {
  marks: {
    link: (props) => {
      const external = (0, import_get.default)(props, "mark.href", "").includes("http");
      let linkOptions = external ? { target: "_blank", rel: "noreferrer", href: props.mark.href } : { href: props.mark.href };
      return h("a", linkOptions, props.children);
    },
    highlight: (props) => h("mark", { className: "highlight" }, props.children),
    footnote: (props) => {
      return h("a", {
        id: "link-" + props.mark._key,
        className: "footnote-link",
        href: "#note-" + props.mark._key
      }, props.children);
    }
  },
  types: {
    block: (props) => {
      const style = props.node.style || "normal";
      if (style === "blockquote")
        return h("blockquote", {}, props.children);
      if (style === "h2")
        return h("h2", {}, props.children);
      if (style === "h3")
        return h("h3", {}, props.children);
      if (style === "h4")
        return h("h4", {}, props.children);
      return h("p", { className: style }, props.children);
    },
    image: (props) => {
      return h("figure", { className: "image" }, [
        h("img", {
          src: urlFor((0, import_get.default)(props, "node.asset", "")).width(800).quality(90).auto("format").url()
        }),
        ...prepareTextElements(props)
      ]);
    },
    embedBlock: (props) => {
      if ((0, import_get.default)(props, "node.url", "").includes("youtube")) {
        return h("figure", { className: "youtube" }, [
          h("div", { className: "embed-container" }, h("iframe", {
            width: "720",
            height: "480",
            src: "https://www.youtube.com/embed/" + (0, import_get_video_id.default)(props.node.url).id,
            frameborder: "no",
            allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",
            allowfullscreen: true
          })),
          ...prepareTextElements(props)
        ]);
      }
      if ((0, import_get.default)(props, "node.url", "").includes("vimeo")) {
        return h("figure", { className: "vimeo" }, [
          h("div", { className: "embed-container" }, h("iframe", {
            width: "720",
            height: "480",
            src: "https://player.vimeo.com/video/" + (0, import_get_video_id.default)(props.node.url).id,
            frameborder: "no",
            byline: false,
            color: "#ffffff",
            allow: "autoplay; fullscreen",
            allowfullscreen: true
          })),
          ...prepareTextElements(props)
        ]);
      }
      if ((0, import_get.default)(props, "node.url", "").includes("soundcloud")) {
        return h("figure", { className: "soundcloud" }, [
          h("div", { className: "soundcloud-container" }, h("iframe", {
            width: "100%",
            height: "300",
            src: "https://w.soundcloud.com/player/?url=" + (0, import_get.default)(props, "node.url", "") + "&color=%23fffff",
            frameborder: "no",
            scrolling: "no",
            allow: "autoplay"
          })),
          ...prepareTextElements(props)
        ]);
      }
    },
    videoBlock: (props) => {
      const videoUrl = "https://shape.anthropocene-curriculum.org/material/files/" + SANITY_PROJECT_ID + "/production/" + (0, import_get.default)(props, "node.videoFile.asset._ref", "").replace("file-", "").replace("-mp4", ".mp4");
      return h("figure", { className: "video" }, [
        h("video", {
          src: videoUrl,
          controls: true,
          loop: true,
          autoplay: (0, import_get.default)(props, "node.autoPlay", "")
        }),
        ...prepareTextElements(props)
      ]);
    },
    audioBlock: (props) => {
      const audioUrl = "https://shape.anthropocene-curriculum.org/material/files/" + SANITY_PROJECT_ID + "/production/" + (0, import_get.default)(props, "node.audioFile.asset._ref", "").replace("file-", "").replace("-mp3", ".mp3");
      return h("figure", { className: "audio" }, [
        h("audio", { src: audioUrl, controls: true }),
        ...prepareTextElements(props)
      ]);
    }
  }
};
const loadData = async (query, params) => {
  try {
    const res = await client.fetch(query, params);
    if (res === null) {
      return Promise.reject(new Error(404));
    }
    return res;
  } catch (err) {
    return Promise.reject(new Error(404));
  }
};
const mainSiteClient = (0, import_client.default)({
  projectId: "3knpqano",
  dataset: "production",
  apiVersion: "2021-10-05",
  useCdn: false
});
const loadDataFromMainSite = async (query, params) => {
  try {
    const res = await mainSiteClient.fetch(query, params);
    if (res === null) {
      return Promise.reject(new Error(404));
    }
    return res;
  } catch (err) {
    return Promise.reject(new Error(404));
  }
};
const mainSitebuilder = (0, import_image_url.default)(mainSiteClient);
const urlForMainSite = (source) => mainSitebuilder.image(source);
const subscriber_queue = [];
function writable(value, start = import_index_d20a7d6e.n) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if ((0, import_index_d20a7d6e.a)(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run, invalidate = import_index_d20a7d6e.n) {
    const subscriber = [run, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || import_index_d20a7d6e.n;
    }
    run(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
const globalSettings = writable({});
let worldObject = writable({});
const GRID_SIZE = 32;
loadData('*[_id == "global-settings"]').then((gS) => {
  globalSettings.set(gS);
}).catch((err) => {
  console.log(err);
});
const showGrid = writable(false);
const showLabels = writable(true);
const playSound = writable(false);
const activeArticle = writable(false);
const activeCity = writable({});
const trayOpen = writable(false);
const currentRoom = writable(false);
var Room_svelte_svelte_type_style_lang = "";
const css$D = {
  code: ".room.svelte-ib3ibm{position:absolute;top:50%;left:50%;background:#dedcd5}.center-view.svelte-ib3ibm{position:fixed;top:100px;left:20px;padding:5px;background:#f5f4ee;cursor:pointer;font-size:14px;display:none}.center-view.svelte-ib3ibm:hover{background:#221f20;color:#f5f4ee}",
  map: null
};
const Room = (0, import_index_d20a7d6e.c)(($$result, $$props, $$bindings, slots) => {
  let $showGrid, $$unsubscribe_showGrid;
  $$unsubscribe_showGrid = (0, import_index_d20a7d6e.b)(showGrid, (value) => $showGrid = value);
  (0, import_index_d20a7d6e.d)();
  let { room = {} } = $$props;
  let { x = 0 } = $$props;
  let { y = 0 } = $$props;
  let roomElement = {};
  let inlineStyles = "";
  const centerViewOnPlayer = (x2, y2) => {
    inlineStyles = `${room.inlineStyles} transform: translateX(-${x2 * GRID_SIZE}px) translateY(-${y2 * GRID_SIZE}px);`;
  };
  if ($$props.room === void 0 && $$bindings.room && room !== void 0)
    $$bindings.room(room);
  if ($$props.x === void 0 && $$bindings.x && x !== void 0)
    $$bindings.x(x);
  if ($$props.y === void 0 && $$bindings.y && y !== void 0)
    $$bindings.y(y);
  $$result.css.add(css$D);
  {
    {
      centerViewOnPlayer(x, y);
    }
  }
  inlineStyles = `${room.inlineStyles} transform: translateX(-50%) translateY(-50%);`;
  $$unsubscribe_showGrid();
  return `

<div class="${"room svelte-ib3ibm"}" id="${"room"}"${(0, import_index_d20a7d6e.e)("style", inlineStyles, 0)}${(0, import_index_d20a7d6e.e)("this", roomElement, 0)}>${$showGrid ? `` : ``}
  ${slots.default ? slots.default({}) : ``}</div>

<div class="${"center-view svelte-ib3ibm"}">CENTER VIEW (DEBUG)</div>`;
});
const localPlayer = writable({
  uuid: "",
  sessionId: "",
  name: "",
  profile: {}
});
const players = writable({});
const chatMessages = writable([]);
const showTarget = writable(false);
const targetX = writable(0);
const targetY = writable(0);
const GAME_SERVER_URL = "wss://open.eyebeam.dev";
let leaveArticle = {};
new Colyseus.Client(GAME_SERVER_URL);
var Avatar_svelte_svelte_type_style_lang = "";
const css$C = {
  code: ".avatar.svelte-zqf5vo.svelte-zqf5vo{height:32px;width:32px;position:absolute;top:0;left:0;z-index:100;background:#dedcd5}.avatar.svelte-zqf5vo img.svelte-zqf5vo{width:100%;height:100%;image-rendering:pixelated}.avatar.self.svelte-zqf5vo.svelte-zqf5vo{z-index:100000}",
  map: null
};
const Avatar = (0, import_index_d20a7d6e.c)(($$result, $$props, $$bindings, slots) => {
  let $chatMessages, $$unsubscribe_chatMessages;
  $$unsubscribe_chatMessages = (0, import_index_d20a7d6e.b)(chatMessages, (value) => $chatMessages = value);
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
  console.log("avatars", avatars);
  console.log("player", player);
  let avatarEl = {};
  let avatar = avatars.find((a) => a._id === player.shape);
  let gridPosY = player.y * GRID_SIZE;
  let gridPosX = player.x * GRID_SIZE;
  if ($$props.player === void 0 && $$bindings.player && player !== void 0)
    $$bindings.player(player);
  if ($$props.avatars === void 0 && $$bindings.avatars && avatars !== void 0)
    $$bindings.avatars(avatars);
  if ($$props.key === void 0 && $$bindings.key && key !== void 0)
    $$bindings.key(key);
  $$result.css.add(css$C);
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
      gridPosY = player.y * GRID_SIZE;
      gridPosX = player.x * GRID_SIZE;
    }
  }
  $$unsubscribe_chatMessages();
  return `<div class="${["avatar svelte-zqf5vo", player.self ? "self" : ""].join(" ").trim()}"${(0, import_index_d20a7d6e.e)("id", key, 0)}${(0, import_index_d20a7d6e.e)("alt", player.name, 0)}${(0, import_index_d20a7d6e.e)("style", "transform: translateY(" + gridPosY + "px) translateX(" + gridPosX + "px)", 0)}${(0, import_index_d20a7d6e.e)("this", avatarEl, 0)}><img${(0, import_index_d20a7d6e.e)("src", avatar && avatar.imageUrl ? avatar.imageUrl : (0, import_sample.default)(avatars).imageUrl, 0)} class="${"svelte-zqf5vo"}">
</div>`;
});
const Players = (0, import_index_d20a7d6e.c)(($$result, $$props, $$bindings, slots) => {
  let { players: players2 = {} } = $$props;
  let { currentRoomId = "" } = $$props;
  let { avatars = [] } = $$props;
  if ($$props.players === void 0 && $$bindings.players && players2 !== void 0)
    $$bindings.players(players2);
  if ($$props.currentRoomId === void 0 && $$bindings.currentRoomId && currentRoomId !== void 0)
    $$bindings.currentRoomId(currentRoomId);
  if ($$props.avatars === void 0 && $$bindings.avatars && avatars !== void 0)
    $$bindings.avatars(avatars);
  return `${(0, import_index_d20a7d6e.f)(Object.entries(players2), ([key, player]) => {
    return `${player.room === currentRoomId && !player.inTransit ? `${(0, import_index_d20a7d6e.v)(Avatar, "Avatar").$$render($$result, { player, key, avatars }, {}, {})}` : ``}`;
  })}`;
});
var Object_svelte_svelte_type_style_lang = "";
const css$B = {
  code: ".object.svelte-1qmh4za.svelte-1qmh4za{height:32px;width:32px;overflow:hidden;position:absolute;top:0;left:0;cursor:pointer;background:#dedcd5}.object.svelte-1qmh4za img.svelte-1qmh4za{height:100%;width:100%;object-fit:cover;image-rendering:pixelated}.object.static.svelte-1qmh4za.svelte-1qmh4za{pointer-events:none;cursor:default}",
  map: null
};
const Object$1 = (0, import_index_d20a7d6e.c)(($$result, $$props, $$bindings, slots) => {
  let $showLabels, $$unsubscribe_showLabels;
  $$unsubscribe_showLabels = (0, import_index_d20a7d6e.b)(showLabels, (value) => $showLabels = value);
  let { object = {} } = $$props;
  let objectEl = {};
  let label = {};
  let gridPosY = object.y * GRID_SIZE;
  let gridPosX = object.x * GRID_SIZE;
  let gridWidth = (0, import_get.default)(object, "dimensions.width", 1) * GRID_SIZE;
  let gridHeight = (0, import_get.default)(object, "dimensions.height", 1) * GRID_SIZE;
  const inlineStyles = `transform: translateY(${gridPosY}px) translateX(${gridPosX}px); width: ${gridWidth}px; height: ${gridHeight}px;`;
  if ($$props.object === void 0 && $$bindings.object && object !== void 0)
    $$bindings.object(object);
  $$result.css.add(css$B);
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
    "object svelte-1qmh4za",
    (object.static ? "static" : "") + " " + (object.iconImage ? "image" : "")
  ].join(" ").trim()}"${(0, import_index_d20a7d6e.e)("id", object._id, 0)}${(0, import_index_d20a7d6e.e)("alt", object.title, 0)}${(0, import_index_d20a7d6e.e)("style", inlineStyles, 0)}${(0, import_index_d20a7d6e.e)("this", objectEl, 0)}>${object.iconImage ? `<img${(0, import_index_d20a7d6e.e)("src", urlFor(object.iconImage).quality(100).height(300).url(), 0)} class="${"svelte-1qmh4za"}">` : ``}
</div>`;
});
const Objects = (0, import_index_d20a7d6e.c)(($$result, $$props, $$bindings, slots) => {
  let { objects = {} } = $$props;
  if ($$props.objects === void 0 && $$bindings.objects && objects !== void 0)
    $$bindings.objects(objects);
  return `${(0, import_index_d20a7d6e.f)(objects, (object) => {
    return `${(0, import_index_d20a7d6e.v)(Object$1, "Object").$$render($$result, { object }, {}, {})}`;
  })}`;
});
var Zone_svelte_svelte_type_style_lang = "";
const css$A = {
  code: ".zone.svelte-1sqo6n0{height:32px;width:32px;position:absolute;top:0;left:0;cursor:pointer;transition:opacity 0.5s cubic-bezier(0.23, 1, 0.32, 1);pointer-events:none}.zone.svelte-1sqo6n0:hover{background:transparent}",
  map: null
};
const Zone = (0, import_index_d20a7d6e.c)(($$result, $$props, $$bindings, slots) => {
  let $showLabels, $$unsubscribe_showLabels;
  $$unsubscribe_showLabels = (0, import_index_d20a7d6e.b)(showLabels, (value) => $showLabels = value);
  let { zone = {} } = $$props;
  let zoneEl = {};
  let label = {};
  let gridPosY = zone.y * GRID_SIZE;
  let gridPosX = zone.x * GRID_SIZE;
  let gridWidth = (0, import_get.default)(zone, "dimensions.width", 1) * GRID_SIZE;
  let gridHeight = (0, import_get.default)(zone, "dimensions.height", 1) * GRID_SIZE;
  const inlineStyles = `transform: translateY(${gridPosY}px) translateX(${gridPosX}px); width: ${gridWidth}px; height: ${gridHeight}px;};`;
  if ($$props.zone === void 0 && $$bindings.zone && zone !== void 0)
    $$bindings.zone(zone);
  $$result.css.add(css$A);
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
  return `<div class="${"zone svelte-1sqo6n0"}"${(0, import_index_d20a7d6e.e)("id", zone._id, 0)}${(0, import_index_d20a7d6e.e)("alt", zone.title, 0)}${(0, import_index_d20a7d6e.e)("style", inlineStyles, 0)}${(0, import_index_d20a7d6e.e)("this", zoneEl, 0)}>${zone.backgroundImage ? `<img${(0, import_index_d20a7d6e.e)("src", urlFor(zone.backgroundImage).quality(100).url(), 0)}>` : ``}
</div>`;
});
const Zones = (0, import_index_d20a7d6e.c)(($$result, $$props, $$bindings, slots) => {
  let { zones = {} } = $$props;
  if ($$props.zones === void 0 && $$bindings.zones && zones !== void 0)
    $$bindings.zones(zones);
  return `${(0, import_index_d20a7d6e.f)(zones, (zone) => {
    return `${(0, import_index_d20a7d6e.v)(Zone, "Zone").$$render($$result, { zone }, {}, {})}`;
  })}`;
});
const AmbientAudio = (0, import_index_d20a7d6e.c)(($$result, $$props, $$bindings, slots) => {
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
  (0, import_index_d20a7d6e.o)(async () => {
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
const css$z = {
  code: ".portal.svelte-1ulo7kp{height:32px;width:32px;position:absolute;top:0;left:0;cursor:pointer;transition:opacity 0.5s cubic-bezier(0.23, 1, 0.32, 1);pointer-events:none;background-size:contain;background-repeat:no-repeat;background-color:#dedcd5}",
  map: null
};
const Portal = (0, import_index_d20a7d6e.c)(($$result, $$props, $$bindings, slots) => {
  let $showLabels, $$unsubscribe_showLabels;
  $$unsubscribe_showLabels = (0, import_index_d20a7d6e.b)(showLabels, (value) => $showLabels = value);
  let { portal = {} } = $$props;
  let portalEl = {};
  let label = {};
  let gridPosY = portal.y * GRID_SIZE;
  let gridPosX = portal.x * GRID_SIZE;
  const inlineStyles = `transform: translateY(${gridPosY}px) translateX(${gridPosX}px); width: ${GRID_SIZE}px; height: ${GRID_SIZE}px; background-color: ${(0, import_get.default)(portal, "backgroundColor.hex", "")}; background-image: url("${(0, import_get.default)(portal, "bgImageUrl", "")}");"`;
  if ($$props.portal === void 0 && $$bindings.portal && portal !== void 0)
    $$bindings.portal(portal);
  $$result.css.add(css$z);
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
  return `<div class="${"portal svelte-1ulo7kp"}"${(0, import_index_d20a7d6e.e)("id", portal._id, 0)}${(0, import_index_d20a7d6e.e)("alt", portal.title, 0)}${(0, import_index_d20a7d6e.e)("style", inlineStyles, 0)}${(0, import_index_d20a7d6e.e)("this", portalEl, 0)}>${portal.iconImage ? `<img${(0, import_index_d20a7d6e.e)("src", urlFor(portal.iconImage).quality(100).height(100).url(), 0)}>` : ``}
</div>`;
});
const Portals = (0, import_index_d20a7d6e.c)(($$result, $$props, $$bindings, slots) => {
  let { portals = {} } = $$props;
  if ($$props.portals === void 0 && $$bindings.portals && portals !== void 0)
    $$bindings.portals(portals);
  return `${(0, import_index_d20a7d6e.f)(portals, (portal) => {
    return `${(0, import_index_d20a7d6e.v)(Portal, "Portal").$$render($$result, { portal }, {}, {})}`;
  })}`;
});
var TargetMarker_svelte_svelte_type_style_lang = "";
const css$y = {
  code: ".target.svelte-sfd7q3{height:20px;width:20px;border-radius:50%;position:absolute;top:0;left:0;background:#221f20;opacity:0.2}",
  map: null
};
const TargetMarker = (0, import_index_d20a7d6e.c)(($$result, $$props, $$bindings, slots) => {
  let { x = 0 } = $$props;
  let { y = 0 } = $$props;
  if ($$props.x === void 0 && $$bindings.x && x !== void 0)
    $$bindings.x(x);
  if ($$props.y === void 0 && $$bindings.y && y !== void 0)
    $$bindings.y(y);
  $$result.css.add(css$y);
  return `

<div class="${"target svelte-sfd7q3"}"${(0, import_index_d20a7d6e.e)("style", "top: " + y + "px; left: " + x + "px;", 0)}></div>`;
});
var Clock_svelte_svelte_type_style_lang = "";
const css$x = {
  code: ".clock.svelte-13is0nm{font-size:12px;color:#f5f4ee}",
  map: null
};
const Clock = (0, import_index_d20a7d6e.c)(($$result, $$props, $$bindings, slots) => {
  let $activeCity, $$unsubscribe_activeCity;
  $$unsubscribe_activeCity = (0, import_index_d20a7d6e.b)(activeCity, (value) => $activeCity = value);
  const API_KEY = "a9b67d6b5ed093b28c410750ef6a70cd";
  let currentTime;
  let currentWeather = { description: "", temperature: 0 };
  let showClock = false;
  const updateTime = () => {
    let d = new Date();
    if ($activeCity.timezone) {
      currentTime = new Intl.DateTimeFormat("en-US", {
        timeZone: $activeCity.timezone,
        hour: "numeric",
        minute: "numeric"
      }).format(d);
    }
  };
  setInterval(updateTime, 1e4);
  updateTime();
  const weatherCodeToDescription = (id) => {
    if ((0, import_inRange.default)(id, 200, 299))
      return "stormy";
    if ((0, import_inRange.default)(id, 300, 599))
      return "rainy";
    if ((0, import_inRange.default)(id, 600, 699))
      return "snowy";
    if (id == 701 || id == 711)
      return "misty";
    if (id == 721 || id == 731)
      return "hazy";
    if (id == 741)
      return "foggy";
    if ((0, import_inRange.default)(id, 801, 899))
      return "cloudy";
    return "clear";
  };
  const updateWeather = (city, country) => {
    showClock = false;
    if (city) {
      fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + API_KEY).then((response) => response.json()).then((data) => {
        if ((0, import_has.default)(data, "weather[0].description")) {
          currentWeather.description = weatherCodeToDescription(data.weather[0].id);
          currentWeather.temperature = Math.round((data.main.temp - 273.15) * 9 / 5 + 32);
          showClock = true;
        }
      });
    }
  };
  $$result.css.add(css$x);
  {
    {
      updateTime();
      updateWeather($activeCity.name);
    }
  }
  $$unsubscribe_activeCity();
  return `<div class="${"clock svelte-13is0nm"}">${showClock && $activeCity.name ? `<span>It\u2019s ${(0, import_index_d20a7d6e.g)(currentTime)} and ${(0, import_index_d20a7d6e.g)(currentWeather.description)} in ${(0, import_index_d20a7d6e.g)($activeCity.name)}</span>` : ``}
</div>`;
});
var personLink_svelte_svelte_type_style_lang = "";
const css$w = {
  code: ".pop-up.svelte-18s68xb.svelte-18s68xb{background:#f5f4ee;padding:20px;border:1px solid #221f20;z-index:1000;color:#221f20;position:relative;display:none;max-width:360px}.pop-up.svelte-18s68xb .name.svelte-18s68xb{font-weight:bold;margin-right:10px}.pop-up.show{display:flex !important}a.svelte-18s68xb.svelte-18s68xb{color:#221f20;background:#dedcd5;text-decoration:none;margin-bottom:3px;display:inline-block}.column.first.svelte-18s68xb.svelte-18s68xb{padding-right:20px}",
  map: null
};
const Person_link = (0, import_index_d20a7d6e.c)(($$result, $$props, $$bindings, slots) => {
  let { person = false } = $$props;
  let { overrideText = false } = $$props;
  let { personId = false } = $$props;
  let linkEl = {};
  let popEl = {};
  const initPopper = () => {
    (0, import_core.createPopper)(linkEl, popEl, {
      placement: "bottom-start",
      modifiers: [
        {
          name: "offset",
          options: { offset: [10, 5] }
        },
        { name: "eventListeners", enabled: false }
      ]
    });
  };
  const renderNewLines = (t) => t.replace(/(?:\r\n|\r|\n)/g, "<br>");
  if (personId) {
    console.log("loading-data");
    loadData('*[_id == "' + personId + '"][0]').then((p) => {
      person = p;
      setTimeout(initPopper, 1e3);
    });
  }
  if ($$props.person === void 0 && $$bindings.person && person !== void 0)
    $$bindings.person(person);
  if ($$props.overrideText === void 0 && $$bindings.overrideText && overrideText !== void 0)
    $$bindings.overrideText(overrideText);
  if ($$props.personId === void 0 && $$bindings.personId && personId !== void 0)
    $$bindings.personId(personId);
  $$result.css.add(css$w);
  return `${person ? `<a${(0, import_index_d20a7d6e.e)("href", "/people/" + (0, import_get.default)(person, "slug.current"), 0)} sveltekit:prefetch class="${"svelte-18s68xb"}"${(0, import_index_d20a7d6e.e)("this", linkEl, 0)}><!-- HTML_TAG_START -->${overrideText ? renderNewLines(overrideText) : person.title}<!-- HTML_TAG_END --></a>

  <div class="${"pop-up svelte-18s68xb"}"${(0, import_index_d20a7d6e.e)("this", popEl, 0)}>
    
    
    <div class="${"column first svelte-18s68xb"}">
      <div class="${"name svelte-18s68xb"}">${(0, import_index_d20a7d6e.g)(person.title)}</div>
      
      <div class="${"badges"}">${person.role ? `<div class="${"badge"}">${(0, import_index_d20a7d6e.g)(roleToRoleName[person.role])}</div>` : ``}
        ${person.groupTags ? `${(0, import_index_d20a7d6e.f)(person.groupTags, (tag) => {
    return `<div class="${"badge"}">${(0, import_index_d20a7d6e.g)(tag.label)}</div>`;
  })}` : ``}</div></div>
    
    <div class="${"column second"}">
      ${person.mainImage ? `<img class="${"image"}"${(0, import_index_d20a7d6e.e)("alt", person.title, 0)}${(0, import_index_d20a7d6e.e)("src", urlFor(person.mainImage).quality(90).saturation(-100).width(100).height(100).url(), 0)}>` : ``}</div></div>` : ``}`;
});
var externalLink_svelte_svelte_type_style_lang = "";
const css$v = {
  code: "svg.svelte-18gy7aj.svelte-18gy7aj{margin-left:4px}svg.svelte-18gy7aj path.svelte-18gy7aj{fill:#221f20}",
  map: null
};
const External_link = (0, import_index_d20a7d6e.c)(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$v);
  return `<svg width="${"11"}" height="${"11"}" viewBox="${"0 0 11 11"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}" class="${"svelte-18gy7aj"}"><path d="${"M3.9378 1.68763V2.81271H1.12509V9.00068H7.31305V6.18797H8.43814V9.56322C8.43814 9.72074 8.38376 9.85387 8.275 9.96263C8.16624 10.0714 8.03311 10.1258 7.8756 10.1258H0.562543C0.40503 10.1258 0.271896 10.0714 0.163137 9.96263C0.0543785 9.85387 0 9.72074 0 9.56322V2.25017C0 2.09266 0.0543785 1.95952 0.163137 1.85077C0.271896 1.74201 0.40503 1.68763 0.562543 1.68763H3.9378ZM10.1258 0V4.50034H9.00068V1.9239L4.61285 6.30048L3.82529 5.51292L8.20187 1.12509H5.62543V0H10.1258Z"}" class="${"svelte-18gy7aj"}"></path></svg>`;
});
const Text = (0, import_index_d20a7d6e.c)(($$result, $$props, $$bindings, slots) => {
  let { b = {} } = $$props;
  const renderNewLines = (t) => t.replace(/(?:\r\n|\r|\n)/g, "<br>");
  if ($$props.b === void 0 && $$bindings.b && b !== void 0)
    $$bindings.b(b);
  return `${b.children && b.children.length > 0 ? `${b.style == "h2" ? `<h2${(0, import_index_d20a7d6e.e)("id", (0, import_slugify.default)(b.children[0].text, { lower: true }), 0)}>${(0, import_index_d20a7d6e.f)(b.children, (c) => {
    return `${!c.marks || c.marks.length === 0 ? `${(0, import_index_d20a7d6e.g)(c.text)}` : `<strong>${(0, import_index_d20a7d6e.g)(c.text)}</strong>`}`;
  })}</h2>` : `${b.style == "h3" ? `<h3>${(0, import_index_d20a7d6e.f)(b.children, (c) => {
    return `${(0, import_index_d20a7d6e.g)(c.text)}`;
  })}</h3>` : `<p>${(0, import_index_d20a7d6e.f)(b.children, (c) => {
    return `${!c.marks || c.marks.length === 0 ? `<!-- HTML_TAG_START -->${renderNewLines(c.text)}<!-- HTML_TAG_END -->` : `${c.marks.includes("em") ? `<em><!-- HTML_TAG_START -->${renderNewLines(c.text)}<!-- HTML_TAG_END --></em>` : `${c.marks.includes("strong") ? `<strong><!-- HTML_TAG_START -->${renderNewLines(c.text)}<!-- HTML_TAG_END --></strong>` : `${b.markDefs.find((m) => m._key === c.marks[0])._type === "link" ? `<a${(0, import_index_d20a7d6e.e)("href", b.markDefs.find((m) => m._key === c.marks[0]).href, 0)}><!-- HTML_TAG_START -->${renderNewLines(c.text)}<!-- HTML_TAG_END --> ${(0, import_index_d20a7d6e.v)(External_link, "ExternalLink").$$render($$result, {}, {}, {})}</a>` : ``}
          ${b.markDefs.find((m) => m._key === c.marks[0])._type === "person" ? `${(0, import_index_d20a7d6e.v)(Person_link, "PersonLink").$$render($$result, {
      overrideText: c.text,
      personId: b.markDefs.find((m) => m._key === c.marks[0]).link._ref
    }, {}, {})}` : ``}`}`}`}`;
  })}</p>`}`}` : ``}`;
});
var image_svelte_svelte_type_style_lang = "";
const css$u = {
  code: "figure.svelte-1bbn2f1.svelte-1bbn2f1{margin-left:20px;margin-right:20px;float:left;border:1px solid #221f20;float:left;max-width:50%}figure.right.svelte-1bbn2f1.svelte-1bbn2f1{float:right;max-width:50%}figure.full.svelte-1bbn2f1.svelte-1bbn2f1{float:unset;margin-left:0;margin-right:0;margin-top:0;border:unset;max-width:unset;width:100%}figure.full.svelte-1bbn2f1 img.svelte-1bbn2f1{display:block;margin-left:auto;margin-right:auto}figure.full.svelte-1bbn2f1 figcaption.svelte-1bbn2f1{padding:20px;border-top:1px solid #221f20;border-bottom:1px solid #221f20}figure.cover.svelte-1bbn2f1.svelte-1bbn2f1{float:unset}figure.cover.svelte-1bbn2f1 img.svelte-1bbn2f1{width:100%;height:600px;object-fit:cover;object-position:center}@media(max-width: 800px){figure.cover.svelte-1bbn2f1 img.svelte-1bbn2f1{height:300px}}figure.cover.svelte-1bbn2f1 figcaption.svelte-1bbn2f1{padding:20px;border-top:1px solid #221f20;border-bottom:1px solid #221f20}@media(max-width: 800px){figure.cover.svelte-1bbn2f1 figcaption.svelte-1bbn2f1{padding-left:0;padding-right:0}}.article figcaption p{margin-bottom:0;margin-left:0;margin-right:0}",
  map: null
};
const Image = (0, import_index_d20a7d6e.c)(($$result, $$props, $$bindings, slots) => {
  let { b = {} } = $$props;
  if ($$props.b === void 0 && $$bindings.b && b !== void 0)
    $$bindings.b(b);
  $$result.css.add(css$u);
  return `<figure class="${[
    "svelte-1bbn2f1",
    (b.layout == "left" ? "left" : "") + " " + (b.layout == "right" ? "right" : "") + " " + (b.fullWidth ? "full" : "") + " " + (b.coverAndCrop ? "cover" : "")
  ].join(" ").trim()}"><img${(0, import_index_d20a7d6e.e)("src", urlFor(b.asset).quality(90).saturation(-100).width(1e3).url(), 0)}${(0, import_index_d20a7d6e.e)("alt", b.alt ? b.alt : "", 0)} class="${"svelte-1bbn2f1"}">
  ${(0, import_has.default)(b, "caption.content") ? `<figcaption class="${"svelte-1bbn2f1"}">${(0, import_index_d20a7d6e.v)(Blocks, "Blocks").$$render($$result, { blocks: b.caption.content }, {}, {})}</figcaption>` : ``}
</figure>`;
});
var imageFromMainSite_svelte_svelte_type_style_lang = "";
const css$t = {
  code: "figure.svelte-1bbn2f1.svelte-1bbn2f1{margin-left:20px;margin-right:20px;float:left;border:1px solid #221f20;float:left;max-width:50%}figure.right.svelte-1bbn2f1.svelte-1bbn2f1{float:right;max-width:50%}figure.full.svelte-1bbn2f1.svelte-1bbn2f1{float:unset;margin-left:0;margin-right:0;margin-top:0;border:unset;max-width:unset;width:100%}figure.full.svelte-1bbn2f1 img.svelte-1bbn2f1{display:block;margin-left:auto;margin-right:auto}figure.full.svelte-1bbn2f1 figcaption.svelte-1bbn2f1{padding:20px;border-top:1px solid #221f20;border-bottom:1px solid #221f20}figure.cover.svelte-1bbn2f1.svelte-1bbn2f1{float:unset}figure.cover.svelte-1bbn2f1 img.svelte-1bbn2f1{width:100%;height:600px;object-fit:cover;object-position:center}@media(max-width: 800px){figure.cover.svelte-1bbn2f1 img.svelte-1bbn2f1{height:300px}}figure.cover.svelte-1bbn2f1 figcaption.svelte-1bbn2f1{padding:20px;border-top:1px solid #221f20;border-bottom:1px solid #221f20}@media(max-width: 800px){figure.cover.svelte-1bbn2f1 figcaption.svelte-1bbn2f1{padding-left:0;padding-right:0}}.article figcaption p{margin-bottom:0;margin-left:0;margin-right:0}",
  map: null
};
const ImageFromMainSite = (0, import_index_d20a7d6e.c)(($$result, $$props, $$bindings, slots) => {
  let { b = {} } = $$props;
  if ($$props.b === void 0 && $$bindings.b && b !== void 0)
    $$bindings.b(b);
  $$result.css.add(css$t);
  return `<figure class="${[
    "svelte-1bbn2f1",
    (b.layout == "left" ? "left" : "") + " " + (b.layout == "right" ? "right" : "") + " " + (b.fullWidth ? "full" : "") + " " + (b.coverAndCrop ? "cover" : "")
  ].join(" ").trim()}"><img${(0, import_index_d20a7d6e.e)("src", urlForMainSite(b.asset).quality(90).saturation(-100).width(1e3).url(), 0)}${(0, import_index_d20a7d6e.e)("alt", b.alt ? b.alt : "", 0)} class="${"svelte-1bbn2f1"}">
  ${(0, import_has.default)(b, "caption.content") ? `<figcaption class="${"svelte-1bbn2f1"}">${(0, import_index_d20a7d6e.v)(Blocks, "Blocks").$$render($$result, { blocks: b.caption.content }, {}, {})}</figcaption>` : ``}
</figure>`;
});
var invertedBlock_svelte_svelte_type_style_lang = "";
const css$s = {
  code: ".inverted-block.svelte-g37r8{width:100%;background:#221f20;padding:40px;color:#f5f4ee}",
  map: null
};
const InvertedBlock = (0, import_index_d20a7d6e.c)(($$result, $$props, $$bindings, slots) => {
  let { b = {} } = $$props;
  if ($$props.b === void 0 && $$bindings.b && b !== void 0)
    $$bindings.b(b);
  $$result.css.add(css$s);
  return `<div class="${"inverted-block svelte-g37r8"}">${(0, import_index_d20a7d6e.v)(Text, "Text").$$render($$result, { b }, {}, {})}
</div>`;
});
var blockBeam_svelte_svelte_type_style_lang = "";
const css$r = {
  code: "svg.svelte-12vsv5 path.svelte-12vsv5{fill:none;stroke:#221f20;stroke-width:2.5px;stroke-miterlimit:10}",
  map: null
};
const Block_beam = (0, import_index_d20a7d6e.c)(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$r);
  return `<svg version="${"1.1"}" id="${"Layer_1"}" xmlns="${"http://www.w3.org/2000/svg"}" xmlns:xlink="${"http://www.w3.org/1999/xlink"}" x="${"0px"}" y="${"0px"}" viewBox="${"0 0 326.4 167.6"}" style="${"enable-background:new 0 0 326.4 167.6;"}" xml:space="${"preserve"}" class="${"svelte-12vsv5"}"><path class="${"st0 svelte-12vsv5"}" d="${"M323.1,136.7l-121.6,21.4 M316.2,109.3l-116,42.2 M304.3,83.3l-106.9,61.6 M287.8,60.7L193.2,140 M269.1,41\n		l-79.3,94.4 M245.5,24.3L183.8,131 M219.2,12L177,127.9 M192.5,4.4l-21.4,121.4 M325,165.7H201.5 M2.4,136.7l121.6,21.4 M9.3,109.3\n		l116,42.2 M21.2,83.3l106.9,61.6 M37.7,60.7l94.6,79.2 M56.4,41l79.3,94.4 M80,24.3L141.7,131 M106.3,12l42.2,115.8 M133,4.4\n		l21.4,121.4 M161.9,1.8l0,123.3 M0.5,165.7H124"}"></path></svg>`;
});
var logoBlock_svelte_svelte_type_style_lang = "";
const css$q = {
  code: ".logo-block.svelte-1y9hgkm.svelte-1y9hgkm{margin-left:20px;margin-right:20px;margin-bottom:20px;width:calc(100% - 40px);border-bottom:1px solid #221f20;font-size:16px}.logo-block.svelte-1y9hgkm .top-row.svelte-1y9hgkm{display:flex}.logo-block.svelte-1y9hgkm .top-row .beam.svelte-1y9hgkm{width:160px;position:relative;top:0;left:1px;padding:0;line-height:0;display:inline-block}.logo-block.svelte-1y9hgkm .top-row .line.svelte-1y9hgkm{border-bottom:1px solid #221f20;width:100%}.logo-block.svelte-1y9hgkm .logoblock-text.svelte-1y9hgkm{padding-top:40px;padding-bottom:40px}.article .logoblock-text p{padding-left:0;padding-right:0;margin-top:0;margin-bottom:0}",
  map: null
};
const LogoBlock = (0, import_index_d20a7d6e.c)(($$result, $$props, $$bindings, slots) => {
  let { b = {} } = $$props;
  if ($$props.b === void 0 && $$bindings.b && b !== void 0)
    $$bindings.b(b);
  $$result.css.add(css$q);
  return `<div class="${"logo-block svelte-1y9hgkm"}"><div class="${"top-row svelte-1y9hgkm"}"><div class="${"beam svelte-1y9hgkm"}">${(0, import_index_d20a7d6e.v)(Block_beam, "BlockBeam").$$render($$result, {}, {}, {})}</div>
    <div class="${"line svelte-1y9hgkm"}"></div></div>
  <div class="${"logoblock-text svelte-1y9hgkm"}">${(0, import_index_d20a7d6e.v)(Text, "Text").$$render($$result, { b }, {}, {})}</div>
</div>`;
});
var embed_svelte_svelte_type_style_lang = "";
const css$p = {
  code: ".embed.svelte-23luwt.svelte-23luwt{color:#f5f4ee;margin-bottom:20px;cursor:pointer;display:flex;justify-content:center;align-items:center;padding-bottom:20px;padding-top:20px;width:100%}.embed.svelte-23luwt .inner.svelte-23luwt{width:720px}@media(max-width: 800px){.embed.svelte-23luwt .inner.svelte-23luwt{width:480px}}.embed.svelte-23luwt .inner iframe.svelte-23luwt{width:100%}.embed.full .inner.svelte-23luwt iframe.svelte-23luwt{height:100vh}",
  map: null
};
const Embed = (0, import_index_d20a7d6e.c)(($$result, $$props, $$bindings, slots) => {
  let { b = {} } = $$props;
  if ($$props.b === void 0 && $$bindings.b && b !== void 0)
    $$bindings.b(b);
  $$result.css.add(css$p);
  return `<div class="${"embed svelte-23luwt"}"><div class="${"inner svelte-23luwt"}">${b.url.includes("youtube") ? `<iframe width="${"720"}" height="${"480"}" src="${"https://www.youtube.com/embed/" + (0, import_index_d20a7d6e.g)((0, import_get_video_id.default)(b.url).id)}" frameborder="${"0"}" allow="${"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"}" allowfullscreen class="${"svelte-23luwt"}"></iframe>` : ``}
    ${b.url.includes("vimeo") ? `<iframe width="${"720"}" height="${"480"}" src="${"https://player.vimeo.com/video/" + (0, import_index_d20a7d6e.g)((0, import_get_video_id.default)(b.url).id)}" frameborder="${"0"}" byline="${"false"}" color="${"#ffffff"}" allow="${"autoplay; fullscreen"}" allowfullscreen class="${"svelte-23luwt"}"></iframe>` : ``}</div></div>

${(0, import_has.default)(b, "caption.content") ? `<figcaption>${(0, import_index_d20a7d6e.v)(Blocks, "Blocks").$$render($$result, { blocks: b.caption.content }, {}, {})}</figcaption>` : ``}`;
});
var divider_svelte_svelte_type_style_lang = "";
const css$o = {
  code: ".divider.svelte-ibl5lr{margin-top:20px;margin-bottom:20px;height:1px;border-top:1px solid #221f20;width:100%}",
  map: null
};
const Divider = (0, import_index_d20a7d6e.c)(($$result, $$props, $$bindings, slots) => {
  let { b = {} } = $$props;
  if ($$props.b === void 0 && $$bindings.b && b !== void 0)
    $$bindings.b(b);
  $$result.css.add(css$o);
  return `<div class="${"divider svelte-ibl5lr"}"></div>`;
});
var columns_svelte_svelte_type_style_lang = "";
const css$n = {
  code: ".columns.svelte-1yggcq h2.svelte-1yggcq{padding-top:20px;padding-bottom:20px}.columns.svelte-1yggcq .inner.svelte-1yggcq{width:100%;column-count:2;column-fill:balance;column-width:50%}",
  map: null
};
const Columns = (0, import_index_d20a7d6e.c)(($$result, $$props, $$bindings, slots) => {
  let { b = {} } = $$props;
  if ($$props.b === void 0 && $$bindings.b && b !== void 0)
    $$bindings.b(b);
  $$result.css.add(css$n);
  return `<div class="${"columns svelte-1yggcq"}">${b.title ? `<h2${(0, import_index_d20a7d6e.e)("id", (0, import_slugify.default)(b.title, { lower: true }), 0)} class="${"svelte-1yggcq"}">${(0, import_index_d20a7d6e.g)(b.title)}</h2>` : ``}
  ${(0, import_has.default)(b, "columnContent.content") ? `<div class="${"inner svelte-1yggcq"}">${(0, import_index_d20a7d6e.v)(Blocks, "Blocks").$$render($$result, { blocks: b.columnContent.content }, {}, {})}</div>` : ``}
</div>`;
});
var donationWidget_svelte_svelte_type_style_lang = "";
const css$m = {
  code: ".donation-widget.svelte-g1dluc{margin-top:20px;height:600px;background:red;width:100%}.gl-widget__frequency-selection-container{height:200px;background:yellow}.gl-widget__input-group{height:200px;background:green}.gl-widget__payment{height:200px;background:blue}.gl-widget__frequency-buttons{height:100% !important}",
  map: null
};
const DonationWidget = (0, import_index_d20a7d6e.c)(($$result, $$props, $$bindings, slots) => {
  let { b = {} } = $$props;
  if ($$props.b === void 0 && $$bindings.b && b !== void 0)
    $$bindings.b(b);
  $$result.css.add(css$m);
  return `${$$result.head += `<script src="${"https://secure.givelively.org/widgets/simple_donation/the-eyebeam-atelier-inc/donate-to-eyebeam.js?show_suggested_amount_buttons=false&show_in_honor_of=false&address_required=false&has_required_custom_question=false"}" data-svelte="svelte-1cxe6br"><\/script>`, ""}

<div class="${"donation-widget svelte-g1dluc"}">
  <div id="${"give-lively-widget"}" class="${"gl-simple-donation-widget"}"></div>
</div>`;
});
var applicationButton_svelte_svelte_type_style_lang = "";
const css$l = {
  code: ".application-button-small.svelte-1dlavbd.svelte-1dlavbd{margin-top:0;margin-bottom:40px;display:inline-block;width:100%}.application-button-small.svelte-1dlavbd .application-button-inner.svelte-1dlavbd{margin:20px;display:inline-block}.application-button-small.svelte-1dlavbd .application-button-inner .button.svelte-1dlavbd{background:#dedcd5;padding:15px;display:flex;align-items:center;text-decoration:none}.application-button-small.svelte-1dlavbd .application-button-inner .button .circle.svelte-1dlavbd{width:20px;height:20px;border-radius:50%;background:#221f20}.application-button-small.svelte-1dlavbd .application-button-inner .button .applications-text.svelte-1dlavbd{margin-left:10px;font-size:14px}.application-button-small.svelte-1dlavbd .application-button-inner .button.svelte-1dlavbd:hover{background:#221f20;color:#dedcd5}.application-button-small.svelte-1dlavbd .application-button-inner .button:hover .circle.svelte-1dlavbd{background:#dedcd5}.application-button-small.svelte-1dlavbd .application-button-inner .date.svelte-1dlavbd{margin-top:8px;font-style:italic}.application-button-large.svelte-1dlavbd.svelte-1dlavbd{width:100%;background:#221f20;color:#f5f4ee;height:220px;padding:20px;display:flex}@media(max-width: 800px){.application-button-large.svelte-1dlavbd.svelte-1dlavbd{flex-wrap:wrap}}.application-button-large.svelte-1dlavbd .column.svelte-1dlavbd{height:100%}@media(max-width: 800px){.application-button-large.svelte-1dlavbd .column.svelte-1dlavbd{height:auto}}.application-button-large.svelte-1dlavbd .column.first.svelte-1dlavbd{width:80%;display:flex;flex-direction:column;justify-content:space-between}@media(max-width: 800px){.application-button-large.svelte-1dlavbd .column.first.svelte-1dlavbd{width:100%}}.application-button-large.svelte-1dlavbd .column.second.svelte-1dlavbd{width:220px}@media(max-width: 800px){.application-button-large.svelte-1dlavbd .column.second.svelte-1dlavbd{width:100%}}.application-button-large.svelte-1dlavbd .top.svelte-1dlavbd{display:flex;font-size:14px}.application-button-large.svelte-1dlavbd .top .col.second.svelte-1dlavbd{margin-left:10px}.application-button-large.svelte-1dlavbd .circle.svelte-1dlavbd{width:20px;height:20px;background:#f5f4ee;border-radius:50%;float:left;margin-top:2px}.application-button-large.svelte-1dlavbd .headline.svelte-1dlavbd{font-size:12px;letter-spacing:1px}.application-button-large.svelte-1dlavbd .date.svelte-1dlavbd{font-style:italic}.application-button-large.svelte-1dlavbd .text.svelte-1dlavbd{padding-right:40px;font-size:16px}@media(max-width: 800px){.application-button-large.svelte-1dlavbd .text.svelte-1dlavbd{display:none}}.application-button-large.svelte-1dlavbd .apply-now.svelte-1dlavbd{border:1px solid #f5f4ee;height:100%;display:flex;justify-content:center;align-items:center;cursor:pointer;user-select:none;color:#f5f4ee;text-decoration:none;font-size:16px}.application-button-large.svelte-1dlavbd .apply-now.svelte-1dlavbd:hover{background:#f5f4ee;color:#221f20}.article .application-button-large .text p{margin-bottom:0;margin-left:0;margin-right:0}",
  map: null
};
const ApplicationButton = (0, import_index_d20a7d6e.c)(($$result, $$props, $$bindings, slots) => {
  let { b = {} } = $$props;
  if ($$props.b === void 0 && $$bindings.b && b !== void 0)
    $$bindings.b(b);
  $$result.css.add(css$l);
  return `${b.size == "large" ? `
  <div class="${"application-button-large svelte-1dlavbd"}"><div class="${"column first svelte-1dlavbd"}">
      <div class="${"top svelte-1dlavbd"}"><div class="${"col first"}"><div class="${"circle svelte-1dlavbd"}"></div></div>
        <div class="${"col second svelte-1dlavbd"}"><div class="${"headline svelte-1dlavbd"}">APPLICATIONS ARE OPEN</div>
          ${b.applicationEndDate ? `<div class="${"date svelte-1dlavbd"}">Due by ${(0, import_index_d20a7d6e.g)(longFormatDate(b.applicationEndDate))}</div>` : ``}</div></div>

      
      ${(0, import_has.default)(b, "longText.content") ? `<div class="${"text svelte-1dlavbd"}">${(0, import_index_d20a7d6e.v)(Blocks, "Blocks").$$render($$result, { blocks: b.longText.content }, {}, {})}</div>` : ``}</div>

    <div class="${"column second svelte-1dlavbd"}">
      <a${(0, import_index_d20a7d6e.e)("href", b.url, 0)} target="${"_blank"}" class="${"apply-now svelte-1dlavbd"}">${(0, import_index_d20a7d6e.g)(b.shortText)}</a></div></div>` : `
  <div class="${"application-button-small svelte-1dlavbd"}"><div class="${"application-button-inner svelte-1dlavbd"}"><a${(0, import_index_d20a7d6e.e)("href", b.url, 0)} target="${"_blank"}" class="${"button svelte-1dlavbd"}">${b.applicationEndDate ? `<div class="${"circle svelte-1dlavbd"}"></div>` : ``}
        <div class="${"applications-text svelte-1dlavbd"}"><div class="${"short-text"}">${(0, import_index_d20a7d6e.g)(b.shortText)}</div>
          ${b.applicationEndDate ? `<div class="${"date svelte-1dlavbd"}">Applications Due by ${(0, import_index_d20a7d6e.g)(longFormatDate(b.applicationEndDate))}</div>` : ``}</div></a></div></div>`}`;
});
var arrowDown_svelte_svelte_type_style_lang = "";
const css$k = {
  code: "svg.svelte-hhwbji path.svelte-hhwbji{fill:#f5f4ee}",
  map: null
};
const Arrow_down = (0, import_index_d20a7d6e.c)(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$k);
  return `<svg width="${"9"}" height="${"8"}" viewBox="${"0 0 9 8"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}" class="${"svelte-hhwbji"}"><path d="${"M4.78393 7.78516L0.640486 0.608508L8.92737 0.608508L4.78393 7.78516Z"}" class="${"svelte-hhwbji"}"></path></svg>`;
});
var arrowLeft_svelte_svelte_type_style_lang = "";
const css$j = {
  code: "svg.svelte-bl0yym path.svelte-bl0yym{fill:#221f20}",
  map: null
};
const Arrow_left = (0, import_index_d20a7d6e.c)(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$j);
  return `<svg width="${"8"}" height="${"10"}" viewBox="${"0 0 8 10"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}" class="${"svelte-bl0yym"}"><path d="${"M-0.000488072 5.06677L7.17615 9.45473L7.17615 0.678818L-0.000488072 5.06677Z"}" class="${"svelte-bl0yym"}"></path></svg>`;
});
var qa_svelte_svelte_type_style_lang = "";
const css$i = {
  code: ".qa.svelte-nx2f1v.svelte-nx2f1v{width:100%;display:inline-block}.qa.svelte-nx2f1v .question.svelte-nx2f1v{width:100%;display:flex;justify-content:space-between;border-bottom:1px solid #221f20;cursor:pointer}.qa.svelte-nx2f1v .question .text.svelte-nx2f1v{font-style:italic;user-select:none;padding-top:10px;padding-bottom:10px;font-size:14px}.qa.svelte-nx2f1v .question .icon.svelte-nx2f1v{position:relative;top:6px}.qa.svelte-nx2f1v .answer.svelte-nx2f1v{border-bottom:1px solid #221f20}",
  map: null
};
const Qa = (0, import_index_d20a7d6e.c)(($$result, $$props, $$bindings, slots) => {
  let { item = {} } = $$props;
  if ($$props.item === void 0 && $$bindings.item && item !== void 0)
    $$bindings.item(item);
  $$result.css.add(css$i);
  return `<div class="${"qa svelte-nx2f1v"}"><div class="${"question svelte-nx2f1v"}"><div class="${"text svelte-nx2f1v"}">${(0, import_index_d20a7d6e.g)(item.question)}</div>
    <div class="${"icon svelte-nx2f1v"}">${`${(0, import_index_d20a7d6e.v)(Arrow_left, "ArrowLeft").$$render($$result, {}, {}, {})}`}</div></div>
  ${``}
</div>`;
});
var faq_svelte_svelte_type_style_lang = "";
const css$h = {
  code: ".faq.svelte-1lh5ive.svelte-1lh5ive{display:inline-block;width:100%;padding:20px;margin-bottom:40px}.faq.svelte-1lh5ive h2.svelte-1lh5ive{margin-left:0;margin-right:0}@media(max-width: 800px){.faq.svelte-1lh5ive.svelte-1lh5ive{padding-left:0;padding-right:0}}.faq.svelte-1lh5ive .faq-inner.svelte-1lh5ive{margin-top:1em}",
  map: null
};
const Faq = (0, import_index_d20a7d6e.c)(($$result, $$props, $$bindings, slots) => {
  let { b = {} } = $$props;
  if ($$props.b === void 0 && $$bindings.b && b !== void 0)
    $$bindings.b(b);
  $$result.css.add(css$h);
  return `<div class="${"faq svelte-1lh5ive"}"><h2${(0, import_index_d20a7d6e.e)("id", (0, import_slugify.default)(b.title, { lower: true }), 0)} class="${"svelte-1lh5ive"}">${(0, import_index_d20a7d6e.g)(b.title)}</h2>
  <div class="${"faq-inner svelte-1lh5ive"}">${(0, import_index_d20a7d6e.f)(b.questionAnswer, (item) => {
    return `${(0, import_index_d20a7d6e.v)(Qa, "QA").$$render($$result, { item }, {}, {})}`;
  })}</div>
</div>`;
});
var playArrow_svelte_svelte_type_style_lang = "";
const css$g = {
  code: "svg.svelte-bl0yym path.svelte-bl0yym{fill:#221f20}",
  map: null
};
const Play_arrow = (0, import_index_d20a7d6e.c)(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$g);
  return `<svg width="${"21"}" height="${"35"}" viewBox="${"0 0 21 35"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}" class="${"svelte-bl0yym"}"><path d="${"M0.123047 34.0552V0L20.5614 17.0276L0.123047 34.0552Z"}" class="${"svelte-bl0yym"}"></path></svg>`;
});
var video_svelte_svelte_type_style_lang = "";
const css$f = {
  code: ".video-block.svelte-139dsg8.svelte-139dsg8{text-decoration:none;width:100%;position:relative;display:block;height:400px;margin-bottom:20px}.video-block.svelte-139dsg8 img.svelte-139dsg8{display:block;width:100%;height:100%;position:absolute;top:0;left:0}.video-block.svelte-139dsg8 .title.svelte-139dsg8{display:block;position:absolute;top:10px;left:80px;z-index:10;color:#f5f4ee;font-size:32px;line-height:1.2em}.video-block.svelte-139dsg8 .icon.svelte-139dsg8{position:absolute;top:10px;left:10px;z-index:100;width:70px;height:70px;border-radius:50%;background:#f5f4ee;color:#f5f4ee;line-height:1.2em;display:flex;justify-content:center;align-items:center}",
  map: null
};
const Video = (0, import_index_d20a7d6e.c)(($$result, $$props, $$bindings, slots) => {
  let { b = {} } = $$props;
  const videoPost = loadData("*[_id == $id][0]", { id: b.videoPost._ref });
  if ($$props.b === void 0 && $$bindings.b && b !== void 0)
    $$bindings.b(b);
  $$result.css.add(css$f);
  return `${function(__value) {
    if ((0, import_index_d20a7d6e.i)(__value)) {
      __value.then(null, import_index_d20a7d6e.n);
      return ``;
    }
    return function(videoPost2) {
      return `
  <a${(0, import_index_d20a7d6e.e)("href", "/videos/" + (0, import_get.default)(videoPost2, "slug.current"), 0)} class="${"video-block svelte-139dsg8"}">
    ${videoPost2.mainImage ? `<img class="${"main-image svelte-139dsg8"}"${(0, import_index_d20a7d6e.e)("alt", videoPost2.title, 0)}${(0, import_index_d20a7d6e.e)("src", urlFor(videoPost2.mainImage).quality(90).saturation(-100).width(400).url(), 0)}>` : ``}
    <div class="${"icon svelte-139dsg8"}">${(0, import_index_d20a7d6e.v)(Play_arrow, "PlayArrow").$$render($$result, {}, {}, {})}</div>
    <div class="${"title svelte-139dsg8"}">${(0, import_index_d20a7d6e.g)(videoPost2.title)}</div></a>
`;
    }(__value);
  }(videoPost)}`;
});
const Blocks = (0, import_index_d20a7d6e.c)(($$result, $$props, $$bindings, slots) => {
  let { blocks = [] } = $$props;
  let { mainSite = false } = $$props;
  if ($$props.blocks === void 0 && $$bindings.blocks && blocks !== void 0)
    $$bindings.blocks(blocks);
  if ($$props.mainSite === void 0 && $$bindings.mainSite && mainSite !== void 0)
    $$bindings.mainSite(mainSite);
  return `${(0, import_index_d20a7d6e.f)(blocks, (b) => {
    return `${b._type == "block" ? `${b.style == "logoBlock" ? `${(0, import_index_d20a7d6e.v)(LogoBlock, "LogoBlock").$$render($$result, { b }, {}, {})}` : `${b.style == "invertedBlock" ? `${(0, import_index_d20a7d6e.v)(InvertedBlock, "InvertedBlock").$$render($$result, { b }, {}, {})}` : `${(0, import_index_d20a7d6e.v)(Text, "Text").$$render($$result, { b }, {}, {})}`}`}` : ``}
  ${b._type == "image" ? `${mainSite ? `${(0, import_index_d20a7d6e.v)(ImageFromMainSite, "ImageFromMainSite").$$render($$result, { b }, {}, {})}` : `${(0, import_index_d20a7d6e.v)(Image, "Image").$$render($$result, { b }, {}, {})}`}` : ``}
  ${b._type == "embedBlock" ? `${(0, import_index_d20a7d6e.v)(Embed, "Embed").$$render($$result, { b }, {}, {})}` : ``}
  ${b._type == "dividerBlock" ? `${(0, import_index_d20a7d6e.v)(Divider, "Divider").$$render($$result, { b }, {}, {})}` : ``}
  ${b._type == "columnsBlock" ? `${(0, import_index_d20a7d6e.v)(Columns, "Columns").$$render($$result, { b }, {}, {})}` : ``}
  ${b._type == "donationWidget" ? `${(0, import_index_d20a7d6e.v)(DonationWidget, "DonationWidget").$$render($$result, { b }, {}, {})}` : ``}
  ${b._type == "applicationButton" ? `${(0, import_index_d20a7d6e.v)(ApplicationButton, "ApplicationButton").$$render($$result, { b }, {}, {})}` : ``}
  ${b._type == "faq" ? `${(0, import_index_d20a7d6e.v)(Faq, "Faq").$$render($$result, { b }, {}, {})}` : ``}
  ${b._type == "videoBlock" ? `${(0, import_index_d20a7d6e.v)(Video, "Video").$$render($$result, { b }, {}, {})}` : ``}`;
  })}`;
});
var fullBeam_svelte_svelte_type_style_lang = "";
const css$e = {
  code: "svg.svelte-1wdefg6.svelte-1wdefg6{width:100%}svg.svelte-1wdefg6 path.svelte-1wdefg6{fill:none;stroke:#f5f4ee;stroke-width:0.75;stroke-miterlimit:10}svg.black.svelte-1wdefg6 path.svelte-1wdefg6{stroke:#221f20}",
  map: null
};
const Full_beam = (0, import_index_d20a7d6e.c)(($$result, $$props, $$bindings, slots) => {
  let { black = false } = $$props;
  if ($$props.black === void 0 && $$bindings.black && black !== void 0)
    $$bindings.black(black);
  $$result.css.add(css$e);
  return `<svg version="${"1.1"}" id="${"Layer_1"}" xmlns="${"http://www.w3.org/2000/svg"}" xmlns:xlink="${"http://www.w3.org/1999/xlink"}" x="${"0px"}" y="${"0px"}" viewBox="${"0 0 18 18"}" style="${"enable-background:new 0 0 18 18;"}" xml:space="${"preserve"}" class="${["svelte-1wdefg6", black ? "black" : ""].join(" ").trim()}"><path class="${"st1 svelte-1wdefg6"}" d="${"M0,8.8h6.8 M16.8,4.4l-5.9,3.3L16.8,4.4z M13.6,1.2l-3.4,5.7L13.6,1.2z M11.1,8.8H18 M1.2,4.4l5.9,3.3L1.2,4.4z M4.4,1.2l3.4,5.7L4.4,1.2z M9,0v6.6V0z"}"></path><path class="${"st1 svelte-1wdefg6"}" d="${"M1.2,13.1l5.9-3.3 M4.4,16.3l3.4-5.7 M16.8,13.1l-5.9-3.3 M13.6,16.3l-3.4-5.7 M9,17.4v-6.6"}"></path></svg>`;
});
var menubar_svelte_svelte_type_style_lang = "";
const css$d = {
  code: "header.svelte-y5o8h9.svelte-y5o8h9{position:absolute;top:0;left:0;width:100%;z-index:100000;height:240px;transition:transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);transform:translateY(-240px);font-size:12px}@media(max-width: 800px){header.svelte-y5o8h9.svelte-y5o8h9{display:none}}header.open.svelte-y5o8h9.svelte-y5o8h9{transform:translateY(0)}header.svelte-y5o8h9 .menubar.svelte-y5o8h9{width:100%;height:30px;background:#221f20;color:#f5f4ee;line-height:30px;padding-left:15px;padding-right:10px;overflow:hidden;border-bottom:1px solid #070101}header.svelte-y5o8h9 .menubar .inner-text.svelte-y5o8h9{opacity:1}header.svelte-y5o8h9 .menubar .breadcrumbs.svelte-y5o8h9{float:left}header.svelte-y5o8h9 .menubar .arrow-down.svelte-y5o8h9{margin-right:5px}header.svelte-y5o8h9 .menubar a.svelte-y5o8h9{color:#f5f4ee;text-decoration:none}header.svelte-y5o8h9 .menubar .clock.svelte-y5o8h9{float:right}header.svelte-y5o8h9 .menubar .tray-toggle.svelte-y5o8h9{float:right;width:18px;height:30px;display:flex;justify-content:center;align-items:center;margin-left:12px;cursor:pointer}header.svelte-y5o8h9 .settings.svelte-y5o8h9{height:240px;background:#dedcd5;color:#221f20;overflow:hidden}header.svelte-y5o8h9 .settings .settings-bar.svelte-y5o8h9{height:30px;line-height:30px;padding-left:5px;padding-right:10px;cursor:pointer;border-bottom:1px solid #221f20;color:#221f20;width:100%}header.svelte-y5o8h9 .settings .settings-bar .tray-toggle.svelte-y5o8h9{width:18px;height:30px;display:flex;margin-right:8px;justify-content:center;align-items:center;margin-left:8px;cursor:pointer;float:left}header.svelte-y5o8h9 .settings .settings-content.svelte-y5o8h9{display:flex;padding-left:15px;padding-right:15px}header.svelte-y5o8h9 .settings .settings-content .section.svelte-y5o8h9{padding-top:20px}header.svelte-y5o8h9 .settings .settings-content .section .section-header.svelte-y5o8h9{margin-bottom:10px}header.svelte-y5o8h9 .settings .settings-content .section.theme.svelte-y5o8h9{width:20%}header.svelte-y5o8h9 .settings .settings-content .section.text.svelte-y5o8h9{width:30%}header.svelte-y5o8h9 .settings .settings-content .section.city.svelte-y5o8h9{width:50%}.city-button.svelte-y5o8h9.svelte-y5o8h9{padding:8px 12px;display:inline-block;border-top:1px solid #221f20;border-right:1px solid #221f20;border-bottom:1px solid #221f20;user-select:none;cursor:pointer}.city-button.svelte-y5o8h9.svelte-y5o8h9:first-child{border-left:1px solid #221f20}.city-button.active.svelte-y5o8h9.svelte-y5o8h9{background:#221f20;color:#f5f4ee}.city-button.svelte-y5o8h9.svelte-y5o8h9:hover{background:#221f20;color:#f5f4ee}.city-text.svelte-y5o8h9.svelte-y5o8h9{max-width:520px}",
  map: null
};
const Menubar = (0, import_index_d20a7d6e.c)(($$result, $$props, $$bindings, slots) => {
  let $trayOpen, $$unsubscribe_trayOpen;
  let $activeCity, $$unsubscribe_activeCity;
  $$unsubscribe_trayOpen = (0, import_index_d20a7d6e.b)(trayOpen, (value) => $trayOpen = value);
  $$unsubscribe_activeCity = (0, import_index_d20a7d6e.b)(activeCity, (value) => $activeCity = value);
  let { currentRoom: currentRoom2 = {} } = $$props;
  const cities = loadDataFromMainSite('*[_id == "cities"][0]');
  cities.then((c) => {
    if (c.cities && c.cities[0]) {
      activeCity.set(c.cities[0]);
    }
  });
  if ($$props.currentRoom === void 0 && $$bindings.currentRoom && currentRoom2 !== void 0)
    $$bindings.currentRoom(currentRoom2);
  $$result.css.add(css$d);
  $$unsubscribe_trayOpen();
  $$unsubscribe_activeCity();
  return `<header class="${["svelte-y5o8h9", $trayOpen ? "open" : ""].join(" ").trim()}"><div class="${"settings svelte-y5o8h9"}">
    <div class="${"settings-bar svelte-y5o8h9"}"><div class="${"tray-toggle svelte-y5o8h9"}">${(0, import_index_d20a7d6e.v)(Full_beam, "FullBeam").$$render($$result, { black: true }, {}, {})}</div>
      Settings
    </div>
    
    <div class="${"settings-content svelte-y5o8h9"}">
      <div class="${"section theme svelte-y5o8h9"}"></div>
      
      <div class="${"section text svelte-y5o8h9"}"></div>
      
      <div class="${"section city svelte-y5o8h9"}"><div class="${"section-header svelte-y5o8h9"}">City</div>
        ${function(__value) {
    if ((0, import_index_d20a7d6e.i)(__value)) {
      __value.then(null, import_index_d20a7d6e.n);
      return ``;
    }
    return function(cities2) {
      return `
          <div class="${"city-switches"}">${(0, import_index_d20a7d6e.f)(cities2.cities, (city) => {
        return `<div class="${[
          "city-button svelte-y5o8h9",
          $activeCity._key === city._key ? "active" : ""
        ].join(" ").trim()}">${(0, import_index_d20a7d6e.g)(city.name)}
              </div>`;
      })}</div>
          <div class="${"city-text svelte-y5o8h9"}">${(0, import_has.default)(cities2, "content.content", []) ? `<div>${(0, import_index_d20a7d6e.v)(Blocks, "Blocks").$$render($$result, { blocks: cities2.content.content }, {}, {})}</div>` : ``}</div>
        `;
    }(__value);
  }(cities)}</div></div></div>
  <nav class="${"menubar svelte-y5o8h9"}"><div class="${"inner-text svelte-y5o8h9"}">
      <div class="${"breadcrumbs svelte-y5o8h9"}"><span class="${"arrow-down svelte-y5o8h9"}">${(0, import_index_d20a7d6e.v)(Arrow_down, "ArrowDown").$$render($$result, {}, {}, {})}</span>
        <a href="${"/"}" class="${"svelte-y5o8h9"}">open.eyebeam.org ${currentRoom2.title ? `/ ${(0, import_index_d20a7d6e.g)(currentRoom2.title)}` : ``}</a></div>
      
      <div class="${"tray-toggle svelte-y5o8h9"}">${(0, import_index_d20a7d6e.v)(Full_beam, "FullBeam").$$render($$result, {}, {}, {})}</div>
      
      <div class="${"clock svelte-y5o8h9"}">${(0, import_index_d20a7d6e.v)(Clock, "Clock").$$render($$result, {}, {}, {})}</div></div></nav>
</header>`;
});
const isAuthenticated = writable(false);
const profile = writable(false);
var AuthenticationBox_svelte_svelte_type_style_lang = "";
const css$c = {
  code: ".auth-box.svelte-1rukz97{position:fixed;top:40px;left:20px;background:#dedcd5;border:1px solid #221f20;padding:5px;cursor:pointer;font-size:12px;z-index:10000}.auth-box.svelte-1rukz97:hover{background:#dedcd5}",
  map: null
};
const AuthenticationBox = (0, import_index_d20a7d6e.c)(($$result, $$props, $$bindings, slots) => {
  let $isAuthenticated, $$unsubscribe_isAuthenticated;
  let $profile, $$unsubscribe_profile;
  $$unsubscribe_isAuthenticated = (0, import_index_d20a7d6e.b)(isAuthenticated, (value) => $isAuthenticated = value);
  $$unsubscribe_profile = (0, import_index_d20a7d6e.b)(profile, (value) => $profile = value);
  $$result.css.add(css$c);
  $$unsubscribe_isAuthenticated();
  $$unsubscribe_profile();
  return `<div class="${"auth-box svelte-1rukz97"}">${$isAuthenticated ? `<div>${(0, import_index_d20a7d6e.g)($profile && $profile.name ? $profile.name + " (Log out)" : "Log out")}</div>` : `Login`}
</div>`;
});
var StreamPlayer_svelte_svelte_type_style_lang = "";
const css$b = {
  code: ".stream-container.svelte-ldmhir.svelte-ldmhir{position:absolute;top:40px;left:80px;width:380px;border:1px solid #f5f4ee;z-index:10000}.stream-container.svelte-ldmhir .embed.svelte-ldmhir{width:100%;background:black;display:flex;justify-content:center;align-items:center}.stream-container.svelte-ldmhir .embed .peertube-container.svelte-ldmhir,.stream-container.svelte-ldmhir .embed .youtube-container.svelte-ldmhir,.stream-container.svelte-ldmhir .embed .vimeo-container.svelte-ldmhir{position:relative;padding-bottom:56.25%;height:0;overflow:hidden;width:720px}.stream-container.svelte-ldmhir .embed .peertube-container iframe.svelte-ldmhir,.stream-container.svelte-ldmhir .embed .youtube-container iframe.svelte-ldmhir,.stream-container.svelte-ldmhir .embed .vimeo-container iframe.svelte-ldmhir{position:absolute;top:0;left:0;width:100%;height:100%;border:0}",
  map: null
};
const StreamPlayer = (0, import_index_d20a7d6e.c)(($$result, $$props, $$bindings, slots) => {
  let { streamUrl = "" } = $$props;
  if ($$props.streamUrl === void 0 && $$bindings.streamUrl && streamUrl !== void 0)
    $$bindings.streamUrl(streamUrl);
  $$result.css.add(css$b);
  return `<div class="${"stream-container svelte-ldmhir"}"><div class="${"embed svelte-ldmhir"}">${streamUrl.includes("youtube") || streamUrl.includes("youtu.be") ? `<div class="${"youtube-container svelte-ldmhir"}"><iframe width="${"1920"}" height="${"1280"}"${(0, import_index_d20a7d6e.e)("src", "https://www.youtube.com/embed/" + (0, import_get_video_id.default)(streamUrl).id + "?autoplay=1&rel=0&color=white", 0)} frameborder="${"no"}" allow="${"autoplay; fullscreen"}" allowfullscreen class="${"svelte-ldmhir"}"></iframe></div>` : `${streamUrl.includes("vimeo") ? `<div class="${"vimeo-container svelte-ldmhir"}"><iframe width="${"720"}" height="${"480"}"${(0, import_index_d20a7d6e.e)("src", "https://player.vimeo.com/video/" + (0, import_get_video_id.default)(streamUrl).id + "?autoplay=1", 0)} frameborder="${"no"}" scrolling="${"no"}" byline="${"false"}" color="${"#ffffff"}" allow="${"autoplay; fullscreen"}" allowfullscreen class="${"svelte-ldmhir"}"></iframe></div>` : `${streamUrl.includes("undersco.re") ? `<div class="${"peertube-container svelte-ldmhir"}"><iframe width="${"720"}" height="${"480"}"${(0, import_index_d20a7d6e.e)("src", streamUrl, 0)} frameborder="${"no"}" color="${"#ffffff"}" allow="${"autoplay; fullscreen"}" sandbox="${"allow-same-origin allow-scripts allow-popups"}" allowfullscreen class="${"svelte-ldmhir"}"></iframe></div>` : ``}`}`}</div>
</div>`;
});
var VideoPlayer_svelte_svelte_type_style_lang = "";
const css$a = {
  code: ".stream-container.svelte-174tb22.svelte-174tb22{width:720px}.stream-container.svelte-174tb22 .embed.svelte-174tb22{width:100%;background:black;display:flex;justify-content:center;align-items:center}.stream-container.svelte-174tb22 .embed .peertube-container.svelte-174tb22,.stream-container.svelte-174tb22 .embed .youtube-container.svelte-174tb22,.stream-container.svelte-174tb22 .embed .vimeo-container.svelte-174tb22{position:relative;padding-bottom:56.25%;height:0;overflow:hidden;width:720px}.stream-container.svelte-174tb22 .embed .peertube-container iframe.svelte-174tb22,.stream-container.svelte-174tb22 .embed .youtube-container iframe.svelte-174tb22,.stream-container.svelte-174tb22 .embed .vimeo-container iframe.svelte-174tb22{position:absolute;top:0;left:0;width:100%;height:100%;border:0}",
  map: null
};
const VideoPlayer = (0, import_index_d20a7d6e.c)(($$result, $$props, $$bindings, slots) => {
  let { streamUrl = "" } = $$props;
  if ($$props.streamUrl === void 0 && $$bindings.streamUrl && streamUrl !== void 0)
    $$bindings.streamUrl(streamUrl);
  $$result.css.add(css$a);
  return `<div class="${"stream-container svelte-174tb22"}"><div class="${"embed svelte-174tb22"}">${streamUrl.includes("youtube") || streamUrl.includes("youtu.be") ? `<div class="${"youtube-container svelte-174tb22"}"><iframe width="${"1920"}" height="${"1280"}"${(0, import_index_d20a7d6e.e)("src", "https://www.youtube.com/embed/" + (0, import_get_video_id.default)(streamUrl).id + "?rel=0&color=white", 0)} frameborder="${"no"}" allow="${"autoplay; fullscreen"}" allowfullscreen class="${"svelte-174tb22"}"></iframe></div>` : `${streamUrl.includes("vimeo") ? `<div class="${"vimeo-container svelte-174tb22"}"><iframe width="${"720"}" height="${"480"}"${(0, import_index_d20a7d6e.e)("src", "https://player.vimeo.com/video/" + (0, import_get_video_id.default)(streamUrl).id, 0)} frameborder="${"no"}" scrolling="${"no"}" byline="${"false"}" color="${"#ffffff"}" allow="${"autoplay; fullscreen"}" allowfullscreen class="${"svelte-174tb22"}"></iframe></div>` : `${streamUrl.includes("undersco.re") ? `<div class="${"peertube-container svelte-174tb22"}"><iframe width="${"720"}" height="${"480"}"${(0, import_index_d20a7d6e.e)("src", streamUrl, 0)} frameborder="${"no"}" color="${"#ffffff"}" allow="${"autoplay; fullscreen"}" sandbox="${"allow-same-origin allow-scripts allow-popups"}" allowfullscreen class="${"svelte-174tb22"}"></iframe></div>` : ``}`}`}</div></div>



`;
});
var bulletinBoardEvent_svelte_svelte_type_style_lang = "";
const css$9 = {
  code: ".event.svelte-1unfe15.svelte-1unfe15{display:flex;margin-bottom:20px;min-height:200px}.event.svelte-1unfe15 .image-container.svelte-1unfe15{width:50%}.event.svelte-1unfe15 .image-container img.svelte-1unfe15{max-width:100%}.event.svelte-1unfe15 .text-container.svelte-1unfe15{padding-left:10px;width:50%}.event.svelte-1unfe15 .text-container .date.svelte-1unfe15{background:#221f20;color:#f5f4ee;margin-bottom:1em;display:inline-block}.event.svelte-1unfe15 .text-container .title.svelte-1unfe15{margin-bottom:1em}",
  map: null
};
const Bulletin_board_event = (0, import_index_d20a7d6e.c)(($$result, $$props, $$bindings, slots) => {
  let { event = {} } = $$props;
  if ($$props.event === void 0 && $$bindings.event && event !== void 0)
    $$bindings.event(event);
  $$result.css.add(css$9);
  return `<div class="${"event svelte-1unfe15"}">${``}
</div>`;
});
var ArticleBox_svelte_svelte_type_style_lang = "";
const css$8 = {
  code: ".return-button.svelte-at985a.svelte-at985a{position:fixed;top:60px;left:20px;background:#f5f4ee;color:#221f20;padding:5px;font-size:12px;z-index:100000;cursor:pointer}.viewer-count.svelte-at985a.svelte-at985a{position:absolute;top:60px;left:50%;transform:translateX(-50%);color:#f5f4ee;font-size:12px;z-index:100000}.article.svelte-at985a.svelte-at985a{position:fixed;top:0;left:0;width:100%;height:100%;background:#221f20;z-index:10000;display:flex;padding-top:60px;padding-bottom:80px;justify-content:center;transition:transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)}.article.svelte-at985a .inner.svelte-at985a{background:#dedcd5;color:#221f20;width:800px;max-width:90%;z-index:10000;padding:20px;overflow-y:scroll;font-size:14px}.article.pushed.svelte-at985a.svelte-at985a{transform:translateY(240px)}.article img{max-width:100%}.video.svelte-at985a.svelte-at985a{position:fixed;top:0;left:0;width:100%;height:100%;background:#221f20;z-index:10000;display:flex;padding-top:60px;padding-bottom:60px;justify-content:center;align-items:center;transition:transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)}.video.pushed.svelte-at985a.svelte-at985a{transform:translateY(240px)}.info-text.svelte-at985a.svelte-at985a{position:fixed;bottom:20px;left:20px;background:#221f20;z-index:10000;display:flex;padding:10px;font-size:14px;color:#f5f4ee;border:1px solid #f5f4ee}.bulletin-board.svelte-at985a.svelte-at985a{position:fixed;top:0;left:0;width:100%;height:100%;background:#221f20;z-index:10000;display:flex;padding-top:60px;padding-bottom:80px;justify-content:center;transition:transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)}.bulletin-board.svelte-at985a .inner.svelte-at985a{background:#dedcd5;color:#221f20;width:800px;max-width:90%;z-index:10000;padding:20px;overflow-y:scroll;font-size:14px}.bulletin-board.svelte-at985a .inner .bulletin-board-actions .action.svelte-at985a{padding:10px;border:1px solid #221f20;display:inline-block}.bulletin-board.svelte-at985a .inner .bulletin-board-actions.svelte-at985a{margin-top:20px;margin-bottom:20px;display:inline-block}.bulletin-board.pushed.svelte-at985a.svelte-at985a{transform:translateY(240px)}",
  map: null
};
const ArticleBox = (0, import_index_d20a7d6e.c)(($$result, $$props, $$bindings, slots) => {
  let $players, $$unsubscribe_players;
  let $trayOpen, $$unsubscribe_trayOpen;
  $$unsubscribe_players = (0, import_index_d20a7d6e.b)(players, (value) => $players = value);
  $$unsubscribe_trayOpen = (0, import_index_d20a7d6e.b)(trayOpen, (value) => $trayOpen = value);
  let { article = {} } = $$props;
  let viewCount = 0;
  let viewCountText = "";
  (0, import_index_d20a7d6e.o)(async () => {
    leaveArticle();
  });
  if ($$props.article === void 0 && $$bindings.article && article !== void 0)
    $$bindings.article(article);
  $$result.css.add(css$8);
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
  return `${article.contentType === "video" ? `<div class="${"viewer-count svelte-at985a"}">${(0, import_index_d20a7d6e.g)(viewCountText)}</div>` : ``}

<div class="${"return-button svelte-at985a"}">Return
</div>

${article.contentType === "video" ? `<div class="${["video svelte-at985a", $trayOpen ? "pushed" : ""].join(" ").trim()}">${(0, import_index_d20a7d6e.v)(VideoPlayer, "VideoPlayer").$$render($$result, { streamUrl: article.videoUrl }, {}, {})}</div>` : `${article.contentType === "text" ? `${(0, import_has.default)(article, "content.content") ? `<div class="${["article svelte-at985a", $trayOpen ? "pushed" : ""].join(" ").trim()}"><div class="${"inner svelte-at985a"}">${(0, import_index_d20a7d6e.v)(Blocks, "Blocks").$$render($$result, { blocks: article.content.content }, {}, {})}</div></div>` : ``}` : `${article.contentType === "importedPost" ? `<div class="${["article svelte-at985a", $trayOpen ? "pushed" : ""].join(" ").trim()}"><div class="${"inner svelte-at985a"}">${``}</div></div>` : `${article.isBulletinBoard ? `<div class="${["bulletin-board svelte-at985a", $trayOpen ? "pushed" : ""].join(" ").trim()}"><div class="${"inner svelte-at985a"}"><h1>Welcome to the Bulletin Board</h1>
      <div class="${"bulletin-board-actions svelte-at985a"}"><div class="${"action svelte-at985a"}">Subscribe to Calendar</div></div>
      <div class="${"bulletin-board-events"}">${(0, import_index_d20a7d6e.f)(article.events, (event) => {
    return `${(0, import_index_d20a7d6e.v)(Bulletin_board_event, "BulletinBoardEvent").$$render($$result, { event }, {}, {})}`;
  })}</div></div></div>` : ``}`}`}`}

${article.infoText ? `<div class="${"info-text svelte-at985a"}">${(0, import_index_d20a7d6e.g)(article.infoText)}</div>` : ``}`;
});
var RoomDialog_svelte_svelte_type_style_lang = "";
const css$7 = {
  code: ".room-dialog-box.svelte-pi72xu.svelte-pi72xu{position:fixed;bottom:20px;left:20px;padding:15px;background:#e8eae6;color:#221f20;border:1px solid #221f20;z-index:1000;user-select:none}.choice.svelte-pi72xu.svelte-pi72xu{display:flex;cursor:pointer;outline-color:#221f20;outline-width:1px}.choice.svelte-pi72xu .marker.svelte-pi72xu{opacity:0;width:1em;text-align:center}.choice.svelte-pi72xu:hover .marker.svelte-pi72xu,.choice.svelte-pi72xu:focus .marker.svelte-pi72xu{opacity:1}",
  map: null
};
const RoomDialog = (0, import_index_d20a7d6e.c)(($$result, $$props, $$bindings, slots) => {
  (0, import_index_d20a7d6e.d)();
  let { text = "" } = $$props;
  let { roomId = "" } = $$props;
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  if ($$props.roomId === void 0 && $$bindings.roomId && roomId !== void 0)
    $$bindings.roomId(roomId);
  $$result.css.add(css$7);
  return `<div class="${"room-dialog-box svelte-pi72xu"}"><div>${(0, import_index_d20a7d6e.g)(text)}</div>
  <div class="${"multiple-choice"}"><div class="${"choice svelte-pi72xu"}" tabindex="${"0"}" autofocus><div class="${"marker svelte-pi72xu"}">\u25B8</div>
      Yes
    </div>
    <div class="${"choice svelte-pi72xu"}" tabindex="${"0"}"><div class="${"marker svelte-pi72xu"}">\u25B8</div>
      No
    </div></div>
</div>`;
});
var RoomEntryBox_svelte_svelte_type_style_lang = "";
const css$6 = {
  code: ".caption-container.svelte-ukizaq{position:fixed;bottom:20px;left:20px;z-index:1000}",
  map: null
};
const RoomEntryBox = (0, import_index_d20a7d6e.c)(($$result, $$props, $$bindings, slots) => {
  (0, import_index_d20a7d6e.d)();
  let { roomIntent = "" } = $$props;
  let { roomTitle = "" } = $$props;
  if ($$props.roomIntent === void 0 && $$bindings.roomIntent && roomIntent !== void 0)
    $$bindings.roomIntent(roomIntent);
  if ($$props.roomTitle === void 0 && $$bindings.roomTitle && roomTitle !== void 0)
    $$bindings.roomTitle(roomTitle);
  $$result.css.add(css$6);
  return `<div class="${"caption-container svelte-ukizaq"}">${(0, import_index_d20a7d6e.v)(RoomDialog, "RoomDialog").$$render($$result, {
    text: `Go to ${roomTitle}?`,
    roomId: roomIntent
  }, {}, {})}
</div>`;
});
var triangleDown_svelte_svelte_type_style_lang = "";
const css$5 = {
  code: "svg.svelte-fiesz8.svelte-fiesz8{transform:rotate(270deg)}svg.svelte-fiesz8 path.svelte-fiesz8{fill:#221f20}",
  map: null
};
const Triangle_down = (0, import_index_d20a7d6e.c)(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$5);
  return `<svg width="${"9"}" height="${"8"}" viewBox="${"0 0 9 8"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}" class="${"svelte-fiesz8"}"><path d="${"M4.8474 7.78418L0.703963 0.607532L8.99084 0.607531L4.8474 7.78418Z"}" class="${"svelte-fiesz8"}"></path></svg>`;
});
var Caption_svelte_svelte_type_style_lang = "";
const css$4 = {
  code: ".caption-box.svelte-10yrac0{padding:15px;background:#f5f4ee;color:#221f20;border:1px solid #221f20;z-index:1000;font-size:14px;padding-bottom:0;cursor:pointer}.caption-container.svelte-10yrac0{position:fixed;bottom:20px;left:20px;z-index:100000;max-width:520px;display:flex}.next-caption.svelte-10yrac0{padding-left:15px;padding-right:15px;background:#dedcd5;color:#221f20;border:1px solid #221f20;z-index:1000;font-size:14px;padding-bottom:0;cursor:pointer;margin-left:10px;display:flex;align-items:center;justify-content:center}",
  map: null
};
const Caption = (0, import_index_d20a7d6e.c)(($$result, $$props, $$bindings, slots) => {
  (0, import_index_d20a7d6e.d)();
  let { text = [] } = $$props;
  let textIndex = 0;
  let currentText = false;
  if (text.length > 0) {
    currentText = text[textIndex];
  }
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  $$result.css.add(css$4);
  return `<div class="${"caption-container svelte-10yrac0"}"><div class="${"caption-box svelte-10yrac0"}"><!-- HTML_TAG_START -->${renderBlockText(currentText.text.content)}<!-- HTML_TAG_END --></div>
  ${textIndex < text.length - 1 ? `<div class="${"next-caption svelte-10yrac0"}">${(0, import_index_d20a7d6e.v)(Triangle_down, "TriangleDown").$$render($$result, {}, {}, {})}</div>` : ``}
</div>`;
});
var Chat_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: '.chat-container.svelte-oqrtp3.svelte-oqrtp3{right:20px;bottom:20px;position:fixed;width:300px;z-index:10000}.chat-input.svelte-oqrtp3.svelte-oqrtp3{width:100%;display:flex;align-items:center;user-select:none}.chat-input.svelte-oqrtp3 input.svelte-oqrtp3{font-family:"Literata", serif;font-size:14px;float:left;width:100%;display:block;background:#dedcd5;border:1px solid #221f20;color:#221f20;padding:12px;border-radius:0;outline:none;height:30px;margin-right:6px}.chat-input.svelte-oqrtp3 button.svelte-oqrtp3{font-family:"Literata", serif;font-size:14px;width:60px;float:right;display:block;background:#dedcd5;border:1px solid #221f20;color:#221f20;outline:none;cursor:pointer;border-radius:0;height:30px;line-height:20px}',
  map: null
};
const Chat = (0, import_index_d20a7d6e.c)(($$result, $$props, $$bindings, slots) => {
  (0, import_index_d20a7d6e.d)();
  let chatInputValue = "";
  let { chatMessages: chatMessages2 = [] } = $$props;
  if ($$props.chatMessages === void 0 && $$bindings.chatMessages && chatMessages2 !== void 0)
    $$bindings.chatMessages(chatMessages2);
  $$result.css.add(css$3);
  return `<div class="${"chat-container svelte-oqrtp3"}"><div class="${"chat-input svelte-oqrtp3"}"><input placeholder="${"Write a message..."}" type="${"[text]"}" maxlength="${"600"}" class="${"svelte-oqrtp3"}"${(0, import_index_d20a7d6e.e)("value", chatInputValue, 0)}>
    <button class="${"svelte-oqrtp3"}">Send</button></div>
</div>`;
});
var SoundOn_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: "svg.svelte-1iwhujd.svelte-1iwhujd{height:14px}svg.svelte-1iwhujd path.svelte-1iwhujd{fill:#221f20}",
  map: null
};
const SoundOn = (0, import_index_d20a7d6e.c)(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$2);
  return `<svg version="${"1.1"}" id="${"Layer_1"}" xmlns="${"http://www.w3.org/2000/svg"}" xmlns:xlink="${"http://www.w3.org/1999/xlink"}" x="${"0px"}" y="${"0px"}" viewBox="${"0 0 18.3 17.6"}" style="${"enable-background:new 0 0 18.3 17.6;"}" xml:space="${"preserve"}" class="${"svelte-1iwhujd"}"><path d="${"M1.6,11.5l4.3,4.7l-1.3,1.2c-0.2,0.2-0.4,0.3-0.5,0.3c-0.1,0-0.3-0.1-0.5-0.3l-3.4-3.7C0.1,13.4,0,13.2,0,13.1\n		c0-0.1,0.1-0.3,0.3-0.5L1.6,11.5z M9.5,3.1c0.7,0.2,1.4,0.4,2,0.8c0.6,0.4,1.2,0.9,1.7,1.5c0.5,0.6,1,1.1,1.3,1.8\n		c0.4,0.7,0.6,1.4,0.7,2.1l-1.3,0c-0.1-0.6-0.3-1.2-0.6-1.7c-0.3-0.5-0.6-0.9-1-1.3c-0.4-0.4-0.8-0.8-1.3-1.1\n		c-0.5-0.3-1-0.6-1.6-0.7L9.5,3.1z M9.7,0c1,0.2,1.9,0.6,2.9,1.2c0.9,0.6,1.8,1.4,2.7,2.3c0.8,0.9,1.5,1.9,2.1,2.9s0.8,2,0.9,3\n		l-1.3,0c-0.1-0.8-0.4-1.7-0.8-2.5c-0.5-0.8-1.1-1.7-1.8-2.5c-0.7-0.8-1.5-1.4-2.3-2c-0.8-0.5-1.6-0.8-2.4-1L9.7,0z M4.1,2.1\n		C4.2,2,4.3,1.9,4.5,2C4.6,2,4.8,2.1,5,2.3l10.5,11.3c0.2,0.2,0.3,0.4,0.3,0.6c0,0.1,0,0.3-0.2,0.4c-0.1,0.1-0.4,0.2-0.9,0.2\n		l-7.9,0.4l-4.3-4.7l1.2-7.6c0-0.2,0.1-0.4,0.1-0.5C4,2.3,4,2.2,4.1,2.1"}" class="${"svelte-1iwhujd"}"></path></svg>`;
});
var SoundOff_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "svg.svelte-y4dmoz.svelte-y4dmoz{height:14px}svg.svelte-y4dmoz path.svelte-y4dmoz{fill:#221f20}.b.svelte-y4dmoz.svelte-y4dmoz{opacity:0}",
  map: null
};
const SoundOff = (0, import_index_d20a7d6e.c)(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `<svg xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 18.3 17.7"}" class="${"svelte-y4dmoz"}"><path class="${"a svelte-y4dmoz"}" d="${"M1.6,11.5l4.3,4.7L4.6,17.4a.91.91,0,0,1-.5.3.91.91,0,0,1-.5-.3L.2,13.7a3.93,3.93,0,0,1-.2-.6.91.91,0,0,1,.3-.5Z"}"></path><path class="${"b svelte-y4dmoz"}" d="${"M9.5,3.1a7,7,0,0,1,2,.8,8,8,0,0,1,1.7,1.5,7.49,7.49,0,0,1,1.3,1.8,5.79,5.79,0,0,1,.7,2.1H13.9a4.92,4.92,0,0,0-.6-1.7,6.42,6.42,0,0,0-1-1.3A6.89,6.89,0,0,0,11,5.2a4.59,4.59,0,0,0-1.6-.7Z"}"></path><path class="${"b svelte-y4dmoz"}" d="${"M9.7,0a8.94,8.94,0,0,1,2.9,1.2,18.37,18.37,0,0,1,2.7,2.3,19.41,19.41,0,0,1,2.1,2.9,6.91,6.91,0,0,1,.9,3H17a8.09,8.09,0,0,0-.8-2.5,19.5,19.5,0,0,0-1.8-2.5,14.34,14.34,0,0,0-2.3-2,8.18,8.18,0,0,0-2.4-1Z"}"></path><path class="${"a svelte-y4dmoz"}" d="${"M4.1,2.1c.1-.1.2-.2.4-.1a.91.91,0,0,1,.5.3L15.5,13.6a.86.86,0,0,1,.3.6.4.4,0,0,1-.2.4,1.44,1.44,0,0,1-.9.2l-7.9.4L2.5,10.5,3.7,2.9a4.33,4.33,0,0,1,.1-.5c.2-.1.2-.2.3-.3"}"></path></svg>`;
});
const streams = writable([]);
var __layout_svelte_svelte_type_style_lang = "";
const css = {
  code: '.svelte-10dwrrh.svelte-10dwrrh{box-sizing:border-box;font-family:"Literata", serif}.viewport.svelte-10dwrrh.svelte-10dwrrh{height:100vh;width:100vw;position:fixed;top:0;left:0;overflow:hidden;opacity:1;transition:transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);background:#221f20}.viewport.pushed.svelte-10dwrrh.svelte-10dwrrh{transform:translateY(240px)}.viewport.blurred.svelte-10dwrrh.svelte-10dwrrh{filter:blur(3px);pointer-events:none}.options.svelte-10dwrrh.svelte-10dwrrh{position:fixed;top:40px;right:20px}.options.svelte-10dwrrh .option.svelte-10dwrrh{margin-left:5px;font-size:12px;background:#dedcd5;float:right;padding:5px;user-select:none;cursor:pointer;border:1px solid #221f20;width:30px;height:30px;display:flex;justify-content:center;align-items:center}.options.svelte-10dwrrh .option span.svelte-10dwrrh{line-height:1.2em}.options.svelte-10dwrrh .option.on span.svelte-10dwrrh{background:#221f20;color:#f5f4ee}',
  map: null
};
const _layout = (0, import_index_d20a7d6e.c)(($$result, $$props, $$bindings, slots) => {
  let $currentRoom, $$unsubscribe_currentRoom;
  let $$unsubscribe_profile;
  let $localPlayer, $$unsubscribe_localPlayer;
  let $worldObject, $$unsubscribe_worldObject;
  let $players, $$unsubscribe_players;
  let $trayOpen, $$unsubscribe_trayOpen;
  let $showTarget, $$unsubscribe_showTarget;
  let $targetX, $$unsubscribe_targetX;
  let $targetY, $$unsubscribe_targetY;
  let $playSound, $$unsubscribe_playSound;
  let $streams, $$unsubscribe_streams;
  let $activeArticle, $$unsubscribe_activeArticle;
  let $chatMessages, $$unsubscribe_chatMessages;
  let $showLabels, $$unsubscribe_showLabels;
  $$unsubscribe_currentRoom = (0, import_index_d20a7d6e.b)(currentRoom, (value) => $currentRoom = value);
  $$unsubscribe_profile = (0, import_index_d20a7d6e.b)(profile, (value) => value);
  $$unsubscribe_localPlayer = (0, import_index_d20a7d6e.b)(localPlayer, (value) => $localPlayer = value);
  $$unsubscribe_worldObject = (0, import_index_d20a7d6e.b)(worldObject, (value) => $worldObject = value);
  $$unsubscribe_players = (0, import_index_d20a7d6e.b)(players, (value) => $players = value);
  $$unsubscribe_trayOpen = (0, import_index_d20a7d6e.b)(trayOpen, (value) => $trayOpen = value);
  $$unsubscribe_showTarget = (0, import_index_d20a7d6e.b)(showTarget, (value) => $showTarget = value);
  $$unsubscribe_targetX = (0, import_index_d20a7d6e.b)(targetX, (value) => $targetX = value);
  $$unsubscribe_targetY = (0, import_index_d20a7d6e.b)(targetY, (value) => $targetY = value);
  $$unsubscribe_playSound = (0, import_index_d20a7d6e.b)(playSound, (value) => $playSound = value);
  $$unsubscribe_streams = (0, import_index_d20a7d6e.b)(streams, (value) => $streams = value);
  $$unsubscribe_activeArticle = (0, import_index_d20a7d6e.b)(activeArticle, (value) => $activeArticle = value);
  $$unsubscribe_chatMessages = (0, import_index_d20a7d6e.b)(chatMessages, (value) => $chatMessages = value);
  $$unsubscribe_showLabels = (0, import_index_d20a7d6e.b)(showLabels, (value) => $showLabels = value);
  let viewportElement = {};
  let roomIntent = false;
  let avatars = [];
  let newRoomIntroduction = false;
  let activeZone = false;
  const checkPortalOverlap = () => {
    if ($currentRoom.portals && Array.isArray($currentRoom.portals)) {
      let overlapIndex = false;
      $currentRoom.portals.forEach((p) => {
        if ($players[$localPlayer.uuid].x === p.x && $players[$localPlayer.uuid].y === p.y) {
          overlapIndex = p.targetArea._id;
        }
      });
      if (overlapIndex) {
        roomIntent = overlapIndex;
      } else {
        roomIntent = false;
      }
    }
  };
  const checkZoneOverlap = () => {
    document.getElementById($localPlayer.uuid);
    let overlapIndex = false;
    $currentRoom.zones.forEach((z) => {
      if ((0, import_inRange.default)($players[$localPlayer.uuid].x, z.x, z.x + z.dimensions.width) && (0, import_inRange.default)($players[$localPlayer.uuid].y, z.y, z.y + z.dimensions.height)) {
        overlapIndex = z;
      }
    });
    if (overlapIndex) {
      activeZone = overlapIndex;
    } else {
      activeZone = false;
    }
  };
  $$result.css.add(css);
  {
    {
      if (roomIntent) {
        newRoomIntroduction = false;
      }
    }
  }
  {
    {
      if ($players[$localPlayer.uuid]) {
        if ($players[$localPlayer.uuid].x || $players[$localPlayer.uuid].x) {
          checkPortalOverlap();
          checkZoneOverlap();
        }
      }
    }
  }
  $$unsubscribe_currentRoom();
  $$unsubscribe_profile();
  $$unsubscribe_localPlayer();
  $$unsubscribe_worldObject();
  $$unsubscribe_players();
  $$unsubscribe_trayOpen();
  $$unsubscribe_showTarget();
  $$unsubscribe_targetX();
  $$unsubscribe_targetY();
  $$unsubscribe_playSound();
  $$unsubscribe_streams();
  $$unsubscribe_activeArticle();
  $$unsubscribe_chatMessages();
  $$unsubscribe_showLabels();
  return `
${(0, import_index_d20a7d6e.v)(Menubar, "Menubar").$$render($$result, { currentRoom: $currentRoom }, {}, {})}


${$currentRoom ? `<div class="${[
    "viewport svelte-10dwrrh",
    ($trayOpen ? "pushed" : "") + " "
  ].join(" ").trim()}"${(0, import_index_d20a7d6e.e)("this", viewportElement, 0)}>${(0, import_index_d20a7d6e.v)(Room, "Room").$$render($$result, {
    room: $currentRoom,
    x: (0, import_get.default)($players[$localPlayer.uuid], "x", 100),
    y: (0, import_get.default)($players[$localPlayer.uuid], "y", 100)
  }, {}, {
    default: () => {
      return `
      
      ${(0, import_index_d20a7d6e.v)(Players, "Players").$$render($$result, {
        players: $players,
        currentRoomId: $currentRoom._id,
        avatars
      }, {}, {})}
      
      
      ${(0, import_index_d20a7d6e.v)(Objects, "Objects").$$render($$result, {
        objects: (0, import_get.default)($currentRoom, "objects", [])
      }, {}, {})}
      
      ${(0, import_index_d20a7d6e.v)(Zones, "Zones").$$render($$result, { zones: (0, import_get.default)($currentRoom, "zones", []) }, {}, {})}
      
      ${(0, import_index_d20a7d6e.v)(Portals, "Portals").$$render($$result, {
        portals: (0, import_get.default)($currentRoom, "portals", [])
      }, {}, {})}
      
      ${$showTarget ? `${(0, import_index_d20a7d6e.v)(TargetMarker, "Target").$$render($$result, { x: $targetX, y: $targetY }, {}, {})}` : ``}`;
    }
  })}</div>` : ``}


${(0, import_has.default)($currentRoom, "backgroundSound.asset") && $playSound ? `${(0, import_index_d20a7d6e.v)(AmbientAudio, "AmbientAudio").$$render($$result, { soundFile: $currentRoom.backgroundSound }, {}, {})}` : ``}


${`${(0, import_index_d20a7d6e.v)(AuthenticationBox, "AuthenticationBox").$$render($$result, {}, {}, {})}`}


${(0, import_index_d20a7d6e.f)($streams, (stream) => {
    return `${$currentRoom._id == stream.parentArea._ref || activeZone._id == stream.parentArea._ref ? `${(0, import_index_d20a7d6e.v)(StreamPlayer, "StreamPlayer").$$render($$result, { streamUrl: stream.videoUrl }, {}, {})}` : ``}`;
  })}


${roomIntent ? `${(0, import_index_d20a7d6e.v)(RoomEntryBox, "RoomEntryBox").$$render($$result, {
    roomIntent,
    roomTitle: $worldObject[roomIntent].title
  }, {}, {})}` : ``}

${!$trayOpen && !$activeArticle && !roomIntent ? `${newRoomIntroduction ? `${(0, import_index_d20a7d6e.v)(Caption, "Caption").$$render($$result, { text: newRoomIntroduction }, {}, {})}` : ``}` : ``}


${$activeArticle ? `${(0, import_index_d20a7d6e.v)(ArticleBox, "ArticleBox").$$render($$result, { article: $activeArticle }, {}, {})}` : ``}


${!$trayOpen && !$activeArticle ? `${(0, import_index_d20a7d6e.v)(Chat, "Chat").$$render($$result, {
    chatMessages: $chatMessages.filter((m) => m.room === $currentRoom._id)
  }, {}, {})}` : ``}





${``}


${``}


${``}


${!$trayOpen && !$activeArticle ? `<div class="${"options svelte-10dwrrh"}"><div class="${"option sound svelte-10dwrrh"}">${$playSound ? `${(0, import_index_d20a7d6e.v)(SoundOn, "SoundOn").$$render($$result, {}, {}, {})}` : `${(0, import_index_d20a7d6e.v)(SoundOff, "SoundOff").$$render($$result, {}, {}, {})}`}</div>
    <div class="${["option labels svelte-10dwrrh", $showLabels ? "on" : ""].join(" ").trim()}"><span class="${"svelte-10dwrrh"}">abc</span></div></div>` : ``}



`;
});
