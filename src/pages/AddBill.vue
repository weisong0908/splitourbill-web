<template>
	<page title="Add a bill">
		<section>
			<b-field label="Title">
				<b-input v-model="title"></b-input>
			</b-field>
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
			title: ""
		};
	}
};
</script>