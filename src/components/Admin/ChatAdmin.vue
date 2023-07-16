<template>
  <div>
    <h1>Admin Page</h1>
    <v-card>
      <!-- Admin message input and send button -->
      <v-card-actions>
        <v-text-field v-model="adminMessage" label="Admin's message" outlined></v-text-field>
        <v-btn @click="sendMessage" color="primary">Send</v-btn>
      </v-card-actions>
    </v-card>
    <h2>Received Employee Message: {{ receivedAdminMessage}}</h2>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState(['receivedAdminMessage']),
    adminMessage: {
      get() {
        return this.$store.state.adminMessage;
      },
      set(value) {
        this.$store.commit('setAdminMessage', value);
      },
    },
  },
  methods: {
    ...mapMutations(['addMessage']),
    sendMessage() {
      this.addMessage({ sender: 'Admin', content: this.adminMessage });
      this.adminMessage = ''; // Clear the input field after sending the message
    },
  },
};
</script>

<style>
/* Add any necessary styles here */
</style>
