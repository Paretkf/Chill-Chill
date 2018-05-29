<template>
    <div class="container">
        <div class="row clearfix">
            <div class="col-md-12 table-responsive">
                <table class="table table-bordered table-hover table-sortable" id="tab_logic">
                    <thead>
                        <tr >
                            <th class="text-center">
                                Choose Game
                            </th>
                            <th class="text-center">
                                Firebase ID
                            </th>
                            <th class="text-center">
                                key
                            </th>
                            <th class="text-center" style="border-top: 1px solid #ffffff; border-right: 1px solid #ffffff;">
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr id='addr0' data-id="0" class="hidden" >
                            <td data-name="name">
                                <select class="custom-select" v-model="gameID">
                                  <option :value="index" v-for="(d, index) in data" :key="index" v-show="index != '.key'">{{d.name}}</option>
                                </select>
                            </td>
                            <td data-name="desc">
                                {{gameID}}
                            </td>
                            <td data-name="desc">
                                <input type="text"
                                    placeholder="Stream Key"
                                    class="form-control"
                                    v-model="key"
                                >
                            </td>
                            <td data-name="del">
                                <button class='btn btn-success' @click="addKey()">เพิ่ม</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      gameID: '',
      key: ''
    }
  },
  mounted () {
  },
  methods: {
    ...mapActions([
      'binddataRef',
      'unbinddataRef',
      'addStock'
    ]),
    addKey () {
      this.addStock({
        firebaseID: this.gameID,
        key: this.key,
        date: Date()
      })
    }
  },
  computed: {
    ...mapGetters([
      'data'
    ])
  },
  created () {
    this.binddataRef()
  },
  destroyed () {
    this.unbinddataRef()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #theme {
    background-color: #1d9c73;
  }
</style>
