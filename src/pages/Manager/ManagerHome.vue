<template>
    <nav>
  <ManagerSidebar/>
  <ManagerHomeCard/>
    </nav>
</template>

<script>
import ManagerSidebar from '@/components/Manager/ManagerSidebar.vue'
import ManagerHomeCard from '@/components/Manager/ManagerHomeCard.vue';
export default {
    name:'ManagerHome',
    components:{
        ManagerSidebar,
       ManagerHomeCard
    }
}
</script>



<style>

</style>