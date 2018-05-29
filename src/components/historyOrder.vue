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
            <tr>
            <td>
                0007890
            </td>
            <td>
                Wallpaper Engine
            </td>
            <td>
                ส่งเรียบร้อย
            </td>
            <td>
                +
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
    ])
  },
  computed: {
    ...mapGetters([
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
