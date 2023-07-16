<!-- <template>
  <EmpSidebarVue/>
  <div class="chat-container">
    <div class="people-container">
      <div class="person" @click="activePerson = 'admin'">Admin</div>
      <div class="person" @click="activePerson = 'manager'">Manager</div>
    </div>
    <div class="chatbox-container">
      <div class="chatbox">
        <div v-for="message in filteredMessages" :class="message.sender" :key="message">
          <div class="message-text">{{ message.text }}</div>
        </div>
      </div>
      <form @submit.prevent="sendMessage">
        <input type="text" v-model="newMessage" placeholder="Type your message...">
        <button type="submit">Send</button>
      </form>
    </div>
  </div>
</template>

<script>
import EmpSidebarVue from './EmpSidebar.vue';
export default {
  components: {
   EmpSidebarVue
  },
  data() {
    
   
    return {
      activePerson: 'admin',
      messages: [
        { sender: 'admin', text: 'Hello, how can I help you?' },
        { sender: 'employee', text: 'Hi, I need some help with this issue.' },
        { sender: 'manager', text: 'What seems to be the problem?' },
        { sender: 'employee', text: 'I am having trouble accessing my account.' },
        { sender: 'admin', text: 'Let me check that for you.' },
        { sender: 'employee', text: 'Thanks!' },
        { sender: 'manager', text: 'Is there anything else you need help with?' },
        { sender: 'employee', text: 'No, thats all. Thank you.' },
        { sender: 'admin', text: 'Youre welcome.' }
      ],
      newMessage: ''
    }
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim() !== '') {
        this.messages.push({ sender: 'employee', text: this.newMessage })
        this.newMessage = ''
      }
    }
  },
  computed: {
    filteredMessages() {
      return this.messages.filter(message => message.sender === this.activePerson || message.sender === 'employee')
    }
  }
}
</script>



<style>
.chat-container {
  display: flex;
  flex-direction: row;
  height: 100vh;
}
.people-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f7f7f7;
  width: 20%;
  height: 100%;
  border-right: 1px solid #ccc;
}
.person {
  font-size: 24px;
  font-weight: bold;
  padding: 10px;
  cursor: pointer;
  transition: all 0.3s;
}
.person:hover {
  background-color: #eee;
}
.chatbox-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
}
.chatbox {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 20px;
}
.message-text {
  background-color: #eee;
  padding: 10px;
  border-radius: 5px;
  max-width: 80%;
  word-wrap: break-word;
  margin-bottom: 10px;
}
.employee .message-text {
  background-color: #def1fe;
  align-self: flex-end;
}
form {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}
input[type="text"] {
  flex-grow: 1;
  font-size: 16px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
}
button[type="submit"] {
  font-size: 16px;
  font-weight: bold;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #3498db;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s;
}

button[type="submit"]:hover {
  background-color: #2980b9;
}

.chatbox-container {
  background-color: #fff;
  border: 1px solid #ccc;
}

.chatbox-container form {
  border-top: 1px solid #ccc;
}

.chatbox-container form input[type="text"]:focus {
  outline: none;
  border: 2px solid #3498db;
}

.chatbox-container form button[type="submit"] {
  width: 80px;
}
</style> -->
<template>
  <h1></h1>
</template>

<script>
export default {

}
</script>

<style>

</style>