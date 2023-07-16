<template>
  <VContainer>
    <div class="topdiv">
      <v-toolbar-title
        class="toolbar-title"
        style="font-size: 2rem; color: #2e1764"
        >Branch Details</v-toolbar-title
      >

      <v-divider class="mx-4" inset vertical></v-divider>
      <!-- <v-spacer></v-spacer> -->
      <div class="buttons">
        <!-- <button class="back" @click="goback"><VIcon>mdi-arrow-left-bold</VIcon></button> -->
        <VBtn
          @click="openAddBranchModal"
          style="background-color: #a96292; color: white"
          class="mx-aut"
          >Add Branch</VBtn
        >

        <!-- <VBtn
          @click="addEmpModal = !addEmpModal"
          style="background-color: green; color: white"
          >Add Employees</VBtn
        > -->
      </div>
    </div>

    <VRow class="mt-2">
      <VCol v-for="branch in branches" :key="branch">
        <!-- <VCard color=" mt-5" class="mx-aut bcards" max-width="300">
          <div class="card-content">
            <div class="">
              <VCardTitle class="bname">{{ branch.name }}</VCardTitle>
              

            </div>
           
          </div>
          <VCardActions>
            <VBtn class="dbtn" text @click="goToManagerDashboard(branch.name)">
              View Branch Dashboard
            </VBtn>
          </VCardActions>
          <VCardActions>
            <VBtn text>
              Edit
            </VBtn>
            <VBtn text>
              Delete
            </VBtn>
          </VCardActions>
          
        </VCard> -->
        <VCard color="mt-5" class="mx-aut bcards" max-width="300"  >
          <div class="card-content">
            <div class="" style=" padding: 10px; width:100%">
              <VCardTitle class="bname" style="text-transform: capitalize;">{{ branch.name }}</VCardTitle>
              <div class="" style="display:flex; width:200px;justify-content:space-evenly;align-items:center;text-align:center">
                <div class="location">{{ branch.city }}</div>
            <div class="location" style="display:flex;align-items:center;text-align:center">{{ branch.address }}
              <h6 style="color:#9999">(manager)</h6>
            </div>
              </div>
             
            </div>
            
           
            
          </div>
          <!-- <VCardActions>
            <VBtn class="dbtn" text @click="goToManagerDashboard(branch.name)">
              View Branch Dashboard
            </VBtn>
          </VCardActions> -->
          <VCardActions class="card-footer" style="background-color: #f2f2f2; padding: 10px;">
            <VBtn class="edit-btn" text @click="openEditDialog(branch)">
              <mdi-icon icon="square-edit-outline"></mdi-icon>
              <v-icon>mdi-pencil-circle</v-icon>
            </VBtn>
            <VBtn class="delete-btn" text @click="deletebranch(branch)">
             <v-icon> mdi-delete</v-icon>
            </VBtn>
            <VSpacer></VSpacer>
            <transition name="pulse" mode="out-in"> <!-- Add VSpacer component to create space between buttons -->
            <VBtn class="view-btn" text style="animation: infinite-pulse 2s infinite;"   @click="goToManagerDashboard(branch.name)"> View<v-icon>mdi-arrow-right-thick</v-icon></VBtn>
          </transition>
          </VCardActions>
        </VCard>
        
      </VCol>
    </VRow>

    <VDialog v-model="addBranchModal">
      <VCard>
        <VCardTitle>Add Branch</VCardTitle>
        <VCardText>
          <VForm>
            <VTextField label="Branch Location" v-model="branchlocation" />
            <VTextField label="Branch Name" v-model="newBranchName" />
          </VForm>
        </VCardText>

        <VCardActions>
          <VBtn text @click="addBranchModal = false">Cancel</VBtn>
          <VBtn text @click="addBranch">Add</VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
    
    <!-- employees addong model -->
    <VDialog v-model="addEmpModal">
      <VCard>
        <VCardTitle>Add Employees</VCardTitle>
        <VCardText>
          <VForm>
            <VTextField label="Employee Name" v-model="empname" />
            <VTextField label="Employee email" v-model="empemail" />
            <VTextField label="Employee password" v-model="emppassword" />
            <!-- <VTextField label="Employee branch" v-model="newEmployee" /> -->
            <VSelect
              label="Assign to branch"
              required
              v-model="selectedBranch"
              :items="branchname"
              item-text="name"
              item-value="id"
            />
            <!-- <v-select
                  label="branches"
                  v-model="selectedBranch"
                  :items="branchname"
                  item-text="name"
                  item-value="id"
                /> -->
          </VForm>
        </VCardText>

        <VCardActions>
          <VBtn text @click="addEmpModal = false">Cancel</VBtn>
          <VBtn text @click="addemp">Add</VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
    <!-- employess adding model ends -->
    <!-- <AssignLeads/> -->
    
    <VDialog v-model="dialogVisible" max-width="500px">
      <VCard>
        <VCardTitle>Edit Branch Details</VCardTitle>
        <VCardBody>
          <!-- Add your form fields for editing branch details here -->
          <!-- Example: -->
          <VTextField v-model="editedBranchName" label="Branch Name" ></VTextField>
          <VTextField v-model="editedBranchAddress" label="Branch Address"></VTextField>
        </VCardBody>
        <VCardActions>
          <VBtn text @click="saveChanges">Save</VBtn>
          <VBtn text @click="closeEditDialog">Cancel</VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </VContainer>
