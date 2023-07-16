<template>
    <div class="">
        <AdminSidebar/>
        <EmpPage/>
        
    </div>
  
</template>

<script>
import AdminSidebar from '../../components/Admin/AdminSidebar.vue'

import EmpPage from '../../components/Admin/EmpPage.vue'
// D:\A-PROJECTS\ARK leads\frontend\src\components\Admin\EmPage.vue

export default {
    name:'EmpView',
    components:
    {  AdminSidebar,
       EmpPage
    }
}
</script>

<style>

</style>