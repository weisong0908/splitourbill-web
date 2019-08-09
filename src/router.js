import Vue from "vue";
import VueRouter from "vue-router";

import Dashboard from "./pages/Dashboard";

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        { name: "dashboard", path: "/dashboard", component: Dashboard }
    ]
})