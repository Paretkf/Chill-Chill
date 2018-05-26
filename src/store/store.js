import { firebaseMutations, firebaseAction } from 'vuexfire'
import firebase from 'firebase'
var config = {
  apiKey: 'AIzaSyBSCAbd8ve7H2WAgRlkpNc0gly3yN_4XRI',
  authDomain: 'chat-kewin.firebaseapp.com',
  databaseURL: 'https://chat-kewin.firebaseio.com',
  projectId: 'chat-kewin',
  storageBucket: 'chat-kewin.appspot.com',
  messagingSenderId: '385123468341'
}
let app = firebase.initializeApp(config)

let db = app.database()
let dataRef = db.ref('data')
let tagRef = db.ref('tag')
// Your firebase config
export default {
  state: {
    data: {},
    tag: {}
  },
  getters: {
    data: state => state.data,
    tag: state => state.tag
  },
  mutations: {
    ...firebaseMutations,
    updateCost (state, payload) {
      state.sec = payload.Sec
      state.money = payload.cost
    }
  },
  actions: {
    async setTime (store, payload) {
      store.commit('updateCost', payload)
    },
    async setCoods (store, payload) {
      store.commit('updateCoods', payload)
    },
    setCaller (store, payload) {
      store.commit('setCaller')
    },
    // updateState (store, payload) {
    //   callRef.child(payload.ID + '/state').set(payload.state)
    // },
    // updateDriver (store, payload) {
    //   callRef.child(payload.ID + '/driver').set(payload.driver)
    // },
    // updateTimeCost (state, payload) {
    //   callRef.child(payload.ID + '/cost').once('value', snapshot => {
    //     callRef.child(payload.ID + '/cost').set(payload.cost)
    //   })
    //   callRef.child(payload.ID + '/time').once('value', snapshot => {
    //     callRef.child(payload.ID + '/time').set(payload.time)
    //   })
    // },
    newItem (store, payload) {
      dataRef.push(payload)
    },
    binddataRef: firebaseAction(({ bindFirebaseRef, unbindFirebaseRef }) => {
      bindFirebaseRef('data', dataRef)
    }),
    unbinddataRef: firebaseAction(({ bindFirebaseRef, unbindFirebaseRef }) => {
      unbindFirebaseRef('data')
    }),
    bindtagRef: firebaseAction(({ bindFirebaseRef, unbindFirebaseRef }) => {
      bindFirebaseRef('tag', tagRef)
    }),
    unbindtagRef: firebaseAction(({ bindFirebaseRef, unbindFirebaseRef }) => {
      unbindFirebaseRef('tag')
    })
  }
}
