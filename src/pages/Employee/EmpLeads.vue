<template>
  <div class="">
    <EmpSidebarVue/>
   <EmpAssignedlVue/>
  

  </div>
</template>

<script>
import EmpAssignedlVue from '../../components/Employee/EmpAssignedl.vue'
import EmpSidebarVue from '../../components/Employee/EmpSidebar.vue'

export default {
    components:
    {
        EmpAssignedlVue,
        EmpSidebarVue
    }

}
</script>

<style>

</style>