<template>
  <div>
    <ManagerSidebar />
    <EmpDet />
  </div>
</template>

<script>
import ManagerSidebar from "@/components/Manager/ManagerSidebar.vue";
import EmpDet from "@/components/Manager/EmpDet.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "EmpViewView",
  components: {
    ManagerSidebar,
    EmpDet,
  },
});
</script>
