<script lang="ts">
	export let text = 'Click me',
		classes = '',
		onClick = () => {};
</script>

<button
	on:click={onClick}
	class="shadow-lg px-5 py-3 rounded-md bg-gray-200/50 hover:bg-slate-50 outline outline-teal-400 {classes}"
>
	{text}
</button>
