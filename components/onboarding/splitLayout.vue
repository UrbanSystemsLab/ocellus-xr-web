<template>
    <div>
        <div>
            <h2>What is Heat Risk?</h2>
            <p>Heat risk is a measure of how likely your health will be impacted by high temperatures or prolonged heat exposure. There are many factors associated with heat risk, including urban and green infrastructure, social vulnerability, and building density. To learn more, explore the concepts below.</p>
        </div>
        <div id="wrapper">
            <map-carousel v-if="1===0" />
            <img-carousel v-if="1===1" />
            <accordion-list v-if="1===0"/>
        </div>
    </div>
</template>

<script>
import accordionList from './accordionList.vue'
import ImgCarousel from './imgCarousel.vue'
import MapCarousel from './mapCarousel.vue'
export default {
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