import { defineStore } from "pinia";
import api from "../apis/api";

export const useUserStore = defineStore("user", {
  state: () => ({
    name: "",
    imgUrl: "",
    userData: [],
  }),
  actions: {
    setname(name) {
      this.name = name;
    },
    setimgUrl(imgUrl) {
      this.imgUrl = imgUrl;
    },
    login(user) {
      let { email, password } = user;
      return api.post("/user/login", {
        email,
        password,
      });
    },
    activationAccount(token) {
      return api.get("/user/confirm?token=" + token);
    },
    register(user) {
      let { fullName, email, password } = user;
      return api.post("/user/register", {
        email,
        fullName,
        password,
      });
    },
    loginGoogle(google_token) {
      return api.post("/user/login-google", {
        google_token,
      });
    },
    forgotPassword(email) {
      return api.get("/user/forgot?email=" + email);
    },
    submitChangePassword(token, newPassword) {
      return api.patch(
        "/user",
        { newPassword },
        { headers: { access_token: token } }
      );
    },
    async getUserData(id) {
      try {
        let user = await api.get("posts/user/" + id);
        this.userData = user.data.selectedUser;
      } catch (error) {
        console.log(error);
      }
    },
    updateUserData(params) {
      let { fullName, phoneNumber, image } = params;
      return api.put(
        "/user",
        {
          fullName,
          phoneNumber,
          image,
        },
        {
          headers: {
            access_token: localStorage.getItem("access_token"),
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
  },
});
