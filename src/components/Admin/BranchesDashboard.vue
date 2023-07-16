<template>
  <div class="">
    <AdminSidebar/>
    <div class="manager mt-5">
      <div class="Dtitle"><button @click="goBack" class="back mt-5"><v-icon>mdi-arrow-left-bold</v-icon></button>
        <v-text style="font-size:1.5rem;font-weight:400">{{ branchname }}</v-text>
        <button @click="addmanagermodel=!addmanagermodel" class="Bman">Add manager</button>
      
       
      </div>
      <v-spacer></v-spacer>

      <VDialog v-model="addmanagermodel">
        <VCard>
          <VCardTitle>Add Manager</VCardTitle>
          <VCardText>
            <VForm>
              
              <VSelect
                label="employees"
                v-model="selectedemployee"
                :items="employees"
                item-text="name"
                item-value="id"
              />
            </VForm>
          </VCardText>
  
          <VCardActions>
            <VBtn text @click="addBranchModal = false">Cancel</VBtn>
            <VBtn text @click="addmanager">Add</VBtn>
          </VCardActions>
        </VCard>
      </VDialog>
    

    </div>
    <v-container-fluid >
      <vRow class="mt-10" style="width:100%">
        <v-col cols="12" style="max-height: 100%">
          <v-row>
            <v-col cols="8" sm="6">
             
            </v-col>
          
          </v-row>
  
          <v-row >
            <v-col cols="12" sm="4">
              <v-card class="mx-auto top" width="250" height="10rem">
                <div>
                  <v-icon
                    class="ma-2"
                    variant="text"
                    icon="mdi-checkbox-marked"
                    color="blue-lighten-2"
                  ></v-icon>
                  <v-card-text> Assigned Leads </v-card-text>
                  <v-card-text> {{alcount}}</v-card-text>
                </div>
                <div>
                  <v-progress-circular
                    :rotate="360"
                    :size="60"
                    :width="12"
                    :model-value="alcount"
                    color="teal"
                  >
                    {{ alcount }}
                  </v-progress-circular>
                </div>
              </v-card>
            </v-col>
            <v-col cols="12" sm="4">
              <v-card class="mx-auto top" width="250" >
                <div>
                  <v-icon
                    class="ma-2"
                    variant="text"
                    icon="mdi-thumb-up"
                    color="green"
                  ></v-icon>
                  <v-card-text> Completed Leads </v-card-text>
                  <v-card-text> {{completedlead}}</v-card-text>
                </div>
                <div>
                  <v-progress-circular
                    :rotate="360"
                    :size="60"
                    :width="12"
                    :model-value="Math.round(completedlead / alcount * 100)"
                    color="teal"
                  >
                    {{Math.round(completedlead / alcount * 100 )}}
                  </v-progress-circular>
                </div>
              </v-card>
            </v-col>
            <v-col cols="12" sm="4">
              <v-card class="mx-auto top" width="250">
                <div>
                  <v-icon
                    class="ma-2"
                    variant="text"
                    icon="mdi-thumb-down"
                    color="red-lighten-2"
                  ></v-icon>
                  <v-card-text> Remaining Leads </v-card-text>
                  <v-card-text> {{alcount-completedlead}}</v-card-text>
                </div>
                <div>
                  <v-progress-circular
                    :rotate="360"
                    :size="60"
                    :width="12"
                    :model-value="Math.round((alcount-completedlead)/alcount *100)"
                    color="teal"
                  >
                    {{Math.round((alcount-completedlead)/alcount *100) }}
                  </v-progress-circular>
                </div>
              </v-card>
            </v-col>
            <v-col cols="12" sm="4">
              <v-card class="mx-auto top" width="250">
                <div>
                  <v-icon
                    class="ma-2"
                    variant="text"
                    icon="mdi-sale"
                    color="orange"
                  ></v-icon>
                  <v-card-text> Today Sales </v-card-text>
                  <v-card-text> 100 </v-card-text>
                </div>
                <div>
                  <v-progress-circular
                    :rotate="360"
                    :size="60"
                    :width="12"
                    :model-value="value"
                    color="teal"
                  >
                    {{ value }}
                  </v-progress-circular>
                </div>
              </v-card>
            </v-col>
            <v-col cols="12" sm="4">
              <v-card class="mx-auto top" width="250">
                <div>
                  <v-icon
                    class="ma-2"
                    variant="text"
                    icon="mdi-cash"
                    color="pink"
                  ></v-icon>
                  <v-card-text> Monthly Target </v-card-text>
                  <v-card-text> $300000 </v-card-text>
                </div>
                <div>
                  <v-progress-circular
                    :rotate="360"
                    :size="60"
                    :width="12"
                    :model-value="value"
                    color="teal"
                  >
                    {{ value }}
                  </v-progress-circular>
                </div>
              </v-card>
            </v-col>
            <v-col cols="12" sm="4">
              <v-card class="mx-auto top" width="250">
                <div>
                  <v-icon
                    class="ma-2"
                    variant="text"
                    icon="mdi-calendar-month"
                    color="blue-lighten-2"
                  ></v-icon>
                  <v-card-text> daily Target </v-card-text>
                  <v-card-text> 100 </v-card-text>
                </div>
                <div>
                  <v-progress-circular
                    :rotate="360"
                    :size="60"
                    :width="12"
                    :model-value="value"
                    color="teal"
                  >
                    {{ value }}
                  </v-progress-circular>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
  
        <!-- <v-col cols="4" style="max-height: 15rem">
          <v-title style="font-size: 1.7rem">Top 5 performers </v-title>
          <v-data-table
    :headers="headers"
    :items="topemp"
  >
  </v-data-table> 
  <v-data-table
  :headers="headers"
  :items="topemp"
