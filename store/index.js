import Vue from 'vue'
import Vuex from 'vuex'

import firebase from 'firebase'
import 'firebase/storage'

Vue.use(Vuex)

if (!firebase.apps.length) {
    firebase.initializeApp(process.env.firebaseConfig)
}
  
var db = firebase.database()
var storage = firebase.storage()
var storageRef = storage.ref()

var mapsRefPublic = db.ref('maps/public')

var publicMaps
mapsRefPublic.on('value', (snapshot) => {
    publicMaps = Object.assign({}, snapshot.val())
    console.log(publicMaps)
})

export const state = () => ({
    allMaps : {},
    active: {
        location: null,
        locationKey: null,
        categories: {},
        maps: {},
        content: {},
        currentMap: {},
        satelliteMap: false,
    },
    // Mobile device flag
    isMobileDevice: false,
    // Map state
    mapbox: {
        style: {
        loaded: false
        },
        'visibleLayers': [],
        'visibleSources': []
    }
})

export const getters = {
    getMobileDevice: (state) => { return state.isMobileDevice },
    getMapLoadedState: (state) => { return state.mapbox.style.loaded },
    getActiveMapPosition: (state) => { if (state.active.location) { return state.active.location.mapPosition } },
    getAllMaps: (state) => { return state.allMaps },
    getSources: (state) => { return state.sources },
}

export const mutations = {
    storeMobileDevice: (state, payload) => {
        state.isMobileDevice = payload
    },
    // Indicates if map is loaded
    storeMapLoadedState: (state, payload) => {
        state.mapbox.style.loaded = payload
    },
    storeMapPosition: (state, payload) => {
        state.active.mapPosition = Object.assign({}, payload)
    },
    storeAllMaps: (state, payload) => {
        state.allMaps = Object.assign({}, payload)
    },
}

export const actions = {
    setMobileDevice: function(store, payload) {
        if (typeof(payload) === 'boolean') {
            store.commit('storeMobileDevice', payload)
        }
    },
    setMapLoadedState: function(store, flag) {
        store.commit('storeMapLoadedState', flag)
    },
    getAllMaps: function(state) {
        return new Promise((resolve, reject) => {
            var mapsRefPublic = db.ref('maps/public')
            var sources = Object.values(store.getters.getSources)

            var publicMaps
            mapsRefPublic.on('value', (snapshot) => {
                publicMaps = Object.assign({}, snapshot.val())
            })
            var maps = Object.assign({}, publicMaps)
            console.log(maps);
            state.commit('storeAllMaps', maps)
            resolve(maps)
            })
            .catch((error) => { reject(error) })
    },
    getSources: function(store) {
        return new Promise((resolve, reject) => {
          var sourcesRefPublic = db.ref('sources/public')
        //   var sourcesRefPrivate = db.ref('sources/private')
        //   var activeUser = store.getters.getActiveUser
          var publicSources
        //   var privateSources
    
          sourcesRefPublic.once('value')
            .then(function(snap) {
              publicSources = Object.assign({}, snap.val())
              for (let sourceKey in publicSources) {
                if (publicSources.hasOwnProperty(sourceKey)) {
                  publicSources[sourceKey]['visibility'] = 'public'
                }
              }
            //   if (activeUser.email && activeUser.emailVerified) return sourcesRefPrivate.once('value')
            //   else return false
            })
            .then(function(snap) {
            //   // check if authenticated
            //   if (snap != false){
            //     // get private sources
            //     privateSources = Object.assign({}, snap.val())
            //     for (let sourceKey in privateSources){
            //       if (privateSources.hasOwnProperty(sourceKey)){
            //         privateSources[sourceKey]['visibility'] = 'private'
            //       }
            //     }
            //   }
            //   var allSources = Object.assign({}, publicSources, privateSources)
            var allSources = Object.assign({}, publicSources)
              store.commit('storeSources', allSources)
              resolve(allSources)
            })
            .catch((error) => { reject(error) })
        })
      },
      updateSources: function(store, payload) {
        return new Promise((resolve, reject) => {
          var sources = Object.assign({}, payload)
          // create new sources object separating public and private
          var newSources = { 'public': {}, 'private': {}}
          for (var key in sources){
            if (sources.hasOwnProperty(key)){
              var visibility = sources[key].visibility
              delete sources[key].visibility
              newSources[visibility][key] = sources[key]
            }
          }
          db.ref('sources').set(newSources)
          resolve()
        })
      },
}