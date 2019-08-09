<template>
	<div>
		<h1>Dashboard</h1>
		<p>Hello {{ name }}</p>
		<b-button>Click me</b-button>
	</div>
</template>

<script>
export default {
	data() {
		return {
			name: this.$store.state.user.name
		};
	}
};
</script>

