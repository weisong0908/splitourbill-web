<template>
    <b-modal :active="isAddFriendFormShown" has-modal-card :can-cancel="false">
        <div class="modal-card">
            <div class="modal-card-head">
                <p class="modal-card-title">Add new friend</p>
            </div>
            <div class="modal-card-body">
                <b-field label="Search users by username">
                    <b-input v-model="usernameFilter"></b-input>
                </b-field>
                <b-table :data="filteredUsers" per-page="5" paginated :selected.sync="selectedUser">
                    <template slot-scope="props">
                        <b-table-column label="Username" :searchable="true">{{props.row.username}}</b-table-column>
                    </template>
                </b-table>
            </div>
            <div class="modal-card-foot">
                <button class="button is-primary" @click="sendFriendRequest">Send friend request</button>
                <button class="button" @click="cancel">Cancel</button>
            </div>
        </div>
    </b-modal>
</template>

<script>
import userService from "../services/userService";
export default {
    data() {
        return {
            usernameFilter: "",
            users: [],
            selectedUser: {}
        };
    },
    computed: {
        isAddFriendFormShown() {
            return this.$store.state.isAddFriendFormShown;
        },
        filteredUsers() {
            return this.users.filter(u => {
                return u.username
                    .toLowerCase()
                    .includes(this.usernameFilter.toLowerCase());
            });
        }
    },
    methods: {
        sendFriendRequest() {
            userService
                .sendFriendRequest(
                    this.$store.state.userInfo.id,
                    this.selectedUser.id
                )
                .then(resp => {
                    this.$emit("friendRequestSent", this.selectedUser);
                })
                .catch(error => {
                    alert("error");
                    console.log(error);
                })
                .finally(() => {
                    this.$store.commit("toggleAddFriendForm", false);
                });
        },
        cancel() {
            this.$store.commit("toggleAddFriendForm", false);
        }
    },
    created() {
        userService.getUsers().then(resp => {
            this.users = [...resp.data];
        });
    }
};
</script>