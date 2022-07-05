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
  post: () => post
});
module.exports = __toCommonJS(stdin_exports);
var import_client = __toESM(require("@sanity/client"));
var import_lodash = require("lodash");
var import_slugify = __toESM(require("slugify"));
const sanityClient = (0, import_client.default)({
  projectId: "58ueii0w",
  apiVersion: "2021-10-05",
  dataset: "production",
  token: "sks0FKkhw72LZL4KXRP8I6",
  useCdn: false
});
const post = async (event) => {
  const authObject = await event.request.json();
  console.log("authObject", authObject);
  const currentDoc = await sanityClient.fetch("*[_type == 'user' && _id == $userId][0]", { userId: authObject.id });
  console.log("currentDoc", currentDoc);
  const doc = {
    _type: "user",
    _id: authObject.id,
    name: authObject.username.split("#")[0],
    discordName: authObject.username,
    email: authObject.email,
    slug: {
      _type: "slug",
      current: (0, import_slugify.default)(authObject.username, {
        lower: true
      })
    }
  };
  if (currentDoc.avatar) {
    doc.avatar = currentDoc.avatar;
  }
  const newDoc = await sanityClient.createOrReplace(doc);
  return {
    body: JSON.stringify(newDoc)
  };
};
