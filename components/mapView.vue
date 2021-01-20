<template>
    <div>
        <h1>Component test</h1>
        <div id='map'></div>
    </div>
</template>

<script>
export default {
    name: 'mapView',

    data(){
      return {
        access_token:
      }
        addMarker();
    },

    mounted(){
      let marker;
      const mapboxgl = require('mapbox-gl')
      const map = new mapboxgl.Map({
      accessToken: this.access_token,
      container: 'map', // <div id="map"></div>
          style: 'mapbox://styles/mapbox/streets-v9', // default style
          center: [-21.9270884, 64.1436456], // starting position as [lng, lat]
          zoom: 13
      })
    },

    methods: {
        addMarker(){
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
                // new mapboxgl.Popup()
                //   .setLngLat(coordinates)
                //   .setHTML('You clicked: <br/>' + coordinates)
                //   .addTo(map);
                // $('#clicklocation').text(`${coordinates.lat}, ${coordinates.lng}`);
            });  
        })
        }

    }

   
}
</script>

<style scoped>

#map {
  width:100%;
  height:100vh;
}

</style>