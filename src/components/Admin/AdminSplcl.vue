<template>
  <div class="">
    <v-data-table
      :headers="headers"
      :items="partialPayments"
      class="elevation-1 mt-5 ml-5"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <div class="mix">
            <v-toolbar-title class="spl">Special Clients Data</v-toolbar-title>
            <v-btn
              style="background-color: #250361; color: white"
              @click="downloadCSV"
              >Download CSV</v-btn>
              <v-spacer></v-spacer>
              <v-btn
              style="background-color: #250361; color: white"
              @click="openDialog"
              >Add client</v-btn>
          </div>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
    </v-data-table>
    <v-dialog v-model="dialogVisible" max-width="600px">
      <v-card>
        <v-card-title>
          Add Special Client
        </v-card-title>
        <v-card-text>
          <v-form @submit="submitForm">
            <v-container>
              <v-row>
                <v-col cols="6">
                  <v-menu
                    v-model="selectedDate"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    lazy
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-bind="attrs"
                        v-on="on"
                        label="Select Date"
                        readonly
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="selectedDate" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="selectedDate = null">
                        Clear
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menu.save(selectedDate)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="6">
                  <v-text-field v-model="clientName" label="Client Name"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-text-field v-model="mobileNumber" label="Mobile Number"></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-select
                    v-model="branch"
                    :items="branches"
                    label="Select Branch"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-select
                    v-model="selectedEmployee"
                    :items="employees"
                    label="Select Employee"
                  ></v-select>
                </v-col>
                <v-col cols="6">
                  <v-select
                    v-model="selectedStatus"
                    :items="statuses"
                    label="Select Status"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-select
                    v-model="selectedPayment"
                    :items="options"
                    label="Select Payment Option"
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="submitForm">Submit</v-btn>
          <v-btn color="primary" @click="closeDialog">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "InterestedLeads",
  components: {},
  data: () => ({
    dialogVisible:false,
    employeeName: "",
    partialPayments: [],
    headers: [
      // { title: "ID", value: "0" },
      { title: "Employee Name", value: "1" },
      { title: "Client Name", value: "4" },
      { title: "Branch Name", value: "2" },
      { title: "UpDated on", value: "3" },
      { title: "Segment", value: "8" },
      // { title: "payment_type", value: "9" },
    ],
    selectedDate: null,
      clientName: '',
      mobileNumber: '',
     branch: null,
      selectedEmployee: null,
      selectedStatus: null,
      selectedPayment: null,
      branches: [],
      employees: [],
      statuses:['Interested','Not Interested','Free Trail','Follow up','Busy/notpickup/Switchoff','Wrong Number'],
      options:['Equity','Commodity','Derivatives'],
  }),

  created() {

    this.employeeName = this.$route.params.employeeName;
    this.fetchPaymentClients();
    this.branche();
  },

  methods: {
    updateEmployees(newVal) {
      axios
        .get("https://api.tkrgroups.co.in//adgetemployees", {
          params: {
            branch: newVal,
          },
        })
        .then((response) => {
          this.employees = response.data.employees;
          // this.employeesList = this.employees.map(emp => emp.name); // get only the names of employees
          console.log(this.employees);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async branche() {
      try {
        const { data } = await axios.get(
          "https://api.tkrgroups.co.in//apiget/branchename"
        );
        // this.managers = data.emp_list
        this.branches = data.branch;

        // console.log(this.branches)
      } catch (error) {
        // console.error(error);
      }
    },




    openDialog() {
      this.dialogVisible = true;
    },
    closeDialog() {
      this.dialogVisible = false;
    },
    fetchPaymentClients() {
      const role = "admin";
      axios
        .get(`https://api.tkrgroups.co.in//spcl/${role}`)
        .then((response) => {
          const clients = response.data.clients;
          console.log(response.data.clients);
          this.partialPayments = clients;
        });
    },

    downloadCSV() {
      const rows = [];
      // push the header row
      rows.push(this.headers.map((h) => h.title));
      // push the data rows
      this.partialPayments.forEach((item) => rows.push(Object.values(item)));
      // convert rows to CSV content
      const csvContent = rows.map((r) => r.join(",")).join("\n");
      // create a new Blob object with the CSV content
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      // create a download link and trigger click event to download
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "specialclients.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
    },
  },
  watch: {
    branch: function (newVal) {
      this.updateEmployees(newVal);
    },
    dbranch: function (newVal) {
      this.updateEmployees(newVal);
    },
  },
};
</script>
<style scoped>
.spl {
  font-size: 1.8rem;
}
.mix {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
</style>
