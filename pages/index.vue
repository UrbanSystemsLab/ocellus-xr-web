<template>
  <div>
    Hello 
    <button @click="readFromRealtimeDb()">Read from Realtime DB</button>
  </div>
</template>

<script>
  export default {
    /* Get data on Server Side: */
    // async fetch({app, store}) {
    //   if (process.browser) return
    //   try {
    //     const ref = app.$fire.database()
    //     } catch (e) {
    //       console.error(e)
    //     }
    // },
    /**  Bind Vuexfire on client-side: */
    mounted() {
      // console.log(ref)
    },
    methods: {
      async readFromRealtimeDb() {
        const mapsRef = this.$fire.database.ref('maps').orderByKey()
        try {
          console.log(mapsRef)
          // const snapshot = await mapsRef.once('value')
          // alert(snapshot.val().message)
        } catch (e) {
          alert(e)
        }
      },
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
