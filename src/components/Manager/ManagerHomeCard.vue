<template>
    <div class="">
      <v-container>
       
  
          <v-row mt-5>
              <v-col cols="12" sm="4">
                  <v-card color="grey-lighten-3"
                    class="mx-aut"
                    max-width="344"
                    @click="assignedleadsbox=!assignedleadsbox"
                  >
                    <v-card-item>
                      <div>
                        <div class="text-overline mb-1">
                         Assigned Leads
                        </div>
                        
  
                          <div class="text-center">
                            <v-progress-circular
                              :rotate="360"
                              :size="80"
                              :width="15"
                              :model-value="leadCount"
                              color="teal"
                            >
                              {{ leadCount}}
                            </v-progress-circular>
                          </div>
                      </div>
                    </v-card-item>
                  </v-card> 
          </v-col>
          <v-col cols="12" sm="4">
              <v-card color="grey-lighten-3"
                class="mx-aut"
                max-width="344"
              >
                <v-card-item>
                  <div>
                    <div class="text-overline mb-1">
                      Completed Leads
                    </div>
                      <div class="text-center">
                        <v-progress-circular
                          :rotate="360"
                          :size="80"
                          :width="15"
                          :model-value="value"
                          color="orange"
                        >
                          {{ value }}
                        </v-progress-circular>
                      </div>
                  </div>
                </v-card-item>
              </v-card> 
      </v-col>
      <v-col cols="12" sm="4">
          <v-card color="grey-lighten-3"
            class="mx-aut"
            max-width="344"
          >
            <v-card-item >
              <div >
                <div class="text-overline mb-1">
                 Remaining Leads
                </div>
                  <div class="text-center">
                    <v-progress-circular
                      :rotate="360"
                      :size="80"
                      :width="15"
                      :model-value="value"
                      color="pink"
                    >
                      {{ value }}
                    </v-progress-circular>
                  </div>
              </div>
            </v-card-item>
  
          </v-card> 
  </v-col>
          </v-row>
         
         
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
          <VDialog v-model="openleadsmodel">
            <VCard>
              <VCardTitle>select language</VCardTitle>
              <VCardText>
                <VForm>
                  <VTextField label="language" v-model="language" />
                 
                  <!-- <VSelect
                    label="Managers"
                    v-model="selectedManager"
                    :items="managers"
                    item-text="name"
                    item-value="id"
                  /> -->
                </VForm>
              </VCardText>
      
              <VCardActions>
                <VBtn text @click="openleadsmodel = false">Cancel</VBtn>
                <VBtn text @click="openFileInput">Add</VBtn>
              </VCardActions>
            </VCard>
          </VDialog>
          <!-- end of box -->
          <h4>hello</h4>
          <img src="images\homeicon.png" alt="">
      </v-container>
      <!-- <v-container>
        <v-row mt-5>
          <v-col cols="12" sm="4" v-model="assignedleadsbox">
            <v-card color="grey-lighten-3"
              class="mx-aut"
              max-width="344"
              @click="assignedleadsbox"
            >
              <v-card-item>
               
                  
  hello Lorem ipsum dolor sit.
                
              </v-card-item>
            </v-card> 
    </v-col>
        </v-row>
      </v-container>
         -->
         <!-- cards cliking function v-dialog box code -->
         <v-dialog v-model="assignedleadsbox" >
          <v-card class="dialog" >
            <v-card-title class="text-center"> Assigned Leads </v-card-title>
            <!-- <v-card-text>
             
            </v-card-text> -->
            <div class="">
              <v-row>
                <v-col>
                  languages
  
                </v-col>
                <v-col>
                  Count
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  languages
  
                </v-col>
                <v-col>
                  Count
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  languages
  
                </v-col>
                <v-col>
                  Count
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  languages
  
                </v-col>
                <v-col>
                  Count
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  languages
  
                </v-col>
                <v-col>
                  Count
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  languages
  
                </v-col>
                <v-col>
                  Count
                </v-col>
              </v-row>
            </div>
    
           
          </v-card>
        </v-dialog>
         <!--  end of the code -->
  
    
    </div>
  
     
    </template>
  
    <script>
    import axios from 'axios'
    export default {
      name:"HomeCard",
      data () {
        return {
          addBranchModal: false,
          selectedBranch: null,
          openleadsmodel:false,
          assignedleadsbox:false,
          language:'',
          noofleads:'',
          branches:[],
          skill: 40,
        knowledge: 53,
        power: 78,
        intelligence:25,
          interval: {},
          leadCount: 0,
          
        }
      },
      methods:
      {
      //   assignleads()
      // {
      //    this.$router.push({name:"Assignleads"})
      // },
      openFileInput() {
        this.$refs.fileInput.click();
      },
      uploadFile() {
        const file = this.$refs.fileInput.files[0];
        const formData = new FormData();
        formData.append('file', file);
      
  
        axios.post('https://api.tkrgroups.co.in//add/leads', formData, { params: { language: this.language } }).then(response => {
    console.log(response.data.message)
  }).catch(error => {
    console.log(error)
  })
  
      },
  
      assignleads()
          {
            console.log(this.noofleads);
            console.log(this.selectedBranch)
          axios.post('https://api.tkrgroups.co.in//api/leads/assign', {
            count:this.noofleads,
    branch_name: this.selectedBranch
    
  // }, {
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.log(error);
  });
          }
  
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
      // getting branch names
     async created() {
        try{
          const { data } = await axios.get("https://api.tkrgroups.co.in//apiget/branchename")
          // this.managers = data.emp_list
          this.branches=data.branch
          
          console.log(this.branches)
          }
        
        catch (error) {
            console.error(error);
          }
      
    },
    addBranch() {
        axios.post('https://api.tkrgroups.co.in//apipost/branches', {
          name: this.newBranchName,
  
          manager_name: this.selectedManager
        })
          .then(response => {
            this.branches.push(response.data)
            this.addBranchModal});
          },
  //         assignleads()
  //         {
  //           console.log(this.noofleads);
  //           console.log(this.selectedBranch)
  //         axios.post('http://127.0.0.1:5000/api/leads/assign', {
  //           count:this.noofleads,
  //   branch_name: this.selectedBranch
    
  // // }, {
  // //   headers: {
  // //     'Content-Type': 'application/json'
  // //   }
  // })
  // .then(response => {
  //   console.log(response.data);
  // })
  // .catch(error => {
  //   console.log(error);
  // });
  //         }
  
    }
  </script>
  
  <style  scoped>
  
  
  .cards{
      color: white;
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-direction: column;
      text-align: center;
    
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
  
    background:whitesmoke;
    box-shadow: inset;
    border-radius: 30px;
   
  
  }
  
  </style>