>
  <template v-slot:item="{ item }">
    {{ item[0] }}
  </template>
 
</v-data-table>

  
        </v-col> -->
        <v-spacer></v-spacer>
      </vRow>
      <VDialog v-model="openAssignpage">
        <VCard>
          <VCardTitle>Assign Leads</VCardTitle>
          <VCardText>
            <VForm width="450">
              <v-select
                v-model="select3"
                :items="items"
                label="Employee"
                required
              ></v-select>
              <VTextField label="No.of leads" v-model="newBranchName" />
            </VForm>
          </VCardText>
  
          <VCardActions>
            <VBtn text @click="addBranchModal = false">Cancel</VBtn>
            <VBtn text @click="addBranch">Add</VBtn>
          </VCardActions>
        </VCard>
      </VDialog>
    </v-container-fluid>
  </div>

</template>


<script>
import Swal from 'sweetalert2'
import AdminSidebar from './AdminSidebar.vue';

import axios from 'axios'
export default {
  name: "BranchesDashboard",
  props: ['branchId'],
  components:
  {
    AdminSidebar
  },
 
  

  data() {
    return {
      branches: [],
      value: 50,
      employees:[],
      selectedemployee:null,
      addmanagermodel:false,
    branchname:'',
    manager:'',
    completedlead:'',
    alcount:'',
    // headers: [
    //     // { title: 'Branch', value: '0' },
    //     { title: 'Employee Name', value: '1' },
    //     { title: 'Completed Leads', value: '2', sortable: true },
    //   ],
    headers: [
  // { title: 'Branch', value: 'branch' },
  { title: 'Employee Name', value: 'name' },
  { title: 'Completed Leads', value: 'count', sortable: true },
],

      topEmp: {},
      sortColumn: 'completed_leads',
      sortDesc: true,

     
  
    
    
    }
  },
  
  created()
  {
    
     this.branchname = this.$route.params.branchname;
    // alert(this.branchname)
     
     
    this.fetchbranches(),
this.fetchEmployees()
this.fetchbranches()
this.assignedleads()
 this.completedleads()
this.topemplyees()

  },
 
  methods:
  {
    topemplyees() {
      axios
        .get('https://api.tkrgroups.co.in//top_employees_count', {
          params: {
           
            branch: this.branchname,
          },
        })
        .then(response => {
          // Map the top employee data to an array of objects with properties
          // corresponding to the value properties of the headers array
          this.topemp = response.data.top_emp
          console.log(this.topemp)
        })
        .catch(error => {
          console.error(error);
        });
    },
    assignedleads() {
  axios.get('https://api.tkrgroups.co.in//manager/leadsassigned', {
    params: {
      branch: this.branchname
    }
  })
  .then(response => {
    this.alcount = response.data.data[0];
    console.log(this.alcount);
  })
  .catch(error => {
    console.log(error);
  });
},
completedleads()
    {axios.get('https://api.tkrgroups.co.in//assigned_leads_count' ,
    {
      params: {
      branch_name:this.branchname
    }
    })
  .then(response => {
    this.completedlead = response.data.count;
    console.log(this.completedlead);
  })
  .catch(error => {
    console.log(error);
  });

},
async fetchEmployees() {
    console.log(`branchName is ${this.branchname}`);
    axios
        .get("https://api.tkrgroups.co.in//adgetemployees", {
            params: {
                branch: this.branchname
            }
        })
        .then(response => {
            this.employees = response.data.employees;
            console.log(this.employees);
          
        })
        .catch(error => {
            console.error(error);
        });
},

   fetchbranches() {
    axios
     .get("https://api.tkrgroups.co.in//apiget/branches")
    .then(response => (
      this.branches = response.data))
      console.log(this.branches)
     
  },
    goBack() {
      this.$router.go(-1)
    },
   
    addmanager() {
    
      axios.post('https://api.tkrgroups.co.in//addmanager', {
        name: this.selectedemployee,
        branchName: this.branchname
        
      })
      .then(response => {
        this.addmanagermodel=false,
        console.log(response.data)
        Swal.fire({
        title: 'Success',
        text: 'Manager Added successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        location.reload();
      });
      });
    }
    
  },

  
 
   


  }
  

</script>
<style scoped>
.table
{
  margin-right: 5rem;
}
.back
{
  background:white;
      color:black;
      font-size: 1rem;
      border-radius: 30px;
      height: 3rem;
      width: 3rem;
      box-shadow: 3px 3px 3px 3px #9999 ;
}
.Dtitle
{
  display: flex;
  justify-content: space-around;
  align-items:center;
}
.Bman
{
  background:#ffff;
  color:black;
  border-radius: 10px;
  font-size: 1rem;
 
  height: 2.5rem;
  width: 7rem;
  box-shadow: 3px 3px 3px 3px #999;

}
.tot {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.top {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height:10rem;
}
.v-progress-circular {
  margin: 1rem;
  height: 30%;
}
.icn {
  color: rgb(242, 18, 171);
  font-size: 2.5rem;
}
</style>
