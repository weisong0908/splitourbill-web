import Vue from "vue";
import VueRouter from "vue-router";

import Dashboard from "./pages/Dashboard";
import TransactionDetail from "./pages/TransactionDetail";
import Bill from "./pages/Bill";
import Friends from "./pages/Friends";
import FriendDetail from "./pages/FriendDetail";

import { authGuard } from "./auth/authGuard";

Vue.use(VueRouter);

const router = new VueRouter({
	routes: [
		{ name: "dashboard", path: "/dashboard", component: Dashboard, beforeEnter: authGuard },
		{ path: "/home", redirect: "dashboard", beforeEnter: authGuard },
		{ name: "transactionDetail", path: "/detail/:transactionCode", component: TransactionDetail, beforeEnter: authGuard },
		{ name: "addBill", path: "/bill", component: Bill, beforeEnter: authGuard },
		{ name: "editBill", path: "/bill/:id", component: Bill, beforeEnter: authGuard },
		{ name: "friends", path: "/friends", component: Friends, beforeEnter: authGuard },
		{ name: "friendDetail", path: "/friend/:userId", component: FriendDetail, beforeEnter: authGuard },
		{ path: "/", redirect: "dashboard", beforeEnter: authGuard }
	]
});

export default router;