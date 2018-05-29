<template>
    <div class="container">
        <table class="table">
            <tr>
            <th>
                ORDERID
            </th>
            <th>
                ชื่อสินค้า
            </th>
            <th>
                สถานะสินค้า
            </th>
            <th>
                ดูสินค้า
            </th>
            </tr>
            <tr v-for="(d, index) in historyOrder" :key="index" >
            <td>
                {{index}}
            </td>
            <td>
                {{d.payload.name}}
            </td>
            <td>
                ส่งเรียบร้อย
            </td>
            <td>
                <button class="btn btn-outline-success pull-right" @click="showData(d)">+</button>
            </td>
            </tr>
        </table>
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
      'setHistoryOrder'
    ]),
    showData (data) {
      this.$swal({
        title: data.payload.name,
        text: 'Key : ' + data.key,
        imageUrl: data.payload.img,
        imageWidth: 400,
        imageHeight: 200,
        animation: false
      })
    }
  },
  computed: {
    ...mapGetters([
      'historyOrder'
    ])
  },
  created () {
    this.setHistoryOrder()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #theme {
    background-color: #1d9c73;
  }
</style>
