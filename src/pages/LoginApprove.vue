<template>
    <div>
      <button @click="startTimer" v-if="!isTimerRunning">Start Timer</button>
      <p v-else>Time Remaining: {{ timeRemaining }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isTimerRunning: false,
        timeRemaining: 300, // 5 minutes in seconds
        intervalId: null
      };
    },
    methods: {
      startTimer() {
        this.isTimerRunning = true;
        this.intervalId = setInterval(this.updateTimer, 1000);
        this.sendRequest();
      },
      updateTimer() {
        if (this.timeRemaining > 0) {
          this.timeRemaining--;
        } else {
          this.stopTimer();
          // Handle timeout
        }
      },
      stopTimer() {
        this.isTimerRunning = false;
        clearInterval(this.intervalId);
      },
      sendRequest() {
        // Make a request to the backend API
        // Replace `YOUR_BACKEND_API_URL` with your actual API endpoint
        fetch('')
          .then(response => response.json())
          .then(data => {
            if (data.response === true) {
              this.stopTimer();
              // Redirect to another page
              this.$router.push('/emphome');
            }
          })
          .catch(error => {
            console.error('Error:', error);
            // Handle error
          });
      }
    }
  };
  </script>
  