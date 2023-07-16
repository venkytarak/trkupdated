
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
          <v-toolbar-title v-if="status === 'WrongNumber'" style="color:blue;font-size:1.5rem">Wrong Number/Switch Leads</v-toolbar-title>
          <v-toolbar-title v-if="status === 'completed'" style="color:blue;font-size:1.5rem">Completed  Leads</v-toolbar-title>


         
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
    
        </v-toolbar>
    <v-data-table
    :headers="getTableHeaders()"
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
        @click="navigateToLDPage(item.raw)"
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
  import axios from 'axios'
import AdminSidebar from './AdminSidebar.vue'
import Swal from "sweetalert2";

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
        
          headers: {
            uploaded: [
          { title: 'EMP Name', value: 'employee' },
          { title: 'Uploaded Leads Count', value: 'assigned_leads' },
          { title:'completed_leads',value:'completed_leads'},
          { title: 'Remaining Count', value: 'remaining_leads' },
          
          { title: 'Actions', key: 'actions', sortable: false },
        ],
        Assigned: [
          { title: 'EMP Name', value: 'employee' },
          { title: 'Assigned Leads Count', value: 'assigned_leads' },
          { title: 'Remaining Count', value: 'remaining_leads' },
          { title: 'Actions', key: 'actions', sortable: false },        ],
        Remaining: [
          { title: 'Branch Name', value: 'branchName' },
          { title: 'Assigned Leads Count', value: 'uploadedLeadsCount' },
          { title: 'Remaining Count', value: 'remainingCount' },
          { title: 'Actions', key: 'actions', sortable: false },        ],
        Interested: [
          // { title: 'EMP ID', value: '' },
          { title: 'EMP NAME', value: '0' },
          { title: 'NO OF CLIENTS', value: '1' },
          // { title: 'Actions', key: 'action', sortable: false },       
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
        completed: [
          // { title: 'EMP ID', value: '' },
          { title: 'EMP NAME', value: '0' },
          { title: 'NO OF CLIENTS', value: '1' },
          // { title: 'Actions', key: 'action', sortable: false },       
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
        this.branchname= this.$route.params.branch;
        this.status =  this.$route.params.status;
    
 
        this.interestedlead()
        this.fetchdata()
        
      },
    
      methods: {
        
        navigateToLDPage(item) {
          this.$router.push({ name: 'lead-page', params: { employee: item.employee,branchname:this.branchname,status: this.status } });
       
  },




        deleteItem(item) {
          axios.post('https://api.tkrgroups.co.in//delete', { name:item.employee,branch:this.branchname })
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
         // Access the raw object from the Proxy
  // const remainingCount = item.remaining_leads;
  //  // Access the 'remaining_leads' property
  // console.log(remainingCount); 
  // console.log(item.employee)
  // console.log(this.branchname)
      // console.log(item);
    },
        fetchdata(){
          if (this.status=='NotInterested')
          {
            this.status='Not Interested'
            axios.post('https://api.tkrgroups.co.in//statusdata', { branch: this.branchname,status:this.status })
  .then(response => {
    // handle response
    console.log(response.data)
    console.log(this.status)
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
console.log(this.status)


axios.post('https://api.tkrgroups.co.in//statusdata', { branch: this.branchname,status: this.status })
  .then(response => {
    // handle response
    console.log(response.data)
    this.leads=response.data
  })
 
  this.status=='FreeTrail'
  }
  else if(this.status=='WrongNumber'){
this.status=='WrongNumber'
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
  })}
  else if(this.status=='Busy'){
    this.status='Busy'
            axios.post('https://api.tkrgroups.co.in//statusdata', { branch: this.branchname,status:this.status })
  .then(response => {
    // handle response
    console.log(response.data)
    this.leads=response.data
  })

  }
  else if(this.status=='completed'){
  
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
td{
 
  text-align: center;
}
v-toolbar-title
{
  color: blue;
}
  </style>
   
   
   
  
   