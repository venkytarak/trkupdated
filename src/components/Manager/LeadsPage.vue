<template>
  <v-container style="z-index:-1">
  
      
    <v-container>
     <v-card-title>
       <span class="text-h5">Leads </span>
     </v-card-title>
     <v-row class="tota">
       <v-row class="tot">

        
      
           
         <v-col cols="12" sm="3">
           <v-card class="mx-auto h" width="250"  :to="{ path: '/LD/' + branchname + '/' + managername, query: { status: 'Interested' } }">
             <v-icon
               class="ma-2"
               variant="text"
               icon="mdi-checkbox-marked"
               color="blue"
             ></v-icon>
             <v-card-text>Intrested</v-card-text>
             <v-card-text class="t"> {{ intcount }} </v-card-text>
           </v-card>
         </v-col>
         <v-col cols="12" sm="3">
           <v-card class="mx-auto h" width="250"  :to="{ path: '/LD/' + branchname + '/' + managername, query: { status: 'FreeTrail'} }" >
             <v-icon
               class="ma-2"
               variant="text"
               icon="mdi-checkbox-marked"
               color="blue"
             ></v-icon>
             <v-card-text>Free Trail</v-card-text>
           
             <v-card-text class="t"> {{ freet}} </v-card-text>
           </v-card>
         </v-col>
         <v-col cols="12" sm="3">
           <v-card class="mx-auto h" width="250"  :to="{ path: '/LD/' + branchname + '/' + managername, query: { status: 'NotInterested' } }">
             <v-icon
               class="ma-2"
               variant="text"
               icon="mdi-minus-circle"
               color="red"
             ></v-icon>
             <v-card-text> Not Intrested</v-card-text>
             <v-card-text class="t"> {{ notcount }} </v-card-text>
           </v-card>
         </v-col>
         <v-col cols="12" sm="3">
           <v-card class="mx-auto h" width="250">
             <v-icon
               class="ma-2"
               variant="text"
               icon="mdi-phone"
               color="blue"
             ></v-icon>
             <v-card-text>Today Calls</v-card-text>
             <v-card-text class="t"> {{ todaycount }} </v-card-text>
           </v-card>
         </v-col>
       </v-row>
       <v-row class="tot">
         
         <v-col cols="12" sm="3">
           <v-card class="mx-auto h" width="250" to="">
             <v-icon
               class="ma-2"
               variant="text"
               icon="mdi-cancel"
               color="pink"
             ></v-icon>
             <v-card-text>DND</v-card-text>
             <v-card-text class="t"> {{ dnd }} </v-card-text>
           </v-card>
         </v-col>
         <v-col cols="12" sm="3">
           <!-- <v-card class="mx-auto h" width="250" :to="{ path: '/msales/' + branchname + '/' + managername, query: { status: 'Busy',branch:this.branchname } }"> -->
            <v-card class="mx-auto h" width="250" >

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
           <v-card class="mx-auto h" width="250" :to="{ path: '/LD/' + branchname + '/' + managername, query: { status: 'Followup',branch:this.branchname } }">
             <v-icon
               class="ma-2"
               variant="text"
               icon="mdi-account-group"
               color="orange"
             ></v-icon>
             <v-card-text>Follow Ups</v-card-text>
             <v-card-text class="t"> {{followupcount}}</v-card-text>
           </v-card>
         </v-col>
         <v-col cols="12" sm="3">
           <v-card class="mx-auto h" width="250"   :to="{ path: '/LD/' + branchname + '/' + managername, query: { status: 'WrongNumber',branch:this.branchname } }">
           <!-- <v-card class="mx-auto h" width="250"  :to="{ path: '/LD/', query: { status: 'WrongNumber' } }" > -->

             <v-icon
               class="ma-2"
               variant="text"
               icon="mdi-checkbox-marked"
               color="blue"
             ></v-icon>
             <v-card-text>Wrong number/Switchoff</v-card-text>
             <v-card-text class="t"> {{ intcount }} </v-card-text>
           </v-card>
         </v-col>
         <v-col cols="12" sm="3">
           <!-- <v-card class="mx-auto h" width="250"  :to="{ path: '/LD/', query: { status: 'Busy' } }" > -->
             <v-card class="mx-auto h" width="250" :to="{ path: '/LD/' + branchname + '/' + managername, query: { status: 'Busy',branch:this.branchname } }"  >

             <v-icon
               class="ma-2"
               variant="text"
               icon="mdi-checkbox-marked"
               color="blue"
             ></v-icon>
             <v-card-text>Busy/notpickup </v-card-text>
             <v-card-text class="t"> {{ intcount }} </v-card-text>
           </v-card>
         </v-col>
       </v-row>
     </v-row>
     
   </v-container>
     <!-- dialog for assigning leads -->
     <v-dialog v-model="addBranchModal">
       <v-card>
         <v-card-title>Assign Leads To a Branch</v-card-title>
         <v-card-text>
           <v-form>
             <!-- <v-text-field label="Branch Name" v-model="newBranchName" /> -->
             <v-text-field label="no  of leads" v-model="noofleads" />
             <v-select
               label="branches"
               v-model="selectedBranch"
               :items="branches"
               item-text="name"
               item-value="id"
             />
           </v-form>
         </v-card-text>
 
         <v-card-actions>
           <v-btn text @click="addBranchModal = false">Cancel</v-btn>
           <v-btn text @click="assignleads">Add</v-btn>
         </v-card-actions>
       </v-card>
     </v-dialog>


     <!-- end of dialog for assigning leads -->

     <!-- open leads model dialog box -->
     <VDialog v-model="openleadsmodel" style="width:40rem">
       <VCard>
         <VCardTitle>select language</VCardTitle>
         <VCardText>
           <VForm style="display:flex;justify-content:center;align-items:center">
            
             
             <v-select
