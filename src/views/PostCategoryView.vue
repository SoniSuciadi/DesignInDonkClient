<template>
  <NavBar />
  <div class="mx-10 pb-20">
    <p class="font-bold text-3xl text-center my-3">{{ page.toUpperCase() }}</p>
    <div class="grid grid-cols-4 gap-0">
      <CategoryList :subCategory="category[0].subCategory" />
      <div class="col-span-3">
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

  <FooterBar class="fixed inset-x-0 bottom-0" />
</template>
<script>
import NavBar from "../components/NavBar.vue";
import CategoryList from "../components/CategoryList.vue";
import CardPosting from "../components/CardPosting.vue";
import FooterBar from "../components/FooterBar.vue";
import { mapActions, mapState } from "pinia";
import { useCategoryStore } from "../stores/category";
import { usePostStore } from "../stores/post";
import PaginationPost from "../components/PaginationPost.vue";
export default {
  computed: {
    ...mapState(usePostStore, ["page", "showPostSelect"]),
    ...mapState(useCategoryStore, ["category"]),
  },
  methods: {
    ...mapActions(useCategoryStore, ["getCategory"]),
    ...mapActions(usePostStore, ["setpage", "readPost", "setshowPostSelect"]),
  },
  components: { NavBar, CategoryList, CardPosting, FooterBar, PaginationPost },
  async created() {
    switch (this.$route.path) {
      case "/pngimages":
        this.getCategory("PNG Images");
        this.setpage("PNG Images");
        break;
      case "/background":
        this.getCategory("Background");
        this.setpage("Background");
        break;
      case "/template":
        this.getCategory("Template");
        this.setpage("Template");
        break;
    }
  },
};
</script>
