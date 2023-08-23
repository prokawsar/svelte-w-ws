// ws-index.js
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

let count = 0;

wss.on('connection', (ws) => {
	ws.send(JSON.stringify({ type: 'count', count }));

	ws.on('message', (message) => {
		if (message.toString() === 'increment') {
			count++;
			wss.clients.forEach((client) => {
				if (client.readyState === WebSocket.OPEN) {
					client.send(JSON.stringify({ type: 'count', count }));
				}
			});
		}
	});
});
