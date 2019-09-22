import Vue from "vue";
import VueRouter from "vue-router";

import Dashboard from "./pages/Dashboard";
import TransactionDetail from "./pages/TransactionDetail";
import Bill from "./pages/Bill";
import SignUp from "./pages/SignUp";

Vue.use(VueRouter);

export default new VueRouter({
	routes: [
		{ name: "dashboard", path: "/dashboard", component: Dashboard },
		{ path: "/home", redirect: "dashboard" },
		{ name: "transactionDetail", path: "/detail/:transactionCode", component: TransactionDetail },
		{ name: "addBill", path: "/bill", component: Bill },
		{ name: "editBill", path: "/bill/:id", component: Bill },
		{ name: "signUp", path: "/signup", component: SignUp },
		{ path: "/", redirect: "dashboard" }
	]
});
