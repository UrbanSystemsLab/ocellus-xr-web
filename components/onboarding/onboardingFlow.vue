<template>

    <div id="onboarding-flow">
        <!-- Menu - will be component... eventually -->
        <el-drawer
        :visible.sync="drawer"
        direction="ttb"
        size="100%">
            <el-menu
                class="menu-list"
                default-active="1-1"
                @open="handleOpen"
                @close="handleClose">
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
                        Heat
                    </el-menu-item>
                    <el-menu-item @click="goToFlood" index="3-1">
                        <i class="el-icon-heavy-rain menu-list"></i>
                        Flooding
                    </el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-map-location menu-list"></i>
                        <span>Explore 3D Map</span>
                    </template>
                    <el-menu-item-group
                        class="menu-list">
                        <el-menu-item @click="goToLayer('ar', 'equity.cxc73xaa', 'Heat Risk', 'NYC_heatmap', 'risk')" index="2-1">Heat Risk</el-menu-item>
                        <el-menu-item @click="goToLayer('ar', 'timonm.77dtkn5f', 'Moderate Flooding Scenario', '2050s-100y', 'id')" index="2-2">Moderate Flooding</el-menu-item>
                        <el-menu-item @click="goToLayer('ar', 'timonm.77dtkn5f', 'Extreme Flooding Scenario', '2050s-500y', 'id')" index="2-3">Extreme Flooding</el-menu-item>
                        <el-menu-item @click="goToLayer('ar', 'equity.dmmqh0kw', 'Flood Zones')" index="2-4">Flood Zones</el-menu-item>
                        <el-menu-item @click="goToLayer('ar', 'equity.dsxc6fdt', 'Cooling Stations')" index="2-5">Cooling Stations</el-menu-item>
                        <el-menu-item @click="goToLayer('ar', 'equity.0qf98zo6', 'Elderly Population', 'NYC_65plus', 'P_Abv65_e_')" index="2-6">Elderly Population</el-menu-item>
                        <el-menu-item @click="goToLayer('ar', 'equity.16d8ns8l', 'Income', 'income')" index="2-7">Income</el-menu-item>
                        <el-menu-item @click="goToLayer('ar', 'equity.c7f9efui', 'PEJA')" index="2-8">Potential Social Justice Areas</el-menu-item>
                        <el-menu-item @click="goToLayer('ar', 'equity.8clwnj6e', 'Green Roofs')" index="2-9">Green Roofs</el-menu-item>
                        <el-menu-item @click="goToLayer('ar', 'equity.755pqg03', 'Open Space')" index="2-10">Open Space</el-menu-item>
                        <el-menu-item @click="goToLayer('ar', 'equity.3t4w37ok', 'Redlining')" index="2-11">Redlining</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="3" disabled>
                    <template slot="title">
                        <i class="el-icon-mobile menu-list"></i>
                        <span>View Live</span>
                    </template>
                    <el-menu-item-group
                        class="menu-list">
                        <el-menu-item @click="goToLayer('live', 'equity.cxc73xaa', 'Heat Risk')" index="3-1">Heat Risk</el-menu-item>
                        <el-menu-item @click="goToLayer('live', 'timonm.77dtkn5f', 'Extreme Flooding')" index="3-2">Extreme Flooding</el-menu-item>
                        <el-menu-item @click="goToLayer('live', 'equity.dmmqh0kw', 'Flood Zones')" index="3-3">Flood Zones</el-menu-item>
                        <el-menu-item @click="goToLayer('live', 'equity.dsxc6fdt', 'Cooling Stations')" index="3-4">Cooling Stations</el-menu-item>
                        <el-menu-item @click="goToLayer('live', 'equity.0qf98zo6', 'Elderly Population')" index="3-5">Elderly Population</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>              
            </el-menu>
        </el-drawer>

        <i @click="drawer = true"  class="el-icon-menu menu-icon"></i>

        <!-- Slides -->
        <div class="slides" v-if="slides">
            <h1>
                {{ slides[active].title }}
            </h1>
            <onboarding-contents
            v-for="content in slides[active].content"
            :key="content[0]"
            v-bind:data-content="content"
            @onAr="goToLayer('heat', '')"
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
                <el-button
                    v-if="slides[active].layer"
                    type="primary" 
                    :loading="this.loading"
                    icon="el-icon-map-location"
                    @click="goToLayer('ar', slides[active].layer)">
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

export default {
  components: { splitLayout, onboardingContents },
    props: {
    },
    data() {
        return {
            dialogVisible: true,
            innerVisible: false,
            active: 0,
            // activeLayer: 'heat', // TODO
            drawer: false,
            window: {},
            dev: 'no message yet',
            loading: false,
            slides: this.$store.getters.getOnboarding?.modules[0]?.slides,
            unity: {}
        }
    },
    computed: {
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
        }
    },
    watch: {
        unity(newMessage, oldMessage) {
            console.log("unity message", newMessage, 
                "newMessage.messageContent", newMessage.messageContent,
                "newMessage.messageContent?.layer", newMessage.messageContent?.layer,
                "layer.id", newMessage.messageContent?.layer?.id, 
                "loading", this.loading, "test", 
                newMessage.messageContent?.layer?.id && this.loading
            );
            if (newMessage.messageContent?.layer?.id && this.loading) {
                this.loading = false,
                console.log("loading", this.loading);
                this.drawer = false,
                this.unity = {}
            }
        }
    },
    methods: {
        moduleButtonClick: function(e){
            console.log(e);
            this.innerVisible = true;
            this.$store.dispatch('updateOnboardingActiveModule', e)
        },
        next() {
            this.active++
            console.log("active", this.active)
        },
        prev() {
            this.active--
            console.log("active", this.active)
        },
        handleOpen() {
            const message = { type: "menu", data: { open: true }};
            window?.vuplex?.postMessage(message);
            console.log('js-dev', 'menu message sent from JS to C#', message);
        },
        handleClose() {
            const message = { type: "menu", data: { open: false }};
            window?.vuplex?.postMessage('js-dev', message);
        },
        goToLayer(type, layerID, layerName) {
            this.loading=true
            const message = { type: type, data: {layer: {id: layerID, name: layerName}} };
            window?.vuplex?.postMessage(message);
            console.log('js-dev', 'menu message sent from JS to C#', message);
        },
        goToIntro() {
            this.slides = this.introSlides
            this.active = 0
            this.drawer = false
        },
        goToHeat() {
            this.slides = this.heatSlides
            this.active = 0
            this.drawer = false
        },
        goToFlood() {
            this.slides = this.floodSlides
            this.active = 0
            this.drawer = false
        }
    },
    mounted() {
        this.$store.dispatch('getOnboardingModules', true);

        if (process.browser) {
            if (window.vuplex) {
                console.log('js-dev', "vuplex is active");
                addMessageListener();
            } else {
                // The window.vuplex object hasn't been initialized yet because the page is still
                // loading, so add an event listener to send the message once it's initialized.
                console.log('vuplex', 'trying to add event listener', "window.vuplex is", window.vuplex);
                window.addEventListener('vuplexready', addMessageListener);
            }

            let that = this;
            function addMessageListener() {
                console.log('js-dev', 'adding event listener');
                window.vuplex.addEventListener('message', function(event) {
                    let json = event.data;
                    console.log('JSON received from C#: ' + json);
                    that.unity = json;
                });
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

#onboarding-flow .el-button {
    background-color: white;
    color: black;
    margin: 0.3em;
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
    display: flex;
    justify-content: space-between;
    position: absolute;
    width: calc(100vw - 70px);
    bottom: 24px;
}

</style>