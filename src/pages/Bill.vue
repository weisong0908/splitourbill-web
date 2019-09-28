<template>
    <page :title="pageTitle">
        <b-modal :active.sync="isAddBillSharersFormShown" has-modal-card>
            <div class="modal-card">
                <div class="modal-card-head">
                    <p class="modal-card-title">Add friends to share the bill with you</p>
                </div>
                <div class="modal-card-body">
                    <b-field>
                        <b-select multiple v-model="selectedBillSharers">
                            <option
                                v-for="sharerOption in billSharerOptions"
                                :key="sharerOption.id"
                                :value="sharerOption"
                            >{{sharerOption.username}}</option>
                        </b-select>
                    </b-field>
                </div>
                <div class="modal-card-foot">
                    <b-button type="is-primary" @click="updateBillSharers">Ok</b-button>
                </div>
            </div>
        </b-modal>
        <form @submit.prevent="submitBill">
            <b-field label="Purpose">
                <b-select placeholder="What is this bill for?" v-model="billData.purpose" required>
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
            <b-field label="Total amount (SGD)">
                <b-input v-model="billData.totalAmount" type="number" required min="0" step="0.01"></b-input>
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
                    inline
                    hour-format="12"
                ></b-timepicker>
            </b-field>
            <b-field label="Remarks">
                <b-input type="textarea" v-model="billData.remarks"></b-input>
            </b-field>
            <b-field label="Split the bill with..."></b-field>
            <b-field>
                <b-button @click="openAddBillSharersForm">Add person</b-button>
            </b-field>
            <b-field>
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
            </b-field>
            <div class="buttons">
                <button class="button is-primary" type="submit">{{submitButtonLabel}}</button>
            </div>
        </form>
    </page>
</template>

<script>
import page from "../components/Page";
import pageMixin from "../mixins/page";
import configurationService from "../services/configurationService";
import billService from "../services/billService";
import userService from "../services/userService";

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
            },
            isAddBillSharersFormShown: false,
            billSharerOptions: [],
            selectedBillSharers: []
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
        openAddBillSharersForm() {
            this.isAddBillSharersFormShown = true;

            userService.getFriends().then(resp => {
                this.billSharerOptions = [...resp.data];
            });
        },
        updateBillSharers() {
            this.isAddBillSharersFormShown = false;

            this.billData.requests = [
                ...this.billData.requests.filter(r => {
                    if (
                        this.selectedBillSharers.filter(
                            s => s.id == r.user.id
                        )[0]
                    )
                        return true;
                    return false;
                }),
                ...this.selectedBillSharers
                    .filter(s => {
                        if (
                            this.billData.requests.filter(
                                r => r.user.id == s.id
                            )[0]
                        )
                            return false;
                        return true;
                    })
                    .map(s => {
                        return {
                            user: { id: s.id, username: s.username },
                            amount: 0
                        };
                    })
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