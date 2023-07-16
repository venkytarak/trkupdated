<template>
    <div>
        <AdminSidebar/>
        <div class="Dtitle"><button @click="goBack" class="back mt-5"><v-icon>mdi-arrow-left-bold</v-icon></button>
</div>
      <v-container class="mt-5">
        <v-row>
          <v-col v-for="(branch, index) in branchname" :key="index" cols="12" sm="6" md="4" lg="3">
            <v-card  :to="{ path: '/interest/', query: {Branch: branch, status:this.status } }">
              <v-card-title>
                {{ branch }}
              </v-card-title>
              <v-card-subtitle>
                {{ branch.location }}
              </v-card-subtitle>
              <v-card-text>
                Assigned: {{ branch.assigned }}
                Completed: {{ branch.completed }}
                Remaining: {{ branch.remaining }}
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
      
      };
    },
    created()
    {
      this.fetchbranches()
      this.status = this.$route.query.status;


    },
    methods: {
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
  