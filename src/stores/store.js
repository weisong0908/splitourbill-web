import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		isUserLoggedIn: false,
		isUserOnSignUpPage: false,
		userInfo: {
			id: "",
			username: ""
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
		],
		isAddFriendFormShown: false
	},
	mutations: {
		logIn(state, userInfo) {
			state.userInfo = userInfo;
			state.isUserLoggedIn = true;
			state.isUserOnSignUpPage = false;
		},
		logOut(state) {
			state.userInfo = {};
			state.isUserLoggedIn = false;
		},
		addNotification(state, notification) {
			state.notifications.unshift(notification);
		},
		userIsOnSignUpPage(state, payload) {
			state.isUserOnSignUpPage = payload;
		},
		toggleAddFriendForm(state, payload) {
			state.isAddFriendFormShown = payload;
		}
	}
});
