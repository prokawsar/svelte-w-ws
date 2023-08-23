<script lang="ts">
	export let text = 'Click me',
		onClick = () => {};
</script>

<button on:click={onClick} class="px-5 py-3 rounded-md bg-gray-200 outline outline-teal-400">
	{text}
</button>
