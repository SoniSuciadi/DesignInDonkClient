<template>
  <div
    class="bg-gradient-to-b brightness-105 from-slate-900 via-slate-900 to-slate-800"
  >
    <div
      class="relative mt-0 min-h-screen flex flex-row justify-center rounded-3xl shadow-xl"
    >
      <div class="self-center">
        <div
          class="p-10 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 rounded-3xl animate__animated animate__backInLeft"
          style="width: 28rem"
        >
          <div class="mb-7">
            <h3 class="font-semibold text-2xl text-white">Change Password</h3>
            <p class="text-slate-500">
              Change mind?
              <a href="#" class="text-sm text-slate-700 hover:text-slate-400"
                >Sign In</a
              >
            </p>
          </div>
          <div class="space-y-6">
            <form action="">
              <div class="relative mt-7">
                <input
                  v-model="password"
                  class="w-full text-white px-4 py-3 bg-slate-900 border border-white rounded-lg focus:outline-none focus:border-slate-400"
                  type="password"
                  placeholder="Password"
                  required
                />
              </div>
              <div class="relative mt-7">
                <input
                  v-model="reapetPassword"
                  placeholder="Reapet Password"
                  type="password"
                  class="text-white px-4 py-3 rounded-lg w-full bg-slate-900 border border-white focus:outline-none focus:border-slate-400"
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  @click.prevent="changePasswordHandle"
                  class="w-full bg-slate-800 mt-5 hover:bg-slate-700 text-slate-100 p-3 rounded-lg font-semibold cursor-pointer"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div class="mt-7 text-center text-slate-400 text-xs">
            <span>
              Copyright © 2022
              <a
                href="https://codepen.io/uidesignhub"
                rel=""
                target="_blank"
                title="Codepen aji"
                class="text-violet-500 hover:text-violet-600"
                >DESIGN IN DONK</a
              ></span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "pinia";
import Swal from "sweetalert2";
import { useUserStore } from "../stores/user";

export default {
  data() {
    return {
      password: "",
      reapetPassword: "",
    };
  },
  methods: {
    ...mapActions(useUserStore, ["submitChangePassword"]),
    async changePasswordHandle() {
      if (this.password === this.reapetPassword) {
        try {
          let { token } = this.$route.query;
          await this.submitChangePassword(token, this.password);
          this.$router.push("/login");
          Swal.fire({
            icon: "success",
            title: "Please login again",
            text: "",
            iconColor: "#0f182c",
            background: "#e2e8f0",
            backdrop: "swal2-backdrop-show",
            color: "#0f182c",
            confirmButtonColor: "#0f182c",
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Password not match",
          iconColor: "#0f182c",
          background: "#e2e8f0",
          backdrop: "swal2-backdrop-show",
          color: "#0f182c",
          confirmButtonColor: "#0f182c",
        });
      }
    },
  },
};
</script>
