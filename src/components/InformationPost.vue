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
              <p class="hidden md:flex font-bold my-auto ml-2 font-sans">
                {{ detailPost.fullNameuserCreate }}
              </p></a
            >
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {},
  props: ["detailPost"],
};
</script>
