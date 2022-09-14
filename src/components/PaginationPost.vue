<template>
  <div class="flex my-4 justify-center">
    <nav aria-label="Page navigation example">
      <ul class="flex list-style-none">
        <li class="page-item disabled">
          <a
            class="hover:bg-slate-800 mx-1 hover:text-slate-100 page-link relative block py-1.5 px-3 border-0 bg-transparent transition-all duration-300 rounded-full"
            @click="setskip(skip - 1)"
            tabindex="-1"
            aria-disabled="true"
            :class="{ hidden: skip + 1 <= 1 }"
            >Previous</a
          >
        </li>

        <li
          class="page-item"
          v-for="i in totalPage"
          :key="i"
          @click.prevent="setskip(i - 1)"
          :class="{ 'bg-slate-800 text-slate-100': skip + 1 === i }"
        >
          <a
            class="hover:bg-slate-800 mx-1 hover:text-slate-100 page-link relative block py-1.5 px-3 border-0 bg-transparent transition-all duration-300 rounded-full"
            >{{ i }}</a
          >
        </li>
        <li class="page-item">
          <a
            @click="setskip(skip + 1)"
            class="hover:bg-slate-800 mx-1 hover:text-slate-100 page-link relative block py-1.5 px-3 border-0 bg-transparent transition-all duration-300 rounded-full"
            :class="{ hidden: skip >= totalPage - 1 }"
            >Next</a
          >
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { usePostStore } from "../stores/post";
import { useLoadingStore } from "../stores/loading";
export default {
  computed: {
    ...mapState(usePostStore, ["count", "skip"]),
    ...mapState(useLoadingStore, ["loading"]),
    totalPage() {
      return Math.ceil(this.count / 8);
    },
  },
  methods: {
    ...mapActions(useLoadingStore, ["setLoading"]),
    ...mapActions(usePostStore, ["setskip"]),
  },
};
</script>
