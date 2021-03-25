import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export const state = () => ({
    count: 1,
    allMaps : {},
    active: {
        location: null,
        locationKey: null,
        categories: {},
        maps: {},
        content: {},
        currentMap: {},
        satelliteMap: false,
    }
})

export const mutations = {
    storeAllMaps: (state, payload) => {
        state.allMaps = Object.assign({}, payload)
    },
}

export const actions = {
    getAllMaps: function(state) {
        return new Promise((resolve, reject) => {
            var mapsRefPublic = this.$fire.database.ref('maps/public')
            // var mapsRefPrivate = db.ref('maps/private')
            // var activeUser = store.getters.getActiveUser
            // var sources = Object.values(store.getters.getSources)

            var publicMaps
            // var privateMaps
            mapsRefPublic.once('value')
            .then(function(snapshot) {
                publicMaps = Object.assign({}, snapshot.val())
                for (let map in publicMaps) {
                // if (publicMaps.hasOwnProperty(map)) {
                //     publicMaps[map]['visibility'] = 'public'
                // }
                }
                // // Get private maps
                // if (activeUser.email && activeUser.emailVerified) return mapsRefPrivate.once('value')
                // else return false
            })
            // .then(function(snap) {
            //     if (snap !== false) {
            //     privateMaps = Object.assign({}, snap.val())
            //     for (let map in privateMaps) {
            //         if (privateMaps.hasOwnProperty(map)) {
            //         privateMaps[map]['visibility'] = 'private'
            //         }
            //     }
            //     }
                // // var maps = Object.assign({}, publicMaps, privateMaps)
                // var maps = Object.assign({}, publicMaps)

                // // aggregate sources into allMaps object
                // for (var map of Object.values(maps)) {
                // if (map.layers){

                //     //go through all layers and find matching sources
                //     let matchingSources = Object.values(map.layers).map(layer => {
                //     return sources.filter(source => source.id === layer.source)
                //     }).flat()

                //     // to get only unique values
                //     map.sources = [... new Set (matchingSources)]
                // }

                // }
                state.commit('storeAllMaps', maps)
                resolve(maps)
                console.log(maps)
            })
            .catch((error) => { reject(error) })
        },
}

export const getters = {
    getAllMaps: (state) => { return state.allMaps },
}