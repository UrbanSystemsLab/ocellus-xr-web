<template>
    <el-carousel height="50vh" direction="horizonal" :autoplay="false" indicator-position="outside">
        <el-carousel-item v-for="item in 4" :key="item">
            <h3 class="medium">Image {{ item }}</h3>
            <img src="https://firebasestorage.googleapis.com/v0/b/usl-nyc-portal-prod.appspot.com/o/equity-ar%2Fimages%2FEcological_Resilience-02%20(1).png?alt=media&token=8cc42a3f-62aa-4ade-ac21-eb045b317b23"  width="100%" > 
        </el-carousel-item>
    </el-carousel>
</template>

<script>
export default {
    
}
</script scoped>

<style>

</style>