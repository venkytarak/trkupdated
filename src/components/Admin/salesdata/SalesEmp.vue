
<template>
    <div class="">
        <AdminSidebar/>
        <div class="Dtitle"><button @click="goback" class="back mt-5"><v-icon>mdi-arrow-left-bold</v-icon></button>

        </div>
          <div class="heading mt-5">
            <h2 style="color: blue; margin-left: 2rem; font-size: 1.5rem;">{{ this.empname }} Sales Data</h2>
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
                <!-- <th></th> -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="(employee, index) in emp" :key="index">
                <td><a @click="showEmployeeDetails(employee[0], employee[1])">{{ employee[0] }}</a></td><td>{{ employee[3]}}</td>
                <td>{{ employee[4] }}</td>
                <td>{{ employee[5] }}</td>
                <!-- <td>
                  <v-icon @click="downloadEmployeeReport(employee.name)">mdi-download</v-icon>
                </td> -->
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
        filter: 'monthly' ,
        empname:''
        // Default filter is set to "monthly"
      };
    },
    
    created() {
    this.empname = this.$route.query.empname;
    this.branch = this.$route.query.branch;
      this.fetchData(this.filter); // Fetch data with the default filter
    },
    watch: {
      filter(newFilter) {
        this.fetchData(newFilter); // Fetch data whenever the filter changes
      }
    },
    methods: {
        goback() {
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
            const employeeName =this.empname;
        const filteredData = response.data.filter(employee => employee[0] === employeeName);
          this.emp = filteredData;
        })
        .catch(error => {
          console.log(error);
        });
      },
   
     
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
  
  