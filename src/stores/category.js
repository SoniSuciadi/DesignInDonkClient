import { defineStore } from "pinia";
import api from "../apis/api";

export const useCategoryStore = defineStore("category", {
  state: () => ({
    category: {},
    categories: [],
    selectedSubCate: "all",
  }),
  actions: {
    setSelectedSubCate(subcate) {
      this.selectedSubCate = subcate;
    },
    async getCategory(title) {
      try {
        let category = await api.get("/categories", { params: { title } });
        this.category = category.data.categories;
      } catch (error) {
        console.log(error);
      }
    },
    async getAllCategory() {
      try {
        let category = await api.get("/categories");
        this.category = category.data.categories;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
