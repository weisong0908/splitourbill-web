<template>
    <b-modal :active="isLoginFormShown" has-modal-card :can-cancel="false">
        <div class="modal-card">
            <div class="modal-card-head">
                <p class="modal-card-title">Please login to proceed</p>
            </div>
            <div class="modal-card-body">
                <b-field label="Username">
                    <b-input v-model="username" required></b-input>
                </b-field>
                <b-field label="Password">
                    <b-input v-model="password" type="password" required></b-input>
                </b-field>
            </div>
            <div class="modal-card-foot">
                <b-button type="is-primary" @click="login">Log in</b-button>
                <b-button>Sign up</b-button>
            </div>
        </div>
    </b-modal>
</template>

<script>
export default {
    data() {
        return {
            show: !this.$store.state.isUserLoggedIn,
            username: "ws",
            password: "ws"
        };
    },
    computed: {
        isLoginFormShown() {
            return !this.$store.state.isUserLoggedIn;
        }
    },
    methods: {
        login() {
            let userInfo = {
                id: 1,
                username: "WS"
            };

            this.$store.commit("logIn", userInfo);
        }
    }
};
</script>