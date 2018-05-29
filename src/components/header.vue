<template>
  <div class="hello">
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top" id="theme">
      <div class="container">
        <router-link to="/"><a class="navbar-brand" href="">Chill-Chill Game Store</a></router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link to="/edituser">
                <a class="nav-link">
                  {{loginUser.name}}
                </a>
              </router-link>
            </li>
            <li class="nav-item" v-if="loginUser.name">
              <router-link to="/edituser">
                <a class="nav-link">
                ยอดเงิน {{loginUser.money}} บาท
                </a>
              </router-link>
            </li>
            <li class="nav-item"  v-else>
              <router-link to="/login">
                <a class="nav-link">
                  Login
                </a>
              </router-link>
            </li>
            <li class="nav-item" v-if="loginUser.admin">
              <router-link to="/additem"><a class="nav-link">Add-Item</a></router-link>
            </li>
            <li class="nav-item" v-if="loginUser.admin">
              <router-link to="/editgame"><a class="nav-link">Edit-Item</a></router-link>
            </li>
            <li class="nav-item" v-if="loginUser.admin">
              <router-link to="/addstock"><a class="nav-link">Add-Stock</a></router-link>
            </li>
            <li class="nav-item" v-if="loginUser.admin">
              <router-link to="/addtag"><a class="nav-link">Tag</a></router-link>
            </li>
            <li class="nav-item " v-if="loginUser.name">
             <router-link to="/historyOrder"> <a class="nav-link" href="/">Buy History</a> </router-link>
            </li>
            <li class="nav-item" v-if="loginUser.name">
              <a class="nav-link" @click="userLogout()">
              <button class="btn btn-danger btn-sm">
                Logout
              </button>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    ...mapActions([
      'getUser',
      'login',
      'logout'
    ]),
    userLogout () {
      this.logout()
      this.$router.push({path: '/'})
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'loginUser'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #theme {
    background-color: #1d9c73;
  }
</style>
