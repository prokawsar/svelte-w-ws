import { writable, type Writable } from 'svelte/store'

export let count = writable(0)
export let user: Writable<boolean> = writable(false)
