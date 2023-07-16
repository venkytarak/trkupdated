<template>
    <div class="">
      <AdminSidebar/>
    <div class="overflow-x-auto">
    
    
        <button @click="goBack" class="back mt-5"><v-icon>mdi-arrow-left-bold</v-icon></button>
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
import AdminSidebar from './AdminSidebar.vue'

    export default {
      name:'InterestedLeads',
      
      components:
      {
        AdminSidebar
      },
      data: () => ({
       status:'',
       branch:'',
        dialog: false,
        dialogDelete: false,
        special: false,
        leads:[],
        date:'',
        fdate:'',
        updatedstatus:'',
        Asendto:'',
        employeeName :'',
        partialamount:'',
        payment:null,
      paymentype:'',
        paymentoption:['Full','Partial','Future'],
        pstatus:['completed','partiallycompleted','Future'],
          headers: [
          // {
          //   title: 'lead id',
          //   align: 'start',
          //   sortable: false,
          //   key: '0',
          // },
          { title: 'EMP NAME', value: '0' },
          { title: 'NO OF CLIENTS', value: '1' },
          // { title: 'status', key: '1' },
          // { title: 'Actions', key: 'actions', sortable: false },
        ],
       
        // desserts: [],
       
        editedIndex: -1,
        editedItem: {
          0: '',
          client: 0,
          date: 0,
          amount: 0,
          status: 0,
        },
        defaultItem: {
        0: '',
          client: 0,
          date: 0,
          amount: 0,
          status: 0,
        },
        items: [
      "completed","Partial","Future"
    ],
      }),
  
      computed: {
        formTitle () {
          return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
      },
  
      watch: {
        dialog (val) {
          val || this.close()
        },
       
      },
  
      created () {
        
        this.status = this.$route.query.status;
        // this.status = this.$route.query.status;
        this.branch = this.$route.query.Branch;
     
      
        this.interestedlead()
        
      },
    
      methods: {
       

        interestedlead()
      {
        
        const status='interested';
  axios.post('https://api.tkrgroups.co.in//leads/status',
  {
  status:status})
    .then(response => {
      this.leads=response.data.leads;
      console.log(this.leads)
     
    });
      },
  
        goBack() {
      this.$router.go(-1)
    },
      
        editItem (item) {
          
          this.editedIndex = this.leads.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialog = true
          this.selecteditem=item
          console.log(this.selecteditem[1])
        },
  
        
  
        close () {
          this.dialog = false
          this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
          })
        },
  
        
  
        save () {
          
          axios.post('https://api.tkrgroups.co.in//intcl/payments', {
            emp_name:this.employeeName,

        date:this.date,
        fdate:this.fdate,
        special: this.special ? 'special' : 'regular',
        client_name:this.selecteditem[5],
        amount:this.selecteditem[4],
        partialamount:this.partialamount,
        amount_sentto:this.Asendto,
        number:this.selecteditem[2],
        amount_receivedby:this.selecteditem[9],
        paytype:this.paymentype,
        // paystatus:this.payment,
        language:this.selecteditem[6],
        updatedstatus:this.updatedstatus,
        branch:this.selecteditem[7]

        
      })
        .then(response => {
         console.log(response.data)});
         this.dialogVisible = false;
       

   

        
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
  
   
  