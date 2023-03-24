<template>

    <div id="onboarding-flow">
        <!-- Menu - will be component... eventually -->
        <el-drawer
        :visible.sync="drawer"
        direction="ttb"
        size="100%">
            <!-- Todo: check
                @open="handleOpen"
                @close="handleClose"
            -->
            <el-menu
                class="menu-list"
                default-active="1-1">
                <el-submenu index="1">
                    <template slot="title">
                        <span>OCELLUS XR</span>
                    </template>
                    <el-menu-item @click="goToIntro" index="1-1">
                        <i class="el-icon-data-analysis menu-list"></i>
                        Introduction
                    </el-menu-item>
                    <el-menu-item @click="goToHeat" index="2-1">
                        <i class="el-icon-sunny menu-list"></i>
                        Heat Risk
                    </el-menu-item>
                    <el-menu-item @click="goToFlood" index="3-1">
                        <i class="el-icon-heavy-rain menu-list"></i>
                        Flood Risk
                    </el-menu-item>
                    <el-menu-item @click="goToWebsite">
                      <i class="el-icon-link menu-list"></i>
                      Ocellus Website
                    </el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-map-location menu-list"></i>
                        <span>Explore 3D Map</span>
                    </template>
                    <el-menu-item-group
                        class="menu-list">
                        <el-menu-item @click="goToLayer('ar', 'equity.cxc73xaa', 'Heat Risk', false, '-L7Wfi50DWry_dLu-l8o', [-1,-1])" index="2-1">Heat Risk</el-menu-item>
                        <el-menu-item @click="goToLayer('ar', 'timonm.5werclko', 'Moderate Flooding Scenario', false, '-ND5bqMBetBOAOPDDJql', [-1,-1])" index="2-2">Moderate Flooding</el-menu-item>
                        <el-menu-item @click="goToLayer('ar', 'timonm.6d5byyoy', 'Extreme Flooding Scenario', false, '-ND5bzFJcSRXPVLs_fJF', [-1,-1])" index="2-3">Extreme Flooding</el-menu-item>
                        <el-menu-item @click="goToLayer('ar', 'equity.dmmqh0kw', 'Flood Zones', false, '-L7Wfh14PItvuPZSpjM7', [-1,-1])" index="2-4">Flood Zones</el-menu-item>
                        <el-menu-item @click="goToLayer('ar', 'equity.dsxc6fdt', 'Cooling Stations', false, undefined, [-1,-1])" index="2-5">Cooling Stations</el-menu-item>
                        <el-menu-item @click="goToLayer('ar', 'equity.0qf98zo6', 'Elderly Population', false, '-L7WfQTsPvbJ7QDxalzv', [-1,-1])" index="2-6">Elderly Population</el-menu-item>
                        <el-menu-item @click="goToLayer('ar', 'equity.16d8ns8l', 'Income', false, '-L7Wfboiy9-SxyOkQ_r8', [-1,-1])" index="2-7">Income</el-menu-item>
                        <el-menu-item @click="goToLayer('ar', 'equity.c7f9efui', 'PEJA', false, '-LgdXSbncdGcwSSsZ0li', [-1, -1])" index="2-8">Potential Social Justice Areas</el-menu-item>
                        <el-menu-item @click="goToLayer('ar', 'equity.8clwnj6e', 'Green Roofs', false, '-LSULdArnnFkvB6lEVsa', [-1,-1])" index="2-9">Green Roofs</el-menu-item>
                        <el-menu-item @click="goToLayer('ar', 'equity.755pqg03', 'Open Space', false, '-LSUNuzgyEkqJuCp5GR0', [-1,-1])" index="2-10">Open Space</el-menu-item>
                        <el-menu-item @click="goToLayer('ar', 'equity.3t4w37ok', 'Redlining', false, '-NRB8rkfJ90ekg2UQqt-', [-1,-1])" index="2-11">Redlining</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="3">
                    <!-- Todo: distance check and confirmation modal for locations outside NYC  :disabled="location && location.lat ? false : true" -->
                    <template slot="title">
                        <i class="el-icon-mobile menu-list"></i>
                        <span>View Live</span>
                        <span v-if="distanceToNYC > 20">(NYC only)</span>
                    </template>
                    <el-menu-item-group
                        class="menu-list">
                        <el-menu-item @click="goToLayer('live', 'equity.cxc73xaa', 'Heat Risk', false, '-L7Wfi50DWry_dLu-l8o', [-1,-1])" index="3-1">Heat Risk</el-menu-item>
                        <el-menu-item @click="goToLayer('live', 'timonm.77dtkn5f', 'Extreme Flooding', false, '-ND5bzFJcSRXPVLs_fJF', [-1,-1])" index="3-2">Extreme Flooding</el-menu-item>
                        <el-menu-item @click="goToLayer('live', 'equity.dmmqh0kw', 'Flood Zones', false, '-L7Wfh14PItvuPZSpjM7', [-1,-1])" index="3-3">Flood Zones</el-menu-item>
                        <el-menu-item @click="goToLayer('live', 'equity.dsxc6fdt', 'Cooling Stations', false, undefined, [-1,-1])" index="3-4">Cooling Stations</el-menu-item>
                        <el-menu-item @click="goToLayer('live', 'equity.0qf98zo6', 'Elderly Population', false, '-L7WfQTsPvbJ7QDxalzv', [-1,-1])" index="3-5">Elderly Population</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </el-drawer>

        <i @click="drawer = true"  class="el-icon-menu menu-icon"></i>
        <el-button
        v-if="hasCitations"
        @click="citations = true"
        icon="el-icon-link"
        class="citation-icon"
        size="mini"></el-button>

        <el-drawer
        title="Citations"
        :visible.sync="citations"
        direction="rtl"
        size="100%">
          <citation-list
           v-bind:citations="currentCitations"
          >
          </citation-list>
        </el-drawer>

        <!-- Slides -->
        <div class="slides" v-if="slides && slides[active] && slides[active].title">
            <h1>
                {{ slides[active].title }}
            </h1>
            <onboarding-contents
            v-for="content in slides[active].content"
            :key="content[0]"
            v-bind:data-content="content"
            @onAr="goToLayer('ar', 'equity.cxc73xaa', 'Heat Risk', false, '-L7Wfi50DWry_dLu-l8o', [1,11])"
            @onHeat="goToHeat()"
            @onFlood="goToFlood()"></onboarding-contents>

            <div class="button-spacer">
                <el-button
                v-if="active > 0"
                type="primary"
                icon="el-icon-arrow-left"
                class="front"
                @click="prev">Prev</el-button>
                <div v-else></div>

                <!-- Load Unity Assets async to activate -->
                <!-- Todo: discuss layer id and name payload -->
                <el-button
                    v-if="slides[active].target"
                    color="black"
                    type="primary"
                    :loading="this.loading"
                    icon="el-icon-map-location"
                    @click="goToLayer('ar', slides[active].target, 'optionalLayerName', true, slides[active].mapKey, [activeSection, active])">
                    Explore
                </el-button>

                <el-button
                v-if="active !== slides.length - 1"
                type="primary"
                icon="el-icon-arrow-right"
                class="front"
                @click="next">Next</el-button>
                <div v-else></div>
            </div>
        </div>
    </div>
