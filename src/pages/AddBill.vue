<template>
    <page title="Add a bill">
        <section>
            <b-field label="Purpose">
                <b-select placeholder="What is this bill for?" v-model="purpose">
                    <optgroup
                        v-for="group in purposes"
                        :key="group.groupName"
                        :label="group.groupName"
                    >
                        <option
                            v-for="option in group.options"
                            :key="option"
                            :value="option"
                        >{{ option }}</option>
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
            <b-field label="Remarks">
                <b-input type="textarea" v-model="remarks"></b-input>
            </b-field>
            <b-field label="Split the bill with..."></b-field>
            <b-field>
                <b-button @click="addSharer">Add person</b-button>
            </b-field>
            <b-table :data="sharers" :columns="tableColumns">
                <template slot="footer">
                    <th>
                        <div class="th-wrap">Shared by {{sharers.length}} person</div>
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
import configurationService from "../services/configurationService";
import transactionService from "../services/transactionService";

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
            remarks: "A new bill",
            sharers: [
                { id: 1, username: "User 1 (Me)", amount: 1 },
                { id: 2, username: "User 2", amount: 3 },
                { id: 3, username: "User 3", amount: 4 }
            ],
            tableColumns: [
                { field: "username", label: "Name" },
                { field: "amount", label: "Amount" }
            ]
        };
    },
    methods: {
        addBill() {
            let transactions = this.sharers.map(sharer => {
                let transaction = {
                    from: { id: 1 },
                    to: { id: sharer.id },
                    purpose: this.purpose,
                    date: this.date,
                    type: "Request",
                    remarks: this.message,
                    amount: sharer.amount
                };
                return transaction;
            });

            transactionService
                .addTransactions(transactions)
                .then(resp => {
                    this.$buefy.snackbar.open({
                        message: "Bill added!",
                        position: "is-top",
                        type: "is-success"
                    });

                    this.$store.commit("addNotification", {
                        title: "Bill added on ...",
                        message: "A bill of " + this.amount + " was added",
                        type: "success"
                    });

                    this.$router.push("home");
                })
                .catch(resp => {
                    this.$buefy.snackbar.open({
                        message:
                            "There is error adding the bill, please try again.",
                        position: "is-top",
                        type: "is-danger"
                    });

                    this.$store.commit("addNotification", {
                        title: "Bill was not added on ...",
                        message: "A bill of " + this.amount + " was not added",
                        type: "failure"
                    });
                });
        },
        addSharer() {
            this.sharers = [
                ...this.sharers,
                { id: 4, username: "User 4", amount: 0 }
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