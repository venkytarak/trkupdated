<template>
  <div class="">
 <EmpSidebar/>
    
      <v-data-table
        :headers="headers"
        :items="partialPayments"
        class="elevation-1 mt-5"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Special Clients payments Data</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>
        
      </v-data-table>
    </div>

</template>

<script>
import axios from 'axios'
import EmpSidebar from './EmpSidebar.vue';

export default {
  name: 'InterestedLeads',
  components: {
  EmpSidebar
  },
  data: () => ({
    employeeName:'',
    partialPayments:[],
    headers: [
      // { title: 'ID', value: '0' },
      { title: 'Employee Name', value: '1' },
      { title: 'Client Name', value: '4' },
     
      { title: 'Date', value: '3' },
  
      { title: 'Lead_status', value: '11' },
      { title: 'payment_type', value: '7' },
      { title: 'Segment', value: '8' },
    ]
  }),

  created () {
    this.employeeName = this.$route.params.employeeName;
    this.fetchPaymentClients();
  },

  methods: {
    fetchPaymentClients () {
      axios.get('https://api.tkrgroups.co.in//intcl/payments?employeeName='+ this.employeeName)
    .then(response => {
      const clients = response.data.clients;
      console.log(response.data.clients);
      const partialClients = clients.filter(client => client[17] === 'special');
      console.log(partialClients);
      this.partialPayments = partialClients;
    });
    },
  }
}
</script>