v-model="selectedLanguage"
:items="languages"
item-text="name"
item-value="id"
label="Select a language"
></v-select>
             <!-- <VIcon @click="showAddLanguageDialog">mdi-plus</VIcon> -->
             <v-btn icon @click="addLanguageDialog=!addLanguageDialog">
               <VIcon>mdi-plus</VIcon>
             </v-btn>
             
            
            
           
           </VForm>
         </VCardText>
 
         <VCardActions>
           <VBtn text @click="openleadsmodel = false">Cancel</VBtn>
           <VBtn text @click="openFileInput">Add</VBtn>
         </VCardActions>
       </VCard>
     </VDialog>
     <!-- end of box -->
     <v-dialog v-model="addLanguageDialog" max-width="500">
       <v-card>
         <v-card-title>
           Add New Language
         </v-card-title>
         <v-card-text>
           <v-text-field v-model="newLanguage" label="Language Name"></v-text-field>
         </v-card-text>
         <v-card-actions>
           <v-btn color="primary" text @click="addLanguage">Add</v-btn>
           <v-btn text @click="addLanguageDialog=!addLanguageDialog">Cancel</v-btn>
         </v-card-actions>
       </v-card>
     </v-dialog>
 </v-container>
</template>
<script>
import axios from "axios";
export default {
  data: () => ({
    search: "",
    employeeName: "",
    intcount: "0",
    notcount: "0",
    dnd: "0",
    assigned: "0",
    busy: "0",
    sales:'0',
    freet:'0',
    todaycount: "0",
    followupcount: "0",
    assignedcount: "0",

   
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

        { title: "Leads assigned", align: "end", key: "ass" },
        { title: "Completed", align: "end", key: "com" },
        { title: "Status", align: "end", key: "status" },
      ];
    },
  },
  created() {
    this.branchname = this.$route.params.branchName;
  
    this.managername = this.$route.params.manager;
    console.log(this.employeeName);
    this.fetchInterested();
    this.fetchnotInterested();
    this.fetchDnd();
    this.fetchbusy();
    this.fetchtodaycalls();
    this.FollowUp();
    this.freetrail();
    this.assignedleads();
    this.fetchsales()
  },
  methods: {
   fetchsales() {
    
  axios.get('https://api.tkrgroups.co.in/msales', {
    params: {
     branch:this.branchname
    }
  })  .then(response => {
    this.sales=response.data.data[0]
   
    })}
  ,

    assignedleads() {
      axios
        .get(
          `https://api.tkrgroups.co.in//manager/leadsassigned/${this.branchname}`
        )
        .then((response) => {
          this.assigned = response.data.data[0];
          console.log(this.leads);

        });
    },
   freetrail() {
      axios
        .get("https://api.tkrgroups.co.in//leads_status", {
          params: {
            status: "Free Trail",
            branch: this.branchname,
          },
        })
        .then((response) => {
          this.freet = response.data.count[0];
          alert(this.freet)
        })
        .catch((error) => {
          console.log(error);
        });
    },
    FollowUp() {
      axios
        .get("https://api.tkrgroups.co.in//leads_status", {
          params: {
            status: "Follow Up",
            branch: this.branchname,
          },
        })
        .then((response) => {
          this.followupcount = response.data.count[0];
        })
        .catch((error) => {
          console.log(error);
        });
    },

    
    fetchtodaycalls() {
  axios.get('https://api.tkrgroups.co.in/todaycalls', {
    params: {
      branch: this.branchname
    }
  })
  .then(response => {
    this.todaycount = response.data.count;
    console.log(this.todaycount);
  })
  .catch(error => {
    console.log(error);
  });
},
    fetchInterested() {
      axios
        .get("https://api.tkrgroups.co.in///branch/leads_status", {
          params: {
            status: "Interested",
            branch: this.branchname,
          },
        })
        .then((response) => {
          this.intcount = response.data.count[0];
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fetchnotInterested() {
      axios
        .get("https://api.tkrgroups.co.in///branch/leads_status", {
          params: {
            status: "Not interested",
            branch: this.branchname,
          },
        })
        .then((response) => {
          this.notcount = response.data.count[0];
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fetchbusy() {
      axios
        .get("https://api.tkrgroups.co.in///branch/leads_status", {
          params: {
            status: "Busy/Not Answered",
            branch: this.branchname,
          },
        })
        .then((response) => {
          this.busy = response.data.count[0];
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fetchDnd() {
      axios
        .get("https://api.tkrgroups.co.in///branch/leads_status", {
          params: {
            status: "Dnd",
            branch: this.branchname,
          },
        })
        .then((response) => {
          this.dnd = response.data.count[0];
        })
        .catch((error) => {
          console.log(error);
        });
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
.h {
  transition: transform 0.2s ease-in-out;
}

.h:hover {
  transform: scale(1.1);
}

</style>
