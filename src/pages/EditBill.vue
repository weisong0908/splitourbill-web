<template>
  <page title="Update bill">
    <b-modal :active.sync="isBillSharersFormShown" has-modal-card>
      <div class="modal-card">
        <div class="modal-card-head">
          <p class="modal-card-title">Add friends to share the bill with you</p>
        </div>
        <div class="modal-card-body">
          <b-field>
            <b-select multiple v-model="selectedBillSharers">
              <option
                v-for="sharerOption in billSharerOptions"
                :key="sharerOption.sharer.id"
                :value="sharerOption"
              >{{sharerOption.sharer.username}}</option>
            </b-select>
          </b-field>
        </div>
        <div class="modal-card-foot">
          <b-button type="is-primary" @click="updateBillSharers">Ok</b-button>
        </div>
      </div>
    </b-modal>
    <section>
      <b-field label="Purpose">
        <b-select placeholder="What is this bill for?" v-model="billData.billPurpose">
          <optgroup
            v-for="category in purposes"
            :key="category.categoryName"
            :label="category.categoryName"
          >
            <option v-for="option in category.options" :key="option" :value="option">{{ option }}</option>
          </optgroup>
        </b-select>
      </b-field>
      <b-field label="Amount">
        <b-input v-model="billData.totalAmount" type="number"></b-input>
      </b-field>
      <b-field label="Select a date">
        <b-datepicker
          v-model="billData.dateTime"
          :date-formatter="dateFormat"
          placeholder="Click to select..."
          icon="calendar-today"
        ></b-datepicker>
      </b-field>
      <b-field label="Select a time">
        <b-timepicker v-model="billData.dateTime" placeholder="Click to select..." icon="clock"></b-timepicker>
      </b-field>
      <b-field label="Remarks">
        <b-input type="textarea" v-model="billData.remarks"></b-input>
      </b-field>
      <b-field label="Split the bill with..."></b-field>
      <b-field>
        <b-button @click="openBillSharersForm">Add person</b-button>
      </b-field>
      <b-table :data="billData.billSharings">
        <template slot-scope="props">
          <b-table-column label="Name">{{ props.row.sharer.username }}</b-table-column>
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
        <b-button type="is-primary" @click="updateBill">Update bill</b-button>
      </b-field>
    </section>
  </page>
</template>

<script>
import page from "../components/Page";
import billService from "../services/billService";
import userService from "../services/userService";

export default {
  components: {
    page
  },
  data() {
    return {
      isBillSharersFormShown: false,
      purposes: [],
      dateFormat: date => date.toLocaleDateString("en-SG"),
      billData: {
        id: "",
        billPurpose: "",
        totalAmount: "",
        dateTime: new Date(),
        remarks: "",
        billSharings: []
      },
      billSharerOptions: [],
      selectedBillSharers: []
    };
  },
  computed: {
    balanceAmount() {
      let amountPaidByOtherUsers = 0;

      this.billData.billSharings.map(s => {
        amountPaidByOtherUsers += Number(s.amount);
      });

      return this.billData.totalAmount - amountPaidByOtherUsers;
    }
  },
  methods: {
    updateBill() {
      let billData = { ...this.billData };
      billData.billSharings.push({
        sharer: {
          id: this.$store.state.userInfo.id,
          username: this.$store.state.userInfo.username
        },
        amount: this.balanceAmount
      });

      alert("bill updated");
      this.$router.push("home");
    },
    openBillSharersForm() {
      this.isBillSharersFormShown = true;

      userService.getUserInfo(this.$store.state.userInfo.id).then(resp => {
        this.billSharerOptions = [
          ...resp.data.friends.map(f => {
            return {
              sharer: {
                id: f.id,
                username: f.username
              },
              amount: 0
            };
          }),
          ...this.selectedBillSharers
        ];
      });
    },
    updateBillSharers() {
      this.isBillSharersFormShown = false;

      this.billData.billSharings = [...this.selectedBillSharers];
    }
  },
  created() {
    billService.getBillPurposes().then(resp => {
      this.purposes = [...resp.data];
    });

    billService.getBill(this.$route.params.id).then(resp => {
      this.billData = {
        ...resp.data,
        dateTime: new Date(resp.data.dateTime)
      };
      this.billData.billSharings = this.billData.billSharings.filter(
        bs => bs.sharer.id !== this.$store.state.userInfo.id
      );

      this.selectedBillSharers = [
        ...this.billData.billSharings.map(s => {
          return {
            sharer: {
              id: s.sharer.id,
              username: s.sharer.username
            },
            amount: s.amount
          };
        })
      ];
    });
  }
};
</script>