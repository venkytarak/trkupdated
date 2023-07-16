<template>
  <nav>
    <v-navigation-drawer class="navige" v-model="drawer">
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
        :title="employeeName"
        subtitle="(Employee)"
        style="color: white"
        nav
      >
        <template v-slot:append>
                  <v-btn
                    variant="text"
                    icon="mdi-chevron-left"
                    @click.stop="drawer=!drawer"
                  ></v-btn>
                </template>
      </v-list-item>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <!-- <router-link :to="'/employee/' +employeeName"><v-list-item style="color: black; font-size: 1.2rem;font-weight:600"  prepend-icon="mdi-view-dashboard" title="Dashboard" value="account" class="mt-5 navitems" color="red "></v-list-item></router-link> -->
        <v-list-item
          style="color: white; font-size: 1.2rem; font-weight: 600"
          :to="'/emphome/' + employeeName"
          prepend-icon="mdi-view-dashboard"
          title="Dashboard"
          value="account"
          class="mt-5 navitems"
        ></v-list-item>

        <v-list-item
          style="color: white; font-size: 1.2rem"
          :to="'/el/' + employeeName"
          prepend-icon="mdi-account-multiple"
          title="Leads"
          value="leads"
          class="mt-5 navitems"
        ></v-list-item>
        <v-list-item
          style="color: white; font-size: 1.2rem"
          :to="'/Leadrequest/' + employeeName"
          prepend-icon="mdi-calendar-month"
          title="Request"
          value="lead request"
          class="mt-5 navitems"
        ></v-list-item>

        <v-list-item
          style="color: white; font-size: 1.2rem"
          :to="'/emptarget/' + employeeName"
          prepend-icon="mdi-account-multiple"
          title="Target"
          value="Target"
          class="mt-5 navitems"
        ></v-list-item>

      
                <v-list-item
                style="color: white; font-size: 1.2rem"
                :to="'/newpayment/' + employeeName"
                prepend-icon="mdi-cash"
                title="Add Payment"
                value="Add payment"
                class="mt-5 navitems"
              ></v-list-item>
        <v-list-item
          style="color: white; font-size: 1.2rem"
          :to="'/partial/' + employeeName"
          prepend-icon="mdi-cash"
          title="Partial payments"
          value="future payments"
          class="mt-5 navitems"
        ></v-list-item>

        <v-list-item
          style="color: white; font-size: 1.2rem"
          :to="'/futurepay/' + employeeName"
          prepend-icon="mdi-sale"
          title="Future payments"
          value="future payments"
          class="mt-5 navitems"
        ></v-list-item>
        <v-list-item
          style="color: white; font-size: 1.2rem"
          :to="'/Emppay/' + employeeName"
          prepend-icon="mdi-credit-card"
          title="Payment clients"
          value="payment client"
          class="mt-5 navitems"
        ></v-list-item>
        <v-list-item
          style="color: white; font-size: 1.2rem"
          :to="'/empspcl/' + employeeName"
          prepend-icon="mdi-home-city"
          title="Special clients"
          value="account"
          class="mt-5 navitems"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app color="#11012c	" dark>
      <v-btn icon @click="drawer=!drawer">
                  <v-icon class="menuicon" style="color:white">mdi-menu</v-icon>
              </v-btn>

      <v-toolbar-title>
        <a :href="'/emphome/' + employeeName">
          <img src="/trklogo.jfif" alt="Logo" class="logo-img" />
        </a>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn stacked @click="openSettingsDialog">
        <v-icon color="white">mdi-cog</v-icon>
      </v-btn>
      

      <v-btn stacked>
        <v-badge color="red" content="5" @click="openMessageBox">
          <v-icon color="white">mdi-bell</v-icon>
        </v-badge>
      </v-btn>

      <v-btn style="background-color: #a96292" @click="logout">
        <v-icon color="white" icon="mdi-login"></v-icon>

        <p style="color: white" >Logout</p>
      </v-btn>

      <!-- Additional toolbar items go here -->
    </v-toolbar>
    <v-main>
      <VDialog v-model="editemployee">
        <VCard>
          <VCardTitle>{{ dialogTitle }}</VCardTitle>
          <VCardText>.
            <VBtn @click="editmode">Edit Employee</VBtn>
            
  
            <VForm>
              <v-container>
                <v-row>
                  <v-col cols="6">
                    <VTextField label="Employee Name" v-model="name"  :readonly="readOnlyMode"/>
                  </v-col>
                  <v-col cols="6">
                    <VTextField label="Employee email" v-model="email" :readonly="readOnlyMode"/>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <VTextField label="Employee password" v-model="password" :readonly="readOnlyMode"/>
                  </v-col>
                  <v-col cols="6">
                    <VTextField label="Mobile number" v-model="mobile_number" :readonly="readOnlyMode"/>
                  </v-col>
                 
                 
                </v-row>
               
                <v-row>
                  <v-col cols="6">
                    <VTextField label="Aadhaar" v-model="aadhaar" :readonly="readOnlyMode" />
                  </v-col>
                  <!-- <v-col cols="6">
                    <VTextField label="Date Of Birth" type="date" v-model="v" :readonly="readOnlyMode"/>
                  </v-col> -->
                  <v-col cols="6">
                    <VTextField
                    label="Address"
                    v-model="address"
                    class="large-input"
                    rows="5"
                    multi-line
                    :readonly="readOnlyMode"
                  />                        </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <VTextField label="OTP Mobile" v-model="otp_mobile" :readonly="readOnlyMode"/>
                  </v-col>
                  <v-col cols="6">
                    <VTextField label="Alternate Mobile" v-model="alternate_mobile" :readonly="readOnlyMode"/>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <VTextField label="PAN" v-model="pan" :readonly="readOnlyMode"/>
                  </v-col>
                 
                </v-row>
                <v-row>
                  <!-- <v-col cols="6">
                    <VSelect label="Gender" v-model="v" :items="genders" :readonly="readOnlyMode"/>
                  </v-col> -->
                 
                </v-row>
              </v-container>
            </VForm>
            
            
          </VCardText>
  
          <VCardActions>
            <VBtn text @click='closedit'>Cancel</VBtn>
             <VBtn v-if="editMode" text @click="saveData">{{ editMode ? 'Save' : 'Add' }}</VBtn>
          </VCardActions>
        </VCard>
      </VDialog>
    </v-main>
  </nav>
