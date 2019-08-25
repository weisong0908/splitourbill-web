<template>
    <page title="Transaction detail">
        <p>Transaction id: {{transaction.id}}</p>
        <p>Transaction to: {{transaction.name}}</p>
        <p>Amount: {{transaction.amount}}</p>
        <p>Date: {{transaction.date}}</p>
        <p>Purpose: {{transaction.purpose}}</p>
        <p>Before: Friend1 owes you: 21.50</p>
        <p>After: Friend1 owes you: 20.00</p>
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
            test: "124",
            transaction: {}
        };
    },
    created() {
        this.transaction = {
            id: 1,
            name: "Friend 1",
            amount: 2.5,
            date: "2019-8-2",
            purpose: "you paid Friend 1",
            detail: "/detail/1"
        };
    }
};
</script>
