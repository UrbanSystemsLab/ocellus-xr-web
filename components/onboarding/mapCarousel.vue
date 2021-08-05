<template >
    <el-carousel height="400px" direction="horizonal" :autoplay="false" name="map-carousel" indicator-position="outside">
        <el-carousel-item v-for="item in 4" :key="item">
            <h3 class="medium">Map {{ item }}</h3>
            <div id="map">
            </div>
        </el-carousel-item>
    </el-carousel>
</template>

<script>
export default {
    data(){
        return {
        access_token: process.env.MB_ACCESS_TOKEN,
        latitude: "40.7",
        longitude: "-73.99",
        queryLngLat: {lng: null, lat: null},
        prevLat: null,
        prevLng: null
      }
    },
    mounted(){
        const mapboxgl = require('mapbox-gl')
      // this.initMap()
        const map = new mapboxgl.Map({
        accessToken: this.access_token,
        container: 'map', // <div id="map"></div>
            style: 'mapbox://styles/equity/ck5mqn9p005bx1ip6t0vbvjjx', // default style
            center: [-73.99, 40.7], // starting position as [lng, lat]
            zoom: 12
        })
    }
}
</script>

<style scoped>
    .el-carousel__container {
        outline-color: green;
    }
    div #map {
        height: 100px;
        width: 100px;
    }
</style>