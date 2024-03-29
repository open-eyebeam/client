const { init } = require('../serverless.js');

exports.handler = init({
	appDir: "_app",
	assets: new Set(["images/1.gif","images/beam.gif","images/favicon.png","images/g2.png","images/grid.png","images/old-g2.png","images/open_eyebeam.png","images/placeholder.png","silent-check-sso.html"]),
	mimeTypes: {".gif":"image/gif",".png":"image/png",".html":"text/html"},
	_: {
		entry: {"file":"start-3e90201a.js","js":["start-3e90201a.js","chunks/index-bcfaa5f4.js","chunks/index-7ade2ce0.js"],"css":[]},
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
			},
			{
				type: 'endpoint',
				id: "api/update-user",
				pattern: /^\/api\/update-user\/?$/,
				names: [],
				types: [],
				load: () => Promise.resolve().then(() => require('../server/entries/endpoints/api/update-user/index.js'))
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
});
