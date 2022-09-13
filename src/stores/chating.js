import { defineStore } from "pinia";
import api from "../apis/api";

export const useChating = defineStore("chating", {
  state: () => ({
    allChatUser: [],
    selectedUserChat: {},
    socketState: null,
  }),
  actions: {
    async getAllUserChat() {
      try {
        let response = await api.get("/chats", {
          headers: { access_token: localStorage.getItem("access_token") },
        });
        this.allChatUser = response.data;
      } catch (error) {
        console.log(err);
      }
    },
    addChat(obj) {
      console.log(obj);
      this.selectedUserChat.messages.push(obj);
    },
    async setSelectedUserChat(id) {
      console.log("from pinia", id);
      try {
        let response = await api.get("/chats/" + id, {
          headers: { access_token: localStorage.getItem("access_token") },
        });

        console.log(response.data);
        this.selectedUserChat = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async sendMessage(pesan) {
      try {
        await api.post(
          "/chats",
          { id: this.selectedUserChat.member[0]._id, pesan },
          {
            headers: { access_token: localStorage.getItem("access_token") },
          }
        );
        this.setSelectedUserChat(this.selectedUserChat.member[0]._id);
      } catch (error) {
        console.log(error);
      }
    },
    async testingSomething() {
      console.log("first");

      return "kita coba ini dari pinia";
    },
  },
});
