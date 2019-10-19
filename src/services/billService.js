import axios from "axios";

export default {
    addBill(bill) {
        return axios.post(`${process.env.VUE_APP_GatewayApiUrl}/bill`, bill);
    },

    updateBill(billId, bill) {
        return axios.put(`${process.env.VUE_APP_GatewayApiUrl}/bill/${billId}`, bill);
    },

    getBill(id) {
        return axios.get(`${process.env.VUE_APP_GatewayApiUrl}/bill/${id}`);
    },

    getBills(count) {
        return axios.get(`${process.env.VUE_APP_GatewayApiUrl}/bills/${count}`);
    }
};
