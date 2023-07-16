<template>
    <div class="">
      <AdminSidebar/>
      
      <div class="intl" style="display:flex;justify-content:space-between;align-items:center"><button @click="goBack" class="back mt-5" ><v-icon>mdi-arrow-left-bold</v-icon></button>
        <v-btn style="color:White;background:blue;margin-right:3rem" class="mt-5">VIEW DND</v-btn> 
      </div>
        
        <v-data-table
          :headers="headers"
          :items="formattedLeads"
          class="elevation-1 mt-5"
          :search="search"
          style="max-width:40%;margin-left:15rem;border:1px solid black"
          
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>DND  Data</v-toolbar-title>
              <!-- <v-divider class="mx-4" inset vertical></v-divider> -->
             
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
    <!-- </div> -->
  </template>
  
  <script>
  import axios from 'axios'
import AdminSidebar from './AdminSidebar.vue';
  
  export default {
    name: 'InterestedLeads',
    components: {
        AdminSidebar
    },
    data: () => ({
  employeeName:'',
  leads:[],
  headers: [
    { title: 'ID', value: 'id',align: 'center' },
        { title: 'Phone Number', value: 'phone_number',align: 'center' }
        
        
        ]
        , search: "",
  
    }),
    computed: {
    formattedLeads() {
      return this.leads.map(lead => ({
        id: lead[0],
        phone_number: lead[1]
      }));
    }
  },
    
    created () {
    //   this.employeeName = this.$route.params.employeeName;
      this.fetchPaymentClients();
     
    },
  
   
    methods: {
        goBack()
        {
            this.$router.go(-1)
        },
      fetchPaymentClients () {
    axios.get('https://api.tkrgroups.co.in/dnddata')
      .then(response => {
        this.leads = response.data.dnd.filter(dnd => {
        return  dnd;
      });
      console.log(this.leads);
        });
  },
  

  
  
  }
  
  
     
  
    }
    </script>
  <style>
  th{
    border: 1px solid #8888;
  }

</style>