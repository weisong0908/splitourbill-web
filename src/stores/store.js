import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		isUserLoggedIn: false,
		isUserOnSignUpPage: false,
		accessInfo: {
			accessToken: "",
			tokenType: "",
			scopes: []
		},
		userInfo: {
			id: "",
			username: "",
			firstName: "",
			lastName: ""
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
		logIn(state, accessInfo) {
			state.accessInfo.accessToken = accessInfo.access_token;
			state.accessInfo.tokenType = accessInfo.token_type;
			state.accessInfo.scopes = accessInfo.scope;
			state.isUserLoggedIn = true;
			state.isUserOnSignUpPage = false;
		},
		setUserInfo(state, userInfo) {
			state.userInfo.id = userInfo.sub;
			state.userInfo.username = userInfo.preferred_username;
			state.userInfo.firstName = userInfo.given_name;
			state.userInfo.lastName = userInfo.family_name;
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
