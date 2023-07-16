<template>
  <div>
    <ManagerSidebar />
    <ReqLead />
  </div>
</template>

<script>
import ManagerSidebar from "@/components/Manager/ManagerSidebar.vue";
import ReqLead from "@/components/Manager/ReqLead.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ReqleadView",
  components: {
    ManagerSidebar,
    ReqLead,
  },
});
</script>
