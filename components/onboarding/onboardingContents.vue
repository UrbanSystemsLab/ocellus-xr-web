<template>
    <div class="content-container">
        <!-- p tag, small text -->
        <p v-if="dataContent.type === 'p'">
            {{ dataContent.text }}
        </p>

        <!-- img tag, displays an img -->
        <el-image v-if="dataContent.type === 'img'" :src="dataContent.source"></el-image>
 
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
        :interval="2000"
        arrow="always"
        height="400px">
            <el-carousel-item v-for="(image, index) in dataContent.images" :key="index">
                <el-image :src="image"></el-image>
            </el-carousel-item>
        </el-carousel>

        <!-- text-carousel tag, displays an image carousel under text -->
        <div v-if="dataContent.type === 'text-carousel'">
            <p>{{ carouselText === '' ? dataContent.content[0].text : carouselText }}</p>

            <el-carousel
            :interval="2000"
            arrow="always"
            height="400px">
                <el-carousel-item v-for="(image, index) in dataContent.content" :key="index">
                    <el-image :src="image"></el-image>
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
    props: ['dataContent'],
    data() {
        return {
            activeCollapse: '0',
            carouselText: ''
        }
    },
    methods: {
        carouselChange: function(item) {
            this.carouselText = item.text
        }
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

    p {
        font-weight: 300;
    }
</style>