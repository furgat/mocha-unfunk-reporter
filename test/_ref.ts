///<reference path="../typings/DefinitelyTyped/node/node.d.ts" />
///<reference path="../typings/DefinitelyTyped/chai/chai.d.ts" />
///<reference path="../typings/DefinitelyTyped/mocha/mocha.d.ts" />
//xxxxx/<reference path="../typings/DefinitelyTyped/expect.js/expect.js.d.ts" />

/* due bugs in TypeScript compiler's sourcemap generator this is disabled for now
if (require.resolve('source-map-support')) {
	console.log('auto-detected source-map-support');
	require('source-map-support').install();
}*/

//var expect = require('expect.js');
var expect = require('chai').expect;
