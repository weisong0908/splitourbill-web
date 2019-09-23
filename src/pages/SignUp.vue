<template>
    <page title="Welcome, new user!" :subtitle="temp">
        <p>is form valid? {{isFormValid}}</p>
        <form action="submit" @submit="signUp">
            <b-field label="Email">
                <b-input v-model="email" type="email" required></b-input>
            </b-field>
            <b-field label="Username">
                <b-input v-model="username" required minlength="4" maxlength="50"></b-input>
            </b-field>
            <b-field label="Password">
                <b-input
                    v-model="password"
                    type="password"
                    required
                    minlength="8"
                    autocomplete="new-password"
                ></b-input>
            </b-field>
            <b-field label="Confirm password">
                <b-input
                    v-model="cofirmedPassword"
                    type="password"
                    required
                    :pattern="password"
                    validation-message="Passwords do not match"
                ></b-input>
            </b-field>
            <div class="buttons">
                <button class="button is-primary" type="submit">Sign up</button>
                <b-button type="is-primary" @click="cancel">Cancel</b-button>
            </div>
        </form>
    </page>
</template>

<script>
import page from "../components/Page";
import pageMixin from "../mixins/page";
import userService from "../services/userService";

export default {
    components: {
        page
    },
    mixins: [pageMixin],
    data() {
        return {
            email: "",
            username: "",
            password: "",
            cofirmedPassword: "",
            temp: "",
            isFormValid: ""
        };
    },
    methods: {
        signUp() {
            userService
                .addNewUser({
                    email: this.email,
                    username: this.username,
                    password: this.password
                })
                .then(resp => {
                    this.notify({
                        title: "Successfully signed up",
                        message: "Welcome, " + this.username + "!",
                        type: "is-success"
                    });
                    this.$store.commit("logIn", resp.data);
                    this.$router.push({ name: "dashboard" });
                });
        },
        cancel() {
            this.$router.push({ name: "dashboard" });
        }
    },
    created() {
        if (this.$store.state.isUserLoggedIn)
            this.$router.push({ name: "dashboard" });

        this.$store.commit("userIsOnSignUpPage", true);
    },
    beforeDestroy() {
        this.$store.commit("userIsOnSignUpPage", false);
    }
};
</script>