</template>

<script>

import Swal from 'sweetalert2'
import axios from 'axios';
export default {
  data() {
    return {
      editemployee:false,
      editMode:false,
    readOnlyMode: true,
      dialogVisible:false,
      employeeName: "",
      drawer: true,
      emp:[],
      selectedemp:[],
      items: [
        { title: "Home", icon: "mdi-home-city" },
        { title: "My Account", icon: "mdi-account" },
        { title: "Users", icon: "mdi-account-group-outline" },
      ],
      name:'',
    };
  },
  computed: {
    dialogTitle() {
    return this.editMode ? 'Edit Employee' : 'Add Employee';
  },
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },
  created() {
    //
    this.employeeName = this.$route.params.employeeName;
   
    console.log(this.employeeName);
    this.fetchempdetails()
   
    //  this.pass()
  },
  methods: {
    editmode()
    {
      
     
     
      this.readOnlyMode = false; // Allow editing
    this.editMode = true;
    },
    async fetchempdetails()
    {
      const response = await axios.post('https://api.tkrgroups.co.in/fetchemp', {
      name: this.employeeName,
      
     
    })
    this.emp=response.data.data[0]
    console.log(this.emp[1])
  

    },
    openSettingsDialog() {
    
      // Open the settings dialog b
     
      this.editemployee = true;
      this.name=this.emp[1]
      this.email=this.emp[2]
      this.password=this.emp[4]
      this.address=this.emp[10]
      this.otp_mobile=this.emp[9]
      this.aadhaar=this.emp[11]
      this.alternate_mobile=this.emp[8]
      this.pan=this.emp[12]
      this.mobile_number=this.emp[7]
     
      
     
    },
    saveData() {
     
      axios
        .get("https://api.tkrgroups.co.in//updatemp", {
          name: this.name,
          email:this.email,
          password:this.password,
        
    alternateMobile:this.alternate_mobile,
    aadhaar:this.aadhaar,
    otpMobile:this.otp_mobile,
    address:this.address,
    Mobilenumber:this.mobile_number,
    pan:this.pan,
    oldname:this.employeeName,
    role:'emp',
    oldbranch:this.emp[3]
        }
        )
        .then((response) => {
         this.employeeName = this.name; // Update the employee name with the new name
      this.$router.push({ name: 'emphome', params: { employeeName: this.employeeName } }); // Navigate to employee dashboard with the updated name as a route parameter

      this.editemployee = false;
          Swal.fire({
        title: 'Success',
        text: 'Employee Updated successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        location.reload();
      });
    
          // this.branches.push(response.data)
          // this.addBranchModal
          console.log(response.data);
        });
    

    },
    cancelChanges() {
      // Cancel the changes made in the input fields
      // Close the dialog box
      this.dialogVisible = false;
    },



 async logout() {

    const response = await axios.post('https://api.tkrgroups.co.in//api/logout', {
      name: this.employeeName,
      
     
    })
    console.log(response)
    // Show confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed, logout the user
        // Redirect to login page
        window.location.href = '/';
      }
    });
  }
}
};
</script>

<style>
.navige {
  background: #11012c;
}
.logo-img {
  width: 55px;
  height: 55px;
  border-radius: 50px;
}
.menuicon {
  color: black;
}
.navigation {
  background-color: #250361;
}
.navi {
  color: white;
}
.navitems:active {
  background: lightgreen;
}
.list-item-custom {
  color: black;
  font-size: 1.2rem;
}

.list-item-custom .v-icon {
  color: #3f51b5;
}
</style>
