export default {
	addBill(bill) {
		let data = { ...bill };
		data.id = fakeBills.length + 1;
		fakeBills.push(data);

		return new Promise(resolve => {
			resolve();
		});
	},

	getBill(id) {
		let bill = fakeBills.filter(b => b.id == id)[0];

		return new Promise((resolve, reject) => {
			if (bill) resolve({ data: bill });
			else reject(`bill with id: ${id} was not found`);
		});
	},

	getBills(count) {
		let bills = fakeBills.slice(0, count);
		return new Promise(resolve => {
			resolve({ data: bills });
		});
	}
};

let fakeBills = [
	{
		id: 1,
		requestor: { id: 1, username: "User 1" },
		datetime: new Date(),
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
