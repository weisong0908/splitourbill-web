<template>
    <page title="Friends" subtitle="Users that you can interact with">
        <b-table :data="friends">
            <template slot-scope="props">
                <b-table-column>{{props.row.username}}</b-table-column>
                <b-table-column>
                    <b-button
                        type="is-primary"
                        inverted
                        tag="router-link"
                        :to="'friend/' + props.row.id"
                    >Detail</b-button>
                </b-table-column>
            </template>
        </b-table>
    </page>
</template>

<script>
import page from "../components/Page";
import userService from "../services/userService";

export default {
    components: {
        page
    },
    data() {
        return {
            friends: []
        };
    },
    created() {
        userService.getFriends().then(resp => {
            this.friends = [...resp.data];
        });
    }
};
</script>