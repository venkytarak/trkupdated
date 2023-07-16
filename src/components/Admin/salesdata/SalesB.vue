
<template>
  <AdminSidebar/>
  <div class="Dtitle"><button @click="goBack" class="back mt-5"><v-icon>mdi-arrow-left-bold</v-icon></button>

  </div>
  <div>
    <div class="heading mt-5">
      <h2 style="color: blue; margin-left: 2rem; font-size: 1.5rem;">Employee's Sales Data</h2>
      <v-btn @click="downloadAllEmployeeData()">Download All Data</v-btn>
    </div>

    <div>
      <label for="filter" style="font-size: 2rem;">Filter:</label>
      <select v-model="filter" @change="fetchData(filter)" class="filter-dropdown">
        <option value="monthly">Monthly</option>
        <option value="daily">Daily</option>
      </select>
    </div>

    <v-data-table>
      <thead>
        <tr>
          <th>Employee Name</th>
          <th>Target</th>
          <th>Completed</th>
          <th>Pending</th>
       
        </tr>
      </thead>
      <tbody>
        <tr v-for="(employee, index) in emp" :key="index">
          <td><a @click="showEmployeeDetails(employee[0], employee[1])">{{ employee[0] }}</a></td>
          <td>{{ employee[3]}}</td>
          <td>{{ employee[4] }}</td>
          <td>{{ employee[5] }}</td>
         
        </tr>
      </tbody>
    </v-data-table>

    
  </div>
</template>

<script>
import axios from 'axios';
import AdminSidebar from '../AdminSidebar.vue';

export default {
  components: {
    AdminSidebar
  },
  data() {
    return {
      dialogVisible: false,
      selectedEmployee: null,
      selectedEmployeeDetails: [],
      emp: [],
      branch:'',
      filter: 'monthly' // Default filter is set to "monthly"
    };
  },
  created() {
    this.branch = this.$route.query.branch;
    this.fetchData(this.filter); // Fetch data with the default filter
  },
  watch: {
    filter(newFilter) {
      this.fetchData(newFilter); // Fetch data whenever the filter changes
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    fetchData(filter) {
      // Make the API request with the filter parameter
      axios.get('https://api.tkrgroups.co.in/empsales', {
        params: {
          filter: filter,
          branch: this.branch
        }
      })
      .then(response => {
  //       const currentMonth = new Date().getMonth() + 1;

  // // Filter the response data to include only the current month's data
  // const currentMonthData = response.data.filter(item => {
  //   const itemMonth = new Date(item.date).getMonth() + 1;
  //   return itemMonth === currentMonth;
  // });

  // this.emp = currentMonthData;
        this.emp = response.data;
        console.log(this.emp)
      })
      .catch(error => {
        console.log(error);
      });
    },
    showEmployeeDetails(empname, branch) {
  this.$router.push({ name: 'salesemp', query: { empname, branch } });
},

    // downloadEmployeeReport(name) {
    //   // Download employee report
    // },
    downloadAllEmployeeData() {
      // Create the CSV content
      let csvContent = 'data:text/csv;charset=utf-8,';

      // Add the header row
      csvContent += 'EmployeeName,Branch,Target_type,Target,Completed,Pending\n';

      // Add the sales data rows
      this.emp.forEach(employee => {
        const salesRecord = [
          employee[0], // Employee Name
          employee[1],
          employee[2], // Target
          employee[3], // Completed
          employee[4],
          employee[5] // Pending
        ];
        const row = salesRecord.join(',');
        csvContent += row + '\n';
      });

      // Create a temporary link element
      const link = document.createElement('a');
      link.href = encodeURI(csvContent);
      link.download = 'sales_data.csv'; // Set the desired filename for the downloaded file

      // Programmatically trigger a click event on the link to initiate the download
      link.click();
    }
  }
}
</script>

<style scoped>
/* Add styles here */
a {
  text-decoration: none;
  color: blue;
  cursor: pointer;
}
v-table {
  width: 50%;
}
.heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
}
.filter-dropdown {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  color: #333;
  background-color: #fff;
}
.back {
  background: white;
  color: black;
  font-size: 1rem;
  border-radius: 30px;
  height: 3rem;
  width: 3rem;
  box-shadow: 3px 3px 3px 3px #9999;
}
</style>

