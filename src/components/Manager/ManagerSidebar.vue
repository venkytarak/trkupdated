<template>
  <nav>
    <v-navigation-drawer class="navigm" v-model="drawer">
      <v-list-item
        prepend-avatar="https://example.com/images/person_illustrations/12345.png"
        :title="managername"
        subtitle="(Manager)"
        style="color: black"
        nav
      >
        <template v-slot:append>
          <v-btn
            variant="text"
            icon="mdi-chevron-left"
            @click.stop="drawer = !drawer"
          ></v-btn>
        </template>
      </v-list-item>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          style="color: black"
          :to="'/MgHome/' + branchname + '/' + managername"
          prepend-icon="mdi-view-dashboard"
          title="Dashboard"
          value="account"
          class="mt-5"
        ></v-list-item>
        <!-- <v-list-item
          style="color: black"
          to="/RequestLead"
          prepend-icon="mdi-view-dashboard"
          title="Request Lead"
          value="account"
          class="mt-2"
        ></v-list-item> -->
        <!-- <v-list-item
          style="color: black"
          :to="'/Target/'+ branchname + '/' + managername"
          prepend-icon="mdi-calendar-month"
          title="targets"
          value="Monthly Sales"
          class="mt-5"
        ></v-list-item> -->
        <v-list-item
          style="color: black"
          :to="'/ML/' + branchname + '/' + managername"
          prepend-icon="mdi-account-multiple"
          title="Leads"
          value="Leads"
          class="mt-5"
        ></v-list-item>
        <v-list-item
          style="color: black"
          :to="'/mngemp/' + branchname + '/' + managername"
          prepend-icon="mdi-account-group"
          title="Employees"
          value="Employees"
          class="mt-5"
        ></v-list-item>
        <v-list-item
          style="color: black"
          :to="'/Payment/' + branchname + '/' + managername"
          prepend-icon="mdi-credit-card"
          title="Payment Clients"
          value="Payment Clients"
          class="mt-5"
        ></v-list-item>
        <v-list-item
          style="color: black"
          :to="'/splc/' + branchname + '/' + managername"
          prepend-icon="mdi-home-city"
          title="Special Clients"
          value="Special Clients"
          class="mt-5"
        ></v-list-item>
        <v-list-item
          style="color: black"
          :to="'/dnd/' + branchname + '/' + managername"
          prepend-icon="mdi-minus-circle"
          title="Add Dnd"
          value="dnd"
          class="mt-5"
        ></v-list-item>
        <!-- <v-list-item
          style="color: black"
          to="/MgSet"
          prepend-icon="mdi-wrench"
          title="Settings"
          value="Settings"
          class="mt-5"
        ></v-list-item> -->
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app color="#def1fe" dark>
      <v-btn icon @click="drawer = !drawer">
        <v-icon class="menuicon">mdi-menu</v-icon>
      </v-btn>

      <v-toolbar-title>
        <a :href="'/MgHome/' + branchname + '/' + managername">
          <img src="/trklogo.jfif" alt="Logo" class="logo-img" />
        </a>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn stacked @click="showLoginRequestsDialog=!showLoginRequestsDialog">
        <v-badge color="red" :content="loginRequestsCount">
          <v-icon color="black">mdi-bell</v-icon>
        </v-badge>
      </v-btn>
      <v-dialog v-model="showLoginRequestsDialog" max-width="600">
        <v-card>
          <v-card-title>Notifications</v-card-title>
          <v-card>
           
            <v-card-text>
              <ul>
                <li v-for="request in loginRequests" :key="request.employeeId">
                  <span class="request-text" style="color: blue; font-weight: bold; font-family: 'Arial', sans-serif;">{{ request.name }} is requesting to log in.</span>
                  <button style="color: green; background-color: lightgreen; border: none; padding: 5px 10px; margin-right: 5px; border-radius: 5px;" @click="approveLoginRequest(request.employeeId)">Approve</button>
                  <button style="color: red; background-color: lightcoral; border: none; padding: 5px 10px; border-radius: 5px;" @click="rejectLoginRequest(request.employeeId)">Reject</button>
                </li>
              </ul>
            </v-card-text>
            
          </v-card>
          <v-card-actions>
            <v-btn text @click="showLoginRequestsDialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-btn color="#ddddd" variant="tonal" @click="logout">
        <v-icon color="black" icon="mdi-login"></v-icon>

        <p style="color: black">Logout</p>
      </v-btn>

      <!-- Additional toolbar items go here -->
    </v-toolbar>
  </nav>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2'
// import io from 'socket.io-client';
export default {
  name: "ManagerSidebar",
  data() {
    return {
      drawer: true,
      branchname: "",
      managername: "",
      showLoginRequestsDialog:false,
      // 
      socketConnected: false,
      loginRequests: [],
      branchName: 'app', // Replace with the actual branch name
      managerId: '19', // Replace with the actual manager ID
      socket: null, 
    };
  },

  mounted() {
    // this.socket = io('http://localhost:3000/');

    this.socket.on('connect', () => {
      this.socketConnected = true;
      this.socket.emit('managerConnected', { managerId: this.managerId, branchName: this.branchName });
    });

    this.socket.on('loginRequest', (loginRequest) => {

      this.loginRequests.push(loginRequest);
     this.rcount = this.loginRequests.length;
      console.log('Received login request:', loginRequest);
    });

    // this.socket.on('loginApproved', () => {
    //   // Handle login approval, e.g., redirect to a dashboard
    //   console.log('Login approved');
    // });
  },
  created() {
    this.branchname = this.$route.params.branchName;
    this.managername = this.$route.params.manager;
  },
  computed: {
    loginRequestsCount() {
      return this.loginRequests.length;
    },
  },
  methods: {
    approveLoginRequest(employeeId) {
  const request = this.loginRequests.find((request) => request.employeeId === employeeId);
  const index = this.loginRequests.findIndex((request) => request.employeeId === employeeId);
  if (request) {
    console.log('Approving login request for employee ID:', employeeId);
    this.loginRequests.splice(index, 1);
    this.socket.emit('approveLogin', employeeId);

    // Emit a separate event to indicate login approval
    this.socket.emit('loginApproved');

    // Optionally, you can perform any other necessary actions here
  }
}
,

    rejectLoginRequest(employeeId) {
      const index = this.loginRequests.findIndex((request) => request.employeeId === employeeId);
      if (index !== -1) {
        console.log('Rejecting login request for employee ID:', employeeId);
        this.loginRequests.splice(index, 1);
      }
    },
    async logout() {
  try {
    // Make the logout request
    const response = await axios.post('https://api.tkrgroups.co.in/api/logout', {
      name:this.managername
    });
    
    // Check if the logout request was successful
    if (response.data.message === 'Logout') {
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
    } else {
      // Show an error message if the logout request failed
      Swal.fire({
        icon: 'error',
        title: 'Logout failed',
        text: 'An error occurred while logging out',
        showConfirmButton: false,
        timer: 1500
      });
    }
  } catch (error) {
    // Handle other errors, such as network error
    Swal.fire({
      icon: 'error',
      title: 'An error occurred',
      showConfirmButton: false,
      timer: 1500
    });
  }



}
}

};
</script>

<style>
.navigm {
  background: #def1fe;
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
  background-color: #def1fe;
}
.navi {
  color: white;
}
</style>
