<template>
  <div
    class="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto bg-gradient-to-b brightness-105 from-slate-900 via-slate-900 to-slate-800"
    id="exampleModalCenter"
    tabindex="-1"
    aria-labelledby="exampleModalCenterTitle"
    aria-modal="true"
    role="dialog"
  >
    <div
      class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none"
    >
      <div
        class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current"
      >
        <div
          class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md"
        >
          <h5
            class="text-xl font-medium leading-normal text-slate-800"
            id="exampleModalScrollableLabel"
          >
            Forgot password
          </h5>
          <button
            type="button"
            class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body relative p-4">
          <form>
            <input
              v-model="email"
              class="w-full text-white px-4 py-3 bg-slate-900 border border-white rounded-lg focus:outline-none focus:border-slate-400"
              type="email"
              placeholder="Email"
              required
            />
            <button
              @click.prevent="sendEmail"
              type="submit"
              class="bg-slate-800 mt-5 hover:bg-slate-700 text-slate-100 p-3 rounded-lg font-semibold cursor-pointer"
              data-bs-dismiss="modal"
            >
              Send Email
            </button>
          </form>
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
      email: "",
    };
  },
  methods: {
    ...mapActions(useUserStore, ["forgotPassword"]),
    async sendEmail() {
      if (this.email) {
        try {
          await this.forgotPassword(this.email);
          this.$router.push("/login");
          Swal.fire({
            icon: "success",
            title: "Succes email",
            text: "Check your email",
            iconColor: "#0f182c",
            background: "#e2e8f0",
            backdrop: "swal2-backdrop-show",
            color: "#0f182c",
            confirmButtonColor: "#0f182c",
          });
        } catch (error) {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Failed ",
            text: "Email is not registered",
            iconColor: "#0f182c",
            background: "#e2e8f0",
            backdrop: "swal2-backdrop-show",
            color: "#0f182c",
            confirmButtonColor: "#0f182c",
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Email must be require",
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
