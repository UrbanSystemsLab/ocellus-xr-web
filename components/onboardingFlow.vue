<template>
    <div>
        <el-carousel indicator-position="outside" :autoplay="false">
            <!-- <el-carousel-item v-for="(slide, slideKey) in onboarding" :key="slideKey">
            <h3>{{ slide }}</h3>
            </el-carousel-item> -->
            <el-carousel-item v-for="(item, itemKey) in onboarding" :key="itemKey">
            <div v-html= "item.content"></div>
            </el-carousel-item>
        </el-carousel>  
    </div>
</template>

<script>
export default {
    setup() {
        
    },
    data() {
        return {

        }
    },
    computed: {
        onboarding() {return this.$store.getters.getOnboarding},
    },
    mounted() {
        // console.log(onboarding)
        this.$store.dispatch('getOnboardingContent', true)
    }
}
</script>

<style>

.el-carousel {
    z-index: 100;
}

.el-carousel__container {
    position: relative;
    height: 90vh;
    text-align: center;
    margin: 5vh auto;
}

.el-carousel__item {
    padding: 25px;
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .el-carousel__arrow--left, .el-carousel__arrow--right {
      top: 85vh;
  }

</style>