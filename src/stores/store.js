import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {
      id: "",
      username: "",
      name: ""
    },
    notifications: [
      {
        id: "",
        title: "Bill added",
        message: "A bill was added",
        type: "failure"
      }
    ],
    isAddFriendFormShown: false,
    isBillSharersFormShown: false
  },
  mutations: {
    setUserInfo(state, user) {
      state.userInfo.id = user["http://localhost:8080/application_user_id"];
      state.userInfo.username = user.nickname;
      state.userInfo.name = user.name;
    },
    addNotification(state, notification) {
      if (!state.notifications.find((n) => n.id == notification.id))
        state.notifications.unshift(notification);
    },
    toggleAddFriendForm(state, payload) {
      state.isAddFriendFormShown = payload;
    },
    toggleBillSharersForm(state, payload) {
      state.isBillSharersFormShown = payload;
    }
  }
});
