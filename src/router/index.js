import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import HomeView from "../views/HomeView.vue";
import PostCategoryView from "../views/PostCategoryView.vue";
import ChatView from "../views/ChatView.vue";
import ChangePasswordView from "../views/ChangePasswordView.vue";
import ProfileView from "../views/ProfileView.vue";
import DetailPostView from "../views/DetailPostView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "/",
      component: HomeView,
    },
    {
      path: "/home",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/pngimages",
      name: "pngimages",
      component: PostCategoryView,
    },
    {
      path: "/background",
      name: "background",
      component: PostCategoryView,
    },
    {
      path: "/template",
      name: "template",
      component: PostCategoryView,
    },
    {
      path: "/message",
      name: "message",
      component: ChatView,
    },
    {
      path: "/changepassword",
      name: "changepassword",
      component: ChangePasswordView,
    },
    {
      path: "/myprofile",
      name: "myprofile",
      component: ProfileView,
    },
    {
      path: "/profile/:id",
      name: "profile",
      component: ProfileView,
    },
    {
      path: "/post/:id",
      name: "post",
      component: DetailPostView,
    },
  ],
});

export default router;
