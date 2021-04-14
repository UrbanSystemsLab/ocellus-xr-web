<template>
  <div>
    <main class="flex-container">
      <responseText />
      <mapView />
    </main>

  </div>
</template>

<script>
import firebase from 'firebase/app'
  export default {
    data() {
      return{
      }
    },
    computed: {
      // add line for if allMaps is nullnpm 
      allMaps() {return this.$store.getters.getAllMaps}
    },
    methods: {
      setupFirebaseAuth() {
        return new Promise((resolve, reject) => {
          var store = this.$store
        var db = firebase.database()
        if (!firebase.apps.length) {
          firebase.initializeApp(process.env.firebaseConfig)
        }
        })
      },
      loadProject() {
        //Initialize active map with default data
        return this.$store.dispatch('getAllMaps')
      }
    },
    mounted() {
      this.setupFirebaseAuth()
      .then(() => {
        console.log("Firebase set up");
        this.loadProject()
      })
    },
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
