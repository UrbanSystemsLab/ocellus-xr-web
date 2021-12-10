<template>
    <div id="mapbox">
    </div>
</template>

<script>
import queryParamsMixin from '~/components/utils/mixins/queryParamsMixin'

export default {
    name: 'mapboxMap',
    props: ['activeLocation'],
    mixins: [queryParamsMixin],
    data(){
      return {
        areTilesLoaded: false,
        map: null
      }
    },
    methods: {
      removeLayerById(id){
      let visibleLayers = this.visibleLayers;
      let map = this.map;
      if(visibleLayers.length > 0) {
        try {
          map.removeLayer(id)
        } catch (err) {
        }
      }
    },
    removeActiveLayers() {
      var map = this.map
      var visibleLayers = this.visibleLayers
      // Remove all visible layers
      if (visibleLayers) {
        visibleLayers.forEach(function(layer) {
          try { map.removeLayer(layer) } catch (err) {}
        })
      }
      // TODO: Use dispatch instead of commit
      // Empty Visible Layer Array
      this.$store.commit('emptyVisibleLayers')
    },
    removeActiveSources() {
      var map = this.map
      var visibleSources = this.visibleSources
      // Remove all visible layers
      if (visibleSources) {
        visibleSources.forEach(function(source) {
          try { map.removeSource(source.id) } catch (err) {}
        })
      }
      this.$store.commit('emptyVisibleSources')
      }
    },
    computed: {
      visibleLayers() { return this.$store.state.mapbox['visibleLayers'] },
      visibleSources() { return this.$store.state.mapbox['visibleSources'] },
      activeMaps(){ return this.$store.getters.getActiveMaps },
      mapLoaded() { return this.$store.getters.getMapLoadedState },
      style() { return this.$store.getters.getStyle },
      queryParameters() { return this.$store.getters.context.query },
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
        // var layers = map.getStyle().layers
        // Insert new layers after symbols
        // for (var i = 0; i < layers.length; i++) {
        //   if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
        //     labelLayerId = layers[i].id
        //     console.log(labelLayerId)
        //     break
        //   }
        // }

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
    this.$store.dispatch('loadActiveCategories')
    this.$store.dispatch('loadActiveMaps')
    this.$bus.$on('setMapVisibility', ({visibility, loadMap}) => {
      for(let layer in loadMap.layers){
        let mapVisibility = (visibility ? 'visible' : 'none')
        if(visibility){
          this.map.moveLayer(loadMap.layers[layer]['id'])
        }
        this.map.setLayoutProperty(loadMap.layers[layer]['id'], 'visibility', mapVisibility)
      }
    })
    this.$bus.$on('updateMap', ({ loadMap, loadContent }) => {
      var map = this.map
      this.areTilesLoaded = false
      if(!this.multiselectState) {
        this.removeActiveLayers()
        this.removeActiveSources()
      }

      // Add New Layers
      if (loadMap && loadMap.layers && !loadMap.composites) {
        if(loadMap.sources) {
          console.log('Add sources', loadMap.sources)
          for (let sourceKey in loadMap.sources) {
            if (loadMap.sources.hasOwnProperty(sourceKey)) {
              let source = loadMap.sources[sourceKey]
              if(!map.getSource(source.id)){
                map.addSource(source.id, {type: source.type, url: source.url})
                this.$store.commit('addVisibleSource', source)
              };
            }
          }
        }
        let newLayers = loadMap.layers
        for (let layer in newLayers) {
          if (newLayers.hasOwnProperty(layer)) {
            let id = newLayers[layer].id
            console.log("layer", layer, newLayers[layer]);
            if(!map.getLayer(newLayers[layer])){
              map.addLayer(newLayers[layer], labelLayerId)
              map.setLayoutProperty(id, 'visibility', 'visible')
              // Add to Visible Layer Array
              this.$store.commit('addVisibleLayer', id)
            }
          }
        }
      }
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