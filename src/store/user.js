import * as fb from 'firebase'

class User {
    constructor(id) {
        this.id = id
    }
}

export default {
    state: {
        user: null,
    },

    mutations: {
        setUser(state, playload) {
            state.user = playload;
            console.log('SETUSER --- MUTATION')
        }
    },

    actions: {
        async registerUser({commit}, payload) {
            commit('clearError')
            commit('setLoading', true)

            try {
                const user = await fb.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                commit('setUser', new User(user.uid))
                commit('setLoading', false)
            } catch(e) {
                commit('setLoading', false)
                commit('setError', e.message)
                throw e
            }
            console.log('ASYNC REGISTER USER --- ACTION')
        },

        async loginUser({commit}, payload) {
            commit('clearError')
            commit('setLoading', true)

            try {
                const user = await fb.auth().signInWithEmailAndPassword(payload.email, payload.password)
                commit('setUser', new User(user.uid))
                commit('setLoading', false)
            } catch(e) {
                commit('setLoading', false)
                commit('setError', e.message)
                throw e
            }
            console.log('ASYNC LOGIN USER --- ACTION')
        },

        activeUser({commit}, payload) {
            commit('setUser', new User(payload.uid))
            console.log('ACTIVE USER --- ACTION')
        },

        logoutUser({commit}) {
            fb.auth().signOut()
            commit('setUser', null)
            console.log('LOGOUT USER --- ACTION')
        }
    },

    getters: {
        user(state) {
            return state.user
        },

        loggedUser(state) {
            return state.user !== null
        }
    }
}