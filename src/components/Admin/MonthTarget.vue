<template>
  <v-container>
    <v-btn :to="{path:'/sdb/'}" style="color:white;background:blue">View Targets</v-btn>
    <v-row justify="center" align="center">
      <v-col cols="12" md="6" class="mt-5">
        <v-card>
          <v-card-title class="abc">Target</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="submitForm">
              <v-select
              v-model="role"
              :items="roles"
              label="Choose Role"
              required
            ></v-select>
              <v-select
                v-model="branch"
                :items="branches"
                label="Choose Branch"
                required
              ></v-select>
              <!-- <v-select
                v-model="language"
                :items="languages"
                label="Choose language"
                required
              ></v-select> -->
             
              <v-select
                v-model="employee"
                :items="employees"
                label="Choose Employee"
                required
              ></v-select>
              <v-select
                v-model="ttype"
                :items="targettype"
                label="Target Type"
                required
              ></v-select>
              <v-select
                v-if="ttype === 'Monthly'"
                v-model="month"
                :items="months"
                label="Month"
                required
              ></v-select>

              <v-text-field v-model="amount" label="Amount"></v-text-field>
              <!-- <v-text-field
                v-model="empcountleads"
                label="No of Leads"
              ></v-text-field> -->

              <v-btn
                color="#250361"
                class="mt-4 tc"
                block
                type="submit"
                @click="assigntoemployee"
                >Assign Target</v-btn
              >
            </v-form>
          </v-card-text>
        </v-card>
        
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Swal from 'sweetalert2'
import axios from "axios";
export default {
  data: () => ({
    valid: true,
    language: null,
    branches: [],
    month: "",
    languages: [],
    selectedBranch: null,
    branch: "",
    ttype: "",
    amount: "",
    employee: "",
    employees: [],
    empcountleads: "",
    name: "",
    role:'',
    select: null,
    select1: null,
    select2: null,
    targettype: ["Monthly", "Daily"],
    items: ["Spandana", "John", "Bean", "George", "Honey"],
    roles:["manager",'emp'],
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    date: null,
    firstName: "",
    firstName2: "",
    rules: [
      (v) => !!v || "Amount is required",
      (v) => /^\d+$/.test(v) || "Amount must be a number",
    ],
  }),
  created() {
    // this.assignleads()
    this.branche();
    this.fetchlanguages();
    // this.fetchemployees()
  },

  methods: {
    assigntoemployee() {
      axios
        .post("https://api.tkrgroups.co.in//api/target", {
          branch: this.branch,
          emp: this.employee[0],
          
          targettype: this.ttype,
          target: this.role,
          month: this.month,
          amount: this.amount,
        })
        .then((response) => {
          Swal.fire({
        title: 'Success',
        text: 'Target Added successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        location.reload();
      });
      
          console.log(response.data);


        })
        .catch((error) => {
          console.log(error);
        });
    },

    fetchlanguages() {
      axios
        .get("https://api.tkrgroups.co.in//getlanguages")
        .then((response) => {
          this.languages = response.data.language;
          // this.employeesList = this.employees.map(emp => emp.name); // get only the names of employees
          console.log(this.languages);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    updateEmployees(newVal) {
     
      axios
        .get("https://api.tkrgroups.co.in//getemployees", {
          params: {
            branch: newVal,
            role:this.role
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

    async validate() {
      const { valid } = await this.$refs.form.validate();

      if (valid) alert("Form is valid");
    },
    async validate2() {
      const { valid } = await this.$refs.form2.validate();

      if (valid) alert("Form is valid");
    },
  },
  watch: {
    branch: function (newVal) {
      this.updateEmployees(newVal);
    },
  },
};
</script>

<style scoped>
.abc {
  text-align: center;
}
.tc {
  color: white;
}
.v-card {
  border-radius: 10px;
  box-shadow: 0 5px 5px 5px #8888;
}
</style>
