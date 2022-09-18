<template>
  <NavBar />
  <div class="mx-10 pb-20">
    <p class="font-bold text-3xl text-center my-3">{{ page.toUpperCase() }}</p>
    <div class="grid grid-cols-4 gap-0">
      <CategoryList :subCategory="category[0].subCategory" />
      <div class="col-span-3">
        <div
          v-if="loading"
          class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-4 mx-10 sm:mx-5"
        >
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
        <div
          class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-4 mx-10 sm:mx-5"
        >
          <CardPosting
            v-for="(post, i) in showPostSelect"
            :key="i"
            :post="post"
          />
        </div>

        <PaginationPost />
      </div>
    </div>
  </div>
  <LoadingAnimate v-if="loading" />
  <FooterBar class="fixed inset-x-0 bottom-0" />
</template>
<script>
import NavBar from "../components/NavBar.vue";
import CategoryList from "../components/CategoryList.vue";
import CardPosting from "../components/CardPosting.vue";
import FooterBar from "../components/FooterBar.vue";
import { mapActions, mapState } from "pinia";
import { useLoadingStore } from "../stores/loading";
import { useCategoryStore } from "../stores/category";
import { usePostStore } from "../stores/post";
import PaginationPost from "../components/PaginationPost.vue";
import LoadingAnimate from "../components/LoadingAnimate.vue";
import SkeletonCard from "../components/SkeletonCard.vue";
export default {
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    ...mapState(useLoadingStore, ["loading"]),
    ...mapState(usePostStore, ["page", "showPostSelect"]),
    ...mapState(useCategoryStore, ["category"]),
  },
  methods: {
    ...mapActions(useLoadingStore, ["setLoading"]),
    ...mapActions(useCategoryStore, ["getCategory"]),
    ...mapActions(usePostStore, ["setpage", "readPost", "setshowPostSelect"]),
  },
  components: {
    NavBar,
    CategoryList,
    CardPosting,
    FooterBar,
    PaginationPost,
    LoadingAnimate,
    SkeletonCard,
  },
  async created() {
    this.loading = true;
    switch (this.$route.path) {
      case "/pngimages":
        await this.getCategory("PNG Images");
        await this.setpage("PNG Images");
        break;
      case "/background":
        await this.getCategory("Background");
        await this.setpage("Background");
        break;
      case "/template":
        await this.getCategory("Template");
        await this.setpage("Template");
        break;
    }
    this.loading = false;
  },
};
</script>
