<template>
  <div>
    <ManagerSidebar />
    <TargetPage />
  </div>
</template>

<script>
import { defineComponent } from "vue";

// Components
// import HelloWorld from '../components/HelloWorld.vue';
import ManagerSidebar from "@/components/Manager/ManagerSidebar.vue";
import TargetPage from "@/components/Manager/TargetPage.vue";

export default defineComponent({
  name: "TargetView",
  components: {
    ManagerSidebar,
    TargetPage,
  },
});
</script>
