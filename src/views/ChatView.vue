<template>
  <NavBar />
  <div class="grid flex mt-10 md:mx-8 grid-cols-12">
    <ListPerson :allChatUser="allChatUser" />

    <div class="inline border col-span-9" v-if="selectedUserChat">
      <div class="h-12 bg-slate-900 flex">
        <p class="flex my-auto text-slate-200 font-bold ml-4">
          {{ getname }}
        </p>
      </div>
      <div
        class="col-row-10 overflow-y-auto bg-slate-100 p-3"
        style="height: 38rem"
      >
        <ChatBox
          v-for="(messages, i) in selectedUserChat.messages"
          :key="i"
          :messages="messages"
        />
      </div>

      <div class="bg-slate-100-0 p-1">
        <FieldMessage />
      </div>
    </div>
  </div>
  <LoadingAnimate v-if="loading" />
</template>
<script>
import NavBar from "../components/NavBar.vue";
import ListPerson from "../components/ListPerson.vue";
import FieldMessage from "../components/FieldMessage.vue";
import { mapActions, mapState } from "pinia";
import { useLoadingStore } from "../stores/loading";

import { useChating } from "../stores/chating";
import ChatBox from "../components/ChatBox.vue";
import LoadingAnimate from "../components/LoadingAnimate.vue";
export default {
  components: { NavBar, ListPerson, FieldMessage, ChatBox, LoadingAnimate },
  methods: {
    ...mapActions(useChating, ["getAllUserChat"]),
    ...mapActions(useLoadingStore, ["setLoading"]),
  },
  computed: {
    ...mapState(useLoadingStore, ["loading"]),
    ...mapState(useChating, ["allChatUser", "selectedUserChat"]),
    getname() {
      if (!this.selectedUserChat) {
        return "";
      } else {
        return this.selectedUserChat.member[0].fullName;
      }
    },
  },
  created() {
    this.setLoading(true);
    this.getAllUserChat();
    this.setLoading(false);
  },
};
</script>
