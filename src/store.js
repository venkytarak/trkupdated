import { createStore } from 'vuex';

export default createStore({
  state: {
    messages: [],
    employeeMessage: '',
    adminMessage: '',
    receivedEmployeeMessage: '',
    receivedAdminMessage: '',
  },
  mutations: {
    addMessage(state, message) {
      state.messages.push(message);
      if (message.sender === 'Employee') {
        state.receivedAdminMessage = message.content;
      } else if (message.sender === 'Admin') {
        state.receivedEmployeeMessage = message.content;
      }
    },
    setEmployeeMessage(state, message) {
      state.employeeMessage = message;
    },
    setAdminMessage(state, message) {
      state.adminMessage = message;
    },
  },
});
