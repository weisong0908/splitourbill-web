<template>
	<page title="Add a bill">
		<section>
			<p>Purpose: {{purpose}}</p>
			<p>Amount: {{amount}}</p>
			<p>Date: {{date}}</p>
			<p>Time: {{time}}</p>
			<p>Message: {{message}}</p>
		</section>
		<section>
			<b-field label="Purpose">
				<b-select placeholder="What is this bill for?" v-model="purpose">
					<optgroup label="Meal">
						<option value="breakfast">Breakfast</option>
						<option value="lunch">Lunch</option>
						<option value="dinner">Dinner</option>
						<option value="snack">Snack</option>
						<option value="drink">Drink</option>
						<option value="brunch">Brunch</option>
						<option value="supper">Supper</option>
					</optgroup>
					<optgroup label="Activity">
						<option value="movie">Movie</option>
						<option value="singK">Sing K</option>
						<option value="escapeRoom">Escape room</option>
						<option value="workout">Workout</option>
					</optgroup>
					<optgroup label="Event">
						<option value="weddingBanquet">Wedding banquet</option>
						<option value="songka">Songka</option>
					</optgroup>
				</b-select>
			</b-field>
			<b-field label="Amount">
				<b-input v-model="amount" type="number"></b-input>
			</b-field>
			<b-field label="Select a date">
				<b-datepicker
					v-model="date"
					:date-formatter="dateFormat"
					placeholder="Click to select..."
					icon="calendar-today"
				></b-datepicker>
			</b-field>
			<b-field label="Select a time">
				<b-timepicker v-model="time" placeholder="Click to select..." icon="clock"></b-timepicker>
			</b-field>
			<b-field label="Message">
				<b-input type="textarea" v-model="message"></b-input>
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
			purpose: "",
			amount: "",
			dateTime: new Date(),
			dateFormat: date => date.toLocaleDateString("en-SG"),
			date: dateTime,
			time: dateTime,
			message: "A new bill"
		};
	}
};
</script>