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

export const mutations = () => {

}

export const actions = () => {

}

export const getters = () => {

}