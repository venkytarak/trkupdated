<!-- <template>
  <v-app>
    <v-main>
      <v-container>
        <v-card>
          <v-card-title>Registration Form</v-card-title>
          <v-card-text>
            <li v-for="request in loginRequests" :key="request.employeeId">
              <span class="request-text">{{ request.name }} is requesting to log in.</span>
              <button class="approve-btn" @click="approveLoginRequest(request.employeeId)">Approve</button>
              <button class="reject-btn" @click="rejectLoginRequest(request.employeeId)">Reject</button>
            </li>
          </v-card-text>
        </v-card>
        <div v-if="socketConnected" class="message">Socket connection established</div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
// import io from 'socket.io-client';

export default {
  data() {
    return {
      socketConnected: false,
      loginRequests: [],
      branchName: 'app', // Replace with the actual branch name
      managerId: '19', // Replace with the actual manager ID
      socket: null, // Added a socket object to store the socket connection
    };
  },
  mounted() {
    // this.socket = io('https://api.tkrgroups.co.in');

    this.socket.on('connect', () => {
      this.socketConnected = true;
      this.socket.emit('managerConnected', { managerId: this.managerId, branchName: this.branchName });
    });

    this.socket.on('loginRequest', (loginRequest) => {
      this.loginRequests.push(loginRequest);
      console.log('Received login request:', loginRequest);
    });

    this.socket.on('loginApproved', () => {
      // Handle login approval, e.g., redirect to a dashboard
      console.log('Login approved');
    });
  },
  methods: {
    approveLoginRequest(employeeId) {
      const request = this.loginRequests.find((request) => request.employeeId === employeeId);
      if (request) {
        console.log('Approving login request for employee ID:', employeeId);
        this.socket.emit('approveLogin', employeeId);
      }
    },

    rejectLoginRequest(employeeId) {
      const index = this.loginRequests.findIndex((request) => request.employeeId === employeeId);
      if (index !== -1) {
        console.log('Rejecting login request for employee ID:', employeeId);
        this.loginRequests.splice(index, 1);
      }
    },
  },
};
</script>

<style>
.message {
  margin-top: 16px;
  padding: 8px;
  background-color: #e0e0e0;
  text-align: center;
}

.approve-btn {
  margin-left: 8px;
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  cursor: pointer;
  border-radius: 4px;
}

.reject-btn {
  margin-left: 8px;
  background-color: #f44336;
  color: white;
  border: none;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  cursor: pointer;
  border-radius: 4px;
}

.request-text {
  font-size: 16px;
  color: #333;
  margin-right: 8px;
}
</style> -->
<template>
  <div>
    <p>Device ID: {{ formattedDeviceId }}</p>
  </div>
</template>

<script>
import Fingerprint2 from 'fingerprintjs2';
import axios from 'axios';

export default {
  data() {
    return {
      deviceId: null,
      formattedDeviceId: null,
    };
  },
  mounted() {
    Fingerprint2.get({}, (components) => {
      const values = components.map((component) => component.value);
      const deviceHash = Fingerprint2.x64hash128(values.join(''), 31);
      this.deviceId = deviceHash;

      this.formatDeviceId();
      this.sendDeviceIdToApi(this.formattedDeviceId);
    });
  },
  methods: {
    formatDeviceId() {
      const pushToken = 'APA91bEpOSleys_4ywA7GCwX-lRl2wtqDtMbFNNdlc4mDi9CmG38WUQYNJN1IE2X4gflpLyiaOfRibHWPVmdfhcZA6liVSyqWolIXsAk1C6svSSr0-vghqaMavtV1QLsqHRb0_Iln14L';
      this.formattedDeviceId = `d_${this.deviceId}:${pushToken}`;
    },
    sendDeviceIdToApi(formattedDeviceId) {

      const apiUrl = 'API_ENDPOINT';

    
      const headers = {
        'Content-Type': 'application/json',
      };

     
      const payload = {
        deviceId: formattedDeviceId,
      };


      axios.post(apiUrl, payload, { headers })
        .then(response => {
          console.log('API Response:', response.data);
        })
        .catch(error => {
          console.error('API Error:', error);
        });
    },
  },
};
</script>