</template>

<script scoped>
import splitLayout from './splitLayout.vue'
import onboardingContents from './onboardingContents.vue'
import citationList from "~/components/onboarding/citationList.vue";
import CitationOverlay from "~/components/onboarding/citationList.vue";
import CitationList from "~/components/onboarding/citationList.vue";

export default {
  components: {CitationList, splitLayout, onboardingContents },
    props: {
    },
    data() {
        return {
            CSharpMessage: {"sentType":"ar","messageContent":{"layer":{"id":"equity.cxc73xaa","name":"optionalLayerName","mapId":"","description":"","isReady":true,"slideIndex":[1,1]},"location":{"lat":40.709381103515628,"lon":-73.93905639648438},"webviewIsOpen":false}},
            dialogVisible: true,
            vuplexReady: false,
            innerVisible: false,
            moduleLoaded: false,
            active: 0, // current slide,
            activeSection: 0, //current slide section
            drawer: true, // menu drawer
            citations: false,
            window: {},
            loading: false, // unity layer loading state
            slides: {},
            unity: {},
            location: {} // gps coordinates as reported by unity
        }
    },
    computed: {
        currentCitations(){
          if(this.hasCitations){
            return this.slides[this.active].citations
          } else {
            return []
          }
        },
        hasCitations(){
          if(!this.moduleLoaded){
            return false
          } else {
            return this.slides !== 'undefined' && Object.keys(this.slides).length !== 0 && this.slides[this.active] !== 'undefined' && typeof this.slides[this.active].citations !== 'undefined'
          }
        },
        onboarding() {
            return this.$store.getters.getOnboarding
        },
        introSlides() {
            return this.$store.getters.getOnboarding?.modules?.intro?.slides
        },
        heatSlides() {
            return this.$store.getters.getOnboarding?.modules[0]?.slides
        },
        floodSlides() {
            return this.$store.getters.getOnboarding?.modules[1]?.slides
        },
        distanceToNYC() {
            // NYC 40.730610, -73.935242
            let distance = Number.MAX_SAFE_INTEGER
            if (this.location && this.location.lat && this.location.lon) {
                distance = this.distance(40.730610, -73.935242, this.location.lat, this.location.lon);
            }
            console.log("distance to NYC", distance)
            return distance
        }
    },
    methods: {
        vuplexMessageListener(event){
          let jsonData = event.data;
          console.log('JSON received from C#: ' + jsonData);
          if(!this.moduleLoaded) {
            this.$store.dispatch('getOnboardingModules', true).then(() => {
              this.moduleLoaded = true
              console.log('module loaded')
              console.log(this.moduleLoaded)

              this.updateSlides(jsonData)
            })
          } else {
            this.updateSlides(jsonData)
          }
        },
        updateSlides(jsonData){
          let message = {}
          if (jsonData){
            message = JSON.parse(jsonData)}
          else {
            return
          }
          console.log("unity message",
            message
          );

          if(typeof message['messageContent'] === 'undefined'){
            console.log('malformed message: data missing')
            return
          }
          if(typeof message['messageContent'].layer === 'undefined'){
            console.log('malformed message: layer missing')
            return
          }

          if(typeof message['messageContent'].layer.slideIndex === 'undefined'){
            console.log('malformed message: slideIndex missing')
            return
          }
          this.activeSection = message['messageContent'].layer.slideIndex[0]
          switch (this.activeSection) {
            case 0:
              this.slides = this.introSlides
              break;
            case 1:
              this.slides = this.heatSlides
              break;
            case 2:
              this.slides = this.floodSlides
              break;
            default:
              this.slides = this.introSlides
          }
          this.active = message['messageContent'].layer.slideIndex[1]
          this.drawer = false
        },
        moduleButtonClick: function(e){
            console.log(e);
            this.innerVisible = true;
            this.$store.dispatch('updateOnboardingActiveModule', e)
        },
        next() {
            this.active++
        },
        prev() {
            this.active--
        },
        handleOpen() {
            const message = { type: "menu", data: { open: true, layer: {
                  slideIndex: [-1, -1]
                } }};
            window?.vuplex?.postMessage(message);
            console.log('js-dev', 'menu message sent from JS to C#', message);
        },
        handleClose() {
            const message = { type: "menu", data: { open: false }};
            window?.vuplex?.postMessage('js-dev', message);
        },
        goToLayer(type, layerID, layerName, webview, mapKey = undefined, index = undefined) {
            console.log(mapKey)
            console.log(index)
            this.loading=true
            let message = {
                type: type,
                data: {
                    layer: {
                        id: layerID,
                        name: layerName
                    },
                    webview: webview
                }
            };
            if(typeof mapKey !== 'undefined'){
              message.data.layer.mapKey = mapKey
            }
            if(typeof index !== 'undefined'){
              message.data.layer.slideIndex = index
            }
            window?.vuplex?.postMessage(message);
            console.log('js-dev', 'menu message sent from JS to C#', message);
        },
        goToIntro(slideIndex = [0, 0]) {
            this.slides = this.introSlides
            this.activeSection = 0
            this.active = 0
            this.drawer = false
        },
        goToHeat(slideIndex = [1, 0]) {
            this.slides = this.heatSlides
            this.active = 0
            this.activeSection = 1
            this.drawer = false
        },
        goToFlood(slideIndex = [2, 0]) {
            this.slides = this.floodSlides
            this.active = 0
            this.activeSection = 2
            this.drawer = false
        },
        goToWebsite(){
          if (window.vuplex) {
            let message = {
              type: 'link',
              data: {
                link: {
                  url: 'http://ocellus.urbansystemslab.com/',
                },
                webview: false
              }
            };
            window?.vuplex?.postMessage('http://ocellus.urbansystemslab.com/');
            console.log('js-dev', 'menu message sent from JS to C#', message);
          } else {
            window.open('http://ocellus.urbansystemslab.com/')
          }
        },
        distance(lat1, lon1, lat2, lon2, unit) {
            if ((lat1 == lat2) && (lon1 == lon2)) {
                return 0;
            }
            else {
                var radlat1 = Math.PI * lat1/180;
                var radlat2 = Math.PI * lat2/180;
                var theta = lon1-lon2;
                var radtheta = Math.PI * theta/180;
                var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                if (dist > 1) {
                    dist = 1;
                }
                dist = Math.acos(dist);
                dist = dist * 180/Math.PI;
                dist = dist * 60 * 1.1515;
                if (unit=="K") { dist = dist * 1.609344 }
                if (unit=="N") { dist = dist * 0.8684 }
                return dist;
            }
        },
    },
    mounted() {
      if(!this.moduleLoaded){
        this.$store.dispatch('getOnboardingModules', true).then(() => {
          this.moduleLoaded = true
        })
      }


        if (process.browser) {
            if (window.vuplex) {
                console.log('js-dev', "vuplex is active");
              console.log(this)
              console.log('js-dev', 'adding event listener');
              window.vuplex.addEventListener('message', this.vuplexMessageListener)
            } else {
                // The window.vuplex object hasn't been initialized yet because the page is still
                // loading, so add an event listener to send the message once it's initialized.
                console.log('vuplex', 'trying to add event listener', "window.vuplex is", window.vuplex);
                window.addEventListener('vuplexready', this.vuplexMessageListener);
            }

        }
    }
}
</script>

