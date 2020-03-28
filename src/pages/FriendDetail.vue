<template>
  <page title="Friend detail">
    <p>User Id: {{friend.id}}</p>
    <p>User name: {{friend.username}}</p>
  </page>
</template>

<script>
import page from "../components/Page";
import userService from "../services/userService";

export default {
  components: {
    page
  },
  data() {
    return {
      friend: {}
    };
  },
  methods: {
    displayFriendDetail(userId) {
      userService.getUserInfo(userId).then(resp => {
        this.friend = { ...resp.data };
      });
    }
  },
  created() {
    this.displayFriendDetail(this.$route.params.userId);
  },
  beforeRouteUpdate() {
    this.displayFriendDetail(this.$route.params.userId);
  }
};
</script>