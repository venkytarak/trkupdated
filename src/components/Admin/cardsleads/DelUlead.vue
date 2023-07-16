
<template>
    <div>
      <AdminSidebar/>
      <div class="overflow-x-auto">
        <button @click="goBack" class="back mt-5">
          <v-icon>mdi-arrow-left-bold</v-icon>
        </button>
        <h3> {{branchname}}</h3>
        <v-toolbar flat>
          <v-toolbar-title style="color:blue;font-size:1.5rem">Uploaded Leads Data</v-toolbar-title>
        
         
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
    
        </v-toolbar>
        
      
    <v-data-table
    :headers="headers"
    :items="leads"
    class="elevation-1 mt-5 d-block d-sm-table"
  >
    <template v-slot:top>
     
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-btn
        size="small"
        class="me-2"
        @click="deleteItem(item.raw)"
        icon
      >
        <v-icon left>mdi-delete</v-icon>
      </v-btn>
    </template>
    
   
  </v-data-table>
       
      </div>
    </div>
  </template>
  <script>
import axios from 'axios';
//   import axios from 'axios'
import AdminSidebar from '../AdminSidebar.vue';
import Swal from "sweetalert2";

    export default {
      name:'InterestedLeads',

      
   
      components:
      {
        AdminSidebar
      },
      data: () => ({
       
       
       
        leads:[],
        
          headers:[
           
          { title: 'UPLOADED TO', value: 'branch_name' },
          { title: 'LEADS COUNT', value: 'count' },
          { title:'LANGUAGE',value:'language'},
          { title: 'DATE', value: 'upload_date' },
          
          { title: 'ACTIONS', key: 'actions', sortable: false },
     
          ],
        branchname:'',

       
        // desserts: [],
       
      
      }),
  
      
  created()
  {
    this.fetchdata()
  },
  methods:
  {
    deleteItem(item)
    {
      axios.get("https://api.tkrgroups.co.in/deldul", { params: { branch_name: item.branch_name, language: item.language, date: item.upload_date } })
   .then((response) => {
          console.log(response.data.message);
          // const num_rows = response.data.num_rows;
          Swal.fire({
            icon: "success",
            title: `Leads Deleted Successfully`,
            // text: `Number of leads: ${num_rows}`,
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
              window.location.reload();
            });
          
         
        })



    },
fetchdata()
{
    axios.get("https://api.tkrgroups.co.in/dul").then((response) => {
          this.leads=response.data
          console.log(this.leads)

    })
}
  }
 
    }
  </script> 
  <style scoped>
  .intl
  {

    margin-left: 3rem;
    width: 80rem;
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
td{
 
  text-align: center;
}
v-toolbar-title
{
  color: blue;
}
  </style>
   
   
   
  
   