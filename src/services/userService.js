import axios from "axios";
import qs from "qs";

export default {
	/**
	 * @param {Object} loginInfo
	 * @param {String} loginInfo.username
	 * @param {String} loginInfo.password
	 * @returns {Promise} The accessInfo including access token and token type
	 */
    authenticate(loginInfo) {
        // return axios.post(`${process.env.VUE_APP_GatewayApiUrl}/login`, loginInfo);
        const param = {
            client_id: process.env.VUE_APP_ClientId,
            client_secret: process.env.VUE_APP_ClientSecret,
            grant_type: "password",
            username: loginInfo.username,
            password: loginInfo.password
        };

        const config = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        };
        return axios.post(`${process.env.VUE_APP_IdentityServiceUrl}/connect/token`, qs.stringify(param), config);
    },

    /**
     * @param {string} accessToken
     * @returns {userInfo}
     */
    getCurrentUserInfo(accessToken) {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        };

        return axios.get(`${process.env.VUE_APP_IdentityServiceUrl}/connect/userinfo`, config);
    },

    /**
     * @returns {Promise} The list of all users
     */
    getUsers(accessToken) {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        };
        return axios.get(`${process.env.VUE_APP_GatewayApiUrl}/users`, config);
    },

	/**
	 * Send friend request to server
	 * @param {Guid} requestorId 
	 * @param {Guid} requesteeId 
	 */
    sendFriendRequest(requestorId, requesteeId) {
        const request = { requestorId, requesteeId };
        // console.log("request", request);
        return axios.post(`${process.env.VUE_APP_GatewayApiUrl}/friend`, {
            requestorId, requesteeId
        });
    },

	/**
	 * Get all friend requests
	 * @param {Guid} requesteeId 
	 */
    getFriendRequests(requesteeId) {
        return axios.get(`${process.env.VUE_APP_GatewayApiUrl}/friendRequests/${requesteeId}`);
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