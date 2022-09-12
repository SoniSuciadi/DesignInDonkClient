<template>
  <div class="flex">
    <div class="bg-white rounded-lg border border-gray-200 w-96 text-gray-900">
      <a
        @click.prevent="handleSelectSubCate('all')"
        :class="{ 'bg-slate-800 text-slate-100': selectedSubCate === 'all' }"
        class="block px-6 py-2 border-b border-gray-200 w-full hover:bg-slate-800 hover:text-slate-100 transition duration-500 cursor-pointer"
      >
        All
      </a>
      <a
        v-for="(name, i) in subCategory"
        @click.prevent="handleSelectSubCate(name)"
        :key="i"
        :class="{ 'bg-slate-800 text-slate-100': selectedSubCate === name }"
        class="block px-6 py-2 border-b border-gray-200 w-full hover:bg-slate-800 hover:text-slate-100 transition duration-500 cursor-pointer"
      >
        {{ name }}
      </a>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { useCategoryStore } from "../stores/category";
import { usePostStore } from "../stores/post";
export default {
  props: ["subCategory"],
  computed: {
    ...mapState(useCategoryStore, ["selectedSubCate"]),
  },
  methods: {
    ...mapActions(useCategoryStore, ["setSelectedSubCate"]),
    ...mapActions(usePostStore, ["setSubCategory", "setskip"]),
    handleSelectSubCate(subCate) {
      this.setSubCategory(subCate == "all" ? "" : subCate);
      this.setskip(0);
      this.setSelectedSubCate(subCate);
    },
  },
};
</script>
