<template>
    <page :title="pageTitle">
        <section>
            <b-field label="Purpose">
                <b-select placeholder="What is this bill for?" v-model="billData.purpose">
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
            <b-field label="Total amount">
                <b-input v-model="billData.totalAmount" type="number"></b-input>
            </b-field>
            <b-field label="Select a date">
                <b-datepicker
                    v-model="billData.datetime"
                    :date-formatter="dateFormat"
                    placeholder="Click to select..."
                    icon="calendar-today"
                ></b-datepicker>
            </b-field>

            <b-field label="Select a time">
                <b-timepicker
                    v-model="billData.datetime"
                    placeholder="Click to select..."
                    icon="clock"
                ></b-timepicker>
            </b-field>
            <b-field label="Remarks">
                <b-input type="textarea" v-model="billData.remarks"></b-input>
            </b-field>
            <b-field label="Split the bill with..."></b-field>
            <b-field>
                <b-button @click="addSharer">Add person</b-button>
            </b-field>
            <b-table :data="billData.requests">
                <template slot-scope="props">
                    <b-table-column label="Name">{{ props.row.user.username }}</b-table-column>
                    <b-table-column label="Amount">
                        <b-input v-model="props.row.amount" type="number"></b-input>
                    </b-table-column>
                </template>

                <template slot="footer">
                    <th>
                        <div class="th-wrap">You will pay the balance of</div>
                    </th>
                    <th>
                        <div class="th-wrap">{{balanceAmount}}</div>
                    </th>
                </template>
            </b-table>
            <b-field>
                <b-button type="is-primary" @click="submitBill">{{submitButtonLabel}}</b-button>
            </b-field>
        </section>
    </page>
</template>

<script>
import page from "../components/Page";
import pageMixin from "../mixins/page";
import configurationService from "../services/configurationService";
import billService from "../services/billService";

export default {
    components: {
        page
    },
    mixins: [pageMixin],
    data() {
        let now = new Date();

        return {
            pageTitle: "Add a bill",
            purposes: [],
            dateFormat: date => date.toLocaleDateString("en-SG"),
            submitButtonLabel: "Add bill",
            billData: {
                id: "",
                requestor: {
                    id: this.$store.state.userInfo.id,
                    username: this.$store.state.userInfo.username
                },
                purpose: "",
                totalAmount: "",
                datetime: now,
                remarks: "",
                requests: []
            }
        };
    },
    methods: {
        submitBill() {
            billService
                .addBill(this.billData)
                .then(resp => {
                    this.notify({
                        title: "Bill added successfully",
                        message:
                            "A bill of SGD " +
                            this.billData.totalAmount +
                            " was added",
                        type: "is-success"
                    });

                    this.$router.push({ name: "dashboard" });
                })
                .catch(resp => {
                    this.notify({
                        title: "Error adding bill",
                        message:
                            "There is error adding the bill, please try again.",
                        type: "is-danger"
                    });
                });
        },
        addSharer() {
            this.billData.requests = [
                ...this.billData.requests,
                { user: { id: 4, username: "User 4" }, amount: 0 }
            ];
        }
    },
    computed: {
        balanceAmount() {
            let amountPaidByOtherUsers = 0;

            this.billData.requests.map(r => {
                amountPaidByOtherUsers += Number(r.amount);
            });

            return this.billData.totalAmount - amountPaidByOtherUsers;
        }
    },
    created() {
        if (this.$route.params.id) {
            billService.getBill(this.$route.params.id).then(resp => {
                this.billData = { ...resp.data };
                this.pageTitle = "Update bill " + this.$route.params.id;
                this.submitButtonLabel = "Update bill";
            });
        }

        configurationService.getBillPurposes().then(resp => {
            this.purposes = [...resp.data];
        });
    }
};
</script>