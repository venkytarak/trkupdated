<template>
  <div class=""><EmpSidebarVue/>
  <div class="intl">
  
  
      <button @click="goBack" class="back mt-5"><v-icon>mdi-arrow-left-bold</v-icon></button>
   
      
      
      
 
      
        
              
              <v-card style="width:70rem;max-height:50rem" class="pform mt-5">
                <v-card-title>
                  <span class="text-h5">payment Form</span>
                </v-card-title>
    
                <v-card-text>
                  <v-container style=" overflow: auto;">
               
                    <v-row>
                     
                      <v-col cols="12" sm="6">
                        <v-row>
                          
                          <v-col cols="12" sm="6"><v-checkbox v-model="special" label="Special Client"></v-checkbox>
                          </v-col>
                          <v-col cols="12" sm="6"><v-text-field v-model="date" label="Today's Date" type="date" :value="new Date().toISOString().substr(0, 10)"></v-text-field>
                          </v-col>

                        </v-row>

                      </v-col>
                      
                      <v-col cols="12" sm="6">
                        <v-text-field v-model="camount" label="Service charges" ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field v-model="cname" label="Client Name" ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field v-if="paymentype === 'Full'" v-model="tamount" label="Total payment"></v-text-field>
                        <v-row v-if="paymentype === 'Partial'">
                          <v-col cols="12" sm="6">
                            <v-text-field v-model="tamount" label="Partial payment"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-text-field v-model="fdate" label="Future date " type="date"></v-text-field>
                          </v-col>
                        </v-row>
                        <v-text-field v-if="paymentype === 'Future'" v-model="fdate" label="Future Date" type="date"></v-text-field>
                      </v-col>
                      
                    
                      <v-col cols="12" sm="6">
                        <v-text-field v-model="mobile" label="Mobile number" ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field v-if="paymentype !== 'Future'" v-model="this.employeeName" label="Amount received by" readonly></v-text-field>
                      </v-col>
                     
                      <v-col cols="12" sm="6">
                        <v-text-field v-model="caltnumber" label="Alternate Mobile number" ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field v-if="paymentype !== 'Future'" v-model="Asendto" label="Amount send to"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="3">
                        <v-select v-model="paymentype" :items="paymentoption" label="Select Payment Options" required></v-select>
                      </v-col>
                      <v-col cols="12" sm="3">
                        <v-select v-model="segment" :items="pstatus" label="Select Options" required></v-select>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field v-model="cia" label="Client Investment amount"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <!-- <v-checkbox v-model="special" label="Special Client"></v-checkbox> -->

                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-textarea v-model="remarks" label="Enter Remarks" rows="2"></v-textarea>
                      </v-col>

                     
                     
                    </v-row>
                    
               
                    
                  </v-container>
                </v-card-text>
    
                <v-card-actions>
                  <!-- <v-spacer></v-spacer> -->
                  <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="close"
                    style="color:lawngreen"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="save"
                    :disabled="isSubmitDisabled"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
              
           
        
        
      
 
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
EmpSidebarVue,

    },
    data: () => ({
     
      dialog: false,
      dialogDelete: false,
      special: false,
      leads:[],
      date:'',
      camount:'',
      cname:'',
      tamount:'',
      partialamount:'',
      fdate:'',
      mobile:'',
      caltnumber:'',
      Asendto:'',
      paymentype:'',
      segment:'',
      cia:'',
      remarks:'',
    
    

      employeeName :'',
     
      payment:null,
  
      paymentoption:['Full','Partial','Future'],
      pstatus:['Equity','Commodity','Derivatives'],
        headers: [
        // {
        //   title: 'lead id',
        //   align: 'start',
        //   sortable: false,
        //   key: '0',
        // },
        { title: 'clientname', key: '5' },
        { title: 'Language', key: '6' },
        { title: 'date', key: '8' },
        // { title: 'amount', key: '4' },
        { title: 'status', key: '1' },
        { title: 'Segment', key: '4' },
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
       isSubmitDisabled() {
      return  !this.cname || !this.paymentype
    },
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
      
      this.employeeName = this.$route.params.employeeName;
     
      this.interestedlead()
      
    },
  
    methods: {
     

      interestedlead()
    {
      var empname = this.employeeName
      const status='interested';
axios.post('https://api.tkrgroups.co.in//leads/status',
{name:empname,
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

      

 

      
    //   },
    save() {
     
      
    
  axios
    .post('https://api.tkrgroups.co.in//intcl/payments', {
      emp_name: this.employeeName,
      special: this.special ? 'special' : 'regular',
      date:this.date,
      camount:this.camount,
      cname:this.cname,
      tamount:this.tamount,
      partialamount:this.partialamount,
      fdate:this.fdate,
      mobile:this.mobile,
      caltnumber:this.caltnumber,
      Asendto:this.Asendto,
      paymenttype:this.paymentype,
      segment:this.segment,
      cia:this.cia,
      remarks:this.remarks,
   
    })
    .then((response) => {
      console.log(response.data);
      Swal.fire({
        title: 'Success',
        text: 'Data submitted successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        location.reload();
      });
    })
    .catch((error) => {
      console.log(error);
    });
    this.dialogVisible = false;
}
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
.pform
{
  margin-left:2rem;
 
}
</style>