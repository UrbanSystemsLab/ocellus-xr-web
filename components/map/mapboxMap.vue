<template>
    <div id="mapbox">
    </div>
</template>

<script>
export default {
    name: 'mapboxMap',
    data(){
      return {
        areTilesLoaded: false,
        map: null
      }
    },
    methods: {

    },
    computed: {
      visibleLayers() { return this.$store.state.mapbox['visibleLayers'] },
      visibleSources() { return this.$store.state.mapbox['visibleSources'] },
      allMaps() {return this.$store.getters.getAllMaps},
      mapLoaded() { return this.$store.getters.getMapLoadedState },
      locations() {return this.$store.getters.getLocations},
      activeMaps(){ return this.$store.getters.getActiveMaps },
      activeLocation() { return this.$store.getters.getActiveLocation },
      style() { return this.$store.getters.getStyle },
    },
    mounted(){
      const mapboxgl = require('mapbox-gl')
      var scale = new mapboxgl.ScaleControl({ maxWidth: 80, unit: 'imperial' })
      var nav = new mapboxgl.NavigationControl()

      var activeLocation = this.activeLocation;
      var map = this.map;
      mapboxgl.accessToken = process.env.MB_ACCESS_TOKEN;
      var labelLayerId // Maps will be loaded beneath this layer (Map Symbols)
      var mapPosition = activeLocation.location.mapPosition;

      this.$store.dispatch('getStyle')
        .then((url) => {
          this.map = new mapboxgl.Map({
            container: 'mapbox',
            style: url,
            center: [mapPosition.longitude, mapPosition.latitude],
            zoom: mapPosition.zoom,
            pitch: mapPosition.pitch,
            bearing: mapPosition.bearing
          })

          this.map.on('load', (e) => {
          this.$store.commit('emptyVisibleLayers')
          // Add all layers
          var map = this.map
          var layers = map.getStyle().layers
          // Insert new layers after symbols
          for (var i = 0; i < layers.length; i++) {
            if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
              labelLayerId = layers[i].id
              console.log(labelLayerId)
              break
            }
          }

          var mapboxCanvas = map.getCanvas()
          mapboxCanvas.setAttribute("id", "mapbox-canvas")

          // Add satellite layer
          map.addLayer({
            "id": "mapbox-satellite",
            "type": "raster",
            "source": "mapbox://mapbox.satellite",
            "layout": {
              "visibility": "none"
            },
            "paint": {
              "raster-opacity": 1
            }
          }, labelLayerId)

          map.addSource('mapbox-dem', {
            'type': 'raster-dem',
            'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
            'tileSize': 512,
            'maxzoom': 14
          });
          // add the DEM source as a terrain layer with exaggerated height
          map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });

          // Add Controls
          map.addControl(nav, 'bottom-right')
          map.addControl(scale)

          // Map is loaded
          this.$store.dispatch('setMapLoadedState', true)
          this.$bus.$emit('mapLoaded', true)
        })
          
        })


      
      // const map = new mapboxgl.Map({
      // accessToken: this.access_token,
      // container: 'map', // <div id="map"></div>
      //     style: 'mapbox://styles/equity/ck5mqn9p005bx1ip6t0vbvjjx', // default style
      //     center: [-73.99, 40.7], // starting position as [lng, lat]
      //     zoom: 12
      // })

      this.$store.dispatch('setMapLoadedState', true)
      // this.$bus.$emit('mapLoaded', true)

      this.$store.dispatch('getLocations')
        .then(() => {
          return this.$store.dispatch('getSources')
        })
        .then((sources) => {
          // return this.$store.dispatch('getActiveLocation')
        })
        .then((sources) => {
          return this.$store.dispatch('getAllMaps')
        })
        .then((sources) => {
          // return this.$store.dispatch('getActiveMaps')
        })
      }
    }
</script>

<style scoped>
@media (max-width: 800px){
  div #map {
    height: 100vh;
    opacity: 1;
    position: absolute;
    top: 0; 
    bottom: 0;
    width: 100vw;
  }
}

@media (min-width: 801px){
  div #map {
    height: 100vh;
    opacity: 1;
  }
}
</style>