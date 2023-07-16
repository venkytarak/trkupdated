<template>
  <div class="">
    <div class="intl">
      <button @click="goBack" class="back mt-5">
        <v-icon>mdi-arrow-left-bold</v-icon>
      </button>
      <v-data-table
        :headers="headers"
        :items="leads"
        :search="search"
        class="elevation-1 ma-5"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <div class="mix">
              <v-toolbar-title class="spl"
                >Payment Clients Data</v-toolbar-title
              >
              <v-btn
                style="background-color: #250361; color: white"
                @click="downloadCSV"
                >Download CSV</v-btn
              >
            </div>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search by mobile number"
              single-line
              hide-details
            ></v-text-field>
          </v-toolbar>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "InterestedLeads",
  components: {},
  data: () => ({
    leads: [],
    headers: [
      // { title: "ID", value: "0" },
      { title: "Employee Name", value: "1" },
      { title: "Branch", value: "2" },
      { title: "Date", value: "3" },
      { title: "Client Name", value: "4" },
      { title: "Mobile", value: "5" },
      { title: "Amount", value: "9" },
      { title: "Received Amount", value: "10" },
      { title: "Amount Received To", value: "11" },
      { title: "Amount Sent To", value: "12" },
      { title: "Payment Type", value: "7" },
      { title: "Remaining Amount", value: "15" },
      { title: "Segment", value: "8" },
      // { title: "Payment", value: "12" },
      { title: "Message", value: "16" },
    ],
    search: "",
  }),

  created() {
    this.fetchPaymentClients();
  },

  methods: {
    goBack() {
      this.$router.go(-1)
    },
   
    downloadCSV() {
      const rows = [];
      // push the header row
      rows.push(this.headers.map((h) => h.title));
      // push the data rows
      this.leads.forEach((item) => rows.push(Object.values(item)));
      // convert rows to CSV content
      const csvContent = rows.map((r) => r.join(",")).join("\n");
      // create a new Blob object with the CSV content
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      // create a download link and trigger click event to download
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "payment-clients.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
    },

    fetchPaymentClients() {
      axios
        .get("https://api.tkrgroups.co.in//intcl/payments")
        .then((response) => {
          this.leads = response.data.clients.filter(client => {
        return  client[7] !== 'Future';
      });
      console.log(this.leads);
        });
    },
  },
};
</script>
<style>
.mix {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 50%;
}
</style>
