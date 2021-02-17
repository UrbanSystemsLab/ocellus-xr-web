<template>
    <div>
        <div id="response">
            <h3>
            Click inside the map to return features within a 400 m radius.
            </h3>
            <div>
            Chosen location:<span id="clicklocation"></span>
            </div>
            <strong>Response<br/></strong>
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

#response {
/*   width: 20%;  */
  height: 50vh;
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
  height: 25vh;
  padding: 1em;
  overflow: auto;
}

#feature-json code {
  overflow: scroll;
  padding: 0px;
  margin: 0px;
}

</style>