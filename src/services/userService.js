import axios from "axios";

export default {
	/**
	 * @param {Object} loginInfo
	 * @param {String} loginInfo.username
	 * @param {String} loginInfo.password
	 * @returns {Promise} The userInfo with id, username
	 */
    authenticate(loginInfo) {
        return axios.post(`${process.env.VUE_APP_GatewayApiUrl}/login`, loginInfo);
    },

    /**
     * @returns {Promise} The list of all users
     */
    getUsers() {
        return axios.get(`${process.env.VUE_APP_GatewayApiUrl}/users`);
    },


    sendFriendRequest(requestorId, requesteeId) {
        const request = { requestorId, requesteeId };
        console.log("request", request);
        return axios.post(`${process.env.VUE_APP_GatewayApiUrl}/friend`, {
            requestorId, requesteeId
        });
    },

	/**
	 * @param {Object} userInfo
	 * @param {String} userInfo.username
	 * @param {String} userInfo.email
	 * @param {String} userInfo.password
	 * @returns {Promise} The userInfo with id, username
	 */
    addNewUser(userInfo) {
        return axios.post(`${process.env.VUE_APP_GatewayApiUrl}/signup`, userInfo);
    },

	/**
	 * @returns {Promise} The list of friends
	 */
    getFriends() {
        return axios.get(`${process.env.VUE_APP_GatewayApiUrl}/friends`);
    },

	/**
	 *
	 * @param {Number} userId
	 * @returns {Promise} Friend
	 */
    getFriend(userId) {
        return axios.get(`${process.env.VUE_APP_GatewayApiUrl}/friend/${userId}`);
    }
};