<script lang="ts">
    import Confetti from "./lib/Confetti.svelte";
    import { wheelWinner } from "./lib/store";

    let options = ["a", "b", "c", "d", "e", "f"];
    let wheel;

    $: squareSize = (300 * Math.PI) / options.length - 20;

    let result: string | null;
    let addedListener: boolean = false;

    function spin() {
        $wheelWinner = null;
        if (!addedListener) {
            wheel.addEventListener("transitionend", () => {
                if (result) {
                    // alert(result);
                    $wheelWinner = result;
                }
            });
            addedListener = true;
        }

        let start = 0;
        if (wheel.style.transform) {
            start = parseInt(wheel.style.transform.match(/\d+/)[0]);
        }

        wheel.style.transform = `rotate(${
            start + 3600 + Math.round(Math.random() * 360)
        }deg)`;

        const transform = wheel.style.transform.match(/\d+/g)[0];
        const currentPos = transform - 360 * Math.floor(transform / 360);
        result =
            options[Math.floor((360 - currentPos) / (360 / options.length))];
    }

    function reset() {
        $wheelWinner = null;
        result = null;
        wheel.style.transform = "";
    }

    function addOptions(e: Event) {
        const target = e.target as HTMLTextAreaElement;
        if (target.value.split(",").length > 1) {
            options = target.value.split(",");
        }
    }
</script>

<main style={"--options:" + options.length}>
    <Confetti />
    <div class="container">
        <h1 class="title">Wheel</h1>
        <div class="wheel-parent">
            <div class="arrow" />
            <div class="wheel" bind:this={wheel}>
                <div class="lines">
                    {#each options as _, index}
                        <div
                            class="line"
                            style={`transform: rotate(${
                                (360 / options.length) * index
                            }deg)`}
                        />
                    {/each}
                </div>
                <div class="words">
                    {#each options as option, index}
                        <div
                            class="word"
                            style={`transform: rotate(${
                                (360 / options.length) * index +
                                360 / options.length / 2
                            }deg);width:${squareSize}px`}
                        >
                            <p
                                style={"font-size:" +
                                    900 / options.length +
                                    "%"}
                            >
                                {option}
                            </p>
                        </div>
                    {/each}
                </div>
            </div>
        </div>
        <textarea
            placeholder="Write options separated by a ','"
            value="a,b,c,d,e,f"
            on:keyup={addOptions}
        />
        <div class="buttons">
            <button on:click|preventDefault={spin}>Spin</button>
            <button on:click|preventDefault={reset}>Reset</button>
        </div>
    </div>
</main>

<style lang="scss">
    $mainColor: rgb(235, 235, 110);
    $size: 300px;

    .container {
        width: 100%;
        margin: 40px 0;
        min-height: calc(100vh - 80px);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 50px;

        .title {
            margin: 0;
        }

        .buttons {
            display: flex;
            gap: 10px;

            button {
                all: unset;
                background-color: $mainColor;
                color: black;
                padding: 5px;
                font-size: 20px;
                border-radius: 5px;
                cursor: pointer;
                transition: box-shadow 0.1s;

                &:hover {
                    box-shadow: 2px 2px white;
                }
            }
        }

        textarea {
            all: unset;
            background-color: rgb(51, 49, 49);
            resize: both;
            border: 2px solid white;
            padding: 10px;
            border-radius: 10px;
        }
    }

    .wheel-parent {
        width: $size;
        height: $size;
        display: flex;
        justify-content: center;
        position: relative;
        overflow: hidden;

        .arrow {
            width: 0;
            height: 0;
            border-left: 20px solid transparent;
            border-right: 20px solid transparent;
            border-top: 20px solid white;
            z-index: 2;
            position: absolute;
            top: -8px;
        }

        .wheel {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: $mainColor;
            display: flex;
            justify-content: center;
            position: relative;
            transition: transform 2s cubic-bezier(0.19, 1, 0.22, 1);
            color: black;

            .line {
                position: absolute;
                width: 1px;
                height: 50%;
                background-color: black;
                transform-origin: bottom;
            }

            .words {
                width: 100%;
                height: 100%;
                position: absolute;
                display: flex;
                justify-content: center;

                .word {
                    position: absolute;
                    height: 50%;
                    transform-origin: bottom;
                    text-align: center;

                    p {
                        margin-top: 30px;
                        margin-bottom: 0;
                        word-break: break-all;
                    }
                }
            }
        }
    }
</style>
