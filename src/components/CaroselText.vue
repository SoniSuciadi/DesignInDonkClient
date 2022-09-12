<template>
  <div class="flex-col self-center p-3 order-2 sm:order-1 md:order-1">
    <h3 class="text-center font-bold text-2xl my-6">{{ title }}</h3>
    <p>{{ description }}</p>
    <div class="">
      <button
        type="submit"
        @click.prevent="goToPath"
        class="flex mx-auto bg-slate-800 mt-5 hover:bg-slate-700 text-slate-100 p-3 rounded-lg font-semibold cursor-pointer"
      >
        See more
      </button>
    </div>
  </div>
</template>
<script>
export default {
  props: ["title", "description"],
  methods: {
    goToPath() {
      console.log("first");
      this.$router.push("/" + this.title.toLowerCase().split(" ").join(""));
    },
  },
};
</script>
