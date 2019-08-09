<template>
	<div id="app">
		<navbar></navbar>
		<router-view></router-view>
	</div>
</template>

<script>
import navbar from "./components/Navbar";

export default {
	components: {
		navbar
	}
};
</script>
