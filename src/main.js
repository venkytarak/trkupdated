import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
// import Vuetify from 'vuetify'
// import Vuetify from 'vuetify/lib/framework'
import vuetify from './plugins/vuetify'
// import VueSocketIO from 'vue-socket.io';


import 'vuetify/lib/styles/main.css' 
import { loadFonts } from './plugins/webfontloader'


loadFonts()

createApp(App)
  .use(router)
  .use(vuetify)
  .use(store)
  
  .mount('#app')
