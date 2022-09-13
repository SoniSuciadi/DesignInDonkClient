<template>
  <div class="flex mt-2" v-if="messages.sender !== 'anda'">
    <div class="my-auto">
      <p class="mx-2 px-2">
        {{ messages.message }}
      </p>
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
    </div>
    <p class="my-auto bg-slate-800 text-slate-100 px-2 py-1 rounded-full">
      Anda
    </p>
  </div>
</template>
<script>
export default {
  props: ["messages"],
  computed: {
    getHours() {
      const date = new Date(this.messages.createdAt);
      return date.getHours() + ":" + date.getMinutes();
    },
  },
};
</script>
