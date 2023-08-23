<script lang="ts">
	import Button from '$lib/elements/button.svelte';
	import Count from '$lib/elements/count.svelte';
	import { count } from '$lib/store/store';
	import { onMount } from 'svelte';

	const ws_url = 'ws://localhost:8080';
	let ws: WebSocket;

	onMount(() => {
		ws = new WebSocket(ws_url);
		ws.onmessage = (event) => {
			const data = JSON.parse(event.data);
			if (data.type === 'count') {
				$count = data.count;
			}
		};
	});

	const incrementCounter = () => {
		ws.send('increment');
	};
</script>

<div class="container mx-auto mt-20 flex flex-col items-center gap-5 justify-center">
	<div class="w-60 flex flex-col gap-5">
		<Count />
		<Button text="Click here" onClick={() => incrementCounter()} />
	</div>
</div>