<style>
@media (max-width: 400px) {
    h1 {
        font-size: 2.1em;
    }
    p {
        font-size: 1.1em;
    }
}

div #onboarding-flow {
    display: flex;
  overflow-y: scroll;
  height: 100vh;
    flex-flow: column;
    z-index: 3000;
    padding: 0px 6px;
}

#onboarding-button {
    /* margin: 15px; */
    right: 25px;
    top: 25px;
    position: absolute;
}

a {
    color: black;
}

.el-dialog__body {
    color: black;
}

.menu-icon {
    position: absolute;
    top: 40px;
    left: 34px;
    font-size: 38px;
    /* cursor doesn't matter on mobile */
    cursor: pointer;
}

.citation-icon {
    position: absolute;
    top: 40px;
    right: 34px;
  font-size: 20px;

    /* cursor doesn't matter on mobile */
    cursor: pointer;
}

#onboarding-flow .el-button {
    background-color: white;
    color: black;
    margin: 0.3em;
  pointer-events: all;
    border-color: black;
    transition: .3s ease-in-out;
}

#onboarding-flow .el-button:hover {
    background-color: black;
    color: white;
}

#onboarding-flow .el-button:disabled {
    background-color: white;
    color: lightgray;
    border-color: lightgray;
}

.front {
    z-index: 100;
  opacity: 0.8;
}

.slides {
    margin-top: 60px;
    padding: 0px 10px;
}

.menu-list li {
    font-size: 24px;
}

.el-submenu__title {
    font-size: inherit;
    text-transform: uppercase;
    font-weight: 600;
}

.el-menu-item.is-active {
    color: black;
    font-weight: 500;
}

.spacer {
    padding-bottom: 16px;
    border-top: 1px solid lightgrey;
}

.button-spacer {
  pointer-events: none;
    display: flex;
    justify-content: space-between;
    position: absolute;
    width: calc(100vw - 70px);
    bottom: 24px;
}

</style>
