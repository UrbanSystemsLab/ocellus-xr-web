<template>
    <div id="map">
    </div>
</template>

<script>
export default {
    name: 'mapFullView',
    data(){
      return {
        access_token: process.env.MB_ACCESS_TOKEN,
        // latitude: "40.7",
        // longitude: "-73.99",
        // queryLngLat: {lng: null, lat: null},
        // prevLat: null,
        // prevLng: null
      }
    },
    methods: {

      sendMessageToCSharp(clickLng, clickLat) {

        window.vuplex.postMessage({ type: "lng", message: clickLng});
        window.vuplex.postMessage({ type: 'lat', message: clickLat});

        console.log("The map URL " + `${ clickLng }` + " and map ID " + `${ clickLat }` + " were passed to C#")
        
      },

      logMap(clickLng, clickLat) {
        if (window.vuplex) {
          this.sendMessageToCSharp(clickLng, clickLat)
        } else{
          console.log("C# message of lng: " + `${ clickLng }` + " and lat: " + `${ clickLat }`+ " would be sent here")
        }
      }

    },
    computed: {
      allMaps() {return this.$store.getters.getAllMaps},
      mapLoaded() { return this.$store.getters.getMapLoadedState },
      locations() {return this.$store.getters.getLocations},
      activeMaps(){ return this.$store.getters.getActiveMaps },
      activeLocation() { return this.$store.getters.getActiveLocation },
    },
    mounted(){

      const mapboxgl = require('mapbox-gl')

      const map = new mapboxgl.Map({
      accessToken: this.access_token,
      container: 'map', // <div id="map"></div>
          style: 'mapbox://styles/equity/ck5mqn9p005bx1ip6t0vbvjjx', // default style
          center: [-73.99, 40.7], // starting position as [lng, lat]
          zoom: 12
      })

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
        
      // load ALL active maps into mapbox and set as invisible
      for(let mapKey in this.activeMaps){
          let activeMap = this.activeMaps[mapKey]
          if(activeMap.layers){
            for (let sourceKey in activeMap.sources) {
              if (activeMap.sources.hasOwnProperty(sourceKey)) {
                let source = activeMap.sources[sourceKey]
                if(!map.getSource(source.id)){
                  map.addSource(source.id, {type: source.type, url: source.url})
                  this.$store.commit('addVisibleSource', source)
                };
              }
            }
          let newLayers = activeMap.layers
            for (let layer in newLayers) {
              if (newLayers.hasOwnProperty(layer)) {
                let id = newLayers[layer].id
                console.log("layer", layer, newLayers[layer]);
                if(!map.getLayer(newLayers[layer].id)){
                  map.addLayer(newLayers[layer], labelLayerId)
                  map.setLayoutProperty(id, 'visibility', 'none')
                  // Add to Visible Layer Array
                  this.$store.commit('addVisibleLayer', id)
                }
              }
            }

          }
      };


      map.on('load', () => {
        map.addSource('urban-areas', {
        'type': 'geojson',
        'data': 'https://docs.mapbox.com/mapbox-gl-js/assets/ne_50m_urban_areas.geojson'
        });
        map.addLayer(
          {
          'id': 'urban-areas-fill',
          'type': 'fill',
          'source': 'urban-areas',
          'layout': {},
          'paint': {
          'fill-color': '#f08103',
          'fill-opacity': 0.4
          }
        },
        );
      })

      // CODE ADDS MARKER ON CLICK
      let marker;

      marker = new mapboxgl.Marker();
      map.on('click', add_marker.bind(this));

      function add_marker(event) {
        var coordinates = event.lngLat;
        this.logMap(coordinates.lng, coordinates.lat);
        marker.setLngLat(coordinates).addTo(map);
      }
    
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

  #menu {
    background: #fff;
    position: absolute;
    z-index: 1;
    top: 450px;
    right: 10px;
    border-radius: 3px;
    width: 120px;
    border: 1px solid rgba(0, 0, 0, 0.4);
    font-family: 'Open Sans', sans-serif;
  }

  #menu a {
    font-size: 13px !important;
    color: #404040 !important;
    display: block !important;
    margin: 0 !important;
    padding: 0 !important;
    padding: 10px !important;
    text-decoration: none !important;
    border-bottom: 1px solid rgba(0, 0, 0, 0.25) !important;
    text-align: center !important;
  }

  #menu a:last-child {
  border: none !important;
  }

  #menu a.active {
  background-color: #3887be !important;
  color: #ffffff !important;
  }
}

@media (min-width: 801px){

  div #map {
    height: 100vh;
    opacity: 1;
  }

  #menu {
    background: #fff;
    position: absolute;
    z-index: 1;
    top: 20px;
    right: 10px;
    border-radius: 3px;
    width: 120px;
    border: 1px solid rgba(0, 0, 0, 0.4);
    font-family: 'Open Sans', sans-serif;
  }

  #menu a {
    font-size: 13px !important;
    color: #404040 !important;
    display: block !important;
    margin: 0 !important;
    padding: 0 !important;
    padding: 10px !important;
    text-decoration: none !important;
    border-bottom: 1px solid rgba(0, 0, 0, 0.25) !important;
    text-align: center !important;
  }

  #menu a:last-child {
  border: none !important;
  }

  #menu a.active {
  background-color: #3887be !important;
  color: #ffffff !important;
  }
}

.el-dropdown-menu {
  height: 30vh;
  overflow: scroll;
}

#dropdown{
    position: relative;
    height: 10vh;
    width: 55vw;
    padding: 2rem;
    z-index: 2;
}

.el-dropdown-link {
padding: 2px;
cursor: pointer;
color: black;
background-color: white;
font-size: 20px;
font-weight: bold;
}

.el-icon-arrow-down {
font-size: 12px;
}
</style>