</template>

<script>
import Swal from 'sweetalert2'
// import AssignLeads from './Dashboard/AssignLeads.vue'
import axios from "axios";
export default {
  components: {
    // AssignLeads,
  },
  data() {
    return {
      selectedbranch:'',
      dialogVisible: false,
      addBranchModal: false,
      addEmpModal: false,
      newBranchName: "",
      branchlocation: "",
      empname: "",
      empemail: "",
      emppassword: "",
      selectedManager: null,
      selectedBranch: null,
      branches: [],
      branchname: [],
      managers: [],
      mname: [],
      managerNames: [],
      interval: {},
      value: 50,
      oldbranch:'',
    };
  },
  //   mounted() {
  //   this.fetchManagers().then(() => {
  //     console.log(this.managers);
  //   });
  // },
  created() {
    this.fetchBranches();
    this.fetchManagers();
    this.fetchbranchname();
    
   
  },


  methods: {

    openEditDialog(branch) {
      this.oldbranch=branch.name

      // this.selectedbranch=branch,
      // Initialize the dialog form fields with the current branch details
      this.editedBranchName = branch.name;
      this.editedBranchAddress = branch.city;
      this.dialogVisible = true;
    },
    saveChanges() {
    
      axios
        .post("https://api.tkrgroups.co.in//apipost/editbranches", {
          location: this.editedBranchAddress ,
         branch:this.oldbranch,
          name:this.editedBranchName,
        })
        .then((response) => {
         
          this.branches.push(response.data);
          this.addBranchModal;
          
        });
        this.addBranchModal = false;
        Swal.fire({
        title: 'Success',
        text: 'Branch Edited  successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        location.reload();
      });
      this.closeEditDialog();
    },
    closeEditDialog() {
      this.dialogVisible = false;
    },
//     deletebranch(branch) {
//   Swal.fire({
//     title: 'Confirmation',
//     text: 'Are you sure you want to delete this branch?',
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#3085d6',
//     cancelButtonColor: '#d33',
//     confirmButtonText: 'Yes, delete it!',
//   }).then((result) => {
//     if (result.isConfirmed) {
//       // Make the deletion request
//       const response =  axios.post('https://api.tkrgroups.co.in//api/delgetotp', {
//       name:'charan'
// //       // password: this.password
//     })
// .then((response) => {
//         // Handle the response
//         console.log(response.data);
//       }).catch((error) => {
//         console.error(error);
//       });
//       console.log(response)
//       console.log(branch)
//     }
//   });
// }
deletebranch(branch) {
  Swal.fire({
    title: 'Confirmation',
    text: 'Are you sure you want to delete this branch?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then((result) => {
    if (result.isConfirmed) {
      // Send request to backend to get OTP
      axios.post('https://api.tkrgroups.co.in/api/delgetotp', {
       
          name: "charan"
        
      })
        .then((response) => {
          // Handle the response
          console.log(response.data);
          if (response.data.status === 'otpsend') {
            Swal.fire({
              title: 'Enter OTP',
              input: 'text',
              inputAttributes: {
                autocapitalize: 'off'
              },
              showCancelButton: true,
              confirmButtonText: 'Submit',
              showLoaderOnConfirm: true,
              preConfirm: (otp) => {
                // Verify the OTP
                if (otp.toString() === response.data.otp.toString()) {
                  // Make the deletion request
                  return  axios
        .post("https://api.tkrgroups.co.in/editbranch", {
          name: branch.name,
        })
                    .then((response) => {
                      // Handle the response
                      console.log(response.data);
                      return response.data;
                    })
                    .catch((error) => {
                      console.error(error);
                      Swal.showValidationMessage(`Request failed: ${error}`);
                    });
                } else {
                  Swal.showValidationMessage('Invalid OTP');
                }
              },
              allowOutsideClick: () => !Swal.isLoading()
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire({
                  title: 'Success',
                  text: 'Branch deleted successfully',
                  icon: 'success',
                  confirmButtonText: 'OK',
                }).then(() => {
                  location.reload();
                });
              }
            });
          } else {
            Swal.fire({
              title: 'Error',
              text: 'Failed to send OTP',
              icon: 'error',
              confirmButtonText: 'OK',
            });
          }
        })
        .catch((error) => {
          console.error(error);
          Swal.fire({
            title: 'Error',
            text: 'Failed to get OTP',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        });
    }
  });
}



//    deletebranch(branch) {

//   Swal.fire({
//     title: 'Confirmation',
//     text: 'Are you sure you want to delete this branch?',
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#3085d6',
//     cancelButtonColor: '#d33',
//     confirmButtonText: 'Yes, delete it!',
//   }).then((result) => {
//     if (result.isConfirmed) {
//       // Make the deletion request
//       const response =  axios.get('https://api.tkrgroups.co.in//api/delgetotp', {
//       name:'charan'
//       // password: this.password
//     })
//     if (response.data.status === 'otpsend') {

    
// // Initiate the logout process in the previous session
// // await this.logoutFromPreviousSession();
// this.gotp = response.data.otp;
// this.otpSent = true;
// console.log(branch)
// // return;
// }
//       // axios
//       //   .post("https://api.tkrgroups.co.in/editbranch", {
//       //     name: branch.name,
//       //   })
//         // .then((response) => {
//         //   console.log(response);
//         //   console.log(branch)
//         //   this.addBranchModal = false;
//         //   Swal.fire({
//         //     title: 'Success',
//         //     text: 'Branch deleted successfully',
//         //     icon: 'success',
//         //     confirmButtonText: 'OK',
//         //   }).then(() => {
//         //     location.reload();
//         //   });
//         // })
        
//         // .catch((error) => {
//         //   console.error(error);
//         // });
//     }
//   });
// }
,
    // editbranch(branch){
    //   // alert(branch.name)
    //   axios
    //     .post("https://api.tkrgroups.co.in/editbranch", {
          
    //       name:branch.name,
    //     })
    //     .then((response) => {
         
    //       console.log(response)
          
    //     });
    //     this.addBranchModal = false;
    //     Swal.fire({
    //     title: 'Success',
    //     text: 'Branch Deleted successfully',
    //     icon: 'success',
    //     confirmButtonText: 'OK'
    //   }).then(() => {
    //     location.reload();
    //   });


    // },
   
    goToManagerDashboard(branchname) {
      this.$router.push({ name: "BranchesDashboard", params: { branchname } });
    },
    goback() {
      this.$router.go(-1);
    },
    // async fetchBranches() {
    //   try {
    //     const response = await axios.get('http://127.0.0.1:5000/apiget/branches');
    //     this.branches = response.data;
    //     console.log(this.branches)
    //     this.branches.forEach(branch => {
    //       this.fetchManagerName(branch.manager_id);
    //     });
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },
    async fetchBranches() {
      try {
        const response = await axios.get(
          "https://api.tkrgroups.co.in//apiget/branches"
        );
        this.branches = response.data;
        console.log(this.branches);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchManagerName(m_id) {
      try {
        const response = await axios.get(
          `https://api.tkrgroups.co.in//managers/${m_id}`
        );
        this.managerNames[m_id] = response.data.name;
        console.log(this.managerNames[m_id]);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchbranchname() {
      try {
        const { data } = await axios.get(
          "https://api.tkrgroups.co.in//apiget/branchename"
        );
        // this.managers = data.emp_list
        this.branchname = data.branch;

        console.log(this.branchname);
      } catch (error) {
        console.error(error);
      }
    },

    async fetchManagers() {
      try {
        const { data } = await axios.get(
          "https://api.tkrgroups.co.in//managers"
        );
        // this.managers = data.emp_list
        this.managers = data.employees;

        console.log(this.managers);
      } catch (error) {
        console.error(error);
      }
    },
    openAddBranchModal() {
      this.addBranchModal = true;
    },
    addBranch() {
      axios
        .post("https://api.tkrgroups.co.in//apipost/branches", {
          location: this.branchlocation,
          name: this.newBranchName,
        })
        .then((response) => {
         
          this.branches.push(response.data);
          this.addBranchModal;
          
        });
        this.addBranchModal = false;
        Swal.fire({
        title: 'Success',
        text: 'Branch Added successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        location.reload();
      });
    },
    addemp() {
      axios
        .post("https://api.tkrgroups.co.in//insertemp", {
          name: this.empname,
          email: this.empemail,
          password: this.emppassword,
          branch: this.selectedBranch,
        })
        .then((response) => {
          // this.branches.push(response.data)
          // this.addBranchModal
          console.log(response.data);
        });
    },
  },
};
</script>
<style scoped>
.card-content {
  display: flex;
  justify-content: space-around;
}
.bcards {
  box-shadow: 3px 3px 10px 3px #9999;
  border-radius: 5px;
}
.bcards:hover {
  background: linear-gradient(to left, rgb(244, 244, 244), rgb(243, 241, 242));
}
.buttons {
  display: flex;
  align-items: center;
  width: 30rem;
  height: 4rem;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.pulse-enter-active,
.pulse-leave-active {
  animation: pulse 2s infinite;
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
.topdiv {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.v-card {
  transition: transform 0.2s ease-in-out;
}

.v-card:hover {
  transform: scale(1);
}
.bname
{
  color:blue;
  position:relative;

  border-radius: 5px;
  width: 10rem;
  margin-right: 5.6rem;
  font-size: 1.3rem;
 
  border-bottom: none;
}
.dbtn
{
  color: white;
  background: rgb(118, 118, 231);
}

</style>

