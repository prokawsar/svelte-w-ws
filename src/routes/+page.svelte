<script lang="ts">
	import { browser } from '$app/environment'
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

	// const loginWithOrgCode = async (org_code: string) => {
	// 	await kb.login({
	// 		org_code
	// 	})
	// }
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

	<div class="flex flex-col gap-5 items-center w-2/4">
		<div class="flex flex-row gap-3 w-full justify-center">
			{#if data.isAuthenticated}
				<Button
					classes="w-full !outline-green-500"
					text="Reg \w Create Org"
					onClick={() => goto('/api/auth/create_org?org_name="Create Test Org"')}
				/>
				<Button
					classes="w-full !outline-red-500"
					text="Logout"
					onClick={() => goto('/api/auth/logout')}
				/>
			{:else}
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
			{/if}
		</div>

		<div class="flex flex-row gap-3 w-full justify-center">
			<Button
				classes="w-full !outline-green-600"
				text="Login \w org"
				onClick={() => goto('/api/auth/login?org_code=org_fecc463496f4')}
			/>
			{#if data.isAuthenticated}
				<Button
					classes="w-full !outline-red-500"
					text="Logout \w org"
					onClick={() => goto('/api/auth/logout?org_code=org_fecc463496f4')}
				/>
			{/if}
		</div>
	</div>
	<div class="flex w-full flex-row justify-center">
		<p class="text-xl text-gray-500 uppercase my-5">
			{data.userProfile?.given_name || 'Name'} - {data.userProfile?.email || 'Email'}
		</p>
	</div>
</div>
