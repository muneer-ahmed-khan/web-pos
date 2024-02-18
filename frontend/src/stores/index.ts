import { defineStore } from "pinia";

export const useStore = defineStore("store", () => {
  const order: any = {};
  const card: any = {};
  const walletId: string = "";
  const drawer: boolean = false;
  const isLoggedIn = false;

  return { order, card, drawer, walletId, isLoggedIn };
});
