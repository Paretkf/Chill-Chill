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
              <a class="nav-link">
                <h5>{{loginUser.name}}</h5>
              </a>
            </li>
            <li class="nav-item" v-if="loginUser.name">
              <a class="nav-link" @click="userLogout()">
                Logout
              </a>
            </li>
            <li class="nav-item"  v-else>
              <a class="nav-link" @click="userLogin">
                Login
              </a>
            </li>
            <li class="nav-item" v-if="loginUser.admin">
              <router-link to="/additem"><a class="nav-link">Add Item</a></router-link>
            </li>
            <li class="nav-item " v-if="loginUser.name">
              <a class="nav-link" href="#">Buy History</a>
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
    userLogin () {
      this.getUser()
      this.$swal.mixin({
        input: 'text',
        confirmButtonText: 'Next',
        showCancelButton: true,
        cancelButtonText: 'Register',
        progressSteps: ['1', '2']
      }).queue([
        {
          title: 'Email',
          text: 'Email ของท่านที่สมัครสมาชิก'
        },
        {
          input: 'password',
          title: 'Password',
          text: 'รหัสผ่าน'
        }
      ]).then((result) => {
        if (result.value) {
          for (let i = 0; i < this.user.length; i++) {
            if (result.value[0] === this.user[i].email) {
              if (result.value[1] === this.user[i].pass) {
                let loginUser = this.user[i]
                console.log(loginUser)
                this.login(loginUser)
                this.$swal({
                  type: 'success',
                  title: 'Login Success',
                  text: 'Login สำเร็จ'
                })
                break
              } else {
                this.$swal({
                  type: 'error',
                  title: 'รหัสผ่านไม่ถูกต้อง',
                  text: 'กรุณาใส่ให้ถูกต้อง'
                })
              }
            } else {
              this.$swal({
                type: 'error',
                title: 'ไม่มีชื่อผู้ใช้นี้',
                text: 'กรุณาใส่ให้ถูกต้อง'
              })
            }
          }
        } else if (
          result.dismiss === this.$swal.DismissReason.cancel
        ) {
          this.$router.push({path: '/adduser'})
        }
      })
    },
    userLogout () {
      this.logout()
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
