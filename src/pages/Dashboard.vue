<template>
	<page title="Dashboard" subtitle="Overview">
		<p>Hello {{ name }}</p>
		<section>
			<b-tabs position="is-centered" type="is-toggle" expanded>
				<b-tab-item label="Pictures">pictures</b-tab-item>

				<b-tab-item label="Music">music</b-tab-item>

				<b-tab-item label="Books">books</b-tab-item>
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

