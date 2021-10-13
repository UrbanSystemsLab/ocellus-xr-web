<template>
    <div id="onboarding-flow">
        <span id="onboarding-button">
            <el-button @click="dialogVisible=true" type="primary" size="medium" id="onboarding" icon="el-icon-question" circle>
            </el-button>
        </span>
        <el-dialog
        :visible.sync="dialogVisible"
        :fullscreen=false
        :modal=true
        :modalAppendToBody="false">
            <el-row>
                <h1>Climate Equity XR</h1>
                <p>Created by the <a href="https://urbansystemslab.com/" onclick="window.open('https://urbansystemslab.com', '_system'); return false;">Urban Systems Lab</a></p>
            </el-row>
            <el-row>
                <p>Climate change affects communities in different ways. But how and why? This app provides interactive geospatial maps and 3D visualizations of heat, flood risk, and other climate risk indicators in New York City. It experiments with augmented reality layers that allow your to project interactive maps onot a physical surface.</p>
            </el-row>
            <el-row>
                <h3>Am I affected by climate change?</h3>
            </el-row>
            <el-row>
                <p>Yes! In New York City, we are exposed to multiple climate and weather-related hazards, from heat waves to hurricanes and floods. But some communities are more affected than others. Select below to learn more about how these climate risks affect you.</p>
            </el-row>
            <el-row v-for="module in onboarding.modules" style="display: flex; justify-content: center;" v-bind:key="module.name">
                <el-button type="primary" @click="moduleButtonClick(module)">
                    <h3>{{module}}</h3>
                </el-button>
            </el-row>
            <!-- <el-dialog
            :visible.sync="innerVisible"
            :fullscreen=false
            append-to-body>
                <el-carousel indicator-position="outside" :autoplay="false">
                    <el-carousel-item v-for="(item, itemKey) in onboarding.contents" :key="itemKey">
                        <split-layout v-bind:title="item.title" v-bind:layout="item.body.template" v-bind:content="item.body.content"/>
                    </el-carousel-item>
                </el-carousel>  
            </el-dialog> -->
        
        </el-dialog>
    </div>
</template>

<script scoped>
import splitLayout from './splitLayout.vue'
export default {
  components: { splitLayout },
    props: {
    },
    data() {
        return {
            dialogVisible: true,
            innerVisible: false
        }
    },
    computed: {
        onboarding() {return this.$store.getters.getOnboarding},
    },
    methods: {
        moduleButtonClick: function(e){
            console.log(e)
            this.innerVisible=true
            this.$store.dispatch('updateOnboardingActiveModule', e)
        },
    },
    mounted() {
        this.$store.dispatch('getOnboardingModules', true)
        this.$store.dispatch('getOnboardingContent', true)
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

div .el-dialog {
    background-color: #5b8145;
    opacity: 0.8;
    width: 90vw;
    margin: 5vw !important;
    height: 95vh;
    overflow-y: hidden;
}

.el-row h1,h2,h3,h4,h5,p,a {
    color: white;
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

#onboarding-flow .el-dialog .el-button {
    background-color: transparent;
    color: white;
    margin: 0.3em;
    border-color: white;
}

#onboarding-flow .el-dialog .el-button:hover {
    background-color: grey;
    margin: 0.3em;
    border-color: white;
}

</style>