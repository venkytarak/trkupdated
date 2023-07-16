<template>
  <div class="">
    <v-container style="z-index: -1">
      <v-row>
        <v-col>
          <v-btn>Hold</v-btn>
        </v-col>
      </v-row>
      <v-row class="mt-5">
        <v-col cols="12" sm="4">
         <v-card class="cards" >
            <v-icon color="pink">mdi-home</v-icon>
           
            <div class="uploaditem">
              <v-btn color="blue" class="uploadleft" @click="openleadsmodel = !openleadsmodel">
                <v-icon>mdi-upload</v-icon> <!-- Icon representing upload leads -->
                Upload Leads
                  <input type="file" ref="fileInput" @change="uploadFile" hidden />
              </v-btn>
              <v-btn color="pink" class="uploadright" to="/dul">
                <v-icon>mdi-delete</v-icon> <!-- Icon representing deleting leads -->
                Delete Leads
                
              </v-btn>
            </div>
          </v-card>
         
        </v-col>
        <v-col cols="12" sm="4">
          <v-card class="cards" to="/assign">
            <v-icon>mdi-upload</v-icon>
            <v-card-item> Assign Leads </v-card-item>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4">
          <!-- <v-card class="cards" to="/accounts"> -->
          <v-card class="cards" >

            
            <v-icon color="green">mdi-account-plus</v-icon>
            <v-card-item> Accounts </v-card-item>
          </v-card>
        </v-col>
      </v-row>

      <v-container>
        <v-row class="tota mt-5">
          <v-row class="tot mt-5">
            <v-col cols="12" sm="4">
              <v-card class="mx-auto h" width="300" :to="{ name: 'RL', query: { status: 'uploaded' } }">
                <v-icon
                  class="ma-2"
                  variant="text"
                  icon="mdi-thumb-up"
                  color="green"
                ></v-icon>
                <v-card-text>Uploaded </v-card-text>
                <v-card-text class="t"> {{ uploaded }} </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" sm="4">
              <v-card class="mx-auto h" width="300" :to="{ name: 'RL', query: { status: 'Assigned' } }">
                <v-icon
                  class="ma-2"
                  variant="text"
                  icon="mdi-checkbox-marked"
                  color="blue"
                ></v-icon>
                <v-card-text>Assigned Leads </v-card-text>
                <v-card-text class="t"> {{ assigned }} </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" sm="4">
              <v-card class="mx-auto h" width="300" :to="{ name: 'RL', query: { status: 'Remaining' } }">
                <v-icon
                  class="ma-2"
                  variant="text"
                  icon="mdi-thumb-down"
                  color="red"
                ></v-icon>
                <v-card-text>Remaining Leads </v-card-text>
                <v-card-text class="t"> {{ remaining }} </v-card-text>
              </v-card>
            </v-col>

            <!-- <v-card-title>
              <v-tooltip bottom>
                <template #activator="{ on }">
                  <span class="text-h5" v-on="on">All Branch Leads</span>
                </template>
                <span>Tooltip text goes here</span>
              </v-tooltip>
            </v-card-title> -->
          </v-row>

          <v-row class="tot mt-5">
            <v-col cols="12" sm="3">
              <v-card class="mx-auto h" width="250" :to="{ name: 'RL', query: { status: 'completed' } }">
                <v-icon
                  class="ma-2"
                  variant="text"
                  icon="mdi-phone"
                  color="blue"
                ></v-icon>
                <v-card-text>Completed Leads</v-card-text>
                <v-card-text class="t"> {{ completedlead }} </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" sm="3">
              <v-card class="mx-auto h" width="250" :to="{ name: 'RL', query: { status: 'Remaining' } }">
                <v-icon
                  class="ma-2"
                  variant="text"
                  icon="mdi-cancel"
                  color="pink"
                ></v-icon>
                <v-card-text>Remaining</v-card-text>
                <v-card-text class="t">
                  {{ assigned - completedlead }}
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" sm="3">
              <v-card class="mx-auto h" width="250" :to="{path:'/sdb/'}">
                <v-icon
                  class="ma-2"
                  variant="text"
                  icon="mdi-cash"
                  color="teal"
                ></v-icon>
                <v-card-text>Sales</v-card-text>
                <v-card-text class="t"> &#x20B9; {{ sales }} </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" sm="3">
              <v-card class="mx-auto h" width="250" to="/lr">
                <v-icon
                  class="ma-2"
                  variant="text"
                  icon="mdi-account-group"
                  color="orange"
                ></v-icon>
                <v-card-text>Total Employees</v-card-text>
                <v-card-text class="t"> {{ emp }}</v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <!-- changed -->
          <v-row>
            <v-col cols="12 mt-10" sm="6">
              <v-title style="font-size: 1.4rem; color: red"
                >Top Performers
              </v-title>
              <v-data-table
    :headers="headers"
    :items="topemp"
  >
  </v-data-table>
            </v-col>

            <v-col cols="12 mt-10" sm="6">
              <v-title style="font-size: 1.4rem; color: green"
                >Completed Data Analysis
              </v-title>
              <div class="mt-10">
                <BarCharts />
              </div>
            </v-col>
          </v-row>

          <!-- change over      -->
        </v-row>
      
      </v-container>
      <!-- dialog for assigning leads -->
      <v-dialog v-model="addBranchModal">
        <v-card>
          <v-card-title>Assign Leads To a Branch</v-card-title>
          <v-card-text>
            <v-form>
              <!-- <v-text-field label="Branch Name" v-model="newBranchName" /> -->
              <v-text-field label="no  of leads" v-model="noofleads" />
              <v-select
                label="branches"
                v-model="selectedBranch"
                :items="branches"
                item-text="name"
                item-value="id"
              />
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-btn text @click="addBranchModal = false">Cancel</v-btn>
            <v-btn text @click="assignleads">Add</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- end of dialog for assigning leads -->

      <!-- open leads model dialog box -->
      <VDialog v-model="openleadsmodel" style="width: 40rem">
        <VCard>
          <VCardTitle>select language</VCardTitle>
          <VCardText>
            <VForm
              style="display: flex;
                justify-content: center;
                align-items: center;
              "
            >
            <v-select
            label="branches"
            v-model="selectedBranch"
            :items="branches"
            item-text="name"
            item-value="id"
            required
          />
              <v-select
                v-model="selectedLanguage"
                :items="languages"
                item-text="name"
                item-value="id"
                label="Select a language"
             required
              ></v-select>
              <!-- <VIcon @click="showAddLanguageDialog">mdi-plus</VIcon> -->
              <v-btn icon @click="addLanguageDialog = !addLanguageDialog">
              Add
              </v-btn>
            </VForm>
          </VCardText>

          <VCardActions>
            <VBtn text @click="openleadsmodel = false">Cancel</VBtn>
            <VBtn text @click="openFileInput">Upload</VBtn>
          </VCardActions>
        </VCard>
      </VDialog>
      <!-- end of box -->
      <v-dialog v-model="addLanguageDialog" max-width="500">
        <v-card>
          <v-card-title> Add New Language </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="newLanguage"
              label="Language Name"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" text @click="addLanguage">Add</v-btn>
            <v-btn text @click="addLanguageDialog = !addLanguageDialog"
              >Cancel</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>

    <v-dialog v-model="assignedleadsbox">
      <v-card class="dialog">
        <v-card-title class="text-center"> Assigned Leads </v-card-title>
        <!-- <v-card-text>
           
          </v-card-text> -->
        <div class="">
          <v-row>
            <v-col> languages </v-col>
            <v-col> Count </v-col>
          </v-row>
          <v-row>
            <v-col> languages </v-col>
            <v-col> Count </v-col>
          </v-row>
          <v-row>
            <v-col> languages </v-col>
            <v-col> Count </v-col>
          </v-row>
          <v-row>
            <v-col> languages </v-col>
            <v-col> Count </v-col>
          </v-row>
          <v-row>
            <v-col> languages </v-col>
            <v-col> Count </v-col>
          </v-row>
          <v-row>
            <v-col> languages </v-col>
            <v-col> Count </v-col>
          </v-row>
        </div>
      </v-card>
    </v-dialog>
    <!--  end of the code -->
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import BarCharts from "../Admin/BarCharts.vue";

