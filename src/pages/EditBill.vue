<template>
	<page title="Update bill">
		<section>
			<b-field label="Purpose">
				<b-select placeholder="What is this bill for?" v-model="purpose">
					<optgroup v-for="group in purposes" :key="group.groupName" :label="group.groupName">
						<option v-for="option in group.options" :key="option" :value="option">{{ option }}</option>
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
			<b-field label="Split the bill with..."></b-field>
			<b-field>
				<b-button @click="addSharer">Add person</b-button>
			</b-field>
			<b-table :data="tableData" :columns="tableColumns">
				<template slot="footer">
					<th>
						<div class="th-wrap">Shared by {{tableData.length}} person</div>
					</th>
					<th>
						<div class="th-wrap">Total: {{amount}}</div>
					</th>
				</template>
			</b-table>
			<b-field>
				<b-button type="is-primary" @click="addBill">Update bill</b-button>
			</b-field>
		</section>
	</page>
</template>

<script>
import page from "../components/Page";
import configurationService from "../services/configurationService";

export default {
	components: {
		page
	},
	data() {
		let now = new Date();

		return {
			purposes: [],
			purpose: "",
			amount: "",
			dateFormat: date => date.toLocaleDateString("en-SG"),
			date: now,
			time: now,
			message: "Edit existing bill",
			tableData: [
				{ name: "You", amount: 1 },
				{ name: "Friend 2", amount: 3 },
				{ name: "Friend 3", amount: 4 }
			],
			tableColumns: [
				{ field: "name", label: "Name" },
				{ field: "amount", label: "Amount" }
			]
		};
	},
	methods: {
		addBill() {
			let bill = {
				purpose: this.purpose,
				amount: this.amount,
				dateTime: new Date(
					this.date.toDateString() + " " + this.time.toTimeString()
				),
				message: this.message
			};
			alert("bill updated");
			this.$router.push("home");
		},
		addSharer() {
			this.tableData = [
				...this.tableData,
				{ name: "New friend", amount: 0 }
			];
		}
	},
	created() {
		configurationService.getBillPurposes().then(resp => {
			this.purposes = [...resp.data];
		});
	}
};
</script>