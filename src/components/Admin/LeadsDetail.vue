
<template>
    <div>
      <AdminSidebar/>
      <div class="overflow-x-auto">
        <button @click="goBack" class="back mt-5">
          <v-icon>mdi-arrow-left-bold</v-icon>
        </button>
        <h3 class="text-center" style="font-size:2rem;color:blue">Branch- {{branchname}}</h3>
        <v-toolbar flat>
          <v-toolbar-title v-if="status === 'uploaded'" style="color:blue;font-size:1.5rem">Uploaded Leads Data</v-toolbar-title>
          <v-toolbar-title v-if="status === 'Assigned'" style="color:blue;font-size:1.5rem">Assigned Leads Data</v-toolbar-title>
          <v-toolbar-title v-if="status === 'Remaining'" style="color:blue;font-size:1.5rem">Remaining</v-toolbar-title>
          <v-toolbar-title v-if="status === 'Followup'" style="color:blue;font-size:1.5rem">Follow Up Leads</v-toolbar-title>
          <v-toolbar-title v-if="status === 'Interested'" style="color:blue;font-size:1.5rem">Interested</v-toolbar-title>
          <v-toolbar-title v-if="status === 'FreeTrail'" style="color:blue;font-size:1.5rem">Free Trail Leads</v-toolbar-title>
          <v-toolbar-title v-if="status === 'NotInterested'" style="color:blue;font-size:1.5rem">Not Interested Leads</v-toolbar-title>
          <v-toolbar-title v-if="status === 'Busy'" style="color:blue;font-size:1.5rem">Busy/Notpickedup</v-toolbar-title>
          <v-toolbar-title v-if="status === 'WrongNumber'" style="color:blue;font-size:1.5rem">Wrong Number Leads</v-toolbar-title>

         
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
      <v-icon>mdi-delete</v-icon>
      </v-btn>
    </template>
    <template v-slot:[`item.action`]="{ item }">
      <v-btn
        size="small"
        class="me-2"
        @click="deleteItem(item.raw)"
        icon
      >
       Visit
      </v-btn>
    </template>
    
   
  </v-data-table>
       
      </div>
    </div>
  </template>
  <script>
//   import axios from 'axios'
import AdminSidebar from './AdminSidebar.vue'
// import Swal from "sweetalert2";

    export default {
      name:'lead-page',

      
   
      components:
      {
        AdminSidebar
      },
      data: () => ({
        
        employeeName:'',
       status:'',


        dialog: false,
        dialogDelete: false,
        formVisible:false,
        statusdata:'',
       
        leads:[],
        
          headers: [
          
          { title: 'EMP Name', value: 'employee' },
          { title: 'Uploaded Leads Count', value: 'assigned_leads' },
          { title:'completed_leads',value:'completed_leads'},
          { title: 'Remaining Count', value: 'remaining_leads' },
          
          { title: 'Actions', key: 'actions', sortable: false },
      ]
      ,
        branchname:'',

       
        // desserts: [],
       
      
      }),
  
      computed: {
        formTitle () {
          return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
      //   branchName() {

      //   this.branchname= this.$route.params.branch;
      // },
      },
  
      watch: {
        dialog (val) {
          val || this.close()
        },
       
      },
  
      created () {
       
        this.employeeName = this.$route.params.employee;
        this.branchname= this.$route.params.branchname;
        this.status =  this.$route.params.status;
       alert(this.status)
    
 
        
      },
    
  
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
   
   
   
  
   