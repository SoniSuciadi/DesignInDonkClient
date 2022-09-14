<template>
  <NavBar />
  <div class="grid md:grid-cols-2 sm:grid-cols-1 mx-5 mt-5">
    <div class="flex justify-center my-auto">
      <img class="h-5/6 px-5" :src="detailPost.imgUrl" />
    </div>
    <InformationPost :detailPost="detailPost" />
  </div>
  <LoadingAnimate v-if="loading" />
</template>
<script>
import NavBar from "../components/NavBar.vue";
import InformationPost from "../components/InformationPost.vue";
import { mapActions, mapState } from "pinia";
import { usePostStore } from "../stores/post";
import { useLoadingStore } from "../stores/loading";
import LoadingAnimate from "../components/LoadingAnimate.vue";

export default {
  components: { NavBar, InformationPost, LoadingAnimate },
  methods: {
    ...mapActions(useLoadingStore, ["setLoading"]),

    ...mapActions(usePostStore, ["getPostDetail"]),
  },
  computed: {
    ...mapState(useLoadingStore, ["loading"]),
    ...mapState(usePostStore, ["detailPost"]),
  },
  created() {
    this.setLoading(true);
    this.getPostDetail(this.$route.params.id);
    this.setLoading(false);
  },
};
</script>
