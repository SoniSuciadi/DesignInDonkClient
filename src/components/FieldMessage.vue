<template>
  <div class="flex items-center py-1 px-3 rounded-lg dark:bg-gray-700">
    <label
      for="dropzone-file"
      class="flex flex-col justify-center items-center bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
    >
      <div
        class="inline-flex justify-center p-2 rounded-full cursor-pointer hover:bg-slate-100 group"
      >
        <i
          class="fa-solid fa-image text-slate-100 group-hover:text-slate-900"
        ></i>
      </div>
      <input id="dropzone-file" type="file" class="hidden" @change="setImage" />
    </label>

    <textarea
      v-model="pesan"
      :disabled="image"
      id="chat"
      rows="1"
      class="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Your message..."
    ></textarea>
    <button
      @click.prevent="handleSendMessage"
      type="submit"
      class="inline-flex justify-center p-2 rounded-full cursor-pointer hover:bg-slate-100 group"
    >
      <i
        class="fa-solid fa-share-from-square fa-2 text-slate-100 group-hover:text-slate-900"
      ></i>
    </button>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useChating } from "../stores/chating";
import { io } from "socket.io-client";
const socket = io("http://localhost:3000", {
  transports: ["websocket"],
});

export default {
  data() {
    return {
      pesan: "",
      image: "",
      chat: [],
    };
  },
  computed: {
    ...mapState(useChating, ["selectedUserChat"]),
  },
  methods: {
    ...mapActions(useChating, ["sendMessage", "setSelectedUserChat"]),
    setImage(e) {
      this.image = e.target.files[0];
      this.pesan = e.target.files[0].name;
    },
    async handleSendMessage() {
      await this.sendMessage({ pesan: this.pesan, image: this.image });
      socket.emit("chat message", {
        idsend: localStorage.getItem("id"),
        idreceive: this.selectedUserChat.member[0]._id,
        message: this.pesan,
      });
      this.pesan = "";
    },
  },
  mounted() {
    // declare first from pinia
    const setSelectedUserChat = this.setSelectedUserChat;

    socket.on("connect", () => {
      // console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    });

    socket.on("chat message", function (sender) {
      let { idsend, idreceive, message } = sender;

      if (idreceive == localStorage.getItem("id")) {
        setSelectedUserChat(idsend);
      } else {
        console.log("ok");
      }
    });
  },
};
</script>
