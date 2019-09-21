import Vue from "vue";
import Vuex from "vuex";
import { stat } from "fs";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		isUserLoggedIn: false,
		userInfo: {
			id: 1,
			username: "WS"
		},
		notifications: [
			{
				title: "Bill added",
				message: "A bill was added",
				type: "success"
			},
			{
				title: "Bill added",
				message: "A bill was added",
				type: "success"
			},
			{
				title: "Bill added",
				message: "A bill was added",
				type: "failure"
			}
		]
	},
	mutations: {
		logIn(state, userInfo) {
			state.userInfo = userInfo;
			state.isUserLoggedIn = true;
		},
		logOut(state) {
			state.userInfo = {};
			state.isUserLoggedIn = false;
		},
		addNotification(state, notification) {
			state.notifications.unshift(notification);
		}
	}
});
