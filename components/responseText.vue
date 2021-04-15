<template>
    <div>
      <div id="header">
        <div ref="bmBurgerButton" class="bm-burger-button">
              <span class="bm-burger-bars line-style" :style="{top:20 * (index * 2) + '%'}" v-for="(x, index) in 3" :key="index"></span>
        </div>
      </div>
      <div id="response">
          <h1>Exploring Locally</h1>
          <h4>
          Click a point on the map to view features within a 5 minute walk.
          </h4>
          
          <div>
          <!-- Chosen location:<span id="clicklocation"></span> -->
          </div>
          <!-- <strong>Response<br/></strong> -->
          <div id="short-response"></div>
          <div id="feature-json">
              <code>
              </code>
          </div>
      </div>
    </div>
</template>

<script>
export default {
    name: 'responseText',
    data(){
      return {

      }
    }
}
</script>

<style scoped>

.bm-burger-button {
      position: absolute;
      width: 24px;
      height: 20px;
      left: 24px;
      top: 24px;
      cursor: pointer;
    }

.bm-burger-bars {
      background-color: #373a47;
    }
    .line-style {
      position: absolute;
      height: 20%;
      left: 0;
      right: 0;
    }

@media (max-width: 800px){
  #header {
    height: 8vh;
  }

  #response {
  /*   width: 20%;  */
    height: 42vh;
    /* background-color: #f4f7fb; */
    z-index: 100;
    opacity: 1;
  }

  #response * {
  margin: 10px 32px 0px 32px;

  }

  #feature-json {
    background-color: #FFFFFF;
    border-radius: 10px;
    height: 25vh;
    padding: 1em;
    overflow: auto;
  }

  #feature-json code {
    overflow: scroll;
    padding: 0px;
    margin: 0px;
  }
}

@media (min-width: 801px){
  #header {
    height: 8vh;
  }

  #response {
  /*   width: 20%;  */
    height: 92vh;
    /* width: 50vw; */
    /* background-color: #f4f7fb; */
    z-index: 100;
    opacity: 1;
  }

  #response * {
  margin: 1em 1em 0em 1em;

  }

  #feature-json {
    background-color: #FFFFFF;
    border-radius: 10px;
    height: 75vh;
    width: 40vw;
    /* padding: 1em; */
    overflow: auto;
  }

  #feature-json code {
    overflow: scroll;
    padding: 0px;
    margin: 0px;
  }
}

</style>