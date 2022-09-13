<template>
  <ul class="rounded-lg shadow-md col-span-3 bg-slate-100">
    <li class="bg-slate-600 shadow-md">
      <p
        class="flex items-center mx-auto font-bold md:text-2xl sm:text-x py-4 px-6 h-12 text-slate-100 transition duration-300 ease-in-out"
        href="#!"
        data-mdb-ripple="true"
        data-mdb-ripple-color="dark"
      >
        <i class="fa-solid fa-user text-slate-100 mr-2"></i>
        Person
      </p>
    </li>
    <li class="" v-for="(user, i) in allChatUser" :key="i">
      <a
        @click.prevent="setSelectedUserChat(user.member[0]._id)"
        class="flex items-center text-sm py-4 px-6 h-12 text-slate-700 rounded hover:text-slate-100 hover:bg-slate-900 transition duration-300 ease-in-out"
        href="#!"
        >{{ user.member[0].fullName   }}</a
      >
    </li>
  </ul>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { useChating } from "../stores/chating";
export default {
  props: ["allChatUser"],
  methods: {
    ...mapActions(useChating, ["setSelectedUserChat"]),
  },
  computed: {
    ...mapState(useChating, ["selectedUserChat"]),
  },
  created() {},
};
</script>
