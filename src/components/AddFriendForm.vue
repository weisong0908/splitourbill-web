<template>
    <b-modal :active="isAddFriendFormShown" has-modal-card :can-cancel="false">
        <form @submit.prevent="sendFriendRequest">
            <div class="modal-card">
                <div class="modal-card-head">
                    <p class="modal-card-title">Add new friend</p>
                </div>
                <div class="modal-card-body">
                    <b-field label="Username">
                        <b-input v-model="username" required></b-input>
                    </b-field>
                </div>
                <div class="modal-card-foot">
                    <button class="button is-primary" type="submit">Request</button>
                    <button class="button" @click="cancel">Cancel</button>
                </div>
            </div>
        </form>
    </b-modal>
</template>

<script>
export default {
    data() {
        return {
            username: ""
        };
    },
    computed: {
        isAddFriendFormShown() {
            return this.$store.state.isAddFriendFormShown;
        }
    },
    methods: {
        sendFriendRequest() {
            this.$store.commit("toggleAddFriendForm", false);
            this.$emit("friendRequestSent");
        },
        cancel() {
            this.$store.commit("toggleAddFriendForm", false);
        }
    }
};
</script>