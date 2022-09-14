<template>
  <nav class="sticky top-0 text-slate-200" style="z-index: 99">
    <div class="bg-slate-200">
      <div class="absolute top-0 h-16 bg-slate-900 blur-sm w-full"></div>
      <div class="relative top-0 top-2 grid grid-cols-3 gap-4">
        <div class="flex">
          <router-link
            to="/"
            class="flex rounded-full my-1 ml-4 hover:bg-slate-200 group"
          >
            <img
              class="w-10 h-10 my-auto ml-1 rounded-full group-hover"
              src="../assets/logo.png"
            />
            <p
              class="hidden md:flex font-bold my-auto mx-2 mr-3 text-slate-200 group-hover:text-slate-900 text-2xl font-sans"
            >
              DesignInDonk
            </p>
          </router-link>
        </div>
        <div class="flex">
          <label class="relative block w-full my-auto mx-auto">
            <input
              v-model="search"
              class="placeholder:italic text-slate-800 focus:outline-sky-900 placeholder:text-slate-400 block bg-white w-full border-slate-300 rounded-md py-2 pl-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Search ..."
              type="text"
              name="search"
            />
            <a
              @click.prevent="handleSearch"
              class="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              <i class="fa-solid fa-magnifying-glass hover:text-slate-900"></i>
            </a>
          </label>
        </div>
        <div class="flex justify-evenly" v-if="isLogin">
          <router-link
            to="/message"
            class="group my-auto p-1 hover:bg-slate-200 rounded-full"
          >
            <i
              class="fa-solid fa-envelope fa-xl group-hover:text-slate-900"
            ></i>
          </router-link>
          <a
            href=""
            class="flex justify-end mr"
            @click.prevent="
              () => {
                this.$router.push('/myprofile');
              }
            "
          >
            <img class="rounded-full w-10 my-auto" :src="imgUrl" />
            <p class="hidden md:flex font-bold my-auto ml-2 font-sans">
              Hi, {{ name }}
            </p>
          </a>
          <a
            href=""
            @click.prevent="logout"
            class="my-auto p-1 hover:bg-slate-200 group rounded-full"
            ><i
              class="fa-solid fa-right-from-bracket fa-xl group-hover:text-slate-900"
            ></i
          ></a>
        </div>
        <div class="flex justify-end mr-10" v-if="!isLogin">
          <button
            @click.prevent="
              () => {
                this.$router.push('/login');
              }
            "
            class="flex justify-end bg-slate-300 hover:bg-slate-100 my-auto text-slate-900 py-2 px-3 rounded-lg font-semibold cursor-pointer"
          >
            Sing In
          </button>
        </div>
      </div>
    </div>
    <div
      class="flex bg-transparent mt-3 p-2 w-full justify-center space-x-0"
      v-if="showNavCategory()"
    >
      <ul class="drop-shadow-2xl">
        <li class="inline">
          <router-link
            @click.prevent="changePage('pngimages')"
            to="/pngimages"
            class="min-w-auto w-32 h-10 bg-slate-800 px-6 py-2 rounded-l-full hover:bg-slate-900 hover:animate-pulse ease-out text-white font-sans"
          >
            PNG Image
          </router-link>
        </li>
        <li class="inline">
          <router-link
            @click.prevent="changePage('background')"
            to="/background"
            class="min-w-auto w-32 h-10 bg-slate-800 px-6 py-2 rounded-none hover:bg-slate-900 hover:animate-pulse ease-out text-white font-sans"
          >
            Background
          </router-link>
        </li>
        <li class="inline">
          <router-link
            @click.prevent="changePage('template')"
            to="/template"
            class="min-w-auto w-32 h-10 bg-slate-800 px-6 py-2 rounded-r-full hover:bg-slate-900 hover:animate-pulse ease-out text-white font-sans"
          >
            Template
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
import Swal from "sweetalert2";
import { useUserStore } from "../stores/user";
import { mapActions, mapState } from "pinia";
import { usePostStore } from "../stores/post";
import { useCategoryStore } from "../stores/category";
import { useLoadingStore } from "../stores/loading";

export default {
  data() {
    return {
      isLogin: false,
      search: "",
    };
  },
  computed: {
    ...mapState(useLoadingStore, ["loading"]),
    ...mapState(useUserStore, ["name", "imgUrl"]),
    ...mapState(usePostStore, ["page"]),
  },
  methods: {
    ...mapActions(useLoadingStore, ["setLoading"]),
    showNavCategory() {
      if (
        this.$route.path !== "/message" &&
        this.$route.path !== "/myprofile" &&
        this.$route.path !== "/profile"
      ) {
        return true;
      }
      return false;
    },
    ...mapActions(usePostStore, [
      "setpage",
      "setshowPostSelect",
      "readPost",
      "setskip",
    ]),
    logout() {
      Swal.fire({
        icon: "info",
        title: "Logout ?",
        text: "sure you want to logout",
        iconColor: "#0f182c",
        background: "#e2e8f0",
        showCancelButton: true,
        cancelButtonColor: "#919191",
        backdrop: "swal2-backdrop-show",
        color: "#0f182c",
        confirmButtonColor: "#0f182c",
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.clear();
          this.$router.push("/login");
          Swal.fire({
            icon: "success",
            title: "Logout Successfully",
            text: "See you...",
            iconColor: "#0f182c",
            background: "#e2e8f0",
            backdrop: "swal2-backdrop-show",
            color: "#0f182c",
            confirmButtonColor: "#0f182c",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Cancle",
            text: "Thanks to stay with me",
            iconColor: "#0f182c",
            background: "#e2e8f0",
            backdrop: "swal2-backdrop-show",
            color: "#0f182c",
            confirmButtonColor: "#0f182c",
          });
        }
      });
    },
    ...mapActions(useCategoryStore, ["getCategory", "setSelectedSubCate"]),
    async changePage(page) {
      this.setLoading(true);
      switch (page) {
        case "pngimages":
          this.setSelectedSubCate("all");
          this.getCategory("PNG Images");
          this.setpage("PNG Images");
          this.setskip(0);
          break;
        case "background":
          this.setSelectedSubCate("all");
          this.getCategory("Background");
          this.setpage("Background");
          this.setskip(0);
          break;
        case "template":
          this.setSelectedSubCate("all");
          this.getCategory("Template");
          this.setpage("Template");
          this.setskip(0);
          break;
      }
      this.setLoading(false);
    },

    ...mapActions(useUserStore, ["setname", "setimgUrl"]),
    ...mapActions(usePostStore, ["setshowPostSelect", "setSearch"]),
    handleSearch() {
      this.setSearch(this.search);
    },
  },
  created() {
    if (localStorage.getItem("access_token")) {
      this.isLogin = true;
      let name = localStorage.getItem("username");
      this.setname(name);
      let imgUrl = localStorage.getItem("imgUrl");
      this.setimgUrl(imgUrl);
    }
  },
};
</script>
