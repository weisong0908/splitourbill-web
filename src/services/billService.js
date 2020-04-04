import axios from "axios";
import { getInstance } from "../auth/index";

export default {
  getBillPurposes() {
    return axios.get(`${process.env.VUE_APP_Backend}/bills/purposes`);
  },

  addBill(bill) {
    return axios.post(`${process.env.VUE_APP_GatewayApiUrl}/bill`, bill);
  },

  async updateBill(bill) {
    const authService = getInstance();
    const accessToken = await authService.getTokenSilently();
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    };
    return axios.put(`${process.env.VUE_APP_Backend}/bills`, bill, config);
  },

  async getBill(id) {
    const authService = getInstance();
    const accessToken = await authService.getTokenSilently();
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    };
    return axios.get(`${process.env.VUE_APP_Backend}/bills/${id}`, config);
  },

  getBills(count) {
    return axios.get(`${process.env.VUE_APP_GatewayApiUrl}/bills/${count}`);
  }
};
