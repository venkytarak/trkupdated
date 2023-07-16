<template>
    <div>
      <h2>Manager</h2>
      <select v-model="selectedEmployee">
        <option v-for="employee in employees" :key="employee.id" :value="employee.id">{{ employee.name }}</option>
      </select>
      <input v-model="message" type="text" placeholder="Type a message">
      <button @click="sendMessage">Send</button>
  
      <h2>Received Messages</h2>
      <ul>
        <li v-for="(message, index) in receivedMessages" :key="index">
          {{ message }}
        </li>
      </ul>
  
      <h2>Sent Messages</h2>
      <ul>
        <li v-for="(message, index) in sentMessages" :key="index">
          {{ message }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  // import io from 'socket.io-client';
  
  export default {
    data() {
      return {
        selectedEmployee: '',
        message: '',
        employees: [
          { id: '1', name: 'Employee 1' },
          { id: '2', name: 'Employee 2' },
          // Add more employees as needed
        ],
        receivedMessages: [],
        sentMessages: [],
      };
    },
    // created() {
    //   this.socket = io('http://localhost:3000');
  
    //   this.socket.on('new-message', (message) => {
    //     this.receivedMessages.push(message);
    //   });
    // },
    methods: {
      sendMessage() {
        const message = {
          employeeId: this.selectedEmployee,
          text: this.message,
        };
  
        this.socket.emit('send-message', message);
        this.sentMessages.push(message.text);
  
        this.message = '';
      },
    },
  };
  </script>
  