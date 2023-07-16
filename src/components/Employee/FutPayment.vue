<template>
  <div class="">
    <EmpSidebarVue/>
    <div class="intl"><button @click="goBack" class="back mt-5"><v-icon>mdi-arrow-left-bold</v-icon></button>
      <v-data-table
        :headers="headers"
        :items="futureClients"
        class="elevation-1 mt-5"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Future payments Data</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
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
// clients:[],
futureClients:[],
headers: [
       
        { title: 'Employee Name', value: '2' },
        { title: 'Client Name', value: '1' },
        { title: 'Mobile_number', value: '5' },
        // { title: 'Date', value: '3' },14
        { title: 'Future Date', value: '14' },
        { title: 'Client Type', value: '17' },
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
        console.log(clients)
        const futureClients = clients.filter(client => client[7] === 'Future');
        console.log(futureClients);
        this.futureClients = futureClients;
      });
      },

   

  }}
  </script>
