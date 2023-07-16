<template>
  <div class="">
    <AdminSidebarVue />
    <div class="mt-5">
      <!-- <button @click="goBack" class="back mt-5"><v-icon>mdi-arrow-left-bold</v-icon></button> -->
      <v-data-table
        :headers="headers"
        :items="employees"
        :sort-by="[{ key: 'name', order: 'asc' }]"
        class="elevation-1 ml-5 hdr"
        :header-class="'header-background'"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title class="toolbar-title"
              >Employees Details</v-toolbar-title
            >

            <v-btn
              style="background-color: #250361; color: white"
              @click="downloadCSV"
              >Download CSV</v-btn
            >

            <v-divider class="mx-4" inset vertical></v-divider>
            <!-- <v-spacer></v-spacer> -->
            <button class="empbtn" @click="addEmpModal = !addEmpModal">
              AddEmployee
            </button>

            <VDialog v-model="addEmpModal">
              <VCard>
                <VCardTitle>Add Employees</VCardTitle>
                <VCardText>

                  <VForm>
                    <v-container>
                      <v-row>
                        <v-col cols="6">
                          <VTextField label="Employee Name" v-model="empname" />
                        </v-col>
                        <v-col cols="6">
                          <VTextField label="Employee email" v-model="empemail" />
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="6">
                          <VTextField label="Employee password" v-model="emppassword" />
                        </v-col>
                        <v-col cols="6">
                          <VSelect
                            label="Assign to branch"
                            required
                            v-model="selectedBranch"
                            :items="branchname"
                            item-text="name"
                            item-value="id"
                          />
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="6">
                          <VSelect label="Role" v-model="selectedRole" :items="roles" />
                        </v-col>
                        <v-col cols="6">
                          <VTextField label="Date of Joining" type="date" v-model="Dateofjoin" />
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="6">
                          <VTextField label="Date Of Birth" type="date" v-model="DateofBirth" />
                        </v-col>
                        <v-col cols="6">
                          <VTextField
                          label="Address"
                          v-model="address"
                          class="large-input"
                          rows="5"
                          multi-line
                        />                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="6">
                          <VTextField label="OTP Mobile" v-model="otpMobile" />
                        </v-col>
                        <v-col cols="6">
                          <VTextField label="Aadhaar" v-model="aadhaar" />
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="6">
                          <VTextField label="PAN" v-model="pan" />
                        </v-col>
                        <v-col cols="6">
                          <VTextField label="Alternate Mobile" v-model="alternateMobile" />
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="6">
                          <VSelect label="Gender" v-model="selectedGender" :items="genders" />
                        </v-col>
                        <v-col cols="6">
                          <VTextField label="Mobile number" v-model="Mobilenumber" />
                        </v-col>
                        <!-- Add more fields as needed -->
                      </v-row>
                    </v-container>
                  </VForm>
                  
                  
                </VCardText>

                <VCardActions>
                  <VBtn text @click="addEmpModal = false">Cancel</VBtn>
                  <VBtn text @click="addemp">Add</VBtn>
                </VCardActions>
              </VCard>
            </VDialog>
          </v-toolbar>
        </template>
        <!-- <template v-slot:[`item.actions`]="{ item }">
          <v-icon size="small" class="me-2" @click="editItem(item.raw)">
            mdi-pencil
          </v-icon>
        </template> -->
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon size="small" class="me-2" @click="editItem(item.raw)"  style="color:blue;">
            mdi-pencil
          </v-icon>
          <v-icon size="small" @click="deleteemp(item.raw)" style="color:red;">
            mdi-delete
          </v-icon>
        </template>
        
      </v-data-table>
      <v-dialog v-model="showQRCodeDialog" max-width="500px">
        <v-card>
          <v-card-title>QR Code</v-card-title>
          <v-card-text>
            <img :src="qrCode" alt="QR Code" v-if="qrCode" />
          </v-card-text>
          <v-card-actions>
            <v-btn text @click="showQRCodeDialog = false">Close</v-btn>
            <v-btn text @click="downloadQRCode">Download</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <VDialog v-model="editemployee">
      <VCard>
        <VCardTitle>{{ dialogTitle }}</VCardTitle>
        <VCardText>.
          <VBtn @click="editmode">Edit Employee</VBtn>
          

          <VForm>
            <v-container>
              <v-row>
                <v-col cols="6">
                  <VTextField label="Employee Name" v-model="selectedEmployee[1]" :readonly="readOnlyMode"/>
                </v-col>
                <v-col cols="6">
                  <VTextField label="Employee email" v-model="selectedEmployee[2]" :readonly="readOnlyMode"/>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <VTextField label="Employee password" v-model="selectedEmployee[4]" :readonly="readOnlyMode"/>
                </v-col>
                <v-col cols="6">
                  <VSelect
                    label="Assign to branch"
                    required
                    v-model="selectedEmployee[3]"
                    :items="branchname"
                    item-text="name"
                    item-value="id"
                    :readonly="readOnlyMode"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <VSelect label="Role" v-model="selectedEmployee[14]" :items="roles" :readonly="readOnlyMode" />
                </v-col>
                <v-col cols="6">
                  <VTextField label="Date of Joining" type="date" v-model="selectedEmployee[5]" :readonly="readOnlyMode"/>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <VTextField label="Date Of Birth" type="date" v-model="selectedEmployee[6]" :readonly="readOnlyMode"/>
                </v-col>
                <v-col cols="6">
                  <VTextField
                  label="Address"
                  v-model="selectedEmployee[10]"
                  class="large-input"
                  rows="5"
                  multi-line
                  :readonly="readOnlyMode"
                />                        </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <VTextField label="OTP Mobile" v-model="selectedEmployee[9]" :readonly="readOnlyMode"/>
                </v-col>
                <v-col cols="6">
                  <VTextField label="Aadhaar" v-model="selectedEmployee[11]" :readonly="readOnlyMode" />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <VTextField label="PAN" v-model="selectedEmployee[12]" :readonly="readOnlyMode"/>
                </v-col>
                <v-col cols="6">
                  <VTextField label="Alternate Mobile" v-model="selectedEmployee[8]" :readonly="readOnlyMode"/>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <VSelect label="Gender" v-model="selectedEmployee[13]" :items="genders" :readonly="readOnlyMode"/>
                </v-col>
                <v-col cols="6">
                  <VTextField label="Mobile number" v-model="selectedEmployee[7]" :readonly="readOnlyMode"/>
                </v-col>
                <!-- Add more fields as needed -->
              </v-row>
            </v-container>
          </VForm>
          
          
        </VCardText>

        <VCardActions>
          <VBtn text @click='closedit'>Cancel</VBtn>
           <VBtn v-if="editMode" text @click="updateemp">{{ editMode ? 'Save' : 'Add' }}</VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
    
  </div>
  
