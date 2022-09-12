<template>
  <div
    class="bg-gradient-to-b brightness-105 from-slate-900 via-slate-900 to-slate-800"
  >
    <div
      class="relative mt-0 min-h-screen flex flex-row justify-center rounded-3xl shadow-xl"
    >
      <div class="self-center grid grid-cols-2">
        <div class="my-auto flex justify-end">
          <img
            src="../assets/logo.jpg"
            class="self-center h-full"
            style="width: 28rem"
          />
        </div>
        <div
          class="p-6 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 rounded-r-lg"
        >
          <div class="mb-4">
            <h3 class="font-semibold text-2xl text-white">Sign Up</h3>
          </div>
          <div class="space-y-6">
            <form action="">
              <div class="relative mt-4">
                <input
                  v-model="user.fullName"
                  class="w-full text-white px-4 py-3 bg-slate-900 border border-white rounded-lg focus:outline-none focus:border-slate-400"
                  type="Text"
                  placeholder="Full Name"
                  required
                />
              </div>
              <div class="relative mt-4">
                <input
                  v-model="user.email"
                  class="w-full text-white px-4 py-3 bg-slate-900 border border-white rounded-lg focus:outline-none focus:border-slate-400"
                  type="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div class="relative mt-4">
                <input
                  v-model="user.password"
                  placeholder="Password"
                  class="text-white px-4 py-3 rounded-lg w-full bg-slate-900 border border-white focus:outline-none focus:border-slate-400"
                  required
                />
              </div>
              <div class="relative mt-4">
                <input
                  v-model="user.rPassword"
                  placeholder="Reapet Password"
                  type="password"
                  class="text-white px-4 py-3 rounded-lg w-full bg-slate-900 border border-white focus:outline-none focus:border-slate-400"
                  required
                />
              </div>

              <div>
                <button
                  v-bind:class="{ disabled: isValid }"
                  type="submit"
                  @click.prevent="handleRegister"
                  class="w-full bg-slate-800 mt-5 hover:bg-slate-700 text-slate-100 p-3 rounded-lg font-semibold cursor-pointer"
                >
                  Sign in
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
import { mapActions, mapState } from "pinia";
import Swal from "sweetalert2";
import { useUserStore } from "../stores/user";
export default {
  data() {
    return {
      user: {
        fullName: "",
        email: "",
        password: "",
        rPassword: "",
        username: "",
      },
      isValid: false,
    };
  },
  methods: {
    ...mapActions(useUserStore, ["register"]),
    handleRegister() {
      this.register(this.user)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Registration Successfully",
            text: "Check you email for confirmation",
            iconColor: "#0f182c",
            background: "#e2e8f0",
            backdrop: "swal2-backdrop-show",
            color: "#0f182c",
            confirmButtonColor: "#0f182c",
          });
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Invalid Input Email",
            iconColor: "#0f182c",
            background: "#e2e8f0",
            backdrop: "swal2-backdrop-show",
            color: "#0f182c",
            confirmButtonColor: "#0f182c",
          });
        });
    },
  },
  //   watch: {
  //       comparePassword(newPassword,oldPassword){
  //           if()
  //       }
  //   },
};
</script>
