<template>
  <div class=""><EmpSidebarVue/>
    <EmpHcardsVue/></div>
</template>

<script>
import EmpSidebarVue from '../../components/Employee/EmpSidebar.vue'
import EmpHcardsVue from '@/components/Employee/EmpHcards.vue';

export default {
components:
{
    EmpSidebarVue,
    EmpHcardsVue
}
}
</script>

<style>

</style>