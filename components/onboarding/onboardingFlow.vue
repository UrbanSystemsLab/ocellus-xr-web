<template>
    <div>
        <span id="onboarding-button">
            <el-button @click="dialogVisible=true" type="primary" size="medium" id="onboarding" icon="el-icon-question" circle>
            </el-button>
        </span>
        <el-dialog
        :visible.sync="dialogVisible"
        :fullscreen=true
        :modal=true
        :modalAppendToBody="false">
            <el-row>
                <h1>Climate Equity XR</h1>
                By: <a href="https://urbansystemslab.com/" onclick="window.open('https://urbansystemslab.com', '_system'); return false;">Urban Systems Lab</a>
            </el-row>
            <el-row>
                <p>Climate change affects communities in different ways. But how and why? The Climate Equity XR app provides interactive geospatial maps and 3D visualizations of heat, flood risk and other climate risk indicators in New York City. It experiments with augmented reality layers that allow you to project interactive maps onto a physical surface.</p>
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
            <el-dialog
            :visible.sync="innerVisible"
            :fullscreen=true
            append-to-body>
                <el-carousel indicator-position="outside" :autoplay="false">
                    <el-carousel-item v-for="(item, itemKey) in onboarding.contents" :key="itemKey">
                    <!-- <div v-html= "item.title"></div> -->
                    <split-layout v-bind:title="item.title" v-bind:layout="item.body.template" v-bind:content="item.body.content"/>
                    <!-- {{domDecoder(item.body.content)}} -->
                    <!-- <div v-html= "item.body"></div> -->
                    </el-carousel-item>
                </el-carousel>  
            </el-dialog>
        
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
            dialogVisible: false,
            innerVisible: false
        }
    },
    methods: {
        moduleButtonClick: function(e){
            console.log(e)
            this.innerVisible=true
            this.$store.dispatch('updateOnboardingActiveModule', e)
        },
        domDecoder (str) {
            let parser = new DOMParser();
            let htmlFrame = '<!doctype html><head><link rel=' + `"` + 'stylesheet' + `"` + 'href=' + `"` + 'https://unpkg.com/element-ui/lib/theme-chalk/index.css' + `"`+ '><script src=' + `"` + 'https://unpkg.com/element-ui/lib/index.js' + `"` + '><\/script></head><body>';
            let dom = parser.parseFromString(htmlFrame + str, 'text/html');
            return dom.body.textContent;
        },
    },
    computed: {
        onboarding() {return this.$store.getters.getOnboarding},
    },
    mounted() {
        this.$store.dispatch('getOnboardingModules', true)
        this.$store.dispatch('getOnboardingContent', true)
    }
}
</script>

<style>
div {
    z-index: 2
}

#onboarding-button {
    /* margin: 15px; */
    right: 25px;
    top: 25px;
    position: absolute;
}

#onboarding {
    top: 90vh;
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

</style>