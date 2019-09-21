export default {
	getTransactions(count) {
		let result = fakeTransactions.slice(0, count);
		return new Promise(resolve => {
			resolve({ data: result });
		});
	},
	getTransaction(transactionCode) {
		let result = fakeTransactions.filter(t => t.transactionCode == transactionCode)[0];
		return new Promise((resolve, reject) => {
			if (result == null) reject("The transaction is not found");
			resolve({ data: result });
		});
	},
	addTransactions(transactions) {
		transactions.forEach(transaction => {
			fakeTransactions.push({
				id: fakeTransactions.length + 1,
				transactionCode: fakeTransactions.length + 1,
				...transaction
			});
		});

		return new Promise(resolve => {
			resolve();
		});
	}
};

let fakeTransactions = [
	{
		id: 1,
		from: { id: 1, username: "User 1" },
		to: { id: 2, username: "User 2" },
		transactionCode: "1",
		amount: "2.50",
		date: new Date(),
		purpose: "Dinner",
		remarks: "nothing",
		type: "Request"
	},
	{
		id: 2,
		from: { id: 1, username: "User 1" },
		to: { id: 2, username: "User 2" },
		transactionCode: "2",
		amount: "13.00",
		date: new Date(),
		purpose: "Breakfast",
		remarks: "nothing",
		type: "Request"
	},
	{
		id: 3,
		from: { id: 1, username: "User 1" },
		to: { id: 3, username: "User 3" },
		transactionCode: "3",
		amount: "10.00",
		date: new Date(),
		purpose: "Dinner",
		remarks: "nothing",
		type: "Request"
	},
	{
		id: 4,
		from: { id: 1, username: "User 1" },
		to: { id: 4, username: "User 4" },
		transactionCode: "4",
		amount: "20.00",
		date: new Date(),
		purpose: "",
		remarks: "nothing",
		type: "Pay"
	},
	{
		id: 5,
		from: { id: 2, username: "User 2" },
		to: { id: 1, username: "User 1" },
		transactionCode: "5",
		amount: "2.50",
		date: new Date(),
		purpose: "",
		remarks: "nothing",
		type: "Pay"
	}
];
