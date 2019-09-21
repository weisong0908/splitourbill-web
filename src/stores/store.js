import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		user: {
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
		addNotification(state, notification) {
			state.notifications.unshift(notification);
		}
	}
});
