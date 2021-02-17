<template>
  <div>
    <main class="flex-container">
      <responseText />
      <mapView />
    </main>
  </div>
</template>

<script>
import mapView from '~/components/mapView.vue'
import responseText from '~/components/responseText.vue'
  export default {

    components: {
      mapView,
      responseText
    }

  }
</script>

<style scoped>

body {
  margin: 0;
  line-height: 1.5em;
/*   opacity: 0; */
  background-color: rgba(0, 0);
}

main {
  display: grid;
  grid-template-columns: 6fr 4fr;
  grid-gap: 1em;
}

.flex-container {
  display: flex;
  flex-direction: column;
}

</style>
