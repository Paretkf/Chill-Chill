<template>
  <div class="addItem">
      <div class="container">
        <center>
          <div>
            <div class="col-md-12">
              <div class="form-area">
                <form role="form">
                  <br style="clear:both">
                  <h3 style="margin-bottom: 25px; text-align: center;">User</h3>
                  <div class="col-md-12 table-responsive">
                <table class="table table-bordered table-hover table-sortable" id="tab_logic">
                    <thead>
                        <tr >
                            <th class="text-center">
                                ID
                            </th>
                            <th class="text-center">
                                Name
                            </th>
                            <th class="text-center">
                                Email
                            </th>
                            <th class="text-center">
                                ยอดเงินคงเหลือ
                            </th>
                            <th class="text-center">
                                เติมเงิน
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr id='addr0' data-id="0" class="hidden text-center" >
                            <td data-name="name">
                                {{loginUser.firebaseID}}
                            </td>
                            <td data-name="desc">
                                {{loginUser.name}}
                            </td>
                            <td data-name="desc">
                                {{loginUser.email}}
                            </td>
                            <td data-name="del">
                                {{loginUser.money}}
                            </td>
                            <td data-name="del">
                                <button  id="submit" class="btn btn-outline-info pull-right" @click="add">เติมเงิน</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
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
        admin: false,
        money: 50000
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
      'user',
      'loginUser'
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
