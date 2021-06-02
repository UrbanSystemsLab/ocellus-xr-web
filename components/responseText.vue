<template>
    <div>
      <div id="response">
          <h1>Exploring Locally</h1>
          <h4>
          Click a point on the map to view features within a 5 minute walk.
          </h4>
          <el-button v-on:click=sendMsg()>Send Unity Message</el-button>
          <div id="unity-test">Unity Test</div>
          <div id="short-response"></div>
      </div>
    </div>
</template>

<script>
export default {
    name: 'responseText',
    data(){
      return {

      }
    },
    methods: {

      sendMessageToCSharp() {

        window.vuplex.postMessage({ type: 'test', message: 'Hello, Peilu!'});

        console.log("A message were passed to C#")
        
      },
      sendMsg() {
        if (window.vuplex) {
          this.sendMessageToCSharp()
        } else{
          console.log("Hello, Peilu!")
        }
      }
    }
}
</script>

<style scoped>

@media (max-width: 800px){

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
  /* #header {
    height: 8vh;
  } */

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