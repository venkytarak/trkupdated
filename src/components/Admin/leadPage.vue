<template>
  <div class="">
    <AdminSidebarVue/>
    <v-container style="z-index:-1">
  
      
       <v-container>
        <v-card-title>
          <span class="text-h5">Leads </span>
        </v-card-title>
        <v-row class="tota">
          <v-row class="tot">
         
              
            <v-col cols="12" sm="3">
              <v-card class="mx-auto h" width="250"  :to="{ path: '/RL/', query: { status: 'Interested' } }" >
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
              <v-card class="mx-auto h" width="250"  :to="{ path: '/RL/', query: { status: 'FreeTrail' } }" >
                <v-icon
                  class="ma-2"
                  variant="text"
                  icon="mdi-checkbox-marked"
                  color="blue"
                ></v-icon>
                <v-card-text>Free Trail</v-card-text>
              
                <v-card-text class="t"> {{ ftc }} </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" sm="3">
              <v-card class="mx-auto h" width="250"  :to="{ path: '/RL/', query: { status: 'NotInterested' } }">
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
              <v-card class="mx-auto h" width="250" :to="{ path: '/RL/', query: { status: 'todaycalls' } }" >
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
              <v-card class="mx-auto h" width="250" to="dl">
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
              <v-card class="mx-auto h" width="250" :to="{path:'/sdb/'}">
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
              <v-card class="mx-auto h" width="250" :to="{ path: '/RL/', query: { status: 'Followup' } }">
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
              <v-card class="mx-auto h" width="250"  :to="{ path: '/RL/', query: { status: 'WrongNumber' } }" >
                <v-icon
                  class="ma-2"
                  variant="text"
                  icon="mdi-checkbox-marked"
                  color="blue"
                ></v-icon>
                <v-card-text>Wrong number/Switchoff</v-card-text>
                <v-card-text class="t"> {{ wnc }} </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" sm="3">
              <v-card class="mx-auto h" width="250"  :to="{ path: '/RL/', query: { status: 'Busy' } }" >
            
                <v-icon
                  class="ma-2"
                  variant="text"
                  icon="mdi-checkbox-marked"
                  color="blue"
                ></v-icon>
                <v-card-text>Busy/notpickup </v-card-text>
                <v-card-text class="t"> {{ busy }} </v-card-text>
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
    
    

  
  </div>

   
  </template>
  

  <script>
  import AdminSidebarVue from './AdminSidebar.vue'
  import axios from 'axios'

  export default {
    name:"HomeCard",
    components:
    {
      AdminSidebarVue
    },
    data () {
      return {
        addBranchModal: false,
        selectedBranch: null,
        openleadsmodel:false,
        assignedleadsbox:false,
        addLanguageDialog:false,
        languages:[],
        // language:'',
        noofleads:'',
        selectedLanguage: null,
        newLanguage: '',
        branches:[],
        skill: 40,
      knowledge: 53,
      power: 78,
      count:100,
      intelligence:25,
        interval: {},
        leadCount: 0,
        intcount:'0',
        notcount:'0',
        dnd:'0',
        busy:'0',
        todaycount:'0',
        followupcount:'0',
        uploaded :'0',
        remaining:'0',
        assigned:'0',
        sales:'0',
        ftc:'0',
        wnc:'0'
        
      }
    },
    created()
    {
      
    this.fetchRLed()
    this.fetchnotRLed()
    this.fetchDnd()
    this.fetchbusy()
    this.fetchtodaycalls()
    this.FollowUp()
    this.wrongnumber()
  
    this.freetrail()
    
this.assigncount()
this.fetchsales()
    },
    methods:
    {
      fetchsales()
      {
        axios.get('https://api.tkrgroups.co.in//payment-total')
  .then(response => {
    this.sales= response.data.total_amount;


    console.log(this.sales);
  })
  .catch(error => {
    console.log(error);
  });


      },
      assigncount() {
  axios.get('https://api.tkrgroups.co.in//assignesleads', {
    params: {
      // status:this.employeeName,
      // emp_name:this.employeeName
    }
  })
  .then(response => {
    // console.log(response.data.count)
    this.uploaded = response.data.count[1];
    this.assigned = response.data.count[0];
    this.remaining = response.data.count[2];
    if(this.remaining==0)
    {
      alert("uploadleads")
    }
    console.log(this.assignedcount)
  })
  .catch(error => {
    console.log(error);
  });
},
    FollowUp() {
  axios.get('https://api.tkrgroups.co.in//leads_status', {
    params: {
      status: 'Follow Up',
      empname:this.employeeName

    }
  })
  .then(response => {
    this.followupcount = response.data.admin;
  })
  .catch(error => {
    console.log(error);
  });
},
freetrail() {
  axios.get('https://api.tkrgroups.co.in//leads_status', {
    params: {
      status: 'Free Trail',
      empname:this.employeeName

    }
  })
  .then(response => {
    this.ftc = response.data.admin;
  })
  .catch(error => {
    console.log(error);
  });
},
wrongnumber() {
  axios.get('https://api.tkrgroups.co.in//leads_status', {
    params: {
      status: 'Wrong Number/Switchoff',
      empname:this.employeeName

    }
  })
  .then(response => {
    this.wnc = response.data.admin;
  })
  .catch(error => {
    console.log(error);
  });
},
    fetchtodaycalls()
    {
      axios.get('https://api.tkrgroups.co.in//todaycalls',
      {
admin:'admin'
      })
  .then(response => {
    this.todaycount = response.data.count;
    console.log(this.todaycount)
  })
  .catch(error => {
    console.log(error);
  });
      
    },
    fetchRLed() {
  axios.get('https://api.tkrgroups.co.in//leads_status', {
    params: {
      status: 'Interested',
      is_admin:'admin'
    }
  })
  .then(response => {
    this.intcount = response.data.admin;

  })
  .catch(error => {
    console.log(error);
  });
},
fetchnotRLed() {
  axios.get('https://api.tkrgroups.co.in//leads_status', {
    params: {
      status: 'Not Interested',
      is_admin:'admin'
    }
  })
  .then(response => {
    this.notcount = response.data.admin;
  })
  .catch(error => {
    console.log(error);
  });
},
fetchbusy() {
  axios.get('https://api.tkrgroups.co.in//leads_status', {
    params: {
      status: 'Busy/notpickup',
      is_admin:'admin'
    }
  })
  .then(response => {
    this.busy = response.data.admin;
   

  })
  .catch(error => {
    console.log(error);
  });
},

fetchDnd() {
  axios.get('https://api.tkrgroups.co.in//leads_status', {
    params: {
      status: 'Dnd',
      is_admin:'admin'
    }
  })
  .then(response => {
    this.dnd = response.data.admin;
  })
  .catch(error => {
    console.log(error);
  });
},
  
//     addLanguage() {
//   if (this.newLanguage) {
//     console.log(this.newLanguage)
//     axios.post('https://api.tkrgroups.co.in//api/postlanguage', {
//       language: this.newLanguage
      
//     })
//     .then(response => {
//       console.log(response.data)
  
//       this.languages.push(response.data.language);
      
//       console.log(this.languages)

      
//       this.newLanguage = ''
//       this.addLanguageDialog=false
//     })
//     .catch(error => {
//       console.log(error)
//     })
//   }
// },

//     openFileInput() {
//       this.$refs.fileInput.click();
//     },
//     uploadFile() {
//       const file = this.$refs.fileInput.files[0];
//       const formData = new FormData();
//       formData.append('file', file);
    

//       axios.post('https://api.tkrgroups.co.in//add/leads', formData, { params: { language: this.selectedLanguage } }).then(response => {
//   console.log(response.data.message)
//   const num_rows = response.data.num_rows;
//    Swal.fire({
//         icon: 'success',
//         title: `${num_rows}Leads uploaded successfully`,
//         // text: `Number of leads: ${num_rows}`,
//         showConfirmButton: false,
//         timer: 1500
//       })
// }).catch(error => {
//   console.log(error)
// })

//     },

    assignleads()
        {
          console.log(this.noofleads);
          console.log(this.selectedBranch)
        axios.post('https://api.tkrgroups.co.in//api/leads/assign', {
          count:this.noofleads,
  branch_name: this.selectedBranch
  

})
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.log(error);
});
        },
