<script lang="ts">
    import { wheelWinner } from "./store";
    import { onMount } from "svelte";

    function confetti() {
        let canvas = document.querySelector("canvas");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        var ctx = canvas.getContext("2d");
        var confettiArray = [];
        var pieces = 200;

        for (var i = 0; i < pieces; i++) {
            confettiArray.push({
                x: Math.floor(Math.random() * canvas.width),
                y: Math.floor(Math.random() * canvas.height),
                size: Math.random() * 5 + 5,
                color:
                    "rgb(" +
                    Math.floor(Math.random() * 255) +
                    ", " +
                    Math.floor(Math.random() * 255) +
                    ", " +
                    Math.floor(Math.random() * 255) +
                    ")",
                velocity: {
                    x: Math.random() * 2 - 1,
                    y: Math.random() * 3 + 1,
                },
            });
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            console.log("a");

            for (var i = 0; i < confettiArray.length; i++) {
                ctx.fillStyle = confettiArray[i].color;
                ctx.fillRect(
                    confettiArray[i].x,
                    confettiArray[i].y,
                    confettiArray[i].size,
                    confettiArray[i].size
                );

                confettiArray[i].x += confettiArray[i].velocity.x;
                confettiArray[i].y += confettiArray[i].velocity.y;

                if (confettiArray[i].y > canvas.height) {
                    confettiArray.splice(i, 1);
                }
            }
            if (confettiArray.length > 0) requestAnimationFrame(draw);
        }
        draw();
    }

    onMount(() => {
        wheelWinner.subscribe((value) => {
            if (value) {
                confetti();
            }
        });
    });
</script>

{#if $wheelWinner}
    <div class="result">
        <h1>{$wheelWinner}</h1>
    </div>
{/if}

<div class="confetti">
    <canvas />
</div>

<style>
    .confetti {
        z-index: 9999;
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
        overflow: hidden;
    }
</style>
