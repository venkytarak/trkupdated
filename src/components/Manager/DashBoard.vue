
<template>
  <div class="">
    <v-container style="z-index: -1">
      <v-row class="mt-5">
        
        <v-col cols="12" sm="4">
          <v-card class="cards" :to="'/Asl/' + branchname + '/' + managername">
            <v-icon>mdi-upload</v-icon>
            <v-card-item> Assign Leads </v-card-item>
          </v-card>
        </v-col>
     
      </v-row>

      <v-container>
        <v-row class="tota mt-5">
          <v-row class="tot mt-5">
            <v-col cols="12" sm="4">
              <v-card class="mx-auto h" width="300">
                <v-icon
                  class="ma-2"
                  variant="text"
                  icon="mdi-thumb-up"
                  color="green"
                ></v-icon>
                <v-card-text>Uploaded </v-card-text>
                <v-card-text class="t"> {{ alcount }} </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" sm="4">
              <v-card class="mx-auto h" width="300">
                <v-icon
                  class="ma-2"
                  variant="text"
                  icon="mdi-checkbox-marked"
                  color="blue"
                ></v-icon>
                <v-card-text>Assigned Leads </v-card-text>
                <v-card-text class="t"> {{ alcountemp}} </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" sm="4">
              <v-card class="mx-auto h" width="300">
                <v-icon
                  class="ma-2"
                  variant="text"
                  icon="mdi-thumb-down"
                  color="red"
                ></v-icon>
                <v-card-text>Remaining Leads </v-card-text>
                <v-card-text class="t"> {{ alcount-alcountemp }} </v-card-text>
              </v-card>
            </v-col>

           
          </v-row>

          <v-row class="tot mt-5">
            <v-col cols="12" sm="3">
              <v-card class="mx-auto h" width="250">
                <v-icon
                  class="ma-2"
                  variant="text"
                  icon="mdi-phone"
                  color="blue"
                ></v-icon>
                <v-card-text>Completed Leads</v-card-text>
                <v-card-text class="t"> {{ completedlead }} </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" sm="3">
              <v-card class="mx-auto h" width="250">
                <v-icon
                  class="ma-2"
                  variant="text"
                  icon="mdi-cancel"
                  color="pink"
                ></v-icon>
                <v-card-text>Remaining</v-card-text>
                <v-card-text class="t">
                  {{ alcountemp- completedlead }}
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" sm="3">
              <v-card class="mx-auto h" width="250">
                <v-icon
                  class="ma-2"
                  variant="text"
                  icon="mdi-cash"
                  color="teal"
                ></v-icon>
                <v-card-text>Sales</v-card-text>
                <v-card-text class="t"> &#x20B9; {{ sales }} </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" sm="3">
              <v-card class="mx-auto h" width="250">
                <v-icon
                  class="ma-2"
                  variant="text"
                  icon="mdi-account-group"
                  color="orange"
                ></v-icon>
                <v-card-text>Total Employees</v-card-text>
                <v-card-text class="t"> {{ emp }}</v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <!-- changed -->
          <v-row>
            <v-col cols="12 mt-10" sm="6">
              <v-title style="font-size: 1.4rem; color: red"
                >Top Performers
              </v-title>
              <v-data-table
    :headers="headers"
    :items="topemp"
  >
  </v-data-table>
            </v-col>

            <v-col cols="12 mt-10" sm="6">
              <v-title style="font-size: 1.4rem; color: green"
                >Completed Data Analysis
              </v-title>
              <div class="mt-10">
                <BarCharts />
              </div>
            </v-col>
          </v-row>

          <!-- change over      -->
        </v-row>
      </v-container>
     

      <!-- end of dialog for assigning leads -->

      <!-- open leads model dialog box -->
   
      <!-- end of box -->
 
    </v-container>

  
    <!--  end of the code -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    branchName: {
      type: String,
      required: true,
    },
    manager: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      openAssignpage: false,
      select3: null,
      interval: {},
      alcount: "0",
      alcountemp:'0',
      completedlead: "0",
      value: 40,
      sales:'0',
      emp:'0',
      branchname: "",
      managername: "",
      employees: [],

      items: ["Spandana", "John", "Bean", "George", "Honey"],
      desserts: [
        {
          no: 1,
          name: "Frozen",
          leads: 59,
        },
        { no: 2, name: "sandwich", leads: 35 },
        { no: 3, name: "Eclair", leads: 30 },
        { no: 4, name: "Candy", leads: 26 },
        { no: 5, name: "Gingeria", leads: 20 },
      ],
    };
  },
  created() {
    this.branchname = this.$route.params.branchName;
    this.managername = this.$route.params.manager;
    this.assignedleads();
    this.completedleads();
    this.topemployees();
    this.fetchassignedtoemp()
    this.fetchemployees()

  },

  methods: {
    fetchemployees()
    {
      axios.post("https://api.tkrgroups.co.in/branchemp", {
    branch: this.branchname
})
.then((response) => {
    this.emp = response.data.data[0];
    console.log(this.emp);
})
.catch((error) => {
    console.log(error);
});


    },
    fetchsales() {
      axios.post("https://api.tkrgroups.co.in/managersales", {
    branch: this.branchname
})
.then((response) => {
    this.sales = response.data.sales;
    console.log(this.sales);
})
.catch((error) => {
    console.log(error);
});

    },
    fetchassignedtoemp(){
      axios.get('https://api.tkrgroups.co.in//manager/leadsassigned', {
    params: {
      role:'emp',
      branch: this.branchname
    }
  })
  .then(response => {
    this.alcountemp = response.data.data[0];
    console.log(this.alcount);
  })
  .catch(error => {
    console.log(error);
  });
    },
    topemployees() {
      axios
        .get(`https://api.tkrgroups.co.in//topemployee/${this.branchname}`)
        .then((response) => {
          this.topemploye = response.data.data[0];
          console.log(this.leads);
        });
    },
    assignedleads() {
  axios.get('https://api.tkrgroups.co.in//manager/leadsassigned', {
    params: {
      branch: this.branchname,
    
    }
  })
  .then(response => {
    this.alcount = response.data.data[0];
    console.log(this.alcount);
  })
  .catch(error => {
    console.log(error);
  });
},
    completedleads() {
      axios
        .get("https://api.tkrgroups.co.in//assigned_leads_count", {
          params: {
            branch_name: this.branchname,
          },
        })
        .then((response) => {
          this.completedlead = response.data.count;
          console.log(this.completedlead);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style scoped>
.cards {
  color: black;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  text-align: center;
  box-shadow: 3px 3px 3px 3px #9999;
}
.cards:hover {
  background: pink;
  transform: scale(1);
}
.card {
  height: 6rem;
  width: 3rem;
  background: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  text-align: center;
  box-shadow: 3px 3px 3px 3px #9999;
}
.graph {
  margin-top: 10rem;
}
.v-progress-circular {
  margin: 1rem;
}

.dialog {
  width: 30rem;
  height: 15rem;

  background: green;
  border-radius: 30px;
}
.co {
  font-size: 1.3rem;
}
.v-card {
  transition: transform 0.2s ease-in-out;
}

.v-card:hover {
  transform: scale(1.1);
}
</style>
