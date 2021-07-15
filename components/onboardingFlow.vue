<template>
    <div>
        <el-carousel indicator-position="outside" :autoplay="false">
            <!-- <el-carousel-item v-for="(slide, slideKey) in onboarding" :key="slideKey">
            <h3>{{ slide }}</h3>
            </el-carousel-item> -->
            <el-carousel-item v-for="item in 10" :key="item">
            <h3>{{ item }}</h3>
            </el-carousel-item>
        </el-carousel>  
    </div>
</template>

<script>
export default {
    setup() {
        
    },
}
</script>

<style>

.el-carousel__container {
  z-index: 2;
  position: relative;
  height: 80vh;
  text-align: center;
}

.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 80vh;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

</style>