<template>
  <div class="">
    <EmpSidebarVue/>
    <div class="intl"><button @click="goBack" class="back mt-5"><v-icon>mdi-arrow-left-bold</v-icon></button>
      <v-data-table
        :headers="headers"
        :items="leads"
        class="elevation-1 mt-5"
        :search="search"
        
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Payments clients Data</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search by mobile number"
            single-line
            hide-details
          ></v-text-field>
          </v-toolbar>
        </template>
      
        
      </v-data-table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import EmpSidebarVue from './EmpSidebar.vue'

export default {
  name: 'InterestedLeads',
  components: {
    EmpSidebarVue
  },
  data: () => ({
employeeName:'',
leads:[],
headers: [
        { title: 'ID', value: '0' },
        { title: 'Employee Name', value: '1' },
      
        { title: 'Date', value: '3' },
        { title: 'Client Name', value: '4' },
        { title: 'Amount', value: '9' },
        { title: 'Received Amount', value: '10' },
        { title: 'Amount Received To', value: '11' },
        { title: 'Amount Sent To', value: '12' },
        { title: 'Payment Type', value: '7' },
        { title: 'Remaining Amount', value: '15' },
        // { title: 'Status', value: '11' },
        { title: 'Client type', value: '17' },
        { title: 'Segment', value: '8' }
      ]
      , search: "",

  }),

  
  created () {
    this.employeeName = this.$route.params.employeeName;
    this.fetchPaymentClients();
    // this.fetchFullPaymentClients() 
  },

  // methods: {
  //   fetchPaymentClients () {
  // axios.get('https://api.tkrgroups.co.in//intcl/payments?employeeName=' + this.employeeName)
  //   .then(response => {
  //     this.leads = response.data.clients;
  //     console.log(this.leads);
  //   });
  methods: {
    fetchPaymentClients () {
  axios.get('https://api.tkrgroups.co.in//intcl/payments?employeeName=' + this.employeeName)
    .then(response => {
      this.leads = response.data.clients.filter(client => {
        return  client[7] !== 'Future';
      });
      console.log(this.leads);
    }); 
},

  // fetchPaymentClients() {
  //   axios.get('https://api.tkrgroups.co.in//intcl/payments?employeeName=' + this.employeeName)
  //     .then(response => {
  //       this.leads = response.data.clients.filter(client => client[7] !== "Future");
  //       console.log(this.leads);
  //     });
  // }
  

// },
// fetchFullPaymentClients() {
//   axios.get('https://api.tkrgroups.co.in//intcl/payments?employeeName=' + this.employeeName)
//     .then(response => {
//       const leads = response.data.clients.filter(client => client[7] === 'Full');
//       console.log(leads);
//       // Do something with the fullPaymentClients array here
//     });
}


   

  }
  </script>
