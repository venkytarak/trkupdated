<template>
  <div class="">
 
      <v-data-table
        :headers="headers"
        :items="partialPayments"
        class="elevation-1 mt-5"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title style="color:blue">Clients payments Data</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>
        
      </v-data-table>
    </div>

</template>

<script>
import axios from 'axios'

export default {
  name: 'InterestedLeads',
  components: {

  },
  created () {
    this.branchname= this.$route.params.branchName;
 this.managername= this.$route.params.manager;
    this.fetchPaymentClients();
  },

  data: () => ({
    employeeName:'',
    partialPayments:[],
    branchname:'',
    headers: [
      // { title: 'ID', value: '0' },
      { title: 'Employee Name', value: '1' },
      { title: 'Client Name', value: '4' },
    
     
      { title: 'Date', value: '3' },
      { title: 'Payment type', value: '7' },
      { title: 'Amount', value: '9' },
      { title: 'Paid', value: '10' },
      { title: 'Remaining', value: '15' },
      { title: 'recieved to', value: '1' },
      { title: 'sent to', value: '12' },
      { title: 'Segment', value: '8' },
    ]
  }),

  
  methods: {
    fetchPaymentClients () {
  const role = 'manager';
  const bname = this.branchname;
  axios.get(`https://api.tkrgroups.co.in//pam/${role}?branchName=${bname}`)
  .then(response => {
    const clients = response.data.clients;
    console.log(response.data.clients);
    this.partialPayments = clients;
  });
},

  }

}
</script>
