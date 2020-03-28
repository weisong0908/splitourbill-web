import axios from "axios";
import { getInstance } from "../auth/index";


export default {
    /**
     * @returns {Promise} The list of all users
     */
    async getUsers() {
        const authService = getInstance();
        const accessToken = await authService.getTokenSilently();
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        };
        return axios.get(`${process.env.VUE_APP_Backend}/users`, config);
    },

	/**
	 * Send friend request to server
	 * @param {Guid} requestorId 
	 * @param {Guid} requesteeId 
	 */
    async sendFriendRequest(requestorId, requesteeId) {
        const authService = getInstance();
        const accessToken = await authService.getTokenSilently();
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        };
        return axios.post(`${process.env.VUE_APP_Backend}/friendships`, {
            requestorId, requesteeId
        }, config);
    },

	/**
	 * Get all friend requests
	 * @param {Guid} requesteeId 
	 */
    async getFriendRequests(requesteeId) {
        const authService = getInstance();
        const accessToken = await authService.getTokenSilently();
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        };
        return axios.get(`${process.env.VUE_APP_Backend}/friendships/requests/${requesteeId}`, config);
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