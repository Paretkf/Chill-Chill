<template>
  <div class="addItem">
      <div class="container">
        <center>
          <div>
            <div class="col-md-6">
              <div class="form-area">
                <form role="form">
                  <br style="clear:both">
                  <h3 style="margin-bottom: 25px; text-align: center;">Register</h3>
                  <div class="form-group">
                    <input type="text" class="form-control"  placeholder="Email" v-model="newUser.email">
                  </div>
                  <div class="form-group">
                    <input type="text" class="form-control" placeholder="Name" v-model="newUser.name">
                  </div>
                  <div class="form-group">
                    <input type="password" class="form-control"  placeholder="Password" v-model="newUser.pass">
                  </div>
                  <div class="form-group">
                    <input type="password" class="form-control"  placeholder="Confirm Password" v-model="repass">
                  </div>
                <button  id="submit" class="btn btn-success pull-right" @click="add">Register</button>
              </form>
            </div>
          </div>
        </div>
      </center>
    </div>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'addUser',
  data () {
    return {
      newUser: {
        name: '',
        email: '',
        pass: '',
        admin: false
      },
      repass: ''
    }
  },
  mounted () {
  },
  methods: {
    add () {
      this.getUser()
      for (let i = 0; i < this.user.length; i++) {
        if (this.newUser.email === this.user[i].email) {
          this.$swal({
            type: 'error',
            title: 'มี Email นี้อยู่ในระบบแล้ว',
            text: 'กรุณาใส่ให้ถูกต้อง'
          })
          return
        }
      }
      if (!(this.newUser.pass === this.repass)) {
        this.$swal({
          type: 'error',
          title: 'รหัสผ่านไม่ตรงกัน',
          text: 'กรุณาใส่ให้ถูกต้อง'
        })
        return
      }
      if (this.newUser.name === '' || this.newUser.email === '' || this.newUser.pass === '') {
        this.$swal({
          type: 'error',
          title: 'ผิดพลาด',
          text: 'กรุณาใส่ข้อมูลให้ถูกต้อง'
        })
        return
      }
      if (!(/^.+@.+$/.test(this.newUser.email))) {
        this.$swal({
          type: 'error',
          title: 'Email ไม่ถูกต้อง',
          text: 'กรุณาใส่ข้อมูลให้ถูกต้อง'
        })
        return
      }
      this.addUser(this.newUser)
      this.$swal({
        type: 'success',
        title: 'Data Saved',
        showConfirmButton: false,
        timer: 1800,
        backdrop: `
          rgba(0,0,123,0.4)
          url("https://media.giphy.com/media/sIIhZliB2McAo/giphy.gif")
          center left
          no-repeat
        `
      })
      this.newUser.name = ''
      this.newUser.email = ''
      this.newUser.pass = ''
      this.repass = ''
    },
    ...mapActions([
      'addUser',
      'binduserRef',
      'unbinduserRef',
      'getUser'
    ])
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  created () {
    this.getUser()
    this.binduserRef()
  },
  destroyed () {
    this.unbinduserRef()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #theme {
    background-color: #1d9c73;
  }
</style>
