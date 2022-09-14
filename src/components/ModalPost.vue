<template>
  <div
    class="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
    id="ModalPost"
    tabindex="-1"
    aria-labelledby="exampleModalCenterTitle"
    aria-modal="true"
    role="dialog"
  >
    <div
      class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none"
    >
      <div
        class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current"
      >
        <div
          class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md"
        >
          <h5
            class="text-xl font-medium leading-normal text-slate-800"
            id="exampleModalScrollableLabel"
          >
            Add Posting
          </h5>
        </div>
        <div class="modal-body relative p-4">
          <form>
            <input
              v-model="post.title"
              class="w-full text-white px-4 py-3 mb-3 bg-slate-900 border border-white rounded-lg focus:outline-none focus:border-slate-400"
              type="text"
              placeholder="Title"
              required
            />
            <textarea
              v-model="post.description"
              class="w-full text-white px-4 py-3 mb-3 bg-slate-900 border border-white rounded-lg focus:outline-none focus:border-slate-400"
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="Description"
            ></textarea>
            <input
              @change="setImage"
              class="w-full mb-3 flex text-white px-4 py-3 bg-slate-900 border border-white rounded-lg focus:outline-none focus:border-slate-400"
              type="file"
              id="formFile"
              placeholder="Image File"
            />

            <select
              v-model="post.category"
              @change.prevent="setSubcategory"
              class="w-full flex text-white px-4 py-3 mb-3 bg-slate-900 border border-white rounded-lg focus:outline-none focus:border-slate-400"
              aria-label="Default select example"
            >
              <option disabled selected>Select One Category</option>
              <option value="PNG Images">PNG Images</option>
              <option value="Background">Background</option>
              <option value="Template">Template</option>
            </select>
            <select
              v-model="post.subCategory"
              class="w-full flex text-white px-4 mb-3 py-3 bg-slate-900 border border-white rounded-lg focus:outline-none focus:border-slate-400"
              aria-label="Default select example"
            >
              <option disabled selected>Select One SubCategory</option>
              <option
                v-for="(subCate, i) in this.getSubcategory"
                :key="i"
                :value="subCate"
              >
                {{ subCate }}
              </option>
            </select>

            <button
              type="submit"
              @click.prevent="handleUpload()"
              class="bg-slate-800 mt-5 hover:bg-slate-700 text-slate-100 p-3 rounded-lg font-semibold cursor-pointer"
              data-bs-dismiss="modal"
            >
              Post !!!
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
  <LoadingAnimate v-if="loading" />
</template>
<script>
import { mapActions, mapState } from "pinia";
import { usePostStore } from "../stores/post";
import { useCategoryStore } from "../stores/category";
import { useUserStore } from "../stores/user";
import { useLoadingStore } from "../stores/loading";
import Swal from "sweetalert2";
import LoadingAnimate from "./LoadingAnimate.vue";
export default {
  data() {
    return {
      post: {
        title: "",
        description: "",
        image: "",
        category: "",
        subCategory: "",
      },
    };
  },
  computed: {
    ...mapState(useLoadingStore, ["loading"]),
    ...mapState(useCategoryStore, ["category"]),
    getSubcategory() {
      if (this.category.length) {
        return this.category[0].subCategory;
      } else {
        return [];
      }
    },
  },
  methods: {
    ...mapActions(useLoadingStore, ["setLoading"]),
    ...mapActions(useUserStore, ["getUserData"]),
    ...mapActions(useCategoryStore, ["getCategory"]),
    ...mapActions(usePostStore, ["addPosting"]),
    setImage(e) {
      this.post.image = e.target.files[0];
    },
    async handleUpload() {
      try {
        this.setLoading(true);
        await this.addPosting(this.post);
        Swal.fire({
          icon: "success",
          title: "Success added your posting",
          text: "",
          iconColor: "#0f182c",
          background: "#e2e8f0",
          backdrop: "swal2-backdrop-show",
          color: "#0f182c",
          confirmButtonColor: "#0f182c",
        });
        this.getUserData(localStorage.getItem("id"));
        this.post.title = "";
        this.post.description = "";
        this.post.image = "";
        this.post.subCategory = "";
        this.post.category = "";
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Something Wrong please post again :(",
          text: "",
          iconColor: "#0f182c",
          background: "#e2e8f0",
          backdrop: "swal2-backdrop-show",
          color: "#0f182c",
          confirmButtonColor: "#0f182c",
        });
        console.log(error);
      }
      this.setLoading(false);
    },
    setSubcategory() {
      this.getCategory(this.post.category);
    },
  },
  created() {
    this.getCategory("PNG Images");
  },
  components: { LoadingAnimate },
};
</script>
