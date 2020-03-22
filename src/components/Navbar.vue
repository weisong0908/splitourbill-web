<template>
  <b-navbar :close-on-click="true" type="is-light">
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
          <b-dropdown-item v-for="(notification, index) in notifications" :key="index" paddingless>
            <div class="media navbar-item">
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
        <b-dropdown hoverable>
          <b-button slot="trigger" type="is-light" icon-left="account-circle">Account</b-button>
          <b-dropdown-item custom v-if="isUserLoggedIn">
            <small>
              Logged in as
              <br />
            </small>
            <b>{{displayName}}</b>
          </b-dropdown-item>
          <hr class="dropdown-divider" separator v-if="isUserLoggedIn" />
          <b-dropdown-item class="navbar-item" v-if="isUserLoggedIn">
            <b-icon icon="settings"></b-icon>
            <span>&nbsp;Preferences</span>
          </b-dropdown-item>
          <b-dropdown-item v-if="!$auth.loading" class="navbar-item" @click="logInOrOut">
            <b-icon :icon="isUserLoggedIn? 'logout':'login'"></b-icon>
            <span>&nbsp;{{isUserLoggedIn? "Log out":"Log in"}}</span>
          </b-dropdown-item>
        </b-dropdown>
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
      return this.$auth.isAuthenticated;
    },
    displayName() {
      return this.$store.state.userInfo.username;
    }
  },
  updated() {
    if (
      this.$auth.isAuthenticated &&
      this.$auth.user.sub &&
      this.$store.state.userInfo.id == ""
    )
      this.$store.commit("setUserInfo", this.$auth.user);
  },
  methods: {
    logInOrOut() {
      if (!this.$auth.isAuthenticated) {
        this.$auth.loginWithRedirect();
      } else {
        this.$auth.logout({
          returnTo: window.location.origin
        });
      }
    }
  }
};
</script>
