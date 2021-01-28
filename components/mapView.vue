<template>
    <div>
      <div id="map"></div>
    </div>
</template>

<script>
export default {
    name: 'mapView',
    data(){
      return {
        access_token: process.env.MB_ACCESS_TOKEN,
      }
    },
    methods: {
    },

    mounted(){
      const mapboxgl = require('mapbox-gl')
      const map = new mapboxgl.Map({
      accessToken: this.access_token,
      container: 'map', // <div id="map"></div>
          style: 'mapbox://styles/equity/ck74xz9rn1k1a1ikpr1u42fpe', // default style
          center: [-73.99, 40.7], // starting position as [lng, lat]
          zoom: 12
      })
      let marker;
      map.on('style.load', async function() {
        map.on('click', function(e) {
            if (marker != undefined){
            marker.remove();
            }
            var coordinates = e.lngLat;
            console.log(coordinates);
            // showLoc(coordinates);
            marker = new mapboxgl.Marker({
              options: 'bottom',
              color: '#DC352C',
              width: '18px',
            })
            .setLngLat(coordinates)
            .addTo(map);
            console.log(marker);
          })
        });
    },
}
</script>

<style scoped>
#map {
  height: 100vh;
  opacity: 1;
  z-indez: -100;
}
</style>
