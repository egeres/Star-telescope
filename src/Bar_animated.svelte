<script lang="ts">
    import { onMount } from "svelte";
    import anime from "animejs";

    export let align: string; // Declare the prop
    let bar: HTMLElement;

    onMount(() => {
        anime({
            targets: bar,
            width: ["0%", "100%"],
            delay: 700,
            duration: 16000,
            easing: "easeOutQuint",
        });
    });
</script>

{#if align === "R"}
    <hr bind:this={bar} style="margin-right: 0px; border: 1px solid #303030;" />
{:else if align === "L"}
    <hr bind:this={bar} style="margin-left: 0px; border: 1px solid #303030;" />
{:else}
    <hr bind:this={bar} />
{/if}
