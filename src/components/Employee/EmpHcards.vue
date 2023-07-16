<template>
  <v-container>
    <VRow>
      <v-col cols="12">
        
      </v-col>
     
    </VRow>
    <vRow class="second mt-10">
      <v-col cols="12" sm="4">
        <v-card class="mx-auto top" width="270">
          <div>
            <v-icon
              class="ma-2"
              variant="text"
              icon="mdi-checkbox-marked"
              color="blue-lighten-2"
            ></v-icon>
            <v-card-text> Assigned Leads </v-card-text>
            <v-card-text>{{ assignedcount }} </v-card-text>
          </div>
          <div>
            <v-progress-circular
              :rotate="360"
              :size="60"
              :width="12"
              :model-value="value"
              color="teal"
            >
              {{ value }}
            </v-progress-circular>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card class="mx-auto top" width="270">
          <div>
            <v-icon
              class="ma-2"
              variant="text"
              icon="mdi-thumb-up"
              color="green"
            ></v-icon>
            <v-card-text> Completed Leads </v-card-text>
            <v-card-text> {{ completedlead }} </v-card-text>
          </div>
          <div>
            <v-progress-circular
              :rotate="360"
              :size="60"
              :width="12"
              :model-value="value"
              color="teal"
            >
              {{ value }}
            </v-progress-circular>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card class="mx-auto top" width="270">
          <div>
            <v-icon
              class="ma-2"
              variant="text"
              icon="mdi-thumb-down"
              color="red-lighten-2"
            ></v-icon>
            <v-card-text> Remaining Leads </v-card-text>
            <v-card-text> {{ assignedcount - completedlead }} </v-card-text>
          </div>
          <div>
            <v-progress-circular
              :rotate="360"
              :size="60"
              :width="12"
              :model-value="value"
              color="teal"
            >
              {{ value }}
            </v-progress-circular>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card class="mx-auto top" width="270">
          <div>
            <v-icon
              class="ma-2"
              variant="text"
              icon="mdi-sale"
              color="orange"
            ></v-icon>
            <v-card-text> Today Sales </v-card-text>
            <v-card-text>&#8377;{{ sales }}  </v-card-text>
          </div>
          <div>
            <v-progress-circular
              :rotate="360"
              :size="60"
              :width="12"
              :model-value="value"
              color="teal"
            >
              {{ value }}
            </v-progress-circular>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card class="mx-auto top" width="270">
          <div>
            <v-icon
              class="ma-2"
              variant="text"
              icon="mdi-cash"
              color="pink"
            ></v-icon>
            <v-card-text> Monthly Target </v-card-text>
            <v-card-text
              >Amount- &#8377;
              <p style="font-size:1.2rem;color:#11012c;">{{ month[0] -sales}}</p> <br />
</v-card-text
            >
          </div>
          <div>
            <v-progress-circular
              :rotate="360"
              :size="60"
              :width="12"
              :model-value="value"
              color="teal"
            >
              {{ value }}
            </v-progress-circular>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card class="mx-auto top" width="270">
          <div>
            <v-icon
              class="ma-2"
              variant="text"
              icon="mdi-calendar-month"
              color="blue-lighten-2"
            ></v-icon>
            <v-card-text> daily Target </v-card-text>
            <v-card-text
            >Amount- &#8377;
            <p style="font-size:1.2rem;color:#11012c;">{{ daily[0] -sales}}</p> <br />
          </v-card-text>
          </div>
          <div>
            <v-progress-circular
              :rotate="360"
              :size="60"
              :width="12"
              :model-value="value"
              color="teal"
            >
              {{ value }}
            </v-progress-circular>
          </div>
        </v-card>
      </v-col>
       </vRow>
    <VDialog v-model="openAssignpage">
      <VCard>
        <VCardTitle>Assign Leads</VCardTitle>
        <VCardText>
          <VForm width="450">
            <v-select
              v-model="select3"
              :items="items"
              label="Employee"
              required
            ></v-select>
            <VTextField label="No.of leads" v-model="newBranchName" />
          </VForm>
        </VCardText>

        <VCardActions>
          <VBtn text @click="addBranchModal = false">Cancel</VBtn>
          <VBtn text @click="addBranch">Add</VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      //login
      loginTime: null,
      timer: null,
      logoutTime: null,
      duration: null,

      //employee
      employeeName: "",
      openAssignpage: false,
      select3: null,
      month: [],
      daily: [],
      interval: {},
      value: 40,
      assignedcount: "0",
      sales:'0',

      completedlead: "0",
      notinterestedlead: "",
      dndlead: "",
      interested: "interested",
      notinterested: "notinterested",
      completed: "completed",
      dnd: "dnd",
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
  computed: {
    loginDuration() {
      if (!this.loginTime) return null;
      const duration = new Date() - new Date(this.loginTime);
      return `${Math.floor(duration / 1000)} seconds`;
    },
  },
  created() {
    this.employeeName = this.$route.params.employeeName;
    this.completedleads();
    this.assigncount();
    this.fetchtarget();
    this.fetchsales()
  },
  methods: {
    fetchsales()
    {
      axios
        .get("https://api.tkrgroups.co.in//salesdata", {
          params: {
            emp_name: this.employeeName,
          },
        })
        .then((response) => {
         this.sales=response.data
         console.log(this.sales)
 
        })
        .catch((error) => {
          console.log(error);
        });
   
    },
    fetchtarget() {
      axios
        .get("https://api.tkrgroups.co.in//emp/target", {
          params: {
            empname: this.employeeName,
          },
        })
        .then((response) => {
          this.month = response.data.monthly;
          console.log(this.month);
          this.daily = response.data.daily;
          console.log();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    completedleads() {
      axios
        .get("https://api.tkrgroups.co.in//assigned_leads_count", {
          params: {
            emp_name: this.employeeName,
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

    assigncount() {
      axios
        .get("https://api.tkrgroups.co.in//assignesleads", {
          params: {
            emp_name: this.employeeName,
          },
        })
        .then((response) => {
          this.assignedcount = response.data.count[0];
          console.log(response.data.count[0]);
          console.log(response.data.count[1]);
          console.log(response.data.count[2]);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    elogin() {
      this.loginTime = new Date();
      this.timer = setInterval(() => {
        const duration = new Date() - new Date(this.loginTime);
        const hours = Math.floor(duration / (1000 * 60 * 60));
        const minutes = Math.floor((duration / (1000 * 60)) % 60);
        const seconds = Math.floor((duration / 1000) % 60);
        this.timer = `${hours}h : ${minutes}m : ${seconds}s`;
      }, 1000);
    },
    elogout() {
      clearInterval(this.timer);
      this.logoutTime = new Date();
      const duration = this.logoutTime.getTime() - this.loginTime;
      const hours = Math.floor(duration / (1000 * 60 * 60));
      const minutes = Math.floor((duration / (1000 * 60)) % 60);
      const seconds = Math.floor((duration / 1000) % 60);
      this.duration = `${hours}h : ${minutes}m : ${seconds}s`;
      this.timer = null;
    },
  },
};
</script>

<style scoped>
.tot {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.top {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.v-progress-circular {
  margin: 1rem;
  height: 30%;
}
.icn {
  color: rgb(242, 18, 171);
  font-size: 2.5rem;
}
.table {
  background-color: rgb(243, 243, 243);
}
.tme {
  margin-top: 1%;
  height: 2.2rem;
  color: green;
  text-align: center;
  font-size: 1.5rem;
}
.top {
  transition: transform 0.2s ease-in-out;
}

.top:hover {
  transform: scale(1.1);
}

</style>
