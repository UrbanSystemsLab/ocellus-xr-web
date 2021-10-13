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
var styleStoreRef = storageRef.child('style/style.json')

export const state = () => ({
    // Map style
    style: {},
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
    onboarding: {
      activeModule: "",
      modules: {},
      contents: {}
    }
})

export const getters = {
    getMobileDevice: (state) => { return state.isMobileDevice },
    getMapLoadedState: (state) => { return state.mapbox.style.loaded },
    getStyle: (state) => { return state.style },
    getActiveLocation: (state) => { return { location: state.active.location, locationKey: state.active.locationKey } },
    getActiveContent: (state) => { return state.active.content },
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
    getStyle: function(store) {
      return new Promise((resolve, reject) => {
        styleStoreRef.getDownloadURL()
          .then((style) => {
            console.log(style)
            resolve(style)
          })
          .catch(function(error) {
            switch (error.code) {
              case 'storage/object-not-found':
                // File doesn't exist
                // Set Default Style
                store.dispatch('setDefaultStyle')
                break
            }
          })
        })
      },
      setDefaultStyle: function(store) {
        return new Promise((resolve, reject) => {
          styleStoreRef.putString(JSON.stringify(styleTemplate))
            .then(function(snapshot) {
              alert('Default style set!')
              location.reload()
            })
        })
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

    setLocationVisibility: function(store, { locationKey, location, visibility }) {
      return new Promise((resolve, reject) => {
        db.ref('locations').child(location.visibility).child(locationKey).once('value')
          .then((snap) => {
            // Copy location to the other visibility group
            // Warning: No unique key validation
            return db.ref('locations').child(visibility).child(locationKey).set(snap.val())
          })
          .then(() => {
            // Remove the original location
            return db.ref('locations').child(location.visibility).child(locationKey).remove()
          })
          .then(() => {
            resolve()
          })
          .catch((error) => { reject(error) })
      })
    },
    setMapVisibility: function(store, { mapKey, map, visibility }) {
      return new Promise((resolve, reject) => {
        db.ref('maps').child(map.visibility).child(mapKey).once('value')
          .then((snap) => {
            // Copy map to the other visibility group
            // Warning: No unique key validation
            return db.ref('maps').child(visibility).child(mapKey).set(snap.val())
          })
          .then(() => {
            // Remove the original map
            return db.ref('maps').child(map.visibility).child(mapKey).remove()
          })
          .then(() => {
            resolve()
          })
          .catch((error) => { reject(error) })
      })
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
      getOnboardingModules: function(store) {
        return new Promise((resolve, reject) => {
            var onboardingContent = db.ref('contents/equityAR-onboarding/modules')
            var allModules
            onboardingContent.on('value', (snapshot) => {
                    allModules = Object.assign({}, snapshot.val())
                    store.commit('storeOnboardingModules', allModules)
                    resolve(allModules)
                })
            })
      },
      getOnboardingContent: function(store) {
        return new Promise((resolve, reject) => {
            var onboardingContent = db.ref('contents/equityAR-onboarding/sliders')
            var allSlides
            onboardingContent.on('value', (snapshot) => {
                allSlides = Object.assign({}, snapshot.val())
                store.commit('storeOnboardingContent', allSlides)
                resolve(allSlides)
                })
            })
      },
      updateOnboardingActiveModule: function(store,payload) {
        store.commit('storeOnboardingModule', payload)
      },
      addVisibleLayer: (state, layerName) => {
        state.mapbox['visibleLayers'].push(layerName)
      },
      removeVisibleLayer: (state, layerName) => {
        let index = state.mapbox['visibleLayers'].indexOf(layerName)
        if(index !== -1){
          state.mapbox['visibleLayers'].splice(index, 1);
        }
      },
      addVisibleSource: (state, source) => {
        state.mapbox['visibleSources'].push(source)
      },
      removeVisibleSource: (state, sourceName) => {
        let index = state.mapbox['visibleSources'].indexOf(sourceName)
        if(index !== -1){
          state.mapbox['visibleSources'].splice(index, 1);
        }
      },
      emptyActiveContent: function(store) {
        return new Promise((resolve, reject) => {
          store.commit('emptyActiveContent')
          resolve()
        })
      },
      setActiveContent: function(store, { contentKey }) {
        return new Promise((resolve, reject) => {
          // Get content
          var content = null
          var contents = store.getters.getAllContents
          for (const key in contents) {
            if (key === contentKey) {
              content = contents[contentKey]
              store.commit('storeActiveContent', content)
              resolve(content)
            }
          }
          if (!content)
            reject('Content not found. Check permissions.')
        })
      },
      updateMap: function(store, { mapKey, map }) {
        return new Promise((resolve, reject) => {
          var visibility = map.visibility
          var payload = Object.assign({}, map)
          delete payload.visibility
          db.ref('maps/' + visibility + '/' + mapKey).set(payload)
            .then((value) => {
              resolve(value)
            })
        })
      },
}

export const mutations = {
    storeMobileDevice: (state, payload) => {
        state.isMobileDevice = payload
    },
    storeStyle: (state, payload) => {
      state.style = Object.assign({}, payload)
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
    storeOnboardingModules: (state, payload) => {
      state.onboarding.modules = Object.assign({}, payload)
    },
    storeOnboardingContent: (state, payload) => {
      state.onboarding.contents = Object.assign({}, payload)
    },
    storeOnboardingModule: (state, payload) => {
      state.onboarding.activeModule = payload
    },
    emptyActiveContent: state => {
      state.active.content = {}
    },
    emptyVisibleLayers: state => {
      state.mapbox.visibleLayers = []
    },
    emptyVisibleSources: state => {
      state.mapbox.visibleSources = []
    },
}