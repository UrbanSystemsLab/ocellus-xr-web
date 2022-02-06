<template>
    <div id="onboarding-flow">
        <span id="onboarding-button">
            <el-button @click="dialogVisible=true" type="primary" size="medium" id="onboarding" icon="el-icon-question" circle>
            </el-button>
        </span>
        <el-dialog
        :visible.sync="dialogVisible"
        :fullscreen=true
        :show-close=false
        :modal=true
        :modalAppendToBody="false">
            <i class="el-icon-menu menu-icon"></i>
            <div v-if="Object.keys(onboarding.modules).length !== 0">
                {{ this.window.vuplex ? 'exists' : 'does not exist' }}
                <h1 v-if="onboarding.modules[0].slides[active].title">
                    {{ onboarding.modules[0].slides[active].title }}
                </h1>
                <onboarding-contents
                v-for="content in slides[active].content"
                :key="content[0]"
                v-bind:data-content="content"></onboarding-contents>
                <!-- {{ renderContent('a') }} -->
                <!-- <p>
                    {{ slides[active] }}
                </p> -->
            </div>
            <button v-on:click="prev">Prev</button>
            <button v-on:click="next">Next</button>
            <button v-on:click="next">Lat/Long</button>
            <!-- {{ JSON.stringify(slides) }} -->
        </el-dialog>
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
            window: {}
        }
    },
    computed: {
        onboarding() {
            console.log('computed called/', this.$store.getters.getOnboarding)
            return this.$store.getters.getOnboarding
        },
        slides() {
            console.log('hello')
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
            console.log('next', JSON.stringify(this.onboarding))
            this.active++
            const layer = { layer: ['flood', 'age', 'heat', 'trees', 'income', 'open space', 'green top'][Math.floor(Math.random() * 7)] }
            console.log(layer)
            window?.vuplex?.postMessage({ type: "layer", data: layer });
        },
        prev() {
            console.log('prev')
            this.active--
        },

        
    },
    mounted() {
        this.$store.dispatch('getOnboardingModules', true)
        this.$store.dispatch('getOnboardingContent', true)

        if (process.browser) {
            console.log('The window object:', window)
            this.window = window
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
}

#onboarding-button {
    /* margin: 15px; */
    right: 25px;
    top: 25px;
    position: absolute;
}

.el-dialog a {
    color: black;
}

div .el-dialog {
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
    top: 20px;
    font-size: 30px;
    /* cursor doesn't matter on mobile */
    cursor: pointer;
}

#onboarding-flow .el-dialog .el-button {
    background-color: transparent;
    color: black;
    margin: 0.3em;
    border-color: black;
}

#onboarding-flow .el-dialog .el-button:hover {
    background-color: rgba(255, 255, 255, 0.3);
    margin: 0.3em;
    border-color: white;
}

</style>