<template >
    <el-carousel height="400px" direction="horizonal" :autoplay="false" :name="map-carousel" indicator-position="outside">
        <el-carousel-item v-for="item in 4" :key="item">
            <h3 class="medium">Map {{ item }}</h3>
            <div id="map">
            <img src= 'https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/static/-87.0186,32.4055,12/230x350?access_token=pk.eyJ1IjoiZXF1aXR5IiwiYSI6ImNrNW1wY201dTEyMW4zbW8wbnNpa2FxbnQifQ.EUFDRVuMvjbsBf4zqzJ3Zw' alt="Map of the Edmund Pettus Bridge in Selma, Alabama">
            </div>
        </el-carousel-item>
    </el-carousel>
</template>

<script>
export default {
    name: 'mapCarousel',
    data(){
        return {
        access_token: process.env.MB_ACCESS_TOKEN,
        username: process.env.MB_USERNAME,
        style_id: 'outdoors-v11'
      }
    },
    mounted(){
        async function getStaticMap() {
            let lat = "40.7"
            let lng = "-73.99"
            let zoom = "12"
            let width = "250"
            let height = "400"
            let mbURL = `https://api.mapbox.com/styles/v1/${this.username}/${this.style_id}/static/${lon},${lat},${zoom}/${width}x${height}?access_token=${mbkey}`
        }
    }
}
</script>

<style scoped>
    .el-carousel__container {
        outline-color: green;
    }
</style>