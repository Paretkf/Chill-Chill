import { firebaseMutations, firebaseAction } from 'vuexfire'
import firebase from 'firebase'
import axios from 'axios'
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
let userRef = db.ref('user')
// Your firebase config
export default {
  state: {
    data: {},
    tag: {},
    user: {},
    loginUser: ''
  },
  getters: {
    data: state => state.data,
    tag: state => state.tag,
    user: state => state.user,
    loginUser: state => state.loginUser
  },
  mutations: {
    ...firebaseMutations,
    GET_USER (state) {
      axios.get('https://chat-kewin.firebaseio.com/user.json').then(res => {
        // if (state.uid)
        let arr = []
        for (var index in res.data) {
          if (res.data.hasOwnProperty(index)) {
            arr.push({
              ...res.data[index],
              firebaseID: index
            })
          }
        }
        state.user = arr
      })
    },
    SET_LOGINUSER (state, payload) {
      state.loginUser = payload
    },
    SET_LOGOUTUSER (state) {
      state.loginUser = ''
    }
  },
  actions: {
    // async setTime (store, payload) {
    //   store.commit('updateCost', payload)
    // },
    // async setCoods (store, payload) {
    //   store.commit('updateCoods', payload)
    // },
    // setCaller (store, payload) {
    //   store.commit('setCaller')
    // },
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
    logout (store) {
      store.commit('SET_LOGOUTUSER')
    },
    login (store, payload) {
      store.commit('SET_LOGINUSER', payload)
    },
    getUser (store) {
      store.commit('GET_USER')
    },
    addUser (store, payload) {
      userRef.push(payload)
    },
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
    }),
    binduserRef: firebaseAction(({ bindFirebaseRef, unbindFirebaseRef }) => {
      bindFirebaseRef('user', userRef)
    }),
    unbinduserRef: firebaseAction(({ bindFirebaseRef, unbindFirebaseRef }) => {
      unbindFirebaseRef('user')
    })
  }
}