//         language() {
//   axios.get("https://api.tkrgroups.co.in//api/getlanguage")
//     .then(response => {
//       this.languages.push(...response.data);
//       console.log(this.languages);
//     });
// }

    },
    beforeUnmount () {
      clearInterval(this.interval)
    },
    mounted () {
      axios.get('https://api.tkrgroups.co.in//api/leads/count')
        .then(response => {
          this.leadCount = response.data.count;
        })
        .catch(error => {
          console.log(error);
        });
      this.interval = setInterval(() => {
        if (this.value === 100) {
          return (this.value = 0)
        }
        this.value += 0
      }, 1000)
    },

  // addBranch() {
  //     axios.post('https://api.tkrgroups.co.in//apipost/branches', {
  //       name: this.newBranchName,
  //       manager_name: this.selectedManager
  //     })
  //       .then(response => {
  //         this.branches.push(response.data)
  //         this.addBranchModal});
  //       },
//       
  }
</script>

<style  scoped>


.cards{
    color: black;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    text-align: center;
    box-shadow: 3px 3px 3px 3px #9999;
  
 
  
}
.cards:hover{
  background: pink;
   transform: scale(1);
}
.card
{
  height: 6rem;
  width: 3rem;
  background:white;
  display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    text-align: center;
    box-shadow: 3px 3px 3px 3px #9999;
}
.graph{
    margin-top: 10rem;
}
.v-progress-circular {
  margin: 1rem;
}
.dialog
{
 
  width: 30rem;
  height: 15rem;

  background: green;
  border-radius: 30px;
 

}
.v-card {
  transition: transform 0.2s ease-in-out;
}

.v-card:hover {
  transform: scale(1.1);
}

</style>