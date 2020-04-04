<template>
  <page title="Friends" subtitle="Users that you can interact with">
    <add-friend-form
      @friendRequestSent="notifyFriendRequestSent"
    ></add-friend-form>
    <b-table :data="friends">
      <template slot-scope="props">
        <b-table-column label="Usernames">{{
          props.row.username
        }}</b-table-column>
        <b-table-column label="Action">
          <b-button
            type="is-primary"
            inverted
            tag="router-link"
            :to="'friend/' + props.row.id"
            >Detail</b-button
          >
        </b-table-column>
      </template>
    </b-table>
    <div class="buttons">
      <b-button type="is-primary" @click="showAddFriendForm"
        >Add friend</b-button
      >
    </div>
  </page>
</template>

<script>
import Page from "../components/Page";
import AddFriendForm from "../components/AddFriendForm";
import userService from "../services/userService";
import pageMixin from "../mixins/page";

export default {
  components: {
    Page,
    AddFriendForm
  },
  mixins: [pageMixin],
  data() {
    return {
      friends: []
    };
  },
  methods: {
    showAddFriendForm() {
      this.$store.commit("toggleAddFriendForm", true);
    },
    notifyFriendRequestSent(selectedUser) {
      console.log(selectedUser);
      this.notify({
        title: `Friend request sent to ${selectedUser.username}`,
        message: "A new friend request was sent",
        type: "is-success"
      });
    }
  },
  created() {
    userService.getUserInfo(this.$store.state.userInfo.id).then((resp) => {
      this.friends = [...resp.data.friends];
    });
  }
};
</script>
