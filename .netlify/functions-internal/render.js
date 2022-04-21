const { init } = require('../handler.js');

exports.handler = init({
	appDir: "_app",
	assets: new Set([".DS_Store","images/1.gif","images/favicon.png","images/g2.png","images/grid.png","images/old-g2.png","images/placeholder.png"]),
	mimeTypes: {".gif":"image/gif",".png":"image/png"},
	_: {
		entry: {"file":"start-24603306.js","js":["start-24603306.js","chunks/index-4e3d32d0.js","chunks/index-954e9f97.js"],"css":[]},
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
