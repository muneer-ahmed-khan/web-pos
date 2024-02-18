<script setup lang="ts">
import { useCatalogue } from "@/composable/useCatalogue";
import { onMounted, ref } from "vue";
import { useLocalStorage } from "@/composable/useLocalStorage";
import GiftCard from "@/components/GiftCard.vue";

const { setLocal, getLocal } = useLocalStorage();
const { fetchItems, error, isFetching } = useCatalogue();

const giftCards = ref<any[]>([]);
const loading = ref<boolean>(true);

onMounted(async () => {
  const localCards = getLocal("giftCards");

  if (localCards && Object.keys(localCards).length !== 0) {
    loading.value = false;
    giftCards.value = localCards;
  } else {
    const data = await fetchItems();

    if (isFetching.value) {
      if (error.value) {
        console.error(
          "An error occurred fetching the catalogue. Please try again."
        );
      }

      if (data.items.length) {
        loading.value = isFetching.value;
        giftCards.value = data.items;
        setLocal("giftCards", giftCards.value);
      }
    }
  }
});
</script>

<template>
  <div class="my-40" style="background-color: ghostwhite">
    <div v-if="loading" class="p-10 flex flex-wrap justify-around">
      <div
        v-for="index in 5"
        :key="index"
        style="background-color: goldenrod"
        class="my-3 md:w-[300px] w-[400px] rounded-lg p-6"
      ></div>
    </div>
    <div v-else class="p-10 flex flex-wrap justify-around">
      <GiftCard v-for="card in giftCards" :key="card.id" :card="card" />
    </div>
  </div>
</template>
