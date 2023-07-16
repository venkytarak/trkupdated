<template>
  <div class="">
    <EmpSidebarVue/>
    <EmpReqLeadVue/>
  </div>
</template>

<script>
import EmpReqLeadVue from '../../components/Employee/EmpReqLead.vue'
import EmpSidebarVue from '../../components/Employee/EmpSidebar.vue'

export default {
    components:
    {
        EmpReqLeadVue,
        EmpSidebarVue
    }


}
</script>

<style>

</style>