<template>
  <div class="">  
    <AdminSidebar />
    <v-container>
      <v-card-title>
    <div class="item"> <button @click="goBack" class="back mt-5"><v-icon>mdi-arrow-left-bold</v-icon></button>

        <span clti="text-h5" class="text">ACCOUNTANT ADMIN</span></div>
      </v-card-title>
      <v-row class="tota">
        <v-row class="tot">
          <v-col cols="12" sm="4">
            <v-card class="mx-auto h" width="250">
              <v-icon
                class="ma-2"
                variant="text"
                icon="mdi-cash"
                color="pink"
              ></v-icon>
              <v-card-text>Todays Income </v-card-text>
              <v-card-text class="t">30000 </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="4">
            <v-card class="mx-auto h" width="250">
              <v-icon
                class="ma-2"
                variant="text"
                icon="mdi-cash"
                color="green"
              ></v-icon>
              <v-card-text>Monthly Income </v-card-text>
              <v-card-text class="t">100000 </v-card-text>
            </v-card>
          </v-col>
  
          <v-col cols="12" sm="4">
            <v-card class="mx-auto h" width="250">
              <v-icon
                class="ma-2"
                variant="text"
                icon="mdi-cash"
                color="blue"
              ></v-icon>
              <v-card-text>Yearly Income</v-card-text>
              <v-card-text class="t"> 1500000 </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-row>
      <div class="table">
        <v-data-table
          :custom-filter="filterOnlyCapsText"
          :headers="headers"
          :items="emp"
          :search="search"
          class="elevation-1"
          item-value="name"
          height="20rem"
        >
          <template v-slot:top>
            <v-text-field
              v-model="search"
              label="Search Employee (UPPER CASE ONLY)"
              class="pa-4"
            ></v-text-field>
          </template>
        </v-data-table>
      </div>
    </v-container>
</div>
  </template>
  
  <script>
  import AdminSidebar from './AdminSidebar.vue';
  export default {
    components: {
        AdminSidebar
      },
    data: () => ({
      search: "",
      
      emp: [
        {
          name: "Frocuer",
          eid: 1,
          ti: 60,
          mi: 24,
          ai: 14,
          exp: "100%",
        },
        {
          name: "Spandana",
          eid: 2,
          ti: 90,
          mi: 37,
          ai: 24,
          exp: "18%",
        },
        {
          name: "Elon",
          eid: 3,
          ti: 56,
          mi: 23,
          ai: 74,
          exp: "75%",
        },
        {
          name: "Muskcake",
          eid: 4,
          ti: 37,
          mi: 67,
          ai: 24,
          exp: "80%",
        },
        {
          name: "George",
          eid: 5,
          ti: 16,
          mi: 49,
          ai: 34,
          exp: "16%",
        },
        {
          name: "Bean",
          eid: 6,
          ti: 25,
          mi: 94,
          ai: 44,
          exp: "10%",
        },
        {
          name: "Dolli",
          eid: 7,
          ti: 80,
          mi: 98,
          ai: 94,
          exp: "20%",
        },
        {
          name: "Honey",
          eid: 8,
          ti: 32,
          mi: 87,
          ai: 44,
          exp: "45%",
        },
        {
          name: "Donut",
          eid: 9,
          ti: 25,
          mi: 51,
          ai: 34,
          exp: "22%",
        },
        {
          name: "Kitty",
          eid: 10,
          ti: 26,
          mi: 65,
          ai: 74,
          exp: "6%",
        },
      ],
    }),
    
    computed: {
      headers() {
        return [
          {
            title: "BranchID",
            align: "end",
            key: "eid",
          },
          {
            title: "Branch Name",
            align: "start",
            sortable: false,
            key: "name",
          },
          { title: "Todays Income", align: "end", key: "ti" },
          { title: "Monthly Income", align: "end", key: "mi" },
          { title: "Annual Income", align: "end", key: "ai" },
          { title: "Annual Expenses", align: "end", key: "exp" },
        ];
      },
    },
    methods: {
        goBack() {
      this.$router.go(-1)
    },
      filterOnlyCapsText(value, query) {
        return (
          value != null &&
          query != null &&
          typeof value === "string" &&
          value.toString().toLocaleUpperCase().indexOf(query) !== -1
        );
      },
    },
   
  };
  </script>
  <style>
  .table {
    margin-top: 5%;
    box-shadow: 1px 1px 35px 1px #def1fe;
  }
  .tota {
    margin-top: 3%;
  }
  
  .h {
    text-align: center;
    height: 10rem;
  }
  .t {
    font-size: 1.6rem;
  }
  .back
  {
    background:white;
        color:black;
        font-size: 1rem;
        border-radius: 30px;
        height: 3rem;
        width: 3rem;
        box-shadow: 3px 3px 3px 3px #9999 ;
  }
  .item
  {
    display: flex;
    width: 50%;
    justify-content:space-evenly;
    align-items: center;
    text-align: center;
  
  }
  .item .text
  {
    margin-left: 10rem;
  }
  </style>