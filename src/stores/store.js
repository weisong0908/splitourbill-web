import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		userInfo: {
			id: "",
			username: "",
			name: "",
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
		setUserInfo(state, user) {
			state.userInfo.id = user["http://localhost:8080/application_user_id"];
			state.userInfo.username = user.nickname;
			state.userInfo.name = user.name;
		},
		addNotification(state, notification) {
			state.notifications.unshift(notification);
		},
		toggleAddFriendForm(state, payload) {
			state.isAddFriendFormShown = payload;
		}
	}
});
