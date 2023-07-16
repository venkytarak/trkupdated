<template>
  <div class="">
 <ManagerSidebar/>
      <v-data-table
        :headers="headers"
        :items="partialPayments"
        class="elevation-1 mt-5"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title style="color:blue">Special Clients payments Data</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>
        
      </v-data-table>
    </div>

</template>

<script>
import axios from 'axios'
import ManagerSidebar from './ManagerSidebar.vue';
export default {
  name: 'InterestedLeads',
  components: {
    ManagerSidebar
  },
  data: () => ({
    employeeName:'',
    partialPayments:[],
    branchname:'',
    headers: [
      { title: 'ID', value: '0' },
      { title: 'Employee Name', value: '1' },
      { title: 'Client Name', value: '4' },
      // { title: 'Branch Name', value: '2' },
     
      { title: 'upDated on', value: '3' },
  
      { title: 'Segment', value: '8' },
      // { title: 'payment_type', value: '9' },
    ]
  }),

  created () {
    this.branchname= this.$route.params.branchName;
 this.managername= this.$route.params.manager;
    this.fetchPaymentClients();
  },

  methods: {
    fetchPaymentClients () {
  const role = 'manager';
  const branchName = this.branchname;

  axios.get(`https://api.tkrgroups.co.in//spcl/${role}?branchName=${branchName}`)
  .then(response => {
    const clients = response.data.clients;
    console.log(response.data.clients);
    this.partialPayments = clients;
  });
},

  }

}
</script>
