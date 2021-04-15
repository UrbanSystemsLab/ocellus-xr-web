<template>
    <div>
      <!-- <nav id="menu"></nav> -->
      <div id="map">
        <div id="dropdown">
              <el-dropdown>
                  <span class="el-dropdown-link">
                      Map Layers<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                  <!-- <div v-for="(map, mapKey) in allMaps"><a v-on:click="setLocation($event, {location, locationKey})">
                      <el-dropdown-item>{{location.name}}</el-dropdown-item></a></div> -->
                </el-dropdown-menu>
              </el-dropdown>
          </div>
      </div>
    </div>
</template>

<script>
// import mbxClient from '@mapbox/mapbox-sdk';
// import mbxTilequery from '@mapbox/mapbox-sdk/services/tilequery';
export default {
    name: 'mapView',
    data(){
      return {
        access_token: process.env.MB_ACCESS_TOKEN,
        latitude: "40.7",
        longitude: "-73.99",
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

        // Map is loaded
        this.$store.dispatch('setMapLoadedState', true)
        this.$bus.$emit('mapLoaded', true)

        this.map.on('load', this.onMapLoad);
        this.map.on('click', this.onMapClick);
      },

      updateQueryPoint(longitude, latitude) {
        if (this.map.getLayer('query-point'))
          this.map.getSource('query-point').setData(
            this.geoJsonify({
              lat: this.latitude,
              lon: this.longitude
            })
          );
      },

      onMapClick(e) {
        console.log(e.lngLat)
        // this.prevLat = this.latitude;
        // this.prevLng = this.longitude;
        this.latitude= e.lngLat.lat;
        this.longitude= e.lngLat.lng;

      },

      geoJsonify(coordinates) {
        return {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'Point',
                coordinates: [coordinates.lon, coordinates.lat]
              }
            }
          ]
        };
      },

      // makeRequest() {
      //   const baseClient = mbxClient({ accessToken: mapboxgl.accessToken });
      //   const tilesetsService = mbxTilequery(baseClient);

      //   const request = tilesetsService.listFeatures({
      //     mapIds: this.tilesets
      //       .split(',')
      //       .filter((n) => n)
      //       .map((set) => `mapbox.${set}`), // make tilesets an array, filter out empty items, and then append `mapbox.` to each id
      //     coordinates: [
      //       parseFloat(this.longitude),
      //       parseFloat(this.latitude)
      //     ],
      //     radius: parseInt(this.props.radius),
      //     limit: parseInt(this.props.limit),
      //     ...(this.props.dedupe && { dedupe: this.props.dedupe }),
      //     ...(this.props.geometry && { geometry: this.props.geometry }),
      //     ...(this.props.layers && { layers: this.props.layers.split(',') })
      //   });

      //   request
      //     .send()
      //     .then((response) => response.body)
      //     .then((geojson) => {
      //       this.props.bulkSetState({
      //         geoJsonResults: geojson,
      //         requestUrl: request.url()
      //       });
      //       if (this.map.loaded()) {
      //         this.map.getSource('result-points').setData(geojson);
      //       }
      //     });
      // },

      onMapLoad() {
        this.map.addSource('query-point', {
          type: 'geojson',
          data: this.geoJsonify({
            lat: this.latitude,
            lon: this.longitude
          })
        });
        this.map.addSource('result-points', {
          type: 'geojson',
          data: { type: 'FeatureCollection', features: [] }
        });
        this.map.addLayer({
          id: 'query-point',
          type: 'circle',
          source: 'query-point',
          paint: {
            'circle-radius': 8,
            'circle-color': 'red',
            'circle-stroke-width': 2,
            'circle-stroke-color': '#ffffff'
          }
        });
        this.map.addLayer({
          id: 'result-points',
          type: 'circle',
          source: 'result-points',
          paint: {
            'circle-radius': 5,
            'circle-color': '#4264fb',
            'circle-stroke-width': 2,
            'circle-stroke-color': '#ffffff'
          }
        });
      }

    },
    computed: {
      mapLoaded() { return this.$store.getters.getMapLoadedState },
    },
    mounted(){
      const mapboxgl = require('mapbox-gl')
      this.initMap();

      if (
        this.longitude !== this.prevLng ||
        this.latitude !== this.prevLat
      ) {
        this.updateQueryPoint(this.longitude, this.latitude);
      }
      // when the input changes, update the map
    // if (noErrors) {
      // if (
      //   this.longitude !== prevProps.longitude ||
      //   latitude !== prevProps.latitude
      // ) {
        // center the point

        this.map.setCenter({
          lng: this.longitude,
          lat: this.latitude
        });
        // this.updateQueryPoint(this.longitude, this.latitude);
        // this.makeRequest();
      // }

      if (this.longitude && this.latitude) {
        // if (
        //   // tilesets !== prevProps.tilesets ||
        //   // radius !== prevProps.radius ||
        //   // limit !== prevProps.limit ||
        //   // layers !== prevProps.layers ||
        //   // geometry !== prevProps.geometry ||
        //   // dedupe !== prevProps.dedupe
        // ) {
          // this.makeRequest();
        // }
      }
    // }

      async function showLoc(location, mbkey) {
        let lat = location.lat;
        let lng = location.lng;
        let chosen_layer = "equity.0anappre"
        const mbapiurl = `https://api.mapbox.com/v4/${chosen_layer}/tilequery/${lng},${lat}.json?radius=400&limit=50&dedupe&access_token=${mbkey}`;
        const fetch_response = await fetch(mbapiurl);
        const features = await fetch_response.json();
        $('#short-response').html("<p>There are " + "<strong>"+ features.features.length +"</strong>" + " features within a 400 ft radius of the point you clicked."+ "</p><br>")
        $('#feature-json code').html("<pre>"+JSON.stringify(features, null, 2)+"</pre>");
      };

      // // const mapboxgl = require('mapbox-gl')
      // const map = new mapboxgl.Map({
      // accessToken: this.access_token,
      // container: 'map', // <div id="map"></div>
      //     style: 'mapbox://styles/equity/ck74xz9rn1k1a1ikpr1u42fpe', // default style
      //     center: [-73.99, 40.7], // starting position as [lng, lat]
      //     zoom: 12
      // })
      let marker;
      
      let mb_api_key = this.access_token;
      // map.on('style.load', async function() {
      //   // Sets the point that is clicked and used as the query
      //   map.on('click', function(e) {
      //       if (marker != undefined){
      //         marker.remove();
      //       }
      //       var coordinates = e.lngLat;
      //       showLoc(coordinates, mb_api_key);
      //       marker = new mapboxgl.Marker({
      //         options: 'bottom',
      //         color: '#DC352C',
      //         width: '18px',
      //       })
      //       .setLngLat(coordinates)
      //       .addTo(map);
      //     })
      //   });
        // map.on('load', function () {
        //   // map.addSource('tileset-new-york-floodplains--0tb4my', {
        //   //   type: 'vector',
        //   //   url: 'mapbox://equity.dmmqh0kw'
        //   // });
        //   // map.addLayer({
        //   //   'id': '500 Year Flood',
        //   //   'type': 'fill',
        //   //   'source': 'tileset-new-york-floodplains--0tb4my',
        //   //   'source-layer': '2020s-500y',
        //   //   'layout': {
        //   //   },
        //   //   'paint': {
        //   //     'fill-color': 'rgb(102, 143, 163)',
        //   //     'fill-opacity': 0.8
        //   //   }
        //   // });
        //   // map.addLayer({
        //   //   'id': '100 Year Flood',
        //   //   'type': 'fill',
        //   //   'source': 'tileset-new-york-floodplains--0tb4my',
        //   //   'source-layer': '2020s-100y',
        //   //   'layout': {
        //   //   },
        //   //   'paint': {
        //   //     'fill-color': 'rgb(153, 180, 194)',
        //   //     'fill-opacity': 0.45
        //   //   }
        //   // });
        // });

        // window.onload = () => {
        //   // enumerate ids of the layers
        //   var toggleableLayerIds = ['100 Year Flood', '500 Year Flood'];

        //   // set up the corresponding toggle button for each layer
        //   for (var i = 0; i < toggleableLayerIds.length; i++) {
        //   var id = toggleableLayerIds[i];

        //   var link = document.createElement('a');
        //   link.href = '#';
        //   link.className = 'active';
        //   link.textContent = id;

        //   link.onclick = function (e) {
        //   var clickedLayer = this.textContent;
        //   e.preventDefault();
        //   e.stopPropagation();

        //   var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

        //   // toggle layer visibility by changing the layout object's visibility property
        //   if (visibility === 'visible') {
        //   map.setLayoutProperty(clickedLayer, 'visibility', 'none');
        //   this.className = '';
        //   } else {
        //   this.className = 'active';
        //   map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
        //   }
        //   };

        //   var layers = document.getElementById('menu');
        //   layers.appendChild(link);
        //   }
        // }
      }
    }
</script>

<style scoped>

@media (max-width: 800px){

  #map {
    height: 50vh;
    opacity: 1;
    /* z-index: -100; */
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

  #map {
    height: 100vh;
    width: 50vw;
    opacity: 1;
    /* z-index: -100; */
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
color: red;
background-color: white;
font-size: 20px;
font-weight: bold;
}

.el-icon-arrow-down {
font-size: 12px;
}
</style>