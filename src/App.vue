<template>
	<div id="app">
		<navbar :pages="pages"></navbar>
		<router-view></router-view>
	</div>
</template>

<script>
import navbar from "./components/Navbar";

export default {
	components: {
		navbar
	},
	data() {
		return {
			pages: [{ title: "Dashboard", path: "/dashboard" }]
		};
	}
};
</script>
