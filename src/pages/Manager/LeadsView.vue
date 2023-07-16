<template>
  <div>
    <ManagerSidebar />
    <LeadsPage />
  </div>
</template>

<script>
import { defineComponent } from "vue";

// Components
// import HelloWorld from '../components/HelloWorld.vue';
import ManagerSidebar from "@/components/Manager/ManagerSidebar.vue";
import LeadsPage from "@/components/Manager/LeadsPage.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    ManagerSidebar,
    LeadsPage,
  },
});
</script>
