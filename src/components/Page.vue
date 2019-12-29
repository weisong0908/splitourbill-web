<template>
	<section class="section">
		<login-form></login-form>
		<b-message title="Warning" type="is-warning" has-icon>This page is under development</b-message>
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
	</section>
</template>

<script>
import LoginForm from "../components/LoginForm";
import pageMixin from "../mixins/page";
import userService from "../services/userService";

export default {
	props: ["title", "subtitle"],
	mixins: [pageMixin],
	components: { LoginForm },
	data() {
		return {
			friendRequests: []
		};
	},
	mounted() {
		if (this.$store.state.isUserLoggedIn) {
			userService.getFriendRequests(this.$store.state.userInfo.id).then(resp => {
				console.log("resp", resp);
				this.friendRequests = [...resp.data];
				console.log("friendRequests", this.friendRequests);
				this.friendRequests.forEach(fr => {
					this.notify({
						title: `New friend request from ${fr.requestorUsername}`,
						message: "A new friend request is pending",
						type: "is-success"
					});
				});
			});
		}
	}
};
</script>
