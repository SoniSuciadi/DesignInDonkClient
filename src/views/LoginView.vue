<template>
  <header class="fixed w-full top-0 left-0 z-30">
    <div class="container p-5 mx-auto flex items-center justify-between">
      <div class="flex mx-auto">
        <a class="flex flex-row justify-center">
          <img
            src="../assets/logo.jpg"
            width="9%"
            class="rounded-full mt-15 animate__animated animate__backInUp"
          />
        </a>
      </div>
    </div>
  </header>
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
            <h3 class="font-semibold text-2xl text-white">Sign In</h3>
            <p class="text-slate-500">
              Don'thave an account?
              <router-link
                to="/register"
                class="text-sm text-slate-700 hover:text-slate-400"
                >Sign Up</router-link
              >
            </p>
          </div>
          <div class="space-y-6">
            <form action="">
              <div class="relative mt-7">
                <input
                  v-model="user.email"
                  class="w-full text-white px-4 py-3 bg-slate-900 border border-white rounded-lg focus:outline-none focus:border-slate-400"
                  type="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div class="relative mt-7">
                <input
                  v-model="user.password"
                  type="password"
                  placeholder="Password"
                  class="text-white px-4 py-3 rounded-lg w-full bg-slate-900 border border-white focus:outline-none focus:border-slate-400"
                  required
                />
              </div>

              <div class="flex items-center justify-between mt-5">
                <div class="text-sm ml-auto">
                  <a
                    @click.prevent=""
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModalCenter"
                    href="#"
                    class="text-slate-700 hover:text-slate-600"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>
              <div>
                <button
                  @click.prevent="handleLogin()"
                  type="submit"
                  class="w-full bg-slate-800 mt-5 hover:bg-slate-700 text-slate-100 p-3 rounded-lg font-semibold cursor-pointer"
                >
                  Sign in
                </button>
              </div>
            </form>
            <div class="flex items-center justify-center my-5">
              <span class="h-px w-16 bg-white"></span>
              <span class="text-slate-400 font-normal mx-2">OR</span>
              <span class="h-px w-16 bg-white"></span>
            </div>
            <div class="flex justify-center gap-5 w-full mx-auto">
              <div id="buttonDiv" class="w-full mx-auto"></div>
            </div>
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
  <ModalChangePassword />
</template>
<script>
import { mapActions, mapState } from "pinia";
import Swal from "sweetalert2";
import { useUserStore } from "../stores/user";
import ModalChangePassword from "../components/ModalChangePassword.vue";
export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      email: "",
    };
  },
  methods: {
    ...mapActions(useUserStore, ["login", "forgotPassword", "loginGoogle"]),
    handleGoogleLogin(google_token) {
      this.loginGoogle(google_token.credential)
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Wellcome back",
            text: "",
            iconColor: "#0f182c",
            background: "#e2e8f0",
            backdrop: "swal2-backdrop-show",
            color: "#0f182c",
            confirmButtonColor: "#0f182c",
          });
          localStorage.setItem("access_token", res.data.access_token);
          localStorage.setItem("username", res.data.username);
          localStorage.setItem("imgUrl", res.data.imgUrl);
          localStorage.setItem("id", res.data.id);

          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleLogin() {
      this.login(this.user)
        .then((res) => {
          localStorage.setItem("access_token", res.data.access_token);
          localStorage.setItem("username", res.data.username);
          localStorage.setItem("id", res.data.id);
          localStorage.setItem("imgUrl", res.data.imgUrl);
          Swal.fire({
            icon: "success",
            title: "Wellcome back",
            text: "",
            iconColor: "#0f182c",
            background: "#e2e8f0",
            backdrop: "swal2-backdrop-show",
            color: "#0f182c",
            confirmButtonColor: "#0f182c",
          });
          this.$router.push("/home");
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Invalid email or password",
            iconColor: "#0f182c",
            background: "#e2e8f0",
            backdrop: "swal2-backdrop-show",
            color: "#0f182c",
            confirmButtonColor: "#0f182c",
          });
        });
    },
  },
  created() {
    const cb = this.handleGoogleLogin;
    window.onload = function () {
      google.accounts.id.initialize({
        client_id:
          "147007598592-3h69kftdbj9kjr7b9qvc63grjgj7qjof.apps.googleusercontent.com",
        callback: cb,
      });
      google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" } // customization attributes
      );
      google.accounts.id.prompt(); // also display the One Tap dialog
    };
  },
  components: { ModalChangePassword },
};
</script>
