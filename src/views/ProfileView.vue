<template>
  <NavBar />
  <img :src="imgUrl" class="rounded-full shadow-lg mx-auto mt-8 w-60" />
  <div class="text-center m-4">
    <p class="font-bold text-3xl text-slate-800">{{ userData.fullName }}</p>
    <div class="mx-auto" v-if="isMyProfile()">
      <button
        data-bs-toggle="modal"
        data-bs-target="#ModalPost"
        class="mt-4 mr-6 bg-slate-800 text-slate-100 hover:bg-slate-100 hover:text-slate-800 my-auto py-2 px-3 rounded-lg font-semibold cursor-pointer"
      >
        Add Post
      </button>
      <button
        data-bs-toggle="modal"
        data-bs-target="#ModalProfile"
        class="mt-4 bg-slate-800 text-slate-100 hover:bg-slate-100 hover:text-slate-800 my-auto py-2 px-3 rounded-lg font-semibold cursor-pointer"
      >
        Change Profile
      </button>
    </div>
  </div>
  <div
    class="flex justify-center mx-10 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-4 mx-10 sm:mx-5"
  >
    <CardPosting v-for="post in userData.post" :key="post.id" :post="post" />
  </div>

  <!-- modal post -->

  <ModalPost />
  <!-- modal profile -->
  <ModalProfile :userData="userData" />
  <LoadingAnimate v-if="loading" />
  <FooterBar class="mt-5" />
</template>
<script>
import ModalPost from "../components/ModalPost.vue";
import ModalProfile from "../components/ModalProfile.vue";
import NavBar from "../components/NavBar.vue";
import { mapActions, mapState } from "pinia";
import { useLoadingStore } from "../stores/loading";
import { useUserStore } from "../stores/user";
import CardPosting from "../components/CardPosting.vue";
import FooterBar from "../components/FooterBar.vue";
import LoadingAnimate from "../components/LoadingAnimate.vue";
export default {
  data() {
    return {
      imgUrl: "",
    };
  },
  components: {
    ModalPost,
    ModalProfile,
    NavBar,
    CardPosting,
    FooterBar,
    LoadingAnimate,
  },
  computed: {
    ...mapState(useLoadingStore, ["loading"]),

    ...mapState(useUserStore, ["userData"]),
  },
  methods: {
    ...mapActions(useLoadingStore, ["setLoading"]),

    ...mapActions(useUserStore, ["getUserData"]),
    isMyProfile() {
      if (this.$route.path == "/myprofile") {
        return true;
      } else {
        return false;
      }
    },
  },
  created() {
    this.setLoading(true);
    if (this.$route.path == "/myprofile") {
      this.getUserData(localStorage.getItem("id"));
    } else {
      this.getUserData(this.$route.params.id);
    }
    this.imgUrl = localStorage.getItem("imgUrl");
    this.setLoading(false);
  },
};
</script>
