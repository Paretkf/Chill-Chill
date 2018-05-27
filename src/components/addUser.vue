<template>
  <div class="addItem">
      <div class="container">
        <center>
          <div>
            <div class="col-md-6">
              <div class="form-area">
                <form role="form">
                  <br style="clear:both">
                  <h3 style="margin-bottom: 25px; text-align: center;">Add New User</h3>
                  <div class="form-group">
                    <input type="text" class="form-control" placeholder="Name" v-model="newGame.name">
                  </div>
                  <div class="form-group">
                    <input type="text" class="form-control"  placeholder="Email" v-model="newGame.img">
                  </div>
                  <div class="form-group">
                    <input type="password" class="form-control"  placeholder="Password" v-model="newGame.price">
                  </div>
                  <div class="form-group">
                    <input type="password" class="form-control"  placeholder="Confirm Password" v-model="newGame.tag">
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
      newGame: {
        name: '',
        price: '',
        detail: '',
        tag: '',
        img: ''
      }
    }
  },
  mounted () {
  },
  methods: {
    add () {
      if (this.newGame.name === '' || this.newGame.price === '' ||
      this.newGame.tag === '' || this.newGame.detail === '' || this.newGame.img === '') {
        this.$swal({
          type: 'error',
          title: 'Oops...',
          text: 'Something went wrong!'
        })
        return
      }
      if (!(/^[0-9]+$/.test(this.newGame.price))) {
        this.$swal({
          type: 'error',
          title: 'Oops...',
          text: 'Something went wrong!'
        })
        return
      }
      this.newItem(this.newGame)
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
      this.newGame.name = ''
      this.newGame.price = ''
      this.newGame.detail = ''
      this.newGame.tag = ''
      this.newGame.img = ''
    },
    ...mapActions([
      'binddataRef',
      'unbinddataRef',
      'newItem'
    ])
  },
  computed: {
    currentImage () {
      return this.images[Math.abs(this.currentNumber) % this.images.length]
    },
    ...mapGetters([
      'data'
    ])
  },
  created () {
    this.binddataRef()
    console.log(this.data)
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
