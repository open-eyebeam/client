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
var import_index_c41c42e8 = require("../../chunks/index-c41c42e8.js");
var import_tween = __toESM(require("@tweenjs/tween.js"));
var import_has = __toESM(require("lodash/has.js"));
var import_inRange = __toESM(require("lodash/inRange.js"));
var import_movement_6c1eaaea = require("../../chunks/movement-6c1eaaea.js");
var import_slugify = require("slugify");
var import_get = require("lodash/get.js");
var import_get_video_id = require("get-video-id");
var import_date_fns = require("date-fns");
var import_keycloak_js = require("keycloak-js");
var import_js_cookie = require("js-cookie");
var import_lodash = require("lodash");
var import_throttle = require("lodash/throttle.js");
var import_client = require("@sanity/client");
var import_block_content_to_html = require("@sanity/block-content-to-html");
var import_image_url = require("@sanity/image-url");
var animatedBeam_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => "svg.svelte-1th4ifv.svelte-1th4ifv{height:90%;max-width:70vw}svg.svelte-1th4ifv path.svelte-1th4ifv,svg.svelte-1th4ifv line.svelte-1th4ifv{fill:none;stroke:#221f20;stroke-width:0.7px;stroke-miterlimit:10;opacity:0}svg.svelte-1th4ifv path.shown.svelte-1th4ifv,svg.svelte-1th4ifv line.shown.svelte-1th4ifv{opacity:1}")();
const css$b = {
  code: "svg.svelte-1th4ifv.svelte-1th4ifv{height:90%;max-width:70vw}svg.svelte-1th4ifv path.svelte-1th4ifv,svg.svelte-1th4ifv line.svelte-1th4ifv{fill:none;stroke:#221f20;stroke-width:0.7px;stroke-miterlimit:10;opacity:0}svg.svelte-1th4ifv path.shown.svelte-1th4ifv,svg.svelte-1th4ifv line.shown.svelte-1th4ifv{opacity:1}",
  map: null
};
const Animated_beam = (0, import_index_c41c42e8.c)(($$result, $$props, $$bindings, slots) => {
  const EASING = import_tween.default.Easing.Cubic.Out;
  let counter = { value: 1 };
  let pos = 1;
  new import_tween.default.Tween(counter).to({
    value: 20
  }, 1500).easing(EASING).onUpdate(() => {
    pos = counter.value;
  });
  $$result.css.add(css$b);
  return `<svg xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 139.98 67.2"}" class="${"svelte-1th4ifv"}"><line class="${["l-1 svelte-1th4ifv", pos > 1 ? "shown" : ""].join(" ").trim()}" y1="${"66.95"}" x2="${"53.24"}" y2="${"66.95"}"></line><path class="${["l-2 svelte-1th4ifv", pos > 2 ? "shown" : ""].join(" ").trim()}" d="${"M.82,55.05,53.28,63.8Z"}"></path><path class="${["l-3 svelte-1th4ifv", pos > 3 ? "shown" : ""].join(" ").trim()}" d="${"M3.8,43.85l50,17.25Z"}"></path><path class="${["l-4 svelte-1th4ifv", pos > 4 ? "shown" : ""].join(" ").trim()}" d="${"M8.93,33.26,55.05,58.44Z"}"></path><path class="${["l-5 svelte-1th4ifv", pos > 5 ? "shown" : ""].join(" ").trim()}" d="${"M16.05,24,56.86,56.4Z"}"></path><path class="${["l-6 svelte-1th4ifv", pos > 6 ? "shown" : ""].join(" ").trim()}" d="${"M24.12,16,58.33,54.56Z"}"></path><path class="${["l-7 svelte-1th4ifv", pos > 7 ? "shown" : ""].join(" ").trim()}" d="${"M34.3,9.1,60.92,52.76Z"}"></path><path class="${["l-8 svelte-1th4ifv", pos > 8 ? "shown" : ""].join(" ").trim()}" d="${"M45.65,4.12l18.2,47.33Z"}"></path><path class="${["l-9 svelte-1th4ifv", pos > 9 ? "shown" : ""].join(" ").trim()}" d="${"M57.12,1,66.4,50.64Z"}"></path><line class="${["l-10 svelte-1th4ifv", pos > 10 ? "shown" : ""].join(" ").trim()}" x1="${"69.63"}" y1="${"50.35"}" x2="${"69.63"}"></line><path class="${["l-11 svelte-1th4ifv", pos > 11 ? "shown" : ""].join(" ").trim()}" d="${"M82.84,1,73.6,50.64Z"}"></path><path class="${["l-12 svelte-1th4ifv", pos > 12 ? "shown" : ""].join(" ").trim()}" d="${"M94.35,4.12,76.15,51.45Z"}"></path><path class="${["l-13 svelte-1th4ifv", pos > 13 ? "shown" : ""].join(" ").trim()}" d="${"M105.7,9.1,79.08,52.76Z"}"></path><path class="${["l-14 svelte-1th4ifv", pos > 14 ? "shown" : ""].join(" ").trim()}" d="${"M115.84,16,81.63,54.56Z"}"></path><path class="${["l-15 svelte-1th4ifv", pos > 15 ? "shown" : ""].join(" ").trim()}" d="${"M124,24,83.14,56.4Z"}"></path><path class="${["l-16 svelte-1th4ifv", pos > 16 ? "shown" : ""].join(" ").trim()}" d="${"M131.07,33.26,85,58.44Z"}"></path><path class="${["l-17 svelte-1th4ifv", pos > 17 ? "shown" : ""].join(" ").trim()}" d="${"M136.2,43.85l-50,17.25Z"}"></path><path class="${["l-18 svelte-1th4ifv", pos > 18 ? "shown" : ""].join(" ").trim()}" d="${"M139.18,55.05,86.72,63.8Z"}"></path><line class="${["l-19 svelte-1th4ifv", pos > 19 ? "shown" : ""].join(" ").trim()}" x1="${"86.74"}" y1="${"66.95"}" x2="${"139.98"}" y2="${"66.95"}"></line></svg>`;
});
var LoadingScreen_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => '.loading-screen.svelte-1k5a3hm.svelte-1k5a3hm{position:fixed;top:0;left:0;width:100vw;height:100vh;background:#f5f4ee;color:#221f20;display:flex;justify-content:center;align-items:center;z-index:100000}.loading-screen.svelte-1k5a3hm .box.svelte-1k5a3hm{font-family:"Literata", serif;padding:20px;height:200px;font-size:14px;text-align:center;user-select:none}@media(max-width: 800px){.loading-screen.svelte-1k5a3hm .box.svelte-1k5a3hm{font-size:12px}}')();
const css$a = {
  code: '.loading-screen.svelte-1k5a3hm.svelte-1k5a3hm{position:fixed;top:0;left:0;width:100vw;height:100vh;background:#f5f4ee;color:#221f20;display:flex;justify-content:center;align-items:center;z-index:100000}.loading-screen.svelte-1k5a3hm .box.svelte-1k5a3hm{font-family:"Literata", serif;padding:20px;height:200px;font-size:14px;text-align:center;user-select:none}@media(max-width: 800px){.loading-screen.svelte-1k5a3hm .box.svelte-1k5a3hm{font-size:12px}}',
  map: null
};
const LoadingScreen = (0, import_index_c41c42e8.c)(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$a);
  return `<div class="${"loading-screen svelte-1k5a3hm"}"><div class="${"box svelte-1k5a3hm"}">${(0, import_index_c41c42e8.v)(Animated_beam, "AnimatedBeam").$$render($$result, {}, {}, {})}</div>
</div>`;
});
var Error_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => '.error-screen.svelte-5oxc6r.svelte-5oxc6r{position:fixed;top:0;left:0;width:100vw;height:100vh;background:#221f20;color:#f5f4ee;display:flex;justify-content:center;align-items:center;z-index:100000}.error-screen.svelte-5oxc6r .box.svelte-5oxc6r{font-family:"Literata", serif;padding:20px;font-size:14px;text-align:center;user-select:none}')();
const css$9 = {
  code: '.error-screen.svelte-5oxc6r.svelte-5oxc6r{position:fixed;top:0;left:0;width:100vw;height:100vh;background:#221f20;color:#f5f4ee;display:flex;justify-content:center;align-items:center;z-index:100000}.error-screen.svelte-5oxc6r .box.svelte-5oxc6r{font-family:"Literata", serif;padding:20px;font-size:14px;text-align:center;user-select:none}',
  map: null
};
const Error2 = (0, import_index_c41c42e8.c)(($$result, $$props, $$bindings, slots) => {
  let { message = "" } = $$props;
  if ($$props.message === void 0 && $$bindings.message && message !== void 0)
    $$bindings.message(message);
  $$result.css.add(css$9);
  return `<div class="${"error-screen svelte-5oxc6r"}"><div class="${"box svelte-5oxc6r"}"><div class="${"header"}">ERROR: ${(0, import_index_c41c42e8.e)(message)}</div></div>
</div>`;
});
var Reconnection_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => '.reconnection.svelte-sbvr22.svelte-sbvr22{position:fixed;bottom:15px;left:15px;display:flex;justify-content:center;align-items:center;z-index:10}@media(max-width: 800px){.reconnection.svelte-sbvr22.svelte-sbvr22{bottom:55px;left:0}}.reconnection.svelte-sbvr22 .box.svelte-sbvr22{font-family:"Literata", serif;padding:20px;background:#f5f4ee;color:#221f20;font-size:14px;text-align:center;user-select:none}@media(max-width: 800px){.reconnection.svelte-sbvr22 .box.svelte-sbvr22{width:calc(100% - 20px)}}')();
const css$8 = {
  code: '.reconnection.svelte-sbvr22.svelte-sbvr22{position:fixed;bottom:15px;left:15px;display:flex;justify-content:center;align-items:center;z-index:10}@media(max-width: 800px){.reconnection.svelte-sbvr22.svelte-sbvr22{bottom:55px;left:0}}.reconnection.svelte-sbvr22 .box.svelte-sbvr22{font-family:"Literata", serif;padding:20px;background:#f5f4ee;color:#221f20;font-size:14px;text-align:center;user-select:none}@media(max-width: 800px){.reconnection.svelte-sbvr22 .box.svelte-sbvr22{width:calc(100% - 20px)}}',
  map: null
};
const Reconnection = (0, import_index_c41c42e8.c)(($$result, $$props, $$bindings, slots) => {
  let { reconnectionAttempts: reconnectionAttempts2 = 0 } = $$props;
  let { disconnectionCode: disconnectionCode2 = 0 } = $$props;
  if ($$props.reconnectionAttempts === void 0 && $$bindings.reconnectionAttempts && reconnectionAttempts2 !== void 0)
    $$bindings.reconnectionAttempts(reconnectionAttempts2);
  if ($$props.disconnectionCode === void 0 && $$bindings.disconnectionCode && disconnectionCode2 !== void 0)
    $$bindings.disconnectionCode(disconnectionCode2);
  $$result.css.add(css$8);
  return `<div class="${"reconnection svelte-sbvr22"}"><div class="${"box svelte-sbvr22"}"><div class="${"header"}">You have been disconnected from the gameserver. (Error: ${(0, import_index_c41c42e8.e)(disconnectionCode2)})
    </div>
    <div class="${"header"}">Please reload the page to attempt to reconnect.</div></div>
</div>`;
});
var Clock_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => ".clock.svelte-13is0nm{font-size:12px;color:#f5f4ee}")();
const css$7 = {
  code: ".clock.svelte-13is0nm{font-size:12px;color:#f5f4ee}",
  map: null
};
const Clock = (0, import_index_c41c42e8.c)(($$result, $$props, $$bindings, slots) => {
  let $activeCity, $$unsubscribe_activeCity;
  $$unsubscribe_activeCity = (0, import_index_c41c42e8.a)(import_movement_6c1eaaea.a, (value) => $activeCity = value);
  const API_KEY = 'a9b67d6b5ed093b28c410750ef6a70cd"';
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
  $$result.css.add(css$7);
  {
    {
      updateTime();
      updateWeather($activeCity.name);
    }
  }
  $$unsubscribe_activeCity();
  return `<div class="${"clock svelte-13is0nm"}">${showClock && $activeCity.name ? `<span>It\u2019s ${(0, import_index_c41c42e8.e)(currentTime)} and ${(0, import_index_c41c42e8.e)(currentWeather.description)} in ${(0, import_index_c41c42e8.e)($activeCity.name)}</span>` : ``}
</div>`;
});
const css$6 = {
  code: "svg.svelte-hhwbji path.svelte-hhwbji{fill:#f5f4ee}",
  map: null
};
const Arrow_down = (0, import_index_c41c42e8.c)(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$6);
  return `<svg width="${"9"}" height="${"8"}" viewBox="${"0 0 9 8"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}" class="${"svelte-hhwbji"}"><path d="${"M4.78393 7.78516L0.640486 0.608508L8.92737 0.608508L4.78393 7.78516Z"}" class="${"svelte-hhwbji"}"></path></svg>`;
});
var fullBeam_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => "svg.svelte-1wdefg6.svelte-1wdefg6{width:100%}svg.svelte-1wdefg6 path.svelte-1wdefg6{fill:none;stroke:#f5f4ee;stroke-width:0.75;stroke-miterlimit:10}svg.black.svelte-1wdefg6 path.svelte-1wdefg6{stroke:#221f20}")();
const css$5 = {
  code: "svg.svelte-1wdefg6.svelte-1wdefg6{width:100%}svg.svelte-1wdefg6 path.svelte-1wdefg6{fill:none;stroke:#f5f4ee;stroke-width:0.75;stroke-miterlimit:10}svg.black.svelte-1wdefg6 path.svelte-1wdefg6{stroke:#221f20}",
  map: null
};
const Full_beam = (0, import_index_c41c42e8.c)(($$result, $$props, $$bindings, slots) => {
  let { black = false } = $$props;
  if ($$props.black === void 0 && $$bindings.black && black !== void 0)
    $$bindings.black(black);
  $$result.css.add(css$5);
  return `<svg version="${"1.1"}" id="${"Layer_1"}" xmlns="${"http://www.w3.org/2000/svg"}" xmlns:xlink="${"http://www.w3.org/1999/xlink"}" x="${"0px"}" y="${"0px"}" viewBox="${"0 0 18 18"}" style="${"enable-background:new 0 0 18 18;"}" xml:space="${"preserve"}" class="${["svelte-1wdefg6", black ? "black" : ""].join(" ").trim()}"><path class="${"st1 svelte-1wdefg6"}" d="${"M0,8.8h6.8 M16.8,4.4l-5.9,3.3L16.8,4.4z M13.6,1.2l-3.4,5.7L13.6,1.2z M11.1,8.8H18 M1.2,4.4l5.9,3.3L1.2,4.4z M4.4,1.2l3.4,5.7L4.4,1.2z M9,0v6.6V0z"}"></path><path class="${"st1 svelte-1wdefg6"}" d="${"M1.2,13.1l5.9-3.3 M4.4,16.3l3.4-5.7 M16.8,13.1l-5.9-3.3 M13.6,16.3l-3.4-5.7 M9,17.4v-6.6"}"></path></svg>`;
});
var menubar_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => "h1.svelte-5j0hcs.svelte-5j0hcs{all:unset}header.svelte-5j0hcs.svelte-5j0hcs{position:absolute;top:0;left:0;width:100%;z-index:100000;height:240px;transition:transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);transform:translateY(-240px);font-size:12px}@media(max-width: 800px){header.svelte-5j0hcs.svelte-5j0hcs{pointer-events:none}}header.open.svelte-5j0hcs.svelte-5j0hcs{transform:translateY(0)}header.svelte-5j0hcs .menubar.svelte-5j0hcs{width:100%;height:30px;background:#221f20;color:#f5f4ee;line-height:30px;padding-left:15px;padding-right:10px;overflow:hidden;border-bottom:1px solid #070101}header.svelte-5j0hcs .menubar .inner-text.svelte-5j0hcs{opacity:1}header.svelte-5j0hcs .menubar .breadcrumbs.svelte-5j0hcs{float:left}header.svelte-5j0hcs .menubar .arrow-down.svelte-5j0hcs{margin-right:5px}header.svelte-5j0hcs .menubar a.svelte-5j0hcs{color:#f5f4ee;text-decoration:none}header.svelte-5j0hcs .menubar .clock.svelte-5j0hcs{float:right}header.svelte-5j0hcs .menubar .tray-toggle.svelte-5j0hcs{float:right;width:18px;height:30px;display:flex;justify-content:center;align-items:center;margin-left:12px;cursor:pointer}header.svelte-5j0hcs .settings.svelte-5j0hcs{height:240px;background:#dedcd5;color:#221f20;overflow:hidden}header.svelte-5j0hcs .settings .settings-bar.svelte-5j0hcs{height:30px;line-height:30px;padding-left:5px;padding-right:10px;cursor:pointer;border-bottom:1px solid #221f20;color:#221f20;width:100%}header.svelte-5j0hcs .settings .settings-bar .tray-toggle.svelte-5j0hcs{width:18px;height:30px;display:flex;margin-right:8px;justify-content:center;align-items:center;margin-left:8px;cursor:pointer;float:left}header.svelte-5j0hcs .settings .settings-content.svelte-5j0hcs{display:flex;padding-left:15px;padding-right:15px}header.svelte-5j0hcs .settings .settings-content .section.svelte-5j0hcs{padding-top:20px}header.svelte-5j0hcs .settings .settings-content .section .section-header.svelte-5j0hcs{margin-bottom:10px}header.svelte-5j0hcs .settings .settings-content .section.theme.svelte-5j0hcs{width:20%}header.svelte-5j0hcs .settings .settings-content .section.text.svelte-5j0hcs{width:30%}header.svelte-5j0hcs .settings .settings-content .section.city.svelte-5j0hcs{width:50%}.city-button.svelte-5j0hcs.svelte-5j0hcs{padding:8px 12px;display:inline-block;border-top:1px solid #221f20;border-right:1px solid #221f20;border-bottom:1px solid #221f20;user-select:none;cursor:pointer}.city-button.svelte-5j0hcs.svelte-5j0hcs:first-child{border-left:1px solid #221f20}.city-button.active.svelte-5j0hcs.svelte-5j0hcs{background:#221f20;color:#f5f4ee}.city-button.svelte-5j0hcs.svelte-5j0hcs:hover{background:#221f20;color:#f5f4ee}.city-text.svelte-5j0hcs.svelte-5j0hcs{max-width:520px}")();
const css$4 = {
  code: "h1.svelte-5j0hcs.svelte-5j0hcs{all:unset}header.svelte-5j0hcs.svelte-5j0hcs{position:absolute;top:0;left:0;width:100%;z-index:100000;height:240px;transition:transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);transform:translateY(-240px);font-size:12px}@media(max-width: 800px){header.svelte-5j0hcs.svelte-5j0hcs{pointer-events:none}}header.open.svelte-5j0hcs.svelte-5j0hcs{transform:translateY(0)}header.svelte-5j0hcs .menubar.svelte-5j0hcs{width:100%;height:30px;background:#221f20;color:#f5f4ee;line-height:30px;padding-left:15px;padding-right:10px;overflow:hidden;border-bottom:1px solid #070101}header.svelte-5j0hcs .menubar .inner-text.svelte-5j0hcs{opacity:1}header.svelte-5j0hcs .menubar .breadcrumbs.svelte-5j0hcs{float:left}header.svelte-5j0hcs .menubar .arrow-down.svelte-5j0hcs{margin-right:5px}header.svelte-5j0hcs .menubar a.svelte-5j0hcs{color:#f5f4ee;text-decoration:none}header.svelte-5j0hcs .menubar .clock.svelte-5j0hcs{float:right}header.svelte-5j0hcs .menubar .tray-toggle.svelte-5j0hcs{float:right;width:18px;height:30px;display:flex;justify-content:center;align-items:center;margin-left:12px;cursor:pointer}header.svelte-5j0hcs .settings.svelte-5j0hcs{height:240px;background:#dedcd5;color:#221f20;overflow:hidden}header.svelte-5j0hcs .settings .settings-bar.svelte-5j0hcs{height:30px;line-height:30px;padding-left:5px;padding-right:10px;cursor:pointer;border-bottom:1px solid #221f20;color:#221f20;width:100%}header.svelte-5j0hcs .settings .settings-bar .tray-toggle.svelte-5j0hcs{width:18px;height:30px;display:flex;margin-right:8px;justify-content:center;align-items:center;margin-left:8px;cursor:pointer;float:left}header.svelte-5j0hcs .settings .settings-content.svelte-5j0hcs{display:flex;padding-left:15px;padding-right:15px}header.svelte-5j0hcs .settings .settings-content .section.svelte-5j0hcs{padding-top:20px}header.svelte-5j0hcs .settings .settings-content .section .section-header.svelte-5j0hcs{margin-bottom:10px}header.svelte-5j0hcs .settings .settings-content .section.theme.svelte-5j0hcs{width:20%}header.svelte-5j0hcs .settings .settings-content .section.text.svelte-5j0hcs{width:30%}header.svelte-5j0hcs .settings .settings-content .section.city.svelte-5j0hcs{width:50%}.city-button.svelte-5j0hcs.svelte-5j0hcs{padding:8px 12px;display:inline-block;border-top:1px solid #221f20;border-right:1px solid #221f20;border-bottom:1px solid #221f20;user-select:none;cursor:pointer}.city-button.svelte-5j0hcs.svelte-5j0hcs:first-child{border-left:1px solid #221f20}.city-button.active.svelte-5j0hcs.svelte-5j0hcs{background:#221f20;color:#f5f4ee}.city-button.svelte-5j0hcs.svelte-5j0hcs:hover{background:#221f20;color:#f5f4ee}.city-text.svelte-5j0hcs.svelte-5j0hcs{max-width:520px}",
  map: null
};
const Menubar = (0, import_index_c41c42e8.c)(($$result, $$props, $$bindings, slots) => {
  let $trayOpen, $$unsubscribe_trayOpen;
  let $activeCity, $$unsubscribe_activeCity;
  $$unsubscribe_trayOpen = (0, import_index_c41c42e8.a)(import_movement_6c1eaaea.t, (value) => $trayOpen = value);
  $$unsubscribe_activeCity = (0, import_index_c41c42e8.a)(import_movement_6c1eaaea.a, (value) => $activeCity = value);
  let { currentRoom: currentRoom2 = {} } = $$props;
  const cities = (0, import_movement_6c1eaaea.l)('*[_id == "cities"][0]');
  cities.then((c) => {
    if (c.cities && c.cities[0]) {
      import_movement_6c1eaaea.a.set(c.cities[0]);
    }
  });
  if ($$props.currentRoom === void 0 && $$bindings.currentRoom && currentRoom2 !== void 0)
    $$bindings.currentRoom(currentRoom2);
  $$result.css.add(css$4);
  $$unsubscribe_trayOpen();
  $$unsubscribe_activeCity();
  return `<header class="${["svelte-5j0hcs", $trayOpen ? "open" : ""].join(" ").trim()}"><div class="${"settings svelte-5j0hcs"}">
    <div class="${"settings-bar svelte-5j0hcs"}"><div class="${"tray-toggle svelte-5j0hcs"}">${(0, import_index_c41c42e8.v)(Full_beam, "FullBeam").$$render($$result, { black: true }, {}, {})}</div>
      Settings
    </div>
    
    <div class="${"settings-content svelte-5j0hcs"}">
      <div class="${"section theme svelte-5j0hcs"}"></div>
      
      <div class="${"section text svelte-5j0hcs"}"></div>
      
      <div class="${"section city svelte-5j0hcs"}"><div class="${"section-header svelte-5j0hcs"}">City</div>
        ${function(__value) {
    if ((0, import_index_c41c42e8.i)(__value)) {
      __value.then(null, import_index_c41c42e8.n);
      return ``;
    }
    return function(cities2) {
      return `
          <div class="${"city-switches"}">${(0, import_index_c41c42e8.b)(cities2.cities, (city) => {
        return `<div class="${[
          "city-button svelte-5j0hcs",
          $activeCity._key === city._key ? "active" : ""
        ].join(" ").trim()}">${(0, import_index_c41c42e8.e)(city.name)}
              </div>`;
      })}</div>
          <div class="${"city-text svelte-5j0hcs"}">${(0, import_has.default)(cities2, "content.content", []) ? `<div>${(0, import_index_c41c42e8.v)(import_movement_6c1eaaea.B, "Blocks").$$render($$result, { blocks: cities2.content.content }, {}, {})}</div>` : ``}</div>
        `;
    }(__value);
  }(cities)}</div></div></div>
  <nav class="${"menubar svelte-5j0hcs"}"><div class="${"inner-text svelte-5j0hcs"}">
      <div class="${"breadcrumbs svelte-5j0hcs"}"><span class="${"arrow-down svelte-5j0hcs"}">${(0, import_index_c41c42e8.v)(Arrow_down, "ArrowDown").$$render($$result, {}, {}, {})}</span>
<h1 class="${"svelte-5j0hcs"}"><a href="${"/"}" class="${"svelte-5j0hcs"}">open.eyebeam.org ${currentRoom2.title ? `/ ${(0, import_index_c41c42e8.e)(currentRoom2.title)}` : ``}</a></h1></div>
      
      <div class="${"tray-toggle svelte-5j0hcs"}">${(0, import_index_c41c42e8.v)(Full_beam, "FullBeam").$$render($$result, {}, {}, {})}</div>
      
      <div class="${"clock svelte-5j0hcs"}">${(0, import_index_c41c42e8.v)(Clock, "Clock").$$render($$result, {}, {}, {})}</div></div></nav>
</header>`;
});
var AuthenticationBox_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => ".auth-box.svelte-ykc819{position:fixed;top:40px;right:10px;background:#dedcd5;border:1px solid #221f20;cursor:pointer;font-size:12px;z-index:10000;width:60px;height:30px;text-align:center;line-height:27px}@media(max-width: 800px){.auth-box.svelte-ykc819{display:none}}.auth-box.svelte-ykc819:hover{opacity:0.8}")();
const css$3 = {
  code: ".auth-box.svelte-ykc819{position:fixed;top:40px;right:10px;background:#dedcd5;border:1px solid #221f20;cursor:pointer;font-size:12px;z-index:10000;width:60px;height:30px;text-align:center;line-height:27px}@media(max-width: 800px){.auth-box.svelte-ykc819{display:none}}.auth-box.svelte-ykc819:hover{opacity:0.8}",
  map: null
};
const AuthenticationBox = (0, import_index_c41c42e8.c)(($$result, $$props, $$bindings, slots) => {
  let $isAuthenticated, $$unsubscribe_isAuthenticated;
  let $profile, $$unsubscribe_profile;
  $$unsubscribe_isAuthenticated = (0, import_index_c41c42e8.a)(import_movement_6c1eaaea.i, (value) => $isAuthenticated = value);
  $$unsubscribe_profile = (0, import_index_c41c42e8.a)(import_movement_6c1eaaea.p, (value) => $profile = value);
  $$result.css.add(css$3);
  $$unsubscribe_isAuthenticated();
  $$unsubscribe_profile();
  return `<div class="${"auth-box svelte-ykc819"}">${$isAuthenticated ? `<div>${(0, import_index_c41c42e8.e)($profile && $profile.name ? $profile.name + " (Log out)" : "Log out")}</div>` : `Login`}
</div>`;
});
var SoundOn_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => "svg.svelte-1iwhujd.svelte-1iwhujd{height:14px}svg.svelte-1iwhujd path.svelte-1iwhujd{fill:#221f20}")();
const css$2 = {
  code: "svg.svelte-1iwhujd.svelte-1iwhujd{height:14px}svg.svelte-1iwhujd path.svelte-1iwhujd{fill:#221f20}",
  map: null
};
const SoundOn = (0, import_index_c41c42e8.c)(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$2);
  return `<svg version="${"1.1"}" id="${"Layer_1"}" xmlns="${"http://www.w3.org/2000/svg"}" xmlns:xlink="${"http://www.w3.org/1999/xlink"}" x="${"0px"}" y="${"0px"}" viewBox="${"0 0 18.3 17.6"}" style="${"enable-background:new 0 0 18.3 17.6;"}" xml:space="${"preserve"}" class="${"svelte-1iwhujd"}"><path d="${"M1.6,11.5l4.3,4.7l-1.3,1.2c-0.2,0.2-0.4,0.3-0.5,0.3c-0.1,0-0.3-0.1-0.5-0.3l-3.4-3.7C0.1,13.4,0,13.2,0,13.1\n		c0-0.1,0.1-0.3,0.3-0.5L1.6,11.5z M9.5,3.1c0.7,0.2,1.4,0.4,2,0.8c0.6,0.4,1.2,0.9,1.7,1.5c0.5,0.6,1,1.1,1.3,1.8\n		c0.4,0.7,0.6,1.4,0.7,2.1l-1.3,0c-0.1-0.6-0.3-1.2-0.6-1.7c-0.3-0.5-0.6-0.9-1-1.3c-0.4-0.4-0.8-0.8-1.3-1.1\n		c-0.5-0.3-1-0.6-1.6-0.7L9.5,3.1z M9.7,0c1,0.2,1.9,0.6,2.9,1.2c0.9,0.6,1.8,1.4,2.7,2.3c0.8,0.9,1.5,1.9,2.1,2.9s0.8,2,0.9,3\n		l-1.3,0c-0.1-0.8-0.4-1.7-0.8-2.5c-0.5-0.8-1.1-1.7-1.8-2.5c-0.7-0.8-1.5-1.4-2.3-2c-0.8-0.5-1.6-0.8-2.4-1L9.7,0z M4.1,2.1\n		C4.2,2,4.3,1.9,4.5,2C4.6,2,4.8,2.1,5,2.3l10.5,11.3c0.2,0.2,0.3,0.4,0.3,0.6c0,0.1,0,0.3-0.2,0.4c-0.1,0.1-0.4,0.2-0.9,0.2\n		l-7.9,0.4l-4.3-4.7l1.2-7.6c0-0.2,0.1-0.4,0.1-0.5C4,2.3,4,2.2,4.1,2.1"}" class="${"svelte-1iwhujd"}"></path></svg>`;
});
var SoundOff_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => "svg.svelte-y4dmoz.svelte-y4dmoz{height:14px}svg.svelte-y4dmoz path.svelte-y4dmoz{fill:#221f20}.b.svelte-y4dmoz.svelte-y4dmoz{opacity:0}")();
const css$1 = {
  code: "svg.svelte-y4dmoz.svelte-y4dmoz{height:14px}svg.svelte-y4dmoz path.svelte-y4dmoz{fill:#221f20}.b.svelte-y4dmoz.svelte-y4dmoz{opacity:0}",
  map: null
};
const SoundOff = (0, import_index_c41c42e8.c)(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `<svg xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 18.3 17.7"}" class="${"svelte-y4dmoz"}"><path class="${"a svelte-y4dmoz"}" d="${"M1.6,11.5l4.3,4.7L4.6,17.4a.91.91,0,0,1-.5.3.91.91,0,0,1-.5-.3L.2,13.7a3.93,3.93,0,0,1-.2-.6.91.91,0,0,1,.3-.5Z"}"></path><path class="${"b svelte-y4dmoz"}" d="${"M9.5,3.1a7,7,0,0,1,2,.8,8,8,0,0,1,1.7,1.5,7.49,7.49,0,0,1,1.3,1.8,5.79,5.79,0,0,1,.7,2.1H13.9a4.92,4.92,0,0,0-.6-1.7,6.42,6.42,0,0,0-1-1.3A6.89,6.89,0,0,0,11,5.2a4.59,4.59,0,0,0-1.6-.7Z"}"></path><path class="${"b svelte-y4dmoz"}" d="${"M9.7,0a8.94,8.94,0,0,1,2.9,1.2,18.37,18.37,0,0,1,2.7,2.3,19.41,19.41,0,0,1,2.1,2.9,6.91,6.91,0,0,1,.9,3H17a8.09,8.09,0,0,0-.8-2.5,19.5,19.5,0,0,0-1.8-2.5,14.34,14.34,0,0,0-2.3-2,8.18,8.18,0,0,0-2.4-1Z"}"></path><path class="${"a svelte-y4dmoz"}" d="${"M4.1,2.1c.1-.1.2-.2.4-.1a.91.91,0,0,1,.5.3L15.5,13.6a.86.86,0,0,1,.3.6.4.4,0,0,1-.2.4,1.44,1.44,0,0,1-.9.2l-7.9.4L2.5,10.5,3.7,2.9a4.33,4.33,0,0,1,.1-.5c.2-.1.2-.2.3-.3"}"></path></svg>`;
});
var __layout_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => '.svelte-1n4mbfs.svelte-1n4mbfs{box-sizing:border-box;font-family:"Literata", serif}.options.svelte-1n4mbfs.svelte-1n4mbfs{position:fixed;top:40px;right:75px}@media(max-width: 800px){.options.svelte-1n4mbfs.svelte-1n4mbfs{display:none}}.options.svelte-1n4mbfs .option.svelte-1n4mbfs{margin-left:5px;font-size:12px;background:#dedcd5;float:right;padding:5px;user-select:none;cursor:pointer;border:1px solid #221f20;width:30px;height:30px;display:flex;justify-content:center;align-items:center}.options.svelte-1n4mbfs .option span.svelte-1n4mbfs{line-height:1.2em}.options.svelte-1n4mbfs .option.on span.svelte-1n4mbfs{background:#221f20;color:#f5f4ee}.options.svelte-1n4mbfs .option.svelte-1n4mbfs:hover{opacity:0.8}')();
const css = {
  code: '.svelte-1n4mbfs.svelte-1n4mbfs{box-sizing:border-box;font-family:"Literata", serif}.options.svelte-1n4mbfs.svelte-1n4mbfs{position:fixed;top:40px;right:75px}@media(max-width: 800px){.options.svelte-1n4mbfs.svelte-1n4mbfs{display:none}}.options.svelte-1n4mbfs .option.svelte-1n4mbfs{margin-left:5px;font-size:12px;background:#dedcd5;float:right;padding:5px;user-select:none;cursor:pointer;border:1px solid #221f20;width:30px;height:30px;display:flex;justify-content:center;align-items:center}.options.svelte-1n4mbfs .option span.svelte-1n4mbfs{line-height:1.2em}.options.svelte-1n4mbfs .option.on span.svelte-1n4mbfs{background:#221f20;color:#f5f4ee}.options.svelte-1n4mbfs .option.svelte-1n4mbfs:hover{opacity:0.8}',
  map: null
};
let reconnectionAttempts = 0;
let disconnectionCode = 0;
const _layout = (0, import_index_c41c42e8.c)(($$result, $$props, $$bindings, slots) => {
  let $uiState, $$unsubscribe_uiState;
  let $currentRoom, $$unsubscribe_currentRoom;
  let $activeArticle, $$unsubscribe_activeArticle;
  let $trayOpen, $$unsubscribe_trayOpen;
  let $playSound, $$unsubscribe_playSound;
  let $showLabels, $$unsubscribe_showLabels;
  $$unsubscribe_uiState = (0, import_index_c41c42e8.a)(import_movement_6c1eaaea.u, (value) => $uiState = value);
  $$unsubscribe_currentRoom = (0, import_index_c41c42e8.a)(import_movement_6c1eaaea.c, (value) => $currentRoom = value);
  $$unsubscribe_activeArticle = (0, import_index_c41c42e8.a)(import_movement_6c1eaaea.b, (value) => $activeArticle = value);
  $$unsubscribe_trayOpen = (0, import_index_c41c42e8.a)(import_movement_6c1eaaea.t, (value) => $trayOpen = value);
  $$unsubscribe_playSound = (0, import_index_c41c42e8.a)(import_movement_6c1eaaea.d, (value) => $playSound = value);
  $$unsubscribe_showLabels = (0, import_index_c41c42e8.a)(import_movement_6c1eaaea.s, (value) => $showLabels = value);
  $$result.css.add(css);
  $$unsubscribe_uiState();
  $$unsubscribe_currentRoom();
  $$unsubscribe_activeArticle();
  $$unsubscribe_trayOpen();
  $$unsubscribe_playSound();
  $$unsubscribe_showLabels();
  return `
${$uiState == import_movement_6c1eaaea.S.READY ? `${(0, import_index_c41c42e8.v)(Menubar, "Menubar").$$render($$result, { currentRoom: $currentRoom }, {}, {})}` : ``}


${slots.default ? slots.default({}) : ``}


${$uiState == import_movement_6c1eaaea.S.READY && !$activeArticle ? `${(0, import_index_c41c42e8.v)(AuthenticationBox, "AuthenticationBox").$$render($$result, {}, {}, {})}` : ``}


${$uiState == import_movement_6c1eaaea.S.LOADING ? `${(0, import_index_c41c42e8.v)(LoadingScreen, "LoadingScreen").$$render($$result, {}, {}, {})}` : ``}


${$uiState == import_movement_6c1eaaea.S.ERROR ? `${(0, import_index_c41c42e8.v)(Error2, "Error").$$render($$result, { message: "" }, {}, {})}` : ``}


${$uiState == import_movement_6c1eaaea.S.DISCONNECTED ? `${(0, import_index_c41c42e8.v)(Reconnection, "Reconnection").$$render($$result, { reconnectionAttempts, disconnectionCode }, {}, {})}` : ``}


${!$trayOpen && !$activeArticle ? `<div class="${"options svelte-1n4mbfs"}"><div class="${"option sound svelte-1n4mbfs"}">${$playSound ? `${(0, import_index_c41c42e8.v)(SoundOn, "SoundOn").$$render($$result, {}, {}, {})}` : `${(0, import_index_c41c42e8.v)(SoundOff, "SoundOff").$$render($$result, {}, {}, {})}`}</div>
    <div class="${["option labels svelte-1n4mbfs", $showLabels ? "on" : ""].join(" ").trim()}"><span class="${"svelte-1n4mbfs"}">abc</span></div></div>` : ``}`;
});
