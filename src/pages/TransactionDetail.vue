<template>
	<page title="Transaction detail">
		<p>Transaction id: {{transaction.id}}</p>
		<p>Transaction to: {{transaction.name}}</p>
		<p>Amount: {{transaction.amount}}</p>
		<p>Date: {{transaction.date}}</p>
		<p>Purpose: {{transaction.purpose}}</p>
		<p>Before: Friend1 owes you: 21.50</p>
		<p>After: Friend1 owes you: 20.00</p>
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
			test: "124",
			transaction: {}
		};
	},
	methods: {
		displayTransactionDetail(id) {
			transactionService
				.GetTransaction(id)
				.then(resp => {
					this.transaction = { ...resp.data };
				})
				.catch(error => {
					console.error(error);
				});
		}
	},
	created() {
		this.displayTransactionDetail(this.$route.params.id);
	},
	beforeRouteUpdate(to, from, next) {
		this.displayTransactionDetail(to.params.id);
	}
};
</script>
