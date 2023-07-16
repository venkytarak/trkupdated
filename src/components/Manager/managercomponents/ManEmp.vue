
  
<template>
    <div class="">  <ManagerSidebar/>

    <v-data-table
      :custom-filter="filterOnlyCapsText"
      :headers="headers"
      :items="emp"
      :search="search"
      class="elevation-1"
      item-value="name"
      height="38rem"
    >
      <template v-slot:top>
        <v-text-field
          v-model="search"
          label="Search Employee"
          class="pa-4"
        ></v-text-field>
      </template>
    </v-data-table>
    <!-- <v-container class="btns">
      <v-btn to="/EmpAdd">Add Employee</v-btn>
      <v-btn to="/EmpEdit">Edit Employee</v-btn>
      <v-btn to="/EmpDel">Delete Employee</v-btn>
    </v-container> -->
</div>
  </template>
  <script>
  import ManagerSidebar from '../ManagerSidebar.vue'
  export default {
    name:'ManEmp',
    components:{
        ManagerSidebar,
    },
    
    data: () => ({
      search: "",
      emp: [
        {
          name: "Frocuer",
          eid: 1,
          email: "frocuer_ark@gmail.in",
          com: 9679654324,
          protein: 4.0,
          status: "100%",
        },
        {
          name: "Spandana",
          eid: 2,
          email: "spandana_ark@gmail.in",
          com: 8834567837,
          status: "18%",
        },
        {
          name: "Elon",
          eid: 3,
          email: "elon_ark@gmail.in",
          com: 8345677523,
          status: "75%",
        },
        {
          name: "Muskcake",
          eid: 4,
          email: "muskcake_ark@gmail.in",
          com: 8234569467,
          status: "80%",
        },
        {
          name: "George",
          eid: 5,
          email: "george_ark@gmail.in",
          com: 6234598749,
          status: "16%",
        },
        {
          name: "Bean",
          eid: 6,
          email: "bean_ark@gmail.in",
          com: 9655436794,
          status: "10%",
        },
        {
          name: "Dolli",
          eid: 7,
          email: "dolli_ark@gmail.in",
          com: 7895343698,
          status: "20%",
        },
        {
          name: "Honey",
          eid: 8,
          email: "honey_ark@gmail.in",
          com: 8345367987,
          status: "45%",
        },
        {
          name: "Donut",
          eid: 9,
          email: "donut_ark@gmail.in",
          com: 9345267751,
          status: "22%",
        },
        {
          name: "Kitty",
          eid: 10,
          email: "kitty_ark@gmail.in",
          com: 9345679865,
          status: "6%",
        },
      ],
    }),
    computed: {
      headers() {
        return [
          {
            title: "EmpID",
            align: "end",
            key: "eid",
          },
          {
            title: "Emp Name",
            align: "start",
            sortable: false,
            key: "name",
          },
  
          { title: "Email-ID", align: "end", key: "email" },
          { title: "Phone number", align: "end", key: "com" },
          { title: "Leads Status", align: "end", key: "status" },
        ];
      },
    },
   
        methods: {
  filterText(value, query) {
    if (value != null && query != null && typeof value === "string") {
      value = value.toLowerCase();
      query = query.toLowerCase();
      return value.includes(query);
    } else {
      return false;
    }
  }
}

  };
  </script>
  <style>
  .btns {
    margin-top: 3%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #def1fe;
  }
  </style>