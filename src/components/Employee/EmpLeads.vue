<template>
 <div class=""> <EmpSidebarVue />
  <v-container>
    <v-card-title>
      <span class="text-h5">Leads </span>
    </v-card-title>
    <v-row class="tota">
      <v-row class="tot">
        <v-col cols="12" sm="3">
          <v-card class="mx-auto h" width="280" @click="openForm">
            <v-icon
              class="ma-2"
              variant="text"
              icon="mdi-account"
              color="pink"
            ></v-icon>
            <v-card-text> Total Leads: {{ leads.length }}
              <div v-if="currentLeadIndex !== null">
                <p>Current Lead: {{ currentLead}}</p>
              </div>
              <div v-else>
                <p>No leads to display</p>
              </div>
            </v-card-text>

            <!-- <v-card-text class="t"> {{ assignedcount  }} </v-card-text> -->
         
          </v-card>
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
                      <v-text-field v-model="cname" label="client Name" required />
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field v-model="number" label="Phone Number"  :value="leads[currentLeadIndex].mobile_number" disabled required />
                    </v-col>
                    
                  
                    <v-col cols="12" sm="6">
                      <v-text-field v-model="altclientPhone" label="alternate Phone Number"  required />

                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field v-model="leads[currentLeadIndex].language"  label="Language" required readonly></v-text-field>
                    </v-col>
                    
                    <v-col cols="12" sm="6">
                      <v-select v-model="status" :items="statuss" label="Update Status" required></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" v-show="status == 'Free Trail'">
                      <v-text-field v-model="freetdate" label="Free Trail Ending Date" type="date"></v-text-field>                    </v-col>
                    
                      <v-col cols="12" sm="6" v-show="status !== 'Not Interested' && status !== 'Busy/notpickup/Switchoff'   && status !== 'Wrong Number'">
                        <v-select v-model="payment" :items="options" label="Select Options" required></v-select>
                      </v-col>
                      
                  </v-row>
                </v-form>              
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" @click="submitForm" :disabled="isSubmitDisabled">Submit</v-btn>
                <v-btn color="secondary" @click="closeForm">Close</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
        <v-col cols="12" sm="3">
          <v-card :to="{ path: '/Intlead/' + employeeName, query: { status: 'Interested' } }"
          class="mx-auto h" width="270">
            <v-icon
              class="ma-2"
              variant="text"
              icon="mdi-thumb-up"
              color="green"
            ></v-icon>
            <v-card-text>Intrested Leads </v-card-text>
            <v-card-text class="t"> {{ intcount}} </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="3">
          <v-card :to="{ path: '/Intlead/' + employeeName, query: { status: 'Free trail' } }" class="mx-auto h" width="270">
            <v-icon
              class="ma-2"
              variant="text"
              icon="mdi-thumb-up"
              color="green"
            ></v-icon>
            <v-card-text>Free trail </v-card-text>
            <v-card-text class="t"> {{ freetrail}} </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="3">
          <v-card class="mx-auto h" width="270" :to="{ path: '/Intlead/' + employeeName, query: { status: 'Not Interested' } }">
            <v-icon
              class="ma-2"
              variant="text"
              icon="mdi-thumb-down"
              color="red"
            ></v-icon>
            <v-card-text>Not Intrested </v-card-text>
            <v-card-text class="t">{{ notcount }}</v-card-text>
          </v-card>
        </v-col>
     
      </v-row>
      <v-row class="tot mt-10">
        <v-col cols="12" sm="3">
          <v-card class="mx-auto h" width="270" >
            <v-icon
              class="ma-2"
              variant="text"
              icon="mdi-phone"
              color="blue"
            ></v-icon>
            <v-card-text>Today Calls</v-card-text>
            <v-card-text class="t">{{ todaycount }} </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="3">
          <v-card class="mx-auto h" width="250" :to="{ path: '/Intlead/' + employeeName, query: { status: 'Follow up' } }">
            <v-icon
              class="ma-2"
              variant="text"
              icon="mdi-account-group"
              color="orange"
            ></v-icon>
            <v-card-text>Follow Ups</v-card-text>
            <v-card-text class="t"> {{ followupcount }} </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="3">
          <v-card class="mx-auto h" width="270" :to="{ path: '/Intlead/' + employeeName, query: { status: 'Wrong Number' } }">
            <v-icon
              class="ma-2"
              variant="text"
              icon="mdi-cancel"
              color="pink"
            ></v-icon>
            <v-card-text>Wrong Number/Switch Off</v-card-text>
            <v-card-text class="t"> {{ wn}} </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="3">
          <v-card class="mx-auto h" width="250"  :to="{ path: '/Intlead/' + employeeName, query: { status: 'Busy/notpickup/Switchoff' } }">
            <v-icon
              class="ma-2"
              variant="text"
              icon="mdi-minus-circle"
              color="blue"
            ></v-icon>
            <v-card-text> Busy/Not Pick Up</v-card-text>
            <v-card-text class="t"> {{ busy }} </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-row>
  </v-container></div>
