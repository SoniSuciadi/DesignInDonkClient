<template>
  <div v-if="showDate">
    <hr />
    <p class="text-center text-sm text-slate-400">
      {{ getDay }}
    </p>
  </div>
  <div class="flex mt-2" v-if="messages.sender !== 'anda'">
    <div class="my-auto">
      <p class="mx-2 px-2">
        {{ messages.message }}
      </p>
      <div class="flex">
        <img :src="messages.imgUrl" class="flex w-48" />
      </div>
    </div>

    <p class="flex justify-center my-auto font-light text-sm text-slate-500">
      {{ getHours }}
    </p>
  </div>

  <div class="flex justify-end mt-2" v-if="messages.sender === 'anda'">
    <p class="flex justify-center my-auto font-light text-sm text-slate-500">
      {{ getHours }}
    </p>
    <div class="my-auto">
      <p class="mx-2 px-2">
        {{ messages.message }}
      </p>
      <div class="flex justify-end mx-3">
        <img :src="messages.imgUrl" style="width: 30%" />
      </div>
    </div>
    <p class="my-auto bg-slate-800 text-slate-100 px-2 py-1 rounded-full">
      Anda
    </p>
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { useChating } from "../stores/chating";
export default {
  data() {
    return {
      showDate: false,
    };
  },
  props: ["messages"],
  computed: {
    ...mapState(useChating, ["dateChat"]),
    getHours() {
      const date = new Date(this.messages.createdAt);
      return date.getHours() + ":" + date.getMinutes();
    },
    getDay() {
      const date = new Date(this.messages.createdAt);
      var dd = String(date.getDate()).padStart(2, "0");
      var mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = date.getFullYear();

      return mm + "/" + dd + "/" + yyyy;
    },
  },
  methods: {
    ...mapActions(useChating, ["setDateChat"]),
  },
  created() {
    console.log(this.getDay !== this.dateChat);
    if (this.getDay !== this.dateChat) {
      this.setDateChat(this.getDay);
      this.showDate = true;
    } else {
      this.showDate = false;
    }
  },
};
</script>
