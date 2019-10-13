<template>
    <page title="Dashboard" subtitle="Overview">
        <p>Hello {{ name }}</p>
        <section>
            <b-tabs position="is-centered" type="is-toggle" size="is-small" expanded>
                <b-tab-item label="Overview">
                    <ul>
                        <li>You owe</li>
                        <li>You are owed</li>
                    </ul>
                </b-tab-item>

                <b-tab-item label="Recent bills">
                    <b-table :data="bills">
                        <template slot-scope="props">
                            <b-table-column
                                label="Date"
                            >{{ new Date(props.row.dateTime).toLocaleString("en-SG") }}</b-table-column>
                            <b-table-column label="Purpose">{{ props.row.purpose }}</b-table-column>
                            <b-table-column label="Total Amount">{{ props.row.totalAmount }}</b-table-column>
                            <b-table-column label="Detail">
                                <b-button
                                    type="is-primary"
                                    inverted
                                    tag="router-link"
                                    :to="'bill/' + props.row.id"
                                >Detail</b-button>
                            </b-table-column>
                        </template>
                    </b-table>
                </b-tab-item>

                <b-tab-item label="Recent activities">
                    <b-table :data="data" :selected.sync="selectedTransaction">
                        <template slot-scope="props">
                            <b-table-column label="Transaction Code">{{ props.row.transactionCode }}</b-table-column>
                            <b-table-column label="From">{{ props.row.from.username }}</b-table-column>
                            <b-table-column label="To">{{ props.row.to.username }}</b-table-column>
                            <b-table-column
                                label="Date"
                            >{{ props.row.date.toLocaleString("en-SG") }}</b-table-column>
                            <b-table-column label="Purpose">{{ props.row.purpose }}</b-table-column>
                            <b-table-column label="Amount">{{ props.row.amount }}</b-table-column>
                            <b-table-column label="Detail">
                                <b-button
                                    type="is-primary"
                                    inverted
                                    tag="router-link"
                                    :to="'detail/' + props.row.transactionCode"
                                >Detail</b-button>
                            </b-table-column>
                        </template>
                    </b-table>
                </b-tab-item>
            </b-tabs>
        </section>
    </page>
</template>

<script>
import page from "../components/Page";
import transactionService from "../services/transactionService";
import billService from "../services/billService";

export default {
    components: {
        page
    },
    data() {
        return {
            name: this.$store.state.userInfo.username,
            data: [],
            selectedTransaction: {},
            bills: []
        };
    },
    created() {
        billService.getBills(10).then(resp => {
            this.bills = [...resp.data];
        });

        transactionService.getTransactions(10).then(resp => {
            this.data = [...resp.data];
        });
    }
};
</script>

