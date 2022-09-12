import { defineStore } from "pinia";
import api from "../apis/api";

export const usePostStore = defineStore("post", {
  state: () => ({
    postPNGImages: [],
    postBackgroud: [],
    postTemplate: [],
    showPostSelect: [],
    detailPost: {},
    page: "",
    search: "",
    subCategory: "",
    count: 0,
    skip: 0,
  }),
  actions: {
    setshowPostSelect(content) {
      this.showPostSelect = content;
    },
    setPostPNGImages(content) {
      this.postPNGImages = content;
    },
    setpage(page) {
      this.page = page;
      this.readPost();
    },
    setSearch(search) {
      this.search = search;
      this.readPost();
    },
    setSubCategory(subCategory) {
      this.subCategory = subCategory;
      this.readPost();
    },
    setskip(skip) {
      this.skip = +skip;
      this.readPost();
    },
    setPostBackground(content) {
      this.postBackgroud = content;
    },
    setPostTemplate(content) {
      this.postTemplate = content;
    },
    async readPost() {
      let post = await api.get("/posts", {
        params: {
          search: this.search,
          subCategory: this.subCategory,
          category: this.page,
          skip: this.skip,
        },
      });
      this.postCount();
      this.showPostSelect = post.data.posts;
    },
    readPostHome(category) {
      return api.get("/posts", {
        params: {
          category,
        },
      });
    },
    async postCount() {
      try {
        let count = await api.get("/posts/count", {
          params: {
            search: this.search,
            subCategory: this.subCategory,
            category: this.page,
            skip: this.skip,
          },
        });
        this.count = count.data.countPost;
      } catch (error) {
        console.log(error);
      }
    },
    addPosting(params) {
      let { title, description, image, category, subCategory } = params;
      return api.post(
        "/posts",
        {
          title,
          description,
          image,
          category,
          subCategory,
        },
        {
          headers: {
            access_token: localStorage.getItem("access_token"),
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
    async getPostDetail(id) {
      try {
        let response = await api.get(`/posts/${id}`);
        this.detailPost = response.data.post;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
