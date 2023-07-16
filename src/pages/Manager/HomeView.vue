<template>
  <div>
    <ManagerSidebar />
    <DashBoard />
  </div>
</template>

<script>
import { defineComponent } from "vue";

// Components
// import HelloWorld from '../components/HelloWorld.vue';
// import ManagerSidebar from "@/components/ManagerSidebar.vue";
import ManagerSidebar from "@/components/Manager/ManagerSidebar.vue";
import DashBoard from "@/components/Manager/DashBoard.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    ManagerSidebar,
    DashBoard,
  },
});
</script>
