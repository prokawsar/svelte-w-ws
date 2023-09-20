<script lang="ts">
	import { goto } from '$app/navigation';
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
	const resetCounter = () => {
		ws.send('reset');
	};
</script>

<svelte:head>
	<title>Svelte with Web Socket implemented</title>
</svelte:head>

<div class="container mx-auto mt-20 flex flex-col items-center gap-5 justify-center">
	<p class="font-bold text-3xl">Kinde Auth</p>
	<p class="text-sm text-gray-400">@kinde-oss/kinde-sveltekit-sdk v1.2.0</p>
	<div class="w-60 flex flex-col gap-5 items-center">
		<div class="flex flex-row gap-3 w-full">
			<Button
				classes="w-full !outline-violet-600"
				text="Login"
				onClick={() => goto('/api/auth/login')}
			/>
			<Button
				classes="w-full !outline-green-500"
				text="Register"
				onClick={() => goto('/api/auth/register')}
			/>
		</div>
		<!-- <Count />
		<Button classes="w-full" text="Increament" onClick={() => incrementCounter()} />
		<Button classes="w-full outline-red-300" text="Reset" onClick={() => resetCounter()} /> -->
	</div>
</div>
