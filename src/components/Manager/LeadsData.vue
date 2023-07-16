
<template>
    <div>
      <ManagerSidebar/>
      <div class="overflow-x-auto">
        <button @click="goBack" class="back mt-5">
          <v-icon>mdi-arrow-left-bold</v-icon>
        </button>
        <h3> {{branchname}}</h3>
       
        <v-data-table
          :headers="getTableHeaders()"
          :items="leads"
          class="elevation-1 mt-5 d-block d-sm-table"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title v-if="status === 'uploaded'">Uploaded Leads Data</v-toolbar-title>
              <v-toolbar-title v-if="status === 'Assigned'">Assigned Leads Data</v-toolbar-title>
              <v-toolbar-title v-if="status === 'Remaining'">Remaining</v-toolbar-title>
              <v-toolbar-title v-if="status === 'Followup'">Follow Up Leads</v-toolbar-title>
              <v-toolbar-title v-if="status === 'Interested'">Interested</v-toolbar-title>
              <v-toolbar-title v-if="status === 'FreeTrail'">Free Trail Leads</v-toolbar-title>
              <v-toolbar-title v-if="status === 'NotInterested'">Not Interested Leads</v-toolbar-title>
              <v-toolbar-title v-if="status === 'Busy'">Busy/Notpickedup Leads</v-toolbar-title>
              <v-toolbar-title v-if="status === 'WrongNumber'">WrongNumber Leads</v-toolbar-title>

             
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="formVisible">
                <v-card>
                  <v-card-title>Enter Client Data</v-card-title>
                  <v-card-text>
                    <v-form ref="form" @submit.prevent="submitForm">
                      <v-row>
                        <v-col cols="12" sm="6">
                          <v-text-field v-model="date" label="Today's Date" type="date" :value="new Date().toISOString().substr(0, 10)"></v-text-field>
    
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field v-model="selecteditem[5]" label="client Name" required readonly/>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field v-model="selecteditem[2]" label="Phone Number"   readonly required />
                        </v-col>
                        
                      
                        <v-col cols="12" sm="6">
                          <v-text-field v-model="selecteditem[3]" label="alternate Phone Number"  required />
    
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field v-model="selecteditem[6]"  label="Language" required readonly></v-text-field>
                        </v-col>
                        
                        <v-col cols="12" sm="6">
                          <v-select v-model="selecteditem[1]" :items="statuss" label="Update Status" required></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" v-show="status == 'Free Trail'">
                          <v-text-field v-model="freetdate" label="Free Trail Ending Date" type="date"></v-text-field>                    </v-col>
                        
                        <v-col cols="12" sm="6"  v-show="status == 'Interested'">
                          <v-select v-model="payment" :items="options" label="Select OPtions" required></v-select>
                        </v-col>
                      </v-row>
                    </v-form>              
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="primary" @click="save" >Submit</v-btn>
                    <v-btn color="secondary" @click="closeForm">Close</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn
              size="small"
              class="me-2"
              @click="editItem(item.raw)"
              icon
            >
              <v-icon left>mdi-pencil</v-icon>
            </v-btn>
          </template>
          
         
        </v-data-table>
      </div>
    </div>
  </template>
  <script>
  import axios from 'axios'
