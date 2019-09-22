export default {
	/**
	 * @param {Object} loginInfo
	 * @param {String} loginInfo.username
	 * @param {String} loginInfo.password
	 * @returns {Promise} The userInfo with id, username
	 */
	authenticate(loginInfo) {
		let user = fakeUsers.filter(u => u.username == loginInfo.username)[0];

		return new Promise((resolve, reject) => {
			if (user) {
				const userInfo = {
					id: user.id,
					username: user.username
				};
				resolve({ data: userInfo });
			} else reject("user not found, wrong username and/or password.");
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
		let data = { ...userInfo };
		data.id = fakeUsers.length + 1;
		fakeUsers.push(data);
		return new Promise(resolve => {
			resolve({ data });
		});
	}
};

let fakeUsers = [
	{
		id: 1,
		username: "WS",
		password: "WS"
	},
	{
		id: 2,
		username: "User 2",
		password: "User 2"
	},
	{
		id: 3,
		username: "User 3",
		password: "User 3"
	},
	{
		id: 4,
		username: "User 4",
		password: "User 4"
	},
	{
		id: 5,
		username: "User 5",
		password: "User 5"
	}
];
