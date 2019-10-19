import axios from "axios";

export default {
	addBill(bill) {
		return axios.post("http://localhost:5000/bill", bill);
	},

	updateBill(billId, bill) {
		return axios.put(`http://localhost:5000/bill/${billId}`, bill);
	},

	getBill(id) {
		return axios.get(`http://localhost:5000/bill/${id}`);
	},

	getBills(count) {
		return axios.get(`http://localhost:5000/bills/${count}`);
	}
};
