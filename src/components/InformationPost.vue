<template>
  <div class="mt-5">
    <ul class="bg-white rounded-lg w-full text-gray-900">
      <li class="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg">
        <div class="grid grid-cols-8 gap-4">
          <div class="col-span-2">
            <p class="font-bold">Title</p>
          </div>
          <div class="col-span-5">: {{ detailPost.title }}</div>
        </div>
      </li>
      <li class="px-6 py-2 border-b border-gray-200 w-full">
        <div class="grid grid-cols-8 gap-4">
          <div class="col-span-2">
            <p class="font-bold">Description</p>
          </div>
          <div class="col-span-5">: {{ detailPost.description }}</div>
        </div>
      </li>
      <li class="px-6 py-2 border-b border-gray-200 w-full">
        <div class="grid grid-cols-8 gap-4">
          <div class="col-span-2">
            <p class="font-bold">Category</p>
          </div>
          <div class="col-span-5">: {{ detailPost.category }}</div>
        </div>
      </li>
      <li class="px-6 py-2 border-b border-gray-200 w-full">
        <div class="grid grid-cols-8 gap-4">
          <div class="col-span-2">
            <p class="font-bold">SubCategory</p>
          </div>
          <div class="col-span-5">: {{ detailPost.subCategory }}</div>
        </div>
      </li>
      <li class="px-6 py-2 border-b border-gray-200 w-full">
        <div class="grid grid-cols-8 gap-4">
          <div class="col-span-2">
            <p class="font-bold">Upload Date</p>
          </div>
          <div class="col-span-5">: 07</div>
        </div>
      </li>
      <li class="px-6 py-2 border-b border-gray-200 w-full">
        <div class="grid grid-cols-8 gap-4">
          <div class="col-span-2 my-auto">
            <p class="font-bold my-auto">User Upload</p>
          </div>
          <div class="col-span-5 flex">
            <span class="my-auto">:</span>
            <a
              href=""
              class="flex"
              @click.prevent="
                () => {
                  this.$router.push('/profile/' + detailPost.IduserCreate);
                }
              "
            >
              <img
                class="rounded-full w-10 my-auto"
                :src="detailPost.ImguserCreate"
              />
              <p class="flex font-bold my-auto ml-2 font-sans">
                {{ detailPost.fullNameuserCreate }}
              </p></a
            >
            <button
              v-if="detailPost.IduserCreate != id"
              @click.prevent="handleKirimPesan"
              class="flex justify-end bg-slate-800 hover:bg-slate-700 mx-auto my-auto text-slate-300 py-1 px-3 rounded-lg font-semibold cursor-pointer"
            >
              Kirim Pesan
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { useChating } from "../stores/chating";
export default {
  data() {
    return {
      id: "",
    };
  },
  computed: {},
  props: ["detailPost"],
  created() {
    this.id = localStorage.getItem("id");
  },
  methods: {
    ...mapActions(useChating, ["manipulateSelectedUser"]),
    handleKirimPesan() {
      this.manipulateSelectedUser({
        _id: this.detailPost.IduserCreate,
        fullName: this.detailPost.fullNameuserCreate,
        imgUrl: this.detailPost.imgUrl,
      });
      this.$router.push("/message");
    },
  },
};
</script>
