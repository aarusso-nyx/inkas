// 'use strict';
// const _       = require('lodash');
// const WebSocket = require('ws');

// // Get cmdline parameters
// const id = process.argv[2] || '0';
// const url = process.argv[3] || 'wss://localhost:5000/';

// // instantiate ws server 
// const ws = new WebSocket(`${url}?id=${id}`);
// ws.on('open', () => { 
//     console.log(`[${id}] Connected to ${url}`);
// });

// ///////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////
// ws.on('message', (data) => { 
//     console.log(`[${id}] Message: `, JSON.parse(data) );
// });


// ///////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////
// module.exports = (prop) => {
//     return async (out) => {
//         const id = _.pick(out,prop);
//         console.log('Advertising: ', { id });
//         ws.send(JSON.stringify(id));
//         return out;
//     }
// }