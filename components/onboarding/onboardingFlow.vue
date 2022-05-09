<template>

    <div id="onboarding-flow">
        <!-- Menu - will be component... eventually -->
        <el-drawer
        :visible.sync="drawer"
        direction="ttb"
        size="100%">
            <!-- <ul class="menu-list">
                <li @click="goToOnboarding">About</li>
                <div class="spacer"></div>
                <li @click="goToLayer('explore')">Explore</li>
            </ul> -->
            <el-menu
                class="menu-list"
                default-active="2"
                @open="handleOpen"
                @close="handleClose">
                <el-menu-item index="1">
                    <!-- <i class="el-icon-menu"></i> -->
                    <span @click="goToOnboarding">About</span>
                </el-menu-item>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-location menu-list"></i>
                        <span>Explore AR</span>
                    </template>
                    <el-menu-item-group
                        class="menu-list">
                        <el-menu-item @click="goToLayer('equity.cxc73xaa', 'Heat Risk')" index="2-1">Heat</el-menu-item>
                        <el-menu-item @click="goToLayer('timonm.77dtkn5f', 'Extreme Flooding')" index="2-2">Flooding</el-menu-item>
                        <el-menu-item @click="goToLayer('equity.dsxc6fdt', 'Cooling Stations')" index="2-6">Cooling Stations</el-menu-item>
                        <el-menu-item @click="goToLayer('equity.0qf98zo6', 'Elderly Population')" index="2-3">Elderly Population</el-menu-item>
                        <el-menu-item @click="goToLayer('equity.16d8ns8l', 'Income')" index="2-4">Income</el-menu-item>
                        <el-menu-item @click="goToLayer('equity.c7f9efui', 'PEJA')" index="2-6">Potential Social Justice Areas</el-menu-item>
                        <el-menu-item @click="goToLayer('equity.8clwnj6e', 'Green Roofs')" index="2-6">Green Roofs</el-menu-item>
                        <el-menu-item @click="goToLayer('equity.755pqg03', 'Open Space')" index="2-5">Open Space</el-menu-item>
                        <!-- <el-menu-item @click="goToLayer('equity.3t4w37ok', 'Redlining')" index="2-6">Redlining</el-menu-item> -->
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-view menu-list"></i>
                        <span>Explore Live</span>
                    </template>
                    <el-menu-item-group
                        class="menu-list">
                        <el-menu-item @click="goToLayer('explore', '')">Street Level</el-menu-item>
                        <el-menu-item @click="goToLayer('heat', 'Heat Risk')" index="2-1">Etreme Flooding</el-menu-item>
                        <el-menu-item @click="goToLayer('heat', 'Heat Risk')" index="2-1">Moderate Flooding</el-menu-item>
                        <el-menu-item @click="goToLayer('flood', 'Extreme Flooding')" index="2-2">Tree Type</el-menu-item>
                        <el-menu-item @click="goToLayer('income', 'Cooling Stations')" index="2-6">Rain Gardens</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-menu-item index="3">
                    <!-- <i class="el-icon-document"></i> -->
                    <!-- This brings to "World Scale View" -->
                </el-menu-item>
            </el-menu>
        </el-drawer>

        <i @click="drawer = true"  class="el-icon-menu menu-icon"></i>

        <!-- Shown for intro -->
        <div class="slides" v-if="introSlides && showIntro">
            <h1 v-if="introSlides[active].title">
                {{ introSlides[active].title }}
            </h1>

            <onboarding-contents
            v-for="content in introSlides[active].content"
            :key="content[0]"
            v-bind:data-content="content"
            @onNext="next"
            @onHeat="goToHeat"></onboarding-contents>
        </div>

        <!-- Shown after intro -->
        <div class="slides" v-if="!showIntro">
            <!-- {{ this.window.vuplex ? 'exists' : 'does not exist' }} -->
            <h1>
                {{ slides[active].title }}
            </h1>
            <onboarding-contents
            v-for="content in slides[active].content"
            :key="content[0]"
            v-bind:data-content="content"
            @onAr="goToLayer('heat', '')"></onboarding-contents>

            <div class="button-spacer">
                <el-button
                v-if="active !== 0"
                type="primary"
                icon="el-icon-arrow-left"
                @click="prev">Prev</el-button>
                <div v-else></div>

                <!-- Load Unity Assets async to activate -->
                <el-button
                    type="primary" 
                    :loading="loading"
                    icon="el-icon-view"
                    disabled>
                    Explore AR
                </el-button>

                <el-button
                v-if="active !== slides.length - 1"
                type="primary"
                icon="el-icon-arrow-right"
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
            showIntro: true,
            window: {},
            dev: 'no message yet',
            loading: true
        }
    },
    computed: {
        onboarding() {
            return this.$store.getters.getOnboarding
        },
        introSlides() {
            return this.$store.getters.getOnboarding?.modules?.intro?.slides
        },
        slides() {
            return this.$store.getters.getOnboarding?.modules[0]?.slides
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
        },
        prev() {
            this.active--
        },
        handleOpen() {
            const message = { type: "menu", data: { open: true }};
            console.log('js-dev', message);
            window?.vuplex?.postMessage(message);
        },
        handleClose() {
            const message = { type: "menu", data: { open: false }};
            window?.vuplex?.postMessage('js-dev', message);
        },
        goToLayer(layerID, layerName) {
            /*
                {
                type (req): String ['layer', 'menu', 'location'],
                data (req): {
                    layer: {
                    id: String,
                    name: String,
                    description: String
                    },
                    location: {
                    lat: Number,
                    lon: Number
                    }
                  }
                }
            */
            const message = { type: 'layer', data: {layer: {id: layerID, name: layerName}} };
            console.log('js-dev', message);
            window?.vuplex?.postMessage(message);
        },
        goToOnboarding() {
            this.drawer = false
            this.active = 0
            this.showIntro = true
        },
        goToHeat() {
            this.drawer = false
            this.active = 0
            this.showIntro = false
        },
        // handleClose(done) {
        //     this.$confirm('Are you sure you want to close this?')
        //     .then(_ => {
        //         done();
        //     })
        //     .catch(_ => {});
        // }
        
    },
    mounted() {
        this.$store.dispatch('getOnboardingModules', true);

        if (process.browser) {
            if (window.vuplex) {
                console.log('js-dev', "starting vuplex", "window.vuplex is", window.vuplex);
                // The window.vuplex object already exists, so go ahead and send the message.
                // window?.vuplex?.postMessage(message);
                console.log('vuplex', 'trying to add event listener', "window.vuplex is", window.vuplex);
                window.addEventListener('vuplexready', addMessageListener);
            } else {
                // The window.vuplex object hasn't been initialized yet because the page is still
                // loading, so add an event listener to send the message once it's initialized.
                console.log('vuplex', 'trying to add event listener', "window.vuplex is", window.vuplex);
                window.addEventListener('vuplexready', addMessageListener);
            }

            function addMessageListener() {
                console.log('js-dev', 'adding event listener');
                window.vuplex.addEventListener('message', function(event) {
                    let json = event.data;
                    console.log('js-dev', 'message event from C#', event);
                    this.dev = JSON.stringify(json);
                    console.log('js-dev', 'response from C#', json);
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

div {
    background-color: white;
    color: black;
    /* opacity: 0.8; */
    /* width: 90vw; */
    /* margin: 5vw !important; */
    /* height: 95vh; */
    overflow-y: hidden;
}

.el-dialog__body {
    color: black;
}

.el-carousel__container {
    position: relative;
    height: 85vh;
    text-align: center;
    margin: auto;
    width: 100%;
}

.el-carousel__item {
    padding: 25px;
    border-radius: 10px;
    /* background-color: #99a9bf; */
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
    /* background-color: rgba(255, 255, 255, 0.3); */
    margin: 0.3em;
    background-color: black;
    color: white;
}

.slides {
    margin-top: 60px;
    padding: 0px 10px;
}

.menu-list li {
    font-size: 24px;
}

.menu-list :first-child {
    padding-bottom: 16px;
}

[class*="el-icon"] {
    padding-top: 15px;
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