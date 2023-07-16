<template>
    <nav>
        <AdminSidebar />
       <BranchesCard/>
        </nav>
  
</template>

<script>
import AdminSidebar from '@/components/Admin/AdminSidebar.vue'
import BranchesCard from '@/components/Admin/BranchesCard.vue'

export default {
name:'BranchPage',
components:{
    AdminSidebar,
    BranchesCard
}
}
</script>

<style>

</style>