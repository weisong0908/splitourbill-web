<template>
	<page title="Dashboard" subtitle="Overview">
		<p>Hello {{ name }}</p>
		<b-button>Click me</b-button>
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

