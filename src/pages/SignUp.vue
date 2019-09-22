<template>
    <page title="Welcome, new user!" :subtitle="temp">
        <section>
            <b-field label="Email">
                <b-input v-model="email" type="email" required></b-input>
            </b-field>
            <b-field label="Username">
                <b-input v-model="username" required></b-input>
            </b-field>
            <b-field label="Password">
                <b-input v-model="password" type="password" required></b-input>
            </b-field>
            <b-field label="Confirm password">
                <b-input v-model="cofirmedPassword" type="password" required></b-input>
            </b-field>
            <div class="buttons">
                <b-button type="is-primary" @click="signUp">Sign Up</b-button>
                <b-button type="is-primary" @click="cancel">Cancel</b-button>
            </div>
        </section>
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
            temp: ""
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