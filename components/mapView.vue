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
      async function showLoc(location, mbkey) {
        let lat = location.lat;
        let lng = location.lng;
        const mbapiurl = `https://api.mapbox.com/v4/equity.0anappre/tilequery/${lng},${lat}.json?radius=400&limit=50&dedupe&access_token=${mbkey}`;
        //console.log(mbapiurl);
        const fetch_response = await fetch(mbapiurl);
        const features = await fetch_response.json();
        //console.log(features);
        $('#feature-json code').html("<pre>"+JSON.stringify(features, null, 2)+"</pre>");
        // console.log(apiJSON.features);
        let nearbyFeatures = JSON.stringify(apiJSON.features, null, 2);
      };

      const mapboxgl = require('mapbox-gl')
      const map = new mapboxgl.Map({
      accessToken: this.access_token,
      container: 'map', // <div id="map"></div>
          style: 'mapbox://styles/equity/ck74xz9rn1k1a1ikpr1u42fpe', // default style
          center: [-73.99, 40.7], // starting position as [lng, lat]
          zoom: 12
      })
      let marker;
      let mb_api_key = this.access_token;
      map.on('style.load', async function() {
        map.on('click', function(e) {
            if (marker != undefined){
            marker.remove();
            }
            var coordinates = e.lngLat;
            //console.log(coordinates);
            showLoc(coordinates, mb_api_key);
            marker = new mapboxgl.Marker({
              options: 'bottom',
              color: '#DC352C',
              width: '18px',
            })
            .setLngLat(coordinates)
            .addTo(map);
            //console.log(marker);
          })
        });
    },
}
</script>

<style scoped>
#map {
  height: 50vh;
  opacity: 1;
  /* z-index: -100; */
}
</style>
