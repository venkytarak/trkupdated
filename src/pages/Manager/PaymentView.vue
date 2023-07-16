<template>
  <div>
    <ManagerSidebar />
    <PayMent />
  </div>
</template>

<script>
import { defineComponent } from "vue";

// Components
// import HelloWorld from '../components/HelloWorld.vue';
import ManagerSidebar from "@/components/Manager/ManagerSidebar.vue";
import PayMent from "@/components/Manager/PayMent.vue";

export default defineComponent({
  name: "PaymentView",
  components: {
    ManagerSidebar,
    PayMent,
  },
});
</script>
