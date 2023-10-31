<script lang="ts">
    import { onMount } from "svelte";

    interface Sale {
        name: string;
        date: string;
    }

    let saleData: Sale = {
        name: "loading...",
        date: "loading..."
    }

    let differenceInDays: number = 0;

    const getSaleData = async () => {
        const response = await fetch("/api/sale");
        const data = await response.json();
        saleData.date = data.date;
        saleData.name = data.name;
    }

    function getDifferenceInDays() {
        const saleDate = new Date(Number(saleData.date));
        const today = new Date();
        const differenceInTime = saleDate.getTime() - today.getTime();
        const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
        return differenceInDays;
    }

    const doEverythingAsync = async () => {
        await getSaleData();
        differenceInDays = getDifferenceInDays();
    }

    onMount(() => {
        doEverythingAsync();
    });
</script>

<main class="bg-black h-full">
    <h1 class="text-white absolute mt-4 ml-4 text-lg">*This is only an estimation based on the previous sales</h1>
    <div class="flex flex-col justify-center h-full">
        <div class="flex justify-center">
            <div class="text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
                <h1>The next sale is</h1>
                <h1>{saleData.name} and</h1>
                <h1>will start in {differenceInDays} days.</h1>
            </div>
        </div>
    </div>
</main>