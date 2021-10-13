<template>
    <div id="dropdown">
        <el-select v-model="activeLayer" value-key="activeLayer" placeholder="Map Layers" ref="elSelect" @change="testMap(activeLayer)" >
            <!-- @change="logMap($event, map.sources[0].url, map.sources[0].id )" -->
            <el-option v-for="(map, mapKey) in allMaps" :key="mapKey" :value="map.name" :label="map.name">
            </el-option>
        </el-select>
    </div>
</template>

<script>
export default {
    name: 'layerDropdown',
    data() {
        return {
            activelayer: [],
        }
    },
    computed: {
        allMaps() {return this.$store.getters.getAllMaps},
    },
    methods: {
        testMap: function (e) {
            console.log(e)
        },
        showMap: function(e, {map, mapKey}) {
        // e.preventDefault()
        let updateMap = map;
       
        // Autoload contents
        this.$store.dispatch('emptyActiveContent')
            .then(() => {
                
            this.$bus.$emit('setMapVisibility', {loadMap: updateMap})
            this.$bus.$emit('updateMap', {loadMap: updateMap, loadContent: true})
            })

        },
        logMap(e, mapURL, mapID) {
        if (window.vuplex) {
          this.sendMessageToCSharp(mapURL, mapID)
        } else{
          console.log("C# message of map URL " + `${ mapURL }` + " and map ID " + `${ mapID }`+ " would be sent here")
        }
      }
    },
    mounted(){
        this.$store.dispatch('getAllMaps');
    }
}
</script>

<style scoped>

@media (max-width: 800px){

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

</style>