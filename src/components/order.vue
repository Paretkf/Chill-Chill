<template>
  <div class="hello">
 <button @click="buying(items[0])">สั่งซื้อ</button>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      items: [
        {
          id: 'a01',
          name: 'csgo',
          price: '250'
        }
      ]
    }
  },
  mounted () {
  },
  methods: {
    ...mapActions([
    ]),
    buying (item) {
      if (confirm('ชำระสินค้า')) {
        if (this.user.money >= item.price) {
          console.log('buying')
          this.updateMoney(item.price)
        } else {
          console.log('money not enough')
        }
      } else {
        return false
      }
    },
    updateMoney (itemPrice) {
      this.user.money = this.user.money - itemPrice
      console.log(this.user.money)
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
