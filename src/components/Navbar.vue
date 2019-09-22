<template>
    <b-navbar>
        <template slot="brand">
            <b-navbar-item href="/">
                <img
                    src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
                    alt="Lightweight UI components for Vue.js based on Bulma"
                />
            </b-navbar-item>
        </template>

        <template slot="start">
            <b-navbar-item
                tag="router-link"
                v-for="page in pages"
                :key="page.title"
                :to="page.path"
            >{{ page.title }}</b-navbar-item>
        </template>

        <template slot="end">
            <b-navbar-item tag="div">
                <b-dropdown hoverable>
                    <b-button
                        :type="notificationButtonType"
                        slot="trigger"
                        icon-left="bell"
                        size="is-small"
                        rounded
                    >{{notifications.length}}</b-button>
                    <b-dropdown-item v-for="(notification, index) in notifications" :key="index">
                        <div class="media">
                            <b-icon
                                class="media-left"
                                :icon="notification.type=='is-success'? 'check-circle-outline':'close-circle-outline'"
                            ></b-icon>
                            <div class="media-content">
                                <h3>{{notification.title}}</h3>
                                <small>{{notification.message}}</small>
                            </div>
                        </div>
                    </b-dropdown-item>
                </b-dropdown>
            </b-navbar-item>
            <b-navbar-item tag="div">
                <div class="buttons">
                    <a class="button is-light" v-if="!isUserLoggedIn" @click="signUp">
                        <strong>Sign up</strong>
                    </a>
                    <a
                        class="button is-light"
                        @click="logInOrOut"
                    >{{isUserLoggedIn? "Log out":"Log in"}}</a>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>
export default {
    props: ["pages"],
    data() {
        return {
            notifications: this.$store.state.notifications
        };
    },
    computed: {
        notificationButtonType() {
            return this.notifications.length == 0 ? "is-light" : "is-warning";
        },
        isUserLoggedIn() {
            return this.$store.state.isUserLoggedIn;
        }
    },
    methods: {
        logInOrOut() {
            if (this.isUserLoggedIn) {
                this.$store.commit("logOut");
            }
        },
        signUp() {
            this.$router.push({ name: "signUp" });
        }
    }
};
</script>
