<template>
    <nav>
    <AdminSidebar />
    <HomeCard/>
    </nav>
  
</template>

<script>
import AdminSidebar from '@/components/Admin/AdminSidebar.vue'
import HomeCard from '@/components/Admin/HomeCard.vue';
export default {
    name:"AdHome",
    components:
    {
        AdminSidebar,
        HomeCard
    }

}
</script>

<style>

</style>