
  <template>
    <div>
      <EmpSidebarVue/>
      <div class="overflow-x-auto">
        <button @click="goBack" class="back mt-5">
          <v-icon>mdi-arrow-left-bold</v-icon>
        </button>
        <v-data-table
          :headers="headers"
          :items="leads"
          class="elevation-1 mt-5 d-block d-sm-table"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title v-if="status === 'Interested'">Interested clients</v-toolbar-title>
              <v-toolbar-title v-if="status === 'Free trail'">Free trail clients</v-toolbar-title>
              <v-toolbar-title v-if="status === 'Not Interested'">Not Interested clients</v-toolbar-title>
              <v-toolbar-title v-if="status === 'Follow up'">Follow up clients</v-toolbar-title>
              <v-toolbar-title v-if="status === 'Wrong Number'">Wrong Number clients</v-toolbar-title>
              <v-toolbar-title v-if="status === 'Busy/notpickup/Switchoff'">Busy/notpickup/Switchoff - clients</v-toolbar-title>

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
                          <v-select v-model="status" :value="selecteditem[1]" :items="statuss" label="Update Status" required></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" v-show="status == 'Free Trail'">
                          <v-text-field v-model="freetdate" label="Free Trail Ending Date" type="date"></v-text-field>                    </v-col>
                        
                          <v-col cols="12" sm="6" v-show="status !== 'Not Interested' && status !== 'Busy/notpickup' && status !== 'Switchoff'  && status !== 'Wrong Number'">
                            <v-select v-model="selecteditem[4]" :items="options" label="Select Options" required></v-select>
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
import EmpSidebarVue from './EmpSidebar.vue'
import Swal from 'sweetalert2';

    export default {
      name:'InterestedLeads',
      
      components:
      {
EmpSidebarVue
      },
      data: () => ({
       
        dialog: false,
        dialogDelete: false,
        formVisible:false,
        special: false,
        status:'',
        leads:[],
        date:'',
        fdate:'',
        selecteditem:'',
        updatedstatus:'',
        Asendto:'',
        employeeName :'',
        partialamount:'',
        payment:null,
      paymentype:'',
      statuss:['Interested','Not Interested','Free Trail','Follow up','Busy/notpickup','Wrong Number/Switchoff'],
        options:['Equity','Commodity','Derivatives'],
          headers: [
          // {
          //   title: 'lead id',
          //   align: 'start',
          //   sortable: false,
          //   key: '0',
          // },
          { title: 'Actions', key: 'actions', sortable: false },
          { title: 'clientname', key: '5' },
          { title: 'Language', key: '6' },
          { title: 'Updated on', key: '8' },
          // { title: 'amount', key: '4' },
          { title: 'status', key: '1' },
          { title: 'Segment', key: '4' },
         
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
       
  
      watch: {
        dialog (val) {
          val || this.close()
        },
       
      },
    },
  
      created () {
        
        this.employeeName = this.$route.params.employeeName;
        this.status = this.$route.query.status;
        // alert(this.status)
  console.log(status);
        this.interestedlead()
        
      },
    
      methods: {
       

        interestedlead()
      {
        var empname = this.employeeName
        
  axios.post('https://api.tkrgroups.co.in//leads/status',
  {name:empname,
  status:this.status})
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
      
         this.formVisible=true
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
          
          axios.post('https://api.tkrgroups.co.in//updatelead/statuss', {
        status: this.status,
        segment:this.selecteditem[4],
        date:this.date,
        // lead_id: this.leads[this.currentLeadIndex].id,
        number:this.selecteditem[2],
        name:this.selecteditem[5],

        // lead_id: this.selecteditem[0],
        
        empname:this.employeeName,

        
      })
        .then(response => {
          console.log(response)
          Swal.fire({
        title: 'Success',
        text: 'Updated successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        location.reload();
      })
      this.formVisible=false
        });
        
        //  var date=this.date
        //  var updatedstatus=this.updatedstatus
        // var Asendto=this.Asendto
        // var partialamount=this.partialamount
        // var payment=this.payment
        // var paymentype=this.paymentype
        // console.log(paymentype)

   

        
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
   
   
   
  
   