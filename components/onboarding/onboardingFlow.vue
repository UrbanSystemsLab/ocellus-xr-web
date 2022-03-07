<template>

    <div id="onboarding-flow">

        <!-- Menu - will be component... eventually -->
        <el-drawer
        :visible.sync="drawer"
        direction="ttb"
        size="100%">
            <ul class="menu-list">
                <li @click="goToOnboarding">About</li>
                <div class="spacer"></div>
                <li @click="goToLayer('flood')">Flood</li>
                <li @click="goToLayer('heat')">Heat</li>
                <li @click="goToLayer('65+')">65+</li>
                <li @click="goToLayer('income')">Income</li>
                <li @click="goToLayer('open-space')">Open Space</li>
                <li @click="goToLayer('green-roofs')">Green Roofs</li>
                <!-- This brings to "World Scale View" -->
                <li @click="goToLayer('explore')">Explore</li>
            </ul>
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
            stuff: 'no message yet'
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
            console.log(e)
            this.innerVisible=true
            this.$store.dispatch('updateOnboardingActiveModule', e)
        },
        next() {
            this.active++
            console.log('hello')
            // const layer = { layer: ['flood', 'heat'][Math.floor(Math.random() * 2)] }
            // console.log(layer)
            // window?.vuplex?.postMessage({ type: "layer", data: layer });
        },
        goToLayer(layer) {
            window?.vuplex?.postMessage({ type: "layer", data: { layer: layer }});
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
        handleClose(done) {
            this.$confirm('Are you sure you want to close this?')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        }
        
    },
    mounted() {
        this.$store.dispatch('getOnboardingModules', true)
        this.$store.dispatch('getOnboardingContent', true)

        if (process.browser) {
            this.window = window

            // if (this.window.vuplex) {
            //     this.stuff = 'vuplex is here'
            //     addMessageListener();
            //     this.stuff = 'addMessageListener has been called'
            // } else {
            //     console.log('adding listener')
            //     this.window.addEventListener('vuplexready', addMessageListener);
            //     this.stuff = 'vuplex isnt here yet'
            // }

            // function addMessageListener() {
            //     this.stuff = 'vuplex is ready, no message received yet'
            //     this.window.vuplex.addEventListener('message', function(event) {
            //         let json = event.data;
            //         // > JSON received: { "type": "greeting", "message": "Hello from C#!" }
            //         this.stuff = JSON.stringify(json)
            //     });
            // }
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

.el-row h1,h2,h3,h4,h5,p,a {
    /* color: white; */
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
    font-size: 30px;
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

ul.menu-list {
  list-style-type: none;
  padding-left: 0px;
}

ul.menu-list li {
    font-size: 24px;
    padding: 4px 0px 4px 40px;
}

ul.menu-list li:first-child {
    padding-bottom: 16px;
}
/* 
ul.menu-list li:nth-child(2) {
    padding-top: 16px;
} */

.spacer {
    padding-bottom: 16px;
    border-top: 1px solid lightgrey;
}

.button-spacer {
    display: flex;
    justify-content: space-between;
}

ul.menu-list li:hover {
    background: lightgrey;
}

</style>