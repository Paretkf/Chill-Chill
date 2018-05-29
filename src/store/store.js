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
    loginUser: '',
    historyOrder: {}
  },
  getters: {
    data: state => state.data,
    tag: state => state.tag,
    user: state => state.user,
    loginUser: state => state.loginUser,
    historyOrder: state => state.historyOrder
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
    },
    SET_UPDATEMONEY (state, payload) {
      var arr = []
      var ref = db.ref('data/' + payload.id + '/stock')
      var keyGame = []
      ref.on('value', (snapshot) => {
        keyGame = snapshot.val()
      })
      for (var index in keyGame) {
        if (keyGame.hasOwnProperty(index)) {
          arr.push({
            keygame: keyGame[index],
            firebaseID: index
          })
        }
      }
      var newKey = arr.pop()
      ref.child(newKey.firebaseID).remove()
      // console.log('Remove : ' + keyGame)
      state.loginUser.money = state.loginUser.money - payload.price
      userRef.child(state.loginUser.firebaseID + '/money').set(state.loginUser.money)
      userRef.child(state.loginUser.firebaseID + '/historyOrder').push({
        payload,
        key: newKey.keygame.key
      })
    },
    SET_UPDATESTOCK (state, payload) {
    },
    SET_HISTORYORDER (state) {
      var ref = db.ref('user/' + state.loginUser.firebaseID + '/historyOrder')
      ref.on('value', (snapshot) => {
        state.historyOrder = snapshot.val()
        console.log(state.historyOrder)
      })
    },
    SET_ADDMONEY (state, payload) {
      state.loginUser.money = parseInt(state.loginUser.money) + parseInt(payload)
      userRef.child(state.loginUser.firebaseID + '/money').set(state.loginUser.money)
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
    // data: {
    //   price: '',
    //   detail: '',
    //   tag: 'Choose Tag',
    //   img: ''
    // },
    addTag (store, tag) {
      tagRef.push({
        name: tag,
        count: 1
      })
    },
    removeTag (store, tag) {
      tagRef.child(tag).remove()
    },
    editGame (store, payload) {
      var ref = db.ref('data/' + payload.id + '/price')
      ref.set(payload.data.price)
      ref = db.ref('data/' + payload.id + '/img')
      ref.set(payload.data.img)
      ref = db.ref('data/' + payload.id + '/tag')
      ref.set(payload.data.tag)
      ref = db.ref('data/' + payload.id + '/detail')
      ref.set(payload.data.detail)
    },
    deleteGame (store, id) {
      dataRef.child(id).remove()
    },
    addMoney (store, payload) {
      store.commit('SET_ADDMONEY', payload)
    },
    addStock (store, payload) {
      dataRef.child(payload.firebaseID + '/stock').push({
        key: payload.key,
        date: payload.date
      })
    },
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
    updateMoney (store, payload) {
      store.commit('SET_UPDATEMONEY', payload)
    },
    setHistoryOrder (store) {
      store.commit('SET_HISTORYORDER')
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
