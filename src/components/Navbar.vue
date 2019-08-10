<template>
	<b-navbar>
		<template slot="brand">
			<b-navbar-item href="/">
				<img
					src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
					alt="Lightweight UI components for Vue.js based on Bulma"
				/>
			</b-navbar-item>
		</template>
		<template slot="start">
			<b-navbar-item
				tag="router-link"
				v-for="page in pages"
				:key="page"
				:to="page.path"
			>{{ page.title }}</b-navbar-item>
		</template>

		<template slot="end">
			<b-navbar-item tag="div">
				<div class="buttons">
					<b-button type="is-primary" tag="a">1</b-button>
					<a class="button is-primary">
						<strong>Sign up</strong>
					</a>
					<a class="button is-light">Log in</a>
				</div>
			</b-navbar-item>
		</template>
	</b-navbar>
</template>

<script>
export default {
	props: ["pages"]
};
</script>
