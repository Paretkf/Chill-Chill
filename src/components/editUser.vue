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
                            <th class="text-center">
                                จำนวนเงินที่เติม
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
                                <button  id="submit" class="btn btn-outline-info pull-right" @click="addMoneyfirst()">เติมเงิน</button>
                            </td>
                            <td>
                                <input type="text" v-model="inputMoney" class="form-control">
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
      inputMoney: 0
    }
  },
  methods: {
    addMoneyfirst () {
      if (this.inputMoney > 0) {
        console.log(this.inputMoney)
        this.addMoney(this.inputMoney)
        this.inputMoney = 0
      } else {
        return 0
      }
    },
    ...mapActions([
      'addUser',
      'binduserRef',
      'unbinduserRef',
      'getUser',
      'addMoney'
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
  },
  mounted () {
    if (!this.loginUser) {
      this.$router.push({path: '/'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #theme {
    background-color: #1d9c73;
  }
</style>
