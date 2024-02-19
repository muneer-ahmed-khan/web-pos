<script setup lang="ts">
import { useRouter } from "vue-router";
import { useStore } from "@/stores";

const store = useStore();
const router = useRouter();
const props = <any>defineProps({
  order: {
    type: Object,
    required: true,
  },
});

const orderPlacedDate = new Date(props.order.creationDate);
const orderPlaced = `${orderPlacedDate.getDate()} ${getMonthName(
  orderPlacedDate.getMonth()
)} ${orderPlacedDate.getFullYear()}`;

function getMonthName(monthIndex: number): string {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[monthIndex];
}

const total = props.order.lineItems[0].value;
const orderId = props.order.id;
const customerName = props.order.customerName;
const status = props.order.lineItems[0].status;
const refNo = props.order.referenceNo;

const currencyMap: { [index: string]: any } = {
  AED: "AED",
  USD: "$",
  EUR: "€",
  GBP: "£",
};
const currency: string =
  currencyMap[props.order.lineItems[0].currency] || "AED";
</script>

<template>
  <div
    class="order-card-container bg-white shadow-lg rounded-lg p-6 mb-8 md:mb-28 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 md:mx-2"
  >
    <div class="flex flex-col md:flex-row justify-between mb-4">
      <div class="text-sm md:text-base text-gray-600 font-semibold">
        ORDER PLACED: {{ orderPlaced }}
      </div>
      <div
        class="text-sm md:text-base text-gray-600 font-semibold mt-4 md:mt-0"
      >
        ORDER # {{ orderId }}
      </div>
    </div>
    <div class="grid grid-cols-2 gap-4">
      <div class="text-sm md:text-base text-gray-600 font-semibold">
        FOR: {{ customerName }}
      </div>
      <div class="text-sm md:text-base text-gray-600 font-semibold">
        TOTAL: {{ currency }}{{ total }}
      </div>
      <div class="text-sm md:text-base text-gray-600 font-semibold">
        REF #: {{ refNo }}
      </div>
      <div class="text-sm md:text-base text-gray-600 font-semibold">
        STATUS: {{ status }}
      </div>
    </div>
  </div>
</template>
