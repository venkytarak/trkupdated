<template>
    <div class="">
      <ManagerSidebar/>
      <v-container>
        <v-card-title class="abc">Assign Leads</v-card-title>
  
        <v-row>
          <v-col cols="12" sm="4">
            <v-card class="mx-auto h" width="280" >
              <v-icon
                class="ma-2"
                variant="text"
                icon="mdi-checkbox-marked"
                color="blue"
              ></v-icon>
              <v-card-text>Uploaded Leads </v-card-text>
              <v-card-text class="t"> {{ uploaded }} </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="4">
            <v-card class="mx-auto h" width="280">
              <v-icon
                class="ma-2"
                variant="text"
                icon="mdi-thumb-up"
                color="green"
              ></v-icon>
              <v-card-text>Assigned Leads </v-card-text>
              <v-card-text class="t"> {{ assigned }} </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="4">
            <v-card class="mx-auto h" width="280" >
              <v-icon
                class="ma-2"
                variant="text"
                icon="mdi-thumb-left"
                color="red"
              ></v-icon>
              <v-card-text>Remaining Leads </v-card-text>
              <v-card-text class="t"> {{ remaining }} </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row class="sample mt-15">
          
          <v-col cols="6" style="margin-left:15rem">
            <v-sheet width="400" class="mx-auto">
              <v-card>
                <v-card-title style="color:rgb(89, 89, 220);">Assign Leads To an Employee</v-card-title>
                <v-card-text>
                  <v-form @submit.prevent="submitForm">
                    <!-- <v-select
                      v-model="branch"
                      :items="branches"
                      label="Choose Branch"
                      required
                    ></v-select> -->
                    <v-select
                      v-model="language"
                      :items="languages"
                      label="Choose language"
                      required
                    ></v-select>
                    <v-select
                      v-model="employee"
                      :items="employees"
                      label="Choose Employee"
                      required
                    ></v-select>
                    <v-text-field
                      v-model="empcountleads"
                      label="No. of Leads"
                    ></v-text-field>
  
                    <v-btn
                      color="#def1fe"
                      class="mt-4"
                      block
                      type="submit"
                      @click="assigntoemployee"
                      >Assign</v-btn
                    >
                  </v-form>
                </v-card-text>
              </v-card>
            </v-sheet>
          </v-col>
         
        </v-row>
      </v-container>
    </div>
  </template>
  <script>
  import axios from "axios";
 import ManagerSidebar from "../ManagerSidebar.vue";
 import Swal from 'sweetalert2'
  export default {
    components: {
        ManagerSidebar
    },
    data: () => ({
      selectedBranch: null,
      noofleads: "",
      language: null,
      branches: [],
      branchname:'',
      languages: [],
      valid: true,
      name: "",
      empcountleads: "",
      branch: "",
      employee: "",
      employees: [],
      languagecount: [],
  
      select: null,
      select1: null,
      uploaded: "0",
      assigned: "0",
      remaining: "0",
      headers: [
        {
          title: "Language",
          value: "0",
        },
        {
          title: "Count",
          value: "1",
        },
      ],
    }),
    created() {
      // this.assignleads()
      this.branchname = this.$route.params.branchName;
      this.branche();
      this.fetchlanguages();
      // this.fetchemployees()
      this.assigncount();
      this.fetchlanguagecount();
      
    },
  
    methods: {
      fetchlanguagecount() {
        axios
          .get("https://api.tkrgroups.co.in/language/leads")
          .then((response) => {
            this.languagecount = response.data.count;
            console.log(this.languagecount);
          });
      },
      assigncount() {
       
        axios
          .get("https://api.tkrgroups.co.in/bassignleads", {
            params: {
              branch:this.branchname
            },
          })
          .then((response) => {
            this.uploaded = response.data.count[1];
            this.assigned = response.data.count[0];
            this.remaining = response.data.count[2];
           
          })
          .catch((error) => {
            console.log(error);
          });
      },
      fetchlanguages() {
        axios
          .get("https://api.tkrgroups.co.in/getlanguages")
          .then((response) => {
            this.languages = response.data.language;
            // this.employeesList = this.employees.map(emp => emp.name); // get only the names of employees
            console.log(this.languages);
          })
          .catch((error) => {
            console.error(error);
          });
      },
  
      assigntoemployee() {
        axios
          .post("https://api.tkrgroups.co.in/api/leads/assign", {
            count: this.empcountleads,
            branch_name: this.branchname,
            emp_name: this.employee,
            language: this.language,
          })
          .then((response) => {
            Swal.fire({
              title: "Success",
              text: response.data.message,
              icon: "success",
              confirmButtonText: "OK",
            }).then(() => {
              window.location.reload();
            });
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      },
  
      updateEmployees(newVal) {
        axios
          .get("https://api.tkrgroups.co.in/adgetemployees", {
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
            "https://api.tkrgroups.co.in/apiget/branchename"
          );
          // this.managers = data.emp_list
          this.branches = data.branch;
  
          // console.log(this.branches)
        } catch (error) {
          // console.error(error);
        }
      },
  
      assignleads() {
        console.log(this.noofleads);
        console.log(this.selectedBranch);
        axios
          .post("https://api.tkrgroups.co.in/api/leads/assign", {
            count: this.noofleads,
            branch_name: this.branchname,
          })
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      },
      async validate() {
        const { valid } = await this.$refs.form.validate();
  
        if (valid) alert("Form is valid");
      },
    },
    watch: {
      branchname: function (newVal) {
        this.updateEmployees(newVal);
      },
    },
  };
  </script>
  
  <style>
  .abc {
    text-align: center;
  }
  .table {
    margin-top: 5%;
    box-shadow: 1px 1px 35px 1px #def1fe;
  }
  
  </style>
  