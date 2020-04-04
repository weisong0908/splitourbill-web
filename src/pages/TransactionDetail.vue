<template>
  <page title="Transaction detail">
    <p>Transaction code: {{ transaction.transactionCode }}</p>
    <p>Transaction from: {{ transaction.from.username }}</p>
    <p>Transaction to: {{ transaction.to.username }}</p>
    <p>Amount: {{ transaction.amount }}</p>
    <p>Date: {{ transaction.date }}</p>
    <p>Purpose: {{ transaction.purpose }}</p>
    <p>Type: {{ transaction.type }}</p>
    <p>Remarks: {{ transaction.remarks }}</p>
  </page>
</template>

<script>
import page from "../components/Page";
import transactionService from "../services/transactionService";

export default {
  components: {
    page
  },
  data() {
    return {
      transaction: {
        from: { id: 0, username: "" },
        to: { id: 0, username: "" },
        transactionCode: "",
        amount: "",
        date: "",
        purpose: "",
        remarks: "",
        type: ""
      }
    };
  },
  methods: {
    displayTransactionDetail(transactionCode) {
      transactionService
        .getTransaction(transactionCode)
        .then((resp) => {
          this.transaction = { ...resp.data };
        })
        .catch((error) => {
          console.error(error);
        });
    }
  },
  created() {
    this.displayTransactionDetail(this.$route.params.transactionCode);
  },
  beforeRouteUpdate(to, from, next) {
    this.displayTransactionDetail(to.params.transactionCode);
  }
};
</script>