</template>
<script>
import axios from 'axios';
import EmpSidebarVue from './EmpSidebar.vue';
import Swal from 'sweetalert2';
export default {
  components: {
   EmpSidebarVue
  },
  data() {
      return {
        employeeName:'',
        intcount:'0',
        notcount:'0',
        dnd:'0',
        busy:'0',
        todaycount:'0',
        followupcount:'0',
        assignedcount :'0',
        freetrail:'0',
        wn:'0',
        leads: [],
      currentLeadIndex:0,
      clientData: '',
      formVisible: false,
      statuss:['Interested','Not Interested','Free Trail','Follow up','Busy/notpickup','Wrong Number/Switchoff'],
        options:['Equity','Commodity','Derivatives'],
        date: new Date().toISOString().substring(0, 10),
        cname:'',
         number:'',
        altclientPhone:'',
        status:'',
        payment:'',
        freetdate:'',
        

        
      };
    },
    computed: {
      isSubmitDisabled() {
      return  !this.cname || !this.status 
    },
    currentLead() {
      
  const lead = this.leads[this.currentLeadIndex];
  console.log(lead)
  return lead ? lead.mobile_number : null;
}

  },
    created()
  {
    this.employeeName = this.$route.params.employeeName;
    
   
    console.log(this.employeeName);
    this.fetchInterested()
    this.fetchnotInterested()
    this.fetchDnd()
    this.fetchbusy()
    this.fetchtodaycalls()
    this.FollowUp()
    this.assigncount()
    this.fetchleads()
    this.fetchfreetrail()
    this.fetchwrongnumber()

  },
  methods:
  {
    fetchwrongnumber()
    {
      axios.get('https://api.tkrgroups.co.in/leads_status', {
    params: {
      status: 'Wrong Number/Switchoff',
      empname:this.employeeName

    }
  })
  .then(response => {
    this.wn= response.data.emp;
    // alert(this.followupcount)
  })

  .catch(error => {
    console.log(error);
  });
    },
    fetchfreetrail()
    {
      axios.get('https://api.tkrgroups.co.in/leads_status', {
    params: {
      status: 'Free trail',
      empname:this.employeeName

    }
  })
  .then(response => {
    this.freetrail= response.data.emp;
    // alert(this.followupcount)
  })

  .catch(error => {
    console.log(error);
  });
    },
    fetchleads() {
        
      const name = this.employeeName;
      axios.get(`https://api.tkrgroups.co.in/getleads/emp?name=${name}`)
    .then(response => {
      const leads = response.data.leads;
      console.log(leads)
      this.leads = leads.map(lead => ({ id: lead[0], mobile_number: lead[1],language: lead[2] })); // get the lead id and mobile numbers
      console.log(this.leads);
    });


      },
      openForm() {
        
      if (this.currentLeadIndex !== null) {
        this.formVisible = true;
        this.number = this.leads[this.currentLeadIndex];
    
        console.log(this.number.mobile_number);
        console.log(this.cname)
        console.log(this.date)
      }
    },
    closeForm() {
      this.formVisible = false;
    },
    // submitForm() {
    //   if (this.$refs.form.validate()) {
    //     this.leads.splice(this.currentLeadIndex, 1, this.clientData);
    //     this.clientData = '';
    //     this.currentLeadIndex = this.currentLeadIndex < this.leads.length - 1 ? this.currentLeadIndex + 1 : null;
  
    //     this.formVisible = false;
    //   }
    // },
    submitForm() {
      if (this.$refs.form.validate()) {
        // this.leads.splice(this.currentLeadIndex, 1);
        // this.cname = '';
        this.number = '';
        this.currentLeadIndex = this.currentLeadIndex < this.leads.length  ? this.currentLeadIndex : null;
     
        this.formVisible = false;
        console.log(this.number),
        console.log(this.payment)
   
        console.log(this.cname)
        console.log(this.leads[this.currentLeadIndex].mobile_number)
        
        // alert(this.date)
        axios.post('https://api.tkrgroups.co.in/updatelead/status', {
        status: this.status,
        lead_id: this.leads[this.currentLeadIndex].id,

        number:this.leads[this.currentLeadIndex].mobile_number,
        
        language:this.leads[this.currentLeadIndex].language,
        date:this.date,
        
        name:this.cname,
        freedate:this.freetdate,
        segment:this.payment,
        // amount:this.amount,
        alternatenumber:this.altclientPhone,
        empname:this.employeeName,
        

        
      })
      .then(response => {
      console.log(response.data)
      Swal.fire({
        title: 'Success',
        text: 'Updated successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        location.reload();
      });
      });
      this.leads.splice(this.currentLeadIndex, 1);
    }
    },
    assigncount() {
  axios.get('https://api.tkrgroups.co.in/assignesleads', {
    params: {
      
      emp_name:this.employeeName
    }
  })
  .then(response => {
    this.assignedcount = response.data.count[0];
    console.log(response.data.count[0])
    
  })
  .catch(error => {
    console.log(error);
  });
},
    FollowUp() {
  axios.get('https://api.tkrgroups.co.in/leads_status', {
    params: {
      status: 'Follow Up',
      empname:this.employeeName

    }
  })
  .then(response => {
    this.followupcount = response.data.emp;
    // alert(this.followupcount)
  })

  .catch(error => {
    console.log(error);
  });
},
    
fetchtodaycalls() {
  axios.get('https://api.tkrgroups.co.in/todaycalls', {
    params: {
      name: this.employeeName
    }
  })
  .then(response => {
    this.todaycount = response.data.count;
    console.log(this.todaycount);
  })
  .catch(error => {
    console.log(error);
  });


      
    },
    fetchInterested() {
  axios.get('https://api.tkrgroups.co.in/leads_status', {
    params: {
      status: 'Interested',
      empname:this.employeeName
    }
  })
  .then(response => {
    this.intcount = response.data.emp;
  })
  .catch(error => {
    console.log(error);
  });
},
fetchnotInterested() {
  axios.get('https://api.tkrgroups.co.in/leads_status', {
    params: {
      status: 'Not interested',
      empname:this.employeeName
    }
  })
  .then(response => {
    this.notcount =response.data.emp;
  })
  .catch(error => {
    console.log(error);
  });
},
fetchbusy() {
  axios.get('https://api.tkrgroups.co.in/leads_status', {
    params: {
      status: 'Busy/notpickup',
      empname:this.employeeName
    }
  })
  .then(response => {
    this.busy =response.data.emp;
  })
  .catch(error => {
    console.log(error);
  });
},
fetchDnd() {
  axios.get('https://api.tkrgroups.co.in/leads_status', {
    params: {
      status: 'Dnd',
      empname:this.employeeName
    }
  })
  .then(response => {
    this.dnd = response.data.emp;
  })
  .catch(error => {
    console.log(error);
  });
}


  }
};
</script>
<style>
.tota {
  margin-top: 3%;
}

.h {
  text-align: center;
  /* height: 10rem; */
}
.t {
  font-size: 1.6rem;
}
</style>
