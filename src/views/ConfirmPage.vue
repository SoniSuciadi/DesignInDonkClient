<template></template>
<script>
import { mapActions } from "pinia";
import Swal from "sweetalert2";
import { useUserStore } from "../stores/user";

export default {
  methods: {
    ...mapActions(useUserStore, ["activationAccount"]),
  },
  async created() {
    try {
      await this.activationAccount(this.$route.query.token);
      Swal.fire({
        icon: "success",
        title: "Activation",
        text: "You account active now",
        iconColor: "#0f182c",
        background: "#e2e8f0",
        backdrop: "swal2-backdrop-show",
        color: "#0f182c",
        confirmButtonColor: "#0f182c",
      });
      this.$router.push("/login");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Something wrong",
        iconColor: "#0f182c",
        background: "#e2e8f0",
        backdrop: "swal2-backdrop-show",
        color: "#0f182c",
        confirmButtonColor: "#0f182c",
      });
    }
  },
};
</script>
