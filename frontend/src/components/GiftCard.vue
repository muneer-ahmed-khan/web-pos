<script setup lang="ts">
import { defineProps, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "@/stores";

const props = defineProps({
  card: {
    type: Object as () => any,
    required: true,
  },
});

const store = useStore();
const router = useRouter();

const currencyMap: { [index: string]: string } = {
  AED: "AED",
  USD: "$",
  EUR: "€",
  GBP: "£",
};

const currency: string = currencyMap[props.card.currency] || "AED";

const placeOrder = (card: any) => {
  store.card = card;
};
</script>

<template>
  <div class="my-3 md:w-[300px] w-[400px]">
    <div class="relative h-52">
      <img
        :src="card.cardFaceImage"
        alt="Card Image"
        class="object-cover w-full h-full rounded-t-lg"
      />
    </div>
    <div class="bg-gray-100 p-4 rounded-b-lg">
      <div class="mb-3 text-lg font-semibold">{{ card.brand }}</div>
      <div>
        <span class="font-medium">{{ currency }} {{ card.fromValue }}</span> to
        <span class="font-medium">{{ currency }} {{ card.toValue }}</span>
      </div>
      <div class="text-center mt-5">
        <button
          @click="placeOrder(card)"
          class="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
        >
          Buy Card
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
