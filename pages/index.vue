<template>
  <div>
    <main>
      <mapView />
      <div id="response">
        <h2>
          Click inside the map to return features within a 400 m radius.
        </h2>
        <div>
          Chosen location:<span id="clicklocation"></span>
        </div>
        <strong>Response<br/></strong>
        <div id="feature-json">
        <code></code>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import mapView from '~/components/mapView.vue'
  export default {

    components: {
      mapView
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

#map {
/*   width: 80%;  */
  height: 800px;
  opacity: 1;
  z-indez: -100;
}

#response {
/*   width: 20%;  */
  height: 100vh;
  background-color: #f4f7fb;
  z-index: 100;
  opacity: 1;
}

#response * {
  margin: 10px 32px;

}

#feature-json {
  background-color: #FFFFFF;
  border-radius: 10px;
  height: 85vh;
  padding: 1em;
  overflow: auto;
}

#feature-json code {
  overflow: scroll;
  padding: 0px;
  margin: 0px;
}
</style>
