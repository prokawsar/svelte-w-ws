<script>
	import Button from '$lib/elements/button.svelte';
	import Count from '$lib/elements/count.svelte';
	import { count } from '$lib/store/store';

	const increaseCounter = () => {
		$count++;

		socket.emit('eventFromClient', $count);
	};

	import { io } from 'socket.io-client';

	const socket = io();

	socket.on('eventFromServer', (message) => {
		console.log(message);
	});

	$: {
		// send message to server
		socket.emit('eventFromClient', $count);
	}
</script>

<div class="container mx-auto mt-20 flex flex-col items-center gap-5 justify-center">
	<div class="w-60 flex flex-col gap-5">
		<Count />
		<Button text="Click here" onClick={() => increaseCounter()} />
	</div>
</div>
