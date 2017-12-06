import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state : {
    publicInfos : [
      {id: '7-11-17', profId: 'edu-renfers', profName : 'Renfer Serge', cours: ['3GE.DF06','3GE.DF07'], date: new Date('2017-11-07'),
        description: 'cours en salle B113, lire votre mail pour les consignes et ne pas vous couchez trop tard svp!',
        infoType: 'Changement de salle', startDatePublication: new Date('2017','11','7','11','33'),
        endDatePublication: new Date('2017','11','8','11','33'),
      },
      {id: '8-11-17', profId: 'edu-Barranco', profName : 'Barranco Manuel', cours: ['3GE.DF05','3GE.DF03'], date: new Date('2017-11-08'),
        description: 'cours en salle B114',
        infoType: 'Changement de salle', startDatePublication: new Date('2017','11','8','11','33'),
        endDatePublication: new Date('2017-11-09'), endTimePublication: new Date('2017','11','9','11','33'),
      },
      {id: '9-11-17', profId: 'edu-andrem', profName : 'Andre Michele', cours: ['3GE.DF01','3GE.DF02'], date: new Date('2017-11-09'),
        description: 'cours en salle B115',
        infoType: 'Changement de salle', startDatePublication: new Date('2017','11','9','11','33'),
        endDatePublication: new Date('2017','11','10','11','33'),
      }
    ],
    coursprofs : [
      {id: 'edu-renfers',name: 'Renfer Serge', cours: ['3GE.DF01', '3GE.DF02', '3GE.DF05']},
      {id: 'edu-barrancom',name: 'Barranco Manuel', cours: ['3GE.DF03', '3GE.DF04']},
      {id: 'edu-andrem',name: 'André Michèle', cours: ['3GE.DF06', '3GE.DF07']}
    ],
    user : null,
    loading : false,
    error : null
  },
  mutations : {
    setLoadedInfos (state, payload) {
      state.publicInfos = payload
    },
    createInfo (state, payload) {
      state.publicInfos.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions : {
    loadInfos ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('infos').once('value')
        .then(
          (data) => {
            const infos = []
            const obj = data.val()
            for (let key in obj) {
              infos.push({
                ...obj[key],
                id : key
              })
              console.log(obj[key])
            }
            commit('setLoading', false)
            commit('setLoadedInfos', infos)
          }
        )
        .catch(
          (error) => {
            commit('setLoading', false)
            console.log(error)
          }
        )
    },
    createInfo ({commit, getters}, payload) {
      const myinfo = {
        infoType : payload.infoType,
        profId : payload.profId,
        profName : payload.profName,
        cours : payload.cours,
        description : payload.description,
        date : payload.date,
        startDatePublication : payload.startDatePublication,
        endDatePublication : payload.endDatePublication,
        creatorId : getters.user.id
      }
      //reach out to firebase and store it
      firebase.database().ref('infos').push(myinfo)
        .then((data) => {
          const key = data.key
          commit ('createInfo', {
            ...myinfo,
            id : key
          })
          console.log(myinfo)
        })
        .catch(
          (error) => {
            console.log(error)
          }
        )
    },
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id :  user.uid,
              registeredInfo : []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id :  user.uid,
              registeredInfo : []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    clearError ({commit}) {
      commit('clearError')
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {id: payload.uid, publicInfos: []})
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    }
  },
  getters : {
    publicInfos (state) {
      return state.publicInfos.sort((infoA, infoB) => {
        return infoA.date > infoB.date
      })
    },
    lastInfos (state, getters) {
      return getters.publicInfos.slice(0,10)
    },
    publicInfo (state) {
      return (infoId) => {
        return state.publicInfos.find((info) => {
          return info.id === infoId
        })
      }
    },
    prof (state) {
      return (infoId) => {
        return state.coursprofs.find((info) => {
          return info.id === infoId
        })
      }
    },
    coursprofs (state) {
      return state.coursprofs.sort((infoA, infoB) => {
        return infoA.id > infoB.id
      })
    },
    coursprofs_prop (state){
      return (prop) => {
        return state.coursprofs.map (a => a[prop])
      }
    },
    cours (state) {
      return (infoId) => {
        return state.coursprofs.find((info) => {
          return info.id === infoId
        }).cours
      }
    },
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
})
