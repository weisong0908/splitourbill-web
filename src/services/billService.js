import axios from "axios";

export default {
	addBill(bill) {
		// let data = { ...bill };
		// data.id = fakeBills.length + 1;
		// fakeBills.push(data);

		// return new Promise(resolve => {
		// 	resolve();
		// });

		return axios.post("http://localhost:5000/bill", bill);
	},

	getBill(id) {
		return axios.get(`http://localhost:5000/bill/${id}`);
	},

	getBills(count) {
		return axios.get(`http://localhost:5000/bills/${count}`);
	}
};

let fakeBills = [
	{
		id: 1,
		requestor: { id: 1, username: "User 1" },
		dateTime: new Date(),
		purpose: "Dinner",
		remarks: "nothing",
		totalAmount: 60,
		requests: [
			{
				user: { id: 2, username: "User 2" },
				amount: 10
			},
			{
				user: { id: 3, username: "User 3" },
				amount: 20
			},
			{
				user: { id: 4, username: "User 4" },
				amount: 30
			}
		]
	}
];
