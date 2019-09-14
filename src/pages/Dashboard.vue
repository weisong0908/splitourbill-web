<template>
	<page title="Dashboard" subtitle="Overview">
		<p>Hello {{ name }}</p>
		<section>
			<b-tabs position="is-centered" type="is-toggle" expanded>
				<b-tab-item label="Overview">
					<ul>
						<li>You owe</li>
						<li>You are owed</li>
					</ul>
				</b-tab-item>

				<b-tab-item label="Recent activities">
					<b-table :data="data" :selected.sync="selectedTransaction">
						<template slot-scope="props">
							<b-table-column field="id" label="ID">{{ props.row.id }}</b-table-column>
							<b-table-column field="name" label="Name">{{ props.row.name }}</b-table-column>
							<b-table-column field="date" label="Date">{{ props.row.date }}</b-table-column>
							<b-table-column field="purpose" label="Purpose">{{ props.row.purpose }}</b-table-column>
							<b-table-column field="amount" label="Amount">{{ props.row.amount }}</b-table-column>
							<b-table-column field="detail" label="Detail">
								<b-button type="is-primary" inverted tag="router-link" :to="props.row.detail">Detail</b-button>
							</b-table-column>
						</template>
					</b-table>
				</b-tab-item>
			</b-tabs>
		</section>
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
			name: this.$store.state.user.name,
			data: [],
			selectedTransaction: {}
		};
	},
	created() {
		transactionService.getTransactions(3).then(resp => {
			this.data = [...resp.data];
		});
	}
};
</script>