import ManagerSidebar from './ManagerSidebar.vue'

    export default {
      name:'InterestedLeads',

      
   
      components:
      {
        ManagerSidebar
      },
      data: () => ({
       
       status:'',
        dialog: false,
        dialogDelete: false,
        formVisible:false,
        statusdata:'',
       
        leads:[],
        
          headers: {
            uploaded: [
          { title: 'EMP Name', value: 'employee' },
          { title: 'Uploaded Leads Count', value: 'assigned_leads' },
          { title: 'Remaining Count', value: 'remaining_leads' },
          // { title: 'Action', value: 'action', sortable: false }
        ],
        Assigned: [
          { title: 'EMP Name', value: 'employee' },
          { title: 'Assigned Leads Count', value: 'assigned_leads' },
          { title: 'Remaining Count', value: 'remaining_leads' },
          // { title: 'Action', value: 'action', sortable: false }
        ],
        Remaining: [
          { title: 'Branch Name', value: 'branchName' },
          { title: 'Assigned Leads Count', value: 'uploadedLeadsCount' },
          { title: 'Remaining Count', value: 'remainingCount' },
          // { title: 'Action', value: 'action', sortable: false }
        ],
        Interested: [
          // { title: 'EMP ID', value: '' },
          { title: 'EMP NAME', value: '0' },
          { title: 'NO OF CLIENTS', value: '1' },
          { title: 'Action', value: 'action', sortable: false }
        ],
        FreeTrail: [
          // { title: 'EMP ID', value: '' },
          { title: 'EMP NAME', value: '0' },
          { title: 'NO OF CLIENTS', value: '1' },
          // { title: 'Action', value: 'action', sortable: false }
        ],
        NotInterested: [
          // { title: 'EMP ID', value: '' },
          { title: 'EMP NAME', value: '0' },
          { title: 'NO OF CLIENTS', value: '1' },
          // { title: 'Action', value: 'action', sortable: false }
        ],
        WrongNumber: [
          // { title: 'EMP ID', value: '' },
          { title: 'EMP NAME', value: '0' },
          { title: 'NO OF CLIENTS', value: '1' },
          // { title: 'Action', value: 'action', sortable: false }
        ],
        Followup: [
          // { title: 'EMP ID', value: '' },
          { title: 'EMP NAME', value: '0' },
          { title: 'NO OF CLIENTS', value: '1' },
          // { title: 'Action', value: 'action', sortable: false }
        ],
        Busy: [
          // { title: 'EMP ID', value: '' },
          { title: 'EMP NAME', value: '0' },
          { title: 'NO OF CLIENTS', value: '1' },
          // { title: 'Action', value: 'action', sortable: false }
        ],
          
          // { title: 'Employee', key: 'employee' },
        
          // { title: 'Assigned leads', key: 'assigned_leads' },
          // // { title: 'amount', key: '4' },
          // { title: 'Completed', key: 'completed_leads' },
          // { title: 'Remaining', key: 'remaining_leads' },
          // { title: 'Actions', key: 'actions', sortable: false },
         
      },
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
       
        this.employeeName = this.$route.params.employeeName;
        this.managername = this.$route.params.manager;

        this.branchname= this.$route.params.branchName;
        this.status =this.$route.query.status;
       
    
 
        this.interestedlead()
        this.fetchdata()
        
      },
    
      methods: {
      
        fetchdata(){
          if (this.status=='NotInterested')
          {
            
            axios.post('https://api.tkrgroups.co.in//statusdata', { branch: this.branchname,status:this.status })
  .then(response => {
    // handle response
    alert(response.data)
    console.log(response.data)
    this.leads=response.data
  })
  
}
  else if(this.status=='Followup'){
    this.status='Follow up'
    axios.post('https://api.tkrgroups.co.in//statusdata', { branch: this.branchname,status:this.status })
  .then(response => {
    // handle response
    console.log(response.data)
    this.leads=response.data
  }) 
  this.status='Followup'}
  else if(this.status=='FreeTrail'){
    
this.status=='Free Trail'
axios.post('https://api.tkrgroups.co.in//statusdata', { branch: this.branchname,status:this.status })
  .then(response => {
    // handle response
    console.log(response.data)
    this.leads=response.data
  })

  this.status=='FreeTrail'
  }
  else if(this.status=='WrongNumber'){
axios.post('https://api.tkrgroups.co.in//statusdata', { branch: this.branchname,status:this.status })
  .then(response => {
    // handle response
    console.log(response.data)
    this.leads=response.data
  })
  this.status=='WrongNumber'
  }
  else if(this.status=='Busy'){
axios.post('https://api.tkrgroups.co.in//statusdata', { branch: this.branchname,status:this.status })
  .then(response => {
    // handle response
    console.log(response.data)
    this.leads=response.data
  })

  }
  
  else if(this.status=='Interested'){
    this.status='Interested'
            axios.post('https://api.tkrgroups.co.in//statusdata', { branch: this.branchname,status:this.status })
  .then(response => {
    // handle response
    console.log(response.data)
    this.leads=response.data
  })

  }
  else{
    axios.post('https://api.tkrgroups.co.in//rbcount', { branch: this.branchname })
  .then(response => {
    // handle response
    console.log(response.data)
    this.leads=response.data
  })

  }


  

  },
             
       
  
             getTableHeaders() {
      return this.headers[this.status] || [];
    },

        interestedlead()
      {
        // var empname = this.employeeName
        // alert(this.branchname)
       
        axios.post('https://api.tkrgroups.co.in//rbcount', { branch: this.branchname })
  .then(response => {
    // handle response
    console.log(response.data)
    this.leads=response.data
  })
  .catch(error => {
    // handle error
    console.log(error)
  });
        
      },
  
        goBack() {
      this.$router.go(-1)
    },
      
      
  
        
  
      
        
  
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
  </style>
   
   
   
  
   