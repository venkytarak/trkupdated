<template>
    <div>
        <AdminSidebar/>
        <div class="Dtitle"><button @click="goBack" class="back mt-5"><v-icon>mdi-arrow-left-bold</v-icon></button>
</div>
      <v-container class="mt-5">
        <v-row>
          <v-col v-for="(branch, index) in branchname" :key="index" cols="12" sm="6" md="4" lg="3">
            <v-card  @click="gotobranch(branch.branch_name)">
              <v-card-title>
                {{ branch.branch_name }}
              </v-card-title>
              <v-card-subtitle>
                {{ branch.location }}
              </v-card-subtitle>
              <v-card-text>
               Target: {{ branch.target_amount}} <br>
                Completed: {{ branch.completed_amount }} <br>
                Remaining: {{ branch.remaining_amount }}<br>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  import AdminSidebar from '../AdminSidebar.vue';
  export default {
    components:
    {
AdminSidebar
    },
    data() {
      return {
        leads:'',
        status:'',
        branchname:[],
      
      };
    },
    created()
    {
      this.fetchbranches()
      this.fetchsales()

   


    },
    methods: {
      gotobranch(branch)
      {
     
  this.$router.push({ name: 'sb', query: { branch } });

      },
      async fetchsales()
      {
        axios.get('https://api.tkrgroups.co.in/adsalesdata')
  .then(response => {
    this.branchname= response.data.data;
    console.log(this.leads);

   
  })
  .catch(error => {
    console.error(error);
  });   
      },
      goBack() {
      this.$router.go(-1)
    },
      navigateToEmployees(branch) {
        this.$router.push({ 
  name: 'adminintl', 
  params: { 
    branch: branch,
    status: this.status
  } 
});      },
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
  