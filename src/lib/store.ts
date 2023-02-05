import { writable } from "svelte/store";

export const wheelWinner = writable<null | string>(null);
