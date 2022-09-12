<template>
  <div
    class="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
    id="ModalProfile"
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
            Edit Profile
          </h5>
        </div>
        <div class="modal-body relative p-4">
          <form>
            <input
              v-model="user.fullName"
              class="w-full text-white px-4 py-3 mb-3 bg-slate-900 border border-white rounded-lg focus:outline-none focus:border-slate-400"
              type="text"
              placeholder="Fullname"
              required
            />
            <input
              v-model="user.email"
              class="w-full text-white px-4 py-3 mb-3 bg-slate-900 border border-white rounded-lg focus:outline-none focus:border-slate-400"
              type="email"
              disabled
            />
            <input
              @change.prevent="setImage"
              class="w-full mb-3 flex text-white px-4 py-3 bg-slate-900 border border-white rounded-lg focus:outline-none focus:border-slate-400"
              type="file"
              id="formFile"
              placeholder="Image File"
              required
            />
            <input
              v-model="user.phoneNumber"
              class="w-full text-white px-4 py-3 mb-3 bg-slate-900 border border-white rounded-lg focus:outline-none focus:border-slate-400"
              type="text"
              placeholder="Phone Number"
              required
            />
            <button
              @click.prevent="handleUpdateUser"
              type="submit"
              class="bg-slate-800 mt-5 hover:bg-slate-700 text-slate-100 p-3 rounded-lg font-semibold cursor-pointer"
              data-bs-dismiss="modal"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { useUserStore } from "../stores/user";
export default {
  data() {
    return {
      user: {
        fullName: "",
        phoneNumber: "",
        email: "",
        image: "",
      },
    };
  },
  computed: {
    ...mapState(useUserStore, ["userData"]),
  },
  methods: {
    ...mapActions(useUserStore, ["updateUserData"]),
    async handleUpdateUser() {
      await this.updateUserData(this.user);
    },
    setImage(e) {
      this.user.image = e.target.files[0];
    },
  },
  created() {
    this.user.fullName = this.userData.fullName;
    this.user.email = this.userData.email;
    this.user.phoneNumber = this.userData.phoneNumber;
  },
};
</script>
