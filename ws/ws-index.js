// ws-index.js
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

let count = 0;

wss.on('connection', (ws) => {
	ws.send(JSON.stringify({ type: 'count', count }));

	ws.on('message', (message) => {
		console.log('Incoming event: ', message.toString());
		if (message.toString() === 'increment') {
			count++;
			wss.clients.forEach((client) => {
				if (client.readyState === WebSocket.OPEN) {
					client.send(JSON.stringify({ type: 'count', count }));
				}
			});
		}

		if (message.toString() === 'reset') {
			count = 0;
			wss.clients.forEach((client) => {
				if (client.readyState === WebSocket.OPEN) {
					client.send(JSON.stringify({ type: 'count', count }));
				}
			});
		}
	});
});