</template>
<script>

import axios from "axios";
import AdminSidebarVue from "./AdminSidebar.vue";
import Swal from 'sweetalert2'
export default {
  name: "InterestedLeads",
  components: {
    AdminSidebarVue,
  },

  data: () => ({
    selectedEmployee:{},
    addEmpModal: false,
    editMode:false,
    readOnlyMode: true,
    showQRCodeDialog:false,
    editemployee:false,
    qrCode : '',
    selectedRole:'',
    selectedGender:"",
    Dateofjoin:'',
    DateofBirth:'',
    alternateMobile:'',
    aadhaar:'',
    otpMobile:'',
    address:'',
    Mobilenumber:'',
    pan:'',

    empname: "",
    empemail: "",
    emppassword: "",
    selectedBranch: "",
    employees: [],
    dialog: false,
    dialogDelete: false,
    branchname: [],
    qrcodeImage :'',
    roles:['emp','Floor manager','Am','Supervisor'],
    genders:['Male','Female','Others'],
   oldname:'',
   oldbranch:'',
       headers: [
      // { title: "Id", key: "0" },
      
      { title: "user Name", key: "1" },
      { title: "Email", key: "2" },
      { title: "password", key: "4" },
      {
        title: "Branch",
        align: "start",
        sortable: false,
        key: "3",
      },

      { title: "role", key: "14" },
      // { title: "Chat", key: "" },
      { title: 'Actions', key: 'actions', sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      empid: "",
      name: 0,
      branch: 0,
      mail: 0,
      role: 0,
    },
    defaultItem: {
      empid: "",
      name: 0,
      branch: 0,
      mail: 0,
      role: 0,
    },
    items: ["Manager", "Employee"],
  }),

  computed: {
    dialogTitle() {
    return this.editMode ? 'Edit Employee' : 'Add Employee';
  },
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },
 

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.initialize();
    this.fetchemployees();
    this.fetchbranchname();
  },

  methods: {
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
    
    updateemp()
    {
      
     
      
      axios
        .post("https://api.tkrgroups.co.in//updatemp", {
          name: this.selectedEmployee[1],
          email:this.selectedEmployee[2],
          password:this.selectedEmployee[4],
          branch:this.selectedEmployee[3],
          selectedRole:this.selectedEmployee[14],
           selectedGender:this.selectedEmployee[13],
    Dateofjoin:this.selectedEmployee[5],
    DateofBirth:this.selectedEmployee[6],
    alternateMobile:this.selectedEmployee[8],
    aadhaar:this.selectedEmployee[11],
    otpMobile:this.selectedEmployee[9],
    address:this.selectedEmployee[10],
    Mobilenumber:this.selectedEmployee[7],
    pan:this.selectedEmployee[12],
    oldname:this.oldname,
    oldbranch:this.oldbranch
        }
        )
        .then((response) => {
         
          

          this.editemployee =false
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
    addemp() {
      
      axios
        .post("https://api.tkrgroups.co.in//insertemp", {
          name: this.empname,
          email: this.empemail,
          password: this.emppassword,
          branch: this.selectedBranch,
          selectedRole:this.selectedRole,
           selectedGender:this.selectedGender,
    Dateofjoin:this.Dateofjoin,
    DateofBirth:this.DateofBirth,
    alternateMobile:this.alternateMobile,
    aadhaar:this.aadhaar,
    otpMobile:this.otpMobile,
    address:this.address,
    Mobilenumber:this.Mobilenumber,
    pan:this.pan,
    
        }
        )
        .then((response) => {
         
         

          this.addEmpModal=false
          Swal.fire({
        title: 'Success',
        text: 'Employee Added successfully',
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
    downloadQRCode() {
      const link = document.createElement('a');
      link.href = this.downloadLink;
      link.setAttribute('download', 'qr_code.png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },

    downloadCSV() {
      const rows = [];
      // push the header row
      rows.push(this.headers.map((h) => h.title));
      // push the data rows
      this.employees.forEach((item) => rows.push(Object.values(item)));
      // convert rows to CSV content
      const csvContent = rows.map((r) => r.join(",")).join("\n");
      // create a new Blob object with the CSV content
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      // create a download link and trigger click event to download
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "employees.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },

    goBack() {
      this.$router.go(-1);
    },
    initialize() {},
   
    deleteemp(item){
  
  Swal.fire({
    title: 'Confirmation',
    text: `Are you sure you want to delete  ${item[1]}?`,
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
                  .post("https://api.tkrgroups.co.in/deleteemp", {
          name: item[1],
          branch:item[3]}
        )
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
                  text: 'Employee deleted successfully',
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
},
    // deleteemp(item) {
      
    //   axios
    //     .post("https://api.tkrgroups.co.in/deleteemp", {
    //       name: item[1],
    //       branch:item[3]

    
    //     }
    //     )
    //     .then((response) => {
        
    //       Swal.fire({
    //     title: 'Success',
    //     text: 'Employee deleted successfully',
    //     icon: 'success',
    //     confirmButtonText: 'OK'
    //   }).then(() => {
    //     location.reload();
    //   });
    
    //       // this.branches.push(response.data)
    //       // this.addBranchModal
    //       console.log(response.data);
    //     });

    // },
    editItem(item) {
      
      this.selectedEmployee = { ...item };
    // this.readOnlyMode = false; // Allow editing
    // this.editMode = true;
    this.editemployee = true;
    console.log(item)
    },
    editmode()
    {
      
      this.oldname=this.selectedEmployee[1],
      this.oldbranch=this.selectedEmployee[3],
     
      this.readOnlyMode = false; // Allow editing
    this.editMode = true;
    },
    closedit()
    {
      this.readOnlyMode = true; // Allow editing
    this.editMode = false;
    this.editemployee=false
    },
    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
    async fetchemployees() {
      const role = "admin"; // or 'admin'
      // const branchName = this.branchName; // applicable only for manager role
      axios
        .get(`https://api.tkrgroups.co.in//employees/${role}`)
        .then((response) => {
          this.employees = response.data.employees;
          console.log(this.employees);
        }) .then((response) => {
         
      
          console.log(response.data);


        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style scoped>
.back {
  background: white;
  color: black;
  font-size: 1rem;
  border-radius: 30px;
  height: 3rem;
  width: 3rem;
  box-shadow: 3px 3px 3px 3px #9999;
}
.toolbar-title {
  color: #250361;
  /* height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center; */
}
.empbtn {
  margin-left: 30rem;
  background: #250361;
  color: white;
  height: 2.2rem;
  width: 9rem;
  border-radius: 5px;
  margin-right: 3rem;
}
.header-background th {
  background-color: red;
}
</style>
