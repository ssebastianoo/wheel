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
    <div class="result-parent">
        <div class="result">
            <div class="close">
                <button
                    on:click|preventDefault={() => {
                        $wheelWinner = null;
                    }}>❌</button
                >
            </div>
            <h1>🎉{$wheelWinner}🎉</h1>
        </div>
    </div>
{/if}

<div class="confetti">
    <canvas />
</div>

<style lang="scss">
    .confetti {
        z-index: 9998;
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
        overflow: hidden;
    }

    @keyframes appear {
        100% {
            scale: 1;
        }
    }

    .result-parent {
        position: absolute;
        width: 100vw;
        min-height: calc(100vh - 40px);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        pointer-events: none;

        .result {
            border: 4px solid white;
            pointer-events: all;
            background-color: rgb(37, 36, 36);
            padding: 20px;
            border-radius: 10px;
            scale: 0;
            animation: 1s appear cubic-bezier(0.23, 1, 0.32, 1) forwards;

            h1 {
                margin: 0;
            }

            .close {
                right: 5px;
                top: 5px;
                width: 100%;
                display: flex;
                justify-content: flex-end;
                position: absolute;

                button {
                    all: unset;
                    cursor: pointer;
                }
            }
        }
    }
</style>
