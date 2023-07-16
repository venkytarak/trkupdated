<template>
  <v-container>
    <v-row justify="center" class="lf">
      <v-col cols="12" md="6" lg="4" sm="10">
        <v-card class="login">
          <v-card-title class="text-center">Login Form</v-card-title>

          <v-card-text>
            <v-img src="/trklogo.jfif" aspect-ratio="2.5"></v-img> 
           
            <v-form ref="loginForm" @submit.prevent="getotp">
              <template v-if="!otpSent">
                <v-text-field v-model="name" label="Username"></v-text-field>
                <v-text-field
                  v-model="password"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  label="Password"
                  @click:append="showPassword = !showPassword"
                ></v-text-field>
                <v-btn type="submit" color="primary" block>Get OTP</v-btn>
              </template>
              <template v-else>
                <p>OTP has been sent.</p>
                <v-text-field v-model="otp" label="Enter OTP"></v-text-field>
                <v-btn @click="login" color="primary" block>Verify & Login</v-btn>
              </template>
            </v-form>
            
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
// import io from 'socket.io-client';

export default {
  data() {
    return {
      name: "",
      password: "",
      showPassword: false,
      otpSent: false,
      otp: '',
      gotp:''
    };
  },
  
  // mounted() {
  //   this.socket = io("https://api.tkrgroups.co.in/");
  //   this.socket.on("loginResponse", (response) => {
  //     if (response.status === "success") {
  //     if (response.role === "emp") {
  //         // Redirect to employee dashboard or perform any other action4
  //         alert("approved")
  //         const employeeName = response.emp_name;
  //       this.$router.push(`/emphome/${employeeName}`);
  //         console.log("Employee login successful");
  //       }
  //     } else {
  //       console.log("Login failed:", response.message);
  //     }

  //     // Show or hide the relevant form based on the login response
  //     this.otpSent = response.status === "otpsend";
  //   });
  // },
  
  methods: {
    async getotp() {
  try {
    const response = await axios.post('https://api.tkrgroups.co.in//api/getotp', {
      name: this.name,
      password: this.password
    });
    
    console.log(response.data);
    
    if (response.data.status === 'error') {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: response.data.message,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
      });
      // Show Sweet Alert with error message
  
    } else if (response.data.status === 'otpsend') {

    
        // Initiate the logout process in the previous session
        // await this.logoutFromPreviousSession();
        this.getotp = response.data.otp;
      this.otpSent = true;
        // return;
      }
      // this.gotp = response.data.otp;
      // this.otpSent = true;
  
    
    
   
  } catch (error) {
    // Handle error
    console.log(error);
   
  }
},



async login() {
  console.log(`Username: ${this.name}, Password: ${this.password}`);
  
  try {
   
    const response = await axios.post('https://api.tkrgroups.co.in/api/login', {
      name: this.name,
      password: this.password,
      otp: this.otp,
      gotp: this.getotp
    });

    if (response.data.status === 'success') {
     localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('userRole', response.data.role);
      localStorage.setItem('userStatus', response.data.status);
      localStorage.setItem('token', response.data.token);
      console.log(response.data)
      // Redirect based on role
      if (response.data.role === 'admin') {
      
        this.$router.push('/AdHome');
      
      } else if (response.data.role === 'manager') {
        const branchName = response.data.branch;
        const manager = response.data.name;
        
        this.$router.push({ name: 'mghome', params: { branchName, manager }});
      } else if (response.data.role === 'emp') {
        console.log(response.data.id)
        const employeeName = response.data.emp_name;
        // this.$router.push('/LAP')
         this.$router.push(`/LAP/${employeeName}`);
      }

      Swal.fire({
        icon: 'success',
        title: 'Signed in successfully',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
      });
    } else {
      await Swal.fire({
        icon: 'error',
        title: response.data.message,
        showConfirmButton: false,
        timer: 2000
      });
    }
  } catch (error) {
    console.error(error);
    await Swal.fire({
      icon: 'error',
      title: 'Login Failed',
      text: error.message,
      showConfirmButton: true,
      confirmButtonText: 'OK'
    });
  }
},


    
  
  },
};
</script>

