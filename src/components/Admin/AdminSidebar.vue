<template>
  <nav>
    <v-navigation-drawer class="navig" v-model="drawer">
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
        title=""
        subtitle="Admin"
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
          style="font-size: 1.2rem"
          to="/AdHome"
          prepend-icon="mdi-view-dashboard"
          title="Dashboard"
          value="account"
          class="mt-5 navitems"
        ></v-list-item>
        <v-list-item
          style="font-size: 1.2rem"
          to="/Adleads"
          prepend-icon="mdi-account-multiple"
          title="Leads"
          value="Leads"
          class="mt-5 navitems"
        ></v-list-item>

        <v-list-item
          style="font-size: 1.2rem"
          to="/AdTarget"
          prepend-icon="mdi-calendar-month"
          title="Target"
          value="Monthly Sales"
          class="mt-5 navitems"
        ></v-list-item>
        <v-list-item
          style="font-size: 1.2rem"
          to="/sp"
          prepend-icon="mdi-credit-card"
          title="Employees"
          value="Payment Clients"
          class="mt-5 navitems"
        ></v-list-item>
        <v-list-item
          style="font-size: 1.2rem"
          to="/Branch"
          prepend-icon="mdi-view-dashboard"
          title="Branches"
          value="account"
          class="mt-5 navitems"
        ></v-list-item>
        <v-badge color="red" :content="count" overlap>
          <v-list-item
            style="font-size: 1.2rem"
            to="/AdLeadRequest"
            prepend-icon="mdi-account-plus"
            title="Lead Requests"
            value="Lead Requests"
            class="mt-5 navitems"
          ></v-list-item>
        </v-badge>

        <v-list-item
          style="font-size: 1.2rem"
          to="/Adpay"
          prepend-icon="mdi-credit-card"
          title="Payment Clients"
          value="Payment Clients"
          class="mt-5 navitems"
        ></v-list-item>
        <v-list-item
          style="font-size: 1.2rem"
          to="Adsplc"
          prepend-icon="mdi-home-city"
          title="Special Clients"
          value="Special Clients"
          class="mt-5 navitems"
        ></v-list-item>
        <v-list-item
          style="font-size: 1.2rem"
         to="/addnd"
          prepend-icon="mdi-minus-circle"
          title="Add DND"
          value="DND"
          class="mt-5 navitems"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar class="navig">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <a href="/AdHome">
          <img src="/trklogo.jfif" alt="Logo" class="logo-img" />
        </a>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn stacked @click="openNotifications">
        <v-badge color="red" :content="count">
          <v-icon>mdi-bell</v-icon>
        </v-badge>
      </v-btn>

      <v-btn variant="tonal" @click="logout">
        <v-icon icon="mdi-login"></v-icon>
        <p style="color: white" >Logout</p>
      </v-btn>
    </v-toolbar>
    <v-main>
      <!-- <template v-slot:activator="{ on, attrs }">
        <v-btn stacked v-bind="attrs" v-on="on" @click="openNotifications">
          <v-badge color="red" content="5">
            <v-icon>mdi-bell</v-icon>
          </v-badge>
        </v-btn>
      </template> -->

      <v-card
        v-if="showNotifications"
        style="position: absolute; z-index: 999; width: 30rem"
      >
        <v-card-title class="headline grey lighten-2">
          Notifications
        </v-card-title>

        <v-list>
          <v-list-item v-for="request in leadrequests" :key="request">
            <v-list-item-title
              >{{ request[4] }} is requesting
              {{ request[1] }} Leads</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-card>

    
    </v-main>
  </nav>
</template>

<script>
import Swal from 'sweetalert2'
import axios from "axios";
export default {
  name: "AdminSidebar",
  data() {
    return {
      showNotifications: false,
      dnd:false,
      leadrequests: [],
      count: "0",
      drawer: true,
      items: [
        { title: "Home", icon: "mdi-home-city" },
        { title: "My Account", icon: "mdi-account" },
        { title: "Users", icon: "mdi-account-group-outline" },
      ],
    };
  },
  methods: {
    
      async logout() {
  try {
    // Make the logout request
    const response = await axios.post('https://api.tkrgroups.co.in/api/logout', {
      name: "admin"
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
,
    fetchleads() {
      axios
        .get("https://api.tkrgroups.co.in//getrequests")
        .then((response) => {
          this.leadrequests = response.data.leads;
          this.count = this.leadrequests.length;

          console.log(this.leadrequests);

          // console.log(this.leadrequests);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    openNotifications() {
      this.showNotifications = !this.showNotifications;
    },
   
    // logout()
    // {
    //   axios.
    // }
  },
  created() {
    this.fetchleads();
    console.log(this.notifications);
  },
};
</script>

<style>
.navig {
  /* background: #976d89; */
  /* background: rgb(27, 165, 70); */
  color: white;
  background-color: #2e1764;
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
/* .navitems:active {
  background: lightgreen;
} */
/* .list-item-custom {
  color: black;
  font-size: 1.2rem;
} */

.list-item-custom .v-icon {
  color: #3f51b5;
}
.not {
  z-index: 3;
}
.noti {
  height: 5rem;
  width: 20rem;
}
</style>
