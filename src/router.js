import Vue from "vue";
import VueRouter from "vue-router";

import Dashboard from "./pages/Dashboard";
import TransactionDetail from "./pages/TransactionDetail";
import Bill from "./pages/Bill";
import Friends from "./pages/Friends";
import FriendDetail from "./pages/FriendDetail";

import { getInstance } from "./auth/index";
import store from "./stores/store";

Vue.use(VueRouter);

const authGuard = (to, from, next) => {
	const authService = getInstance();
	const fn = async () => {
		// If the user is authenticated, continue with the route
		if (authService.isAuthenticated) {
			return next();
		}

		// Otherwise, log in
		await authService.loginWithPopup();
		store.commit("setUserInfo", authService.user);
		return next();
	};

	// If loading has already finished, check our auth state using `fn()`
	if (!authService.loading) {
		return fn();
	}

	// Watch for the loading property to change before we check isAuthenticated
	authService.$watch("loading", loading => {
		if (loading === false) {
			return fn();
		}
	});
};

const router = new VueRouter({
	routes: [
		{ name: "dashboard", path: "/dashboard", component: Dashboard },
		{ path: "/home", redirect: "dashboard" },
		{ name: "transactionDetail", path: "/detail/:transactionCode", component: TransactionDetail },
		{ name: "addBill", path: "/bill", component: Bill },
		{ name: "editBill", path: "/bill/:id", component: Bill },
		{ name: "friends", path: "/friends", component: Friends },
		{ name: "friendDetail", path: "/friend/:userId", component: FriendDetail },
		{ path: "/", redirect: "dashboard" }
	]
});



export default router;