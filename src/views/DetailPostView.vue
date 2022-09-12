<template>
  <NavBar />
  <div class="grid md:grid-cols-2 sm:grid-cols-1 mx-5 mt-5">
    <div class="flex justify-center my-auto">
      <img class="h-5/6 px-5" :src="detailPost.imgUrl" />
    </div>
    <InformationPost :detailPost="detailPost" />
  </div>
</template>
<script>
import NavBar from "../components/NavBar.vue";
import InformationPost from "../components/InformationPost.vue";
import { mapActions, mapState } from "pinia";
import { usePostStore } from "../stores/post";
export default {
  components: { NavBar, InformationPost },
  methods: {
    ...mapActions(usePostStore, ["getPostDetail"]),
  },
  computed: {
    ...mapState(usePostStore, ["detailPost"]),
  },
  created() {
    this.getPostDetail(this.$route.params.id);
  },
};
</script>
