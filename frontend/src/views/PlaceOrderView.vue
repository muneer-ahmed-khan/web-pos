<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useOrders } from "@/composable/useOrder";
import { useLocalStorage } from "@/composable/useLocalStorage";
import { countries, languages } from "@/utils/countriesAndLanguages";
import QrCode from "qrcode.vue";
import { useStore } from "@/stores";

interface Rule {
  (value: string): boolean | string;
}

interface OrderBody {
  customerName: string;
  firstName: string;
  lastName: string;
  referenceNo: string;
  deliveryChannel: string;
  smsMobileNumber: string;
  emailAddress: string;
  countryCode: string;
  languageCode: string;
  lineItems: LineItem[];
}

interface LineItem {
  cardItemId: string;
  value: number;
}

const { getLocal } = useLocalStorage();
const { processOrder, getOrderStatus, isFetching, error } = useOrders();
const store = useStore();

const loading = ref<boolean>(false);
const isQRVisible = ref<boolean>(false);
const claimURL = ref<string>("");
const firstName = ref<string>("");
const lastName = ref<string>("");
const amount = ref<number>();
const cardItemId = ref<string>("");
const cardItems = ref<any[]>([]);
const contactNumber = ref<string>("");
const deliveryChannel = ref<string>("api");
const smsMobileNumber = ref<string>("");
const language = ref<string>("EN");
const country = ref<string>("AE");
const emailAddress = ref<string>("");
const countryCodes = ref<string[]>(countries);
const languageCodes = ref<string[]>(languages);

onMounted(async () => {
  initializeCard();
});

async function initializeCard() {
  if (store.card) {
    cardItemId.value = store.card.id;
  }

  const localCards = await getLocal("giftCards");

  if (localCards && Object.keys(localCards).length !== 0) {
    cardItems.value = localCards.map((item: any) => item.id);
  }
}

function generateUniqueID(): string {
  return "id" + Math.random().toString(16).slice(2);
}

async function placeOrder() {
  loading.value = true;

  const uniqueId = generateUniqueID();

  const body: OrderBody = {
    customerName: firstName.value + lastName.value,
    firstName: firstName.value,
    lastName: lastName.value,
    referenceNo: uniqueId,
    deliveryChannel: deliveryChannel.value,
    smsMobileNumber: smsMobileNumber.value,
    emailAddress: emailAddress.value,
    countryCode: country.value,
    languageCode: language.value,
    lineItems: [
      {
        cardItemId: cardItemId.value,
        value: amount.value!,
      },
    ],
  };

  const data = await processOrder(body);

  handleOrderProcessing(data);
}

function handleOrderProcessing(data: any) {
  loading.value = isFetching.value;

  if (!isFetching.value) {
    if (error.value) {
      console.log("An error occurred placing your order. Please try again.");
    } else if (data) {
      generateQRForClaimURL(data.referenceNo);
    }
  }
}

async function generateQRForClaimURL(id: string) {
  const data = await getOrderStatus(id);
  if (!isFetching.value) {
    if (error.value) {
      console.error("Error fetching order");
    } else if (data) {
      claimURL.value = data.lineItems[0].claimURL;
      isQRVisible.value = true;
    }
  }
}

function resetForm() {
  isQRVisible.value = false;
  firstName.value = "";
  lastName.value = "";
  amount.value = 0;
  cardItemId.value = "";
  contactNumber.value = "";
  deliveryChannel.value = "api";
  smsMobileNumber.value = "";
  language.value = "EN";
  country.value = "AE";
  emailAddress.value = "";
  claimURL.value = "";
}
</script>

