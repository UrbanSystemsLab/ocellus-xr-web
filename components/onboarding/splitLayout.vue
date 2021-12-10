<template>
    <div>
        <div>
            <h2>{{title}}</h2>
            <span v-html="content"></span>
        </div>
        <div id="wrapper">
            <map-carousel v-if="layout === 'map-carousel'"/>
            <img-carousel v-if="layout === 'image-carousel'" />
            <accordion-list v-if="layout === 'accordion-list'" />
        </div>
    </div>
</template>

<script>
import accordionList from './accordionList.vue'
import ImgCarousel from './imgCarousel.vue'
import MapCarousel from './mapCarousel.vue'
export default {
    name: 'splitLayout',
    props: ['title', 'layout', 'content'],
  components: { accordionList, ImgCarousel, MapCarousel },
    computed: {
        onboarding() {return this.$store.getters.getOnboarding},
    },
}
</script>

<style scoped>
    p {
         word-wrap: normal;
    }
</style>