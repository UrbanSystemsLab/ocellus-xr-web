<template>
    <div id="map">
      <div id="dropdown">
            <el-dropdown>
                <span class="el-dropdown-link">
                    Map Layers<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                <div v-for="(map, mapKey) in allMaps" :key="mapKey">
                  <a v-on:click="logMap($event, map.sources[0].url, map.sources[0].id )">  
                    <el-dropdown-item >{{map.name}}</el-dropdown-item>
                  </a>
                </div>
              </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
export default {
    name: 'mapFullView',
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
    methods: {
      initMap(){
        this.map = new mapboxgl.Map({
          accessToken: this.access_token,
          container: 'map', // <div id="map"></div>
          style: 'mapbox://styles/equity/ck74xz9rn1k1a1ikpr1u42fpe', // default style
          center: [-73.99, 40.7], // starting position as [lng, lat]
          zoom: 12
        });
        map.dragPan.disable();
        // Map is loaded
        this.$store.dispatch('setMapLoadedState', true)
        this.$bus.$emit('mapLoaded', true)

        this.map.on('load', this.onMapLoad);
        this.map.on('click', this.onMapClick);
      },

      sendMessageToCSharp(mapURL, mapID) {

        window.vuplex.postMessage({ type: 'mapURL', message: mapURL});
        window.vuplex.postMessage({ type: 'mapID', message: mapID});

        console.log("The map URL " + `${ mapURL }` + " and map ID " + `${ mapID }` + " were passed to C#")
        
      },

      logMap(e, mapURL, mapID) {
        if (window.vuplex) {
          this.sendMessageToCSharp(mapURL, mapID)
        } else{
          console.log("C# message of map URL " + `${ mapURL }` + " and map ID " + `${ mapID }`+ " would be sent here")
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
      // this.initMap()

      async function showLoc(location, selectedLayers, mbkey) {
        let lat = location.lat;
        let lng = location.lng;
        let chosen_layer = selectedLayers || "equity.0anappre"
        let radius = "400"
        const mbapiurl = `https://api.mapbox.com/v4/${chosen_layer}/tilequery/${lng},${lat}.json?radius=${radius}&limit=50&dedupe&access_token=${mbkey}`;
        const fetch_response = await fetch(mbapiurl);
        const features = await fetch_response.json();
        map.getSource('tilequery').setData(features)
        $('#short-response').html("<p>There are " + "<strong>"+ features.features.length +"</strong>" + " features within a 400 ft radius of the point you clicked."+ "</p><br>")
        // $('#feature-json code').html("<pre>"+JSON.stringify(features, null, 2)+"</pre>");
      };

      // const mapboxgl = require('mapbox-gl')
      const map = new mapboxgl.Map({
      accessToken: this.access_token,
      container: 'map', // <div id="map"></div>
          style: 'mapbox://styles/equity/ck74xz9rn1k1a1ikpr1u42fpe', // default style
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

      let marker;
      // let map = this.map
      
      let mb_api_key = this.access_token;
      map.on('style.load', async function() {
        // Sets the point that is clicked and used as the query
        map.on('click', function(e) {
            if (marker != undefined){
              marker.remove();
            }
            var coordinates = e.lngLat;
            showLoc(coordinates, null, mb_api_key);
            marker = new mapboxgl.Marker({
              // options: 'middle',
              color: '#DC352C',
              width: '18px',
            })
            .setLngLat(coordinates)
            .addTo(map);
          })
        });
        map.on('load', function () {
          map.addSource('tilequery', {
            type: 'geojson',
            data: {
              "type": "FeatureCollection",
              "features": []
            }
          });
          map.addLayer({
            'id': 'tilequery',
            type: 'circle',
              source: 'tilequery',
              paint: {
                'circle-radius': 5,
                'circle-color': '#4264fb',
                'circle-stroke-width': 2,
                'circle-stroke-color': '#ffffff'
            }
          });
          
        });
      }
    }
</script>

<style scoped>

@media (max-width: 800px){

  div #map {
    height: 100vh;
    opacity: 0.1;
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
    opacity: 0.1;
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
    z-index: 200;
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