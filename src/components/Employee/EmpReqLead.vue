<template>
  
  <div class=""><EmpSidebarVue/>

    <v-container>
      <v-row class="complete">
        <v-col cols="12" style="max-height: 100%">
          <v-card-title class="abc">Request Lead</v-card-title>
          <v-sheet width="40rem" class="mx-auto">
            <v-form >
              <v-text-field
                v-model="leadscount"
                label="No.of Leads"
              ></v-text-field>
              <v-select
                v-model="selectedlanguge"
                :items="languages"
                label="Choose Language"
                required
              ></v-select>
  
              <v-btn color="blue" class="mt-4" to="" block @click="requestlead">
                Submit
              </v-btn>
            </v-form>
          </v-sheet>
        </v-col>
      </v-row>
      <v-row>
        <div class="hd">
          <v-title>Previous requests</v-title>
        </div>
        <v-data-table
          :headers="headers"
          :items="updatedleads"
          :search="search"
          class="elevation-1 table"
          item-value="name"
          height="20rem"
        >
        </v-data-table>
      </v-row>
    </v-container></div>
</template>
<script>
import axios from 'axios';
import EmpSidebarVue from './EmpSidebar.vue';
import Swal from 'sweetalert2'
export default {
  components: {
    EmpSidebarVue,
  },
  data: () => ({
    valid: true,
    leadscount:'',
    selectedlanguge:null,
    languages:[],
    employeeName:'',
    updatedleads:[],
   
   
  }),
  created()
  {
    this.employeeName = this.$route.params.employeeName;
this.fetchlanguages()
this.fetchpreviousrequest()
  },

 




  computed: {
    headers() {
      return [
        {
          title: "id",
          align: "no",
          sortable: false,
          key: "0",
        },

        {
          title: "Employee Name",
          key: "4",
        },

       
        {
          title: "Language",
          align: "end",
          sortable: false,
          key: "2",
        },
        {
          title: "Date of Requested",
          align: "end",
          sortable: false,
          key: "3",
        },
        {
          title: "Leads Requested",
          align: "end",
          sortable: false,
          key: "1",
        },
  //       { title: "Status", align: "end", key: "5", cell: row => {
  //   const status = row["5"];
  //   let color;
  //   if (status=== "completed") {
  //     color = "green";
  //   } return {
  //     class: `text-${color} font-weight-bold`,
  //     text: status
  //   };
  // } },
  {
        title: "Status",
        align: "end",
        key: "5",
        cell: row => {
          const status = row["status"];
          let color;
          if (status === "completed") {
            color = "green";
          } else {
            color = "orange"; // or any other color you prefer
          }
          return {
            class: `text-${color} font-weight-bold`,
            text: status
          };
        }
      },
      ];
    },
  },

  methods: {
    fetchpreviousrequest()
    {
      axios.post('https://api.tkrgroups.co.in//prevrequest',
      {
        name:this.employeeName
      })
    .then(response => {
     this.updatedleads=response.data.leads
     console.log(this.updatedleads)
    })
    .catch(error => {
      console.error(error);
    });
       

    }, 
    requestlead()
    {
axios.post('https://api.tkrgroups.co.in//leads_request',
{
  language:this.selectedlanguge,
  emp_name:this.employeeName,
  count:this.leadscount,


}).then(response=>
{
  console.log(response)
  Swal.fire({
              title: "Success",
              text: 'Lead Request sent to Admin',
              icon: "success",
              confirmButtonText: "OK",
            }).then(() => {
              window.location.reload();
            });

})
    },
    fetchlanguages()
    { axios.get('https://api.tkrgroups.co.in//getlanguages')
  .then(response => {
    this.languages = response.data.language;
    // this.employeesList = this.employees.map(emp => emp.name); // get only the names of employees
    console.log(this.languages);
  })
  .catch(error => {
    console.error(error);
  });}
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
