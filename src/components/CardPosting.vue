<template>
  <a href="" class="flex justify-center group m-1">
    <div class="rounded-lg shadow-lg bg-white max-w-sm">
      <a @click.prevent="handleDetail(post._id)">
        <img
          class="rounded-t-lg p-4 group-hover:-mt-7"
          :src="post.imgUrl"
          alt=""
        />
      </a>
      <div class="px-1">
        <p class="text-slate-900 text-x text-center mb-2 font-bold">
          {{ post.title }}
        </p>
        <p
          class="text-slate-900 text-x text-center mb-2 invisible group-hover:visible"
        >
          {{ post.description }}
        </p>
      </div>
    </div>
  </a>
</template>
<script>
export default {
  props: ["post"],
  methods: {
    handleDetail(id) {
      this.$router.push("/post/" + id);
    },
  },
};
</script>