export default {
  name: "HomeCard",
  components: {
    BarCharts,
  },
  data() {
    return {
      addBranchModal: false,
      selectedBranch: null,
      openleadsmodel: false,
      assignedleadsbox: false,
      addLanguageDialog: false,
      languages: [],
      // language:'',
      noofleads: "",
      selectedLanguage: null,
 
      newLanguage: "",
      branches: [],
      skill: 40,
      knowledge: 53,
      power: 78,
      count: 100,
      intelligence: 25,
      interval: {},
      employees: [],
      leadCount: 0,
      intcount: "0",
      notcount: "0",
      dnd: "0",
      busy: "0",
      todaycount: "0",
      followupcount: "0",
      uploaded: "0",
      remaining: "0",
      assigned: "0",
      emp: "0",
      completedlead: "0",
      sales: "0",
      topemp:'0',
      
     
      headers: [
        { title: 'Branch', value: '0' },
        { title: 'Employee Name', value: '1' },
        { title: 'Sales', value: '2', sortable: true },
      ],
      topEmp: {},
      sortColumn: 'completed_leads',
      sortDesc: true,
    };
  },
  created() {
    this.language();
    this.fetchInterested();
    this.fetchnotInterested();
    this.fetchDnd();
    this.fetchbusy();
    this.fetchtodaycalls();
    this.FollowUp();

    this.assigncount();
    this.fetchemployees();
    this.completedleads();
    this.fetchsales();
    this.topemplyees()
    this.fetchbranch()
  },
  methods: {
  fetchbranch() {
    axios.get("https://api.tkrgroups.co.in//apiget/branchename").then(response => {
  this.branches = response.data.branch;
  console.log(this.branches);

}).catch(error => {
  console.error(error);
});

     
    },
topemplyees() {
  axios
    .get("https://api.tkrgroups.co.in//top_employees_count", {
      params: {
        role: "admin",
        // branch: "branch name" // Replace "branch name" with the name of the branch you want to retrieve top employees for
      },
    })
    .then((response) => {
      this.topemp = response.data.top_emp;

      console.log(this.topemp);
    })
    .catch((error) => {
      console.log(error);
    });
},

    

    fetchsales() {
      // axios
      //   .get("https://api.tkrgroups.co.in//payment-total", {
      //     params: {
      //       user_type: "admin",
      //     },
      //   })
      //   .then((response) => {
      //     this.sales = response.data.total_amount;

      //     console.log(this.sales);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
      // sample
      axios
        .get("https://api.tkrgroups.co.in//payment-total")
        .then((response) => {
          this.sales = response.data.total_amount;

          console.log(this.sales);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    completedleads() {
      axios
        .get("https://api.tkrgroups.co.in//assigned_leads_count", {
          params: {
            admin: "admin",
          },
        })
        .then((response) => {
          this.completedlead = response.data.count;

          console.log(this.completedlead);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fetchemployees() {
      const role = "admin"; // or 'admin'
      // const branchName = this.branchName; // applicable only for manager role
      axios
        .get(`https://api.tkrgroups.co.in//employees/${role}`)
        .then((response) => {
          this.employees = response.data.employees;
          this.emp = this.employees.length;
          console.log(this.emp);
          console.log(this.employees);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    assigncount() {
      axios
        .get("https://api.tkrgroups.co.in//assignesleads", {
          params: {
            // status:this.employeeName,
            // emp_name:this.employeeName
          },
        })
        .then((response) => {
          // console.log(response.data.count)
          this.uploaded = response.data.count[1];
          this.assigned = response.data.count[0];
          this.remaining = response.data.count[2];
          if (this.remaining == 0) {
            Swal.fire({
        icon: 'success',
        title: 'Please Upload Leads',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
          }
          console.log(this.assignedcount);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    FollowUp() {
      axios
        .get("https://api.tkrgroups.co.in//leads_status", {
          params: {
            status: "Follow Up",
            empname: this.employeeName,
          },
        })
        .then((response) => {
          this.followupcount = response.data.admin;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    fetchtodaycalls() {
      axios
        .get("https://api.tkrgroups.co.in//todaycalls")
        .then((response) => {
          this.todaycount = response.data.count;
          console.log(this.todaycount);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fetchInterested() {
      axios
        .get("https://api.tkrgroups.co.in//leads_status", {
          params: {
            status: "Interested",
            is_admin: "admin",
          },
        })
        .then((response) => {
          this.intcount = response.data.admin;
         
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fetchnotInterested() {
      axios
        .get("https://api.tkrgroups.co.in//leads_status", {
          params: {
            status: "Not interested",
            is_admin: "admin",
          },
        })
        .then((response) => {
          this.notcount = response.data.admin;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fetchbusy() {
      axios
        .get("https://api.tkrgroups.co.in//leads_status", {
          params: {
            status: "Busy/Not Answered",
            is_admin: "admin",
          },
        })
        .then((response) => {
          this.busy = response.data.admin;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fetchDnd() {
      axios
        .get("https://api.tkrgroups.co.in//leads_status", {
          params: {
            status: "Dnd",
            is_admin: "admin",
          },
        })
        .then((response) => {
          this.dnd = response.data.admin;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    addLanguage() {
      if (this.newLanguage) {
        console.log(this.newLanguage);
        axios
          .post("https://api.tkrgroups.co.in//api/postlanguage", {
            language: this.newLanguage,
          })
          .then((response) => {
            console.log(response.data);

            this.languages.push(response.data.language);
            this.openleadsmodel=false;
            Swal.fire({
        title: 'Success',
        text: 'Language Added ',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        location.reload();
      })
        
            console.log(this.languages);

            this.newLanguage = "";
            this.addLanguageDialog = false;
            
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    openFileInput() {
      this.$refs.fileInput.click();
    },
    uploadFile() {
      const file = this.$refs.fileInput.files[0];
      const formData = new FormData();
      formData.append("file", file);

      axios
        .post("https://api.tkrgroups.co.in//add/leads", formData, {
          params: { language: this.selectedLanguage,branch:this.selectedBranch },
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

    assignleads() {
      console.log(this.noofleads);
      console.log(this.selectedBranch);
      axios
        .post("https://api.tkrgroups.co.in//api/leads/assign", {
          count: this.noofleads,
          branch_name: this.selectedBranch,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    language() {
      axios
        .get("https://api.tkrgroups.co.in//api/getlanguage")
        .then((response) => {
          this.languages.push(...response.data);
          console.log(this.languages);
        });
    },
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
  mounted() {
    axios
      .get("https://api.tkrgroups.co.in//api/leads/count")
      .then((response) => {
        this.leadCount = response.data.count;
      })
      .catch((error) => {
        console.log(error);
      });
    this.interval = setInterval(() => {
      if (this.value === 100) {
        return (this.value = 0);
      }
      this.value += 0;
    }, 1000);
  },
  //     created()
  //     {
  // this.fetchbranchname()
  //     },
  // getting branch names
  //  async created() {
  // try{
  //   const { data } = await axios.get("http://127.0.0.1:5000/apiget/branchename")
  //   // this.managers = data.emp_list
  //   this.branches=data.branch

  //   console.log(this.branches)
  //   }

  // catch (error) {
  //     console.error(error);
  //   }

  // },
  // addBranch() {
  //   axios
  //     .post("https://api.tkrgroups.co.in//apipost/branches", {
  //       name: this.newBranchName,

  //       manager_name: this.selectedManager,
  //     })
  //     .then((response) => {
  //       this.branches.push(response.data);
  //       this.addBranchModal;
  //     });
  // },
  //
};
</script>

<style scoped>
.cards {
  color: black;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  text-align: center;
  box-shadow: 3px 3px 3px 3px #9999;
}
.cards:hover {
  background: pink;
  transform: scale(1);
}
.card {
  height: 6rem;
  width: 3rem;
  background: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  text-align: center;
  box-shadow: 3px 3px 3px 3px #9999;
}
.graph {
  margin-top: 10rem;
}
.v-progress-circular {
  margin: 1rem;
}

.dialog {
  width: 30rem;
  height: 15rem;

  background: green;
  border-radius: 30px;
}
.co {
  font-size: 1.3rem;
}
.v-card {
  transition: transform 0.2s ease-in-out;
}

.v-card:hover {
  transform: scale(1.1);
}
.uploaditem
{
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.uploadright
{
  margin-left: 10px;
}
.uploadleft{
  margin-right: 10px;
}
</style>
