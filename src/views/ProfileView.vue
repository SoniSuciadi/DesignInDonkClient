<template>
  <NavBar />
  <div
    v-if="loading"
    role="status"
    class="rounded-full mx-auto mt-8 w-60 animate-pulse md:p-6 dark:border-gray-700"
  >
    <div
      class="flex justify-center items-center h-48 bg-gray-300 rounded-full dark:bg-gray-700"
    >
      <svg
        class="w-12 h-12 text-gray-200 dark:text-gray-600"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 640 512"
      >
        <path
          d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"
        ></path>
      </svg>
    </div>
  </div>
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
  <div class="min-h-screen">
    <div
      class="flex justify-center mx-10 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-4 mx-10 sm:mx-5"
      v-if="loading"
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
      class="flex justify-center mx-10 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-4 mx-10 sm:mx-5"
    >
      <CardPosting v-for="post in userData.post" :key="post.id" :post="post" />
    </div>
  </div>

  <!-- modal post -->

  <ModalPost />
  <!-- modal profile -->
  <ModalProfile :userData="userData" />
  <!-- <LoadingAnimate v-if="loading" /> -->
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
import SkeletonCard from "../components/SkeletonCard.vue";
export default {
  data() {
    return {
      imgUrl: "",
      loading: true,
    };
  },
  components: {
    ModalPost,
    ModalProfile,
    NavBar,
    CardPosting,
    FooterBar,
    LoadingAnimate,
    SkeletonCard,
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
  async created() {
    this.loading = true;
    if (this.$route.path == "/myprofile") {
      await this.getUserData(localStorage.getItem("id"));
    } else {
      await this.getUserData(this.$route.params.id);
    }
    this.imgUrl = localStorage.getItem("imgUrl");
    this.loading = false;
  },
};
</script>
