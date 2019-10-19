import axios from "axios";

export default {
	/**
	 * @param {Object} loginInfo
	 * @param {String} loginInfo.username
	 * @param {String} loginInfo.password
	 * @returns {Promise} The userInfo with id, username
	 */
    authenticate(loginInfo) {
        return axios.post("http://localhost:5000/login", loginInfo);
    },

	/**
	 * @param {Object} userInfo
	 * @param {String} userInfo.username
	 * @param {String} userInfo.email
	 * @param {String} userInfo.password
	 * @returns {Promise} The userInfo with id, username
	 */
    addNewUser(userInfo) {
        return axios.post("http://localhost:5000/signup", userInfo);
    },

	/**
	 * @returns {Promise} The list of friends
	 */
    getFriends() {
        return axios.get("http://localhost:5000/friends");
    },

	/**
	 *
	 * @param {Number} userId
	 * @returns {Promise} Friend
	 */
    getFriend(userId) {
        return axios.get(`http://localhost:5000/friend/${userId}`);
    }
};