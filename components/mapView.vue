<template>
    <div>
      <nav id="menu"></nav>
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
        let chosen_layer = "equity.0anappre"
        const mbapiurl = `https://api.mapbox.com/v4/${chosen_layer}/tilequery/${lng},${lat}.json?radius=400&limit=50&dedupe&access_token=${mbkey}`;
        const fetch_response = await fetch(mbapiurl);
        const features = await fetch_response.json();
        console.log(features.features.length)
        $('#short-response').html("<p>There are " + "<strong>"+ features.features.length +"</strong>" + " features within a 400 ft radius of the point you clicked."+ "</p><br>")
        $('#feature-json code').html("<pre>"+JSON.stringify(features, null, 2)+"</pre>");
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
        map.on('load', function () {
          map.addSource('tileset-new-york-floodplains--0tb4my', {
            type: 'vector',
            url: 'mapbox://equity.dmmqh0kw'
          });
          map.addLayer({
            'id': '500 Year Flood',
            'type': 'fill',
            'source': 'tileset-new-york-floodplains--0tb4my',
            'source-layer': '2020s-500y',
            'layout': {
            },
            'paint': {
              'fill-color': 'rgb(102, 143, 163)',
              'fill-opacity': 0.8
            }
          });
          map.addLayer({
            'id': '100 Year Flood',
            'type': 'fill',
            'source': 'tileset-new-york-floodplains--0tb4my',
            'source-layer': '2020s-100y',
            'layout': {
            },
            'paint': {
              'fill-color': 'rgb(153, 180, 194)',
              'fill-opacity': 0.45
            }
          });
        });

        window.onload = () => {
          // enumerate ids of the layers
          var toggleableLayerIds = ['100 Year Flood', '500 Year Flood'];

          // set up the corresponding toggle button for each layer
          for (var i = 0; i < toggleableLayerIds.length; i++) {
          var id = toggleableLayerIds[i];

          var link = document.createElement('a');
          link.href = '#';
          link.className = 'active';
          link.textContent = id;

          link.onclick = function (e) {
          var clickedLayer = this.textContent;
          e.preventDefault();
          e.stopPropagation();

          var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

          // toggle layer visibility by changing the layout object's visibility property
          if (visibility === 'visible') {
          map.setLayoutProperty(clickedLayer, 'visibility', 'none');
          this.className = '';
          } else {
          this.className = 'active';
          map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
          }
          };

          var layers = document.getElementById('menu');
          layers.appendChild(link);
          }
        }
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
    width: 20vw;
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