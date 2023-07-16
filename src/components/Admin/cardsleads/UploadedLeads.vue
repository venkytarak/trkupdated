
<template>
    <div>
      <AdminSidebar/>
      <div class="overflow-x-auto">
        <button @click="goBack" class="back mt-5">
          <v-icon>mdi-arrow-left-bold</v-icon>
        </button>
        <h3> {{branchname}}</h3>
        <v-data-table>
            <thead>
              <tr>
                <th>Employee Name</th>
                
                <th>Uploaded</th>
              
                <th>Completed</th>
                <th>Remaining</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="lead in leads" :key="lead.id">
                <!-- <td><a  @click="showEmployeeDetails(lead.empoyee)">{{ lead.employee }}</a></td> -->
                <td>{{ lead.employee}}</td>
                <td>{{lead.assigned_leads}}</td>
                <td>{{lead.completed_leads}}</td>
                <td>{{ lead.remaining_leads}}</td>
                <td>
                  <v-icon @click="downloadEmployeeReport(employee.name)" style="margin-left:2rem">mdi-delete</v-icon>
                  
                  
                </td>
              </tr>
            </tbody>
          </v-data-table>
         
   
      </div>
    </div>
  </template>
  <script>
  import axios from 'axios'
import AdminSidebar from '../AdminSidebar.vue'

    export default {
      name:'InterestedLeads',

      
   
      components:
      {
        AdminSidebar
      },
      data: () => ({
       
       status:'',
        dialog: false,
        dialogDelete: false,
        formVisible:false,
        statusdata:'',
       
        leads:[],
        
        headers: [
  { title: 'EMP Name', value: 'employee' },
  { title: 'Uploaded Leads Count', value: 'assigned_leads' },
  { title: 'Completed', value: 'completed_leads' },
  { title: 'Remaining Count', value: 'remaining_leads' },
  { title: 'Action', value: 'action', sortable: false }
],

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
        this.branchname= this.$route.params.branch;
        this.status =  this.$route.params.status;
    
 
        this.interestedlead()
        this.fetchdata()
        
      },
    
      methods: {
        fetchdata(){
          if (this.status=='NotInterested')
          {
            this.status='Not Interested'
            axios.post('https://api.tkrgroups.co.in//statusdata', { branch: this.branchname,status:this.status })
  .then(response => {
    // handle response
    console.log(response.data)
    this.leads=response.data
  })
  this.status='NotInterested'
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
  alert(this.status )
  this.status=='FreeTrail'
  }
  else if(this.status=='WrongNumber'){
this.status=='Wrong Number'
axios.post('https://api.tkrgroups.co.in//statusdata', { branch: this.branchname,status:this.status })
  .then(response => {
    // handle response
    console.log(response.data)
    this.leads=response.data
  })
  this.status=='WrongNumber'
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
    this.branchname='branch-1'
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
   
   
   
  
   