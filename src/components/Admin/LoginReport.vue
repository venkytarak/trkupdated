<template>
  <AdminSidebar/>
  <div>
    <div class="heading mt-5" >
      <h2>Employee login Data</h2>
      <v-btn @click="downloadAllEmployeeData()">Download All Data</v-btn>

    </div>
    <v-data-table>
      <thead>
        <tr>
          <th>Employee Name</th>
          <th>Login Time</th>
          <th>Logout Time</th>
          <th>Total Hours Logged In</th>
          <th>Actions</th>
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
            <v-icon @click="downloadEmployeeReport(employee.name)">mdi-download</v-icon>
            
            
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
import AdminSidebar from './AdminSidebar.vue';
export default {
  components:{
    AdminSidebar
  },
  data() {

    return {
      dialogVisible: false,
      selectedEmployee: null,
      selectedEmployeeDetails: [],
      employees: [
        { id: 1, name: 'John Doe', loginTime: '08:00 AM', logoutTime: '05:00 PM', hoursLogged: '8 hours' },
        { id: 2, name: 'Jane Smith', loginTime: '09:30 AM', logoutTime: '06:00 PM', hoursLogged: '8.5 hours' },
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
