<script lang="ts">
	import { goto } from '$app/navigation'
	import Button from '$lib/elements/button.svelte'
	import Count from '$lib/elements/count.svelte'
	import { count } from '$lib/store/store'
	import { onMount } from 'svelte'

	export let data

	const ws_url = 'ws://localhost:8080'
	let ws: WebSocket

	onMount(() => {
		// ws = new WebSocket(ws_url)
		// ws.onmessage = (event) => {
		// 	const data = JSON.parse(event.data)
		// 	if (data.type === 'count') {
		// 		$count = data.count
		// 	}
		// }
	})

	const incrementCounter = () => {
		ws.send('increment')
	}
	const resetCounter = () => {
		ws.send('reset')
	}
</script>

<svelte:head>
	<title>SvelteKit with Kinde Auth implemented</title>
</svelte:head>

<div class="container mx-auto mt-20 flex flex-col items-center gap-5 justify-center">
	<p class="font-bold text-3xl">
		K<span class="uppercase text-lg">inde</span> A<span class="uppercase text-lg">uth</span>
	</p>
	<p class="text-sm text-gray-400">@kinde-oss/kinde-sveltekit-sdk v1.2.0</p>

	<div class="flex flex-row gap-3 items-center">
		<span
			class="h-5 w-5 rounded-full flex {data.isAuthenticated ? 'bg-green-400' : 'bg-gray-400'}"
		/>
		<p class="font-bold text-3xl">
			A<span class="uppercase text-lg">thenticated:</span>
			<span class="uppercase font-light text-lg">{data.isAuthenticated}</span>
		</p>
	</div>

	<div class="w-60 flex flex-col gap-5 items-center">
		<div class="flex flex-row gap-3 w-full justify-center">
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
			{#if data.isAuthenticated}
				<Button
					classes="w-full !outline-red-500"
					text="Logout"
					onClick={() => goto('/api/auth/logout')}
				/>
			{/if}
		</div>
		<!-- <Count />
		<Button classes="w-full" text="Increament" onClick={() => incrementCounter()} />
		<Button classes="w-full outline-red-300" text="Reset" onClick={() => resetCounter()} /> -->
	</div>
</div>
