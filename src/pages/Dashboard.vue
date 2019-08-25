<template>
    <page title="Dashboard" subtitle="Overview">
        <p>Hello {{ name }}</p>
        <section>
            <b-tabs position="is-centered" type="is-toggle" expanded>
                <b-tab-item label="Overview">
                    <ul>
                        <li>You owe</li>
                        <li>You are owed</li>
                    </ul>
                </b-tab-item>

                <b-tab-item label="Recent activities">
                    <b-table :data="data" :selected.sync="selectedTransaction">
                        <template slot-scope="props">
                            <b-table-column field="id" label="ID">{{ props.row.id }}</b-table-column>
                            <b-table-column field="name" label="Name">{{ props.row.name }}</b-table-column>
                            <b-table-column field="date" label="Date">{{ props.row.date }}</b-table-column>
                            <b-table-column field="purpose" label="Purpose">{{ props.row.purpose }}</b-table-column>
                            <b-table-column field="amount" label="Amount">{{ props.row.amount }}</b-table-column>
                            <b-table-column field="detail" label="Detail">
                                <b-button
                                    type="is-primary"
                                    inverted
                                    tag="router-link"
                                    :to="props.row.detail"
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

export default {
    components: {
        page
    },
    data() {
        return {
            name: this.$store.state.user.name,
            data: [
                {
                    id: 1,
                    name: "Friend 1",
                    amount: 2.5,
                    date: "2019-8-2",
                    purpose: "you paid Friend 1",
                    detail: "/detail/1"
                },
                {
                    id: 2,
                    name: "Friend 1",
                    amount: 4.0,
                    date: "2019-8-2",
                    purpose: "Friend 1 paid you",
                    detail: "/detail/2"
                },
                {
                    id: 3,
                    name: "Friend 2",
                    amount: 8.5,
                    date: "2019-8-2",
                    purpose: "you paid Friend 2",
                    detail: "/detail/3"
                },
                {
                    id: 4,
                    name: "Friend 3",
                    amount: 10.0,
                    date: "2019-8-2",
                    purpose: "you paid Friend 3",
                    detail: "/detail/4"
                },
                {
                    id: 5,
                    name: "Friend 4",
                    amount: 7.2,
                    date: "2019-8-3",
                    purpose: "you paid Friend 4",
                    detail: "/detail/5"
                }
            ],
            selectedTransaction: {}
        };
    }
};
</script>

