<template>
    <div class="content-container">
        <!-- p tag, small text -->
        <p v-if="dataContent.type === 'p'">
            {{ dataContent.text }}
        </p>

        <!-- html tag, small text -->
        <p v-if="dataContent.type === 'html'" v-html="dataContent.text"></p>

        <div v-if="dataContent.type === 'link'" >
          <a v-if="!isVuplex" :href="dataContent.ref" target="_blank">
            {{dataContent.text}}
          </a>
          <el-button class="vuplex-link" v-else @click="jumpToLink(dataContent.ref)" type="text">{{dataContent.text}}</el-button>
        </div>

        <div v-if="dataContent.type === 'list'"> {{dataContent.text}}</div>

        <!-- img tag, displays an img -->
        <div class="onboarding-image">
            <el-image v-if="dataContent.type === 'img'" :src="dataContent.source"></el-image>
        </div>

        <!-- button tag, displays an button with text and action -->
        <div
        class="intro-button"
        v-bind:style="{ width: width <= 500 ? '100%' : '75%'}"
        v-if="dataContent.type === 'button'"
        v-on:click="buttonEmitter(dataContent.action)">
            {{ dataContent.text }}
        </div>

        <!-- collapse tag, displays a collapsable panel -->
        <el-collapse
        v-if="dataContent.type === 'collapse'"
        v-model="activeCollapse"
        accordion>
            <el-collapse-item
            v-for="item in dataContent.content"
            :key="item.title"
            v-bind:title="item.title">
                <div>{{ item.text }}</div>
            </el-collapse-item>
        </el-collapse>

        <!-- carousel tag, displays an image carousel -->
        <el-carousel
          height="50vh"
        v-if="dataContent.type === 'carousel'"
        arrow="always"
        :autoplay="true">
            <el-carousel-item v-for="(image, index) in dataContent.images" :key="index">
                <el-image class="carousel-image" :src="image"></el-image>
            </el-carousel-item>
        </el-carousel>

        <!-- text-carousel tag, displays an image carousel under text -->
        <div v-if="dataContent.type === 'text-carousel'">
            <el-carousel
            arrow="always"
            :autoplay="true"
            v-on:change="test">
                <el-carousel-item v-for="(obj, index) in dataContent.content" :key="index">
                    <el-image fit="contain" class="carousel-image" :src="obj.image"></el-image>
                </el-carousel-item>
            </el-carousel>
            <p class="carousel-text">{{ dataContent.content[carouselIdx].text }}</p>
        </div>

      <div v-if="dataContent.type === 'text-carousel-minimal'">
        <el-carousel
          arrow="always"
          :autoplay="true"
          indicator-position="none"
          v-on:change="test">
          <el-carousel-item v-for="(obj, index) in dataContent.content" :key="index">
            <el-image fit="contain" class="carousel-image" :src="obj.image"></el-image>
          </el-carousel-item>
        </el-carousel>
        <p class="carousel-text">{{ dataContent.content[carouselIdx].text }}</p>
      </div>

        <!-- list of content -->
        <ul v-if="dataContent.type === 'li'">
            <li v-for="item in dataContent.content" :key="item">
                <onboarding-contents v-bind:data-content="item"></onboarding-contents>
            </li>
        </ul>
    </div>
</template>
<script scoped>
import da from "element-ui/src/locale/lang/da";
export default {
    name: 'onboarding-contents',
    props: ['dataContent', 'actions'],
    data() {
        return {
            activeCollapse: '0',
            carouselIdx: 0,
            carouselText: ''
        }
    },
    methods: {
        jumpToLink(ref){
          console.log(ref)
          // let message = {
          //   type: 'link',
          //   data: {
          //     link: {
          //       url: ref,
          //     },
          //     webview: false
          //   }
          // };
          window?.vuplex?.postMessage(ref);
          console.log('js-dev', 'menu message sent from JS to C#', ref);
        },
        carouselChange: function(item) {
            this.carouselText = item.text
        },
        buttonEmitter(event) {
            console.log(event)
            this.$emit(event)
        },
        test(a) {
            this.carouselIdx = a
            this.carouselText = this.dataContent.content[this.carouselIdx].text
            console.log(this.dataContent.content[this.carouselIdx].text)
        }
    },
    computed: {
      da() {
        return da
      },
      isVuplex(){
        return (typeof window.vuplex === 'undefined' ? false : true)
      },
        width() {
            return this.$store.getters.getScreenWidth
        },
        height() {
            return this.$store.getters.getScreenHeight
        },
    }
}
</script>

<style scoped>
    ul {
      padding-left: 0px;
      list-style: none;
      font-size: 13px;
    }
    ul ul {
      padding-left: 15px;
      list-style: none !important;
    }

    .content-container {
        margin: 8px 0px;
    }
    .vuplex-link{
      border: none !important;
    }

    .intro-button {
        margin: 0 auto;
        text-align: center;
        border: 1px solid black;
        border-radius: 10px;
        font-size: 30px;
        padding: 6px;
        margin-top: 1rem;
        cursor: pointer;
    }

    .el-image {
        display: flex;
        justify-content: center;
    }
    div[role=button] {
      /* CSS goes here */
      line-height: 0px !important;
    }

    .carousel {
        height: 100%;
        width: 100%;
        overflow-y: auto;
    }

    .carousel-text {
        padding-top: 1rem;
        background-color: white;
      font-size: 13px;
    }

    p {
        font-weight: 400;
    }
</style>
