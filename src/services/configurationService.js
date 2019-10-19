import axios from "axios";

export default {
    getBillPurposes() {
        return axios.get(`${process.env.VUE_APP_GatewayApiUrl}/configuration/purposes`);
    }
}