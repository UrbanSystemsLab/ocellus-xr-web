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
                <el-menu-item index="2">
                    <!-- <i class="el-icon-document"></i> -->
                    <!-- This brings to "World Scale View" -->
                    <span @click="goToLayer('explore')">Explore XR</span>
                </el-menu-item>
                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>Map Controls</span>
                    </template>
                    <el-menu-item-group
                        class="menu-list">
                        <el-menu-item @click="goToLayer('heat')" index="2-1">Heat</el-menu-item>
                        <el-menu-item @click="goToLayer('flood')" index="2-2">Flooding</el-menu-item>
                        <el-menu-item @click="goToLayer('65+')" index="2-3">65+</el-menu-item>
                        <el-menu-item @click="goToLayer('income')" index="2-4">Income</el-menu-item>
                        <el-menu-item @click="goToLayer('open-space')" index="2-5">Open Space</el-menu-item>
                        <el-menu-item @click="goToLayer('green-roofs')" index="2-6">Green Roofs</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
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
            @onAr="goToLayer('heat')"></onboarding-contents>

            <div class="button-spacer">
                <el-button
                v-if="active !== 0"
                type="primary"
                v-on:click="prev">Prev</el-button>
                <div v-else></div>

                <el-button
                v-if="active !== slides.length - 1"
                type="primary"
                v-on:click="next">Next</el-button>
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
            drawer: false,
            showIntro: true,
            window: {},
            dev: 'no message yet'
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
        handleOpen() {
            const message = { type: "menu", data: { open: true }};
            console.log('js-dev', message);
            window?.vuplex?.postMessage(message);
        },
        handleClose() {
            const message = { type: "menu", data: { open: false }};
            window?.vuplex?.postMessage('js-dev', message);
        },
        goToLayer(layer) {
            const message = { type: "layer", data: { layer: layer }};
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
        prev() {
            console.log('prev')
            this.active--
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
        this.$store.dispatch('getOnboardingModules', true)
        this.$store.dispatch('getOnboardingContent', true)

        if (process.browser) {
            if (window.vuplex) {
                // The window.vuplex object already exists, so go ahead and send the message.
                sendMessageToCSharp();
            } else {
                // The window.vuplex object hasn't been initialized yet because the page is still
                // loading, so add an event listener to send the message once it's initialized.
                console.warn('vuplex', 'adding event listener...')
                window.addEventListener('vuplexready', addMessageListener);
            }

            function addMessageListener() {
                this.dev = 'vuplex is ready, no message received yet'
                this.window.vuplex.addEventListener('message', function(event) {
                    let json = event.data;
                    // > JSON received: { "type": "greeting", "message": "Hello from C#!" }
                    this.dev = JSON.stringify(json)
                    console.log('vuplex', 'response from C#', json);
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
    background-color: transparent;
    color: black;
    margin: 0.3em;
    border-color: black;
}

#onboarding-flow .el-button:hover {
    background-color: rgba(255, 255, 255, 0.3);
    margin: 0.3em;
    border-color: white;
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

.el-icon-location {
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