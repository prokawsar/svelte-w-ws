import { count } from '$lib/store/store';
import { Socket } from 'socket.io';
import { get } from 'svelte/store';

import { Server } from 'socket.io';

const io = new Server({
	/* options */
});

io.on('connection', (socket) => {
	socket.emit('eventFromServer', get(count));
	socket.on('eventFromClient', (value) => {
		console.log('server', value);
	});
});
