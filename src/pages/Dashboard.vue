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
					a transactions table with
					<ul>
						<li>Name</li>
						<li>Date time of transaction</li>
						<li>purpose</li>
						<li>link to detail</li>
					</ul>
				</b-tab-item>
			</b-tabs>
		</section>
	</page>
</template>

<script>
import page from "../components/Page";

export default {
	components: {
		page
	},
	data() {
		return {
			name: this.$store.state.user.name
		};
	}
};
</script>

