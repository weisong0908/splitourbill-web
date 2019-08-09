<template>
	<div class="tile is-vertical is-ancestor">
		<div class="tile is-parent">
			<div class="tile is-child">
				<p class="title">{{ title }}</p>
				<p class="subtitle">{{ subtitle }}</p>
			</div>
		</div>
		<div class="tile is-parent">
			<div class="tile is-child">
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ["title", "subtitle"],
	data() {
		return {};
	},
	methods: {}
};
</script>
