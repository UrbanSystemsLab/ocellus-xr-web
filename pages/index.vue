<template>
  <div>
    Hello 
  </div>
</template>

<script>
  export default {
    /* Get data on Server Side: */
    asyncData: function (context) {

    },
    /**  Bind Vuexfire on client-side: */
    mounted() {
      
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

@media (max-width: 800px){
  .flex-container {
    display: flex;
    flex-direction: column;
  }
}

@media (min-width: 801px) {
  .flex-container {
    flex-direction: row;
  }
}

</style>
