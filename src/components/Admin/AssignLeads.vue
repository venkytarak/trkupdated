<template>
  <div class="">
    <AdminSidebarVue />
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
          <v-card class="mx-auto h" width="280" to="/RL">
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
       
        <v-col cols="6">
          <v-sheet width="400" class="mx-auto">
            <v-card>
              <v-card-title>Assign Leads To an Employee</v-card-title>
              <v-card-text>
                <v-form @submit.prevent="submitForm">
                  <v-select
                    v-model="branch"
                    :items="branches"
                    label="Choose Branch"
                    required
                  ></v-select>
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
        <v-col cols="6">
          <v-sheet width="400" class="mx-auto">
            <v-card>
              <v-card-title>Direct Upload To an Employee</v-card-title>
              <v-card-text>
                <v-form @submit.prevent="submitForm">
                  <v-select
                    v-model="dbranch"
                    :items="branches"
                    label="Choose Branch"
                    required
                  ></v-select>
                  <v-select
                    v-model="dlanguage"
                    :items="languages"
                    label="Choose language"
                    required
                  ></v-select>
                  <v-select
                    v-model="demployee"
                    :items="employees"
                    label="Choose Employee"
                    required
                  ></v-select>
                  <!-- <v-text-field
                    v-model="dempcountleads"
                    label="No. of Leads"
                  ></v-text-field> -->

                  <v-btn
                    color="#def1fe"
                    class="mt-4"
                    block
                    type="submit"
                    @click="openFileInput"
                    >Upload  <input type="file" ref="fileInput" @change="uploadFile" hidden /></v-btn
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
import AdminSidebarVue from "./AdminSidebar.vue";
import Swal from "sweetalert2";
export default {
  components: {
    AdminSidebarVue,
  },
  data: () => ({
    selectedBranch: null,
    noofleads: "",
    language: null,
    branches: [],
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
    dbranch:'',
    demployee:'',
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
    this.branche();
    this.fetchlanguages();
    // this.fetchemployees()
    this.assigncount();
    this.fetchlanguagecount();
  },

  methods: {
    openFileInput() {
      this.$refs.fileInput.click();
    },
    uploadFile() {
      const file = this.$refs.fileInput.files[0];
     
      const formData = new FormData();
      formData.append("file", file);

      axios.post("https://api.tkrgroups.co.in//uploadleadstoemp", formData, {
          params: { language: this.dlanguage,branch:this.dbranch,emp_name:this.demployee[0] },
        })
        .then((response) => {
          console.log(response.data.message);
          const num_rows = response.data.num_rows;
          Swal.fire({
            icon: "success",
            title: `${num_rows}Leads uploaded successfully`,
            // text: `Number of leads: ${num_rows}`,
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
              window.location.reload();
            });
          
         
        })
        .catch((error) => {
          console.log(error);
        });
    },
    uploadtoemployee(){

    },
    fetchlanguagecount() {
      axios
        .get("https://api.tkrgroups.co.in//language/leads")
        .then((response) => {
          this.languagecount = response.data.count;
          console.log(this.languagecount);
        });
    },
    assigncount() {
      axios
        .get("https://api.tkrgroups.co.in//assignesleads", {
          params: {},
        })
        .then((response) => {
          this.uploaded = response.data.count[1];
          this.assigned = response.data.count[0];
          this.remaining = response.data.count[2];
          console.log(this.assignedcount);
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

    assigntoemployee() {
      axios
        .post("https://api.tkrgroups.co.in//api/leads/assign", {
          count: this.empcountleads,
          branch_name: this.branch,
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
         
        })
        .catch((error) => {
          Swal.fire({
        title: "Error",
        text: error.response.data.message,
        icon: "error",
        confirmButtonText: "OK",
    }).then(() => {
        window.location.reload();
    });
         
        });
    },

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

    assignleads() {
      console.log(this.noofleads);
      console.log(this.selectedBranch);
      axios
        .post("https://api.tkrgroups.co.in//api/leads/assign", {
          count: this.noofleads,
          branch_name: this.selectedBranch,
        })
        .then((response) => {
         console.log(response)
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
    branch: function (newVal) {
      this.updateEmployees(newVal);
    },
    dbranch: function (newVal) {
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
