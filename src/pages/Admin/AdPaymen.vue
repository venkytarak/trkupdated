<template>
  <div class="">
    <AdminSidebarVue/>
    <AdminPaymentclientsVue/>

  </div>
</template>

<script>
import AdminPaymentclientsVue from '../../components/Admin/AdminPaymentclients.vue'
import AdminSidebarVue from '../../components/Admin/AdminSidebar.vue'

export default {
    components:
    {
        AdminSidebarVue,
        AdminPaymentclientsVue
    }

}
</script>

<style>

</style>