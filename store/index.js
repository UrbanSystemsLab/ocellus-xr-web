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

export const state = () => ({
    // All project locations
    locations: {},
    // All Map data sources
    sources: {},
    // All project maps
    allMaps : {},
    // Active state proerties
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
    },
    // All onboarding content
    onboarding: {}
})

export const getters = {
    getMobileDevice: (state) => { return state.isMobileDevice },
    getMapLoadedState: (state) => { return state.mapbox.style.loaded },
    getActiveLocation: (state) => { return { location: state.active.location, locationKey: state.active.locationKey } },
    getActiveMapPosition: (state) => { if (state.active.location) { return state.active.location.mapPosition } },
    getActiveMaps: (state) => { return state.active.maps },
    getAllMaps: (state) => { return state.allMaps },
    getLocations: (state) => { return state.locations },
    getSources: (state) => { return state.sources },
    getOnboarding: (state) => {return state.onboarding},
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
    getAllMaps: function(store) {
        return new Promise((resolve, reject) => {
            var mapsRefPublic = db.ref('maps/public')
            var sources = Object.values(store.getters.getSources)

            var publicMaps
            mapsRefPublic.on('value', (snapshot) => {
                    publicMaps = Object.assign({}, snapshot.val())
                    var maps = Object.assign({}, publicMaps)
                    // console.log(maps);
                    store.commit('storeAllMaps', maps)
                    resolve(maps)
                })
            })
    },
    loadActiveMaps: function(store) {
        return new Promise((resolve, reject) => {
          var activeLocation = store.getters.getActiveLocation
          var activeLocationKey = activeLocation.locationKey
          var activeMaps = store.getters.getActiveMaps
          var allMaps = store.getters.getAllMaps
          for (var map in allMaps) {
            if (allMaps[map].location === activeLocationKey) {
              activeMaps[map] = Object.assign({}, allMaps[map])
            }
          }
          store.commit('storeActiveMaps', activeMaps)
          resolve(activeMaps)
        })
      },
      updateActiveMaps: function(store, { activeMaps }) {
        var activeLocation = store.getters.getActiveLocation
        var activeLocationKey = activeLocation.locationKey
        var old_activeMaps = store.getters.getActiveMaps
        var new_activeMaps = activeMaps
        // Save New Maps
        for (var new_map in new_activeMaps) {
    
          var visibility = new_activeMaps[new_map].visibility
          delete new_activeMaps[new_map].visibility
    
          db.ref('maps/' + visibility + '/' + new_map).set(new_activeMaps[new_map])
        }
        // Remove deleted maps
        for (var old_map in old_activeMaps) {
          var visibility = old_activeMaps[old_map].visibility
          var deleted = true
          for (var new_map in new_activeMaps) {
            if (old_map === new_map) {
              deleted = false
            }
          }
          if (deleted) {
            db.ref('maps/' + visibility + '/' + old_map).remove()
          }
        }
      },
    getLocations: function(store) {
        return new Promise((resolve, reject) => {
            var locationsRefPublic = db.ref('locations/public')
            var publicLocations
            locationsRefPublic.on('value', (snapshot) => {
              publicLocations = Object.assign({}, snapshot.val())
              for (let loc in publicLocations) {
                if (publicLocations.hasOwnProperty(loc)) {
                  publicLocations[loc]['visibility'] = 'public'
                }
              }
              var locations = Object.assign({}, publicLocations)
              store.commit('storeLocations', locations)
              if (!store.state.active.location) {
                db.ref('defaultLocation').once('value').then((defaultLocationKey) => {
                  for (var locationKey in locations) {
                    if (locations.hasOwnProperty(locationKey) && locationKey === defaultLocationKey.val()) {
                      store.commit('storeActiveLocation', { location: locations[locationKey], locationKey: locationKey })
                      resolve()
                    }
                  }
                })
              }
              resolve(locations)
            })
        })
    },

    setActiveLocation: function(store, { location, locationKey }) {
        store.commit('storeActiveLocation', { location: location, locationKey: locationKey })
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
      getOnboardingContent: function(store) {
        return new Promise((resolve, reject) => {
            var onboardingContent = db.ref('contents/equityAR-onboarding')
            
            var carousels
            onboardingContent.on('value', (snapshot) => {
                    carousels = Object.assign({}, snapshot.val())
                    var slides = Object.assign({}, carousels)
                    store.commit('storeOnboarding', slides)
                    resolve(slides)
                })
            })
    },
}

export const mutations = {
    storeMobileDevice: (state, payload) => {
        state.isMobileDevice = payload
    },
    // Indicates if map is loaded
    storeMapLoadedState: (state, payload) => {
        state.mapbox.style.loaded = payload
    },
    storeSources: (state, payload) => {
        state.sources = Object.assign({}, payload)
    },
    storeLocations: (state, payload) => {
        state.locations = Object.assign({}, payload)
    },
    storeMapPosition: (state, payload) => {
        state.active.mapPosition = Object.assign({}, payload)
    },
    storeActiveLocation: (state, { location, locationKey }) => {
        state.active.location = Object.assign({}, location)
        state.active.locationKey = locationKey
    },
    storeActiveMaps: (state, payload) => {
        state.active.maps = Object.assign({}, payload)
    },
    storeAllMaps: (state, payload) => {
        state.allMaps = Object.assign({}, payload)
    },
    storeOnboarding: (state, payload) => {
      state.onboarding = Object.assign({}, payload)
    }
}