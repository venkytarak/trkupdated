<template>
    <div>
        <AdminSidebar/>
        <div class="Dtitle"><button @click="goBack" class="back mt-5"><v-icon>mdi-arrow-left-bold</v-icon></button>
</div>
      <v-container class="mt-5">
        <v-row>
          <v-col v-for="(branch, index) in leads" :key="index" cols="12" sm="6" md="4" lg="3">
            <v-card @click="navigateToEmployees(branch[0],status)">
              <v-card-title>
                {{ branch[0] }}
              </v-card-title>
              <v-card-subtitle>
                {{ branch.location }}
              </v-card-subtitle>
              <v-card-text>
                {{status }} count: {{ branch[1] }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  import AdminSidebar from './AdminSidebar.vue';
  export default {
    components:
    {
AdminSidebar
    },
    data() {
      return {
        status:'',
        branchname:[],
        leads:[]
      };
    },
    created()
    {
      this.fetchbranches()
      this.status = this.$route.query.status;
     
      this.fetchstatus()
      
     

    
    },
    methods: {
     async fetchstatus()
      {
          
        axios.get('https://api.tkrgroups.co.in/datacount', { params: { status:this.status, branch:this.branchname } })
  .then(response => {
    this.leads = response.data;
    console.log(this.leads);
   
  })
  .catch(error => {
    console.error(error);
  });},
  
      goBack() {
      this.$router.go(-1)
    },
      navigateToEmployees(branch,status) {
        
       
        this.$router.push({ name: 'Rem', params: { branch: branch,status:status } });

      },
      async fetchbranches()
      {
        try {
        const { data } = await axios.get(
          "https://api.tkrgroups.co.in//apiget/branchename"
        );
        // this.managers = data.emp_list
        this.branchname = data.branch;

        console.log(this.branchname);
      } catch (error) {
        console.error(error);
      }
      },
    }
  };
  </script>
  