<template>
  <div class=""> 
   <EmpSidebarVue/>
   <EmpTargetVue/>
  </div>
</template>

<script>
import EmpSidebarVue from '../../components/Employee/EmpSidebar.vue'
import EmpTargetVue from '../../components/Employee/EmpTarget.vue'

export default {
    components:
    {
        EmpSidebarVue,
        EmpTargetVue
    }

}
</script>

<style>

</style>