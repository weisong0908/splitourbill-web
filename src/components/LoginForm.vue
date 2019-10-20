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
                <p class="has-text-danger" v-if="loginErrorMessage">{{ loginErrorMessage }}</p>
            </div>
            <div class="modal-card-foot">
                <div class="buttons">
                    <b-button type="is-primary" @click="logIn">Log in</b-button>
                    <b-button @click="signUp">Sign up</b-button>
                </div>
            </div>
        </div>
    </b-modal>
</template>

<script>
import userService from "../services/userService";

export default {
    data() {
        return {
            show: !this.$store.state.isUserLoggedIn,
            username: "WS",
            password: "WS",
            loginErrorMessage: ""
        };
    },
    computed: {
        isLoginFormShown() {
            return (
                !this.$store.state.isUserLoggedIn &&
                !this.$store.state.isUserOnSignUpPage
            );
        }
    },
    methods: {
        logIn() {
            this.loginErrorMessage = "";

            userService
                .authenticate({
                    username: this.username,
                    password: this.password
                })
                .then(resp => {
                    this.$store.commit("logIn", resp.data);
                })
                .catch(error => {
                    if (!error.response) {
                        this.loginErrorMessage = "Network Error";
                    } else if (error.response.status == "404") {
                        this.loginErrorMessage = "Wrong username or password";
                    } else {
                        this.loginErrorMessage = error;
                    }
                });
        },
        signUp() {
            this.$router.push({ name: "signUp" });
        }
    },
    created() {
        if (!this.$store.state.isUserLoggedIn) {
            this.username = "WS";
            this.password = "WS";
            this.logIn();
        }
    }
};
</script>