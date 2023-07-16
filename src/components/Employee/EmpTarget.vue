<template>
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="12" md="6" class="mt-5">
          <v-card>
            <v-card-title class="abc">Monthly Target</v-card-title>
            <v-card-text >
           Amount- {{ month[0]}} <br>
          
            </v-card-text>
          </v-card>
        </v-col>
  
        <v-col cols="12" md="6" class="mt-5">
          <v-card>
            <v-card-title class="abc">Daily Target</v-card-title>
            <v-card-text>
              Amount- {{ daily[0]}} <br>
             
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
    export default {
    data: () => ({
      valid: true,
      employeeName :'',
      month:[],
      daily:[],
      name: "",
      select: null,
      select1: null,
      target:'',
      select2: null,
      items: ["Spandana", "John", "Bean", "George", "Honey"],
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      date: null,
      firstName: "",
      firstName2: "",
      rules: [
        (v) => !!v || "Amount is required",
        (v) => /^\d+$/.test(v) || "Amount must be a number",
      ],
    }),
    created()
    {
      this.employeeName = this.$route.params.employeeName;
this.fetchtarget()
    },
  
    methods: {
      fetchtarget()
      {
     
  axios.get('https://api.tkrgroups.co.in//emp/target',
  {
    params: {
      empname: this.employeeName,
    },
    
  })
  .then(response => {
    this.month = response.data.monthly;
    console.log(this.month)
    this.daily=response.data.daily;
    // this.target = response.data.daily;
    // this.employeesList = this.employees.map(emp => emp.name); // get only the names of employees
    console.log( );
  })
  .catch(error => {
    console.error(error);
  });

      },
      async validate() {
        const { valid } = await this.$refs.form.validate();
  
        if (valid) alert("Form is valid");
      },
      async validate2() {
        const { valid } = await this.$refs.form2.validate();
  
        if (valid) alert("Form is valid");
      },
    },
  };
  </script>
  
  <style scoped>
  .abc {
    text-align: center;
  }
  
  .v-card {
    border-radius: 10px;
    box-shadow: 0 5px 5px 5px #8888;
  }
  </style>
  