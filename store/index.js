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
})

export const getters = {
    getMobileDevice: (state) => { return state.isMobileDevice },
    getAllMaps: (state) => { return state.allMaps },
}

export const mutations = {
    storeMobileDevice: (state, payload) => {
        state.isMobileDevice = payload
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
    getAllMaps: function(state) {
        return new Promise((resolve, reject) => {
            var mapsRefPublic = db.ref('maps/public')

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
}