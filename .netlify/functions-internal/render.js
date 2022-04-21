const { init } = require('../handler.js');

exports.handler = init({
	appDir: "_app",
	assets: new Set([".DS_Store","images/1.gif","images/favicon.png","images/g2.png","images/grid.png","images/old-g2.png","images/placeholder.png"]),
	mimeTypes: {".gif":"image/gif",".png":"image/png"},
	_: {
		entry: {"file":"start-63935cca.js","js":["start-63935cca.js","chunks/index-a7942797.js","chunks/index-2a8d61f9.js"],"css":[]},
		nodes: [
			() => Promise.resolve().then(() => require('../server/nodes/0.js')),
			() => Promise.resolve().then(() => require('../server/nodes/1.js')),
			() => Promise.resolve().then(() => require('../server/nodes/2.js'))
		],
		routes: [
			{
				type: 'page',
				id: "",
				pattern: /^\/$/,
				names: [],
				types: [],
				path: "/",
				shadow: null,
				a: [0,2],
				b: [1]
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
});
