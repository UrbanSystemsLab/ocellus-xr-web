<template>
    <div class="content-container">
        <!-- p tag, small text -->
        <p v-if="dataContent.type === 'p'">
            {{ dataContent.text }}
        </p>

        <!-- img tag, displays an img -->
        <div class="onboarding-image">
            <el-image fit="contain" v-if="dataContent.type === 'img'" :src="dataContent.source"></el-image>
        </div>

        <!-- button tag, displays an button with text and action -->
        <div
        class="intro-button"
        v-bind:style="{ width: width <= 500 ? '75%' : '50%'}"
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
        v-if="dataContent.type === 'carousel'"
        arrow="always"
        :height="width <= 500 ? '300px' : '400px'"
        :autoplay="false"
        v-on:change="test">
            <el-carousel-item v-for="(image, index) in dataContent.images" :key="index">
                <el-image class="carousel-image" :src="image"></el-image>
            </el-carousel-item>
        </el-carousel>

        <!-- text-carousel tag, displays an image carousel under text -->
        <div v-if="dataContent.type === 'text-carousel'">
            <p class="carousel-text">{{ dataContent.content[carouselIdx].text }}</p>
            <!-- <p v-else class="carousel-text">{{ carouselText }}</p> -->

            <el-carousel
            arrow="always"
            :height="width <= 500 ? '300px' : '400px'"
            :autoplay="false"
            v-on:change="test">
                <el-carousel-item v-for="(obj, index) in dataContent.content" :key="index">
                    <el-image fit="contain" class="carousel-image" :src="obj.image"></el-image>
                </el-carousel-item>
            </el-carousel>
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
        carouselChange: function(item) {
            this.carouselText = item.text
        },
        buttonEmitter(event) {
            this.$emit(event)
        },
        test(a) {
            this.carouselIdx = a
            this.carouselText = this.dataContent.content[this.carouselIdx].text
            console.log(this.dataContent.content[this.carouselIdx].text)
        }
    },
    computed: {
        width() {
            return this.$store.getters.getScreenWidth
        },
    }
}
</script>

<style scoped>
    li, ul {
        list-style: none;
        padding-left: 0px;
    }

    .content-container {
        margin: 8px 0px;
    }

    .intro-button {
        margin: 0 auto;
        width: 50%;
        text-align: center;
        border: 1px solid black;
        border-radius: 6px;
        font-size: 30px;
        padding: 6px;
        line-height: 30px;
        cursor: pointer;
    }

    .el-image {
        display: flex;
        justify-content: center;
    }

    .carousel-image {
        height: 100%;
    }

    .carousel-text {
        /* height: 230px; */
        background-color: white;
    }

    /* not sure how to target the indicators  */
    /* .el-carousel__button {
        background-color: grey;
    } */

    p {
        font-weight: 400;
    }
</style>