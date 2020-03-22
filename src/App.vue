<template>
  <div id="app">
    <navbar :pages="pages"></navbar>
    <router-view :key="$route.fullPath"></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default {
  components: {
    Navbar,
    AppFooter: Footer
  },
  data() {
    return {
      pages: [
        { title: "Dashboard", path: "/dashboard" },
        { title: "Add bill", path: "/bill" },
        { title: "Friends", path: "/friends" }
      ]
    };
  }
};
</script>
