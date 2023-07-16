<template>
  <div>
    <h1>Employee Page</h1>
    <v-card>
      <!-- Employee message input and send button -->
      <v-card-actions>
        <v-text-field v-model="employeeMessage" label="Employee's message" outlined></v-text-field>
        <v-btn @click="sendMessage" color="primary">Send</v-btn>
      </v-card-actions>
    </v-card>
    <h2>Received Admin Message: {{ receivedEmployeeMessage }}</h2>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState(['receivedEmployeeMessage']),
    employeeMessage: {
      get() {
        return this.$store.state.employeeMessage;
      },
      set(value) {
        this.$store.commit('setEmployeeMessage', value);
      },
    },
  },
  methods: {
    ...mapMutations(['addMessage']),
    sendMessage() {
      this.addMessage({ sender: 'Employee', content: this.employeeMessage });
      this.employeeMessage = ''; // Clear the input field after sending the message
    },
  },
};
</script>

<style>
/* Add any necessary styles here */
</style>