<template>
  <div class="my-24 flex flex-col items-center justify-center">
    <div
      v-if="!isQRVisible"
      class="w-full md:w-96 bg-white rounded-lg shadow-lg p-6"
    >
      <div class="flex justify-center items-center">
        <div class="bg-white rounded-lg shadow-lg p-6 w-96">
          <div>
            <label class="block text-gray-700 text-sm font-bold mb-2">
              <strong>* </strong>First Name
            </label>
            <input
              v-model="firstName"
              class="border border-gray-400 rounded p-2 w-full focus:outline-none focus:border-blue-500"
              placeholder="First Name"
              required
            />
          </div>
          <div class="mt-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">
              <strong>* </strong>Last Name
            </label>
            <input
              v-model="lastName"
              class="border border-gray-400 rounded p-2 w-full focus:outline-none focus:border-blue-500"
              placeholder="Last Name"
              required
            />
          </div>
          <div class="mt-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">
              Contact Number
            </label>
            <input
              v-model="contactNumber"
              type="tel"
              class="border border-gray-400 rounded p-2 w-full focus:outline-none focus:border-blue-500"
              placeholder="Contact Number"
            />
          </div>
          <div class="mt-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">
              Delivery Channel
            </label>
            <select
              v-model="deliveryChannel"
              class="border border-gray-400 rounded p-2 w-full focus:outline-none focus:border-blue-500"
            >
              <option value="email">Email</option>
              <option value="sms">SMS</option>
              <option value="api">API</option>
            </select>
          </div>
          <div v-if="deliveryChannel === 'sms'" class="mt-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">
              <strong>* </strong>SMS Mobile Number
            </label>
            <input
              v-model="smsMobileNumber"
              type="tel"
              class="border border-gray-400 rounded p-2 w-full focus:outline-none focus:border-blue-500"
              placeholder="SMS Mobile Number"
            />
          </div>
          <div v-if="deliveryChannel === 'email'" class="mt-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">
              <strong>* </strong>Email Address
            </label>
            <input
              v-model="emailAddress"
              class="border border-gray-400 rounded p-2 w-full focus:outline-none focus:border-blue-500"
              placeholder="Email Address"
            />
          </div>
          <div class="mt-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">
              <strong></strong>Select Country
            </label>
            <select
              v-model="country"
              class="border border-gray-400 rounded p-2 w-full focus:outline-none focus:border-blue-500"
              required
            >
              <option disabled value="Select a country code">
                Select a Country code
              </option>
              <option v-for="code in countryCodes" :key="code" :value="code">
                {{ code }}
              </option>
            </select>
          </div>
          <div class="mt-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">
              <strong></strong>Select Language
            </label>
            <select
              v-model="language"
              class="border border-gray-400 rounded p-2 w-full focus:outline-none focus:border-blue-500"
              required
            >
              <option disabled value="Select a language" selected>
                Select a language
              </option>
              <option v-for="code in languageCodes" :key="code" :value="code">
                {{ code }}
              </option>
            </select>
          </div>
          <div class="mt-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">
              <strong>* </strong>Card Item ID
            </label>
            <select
              v-model="cardItemId"
              class="border border-gray-400 rounded p-2 w-full focus:outline-none focus:border-blue-500"
              required
            >
              <option disabled value="Select a card" selected>
                Select a Card Item
              </option>
              <option v-for="item in cardItems" :key="item" :value="item">
                {{ item }}
              </option>
            </select>
          </div>
          <div class="mt-6">
            <label class="block text-gray-700 text-sm font-bold mb-2">
              <strong>* </strong>Amount
            </label>
            <input
              v-model="amount"
              type="number"
              class="border border-gray-400 rounded p-2 w-full focus:outline-none focus:border-blue-500"
              placeholder="Amount"
              :required="true"
            />
          </div>
          <div class="mt-8 text-center">
            <button
              v-if="!loading"
              :disabled="!firstName || !lastName || !cardItemId || !amount"
              @click="placeOrder"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              :class="{
                'cursor-not-allowed opacity-50':
                  !firstName || !lastName || !cardItemId || !amount,
              }"
            >
              Place Order
            </button>

            <span v-else>Loading...</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="w-full md:w-96 bg-white rounded-lg shadow-lg p-6">
      <h2 class="text-lg font-bold mb-4">
        Your order has been placed successfully!
      </h2>
      <p class="text-sm text-gray-600 mb-2">
        Scan the QR code below to claim your order.
      </p>
      <QrCode :value="claimURL" :size="300" :margin="10" />
      <button
        @click="resetForm"
        class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Place Another Order
      </button>
    </div>
  </div>
</template>
