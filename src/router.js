import Vue from "vue";
import VueRouter from "vue-router";

import Dashboard from "./pages/Dashboard";
import TransactionDetail from "./pages/TransactionDetail";
import AddBill from "./pages/AddBill";
import EditBill from "./pages/EditBill";

Vue.use(VueRouter);

export default new VueRouter({
	routes: [
		{ name: "dashboard", path: "/dashboard", component: Dashboard },
		{ path: "/home", redirect: "dashboard" },
		{ name: "transactionDetail", path: "/detail/:id", component: TransactionDetail },
		{ name: "addBill", path: "/addbill", component: AddBill },
		{ name: "editBill", path: "/editbill", component: EditBill },
		{ path: "/", redirect: "dashboard" }
	]
});
