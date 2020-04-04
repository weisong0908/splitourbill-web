<template>
  <page title="Split Our Bill">
    <p>Hi, this is the homepage, click login to begin</p>
    <b-button @click="login">
      <span>{{ isUserLoggedIn ? "Log out" : "Log in" }}</span>
    </b-button>
  </page>
</template>

<script>
import page from "../components/Page";
import authService from "../services/authService";
import userService from "../services/userService";

export default {
  components: { page },
  computed: {
    isUserLoggedIn() {
      return this.$auth.isAuthenticated;
    }
  },
  methods: {
    async login() {
      if (!this.$auth.isAuthenticated) {
        await authService.login(this.$auth);
        this.updateNotification();
        this.$router.push({ name: "dashboard" });
      } else {
        authService.logout(this.$auth);
      }
    },
    updateNotification() {
      userService
        .getFriendRequests(this.$store.state.userInfo.id)
        .then((resp) => {
          resp.data.forEach((item) => {
            this.$store.commit("addNotification", {
              id: item.id,
              title: "Pending friend request",
              message: `${item.requestor.username}`,
              type: "success"
            });
          });
        });
    }
  }
};
</script>
