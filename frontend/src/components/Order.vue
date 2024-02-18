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
  <div class="order-card-container bg-gray-100 shadow-md rounded-lg p-6 mb-28">
    <div class="flex justify-between mb-4">
      <div class="w-1/2">
        <div class="text-xs md:text-sm text-gray-600 font-semibold">
          ORDER PLACED
        </div>
        <div class="text-lg md:text-xl text-gray-800">{{ orderPlaced }}</div>
      </div>
      <div class="w-1/2 flex justify-end items-center pr-4">
        <div class="text-xs md:text-sm text-gray-600 font-semibold">
          ORDER # {{ orderId }}
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <div class="text-xs md:text-sm text-gray-600 font-semibold">FOR</div>
        <div class="text-xl md:text-2xl text-gray-800">{{ customerName }}</div>
      </div>
      <div>
        <div class="text-xs md:text-sm text-gray-600 font-semibold">TOTAL</div>
        <div class="text-xl md:text-2xl text-gray-800">
          {{ currency }}{{ total }}
        </div>
      </div>
      <div>
        <div class="text-xs md:text-sm text-gray-600 font-semibold">REF #</div>
        <div class="text-xl md:text-2xl text-gray-800">{{ refNo }}</div>
      </div>
      <div>
        <div class="text-xs md:text-sm text-gray-600 font-semibold">STATUS</div>
        <div class="text-xl md:text-2xl text-gray-800">{{ status }}</div>
      </div>
    </div>
  </div>
</template>
