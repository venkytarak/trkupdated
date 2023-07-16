<template>
    <ManagerSidebar/> 
    <div>
      <div class="heading mt-5" >
        <h2 style="margin-left:2rem">Employee's Sales Data</h2>
        <v-btn @click="downloadAllEmployeeData()">Download All Data</v-btn>
  
      </div>
      <v-data-table>
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Target</th>
            <th>Completed</th>
          
            <th>Pending</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="employee in employees" :key="employee.id">
            <td><a  @click="showEmployeeDetails(employee.name)">{{ employee.name }}</a></td>
            <td>{{ employee.loginTime }}</td>
            <td>{{ employee.logoutTime }}</td>
            <td>{{ employee.hoursLogged }}</td>
            <td>
              <v-icon @click="downloadEmployeeReport(employee.name)" style="color:blue">mdi-download</v-icon>
              
              
            </td>
          </tr>
        </tbody>
      </v-data-table>
     
  
      <!-- Employee details modal -->
      <v-dialog v-model="dialogVisible">
        <div id="employeeDetailsContainer">
          <h2 id="employeeDetailsHeading">{{ selectedEmployee.name }}</h2>
          <table id="employeeDetailsTable">
            <thead>
              <tr>
                <th>Login Time</th>
                <th>Logout Time</th>
                <th>Total Hours Logged In</th>
              </tr>
            </thead>
            <tbody id="employeeDetailsBody">
              <tr v-for="detail in selectedEmployeeDetails" :key="detail.id">
                <td>{{ detail.loginTime }}</td>
                <td>{{ detail.logoutTime }}</td>
                <td>{{ detail.hoursLogged }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </v-dialog>
    </div>
  </template>
  
  <script>
import ManagerSidebar from './ManagerSidebar.vue';
  
  export default {
    components:{
      ManagerSidebar
    },
    data() {
  
      return {
        dialogVisible: false,
        selectedEmployee: null,
        selectedEmployeeDetails: [],
        employees: [
          { id: 1, name: 'John Doe', loginTime: '50000', logoutTime: '40000', hoursLogged: '10000' },
          { id: 2, name: 'Jane Smith', loginTime: '8000', logoutTime: '5000', hoursLogged: '3000' },
          // Add more sample employees
        ]
      };
    },
    methods: {
      showEmployeeDetails(employee) {
        this.selectedEmployee = employee;
        // Code to fetch the login details for the selected employee goes here
        console.log("Show details for employee: " + employee);
         // Download all employee data
         this.$router.push({ name: 'LE', params: { name: employee} });
         
        // this.$router.push({ name: 'Rem' });
        // this.selectedEmployeeDetails = [
        //   { id: 1, loginTime: "08:00 AM", logoutTime: "05:00 PM", hoursLogged: "8 hours" },
        //   { id: 2, loginTime: "09:30 AM", logoutTime: "06:00 PM", hoursLogged: "8.5 hours" },
        //   // Add more login details for the specific employee
        // ];
        // this.dialogVisible = true;
        // Show employee details modal
      },
      // downloadEmployeeReport(name) {
      //   // Download employee report
      // },
      downloadAllEmployeeData() {
        // Download all employee data
        this.$router.push({ name: 'LE' });
      }
    }
  }
  </script>
  
  <style scoped>
  /* Add styles here */
  a{
    text-decoration: none;
    color: blue;
    cursor: pointer;
  }
  v-table{
    width: 50%;
  }
  .heading{
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
  }
  </style>
  