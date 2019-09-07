<template>
    <page title="Add a bill">
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
            <b-field label="Split the bill with..."></b-field>
            <b-field>
                <b-button @click="addSharer">Add person</b-button>
            </b-field>
            <b-table :data="tableData" :columns="tableColumns">
                <template slot="footer">
                    <th>
                        <div class="th-wrap">Shared by 3 person</div>
                    </th>
                    <th>
                        <div class="th-wrap">Total: {{amount}}</div>
                    </th>
                </template>
            </b-table>
            <b-field>
                <b-button type="is-primary" @click="addBill">Add bill</b-button>
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
        let now = new Date();

        return {
            purpose: "",
            amount: "",
            dateFormat: date => date.toLocaleDateString("en-SG"),
            date: now,
            time: now,
            message: "A new bill",
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
        },
        addSharer() {
            this.tableData = [
                ...this.tableData,
                { name: "New friend", amount: 0 }
            ];
        }
    }
};
</script>