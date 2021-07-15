<template>
    <div id="onboarding-button">
        <el-button @click="dialogVisible=true" type="info" size="small" id="onboarding" icon="el-icon-info" circle>
        </el-button>
        <el-dialog
        :visible.sync="dialogVisible"
        fullscreen=true
        modal=true
        :modalAppendToBody="false">
        <el-row>
        <h1>Climate Equity XR</h1>
        By: <a href="https://urbansystemslab.com/" onclick="window.open('https://urbansystemslab.com', '_system'); return false;">Urban Systems Lab</a>
        </el-row>
        <el-row>
          <p>Climate change affects communities in different ways. But how and why? The Climate Equity XR app provides interactive geospatial maps and 3D visualizations of heat, flood risk and other climate risk indicators in New York City. It experiments with augmented reality layers that allow you to project interactive maps onto a physical surface.</p>
        </el-row>
        <el-row>
            <h2>Am I affected by climate change?</h2>
            </el-row>
            <el-row>
                <p>Yes! In New York City, we are exposed to multiple climate and weather-related hazards, from heat waves to hurricanes and floods. But some communities are more affected than others. Select below to learn more about how these climate risks affect you.</p>
            </el-row>
            <el-row>
                <el-col :span="20">
                    <el-button type="primary" v-for="(item, itemKey) in onboarding.modules" :key="itemKey">
                        <h3>{{item.name}}</h3>
                    </el-button>
                </el-col>
            </el-row>
        <!-- <el-carousel indicator-position="outside" :autoplay="false">
            <el-carousel-item v-for="(item, itemKey) in onboarding.modules" :key="itemKey">
            <div v-html= "item.name"></div>
            
            </el-carousel-item>
        </el-carousel>   -->
        </el-dialog>
    </div>
</template>

<script>
export default {
    setup() {
        
    },
    data() {
        return {
            dialogVisible: false
        }
    },
    methods: {
    
    },
    computed: {
        onboarding() {return this.$store.getters.getOnboarding},
    },
    mounted() {
        this.$store.dispatch('getOnboardingContent', true)
    }
}
</script>

<style>

div #onboarding-button {
    z-index: 10;
}

#onboarding {
    margin-left: 90vw;
    margin-top: 90vh;
}

.el-carousel__container {
    position: relative;
    height: 40vh;
    text-align: center;
    margin: auto;
    width: 100%;
}

.el-carousel__item {
    padding: 25px;
    border-radius: 10px;
    background-color: #99a9bf;
}

  /* .el-carousel__arrow--left, .el-carousel__arrow--right {
      top: 90vh;
  } */

</style>