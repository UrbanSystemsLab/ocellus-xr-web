<template>
  <div>
    <main class="flex-container">
      <!-- <mapboxMap v-if='projectLoadedState' :activeLocation='activeLocation'/> -->
      <!-- <mapFullView /> -->
      <layerDropdown />
      <receiveTest />
      <onboardingFlow />
    </main>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import splitLayout from '~/components/onboarding/splitLayout.vue'
import mapboxMap from '~/components/map/mapboxMap.vue'
import layerDropdown from '~/components/layerDropdown.vue'
import queryParamsMixin from '~/components/utils/mixins/queryParamsMixin'
  export default {
    name: 'IndexPage',
    components: { splitLayout, mapboxMap, layerDropdown },
    mixins: [queryParamsMixin],
    watchQuery: ['query'],
    asyncData: function (context) {
      var query = null
      // Get query parameters
      if (context.query){ query = context.query }
      return { query: query }
    },
    data() {
      return{
        projectLoaded: false,
      }
    },
    computed: {
      activeContent() { return this.$store.getters.getActiveContent},
      activeLocation() { return this.$store.getters.getActiveLocation },
      isMobileDevice() {return this.$store.getters.getMobileDevice},
      allMaps() {return this.$store.getters.getAllMaps},
      locationLoadedState() { return this.activeLocation && this.activeLocation.location ? true : false },
      mapLoaded() {return this.$store.getters.getMapLoadedState},
      projectLoadedState() { return this.projectLoaded ? true : false },
      onboarding() {return this.$store.getters.getOnboardingContent},
      locations() {return this.$store.getters.getLocations},
      activeLocation(){ return this.$store.getters.getActiveLocation },
    },
    methods: {
      setupFirebaseAuth() {
        return new Promise((resolve, reject) => {
          var store = this.$store
          var db = firebase.database()
          if (!firebase.apps.length) {
            firebase.initializeApp(process.env.firebaseConfig)
          }
        })
      },
      loadProject() {
        //Initialize active map with default data
        this.$store.dispatch('setMapLoadedState', true)
        this.$store.dispatch('getLocations')
        .then(() => {
          return this.$store.dispatch('getSources')
        })
        .then((sources) => {
          return this.$store.dispatch('getAllMaps')
        })
        .then((sources) => {
          return this.$store.dispatch('getOnboarding')
        })
        .then(() => {
          return this.$store.dispatch('loadActiveMaps')
        })
        .then(() => {
        // Load Map
        this.projectLoaded = true
        })

        this.$bus.$on('mapLoaded', (payload) => {
        // If location is mentioned. Flyto location
        var query = this.query
        if (query && query.locationKey) {
          // Location is required. Map and Map Position can be specified
          var locationKey = JSON.parse(query.locationKey)
          // Change active location
          this.$store.dispatch('setActiveLocationFromUrl', {locationKey: locationKey})
          .then(() => {
            // Fly to location
            var flyToPosition = null
            if(query.mapPosition) {
              var mapPosition =JSON.parse(query.mapPosition)
              flyToPosition = {
                longitude: mapPosition.longitude,
                latitude: mapPosition.latitude,
                zoom: mapPosition.zoom,
                bearing: mapPosition.bearing,
                pitch: mapPosition.pitch,
              }
            }
            else
              flyToPosition = this.$store.getters.getActiveMapPosition

            this.$bus.$emit('flyTo', flyToPosition)

            // Show map
            if (query.mapKey) {
              var mapKey = JSON.parse(query.mapKey)
              var allMaps = this.allMaps
              // Get map for corresponding mapKey
              for (var key in allMaps) {
                if (allMaps.hasOwnProperty(key) && key === mapKey ) {
                  var map = allMaps[key]
                  this.$bus.$emit('updateLegend', map)
                  this.$bus.$emit('updateMap', {loadMap: map})
                }
              }
            }
          })
        }
        // Else add current location to URL params
        else { this.appendQueryParam('locationKey', this.activeLocation.locationKey) }
      })
      },
      setMobileDevice() {
        /*
        Mobile Device detection
        Yes, really... https://stackoverflow.com/a/3540295
        */
        if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
            || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
            this.$store.dispatch('setMobileDevice', true)
        }
        else {
          this.$store.dispatch('setMobileDevice', false)
        }
      },
    },
    beforeMount(){
      this.setMobileDevice()
    },
    mounted() {
      this.setupFirebaseAuth()
      .then(() => {
        this.loadProject()
      })
    },
  }
</script>

<style scoped>

body {
  margin: 0;
  line-height: 1.5em;
/*   opacity: 0; */
  background-color: rgba(0, 0);
}

main {
  display: grid;
  grid-template-columns: 6fr 4fr;
  height: 100vh;
  /* grid-gap: 1em; */
}

div #recieve-test {
  margin: 100px;
  height: 45px;
}

@media (max-width: 800px){
  .flex-container {
    display: flex;
    flex-direction: column;
  }
}

@media (min-width: 801px) {
  .flex-container {
    flex-direction: row;
  }
}

</style>
