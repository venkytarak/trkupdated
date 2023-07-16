<template>
    <AdminSidebar/>
    <div>
      <h1>Login Information</h1>
      <v-form>
        <v-text-field v-model="employeeName" label="Employee Name"></v-text-field>
        <v-btn @click="getLoginInformation" color="primary">Get Login Information</v-btn>
      </v-form>
  
      <v-card v-if="loginData.length > 0" class="mt-4">
        <v-data-table :headers="headers" :items="loginData" class="elevation-1">
          <template #item.action="{ item }">
            <v-btn :href="item.downloadLink" text small color="primary">Download</v-btn>
          </template>
        </v-data-table>
      </v-card>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import AdminSidebar from './AdminSidebar.vue';
  export default {
    components:
    {
        AdminSidebar
    },
    data() {
      return {
        employeeName: '',
        loginData: [],
        headers: [
          { text: 'Employee Name', value: 'employeeName' },
          { text: 'Login Time', value: 'loginTime' },
          { text: 'Logout Time', value: 'logoutTime' },
          { text: 'Action', value: 'action', sortable: false }
        ]
      };
    },
    created() {
      this.employeeName = this.$route.params.name;
      this.getemployee()
      this.getLoginInformation();
    },
    methods: {
      getemployee() {
        axios.post("https://api.tkrgroups.co.in/api/logindetails", {
  name: this.employeeName
})
  .then(response => {
    // Handle the response from the server
    console.log(response.data); // Assuming the response is in JSON format
    // Process the login details received from the server
  })
    
      },
      getLoginInformation() {
        // Sample data
        const sampleData = [
          {
            employeeName: "John Doe",
            loginTime: "2023-05-20 09:00:00",
            logoutTime: "2023-05-20 17:00:00",
            downloadLink: "/download/1"
          },
          {
            employeeName: "Jane Smith",
            loginTime: "2023-05-20 08:30:00",
            logoutTime: "2023-05-20 16:30:00",
            downloadLink: "/download/2"
          },
          // Add more sample data objects as needed
        ];
  
        // Filter data based on employeeName
        this.loginData = sampleData.filter(item => item.employeeName === this.employeeName);
      }
    }
  };
  </script>
  