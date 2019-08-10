<template>
	<div id="app">
		<navbar :pages="pages"></navbar>
		<router-view></router-view>
		<app-footer></app-footer>
	</div>
</template>

<script>
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default {
	components: {
		Navbar,
		AppFooter: Footer
	},
	data() {
		return {
			pages: [{ title: "Dashboard", path: "/dashboard" }]
		};
	}
};
</script>
