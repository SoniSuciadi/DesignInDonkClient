import { defineStore } from "pinia";
import api from "../apis/api";

export const useChating = defineStore("chating", {
  state: () => ({
    allChatUser: [],
    selectedUserChat: null,
    dateChat: 0,
  }),
  actions: {
    setDateChat(date) {
      this.dateChat = date;
    },
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

    async setSelectedUserChat(id) {
      try {
        let response = await api.get("/chats/" + id, {
          headers: { access_token: localStorage.getItem("access_token") },
        });

        this.selectedUserChat = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async sendMessage(params) {
      let { pesan, image } = params;
      if (image) {
        pesan = null;
      }
      try {
        await api.post(
          "/chats",
          { id: this.selectedUserChat.member[0]._id, pesan, image },
          {
            headers: {
              access_token: localStorage.getItem("access_token"),
              "Content-Type": "multipart/form-data",
            },
          }
        );
        this.setSelectedUserChat(this.selectedUserChat.member[0]._id);
      } catch (error) {
        console.log(error);
      }
    },
    manipulateSelectedUser(params) {
      let { _id, fullName, imgUrl } = params;
      this.selectedUserChat = {
        member: [
          {
            _id,
            fullName,
            imgUrl,
          },
        ],
      };
    },
  },
});