<style>
.lf {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login {
  background: rgba(255, 255, 255, 0.25);
  border: 4px solid rgba(255, 255, 255, 0.25);
  background: blur(20px);
}

</style>

<!-- <template>
  <v-container>
    <v-row justify="center" class="lf">
      <v-col cols="12" md="6" lg="4" sm="10">
        <v-card class="login">
          <v-card-title class="text-center">Login Form</v-card-title>

          <v-card-text>
            <v-img src="/trklogo.jfif" aspect-ratio="2.5"></v-img> 
           
            <v-form ref="loginForm" @submit.prevent="getotp">
              <template v-if="!otpSent && !waitingForApproval">
                <v-text-field v-model="name" label="Username"></v-text-field>
                <v-text-field
                  v-model="password"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  label="Password"
                  @click:append="showPassword = !showPassword"
                ></v-text-field>
                <v-btn type="submit" color="primary" block>Get OTP</v-btn>
              </template>
              <template v-else-if="otpSent">
                <p>OTP has been sent.</p>
                <v-text-field v-model="otp" label="Enter OTP"></v-text-field>
                <v-btn @click="login" color="primary" block>Verify & Login</v-btn>
              </template>
              <template v-else>
                <p>Waiting for manager approval...</p>
             You can show a loading indicator here 
              </template>
            </v-form>
            
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>-->
<!-- <script>
import axios from "axios";
import Swal from "sweetalert2";
import io from 'socket.io-client';

export default {
  data() {
    return {
      name: "",
      password: "",
      showPassword: false,
      otpSent: false,
      otp: '',
      gotp: '',
      waitingForApproval: false
    };
  },
  
  created() {
    this.socket = io("http://localhost:3000");
    this.socket.on("loginResponse", (response) => {
     if (response.status === "success") { 
        if (response.role === "manager") {
          // Redirect to manager dashboard or perform any other action
          console.log("Manager login successful");
        } 
        else if (response.role === "emp") {
          // Redirect to employee dashboard or perform any other action
          alert(response.data)
          const employeeName = response.emp_name;
          this.$router.push(`/emphome/${employeeName}`);
          console.log("Employee login successful");
        }
      } else {
        console.log("Login failed:", response.message);
  // Display SweetAlert notification for login failure
  Swal({
    title: "Login Failed",
    text: response.message,
    icon: "error",
    button: "OK",
  });
      }

      this.otpSent = response.status === "otpsend";
      this.waitingForApproval = response.status === "waitingForApproval";
    });
  },
  
  methods: {
    async getotp() {
      try {
        const response = await axios.post('http://localhost:3000/api/getotp', {
          name: this.name,
          password: this.password
        });
        
        if (response.data.status === 'error') {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: response.data.message,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
          });
        } else if (response.data.status === 'otpsend') {
          this.getotp = response.data.otp;
          this.otpSent = true;
          console.log(response.data.otp)
        }
      } catch (error) {
        console.log(error);
      }
    },

    async login() {
      try {
        const response = await axios.post('http://localhost:3000/api/verifyotp', {
          name: this.name,
          password: this.password,
          otp: this.otp,
          getotp: this.getotp
        });

        if (response.data.status === 'success') {
          localStorage.setItem('isLoggedIn', true);
          localStorage.setItem('userRole', response.data.role);
          localStorage.setItem('userStatus', response.data.status);
          localStorage.setItem('token', response.data.token);
          alert("check")
      //     if (response.data.role === 'admin') {
      //   this.$router.push('/AdHome');
      // } else if (response.data.role === 'manager') {
      //   const branchName = response.data.branch;
      //   const manager = response.data.name;
      //   this.$router.push({ name: 'mghome', params: { branchName, manager }});
      // } else if (response.data.role === 'emp') {
      //   // const employeeName = response.data.emp_name;
      //   // else if (response.data.role === 'emp') {
      //       this.socket.emit("loginRequest", {
      //         role: "employee",
      //         name: this.name,
      //         password: this.password,
      //         branch: response.data.branch,
      //         id: response.data.id
      //       });
      //       this.waitingForApproval = true;
      //     }
        // this.$router.push(`/emphome/${employeeName}`);
      

          
          if (response.data.role === 'admin') {
            alert("admin")
            this.$router.push('/AdHome');
          } else if (response.data.role === 'manager') {
            const branchName = response.data.branch;
            const manager = response.data.name;
            console.log(branchName)
            console.log(manager)
            alert(manager)
            this.$router.push({ name: 'mghome', params: { branchName, manager }});
            alert("done")
          } else if (response.data.role === 'emp') {
            this.socket.emit("loginRequest", {
              role: "employee",
              name: this.name,
              password: this.password,
              branch: response.data.branch,
              id: response.data.id
            });
            this.waitingForApproval = true;
          }

          Swal.fire({
            icon: 'success',
            title: 'Signed in successfully',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
          });
        } else {
          await Swal.fire({
            icon: 'error',
            title: response.data.message,
            showConfirmButton: false,
            timer: 2000
          });
        }
      } catch (error) {
        console.error(error);
        await Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: error.message,
          showConfirmButton: true,
          confirmButtonText: 'OK'
        });
      }
    },
  },
};
</script>

<style>
.lf {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login {
  background: rgba(255, 255, 255, 0.25);
  border: 4px solid rgba(255, 255, 255, 0.25);
  background: blur(20px);
}

</style> --> -->
