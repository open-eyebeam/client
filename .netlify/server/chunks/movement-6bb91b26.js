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
  B: () => Blocks,
  G: () => GRID_SIZE,
  S: () => STATE,
  a: () => activeCity,
  b: () => activeArticle,
  c: () => currentRoom,
  d: () => playSound,
  e: () => showGrid,
  f: () => chatMessages,
  g: () => urlFor,
  h: () => players,
  i: () => isAuthenticated,
  j: () => leaveArticle,
  k: () => localPlayer,
  l: () => loadDataFromMainSite,
  m: () => roomIntent,
  n: () => streams,
  o: () => objectIntent,
  p: () => profile,
  q: () => activeZone,
  r: () => renderBlockText,
  s: () => showLabels,
  t: () => trayOpen,
  u: () => uiState,
  v: () => checkPortalOverlap,
  w: () => worldObject,
  x: () => checkZoneOverlap,
  y: () => checkObjectOverlap
});
module.exports = __toCommonJS(stdin_exports);
var import_index_fb0a7752 = require("./index-fb0a7752.js");
var import_slugify = __toESM(require("slugify"));
var import_get = __toESM(require("lodash/get.js"));
var import_has = __toESM(require("lodash/has.js"));
var import_get_video_id = __toESM(require("get-video-id"));
var import_date_fns = require("date-fns");
var import_keycloak_js = require("keycloak-js");
var import_inRange = __toESM(require("lodash/inRange.js"));
var import_throttle = require("lodash/throttle.js");
var import_client = __toESM(require("@sanity/client"));
var import_block_content_to_html = __toESM(require("@sanity/block-content-to-html"));
var import_image_url = __toESM(require("@sanity/image-url"));
const subscriber_queue = [];
function writable(value, start = import_index_fb0a7752.n) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if ((0, import_index_fb0a7752.d)(value, new_value)) {
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
  function subscribe(run, invalidate = import_index_fb0a7752.n) {
    const subscriber = [run, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || import_index_fb0a7752.n;
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
  return { set, update, subscribe };
}
const STATE = {
  ERROR: 0,
  READY: 1,
  LOADING: 2,
  DISCONNECTED: 3,
  ONBOARDING: 4
};
const showGrid = writable(false);
const showLabels = writable(true);
const playSound = writable(false);
const activeArticle = writable(false);
const activeCity = writable({});
const trayOpen = writable(false);
const uiState = writable(STATE.LOADING);
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
var personLink_svelte_svelte_type_style_lang = "";
const css$g = {
  code: "a.svelte-zgjpki{color:#221f20;background:#dedcd5;text-decoration:none;margin-bottom:3px;display:inline-block}",
  map: null
};
const Person_link = (0, import_index_fb0a7752.c)(($$result, $$props, $$bindings, slots) => {
  let { person = false } = $$props;
  let { overrideText = false } = $$props;
  let { personId = false } = $$props;
  const renderNewLines = (t) => t.replace(/(?:\r\n|\r|\n)/g, "<br>");
  if (personId) {
    loadDataFromMainSite('*[_id == "' + personId + '"][0]').then((p) => {
      person = p;
    });
  }
  if ($$props.person === void 0 && $$bindings.person && person !== void 0)
    $$bindings.person(person);
  if ($$props.overrideText === void 0 && $$bindings.overrideText && overrideText !== void 0)
    $$bindings.overrideText(overrideText);
  if ($$props.personId === void 0 && $$bindings.personId && personId !== void 0)
    $$bindings.personId(personId);
  $$result.css.add(css$g);
  return `${person ? `<a${(0, import_index_fb0a7752.f)("href", "/people/" + (0, import_get.default)(person, "slug.current"), 0)} class="${"svelte-zgjpki"}"><!-- HTML_TAG_START -->${overrideText ? renderNewLines(overrideText) : person.title}<!-- HTML_TAG_END --></a>` : ``}`;
});
var externalLink_svelte_svelte_type_style_lang = "";
const css$f = {
  code: "svg.svelte-18gy7aj.svelte-18gy7aj{margin-left:4px}svg.svelte-18gy7aj path.svelte-18gy7aj{fill:#221f20}",
  map: null
};
const External_link = (0, import_index_fb0a7752.c)(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$f);
  return `<svg width="${"11"}" height="${"11"}" viewBox="${"0 0 11 11"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}" class="${"svelte-18gy7aj"}"><path d="${"M3.9378 1.68763V2.81271H1.12509V9.00068H7.31305V6.18797H8.43814V9.56322C8.43814 9.72074 8.38376 9.85387 8.275 9.96263C8.16624 10.0714 8.03311 10.1258 7.8756 10.1258H0.562543C0.40503 10.1258 0.271896 10.0714 0.163137 9.96263C0.0543785 9.85387 0 9.72074 0 9.56322V2.25017C0 2.09266 0.0543785 1.95952 0.163137 1.85077C0.271896 1.74201 0.40503 1.68763 0.562543 1.68763H3.9378ZM10.1258 0V4.50034H9.00068V1.9239L4.61285 6.30048L3.82529 5.51292L8.20187 1.12509H5.62543V0H10.1258Z"}" class="${"svelte-18gy7aj"}"></path></svg>`;
});
const Text = (0, import_index_fb0a7752.c)(($$result, $$props, $$bindings, slots) => {
  let { b = {} } = $$props;
  const renderNewLines = (t) => t.replace(/(?:\r\n|\r|\n)/g, "<br>");
  if ($$props.b === void 0 && $$bindings.b && b !== void 0)
    $$bindings.b(b);
  return `${b.children && b.children.length > 0 ? `${b.style == "h2" ? `<h2${(0, import_index_fb0a7752.f)("id", (0, import_slugify.default)(b.children[0].text, { lower: true }), 0)}>${(0, import_index_fb0a7752.b)(b.children, (c) => {
    return `${!c.marks || c.marks.length === 0 ? `${(0, import_index_fb0a7752.e)(c.text)}` : `<strong>${(0, import_index_fb0a7752.e)(c.text)}</strong>`}`;
  })}</h2>` : `${b.style == "h3" ? `<h3>${(0, import_index_fb0a7752.b)(b.children, (c) => {
    return `${(0, import_index_fb0a7752.e)(c.text)}`;
  })}</h3>` : `<p>${(0, import_index_fb0a7752.b)(b.children, (c) => {
    return `${!c.marks || c.marks.length === 0 ? `<!-- HTML_TAG_START -->${renderNewLines(c.text)}<!-- HTML_TAG_END -->` : `${c.marks.includes("em") ? `<em><!-- HTML_TAG_START -->${renderNewLines(c.text)}<!-- HTML_TAG_END --></em>` : `${c.marks.includes("strong") ? `<strong><!-- HTML_TAG_START -->${renderNewLines(c.text)}<!-- HTML_TAG_END --></strong>` : `${b.markDefs.find((m) => m._key === c.marks[0])._type === "link" ? `<a${(0, import_index_fb0a7752.f)("href", b.markDefs.find((m) => m._key === c.marks[0]).href, 0)}><!-- HTML_TAG_START -->${renderNewLines(c.text)}<!-- HTML_TAG_END --> ${(0, import_index_fb0a7752.v)(External_link, "ExternalLink").$$render($$result, {}, {}, {})}</a>` : ``}
          ${b.markDefs.find((m) => m._key === c.marks[0])._type === "person" ? `${(0, import_index_fb0a7752.v)(Person_link, "PersonLink").$$render($$result, {
      overrideText: c.text,
      personId: b.markDefs.find((m) => m._key === c.marks[0]).link._ref
    }, {}, {})}` : ``}`}`}`}`;
  })}</p>`}`}` : ``}`;
});
var image_svelte_svelte_type_style_lang = "";
const css$e = {
  code: "figure.svelte-1bbn2f1.svelte-1bbn2f1{margin-left:20px;margin-right:20px;float:left;border:1px solid #221f20;float:left;max-width:50%}figure.right.svelte-1bbn2f1.svelte-1bbn2f1{float:right;max-width:50%}figure.full.svelte-1bbn2f1.svelte-1bbn2f1{float:unset;margin-left:0;margin-right:0;margin-top:0;border:unset;max-width:unset;width:100%}figure.full.svelte-1bbn2f1 img.svelte-1bbn2f1{display:block;margin-left:auto;margin-right:auto}figure.full.svelte-1bbn2f1 figcaption.svelte-1bbn2f1{padding:20px;border-top:1px solid #221f20;border-bottom:1px solid #221f20}figure.cover.svelte-1bbn2f1.svelte-1bbn2f1{float:unset}figure.cover.svelte-1bbn2f1 img.svelte-1bbn2f1{width:100%;height:600px;object-fit:cover;object-position:center}@media(max-width: 800px){figure.cover.svelte-1bbn2f1 img.svelte-1bbn2f1{height:300px}}figure.cover.svelte-1bbn2f1 figcaption.svelte-1bbn2f1{padding:20px;border-top:1px solid #221f20;border-bottom:1px solid #221f20}@media(max-width: 800px){figure.cover.svelte-1bbn2f1 figcaption.svelte-1bbn2f1{padding-left:0;padding-right:0}}.article figcaption p{margin-bottom:0;margin-left:0;margin-right:0}",
  map: null
};
const Image = (0, import_index_fb0a7752.c)(($$result, $$props, $$bindings, slots) => {
  let { b = {} } = $$props;
  if ($$props.b === void 0 && $$bindings.b && b !== void 0)
    $$bindings.b(b);
  $$result.css.add(css$e);
  return `<figure class="${[
    "svelte-1bbn2f1",
    (b.layout == "left" ? "left" : "") + " " + (b.layout == "right" ? "right" : "") + " " + (b.fullWidth ? "full" : "") + " " + (b.coverAndCrop ? "cover" : "")
  ].join(" ").trim()}"><img${(0, import_index_fb0a7752.f)("src", urlFor(b.asset).quality(90).width(1e3).url(), 0)}${(0, import_index_fb0a7752.f)("alt", b.alt ? b.alt : "", 0)} class="${"svelte-1bbn2f1"}">
  ${(0, import_has.default)(b, "caption.content") ? `<figcaption class="${"svelte-1bbn2f1"}">${(0, import_index_fb0a7752.v)(Blocks, "Blocks").$$render($$result, { blocks: b.caption.content }, {}, {})}</figcaption>` : ``}
</figure>`;
});
var imageFromMainSite_svelte_svelte_type_style_lang = "";
const css$d = {
  code: "figure.svelte-1bbn2f1.svelte-1bbn2f1{margin-left:20px;margin-right:20px;float:left;border:1px solid #221f20;float:left;max-width:50%}figure.right.svelte-1bbn2f1.svelte-1bbn2f1{float:right;max-width:50%}figure.full.svelte-1bbn2f1.svelte-1bbn2f1{float:unset;margin-left:0;margin-right:0;margin-top:0;border:unset;max-width:unset;width:100%}figure.full.svelte-1bbn2f1 img.svelte-1bbn2f1{display:block;margin-left:auto;margin-right:auto}figure.full.svelte-1bbn2f1 figcaption.svelte-1bbn2f1{padding:20px;border-top:1px solid #221f20;border-bottom:1px solid #221f20}figure.cover.svelte-1bbn2f1.svelte-1bbn2f1{float:unset}figure.cover.svelte-1bbn2f1 img.svelte-1bbn2f1{width:100%;height:600px;object-fit:cover;object-position:center}@media(max-width: 800px){figure.cover.svelte-1bbn2f1 img.svelte-1bbn2f1{height:300px}}figure.cover.svelte-1bbn2f1 figcaption.svelte-1bbn2f1{padding:20px;border-top:1px solid #221f20;border-bottom:1px solid #221f20}@media(max-width: 800px){figure.cover.svelte-1bbn2f1 figcaption.svelte-1bbn2f1{padding-left:0;padding-right:0}}.article figcaption p{margin-bottom:0;margin-left:0;margin-right:0}",
  map: null
};
const ImageFromMainSite = (0, import_index_fb0a7752.c)(($$result, $$props, $$bindings, slots) => {
  let { b = {} } = $$props;
  if ($$props.b === void 0 && $$bindings.b && b !== void 0)
    $$bindings.b(b);
  $$result.css.add(css$d);
  return `<figure class="${[
    "svelte-1bbn2f1",
    (b.layout == "left" ? "left" : "") + " " + (b.layout == "right" ? "right" : "") + " " + (b.fullWidth ? "full" : "") + " " + (b.coverAndCrop ? "cover" : "")
  ].join(" ").trim()}"><img${(0, import_index_fb0a7752.f)("src", urlForMainSite(b.asset).quality(90).width(1e3).url(), 0)}${(0, import_index_fb0a7752.f)("alt", b.alt ? b.alt : "", 0)} class="${"svelte-1bbn2f1"}">
  ${(0, import_has.default)(b, "caption.content") ? `<figcaption class="${"svelte-1bbn2f1"}">${(0, import_index_fb0a7752.v)(Blocks, "Blocks").$$render($$result, { blocks: b.caption.content }, {}, {})}</figcaption>` : ``}
</figure>`;
});
var invertedBlock_svelte_svelte_type_style_lang = "";
const css$c = {
  code: ".inverted-block.svelte-g37r8{width:100%;background:#221f20;padding:40px;color:#f5f4ee}",
  map: null
};
const InvertedBlock = (0, import_index_fb0a7752.c)(($$result, $$props, $$bindings, slots) => {
  let { b = {} } = $$props;
  if ($$props.b === void 0 && $$bindings.b && b !== void 0)
    $$bindings.b(b);
  $$result.css.add(css$c);
  return `<div class="${"inverted-block svelte-g37r8"}">${(0, import_index_fb0a7752.v)(Text, "Text").$$render($$result, { b }, {}, {})}
</div>`;
});
var blockBeam_svelte_svelte_type_style_lang = "";
const css$b = {
  code: "svg.svelte-12vsv5 path.svelte-12vsv5{fill:none;stroke:#221f20;stroke-width:2.5px;stroke-miterlimit:10}",
  map: null
};
const Block_beam = (0, import_index_fb0a7752.c)(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$b);
  return `<svg version="${"1.1"}" id="${"Layer_1"}" xmlns="${"http://www.w3.org/2000/svg"}" xmlns:xlink="${"http://www.w3.org/1999/xlink"}" x="${"0px"}" y="${"0px"}" viewBox="${"0 0 326.4 167.6"}" style="${"enable-background:new 0 0 326.4 167.6;"}" xml:space="${"preserve"}" class="${"svelte-12vsv5"}"><path class="${"st0 svelte-12vsv5"}" d="${"M323.1,136.7l-121.6,21.4 M316.2,109.3l-116,42.2 M304.3,83.3l-106.9,61.6 M287.8,60.7L193.2,140 M269.1,41\n		l-79.3,94.4 M245.5,24.3L183.8,131 M219.2,12L177,127.9 M192.5,4.4l-21.4,121.4 M325,165.7H201.5 M2.4,136.7l121.6,21.4 M9.3,109.3\n		l116,42.2 M21.2,83.3l106.9,61.6 M37.7,60.7l94.6,79.2 M56.4,41l79.3,94.4 M80,24.3L141.7,131 M106.3,12l42.2,115.8 M133,4.4\n		l21.4,121.4 M161.9,1.8l0,123.3 M0.5,165.7H124"}"></path></svg>`;
});
var logoBlock_svelte_svelte_type_style_lang = "";
const css$a = {
  code: ".logo-block.svelte-1y9hgkm.svelte-1y9hgkm{margin-left:20px;margin-right:20px;margin-bottom:20px;width:calc(100% - 40px);border-bottom:1px solid #221f20;font-size:16px}.logo-block.svelte-1y9hgkm .top-row.svelte-1y9hgkm{display:flex}.logo-block.svelte-1y9hgkm .top-row .beam.svelte-1y9hgkm{width:160px;position:relative;top:0;left:1px;padding:0;line-height:0;display:inline-block}.logo-block.svelte-1y9hgkm .top-row .line.svelte-1y9hgkm{border-bottom:1px solid #221f20;width:100%}.logo-block.svelte-1y9hgkm .logoblock-text.svelte-1y9hgkm{padding-top:40px;padding-bottom:40px}.article .logoblock-text p{padding-left:0;padding-right:0;margin-top:0;margin-bottom:0}",
  map: null
};
const LogoBlock = (0, import_index_fb0a7752.c)(($$result, $$props, $$bindings, slots) => {
  let { b = {} } = $$props;
  if ($$props.b === void 0 && $$bindings.b && b !== void 0)
    $$bindings.b(b);
  $$result.css.add(css$a);
  return `<div class="${"logo-block svelte-1y9hgkm"}"><div class="${"top-row svelte-1y9hgkm"}"><div class="${"beam svelte-1y9hgkm"}">${(0, import_index_fb0a7752.v)(Block_beam, "BlockBeam").$$render($$result, {}, {}, {})}</div>
    <div class="${"line svelte-1y9hgkm"}"></div></div>
  <div class="${"logoblock-text svelte-1y9hgkm"}">${(0, import_index_fb0a7752.v)(Text, "Text").$$render($$result, { b }, {}, {})}</div>
</div>`;
});
var embed_svelte_svelte_type_style_lang = "";
const css$9 = {
  code: ".embed.svelte-23luwt.svelte-23luwt{color:#f5f4ee;margin-bottom:20px;cursor:pointer;display:flex;justify-content:center;align-items:center;padding-bottom:20px;padding-top:20px;width:100%}.embed.svelte-23luwt .inner.svelte-23luwt{width:720px}@media(max-width: 800px){.embed.svelte-23luwt .inner.svelte-23luwt{width:480px}}.embed.svelte-23luwt .inner iframe.svelte-23luwt{width:100%}.embed.full .inner.svelte-23luwt iframe.svelte-23luwt{height:100vh}",
  map: null
};
const Embed = (0, import_index_fb0a7752.c)(($$result, $$props, $$bindings, slots) => {
  let { b = {} } = $$props;
  if ($$props.b === void 0 && $$bindings.b && b !== void 0)
    $$bindings.b(b);
  $$result.css.add(css$9);
  return `<div class="${"embed svelte-23luwt"}"><div class="${"inner svelte-23luwt"}">${b.url.includes("youtube") ? `<iframe width="${"720"}" height="${"480"}" src="${"https://www.youtube.com/embed/" + (0, import_index_fb0a7752.e)((0, import_get_video_id.default)(b.url).id)}" frameborder="${"0"}" allow="${"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"}" allowfullscreen class="${"svelte-23luwt"}"></iframe>` : ``}
    ${b.url.includes("vimeo") ? `<iframe width="${"720"}" height="${"480"}" src="${"https://player.vimeo.com/video/" + (0, import_index_fb0a7752.e)((0, import_get_video_id.default)(b.url).id)}" frameborder="${"0"}" byline="${"false"}" color="${"#ffffff"}" allow="${"autoplay; fullscreen"}" allowfullscreen class="${"svelte-23luwt"}"></iframe>` : ``}</div></div>

${(0, import_has.default)(b, "caption.content") ? `<figcaption>${(0, import_index_fb0a7752.v)(Blocks, "Blocks").$$render($$result, { blocks: b.caption.content }, {}, {})}</figcaption>` : ``}`;
});
var divider_svelte_svelte_type_style_lang = "";
const css$8 = {
  code: ".divider.svelte-ibl5lr{margin-top:20px;margin-bottom:20px;height:1px;border-top:1px solid #221f20;width:100%}",
  map: null
};
const Divider = (0, import_index_fb0a7752.c)(($$result, $$props, $$bindings, slots) => {
  let { b = {} } = $$props;
  if ($$props.b === void 0 && $$bindings.b && b !== void 0)
    $$bindings.b(b);
  $$result.css.add(css$8);
  return `<div class="${"divider svelte-ibl5lr"}"></div>`;
});
var columns_svelte_svelte_type_style_lang = "";
const css$7 = {
  code: ".columns.svelte-1yggcq h2.svelte-1yggcq{padding-top:20px;padding-bottom:20px}.columns.svelte-1yggcq .inner.svelte-1yggcq{width:100%;column-count:2;column-fill:balance;column-width:50%}",
  map: null
};
const Columns = (0, import_index_fb0a7752.c)(($$result, $$props, $$bindings, slots) => {
  let { b = {} } = $$props;
  if ($$props.b === void 0 && $$bindings.b && b !== void 0)
    $$bindings.b(b);
  $$result.css.add(css$7);
  return `<div class="${"columns svelte-1yggcq"}">${b.title ? `<h2${(0, import_index_fb0a7752.f)("id", (0, import_slugify.default)(b.title, { lower: true }), 0)} class="${"svelte-1yggcq"}">${(0, import_index_fb0a7752.e)(b.title)}</h2>` : ``}
  ${(0, import_has.default)(b, "columnContent.content") ? `<div class="${"inner svelte-1yggcq"}">${(0, import_index_fb0a7752.v)(Blocks, "Blocks").$$render($$result, { blocks: b.columnContent.content }, {}, {})}</div>` : ``}
</div>`;
});
var donationWidget_svelte_svelte_type_style_lang = "";
const css$6 = {
  code: ".donation-widget.svelte-g1dluc{margin-top:20px;height:600px;background:red;width:100%}.gl-widget__frequency-selection-container{height:200px;background:yellow}.gl-widget__input-group{height:200px;background:green}.gl-widget__payment{height:200px;background:blue}.gl-widget__frequency-buttons{height:100% !important}",
  map: null
};
const DonationWidget = (0, import_index_fb0a7752.c)(($$result, $$props, $$bindings, slots) => {
  let { b = {} } = $$props;
  if ($$props.b === void 0 && $$bindings.b && b !== void 0)
    $$bindings.b(b);
  $$result.css.add(css$6);
  return `${$$result.head += `<script src="${"https://secure.givelively.org/widgets/simple_donation/the-eyebeam-atelier-inc/donate-to-eyebeam.js?show_suggested_amount_buttons=false&show_in_honor_of=false&address_required=false&has_required_custom_question=false"}" data-svelte="svelte-1cxe6br"><\/script>`, ""}

<div class="${"donation-widget svelte-g1dluc"}">
  <div id="${"give-lively-widget"}" class="${"gl-simple-donation-widget"}"></div>
</div>`;
});
var applicationButton_svelte_svelte_type_style_lang = "";
const css$5 = {
  code: ".application-button-small.svelte-1dlavbd.svelte-1dlavbd{margin-top:0;margin-bottom:40px;display:inline-block;width:100%}.application-button-small.svelte-1dlavbd .application-button-inner.svelte-1dlavbd{margin:20px;display:inline-block}.application-button-small.svelte-1dlavbd .application-button-inner .button.svelte-1dlavbd{background:#dedcd5;padding:15px;display:flex;align-items:center;text-decoration:none}.application-button-small.svelte-1dlavbd .application-button-inner .button .circle.svelte-1dlavbd{width:20px;height:20px;border-radius:50%;background:#221f20}.application-button-small.svelte-1dlavbd .application-button-inner .button .applications-text.svelte-1dlavbd{margin-left:10px;font-size:14px}.application-button-small.svelte-1dlavbd .application-button-inner .button.svelte-1dlavbd:hover{background:#221f20;color:#dedcd5}.application-button-small.svelte-1dlavbd .application-button-inner .button:hover .circle.svelte-1dlavbd{background:#dedcd5}.application-button-small.svelte-1dlavbd .application-button-inner .date.svelte-1dlavbd{margin-top:8px;font-style:italic}.application-button-large.svelte-1dlavbd.svelte-1dlavbd{width:100%;background:#221f20;color:#f5f4ee;height:220px;padding:20px;display:flex}@media(max-width: 800px){.application-button-large.svelte-1dlavbd.svelte-1dlavbd{flex-wrap:wrap}}.application-button-large.svelte-1dlavbd .column.svelte-1dlavbd{height:100%}@media(max-width: 800px){.application-button-large.svelte-1dlavbd .column.svelte-1dlavbd{height:auto}}.application-button-large.svelte-1dlavbd .column.first.svelte-1dlavbd{width:80%;display:flex;flex-direction:column;justify-content:space-between}@media(max-width: 800px){.application-button-large.svelte-1dlavbd .column.first.svelte-1dlavbd{width:100%}}.application-button-large.svelte-1dlavbd .column.second.svelte-1dlavbd{width:220px}@media(max-width: 800px){.application-button-large.svelte-1dlavbd .column.second.svelte-1dlavbd{width:100%}}.application-button-large.svelte-1dlavbd .top.svelte-1dlavbd{display:flex;font-size:14px}.application-button-large.svelte-1dlavbd .top .col.second.svelte-1dlavbd{margin-left:10px}.application-button-large.svelte-1dlavbd .circle.svelte-1dlavbd{width:20px;height:20px;background:#f5f4ee;border-radius:50%;float:left;margin-top:2px}.application-button-large.svelte-1dlavbd .headline.svelte-1dlavbd{font-size:12px;letter-spacing:1px}.application-button-large.svelte-1dlavbd .date.svelte-1dlavbd{font-style:italic}.application-button-large.svelte-1dlavbd .text.svelte-1dlavbd{padding-right:40px;font-size:16px}@media(max-width: 800px){.application-button-large.svelte-1dlavbd .text.svelte-1dlavbd{display:none}}.application-button-large.svelte-1dlavbd .apply-now.svelte-1dlavbd{border:1px solid #f5f4ee;height:100%;display:flex;justify-content:center;align-items:center;cursor:pointer;user-select:none;color:#f5f4ee;text-decoration:none;font-size:16px}.application-button-large.svelte-1dlavbd .apply-now.svelte-1dlavbd:hover{background:#f5f4ee;color:#221f20}.article .application-button-large .text p{margin-bottom:0;margin-left:0;margin-right:0}",
  map: null
};
const ApplicationButton = (0, import_index_fb0a7752.c)(($$result, $$props, $$bindings, slots) => {
  let { b = {} } = $$props;
  if ($$props.b === void 0 && $$bindings.b && b !== void 0)
    $$bindings.b(b);
  $$result.css.add(css$5);
  return `${b.size == "large" ? `
  <div class="${"application-button-large svelte-1dlavbd"}"><div class="${"column first svelte-1dlavbd"}">
      <div class="${"top svelte-1dlavbd"}"><div class="${"col first"}"><div class="${"circle svelte-1dlavbd"}"></div></div>
        <div class="${"col second svelte-1dlavbd"}"><div class="${"headline svelte-1dlavbd"}">APPLICATIONS ARE OPEN</div>
          ${b.applicationEndDate ? `<div class="${"date svelte-1dlavbd"}">Due by ${(0, import_index_fb0a7752.e)(longFormatDate(b.applicationEndDate))}</div>` : ``}</div></div>

      
      ${(0, import_has.default)(b, "longText.content") ? `<div class="${"text svelte-1dlavbd"}">${(0, import_index_fb0a7752.v)(Blocks, "Blocks").$$render($$result, { blocks: b.longText.content }, {}, {})}</div>` : ``}</div>

    <div class="${"column second svelte-1dlavbd"}">
      <a${(0, import_index_fb0a7752.f)("href", b.url, 0)} target="${"_blank"}" class="${"apply-now svelte-1dlavbd"}">${(0, import_index_fb0a7752.e)(b.shortText)}</a></div></div>` : `
  <div class="${"application-button-small svelte-1dlavbd"}"><div class="${"application-button-inner svelte-1dlavbd"}"><a${(0, import_index_fb0a7752.f)("href", b.url, 0)} target="${"_blank"}" class="${"button svelte-1dlavbd"}">${b.applicationEndDate ? `<div class="${"circle svelte-1dlavbd"}"></div>` : ``}
        <div class="${"applications-text svelte-1dlavbd"}"><div class="${"short-text"}">${(0, import_index_fb0a7752.e)(b.shortText)}</div>
          ${b.applicationEndDate ? `<div class="${"date svelte-1dlavbd"}">Applications Due by ${(0, import_index_fb0a7752.e)(longFormatDate(b.applicationEndDate))}</div>` : ``}</div></a></div></div>`}`;
});
var arrowDown_svelte_svelte_type_style_lang = "";
var arrowLeft_svelte_svelte_type_style_lang = "";
const css$4 = {
  code: "svg.svelte-bl0yym path.svelte-bl0yym{fill:#221f20}",
  map: null
};
const Arrow_left = (0, import_index_fb0a7752.c)(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$4);
  return `<svg width="${"8"}" height="${"10"}" viewBox="${"0 0 8 10"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}" class="${"svelte-bl0yym"}"><path d="${"M-0.000488072 5.06677L7.17615 9.45473L7.17615 0.678818L-0.000488072 5.06677Z"}" class="${"svelte-bl0yym"}"></path></svg>`;
});
var qa_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: ".qa.svelte-nx2f1v.svelte-nx2f1v{width:100%;display:inline-block}.qa.svelte-nx2f1v .question.svelte-nx2f1v{width:100%;display:flex;justify-content:space-between;border-bottom:1px solid #221f20;cursor:pointer}.qa.svelte-nx2f1v .question .text.svelte-nx2f1v{font-style:italic;user-select:none;padding-top:10px;padding-bottom:10px;font-size:14px}.qa.svelte-nx2f1v .question .icon.svelte-nx2f1v{position:relative;top:6px}.qa.svelte-nx2f1v .answer.svelte-nx2f1v{border-bottom:1px solid #221f20}",
  map: null
};
const Qa = (0, import_index_fb0a7752.c)(($$result, $$props, $$bindings, slots) => {
  let { item = {} } = $$props;
  if ($$props.item === void 0 && $$bindings.item && item !== void 0)
    $$bindings.item(item);
  $$result.css.add(css$3);
  return `<div class="${"qa svelte-nx2f1v"}"><div class="${"question svelte-nx2f1v"}"><div class="${"text svelte-nx2f1v"}">${(0, import_index_fb0a7752.e)(item.question)}</div>
    <div class="${"icon svelte-nx2f1v"}">${`${(0, import_index_fb0a7752.v)(Arrow_left, "ArrowLeft").$$render($$result, {}, {}, {})}`}</div></div>
  ${``}
</div>`;
});
var faq_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: ".faq.svelte-1lh5ive.svelte-1lh5ive{display:inline-block;width:100%;padding:20px;margin-bottom:40px}.faq.svelte-1lh5ive h2.svelte-1lh5ive{margin-left:0;margin-right:0}@media(max-width: 800px){.faq.svelte-1lh5ive.svelte-1lh5ive{padding-left:0;padding-right:0}}.faq.svelte-1lh5ive .faq-inner.svelte-1lh5ive{margin-top:1em}",
  map: null
};
const Faq = (0, import_index_fb0a7752.c)(($$result, $$props, $$bindings, slots) => {
  let { b = {} } = $$props;
  if ($$props.b === void 0 && $$bindings.b && b !== void 0)
    $$bindings.b(b);
  $$result.css.add(css$2);
  return `<div class="${"faq svelte-1lh5ive"}"><h2${(0, import_index_fb0a7752.f)("id", (0, import_slugify.default)(b.title, { lower: true }), 0)} class="${"svelte-1lh5ive"}">${(0, import_index_fb0a7752.e)(b.title)}</h2>
  <div class="${"faq-inner svelte-1lh5ive"}">${(0, import_index_fb0a7752.b)(b.questionAnswer, (item) => {
    return `${(0, import_index_fb0a7752.v)(Qa, "QA").$$render($$result, { item }, {}, {})}`;
  })}</div>
</div>`;
});
var playArrow_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "svg.svelte-bl0yym path.svelte-bl0yym{fill:#221f20}",
  map: null
};
const Play_arrow = (0, import_index_fb0a7752.c)(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `<svg width="${"21"}" height="${"35"}" viewBox="${"0 0 21 35"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}" class="${"svelte-bl0yym"}"><path d="${"M0.123047 34.0552V0L20.5614 17.0276L0.123047 34.0552Z"}" class="${"svelte-bl0yym"}"></path></svg>`;
});
var video_svelte_svelte_type_style_lang = "";
const css = {
  code: ".video-block.svelte-139dsg8.svelte-139dsg8{text-decoration:none;width:100%;position:relative;display:block;height:400px;margin-bottom:20px}.video-block.svelte-139dsg8 img.svelte-139dsg8{display:block;width:100%;height:100%;position:absolute;top:0;left:0}.video-block.svelte-139dsg8 .title.svelte-139dsg8{display:block;position:absolute;top:10px;left:80px;z-index:10;color:#f5f4ee;font-size:32px;line-height:1.2em}.video-block.svelte-139dsg8 .icon.svelte-139dsg8{position:absolute;top:10px;left:10px;z-index:100;width:70px;height:70px;border-radius:50%;background:#f5f4ee;color:#f5f4ee;line-height:1.2em;display:flex;justify-content:center;align-items:center}",
  map: null
};
const Video = (0, import_index_fb0a7752.c)(($$result, $$props, $$bindings, slots) => {
  let { b = {} } = $$props;
  const videoPost = loadData("*[_id == $id][0]", { id: b.videoPost._ref });
  if ($$props.b === void 0 && $$bindings.b && b !== void 0)
    $$bindings.b(b);
  $$result.css.add(css);
  return `${function(__value) {
    if ((0, import_index_fb0a7752.i)(__value)) {
      __value.then(null, import_index_fb0a7752.n);
      return ``;
    }
    return function(videoPost2) {
      return `
  <a${(0, import_index_fb0a7752.f)("href", "/videos/" + (0, import_get.default)(videoPost2, "slug.current"), 0)} class="${"video-block svelte-139dsg8"}">
    ${videoPost2.mainImage ? `<img class="${"main-image svelte-139dsg8"}"${(0, import_index_fb0a7752.f)("alt", videoPost2.title, 0)}${(0, import_index_fb0a7752.f)("src", urlFor(videoPost2.mainImage).quality(90).width(400).url(), 0)}>` : ``}
    <div class="${"icon svelte-139dsg8"}">${(0, import_index_fb0a7752.v)(Play_arrow, "PlayArrow").$$render($$result, {}, {}, {})}</div>
    <div class="${"title svelte-139dsg8"}">${(0, import_index_fb0a7752.e)(videoPost2.title)}</div></a>
`;
    }(__value);
  }(videoPost)}`;
});
const Blocks = (0, import_index_fb0a7752.c)(($$result, $$props, $$bindings, slots) => {
  let { blocks = [] } = $$props;
  let { mainSite = false } = $$props;
  if ($$props.blocks === void 0 && $$bindings.blocks && blocks !== void 0)
    $$bindings.blocks(blocks);
  if ($$props.mainSite === void 0 && $$bindings.mainSite && mainSite !== void 0)
    $$bindings.mainSite(mainSite);
  return `${(0, import_index_fb0a7752.b)(blocks, (b) => {
    return `${b._type == "block" ? `${b.style == "logoBlock" ? `${(0, import_index_fb0a7752.v)(LogoBlock, "LogoBlock").$$render($$result, { b }, {}, {})}` : `${b.style == "invertedBlock" ? `${(0, import_index_fb0a7752.v)(InvertedBlock, "InvertedBlock").$$render($$result, { b }, {}, {})}` : `${(0, import_index_fb0a7752.v)(Text, "Text").$$render($$result, { b }, {}, {})}`}`}` : ``}
  ${b._type == "image" ? `${mainSite ? `${(0, import_index_fb0a7752.v)(ImageFromMainSite, "ImageFromMainSite").$$render($$result, { b }, {}, {})}` : `${(0, import_index_fb0a7752.v)(Image, "Image").$$render($$result, { b }, {}, {})}`}` : ``}
  ${b._type == "embedBlock" ? `${(0, import_index_fb0a7752.v)(Embed, "Embed").$$render($$result, { b }, {}, {})}` : ``}
  ${b._type == "dividerBlock" ? `${(0, import_index_fb0a7752.v)(Divider, "Divider").$$render($$result, { b }, {}, {})}` : ``}
  ${b._type == "columnsBlock" ? `${(0, import_index_fb0a7752.v)(Columns, "Columns").$$render($$result, { b }, {}, {})}` : ``}
  ${b._type == "donationWidget" ? `${(0, import_index_fb0a7752.v)(DonationWidget, "DonationWidget").$$render($$result, { b }, {}, {})}` : ``}
  ${b._type == "applicationButton" ? `${(0, import_index_fb0a7752.v)(ApplicationButton, "ApplicationButton").$$render($$result, { b }, {}, {})}` : ``}
  ${b._type == "faq" ? `${(0, import_index_fb0a7752.v)(Faq, "Faq").$$render($$result, { b }, {}, {})}` : ``}
  ${b._type == "videoBlock" ? `${(0, import_index_fb0a7752.v)(Video, "Video").$$render($$result, { b }, {}, {})}` : ``}`;
  })}`;
});
const isAuthenticated = writable(false);
const profile = writable(false);
const globalSettings = writable({});
let worldObject = writable({});
const GRID_SIZE = 32;
loadData('*[_id == "global-settings"]').then((gS) => {
  globalSettings.set(gS);
}).catch((err) => {
  console.log(err);
});
const streams = writable([]);
const localPlayer = writable({
  uuid: "",
  sessionId: "",
  name: "",
  profile: {}
});
const players = writable({});
const chatMessages = writable([]);
let leaveArticle = {};
const roomIntent = writable(false);
const objectIntent = writable(false);
const activeZone = writable(false);
const currentRoom = writable(false);
const checkPortalOverlap = () => {
  if ((0, import_index_fb0a7752.g)(currentRoom).portals && Array.isArray((0, import_index_fb0a7752.g)(currentRoom).portals)) {
    let overlapIndex = false;
    (0, import_index_fb0a7752.g)(currentRoom).portals.forEach((p) => {
      if ((0, import_index_fb0a7752.g)(players)[(0, import_index_fb0a7752.g)(localPlayer).uuid].x === p.x && (0, import_index_fb0a7752.g)(players)[(0, import_index_fb0a7752.g)(localPlayer).uuid].y === p.y) {
        overlapIndex = p.targetArea._id;
      }
    });
    if (overlapIndex) {
      roomIntent.set(overlapIndex);
    } else {
      roomIntent.set(false);
    }
  }
};
const checkObjectOverlap = () => {
  if ((0, import_index_fb0a7752.g)(currentRoom).objects && Array.isArray((0, import_index_fb0a7752.g)(currentRoom).objects)) {
    let overlapIndex = false;
    (0, import_index_fb0a7752.g)(currentRoom).objects.forEach((o) => {
      if ((0, import_inRange.default)((0, import_index_fb0a7752.g)(players)[(0, import_index_fb0a7752.g)(localPlayer).uuid].x, o.x, o.x + o.dimensions.width) && (0, import_inRange.default)((0, import_index_fb0a7752.g)(players)[(0, import_index_fb0a7752.g)(localPlayer).uuid].y, o.y, o.y + o.dimensions.height)) {
        overlapIndex = o._id;
      }
    });
    if (overlapIndex) {
      console.log("OBJECT =>", overlapIndex);
      objectIntent.set(overlapIndex);
    } else {
      objectIntent.set(false);
    }
  }
};
const checkZoneOverlap = () => {
  let overlapIndex = false;
  (0, import_index_fb0a7752.g)(currentRoom).zones.forEach((z) => {
    if ((0, import_inRange.default)((0, import_index_fb0a7752.g)(players)[(0, import_index_fb0a7752.g)(localPlayer).uuid].x, z.x, z.x + z.dimensions.width) && (0, import_inRange.default)((0, import_index_fb0a7752.g)(players)[(0, import_index_fb0a7752.g)(localPlayer).uuid].y, z.y, z.y + z.dimensions.height)) {
      overlapIndex = z;
    }
  });
  if (overlapIndex) {
    activeZone.set(overlapIndex);
  } else {
    activeZone.set(false);
  }
};
