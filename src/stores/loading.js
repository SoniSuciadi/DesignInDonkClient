import { defineStore } from "pinia";

export const useLoadingStore = defineStore("loading", {
  state: () => ({
    loading: false,
  }),
  actions: {
    setLoading(stat) {
      this.loading = stat;
    },
  },
});
